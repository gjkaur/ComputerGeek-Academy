import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, PanelsTopLeft } from 'lucide-react';
import { BOOTCAMP_LAB_WEEKS } from '../../data/labExamples';

/**
 * Collapsible left table-of-contents for bootcamp lab modules.
 */
export default function LabModuleToc({
  examples,
  activeExampleId,
  onSelect,
  open,
  onToggle,
}) {
  const weeks = useMemo(() => {
    const byWeek = new Map();
    for (const ex of examples) {
      const w = ex.week || 0;
      if (!byWeek.has(w)) byWeek.set(w, []);
      byWeek.get(w).push(ex);
    }
    return BOOTCAMP_LAB_WEEKS.filter((meta) => byWeek.has(meta.week)).map((meta) => ({
      ...meta,
      examples: byWeek.get(meta.week),
    }));
  }, [examples]);

  const activeWeek = examples.find((ex) => ex.id === activeExampleId)?.week;
  const [expanded, setExpanded] = useState(() => new Set(activeWeek ? [activeWeek] : [1]));

  const toggleWeek = (week) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  if (!open) {
    return (
      <div className="flex w-11 shrink-0 flex-col border-r border-navy-200 bg-navy-900">
        <button
          type="button"
          onClick={onToggle}
          className="flex h-12 items-center justify-center text-white hover:bg-navy-800"
          title="Show module index"
          aria-label="Show module index"
        >
          <PanelsTopLeft className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <aside className="flex w-[min(100%,280px)] shrink-0 flex-col border-r border-navy-200 bg-navy-950 text-white sm:w-72">
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-300">Index</p>
          <p className="text-sm font-bold">Bootcamp modules</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg px-2 py-1 text-xs font-semibold text-navy-200 hover:bg-white/10 hover:text-white"
          title="Hide module index"
        >
          Hide
        </button>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2" aria-label="Lab modules">
        {weeks.map((week) => {
          const isOpen = expanded.has(week.week);
          return (
            <div key={week.week} className="mb-1">
              <button
                type="button"
                onClick={() => toggleWeek(week.week)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-white/10"
              >
                {isOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-brand-300" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-brand-300" />
                )}
                <span className="min-w-0">
                  <span className="block text-xs font-extrabold text-brand-300">Week {week.week}</span>
                  <span className="block truncate text-[11px] text-navy-200">{week.title}</span>
                </span>
              </button>
              {isOpen && (
                <ul className="mb-2 ml-2 space-y-0.5 border-l border-white/10 pl-2">
                  {week.examples.map((ex) => {
                    const active = ex.id === activeExampleId;
                    return (
                      <li key={ex.id}>
                        <button
                          type="button"
                          onClick={() => onSelect(ex)}
                          className={`w-full rounded-md px-2 py-1.5 text-left text-xs leading-snug transition ${
                            active
                              ? 'bg-brand-500 font-bold text-white'
                              : 'text-navy-100 hover:bg-white/10'
                          }`}
                          title={ex.description}
                        >
                          {ex.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
