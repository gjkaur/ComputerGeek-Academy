const inputClass =
  'w-full rounded-xl border border-navy-200 px-4 py-3 text-navy-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20';

export default function AuthField({ label, id, type = 'text', required, value, onChange, placeholder, autoComplete }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-navy-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}

export { inputClass };
