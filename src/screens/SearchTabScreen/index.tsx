import { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { Dayjs } from 'dayjs';
import { SearchScreen } from './components/SearchScreen';
import { SearchResults } from './components/SearchResults';
import type { SearchParams } from './components/types';

export function SearchTabScreen({
  onPickDate,
}: {
  onPickDate: (date: Dayjs) => void;
}) {
  const { width } = useWindowDimensions();

  const [params, setParams] = useState<SearchParams | null>(null);
  const progress = useSharedValue(0);

  const open = useCallback(
    (next: SearchParams) => {
      progress.value = 0;
      setParams(next);
    },
    [progress],
  );

  useEffect(() => {
    if (!params) return;

    progress.value = withTiming(1, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  }, [params, progress]);

  const close = useCallback(() => {
    progress.value = withTiming(
      0,
      { duration: 220, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) runOnJS(setParams)(null);
      },
    );
  }, [progress]);

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (1 - progress.value) * width }],
  }));

  return (
    <View className="flex-1">
      <SearchScreen onSubmit={open} />

      {params && (
        <Animated.View
          className="absolute inset-0 bg-app"
          style={slideStyle}
        >
          <SearchResults
            params={params}
            onBack={close}
            onPick={(date) => {
              progress.value = 0;
              setParams(null);
              onPickDate(date);
            }}
          />
        </Animated.View>
      )}
    </View>
  );
}
