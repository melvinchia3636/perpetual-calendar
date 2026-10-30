import BottomSheet from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue } from 'react-native-reanimated';
import { useApp } from '@/contexts/AppContext';
import { useDaySheet } from '../contexts/DaySheetContext';
import { useSheetProgress } from '../hooks/useSheetProgress';
import { SheetBackground, SheetHandle } from './SheetChrome';

export function BottomSheetWrapper({ children }: { children: ReactNode }) {
  const { tab } = useApp();
  const { setExpanded, setContentReady, collapsedHeight } = useDaySheet();
  const active = tab === 'calendar';
  const { top } = useSafeAreaInsets();
  const sheetRef = useRef<ComponentRef<typeof BottomSheet>>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const sheetIndex = useSharedValue(0);
  const position = useSharedValue(0);
  const topInset = top + 20;
  const snapPoints = useMemo(
    () => [collapsedHeight, '100%'],
    [collapsedHeight],
  );

  // Collapse the drawer whenever the calendar tab becomes active.
  useEffect(() => {
    if (active) sheetIndex.value = 0;
  }, [active, sheetIndex]);

  useSheetProgress({
    containerHeight,
    topInset,
    position,
  });

  return (
    <View
      className="absolute inset-0"
      pointerEvents="box-none"
      onLayout={(event) =>
        setContainerHeight(event.nativeEvent.layout.height)
      }
    >
      <BottomSheet
        ref={sheetRef}
        index={0}
        animatedIndex={sheetIndex}
        animatedPosition={position}
        topInset={topInset}
        bottomInset={0}
        enableOverDrag={false}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundComponent={SheetBackground}
        handleComponent={SheetHandle}
        onChange={(index) => {
          if (index === 1) setContentReady(true);
          if (index === 0) {
            setExpanded(false);
            setContentReady(false);
          }
        }}
      >
        {children}
      </BottomSheet>
    </View>
  );
}
