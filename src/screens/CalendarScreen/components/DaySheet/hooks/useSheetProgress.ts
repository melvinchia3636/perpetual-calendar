import {
  useAnimatedReaction,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useCalendar } from '../../../contexts/CalendarContext';
import { useDaySheet } from '../contexts/DaySheetContext';

export function useSheetProgress({
  containerHeight,
  topInset,
  position,
}: {
  containerHeight: number;
  topInset: number;
  position: SharedValue<number>;
}) {
  const { sheetProgress: progress } = useCalendar();
  const { collapsedHeight, setExpanded, setContentReady } = useDaySheet();

  const expandedFlag = useSharedValue(false);
  const readyFlag = useSharedValue(false);

  const collapsedPosition = Math.max(0, containerHeight - collapsedHeight);
  const openDistance = Math.max(1, collapsedPosition - topInset);

  useAnimatedReaction(
    () => {
      if (containerHeight <= 0) return -1;

      return Math.max(
        0,
        Math.min(
          1,
          (collapsedPosition - position.value) / openDistance,
        ),
      );
    },
    (value) => {
      if (value < 0) return;

      progress.value = value;

      if (!expandedFlag.value && value > 0.12) {
        expandedFlag.value = true;
        scheduleOnRN(setExpanded, true);
      } else if (expandedFlag.value && value < 0.04) {
        expandedFlag.value = false;
        readyFlag.value = false;
        scheduleOnRN(setExpanded, false);
        scheduleOnRN(setContentReady, false);
      }

      if (!readyFlag.value && value > 0.9) {
        readyFlag.value = true;
        scheduleOnRN(setContentReady, true);
      }
    },
  );
}
