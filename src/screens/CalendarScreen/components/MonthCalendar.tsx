import dayjs, { type Dayjs } from 'dayjs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Pressable,
  useWindowDimensions,
  View,
} from 'react-native';
import { Text } from '../../../components/AppText';
import Animated, {
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { IconButton, ActivityIndicator } from 'react-native-paper';
import { getLunarDayLabel } from '../../../lib/core';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];
const START = dayjs('1900-01-01');
const TOTAL_MONTHS = 200 * 12;
const MONTHS = Array.from({ length: TOTAL_MONTHS }, (_, index) =>
  START.add(index, 'month'),
);

// 48px 标题行 + 36px 星期行（28px + 8px 间距）+ 372px 网格。
const PAGE_HEIGHT = 456;

interface DayInfo {
  date: Dayjs;
  label: string;
  accent: boolean;
  inMonth: boolean;
}

const DAY_CACHE = new Map<string, DayInfo[]>();

function buildDays(month: Dayjs): DayInfo[] {
  const key = month.format('YYYY-MM');
  const cached = DAY_CACHE.get(key);
  if (cached) return cached;

  const first = month.startOf('month');
  const gridStart = first.subtract(first.day(), 'day');
  const rows = Math.ceil((first.day() + month.daysInMonth()) / 7);

  const days = Array.from({ length: rows * 7 }, (_, index) => {
    const date = gridStart.add(index, 'day');
    const { lunarDay, lunarMonth, solarTerm } = getLunarDayLabel(date);

    let label = lunarDay;
    let accent = false;

    if (solarTerm) {
      label = solarTerm;
      accent = true;
    } else if (lunarDay === '初一') {
      label = `${lunarMonth}月`;
      accent = true;
    } else if (lunarDay === '十五') {
      accent = true;
    }

    return {
      date,
      label,
      accent,
      inMonth: date.month() === month.month(),
    };
  });

  DAY_CACHE.set(key, days);
  if (DAY_CACHE.size > 36) DAY_CACHE.clear();

  return days;
}

function monthIndex(month: Dayjs): number {
  return Math.max(
    0,
    Math.min(
      TOTAL_MONTHS - 1,
      (month.year() - START.year()) * 12 + month.month(),
    ),
  );
}

