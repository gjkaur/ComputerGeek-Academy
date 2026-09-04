import { Terminal, ArrowRight } from 'lucide-react';

export default function OutputConsole({ stdout = '', error = null, fresh = false }) {
  return (
    <div className="lab-panel rounded-2xl border-2 border-navy-900 bg-[#07111f] p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-[#7dd3fc]">
        <Terminal className="h-5 w-5" />
        <span className="lab-heading text-base font-bold text-white">Screen output</span>
        {fresh && !error && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#16a34a] px-2.5 py-0.5 text-xs font-extrabold text-white">
            new text <ArrowRight className="h-3 w-3" /> here
          </span>
        )}
      </div>
      {error ? (
        <pre className="lab-mono whitespace-pre-wrap text-base font-bold leading-relaxed text-[#fecaca]">
          {error}
        </pre>
      ) : stdout ? (
        <pre className="lab-mono whitespace-pre-wrap text-lg font-bold leading-relaxed text-[#ecfdf5]">
          {stdout}
        </pre>
      ) : (
        <p className="lab-body text-[#94a3b8]">
          Messages from print / println will appear here.
        </p>
      )}
    </div>
  );
}
