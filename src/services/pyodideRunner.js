/**
 * Load Pyodide once and run beginner Python with line-by-line memory traces.
 * Runs entirely in the browser — no install required.
 *
 * Trace model: each step is the state AFTER a line finishes (so print output
 * and assignments appear on the same highlighted line that caused them).
 */

let pyodidePromise = null;

export function loadPyodideRuntime() {
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    if (!globalThis.loadPyodide) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/pyodide.js';
        script.onload = resolve;
        script.onerror = () => reject(new Error('Failed to load Pyodide from CDN'));
        document.head.appendChild(script);
      });
    }

    const pyodide = await globalThis.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.5/full/',
    });
    return pyodide;
  })();

  return pyodidePromise;
}

const TRACER_SETUP = `
import sys, json

_cga_steps = []
_cga_stdout = []
_cga_last_line = None
_cga_error = None

class _CgaOut:
    def write(self, s):
        if s:
            _cga_stdout.append(str(s))
    def flush(self):
        pass

def _cga_safe(v):
    try:
        if isinstance(v, (int, float, bool, str)) or v is None:
            return v
        if isinstance(v, (list, tuple)):
            return [_cga_safe(x) for x in v[:20]]
        if isinstance(v, dict):
            out = {}
            for i, (k, val) in enumerate(v.items()):
                if i >= 20:
                    break
                out[str(k)] = _cga_safe(val)
            return out
        return repr(v)[:200]
    except Exception:
        return "<unreadable>"

def _cga_snapshot_locals(frame):
    locs = {}
    for k, v in frame.f_locals.items():
        if k.startswith("_cga") or k.startswith("__"):
            continue
        locs[k] = _cga_safe(v)
    return locs

def _cga_record(line, frame):
    global _cga_steps
    _cga_steps.append({
        "line": line,
        "locals": _cga_snapshot_locals(frame),
        "event": "line",
        "stdout": "".join(_cga_stdout),
    })
    if len(_cga_steps) > 400:
        raise RuntimeError("Too many steps (max 400). Simplify the loop or code.")

def _cga_tracer(frame, event, arg):
    global _cga_last_line
    if frame.f_code.co_filename != "<cga_user>":
        return _cga_tracer

    # Line events fire BEFORE the line runs. Locals/stdout now reflect
    # the previous line finishing — so we attribute this snapshot to _cga_last_line.
    if event == "line":
        if _cga_last_line is not None:
            _cga_record(_cga_last_line, frame)
        _cga_last_line = frame.f_lineno
        return _cga_tracer

    # Return fires after the last line of the block — capture final print/assigns.
    if event == "return":
        if _cga_last_line is not None:
            _cga_record(_cga_last_line, frame)
            _cga_last_line = None
        return _cga_tracer

    return _cga_tracer
`;

/**
 * @param {string} userCode
 * @returns {Promise<{ steps: Array, stdout: string, error: string|null }>}
 */
export async function runPythonWithTrace(userCode) {
  const pyodide = await loadPyodideRuntime();

  await pyodide.runPythonAsync(TRACER_SETUP);

  const wrapped = `
_cga_steps.clear()
_cga_stdout.clear()
_cga_last_line = None
_sys_stdout = sys.stdout
sys.stdout = _CgaOut()
sys.settrace(_cga_tracer)
_cga_error = None
try:
    _cga_code = compile(${JSON.stringify(userCode)}, "<cga_user>", "exec")
    exec(_cga_code, {"__name__": "__main__"})
except Exception as _cga_err:
    _cga_error = f"{type(_cga_err).__name__}: {_cga_err}"
    _err_line = getattr(_cga_err, "lineno", None) or _cga_last_line or 1
    _cga_steps.append({
        "line": _err_line,
        "locals": _cga_steps[-1]["locals"] if _cga_steps else {},
        "event": "error",
        "error": _cga_error,
        "stdout": "".join(_cga_stdout),
    })
finally:
    sys.settrace(None)
    sys.stdout = _sys_stdout
    _final_out = "".join(_cga_stdout)
    # If return event never flushed the last line, record it now (locals best-effort).
    if _cga_last_line is not None and _cga_error is None:
        _cga_steps.append({
            "line": _cga_last_line,
            "locals": _cga_steps[-1]["locals"] if _cga_steps else {},
            "event": "line",
            "stdout": _final_out,
        })
        _cga_last_line = None
    elif _cga_steps and _cga_steps[-1].get("event") == "line" and _cga_steps[-1].get("stdout") != _final_out:
        # Ensure final print text is never dropped from the last step
        _cga_steps[-1]["stdout"] = _final_out
`;

  try {
    await pyodide.runPythonAsync(wrapped);
  } catch (err) {
    return {
      steps: [],
      stdout: '',
      error: err?.message || String(err),
    };
  }

  const raw = pyodide.runPython(
    'json.dumps({"steps": _cga_steps, "stdout": "".join(_cga_stdout), "error": _cga_error})',
  );
  const parsed = JSON.parse(raw);
  const error =
    parsed.error ||
    (parsed.steps.find((s) => s.event === 'error') || {}).error ||
    null;

  // Prefer completed line steps; keep a trailing error step if present
  const steps = parsed.steps.filter((s) => s.event === 'line' || s.event === 'error');

  return {
    steps,
    stdout: parsed.stdout || '',
    error,
  };
}
