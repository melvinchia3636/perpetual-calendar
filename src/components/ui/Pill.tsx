import type { ReactNode } from 'react';
import { TONES, type Tone } from './tones';
import { StyledChip } from './styled-chip';

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const t = TONES[tone];

  return (
    <StyledChip
      compact
      mode="outlined"
      style={{ backgroundColor: t.bg, borderColor: t.border }}
      textStyle={{
        color: t.text,
        fontSize: 12,
        lineHeight: 16,
        fontWeight: '600',
      }}
    >
      {children}
    </StyledChip>
  );
}
