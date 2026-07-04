import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/25 hover:shadow-lg hover:shadow-brand-500/30',
  secondary:
    'bg-navy-900 text-white hover:bg-navy-800 shadow-md shadow-navy-900/20 hover:shadow-lg',
  outline:
    'border-2 border-brand-500 text-brand-500 hover:bg-brand-50',
  ghost:
    'text-navy-700 hover:bg-navy-50 hover:text-brand-500',
  white:
    'bg-white text-navy-900 hover:bg-brand-50 shadow-md hover:shadow-lg',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
