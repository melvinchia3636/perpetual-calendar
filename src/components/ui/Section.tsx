import type { ReactNode } from 'react';
import { styled } from 'nativewind';
import { Surface } from 'react-native-paper';

const StyledSurface = styled(Surface, { className: 'style' });

const SECTION_TONES = {
  default: 'border-line bg-card',
  green: 'border-success-line bg-success-bg',
  red: 'border-brand-line bg-brand-bg',
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
    <StyledSurface
      elevation={0}
      className={`rounded-2xl border ${SECTION_TONES[tone]} ${
        padded ? 'p-4' : ''
      } ${className}`}
    >
      {children}
    </StyledSurface>
  );
}
