import BottomSheet, {
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';
import type { DayDetails } from '../../../../lib/core';
import { Divider } from '../../../../components/ui';
import { Text } from '../../../../components/AppText';
import { Header } from './sections/Header';
import { SheetBackground, SheetHandle } from './sections/SheetChrome';
import { Yiji } from './sections/Yiji';
import { Hours } from './sections/Hours';
import { Tianshen } from './sections/Tianshen';
import { Directions } from './sections/Directions';
import { ChongSha } from './sections/ChongSha';
import { Zodiac } from './sections/Zodiac';
import { Xiu } from './sections/Xiu';
import { Zmt } from './sections/Zmt';
import { Meta } from './sections/Meta';
import { HistoryList } from './sections/HistoryList';

function DaySheetBase({
  details,
  animatedIndex,
  progress,
  containerHeight,
  bottomInset,
  collapseSignal,
}: {
  details: DayDetails;
  animatedIndex: SharedValue<number>;
  progress: SharedValue<number>;
  containerHeight: number;
  bottomInset: number;
  collapseSignal: number;
}) {
  const sheetRef = useRef<ComponentRef<typeof BottomSheet>>(null);
  const { top } = useSafeAreaInsets();
  const topInset = top + 20;
  const [collapsedHeight, setCollapsedHeight] = useState(120);
  const snapPoints = useMemo(
    () => [collapsedHeight, '100%'],
    [collapsedHeight],
  );
  const [expanded, setExpanded] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  // Track the sheet's actual Y position; animatedIndex is not continuous on
  // all platforms, so drags would otherwise show nothing until release.
  const position = useSharedValue(0);
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
        runOnJS(setExpanded)(true);
      } else if (expandedFlag.value && value < 0.04) {
        expandedFlag.value = false;
        readyFlag.value = false;
        runOnJS(setExpanded)(false);
        runOnJS(setContentReady)(false);
      }

      if (!readyFlag.value && value > 0.9) {
        readyFlag.value = true;
        runOnJS(setContentReady)(true);
      }
    },
  );

  useEffect(() => {
    sheetRef.current?.snapToIndex(0);
  }, [collapseSignal]);

  const { almanac, calendar } = details;
  const month = Number(details.date.slice(5, 7));

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      animatedIndex={animatedIndex}
      animatedPosition={position}
      topInset={topInset}
      bottomInset={bottomInset}
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
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-16">
          <View
            onLayout={(event) => {
              const next = Math.ceil(
                event.nativeEvent.layout.height + 44,
              );
              if (Math.abs(next - collapsedHeight) > 1) {
                setCollapsedHeight(next);
              }
            }}
          >
            <Header details={details} />
          </View>

          {expanded && (
            <>
              <Divider className="mt-4" />
              {!contentReady ? (
                <View className="items-center py-10">
                  <ActivityIndicator animating color="#E5484D" />
                  <Text className="mt-2 text-[13px] text-muted">
                    加载中…
                  </Text>
                </View>
              ) : (
                <>
              <Yiji almanac={almanac} />
              <Hours almanac={almanac} />
              <Tianshen almanac={almanac} />
              <Directions almanac={almanac} />
              <ChongSha almanac={almanac} />
              <Zodiac almanac={almanac} calendar={calendar} month={month} />
              <Xiu almanac={almanac} />
              <Zmt almanac={almanac} />
              <Meta almanac={almanac} calendar={calendar} />
              <HistoryList date={details.date} />
                </>
              )}
            </>
          )}
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

export const DaySheet = memo(DaySheetBase);
