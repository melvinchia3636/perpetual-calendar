import { memo, useState } from 'react';
import type { DayMatch } from '@/lib/core';
import { HourGroupModal } from './components/HourGroupModal';
import { HourGroupRow } from './components/HourGroupRow';

export const HourEntry = memo(function HourEntry({
  item,
}: {
  item: DayMatch;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HourGroupRow item={item} onPress={() => setOpen(true)} />

      {open && (
        <HourGroupModal item={item} onClose={() => setOpen(false)} />
      )}
    </>
  );
});
