import { useWindowDimensions } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';
import { useCalendar } from '../../../contexts/CalendarContext';

export function useCalendarMotion() {
  const { sheetProgress } = useCalendar();
  const { height } = useWindowDimensions();

  return useAnimatedStyle(() => {
    const progress = Math.max(0, Math.min(1, sheetProgress.value));
    // Smoothstep avoids a sudden start/stop while the sheet is dragged.
    const eased = progress * progress * (3 - 2 * progress);

    return {
      transform: [
        { translateY: -eased * height * 0.12 },
        { scale: 1 - eased * 0.035 },
      ],
      opacity: 1 - eased * 0.15,
    };
  });
}
