import { ArrowDown, ArrowRight, Code2, HardDrive, Terminal, Sparkles } from 'lucide-react';

function formatValue(value) {
  if (value === null || value === undefined) return 'None';
  if (typeof value === 'string') return JSON.stringify(value);
  if (typeof value === 'boolean') return value ? 'True' : 'False';
  if (Array.isArray(value)) return `[${value.map(formatValue).join(', ')}]`;
  if (typeof value === 'object') {
    return `{ ${Object.entries(value)
      .map(([k, v]) => `${k}: ${formatValue(v)}`)
      .join(', ')} }`;
  }
  return String(value);
}

/**
 * Beginner-friendly storyboard: Code → Memory → Output with big arrows.
 */
export default function FlowStory({
  line = null,
  codeLine = '',
  changedKeys = [],
  prevLocals = {},
  locals = {},
  stdoutDelta = '',
  language = 'python',
}) {
  if (line == null) {
    return (
      <div className="lab-panel rounded-2xl border-2 border-dashed border-navy-200 bg-white/80 p-5">
        <p className="lab-body text-center text-navy-500">
          Trace the program, then watch the arrow flow:
          <span className="mt-2 flex flex-wrap items-center justify-center gap-2 font-semibold text-navy-800">
            Code <ArrowRight className="h-4 w-4 text-brand-500" /> Memory{' '}
            <ArrowRight className="h-4 w-4 text-brand-500" /> Output
          </span>
        </p>
      </div>
    );
  }

  const changes = changedKeys.map((key) => ({
    key,
    from: Object.prototype.hasOwnProperty.call(prevLocals, key) ? prevLocals[key] : undefined,
    to: locals[key],
    isNew: !Object.prototype.hasOwnProperty.call(prevLocals, key),
  }));

  return (
    <div className="lab-panel overflow-hidden rounded-2xl border-2 border-brand-200 bg-gradient-to-br from-white via-brand-50/40 to-white shadow-md">
      <div className="flex items-center gap-2 border-b border-brand-100 bg-brand-500 px-4 py-3 text-white">
        <Sparkles className="h-5 w-5" />
        <h3 className="lab-heading text-lg font-bold tracking-tight">Step flow</h3>
      </div>

      <div className="space-y-0 p-4 sm:p-5">
        {/* 1. Code */}
        <div className="lab-flow-card flex gap-3 rounded-xl border border-navy-100 bg-navy-900 p-4 text-white">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-base font-extrabold">
            1
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center gap-2 text-brand-200">
              <Code2 className="h-4 w-4" />
              <span className="text-sm font-bold uppercase tracking-wide">
                {language === 'python' ? 'Python' : 'Java'} line runs
              </span>
            </div>
            <p className="lab-mono text-base font-semibold text-white">
              Line {line}
              {codeLine ? (
                <>
                  <span className="mx-2 text-brand-300">→</span>
                  <span className="text-brand-100">{codeLine.trim() || '(blank)'}</span>
                </>
              ) : null}
            </p>
          </div>
        </div>

        <FlowArrowDown label="computer follows this line" />

        {/* 2. Memory */}
        <div className="lab-flow-card rounded-xl border-2 border-brand-300 bg-brand-50 p-4">
          <div className="mb-3 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-base font-extrabold text-white">
              2
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2 text-brand-700">
                <HardDrive className="h-4 w-4" />
                <span className="text-sm font-bold uppercase tracking-wide">Memory updates</span>
              </div>
              <p className="lab-body text-navy-700">
                {changes.length
                  ? 'Values move into named boxes (variables):'
                  : 'This line did not change any variables (maybe it only printed).'}
              </p>
            </div>
          </div>

          {changes.length > 0 && (
            <div className="space-y-2 sm:ml-12">
              {changes.map(({ key, from, to, isNew }) => (
                <div
                  key={key}
                  className="flex flex-wrap items-center gap-2 rounded-xl border border-brand-200 bg-white px-3 py-2.5"
                >
                  <span className="lab-mono rounded-lg bg-navy-900 px-2.5 py-1 text-base font-bold text-brand-200">
                    {key}
                  </span>
                  {isNew ? (
                    <>
                      <span className="text-sm font-semibold text-emerald-600">created</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand-500" />
                      <span className="lab-mono text-lg font-bold text-brand-700">{formatValue(to)}</span>
                    </>
                  ) : (
                    <>
                      <span className="lab-mono text-base text-navy-500">{formatValue(from)}</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-white">
                        becomes <ArrowRight className="h-3 w-3" />
                      </span>
                      <span className="lab-mono text-lg font-bold text-brand-700">{formatValue(to)}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <FlowArrowDown label={stdoutDelta ? 'then shows a message' : 'continue to next line'} />

        {/* 3. Output */}
        <div
          className={`lab-flow-card flex gap-3 rounded-xl border p-4 ${
            stdoutDelta
              ? 'border-emerald-300 bg-emerald-50'
              : 'border-navy-100 bg-navy-50/80'
          }`}
        >
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-extrabold text-white ${
              stdoutDelta ? 'bg-emerald-500' : 'bg-navy-400'
            }`}
          >
            3
          </div>
          <div className="min-w-0 flex-1">
            <div className={`mb-1 flex items-center gap-2 ${stdoutDelta ? 'text-emerald-700' : 'text-navy-500'}`}>
              <Terminal className="h-4 w-4" />
              <span className="text-sm font-bold uppercase tracking-wide">Screen output</span>
            </div>
            {stdoutDelta ? (
              <pre className="lab-mono overflow-x-auto whitespace-pre-wrap rounded-lg bg-emerald-950 px-3 py-2 text-base font-bold leading-relaxed text-[#ecfdf5]">
                {stdoutDelta}
              </pre>
            ) : (
              <p className="lab-body text-navy-500">No new print on this step.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowArrowDown({ label }) {
  return (
    <div className="lab-flow-arrow flex flex-col items-center py-1.5" aria-hidden>
      <div className="h-2.5 w-1.5 rounded-full bg-brand-400" />
      <div className="h-2.5 w-1.5 rounded-full bg-brand-400" />
      <ArrowDown className="h-8 w-8 stroke-[2.5] text-brand-500" />
      <span className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-brand-600">
        {label}
      </span>
    </div>
  );
}
