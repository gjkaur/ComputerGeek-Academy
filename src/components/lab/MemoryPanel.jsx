import { HardDrive, Box, ArrowRight } from 'lucide-react';

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

function typeLabel(value) {
  if (value === null || value === undefined) return 'empty';
  if (typeof value === 'string') return 'text (str)';
  if (typeof value === 'boolean') return 'true / false';
  if (typeof value === 'number') return Number.isInteger(value) ? 'whole number (int)' : 'number';
  if (Array.isArray(value)) return 'list (many values)';
  if (typeof value === 'object') return 'object';
  return typeof value;
}

export default function MemoryPanel({
  locals = {},
  prevLocals = {},
  changedKeys = [],
  emptyHint,
  fill = false,
}) {
  const entries = Object.entries(locals || {});

  return (
    <div
      className={`lab-panel flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border-2 border-navy-100 bg-white shadow-sm ${
        fill ? 'p-3 sm:p-4' : 'p-5 sm:p-6'
      }`}
    >
      <div className="mb-3 flex shrink-0 items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white sm:h-11 sm:w-11">
          <HardDrive className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
        <div className="min-w-0">
          <h3 className="lab-heading text-lg font-extrabold text-navy-900 sm:text-xl">Memory boxes</h3>
          <p className="truncate text-xs text-navy-500 sm:text-sm">Labeled drawers for each variable</p>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {entries.length === 0 ? (
          <p className="lab-body rounded-xl border-2 border-dashed border-navy-200 bg-navy-50/50 px-4 py-8 text-center text-sm text-navy-500">
            {emptyHint || 'Press Trace / Step to see variables appear in memory.'}
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-1 xl:grid-cols-2">
            {entries.map(([name, value]) => {
              const changed = changedKeys.includes(name);
              const hadPrev = Object.prototype.hasOwnProperty.call(prevLocals, name);
              const prev = prevLocals[name];
              return (
                <div
                  key={name}
                  className={`relative rounded-2xl border-2 p-3 transition-all duration-300 ${
                    changed
                      ? 'border-brand-500 bg-brand-50 shadow-lg ring-2 ring-brand-200/60'
                      : 'border-navy-100 bg-navy-50/50'
                  }`}
                >
                  {changed && (
                    <span className="absolute -top-2 right-2 rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-white">
                      {hadPrev ? 'updated' : 'new'}
                    </span>
                  )}
                  <div className="mb-1 flex items-center gap-2">
                    <Box className={`h-4 w-4 ${changed ? 'text-brand-600' : 'text-navy-400'}`} />
                    <span className="lab-mono text-base font-extrabold text-navy-900">{name}</span>
                  </div>

                  {changed && hadPrev ? (
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="lab-mono text-sm text-navy-400 line-through">
                        {formatValue(prev)}
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-500" />
                      <span className="lab-mono text-xl font-extrabold text-brand-700">
                        {formatValue(value)}
                      </span>
                    </div>
                  ) : (
                    <p className="lab-mono mb-1 break-all text-xl font-extrabold text-brand-700">
                      {formatValue(value)}
                    </p>
                  )}

                  <p className="text-[10px] font-bold uppercase tracking-wider text-navy-400">
                    {typeLabel(value)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
