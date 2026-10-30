import type { ReactNode } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useApp } from '@/contexts/AppContext';

export function TabPane({
  side,
  children,
}: {
  side: 'calendar' | 'search';
  children: ReactNode;
}) {
  const { tab, tabProgress } = useApp();
  const { width } = useWindowDimensions();

  const style = useAnimatedStyle(() => {
    if (side === 'calendar') {
      return {
        opacity: 1 - tabProgress.value,
        transform: [
          { translateX: -tabProgress.value * width * 0.18 },
          { scale: 1 - tabProgress.value * 0.02 },
        ],
      };
    }

    return {
      opacity: tabProgress.value,
      transform: [{ translateX: (1 - tabProgress.value) * width * 0.18 }],
    };
  });

  return (
    <Animated.View
      className="absolute inset-0"
      style={style}
      pointerEvents={tab === side ? 'auto' : 'none'}
    >
      {children}
    </Animated.View>
  );
}
