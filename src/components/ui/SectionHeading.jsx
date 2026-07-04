export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'left' ? 'text-left' : 'text-center';
  const titleColor = light ? 'text-white' : 'text-navy-900';
  const subtitleColor = light ? 'text-navy-100' : 'text-navy-600';
  const eyebrowColor = light ? 'text-brand-200' : 'text-brand-500';

  return (
    <div className={`mb-12 ${alignClass}`}>
      {eyebrow && (
        <p className={`mb-2 text-sm font-semibold uppercase tracking-wider ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`mb-4 text-3xl font-bold md:text-4xl ${titleColor}`}>{title}</h2>
      {subtitle && (
        <p className={`mx-auto max-w-2xl text-lg leading-relaxed ${subtitleColor} ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
