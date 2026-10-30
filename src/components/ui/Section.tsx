import type { ReactNode } from 'react';
import { Surface } from './Surface';

const SECTION_TONES = {
  default: 'border-[#2B2C30] bg-card',
  green: 'border-[#1F5A3C] bg-[#0E2A1E]',
  red: 'border-[#5A1E22] bg-[#2A1214]',
};

export function Section({
  children,
  tone = 'default',
  padded = true,
  className = '',
}: {
  children: ReactNode;
  tone?: keyof typeof SECTION_TONES;
  padded?: boolean;
  className?: string;
}) {
  return (
    <Surface
      elevation={0}
      className={`rounded-2xl border ${SECTION_TONES[tone]} ${
        padded ? 'p-4' : ''
      } ${className}`}
    >
      {children}
    </Surface>
  );
}
