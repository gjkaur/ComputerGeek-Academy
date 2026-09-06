import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, PanelsTopLeft } from 'lucide-react';
import { BOOTCAMP_LAB_WEEKS } from '../../data/labExamples';

/**
 * Collapsible left TOC: Week → Module title → 5 exercises.
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
      if (!byWeek.has(w)) byWeek.set(w, new Map());
      const mods = byWeek.get(w);
      const key = ex.module || 0;
      if (!mods.has(key)) {
        mods.set(key, {
          module: key,
          moduleTitle: ex.moduleTitle || `Module ${key}`,
          examples: [],
        });
      }
      mods.get(key).examples.push(ex);
    }
    return BOOTCAMP_LAB_WEEKS.filter((meta) => byWeek.has(meta.week)).map((meta) => ({
      ...meta,
      modules: [...byWeek.get(meta.week).values()].sort((a, b) => a.module - b.module),
    }));
  }, [examples]);

  const active = examples.find((ex) => ex.id === activeExampleId);
  const [expandedWeeks, setExpandedWeeks] = useState(() => new Set(active?.week ? [active.week] : [1]));
  const [expandedModules, setExpandedModules] = useState(
    () => new Set(active?.module ? [`${active.week}-${active.module}`] : ['1-1']),
  );

  const toggleWeek = (week) => {
    setExpandedWeeks((prev) => {
      const next = new Set(prev);
      if (next.has(week)) next.delete(week);
      else next.add(week);
      return next;
    });
  };

  const toggleModule = (week, module) => {
    const key = `${week}-${module}`;
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectExercise = (ex) => {
    setExpandedWeeks((prev) => new Set(prev).add(ex.week));
    setExpandedModules((prev) => new Set(prev).add(`${ex.week}-${ex.module}`));
    onSelect(ex);
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
    <aside className="flex w-[min(100%,300px)] shrink-0 flex-col border-r border-navy-200 bg-navy-950 text-white sm:w-80">
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-300">Index</p>
          <p className="text-sm font-bold">Modules · 5 exercises each</p>
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
          const weekOpen = expandedWeeks.has(week.week);
          return (
            <div key={week.week} className="mb-1">
              <button
                type="button"
                onClick={() => toggleWeek(week.week)}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left hover:bg-white/10"
              >
                {weekOpen ? (
                  <ChevronDown className="h-4 w-4 shrink-0 text-brand-300" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 text-brand-300" />
                )}
                <span className="min-w-0">
                  <span className="block text-xs font-extrabold text-brand-300">Week {week.week}</span>
                  <span className="block truncate text-[11px] text-navy-200">{week.title}</span>
                </span>
              </button>

              {weekOpen &&
                week.modules.map((mod) => {
                  const modKey = `${week.week}-${mod.module}`;
                  const modOpen = expandedModules.has(modKey);
                  return (
                    <div key={modKey} className="mb-1 ml-2 border-l border-white/10 pl-2">
                      <button
                        type="button"
                        onClick={() => toggleModule(week.week, mod.module)}
                        className="flex w-full items-start gap-1.5 rounded-md px-1.5 py-1.5 text-left hover:bg-white/10"
                      >
                        {modOpen ? (
                          <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-300" />
                        ) : (
                          <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy-300" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-[11px] font-bold text-white">
                            Module {mod.module}
                          </span>
                          <span className="block text-[10px] leading-snug text-navy-300">
                            {mod.moduleTitle}
                          </span>
                        </span>
                      </button>

                      {modOpen && (
                        <ul className="mb-2 ml-3 space-y-0.5 border-l border-white/10 pl-2">
                          {mod.examples.map((ex) => {
                            const isActive = ex.id === activeExampleId;
                            return (
                              <li key={ex.id}>
                                <button
                                  type="button"
                                  onClick={() => selectExercise(ex)}
                                  className={`w-full rounded-md px-2 py-1.5 text-left text-[11px] leading-snug transition ${
                                    isActive
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
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
