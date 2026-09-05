import { useCallback, useEffect, useMemo, useState } from 'react';
import { PanelsTopLeft } from 'lucide-react';
import LabCodeEditor from './LabCodeEditor';
import MemoryPanel from './MemoryPanel';
import StepControls from './StepControls';
import OutputConsole from './OutputConsole';
import FlowStory from './FlowStory';
import LabModuleToc from './LabModuleToc';

/**
 * Fullscreen dry-run lab IDE: collapsible module TOC + fixed viewport workspace
 * so Trace / Step and memory stay visible without scrolling the page.
 */
export default function VisualLabShell({
  language,
  title,
  subtitle,
  examples,
  defaultCode,
  onRunTrace,
  badge,
  tip,
}) {
  const [code, setCode] = useState(defaultCode);
  const [activeExample, setActiveExample] = useState(examples[0]?.id || null);
  const [tocOpen, setTocOpen] = useState(true);
  const [tracing, setTracing] = useState(false);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState(null);
  const [fullStdout, setFullStdout] = useState('');

  const current = steps[stepIndex] || null;
  const prev = steps[stepIndex - 1] || null;
  const codeLines = useMemo(() => code.split('\n'), [code]);

  const activeMeta = useMemo(
    () => examples.find((ex) => ex.id === activeExample) || null,
    [examples, activeExample],
  );

  const changedKeys = useMemo(() => {
    if (!current?.locals) return [];
    const prevLocals = prev?.locals || {};
    return Object.keys(current.locals).filter(
      (k) => JSON.stringify(current.locals[k]) !== JSON.stringify(prevLocals[k]),
    );
  }, [current, prev]);

  const stdoutDelta = useMemo(() => {
    const now = current?.stdout || '';
    const before = prev?.stdout || '';
    if (now.startsWith(before)) return now.slice(before.length);
    return now;
  }, [current, prev]);

  const handleReset = useCallback(() => {
    setSteps([]);
    setStepIndex(0);
    setError(null);
    setFullStdout('');
  }, []);

  const handleTrace = useCallback(async () => {
    setTracing(true);
    setError(null);
    setSteps([]);
    setStepIndex(0);
    setFullStdout('');
    try {
      const result = await onRunTrace(code);
      if (result.error && (!result.steps || result.steps.length === 0)) {
        setError(result.error);
        return;
      }
      setSteps(result.steps || []);
      setFullStdout(result.stdout || '');
      setStepIndex(0);
      if (result.error) setError(result.error);
    } catch (err) {
      setError(err?.message || String(err));
    } finally {
      setTracing(false);
    }
  }, [code, onRunTrace]);

  const selectExample = useCallback(
    (ex) => {
      setActiveExample(ex.id);
      setCode(ex.code);
      handleReset();
      if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
        setTocOpen(false);
      }
    },
    [handleReset],
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setTocOpen((v) => !v);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const displayStdout = current?.stdout ?? (steps.length ? fullStdout : '');

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden">
      <LabModuleToc
        examples={examples}
        activeExampleId={activeExample}
        onSelect={selectExample}
        open={tocOpen}
        onToggle={() => setTocOpen((v) => !v)}
      />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* Sticky lab toolbar — always on screen */}
        <div className="shrink-0 border-b border-navy-200 bg-white px-3 py-2 sm:px-4">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                {!tocOpen && (
                  <button
                    type="button"
                    onClick={() => setTocOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 px-2 py-1 text-xs font-bold text-navy-700 hover:border-brand-400 hover:text-brand-600 md:hidden"
                  >
                    <PanelsTopLeft className="h-3.5 w-3.5" />
                    Modules
                  </button>
                )}
                {badge && (
                  <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                    {badge}
                  </span>
                )}
                <h1 className="lab-heading truncate text-base font-extrabold text-navy-900 sm:text-lg">
                  {activeMeta?.title || title}
                </h1>
              </div>
              <p className="mt-0.5 line-clamp-1 text-xs text-navy-500 sm:text-sm">
                {activeMeta?.description || subtitle}
              </p>
            </div>
          </div>

          <StepControls
            onTrace={handleTrace}
            onStepBack={() => setStepIndex((i) => Math.max(0, i - 1))}
            onStepNext={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
            onRunToEnd={() => setStepIndex(Math.max(0, steps.length - 1))}
            onReset={handleReset}
            tracing={tracing}
            ready={steps.length > 0}
            stepIndex={stepIndex}
            stepCount={steps.length}
            compact
          />
          {tip && (
            <p className="mt-2 hidden text-[11px] text-navy-500 lg:line-clamp-1">{tip}</p>
          )}
        </div>

        {/* Workspace fills remaining viewport; panels scroll internally */}
        <div className="grid min-h-0 flex-1 grid-rows-[minmax(0,1.35fr)_minmax(0,1fr)] gap-2 overflow-hidden p-2 sm:gap-3 sm:p-3 lg:grid-cols-3 lg:grid-rows-1">
          <div className="flex min-h-0 min-w-0 flex-col gap-2 overflow-hidden lg:col-span-1">
            <div className="min-h-0 flex-[1.4] overflow-hidden">
              <LabCodeEditor
                value={code}
                onChange={(v) => {
                  setCode(v);
                  setActiveExample(null);
                  if (steps.length) handleReset();
                }}
                activeLine={current?.line ?? null}
                language={language}
                fill
              />
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <OutputConsole
                stdout={displayStdout}
                error={error}
                fresh={Boolean(stdoutDelta)}
                fill
              />
            </div>
          </div>

          <div className="hidden min-h-0 min-w-0 overflow-hidden lg:flex lg:flex-col">
            <FlowStory
              line={current?.line ?? null}
              codeLine={current?.line ? codeLines[(current.line || 1) - 1] || '' : ''}
              changedKeys={changedKeys}
              prevLocals={prev?.locals || {}}
              locals={current?.locals || {}}
              stdoutDelta={stdoutDelta}
              language={language}
              fill
            />
          </div>

          <div className="min-h-0 min-w-0 overflow-hidden">
            <MemoryPanel
              locals={current?.locals || {}}
              prevLocals={prev?.locals || {}}
              changedKeys={changedKeys}
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
