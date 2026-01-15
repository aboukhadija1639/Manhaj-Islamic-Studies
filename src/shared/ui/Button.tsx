import * as React from 'react';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  asChild?: boolean;
}


const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      disabled,
      asChild,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-xl font-medium ' +
      'transition-all duration-200 ' +
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ' +
      'disabled:pointer-events-none disabled:opacity-50 ' +
      'hover:-translate-y-0.5 active:translate-y-0';

    const variants = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm hover:shadow-md',
      secondary:
        'bg-secondary-200 text-secondary-900 hover:bg-secondary-300 active:bg-secondary-400 ' +
        'dark:bg-secondary-800 dark:text-secondary-100 dark:hover:bg-secondary-700',
      ghost: 'bg-transparent hover:bg-muted active:bg-border',
      destructive:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm hover:shadow-md',
      outline:
        'bg-transparent border border-border text-foreground hover:bg-muted/60 active:bg-muted ' +
        'dark:border-border/60',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-5 text-base',
      lg: 'h-12 px-6 text-lg',
      icon: 'h-11 w-11 p-0',
    };

    const composedClassName = cn(baseStyles, variants[variant], sizes[size], className);

    // Correct asChild: clone the child and inject className + common props
    if (asChild) {
      if (!React.isValidElement(children)) return null;

      const child = children as React.ReactElement<ButtonProps>;
      return React.cloneElement(child, {
        className: cn(composedClassName, child.props?.className),
        // Do not forward "disabled" to <a>; use aria-disabled if needed
        'aria-disabled': disabled || isLoading ? true : child.props?.['aria-disabled'],
        ...props,
      });
    }

    return (
      <button
        ref={ref}
        className={composedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
