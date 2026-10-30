import { useRef } from 'react';
import { useCalendar } from '../../../contexts/CalendarContext';

export function usePagerViewability() {
  const { setReady } = useCalendar();
  const loadedRef = useRef(false);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 10,
  }).current;

  const onViewableItemsChanged = useRef(() => {
    if (loadedRef.current) return;

    loadedRef.current = true;
    setReady(true);
  }).current;

  return { viewabilityConfig, onViewableItemsChanged };
}
