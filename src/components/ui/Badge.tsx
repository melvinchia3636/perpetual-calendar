import type { ReactNode } from 'react';
import { StyledChip } from './styled-chip';

export function Badge({
  children,
  tone,
}: {
  children: ReactNode;
  tone: 'green' | 'red';
}) {
  return (
    <StyledChip
      compact
      mode="flat"
      style={{ backgroundColor: tone === 'green' ? '#3DD68C' : '#E5484D' }}
      textStyle={{
        color: '#fff',
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '700',
      }}
    >
      {children}
    </StyledChip>
  );
}
