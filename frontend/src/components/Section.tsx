import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Section({ children, className, containerClassName }: SectionProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className={cn('container max-w-6xl', containerClassName)}>{children}</div>
    </section>
  );
}

