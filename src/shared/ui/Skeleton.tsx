import type { HTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-muted',
        className
      )}
      {...props}
    />
  );
}

export default Skeleton;