const DayCell = memo(function DayCell({
  date,
  label,
  accent,
  inMonth,
  isSelected,
  isToday,
  onSelect,
}: {
  date: Dayjs;
  label: string;
  accent: boolean;
  inMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  onSelect: (date: Dayjs) => void;
}) {
  return (
    <Pressable
      onPress={() => onSelect(date)}
      className={`h-[62px] w-[14.2857%] items-center justify-center ${
        inMonth ? '' : 'opacity-30'
      }`}
    >
      <View
        className={`h-[54px] min-w-[46px] items-center justify-center overflow-hidden rounded-[12px] px-2 ${
          isSelected
            ? 'bg-brand'
            : isToday
              ? 'border-[1.5px] border-brand'
              : ''
        }`}
      >
        <Text
          className={`text-[18px] font-semibold leading-none ${
            isSelected
              ? 'text-white'
              : isToday
                ? 'text-brand'
                : 'text-ink'
          }`}
        >
          {date.date()}
        </Text>
        <Text
          className={`mt-[3px] text-[11px] leading-none ${
            isSelected
              ? 'text-white'
              : accent
                ? 'text-brand'
                : 'text-muted'
          }`}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
});

function MonthPageBase({
  month,
  selectedTs,
  today,
  onSelect,
  onPressMonth,
  width,
}: {
  month: Dayjs;
  selectedTs: number | null;
  today: Dayjs;
  onSelect: (date: Dayjs) => void;
  onPressMonth: (month: Dayjs) => void;
  width: number;
}) {
  const cacheKey = month.format('YYYY-MM');
  const [days, setDays] = useState<DayInfo[] | null>(
    () => DAY_CACHE.get(cacheKey) ?? null,
  );

  // Build after the first frame so an uncached month shows its spinner
  // instead of blocking the scroll with synchronous work.
  useEffect(() => {
    if (days) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) setDays(buildDays(month));
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [days, month]);

  return (
    <View style={{ width }} className="bg-app">
      <Pressable
        onPress={() => onPressMonth(month)}
        hitSlop={8}
        className="h-12 flex-row items-center justify-center gap-1.5"
      >
        <Text className="text-[20px] font-bold leading-none tracking-wide text-ink">
          {month.format('YYYY年M月')}
        </Text>
        <MaterialCommunityIcons
          name="chevron-down"
          size={20}
          color="#9A9AA2"
        />
      </Pressable>

      {/* 28px 星期行 + 8px 与日期网格的间距 */}
      <View className="h-[36px]" />

      {days ? (
        <View className="h-[372px] flex-row flex-wrap px-[18px]">
          {days.map(({ date, label, accent, inMonth }) => (
            <DayCell
              key={date.format('YYYY-MM-DD')}
              date={date}
              label={label}
              accent={accent}
              inMonth={inMonth}
              isSelected={
                selectedTs !== null && date.valueOf() === selectedTs
              }
              isToday={date.isSame(today, 'day')}
              onSelect={onSelect}
            />
          ))}
        </View>
      ) : (
        <View className="h-[372px] items-center justify-center">
          <ActivityIndicator animating size="small" color="#E5484D" />
        </View>
      )}
    </View>
  );
}

/**
 * Only the pages that actually contain the selected day (or none) need to
 * re-render when the selection changes; all other pages keep the same
 * `selectedTs` (null) and are skipped.
 */
const MonthPage = memo(
  MonthPageBase,
  (prev, next) =>
    prev.month === next.month &&
    prev.selectedTs === next.selectedTs &&
    prev.today === next.today &&
    prev.onSelect === next.onSelect &&
    prev.onPressMonth === next.onPressMonth &&
    prev.width === next.width,
);

type Pager = {
  go: (delta: number) => void;
  scrollToMonth: (month: Dayjs) => void;
  getIndex: () => number;
};

const MonthPager = memo(
  forwardRef<
    Pager,
    {
      initialIndex: number;
      pageWidth: number;
      selectedTs: number;
      today: Dayjs;
      onSelect: (date: Dayjs) => void;
      onPressMonth: (month: Dayjs) => void;
      onMonthChange: (month: Dayjs) => void;
      onLoaded: () => void;
    }
  >(function MonthPager(
    {
      initialIndex,
      pageWidth,
      selectedTs,
      today,
      onSelect,
      onPressMonth,
      onMonthChange,
      onLoaded,
    },
    ref,
  ) {
    const listRef = useRef<FlatList<Dayjs>>(null);
    const indexRef = useRef(initialIndex);
    const offsetRef = useRef(initialIndex * pageWidth);
    const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const loadedRef = useRef(false);
    const onLoadedRef = useRef(onLoaded);
    onLoadedRef.current = onLoaded;

    const viewabilityConfig = useRef({
      itemVisiblePercentThreshold: 10,
    }).current;

    const onViewableItemsChanged = useRef(() => {
      if (loadedRef.current) return;

      loadedRef.current = true;
      onLoadedRef.current();
    }).current;

    const commit = useCallback(
      (offset = offsetRef.current) => {
        if (settleTimer.current) {
          clearTimeout(settleTimer.current);
          settleTimer.current = null;
        }

        const index = Math.max(
          0,
          Math.min(TOTAL_MONTHS - 1, Math.round(offset / pageWidth)),
        );
        if (index === indexRef.current) return;

        indexRef.current = index;
        onMonthChange(MONTHS[index]!);
      },
      [onMonthChange, pageWidth],
    );

    useEffect(() => {
      return () => {
        if (settleTimer.current) clearTimeout(settleTimer.current);
      };
    }, []);

    const handleScroll = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        offsetRef.current = event.nativeEvent.contentOffset.x;

        if (settleTimer.current) clearTimeout(settleTimer.current);
        settleTimer.current = setTimeout(() => commit(), 120);
      },
      [commit],
    );

    const handleMomentumEnd = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = event.nativeEvent.contentOffset.x;
        const index = Math.max(
          0,
          Math.min(TOTAL_MONTHS - 1, Math.round(offset / pageWidth)),
        );
        const target = index * pageWidth;

        // Guarantee the pager rests exactly on a page boundary.
        offsetRef.current = target;
        if (Math.abs(offset - target) > 0.5) {
          listRef.current?.scrollToOffset({ offset: target, animated: false });
        }

        commit(target);
      },
      [commit, pageWidth],
    );

    useImperativeHandle(
      ref,
      () => ({
        go(delta) {
          const current = Math.round(offsetRef.current / pageWidth);
          const index = Math.max(
            0,
            Math.min(TOTAL_MONTHS - 1, current + delta),
          );
          listRef.current?.scrollToIndex({ index, animated: true });
        },
        scrollToMonth(month) {
          const index = monthIndex(month);
          if (index === indexRef.current) return;

          indexRef.current = index;
          offsetRef.current = index * pageWidth;
          listRef.current?.scrollToIndex({ index, animated: false });
        },
        getIndex() {
          return indexRef.current;
        },
      }),
      [pageWidth],
    );

    const handleSelect = useCallback(
      (date: Dayjs) => {
        onSelect(date);

        const index = monthIndex(date);
        const current = Math.round(offsetRef.current / pageWidth);
        if (index !== current) {
          listRef.current?.scrollToIndex({ index, animated: true });
        }
      },
      [onSelect, pageWidth],
    );

    const renderItem = useCallback(
      ({ item }: { item: Dayjs }) => {
        const days = buildDays(item);
        const first = days[0]!.date.valueOf();
        const last = days[days.length - 1]!.date.valueOf();
        const pageSelectedTs =
          selectedTs >= first && selectedTs <= last ? selectedTs : null;

        return (
          <MonthPage
            month={item}
            selectedTs={pageSelectedTs}
            today={today}
            onSelect={handleSelect}
            onPressMonth={onPressMonth}
            width={pageWidth}
          />
        );
      },
      [handleSelect, onPressMonth, pageWidth, selectedTs, today],
    );

    const keyExtractor = useCallback(
      (month: Dayjs) => month.format('YYYY-MM'),
      [],
    );

    const onScrollToIndexFailed = useCallback((info: { index: number }) => {
      setTimeout(() => {
        listRef.current?.scrollToIndex({
          index: info.index,
          animated: false,
        });
      }, 50);
    }, []);

    return (
      <FlatList
        ref={listRef}
        data={MONTHS}
        horizontal
        snapToInterval={pageWidth}
        disableIntervalMomentum
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        getItemLayout={(_, index) => ({
          length: pageWidth,
          offset: pageWidth * index,
          index,
        })}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumEnd}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={7}
        updateCellsBatchingPeriod={16}
        removeClippedSubviews={false}
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    );
  }),
);

