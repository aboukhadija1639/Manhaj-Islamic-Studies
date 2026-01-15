import * as React from 'react';

export type BadgeVariant = 'default' | 'secondary' | 'outline';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const base =
    'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium border transition-colors';

  const variants: Record<BadgeVariant, string> = {
    default: 'bg-primary text-primary-foreground border-transparent',
    secondary: 'bg-muted text-foreground border-transparent',
    outline: 'bg-transparent text-foreground border-border',
  };

  return (
    <span
      className={cx(base, variants[variant], className)}
      {...props}
    />
  );
}

export default Badge;
