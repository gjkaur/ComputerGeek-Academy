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
}) {
  const entries = Object.entries(locals || {});

  return (
    <div className="lab-panel rounded-2xl border-2 border-navy-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500 text-white">
          <HardDrive className="h-6 w-6" />
        </div>
        <div>
          <h3 className="lab-heading text-xl font-extrabold text-navy-900">Memory boxes</h3>
          <p className="lab-body text-navy-500">Each name holds one value — like labeled drawers</p>
        </div>
      </div>

      {entries.length === 0 ? (
        <p className="lab-body rounded-xl border-2 border-dashed border-navy-200 bg-navy-50/50 px-4 py-10 text-center text-navy-500">
          {emptyHint || 'Press Trace / Step to see variables appear in memory.'}
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {entries.map(([name, value]) => {
            const changed = changedKeys.includes(name);
            const hadPrev = Object.prototype.hasOwnProperty.call(prevLocals, name);
            const prev = prevLocals[name];
            return (
              <div
                key={name}
                className={`relative rounded-2xl border-2 p-4 transition-all duration-300 ${
                  changed
                    ? 'border-brand-500 bg-brand-50 shadow-lg ring-4 ring-brand-200/60'
                    : 'border-navy-100 bg-navy-50/50'
                }`}
              >
                {changed && (
                  <span className="absolute -top-2.5 right-3 rounded-full bg-brand-500 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-white">
                    {hadPrev ? 'updated' : 'new'}
                  </span>
                )}
                <div className="mb-2 flex items-center gap-2">
                  <Box className={`h-5 w-5 ${changed ? 'text-brand-600' : 'text-navy-400'}`} />
                  <span className="lab-mono text-lg font-extrabold text-navy-900">{name}</span>
                </div>

                {changed && hadPrev ? (
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="lab-mono text-base text-navy-400 line-through">
                      {formatValue(prev)}
                    </span>
                    <ArrowRight className="h-5 w-5 text-brand-500" />
                    <span className="lab-mono text-2xl font-extrabold text-brand-700">
                      {formatValue(value)}
                    </span>
                  </div>
                ) : (
                  <p className="lab-mono mb-2 break-all text-2xl font-extrabold text-brand-700">
                    {formatValue(value)}
                  </p>
                )}

                <p className="text-xs font-bold uppercase tracking-wider text-navy-400">
                  {typeLabel(value)}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
