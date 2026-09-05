import { useEffect, useMemo, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Beginner-friendly code editor with larger type + active line callout.
 */
export default function LabCodeEditor({
  value,
  onChange,
  activeLine = null,
  language = 'python',
  readOnly = false,
  fill = false,
}) {
  const gutterRef = useRef(null);
  const highlightRef = useRef(null);
  const textareaRef = useRef(null);
  const lines = useMemo(() => value.split('\n'), [value]);
  const lineCount = Math.max(lines.length, 1);
  const LINE = 28;

  const syncScroll = () => {
    const top = textareaRef.current?.scrollTop || 0;
    if (gutterRef.current) gutterRef.current.scrollTop = top;
    if (highlightRef.current) highlightRef.current.scrollTop = top;
  };

  useEffect(() => {
    if (activeLine == null || !textareaRef.current) return;
    const el = textareaRef.current;
    const target = (activeLine - 1) * LINE;
    const viewTop = el.scrollTop;
    const viewBottom = viewTop + el.clientHeight;
    if (target < viewTop || target + LINE > viewBottom) {
      el.scrollTop = Math.max(0, target - el.clientHeight / 3);
      syncScroll();
    }
  }, [activeLine]);

  return (
    <div
      className={`lab-panel flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-navy-800 bg-navy-900 shadow-xl ${
        fill ? '' : ''
      }`}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-navy-950 px-3 py-2 sm:px-4 sm:py-3">
        <span className="lab-heading text-xs font-bold uppercase tracking-widest text-brand-300 sm:text-sm">
          {language === 'python' ? 'Python' : 'Java'} code
        </span>
        {activeLine != null ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-xs font-extrabold text-white">
            Running line {activeLine}
            <ArrowRight className="h-3.5 w-3.5" />
            memory
          </span>
        ) : (
          <span className="text-xs font-semibold text-navy-300">Type here · runs in browser</span>
        )}
      </div>
      <div
        className={`relative flex min-h-0 flex-1 lab-mono text-[15px] leading-[28px] ${
          fill ? '' : 'max-h-[460px] min-h-[300px]'
        }`}
      >
        <div
          ref={gutterRef}
          className="w-12 shrink-0 overflow-hidden border-r border-white/10 bg-black/40 py-3 text-right text-navy-400 sm:w-14"
          aria-hidden
        >
          {Array.from({ length: lineCount }, (_, idx) => {
            const n = idx + 1;
            const active = activeLine === n;
            return (
              <div
                key={n}
                className={`flex items-center justify-end gap-1 px-2 ${
                  active ? 'bg-brand-500 font-extrabold text-white' : ''
                }`}
                style={{ height: LINE }}
              >
                {active && <ArrowRight className="h-3.5 w-3.5" />}
                {n}
              </div>
            );
          })}
        </div>
        <div className="relative min-h-0 min-w-0 flex-1">
          <div
            ref={highlightRef}
            className="pointer-events-none absolute inset-0 overflow-hidden py-3"
            aria-hidden
          >
            {Array.from({ length: lineCount }, (_, idx) => {
              const n = idx + 1;
              return (
                <div
                  key={n}
                  className={activeLine === n ? 'bg-brand-500/35' : 'bg-transparent'}
                  style={{ height: LINE }}
                />
              );
            })}
          </div>
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onScroll={syncScroll}
            readOnly={readOnly}
            spellCheck={false}
            className={`relative z-10 w-full resize-none overflow-auto bg-transparent px-3 py-3 font-medium text-[#e8f4ff] outline-none caret-brand-300 sm:px-4 ${
              fill
                ? 'absolute inset-0 h-full'
                : 'h-[300px] max-h-[460px] min-h-[300px] sm:h-[380px]'
            }`}
            style={{ lineHeight: `${LINE}px`, fontSize: 15 }}
            aria-label={`${language} code editor`}
          />
        </div>
      </div>
    </div>
  );
}