export function MonthCalendar({
  cursor,
  selected,
  today,
  onSelect,
  onPressMonth,
  onMonthChange,
  sheetProgress,
}: {
  cursor: Dayjs;
  selected: Dayjs;
  today: Dayjs;
  onSelect: (date: Dayjs) => void;
  onPressMonth: (month: Dayjs) => void;
  onMonthChange: (month: Dayjs) => void;
  sheetProgress: SharedValue<number>;
}) {
  const { width, height } = useWindowDimensions();
  const pageWidth = width;
  const initialScrollIndex = useRef(monthIndex(cursor)).current;
  const pagerRef = useRef<Pager>(null);
  const [ready, setReady] = useState(false);
  const selectedTs = useMemo(
    () => selected.startOf('day').valueOf(),
    [selected],
  );

  const handleLoaded = useCallback(() => setReady(true), []);

  // Warm the first three months so the initial view never flashes a spinner.
  useMemo(() => {
    for (const offset of [-1, 0, 1]) {
      buildDays(cursor.add(offset, 'month'));
    }
  }, []);

  // Safety net in case the list never reports its viewable items.
  useEffect(() => {
    if (ready) return;

    const timer = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(timer);
  }, [ready]);

  const motionStyle = useAnimatedStyle(() => {
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

  useEffect(() => {
    pagerRef.current?.scrollToMonth(cursor);
  }, [cursor]);

  return (
    <Animated.View style={motionStyle} className="pt-[30px]">
      <View className="relative" style={{ height: PAGE_HEIGHT }}>
        <MonthPager
          ref={pagerRef}
          initialIndex={initialScrollIndex}
          pageWidth={pageWidth}
          selectedTs={selectedTs}
          today={today}
          onSelect={onSelect}
          onPressMonth={onPressMonth}
          onMonthChange={onMonthChange}
          onLoaded={handleLoaded}
        />

        {!ready && (
          <View
            className="absolute inset-0 items-center justify-center bg-app"
            pointerEvents="none"
          >
            <ActivityIndicator animating size="large" color="#E5484D" />
          </View>
        )}

        {/* 固定星期行：与标题行对齐，底部留 8px 间距 */}
        <View
          className="absolute left-0 right-0 top-[48px] h-[28px] flex-row items-center px-[18px]"
          pointerEvents="none"
        >
          {WEEKDAYS.map((day) => (
            <Text
              key={day}
              className="flex-1 text-center text-[13px] text-muted"
            >
              {day}
            </Text>
          ))}
        </View>

        {/* Chevrons stay fixed while the month titles scroll with the page. */}
        <View
          className="absolute left-0 right-0 top-0 h-12 flex-row items-center justify-between px-[6px]"
          pointerEvents="box-none"
        >
          <IconButton
            icon="chevron-left"
            size={22}
            iconColor="#F2F2F3"
            onPress={() => pagerRef.current?.go(-1)}
          />
          <IconButton
            icon="chevron-right"
            size={22}
            iconColor="#F2F2F3"
            onPress={() => pagerRef.current?.go(1)}
          />
        </View>
      </View>
    </Animated.View>
  );
}
