export default function ProgressBar({ value, className = '', showLabel = true }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={className}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-sm">
          <span className="font-medium text-navy-700">Progress</span>
          <span className="font-semibold text-brand-600">{clamped}%</span>
        </div>
      )}
      <div className="h-2.5 overflow-hidden rounded-full bg-navy-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-navy-700 transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
