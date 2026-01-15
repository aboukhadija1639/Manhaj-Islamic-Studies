import * as React from 'react';

export type SeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: 'horizontal' | 'vertical';
};

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

export function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  const isVertical = orientation === 'vertical';

  return (
    <div
      role="separator"
      aria-orientation={isVertical ? 'vertical' : 'horizontal'}
      className={cx(
        'bg-border',
        isVertical ? 'w-px h-full' : 'h-px w-full',
        className
      )}
      {...props}
    />
  );
}

export default Separator;
