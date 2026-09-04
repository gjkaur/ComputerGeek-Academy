import { Play, SkipForward, SkipBack, RotateCcw, FastForward, Loader2 } from 'lucide-react';

export default function StepControls({
  onTrace,
  onStepBack,
  onStepNext,
  onRunToEnd,
  onReset,
  tracing = false,
  ready = false,
  stepIndex = 0,
  stepCount = 0,
  disabled = false,
}) {
  const btn =
    'inline-flex items-center gap-2 rounded-xl border-2 border-navy-200 bg-white px-4 py-3 text-base font-bold text-navy-800 transition hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40';

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onTrace}
        disabled={disabled || tracing}
        className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-base font-extrabold text-white shadow-md transition hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {tracing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5" />}
        {tracing ? 'Loading…' : 'Trace program'}
      </button>

      <button type="button" onClick={onStepBack} disabled={!ready || stepIndex <= 0} className={btn}>
        <SkipBack className="h-5 w-5" />
        Back
      </button>

      <button
        type="button"
        onClick={onStepNext}
        disabled={!ready || stepIndex >= stepCount - 1}
        className={`${btn} border-brand-400 text-brand-700`}
      >
        <SkipForward className="h-5 w-5" />
        Step →
      </button>

      <button
        type="button"
        onClick={onRunToEnd}
        disabled={!ready || stepIndex >= stepCount - 1}
        className={btn}
      >
        <FastForward className="h-5 w-5" />
        End
      </button>

      <button type="button" onClick={onReset} disabled={!ready && !tracing} className={btn}>
        <RotateCcw className="h-5 w-5" />
        Reset
      </button>

      {ready && (
        <span className="lab-heading ml-auto rounded-full bg-navy-900 px-4 py-2 text-base font-bold text-white">
          Step {stepIndex + 1}
          <span className="mx-1 text-brand-300">/</span>
          {stepCount}
        </span>
      )}
    </div>
  );
}
