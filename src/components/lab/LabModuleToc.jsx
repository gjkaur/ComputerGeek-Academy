import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, PanelsTopLeft } from 'lucide-react';
import { BOOTCAMP_LAB_WEEKS } from '../../data/labExamples';

/**
 * Collapsible left TOC: Week → Module → exercises.
 * Readable font sizes only — click to expand and show the full title/description.
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
  const [detailKey, setDetailKey] = useState(null);

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
    setDetailKey(ex.id);
    onSelect(ex);
  };

  if (!open) {
    return (
      <div className="flex w-12 shrink-0 flex-col border-r border-navy-200 bg-navy-900">
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
    <aside className="flex w-[min(100%,22rem)] shrink-0 flex-col border-r border-navy-200 bg-navy-950 text-white sm:w-96">
      <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-white/10 px-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-brand-300">Index</p>
          <p className="text-base font-bold">Modules · 5 exercises each</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold text-navy-200 hover:bg-white/10 hover:text-white"
          title="Hide module index"
        >
          Hide
        </button>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-3" aria-label="Lab modules">
        {weeks.map((week) => {
          const weekOpen = expandedWeeks.has(week.week);
          const weekDetail = detailKey === `week-${week.week}`;
          return (
            <div key={week.week} className="mb-2">
              <button
                type="button"
                onClick={() => {
                  toggleWeek(week.week);
                  setDetailKey(`week-${week.week}`);
                }}
                className="flex w-full items-start gap-2 rounded-xl px-3 py-2.5 text-left hover:bg-white/10"
              >
                {weekOpen ? (
                  <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
                ) : (
                  <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-brand-300" />
                )}
                <span className="min-w-0">
                  <span className="block text-base font-extrabold text-brand-300">
                    Week {week.week}
                  </span>
                  {weekDetail || weekOpen ? (
                    <span className="mt-1 block text-sm leading-snug text-navy-100">{week.title}</span>
                  ) : null}
                </span>
              </button>

              {weekOpen &&
                week.modules.map((mod) => {
                  const modKey = `${week.week}-${mod.module}`;
                  const modOpen = expandedModules.has(modKey);
                  const modDetail = detailKey === `mod-${modKey}`;
                  return (
                    <div key={modKey} className="mb-1 ml-3 border-l-2 border-white/15 pl-3">
                      <button
                        type="button"
                        onClick={() => {
                          toggleModule(week.week, mod.module);
                          setDetailKey(`mod-${modKey}`);
                        }}
                        className="flex w-full items-start gap-2 rounded-xl px-2 py-2 text-left hover:bg-white/10"
                      >
                        {modOpen ? (
                          <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-navy-200" />
                        ) : (
                          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-navy-200" />
                        )}
                        <span className="min-w-0">
                          <span className="block text-base font-bold text-white">
                            Module {mod.module}
                          </span>
                          {(modDetail || modOpen) && (
                            <span className="mt-1 block text-sm leading-snug text-navy-100">
                              {mod.moduleTitle}
                            </span>
                          )}
                        </span>
                      </button>

                      {modOpen && (
                        <ul className="mb-3 ml-2 space-y-1 border-l-2 border-white/10 pl-3">
                          {mod.examples.map((ex) => {
                            const isActive = ex.id === activeExampleId;
                            const showDetail = isActive || detailKey === ex.id;
                            const shortLabel = `Ex ${ex.exercise}`;
                            return (
                              <li key={ex.id}>
                                <button
                                  type="button"
                                  onClick={() => selectExercise(ex)}
                                  className={`w-full rounded-xl px-3 py-2.5 text-left transition ${
                                    isActive
                                      ? 'bg-brand-500 text-white'
                                      : 'text-navy-50 hover:bg-white/10'
                                  }`}
                                >
                                  <span className="block text-base font-bold">{shortLabel}</span>
                                  {showDetail && (
                                    <>
                                      <span className="mt-1 block text-sm font-semibold leading-snug">
                                        {ex.title.replace(/^M\d+\s·\sEx\d+\s·\s/, '')}
                                      </span>
                                      {ex.description && (
                                        <span
                                          className={`mt-2 block text-sm leading-relaxed ${
                                            isActive ? 'text-brand-50' : 'text-navy-200'
                                          }`}
                                        >
                                          {ex.description}
                                        </span>
                                      )}
                                    </>
                                  )}
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
