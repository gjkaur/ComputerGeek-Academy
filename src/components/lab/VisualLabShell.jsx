import { useCallback, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LabCodeEditor from './LabCodeEditor';
import MemoryPanel from './MemoryPanel';
import StepControls from './StepControls';
import OutputConsole from './OutputConsole';
import FlowStory from './FlowStory';

/**
 * Shared beginner dry-run lab shell (Python / Java).
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
  const [tracing, setTracing] = useState(false);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState(null);
  const [fullStdout, setFullStdout] = useState('');

  const current = steps[stepIndex] || null;
  const prev = steps[stepIndex - 1] || null;
  const codeLines = useMemo(() => code.split('\n'), [code]);

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

  const handleReset = () => {
    setSteps([]);
    setStepIndex(0);
    setError(null);
    setFullStdout('');
  };

  const displayStdout = current?.stdout ?? (steps.length ? fullStdout : '');

  return (
    <div className="lab-workspace bg-[linear-gradient(180deg,#f4f8fc_0%,#ffffff_40%,#eef5fb_100%)] py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          {badge && (
            <span className="mb-3 inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
              {badge}
            </span>
          )}
          <h1 className="lab-heading text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            {title}
          </h1>
          <p className="lab-body mt-3 max-w-3xl text-lg leading-relaxed text-navy-600">{subtitle}</p>
          {tip && (
            <p className="lab-body mt-4 rounded-2xl border-2 border-brand-200 bg-brand-50 px-5 py-4 text-base text-navy-800">
              {tip}
            </p>
          )}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {examples.map((ex) => {
            const active = activeExample === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => {
                  setActiveExample(ex.id);
                  setCode(ex.code);
                  handleReset();
                }}
                className={`rounded-full border-2 px-4 py-2 text-sm font-bold transition ${
                  active
                    ? 'border-brand-500 bg-brand-500 text-white shadow-md'
                    : 'border-navy-200 bg-white text-navy-700 hover:border-brand-400 hover:text-brand-600'
                }`}
                title={ex.description}
              >
                {ex.title}
              </button>
            );
          })}
        </div>

        <div className="mb-6">
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
          />
        </div>

        {/* Big human-readable pipeline */}
        <div className="mb-6 hidden items-center justify-center gap-3 rounded-2xl border-2 border-navy-100 bg-white px-4 py-3 shadow-sm lg:flex">
          <PipelineChip label="1. Code line" tone="navy" />
          <ArrowRight className="h-6 w-6 text-brand-500" />
          <PipelineChip label="2. Memory boxes" tone="brand" />
          <ArrowRight className="h-6 w-6 text-brand-500" />
          <PipelineChip label="3. Screen output" tone="green" />
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[1.05fr_0.9fr_1.05fr]">
          <div className="space-y-4">
            <LabCodeEditor
              value={code}
              onChange={(v) => {
                setCode(v);
                setActiveExample(null);
                if (steps.length) handleReset();
              }}
              activeLine={current?.line ?? null}
              language={language}
            />
            <OutputConsole
              stdout={displayStdout}
              error={error}
              fresh={Boolean(stdoutDelta)}
            />
          </div>

          {/* Center flow story */}
          <div className="space-y-4">
            <FlowStory
              language={language}
              line={current?.line ?? null}
              codeLine={current?.line ? codeLines[current.line - 1] || '' : ''}
              changedKeys={changedKeys}
              prevLocals={prev?.locals || {}}
              locals={current?.locals || {}}
              stdoutDelta={stdoutDelta}
            />
          </div>

          <div className="space-y-4">
            <MemoryPanel
              locals={current?.locals || {}}
              prevLocals={prev?.locals || {}}
              changedKeys={changedKeys}
              emptyHint="Click Trace program, then use Step → to walk through memory changes."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineChip({ label, tone }) {
  const tones = {
    navy: 'bg-navy-900 text-white',
    brand: 'bg-brand-500 text-white',
    green: 'bg-emerald-500 text-white',
  };
  return (
    <span className={`lab-heading rounded-full px-4 py-2 text-sm font-extrabold ${tones[tone]}`}>
      {label}
    </span>
  );
}
