import { Terminal, ArrowRight } from 'lucide-react';

export default function OutputConsole({ stdout = '', error = null, fresh = false, fill = false }) {
  return (
    <div
      className={`lab-panel flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-navy-900 bg-[#07111f] shadow-sm ${
        fill ? 'p-3' : 'p-5'
      }`}
    >
      <div className="mb-2 flex shrink-0 items-center gap-2 text-[#7dd3fc]">
        <Terminal className="h-4 w-4" />
        <span className="lab-heading text-sm font-bold text-white">Screen output</span>
        {fresh && !error && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#16a34a] px-2 py-0.5 text-[10px] font-extrabold text-white">
            new <ArrowRight className="h-3 w-3" />
          </span>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {error ? (
          <pre className="lab-mono whitespace-pre-wrap text-sm font-bold leading-relaxed text-[#fecaca]">
            {error}
          </pre>
        ) : stdout ? (
          <pre className="lab-mono whitespace-pre-wrap text-base font-bold leading-relaxed text-[#ecfdf5]">
            {stdout}
          </pre>
        ) : (
          <p className="lab-body text-sm text-[#94a3b8]">
            Messages from print / println will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
