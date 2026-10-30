import type { Dayjs } from 'dayjs';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useCalendar } from '../../../contexts/CalendarContext';
import { usePager } from '../contexts/PagerContext';
import { MONTHS, monthIndex } from '../lib';

export function usePagerSync() {
  const { cursor, setCursor, setSelected } = useCalendar();
  const { pagerRef } = usePager();
  const { width: pageWidth } = useWindowDimensions();

  const initialIndex = useRef(monthIndex(cursor)).current;
  const listRef = useRef<FlatList<Dayjs>>(null);
  const indexRef = useRef(initialIndex);
  const offsetRef = useRef(initialIndex * pageWidth);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const commit = useCallback(
    (offset = offsetRef.current) => {
      if (settleTimer.current) {
        clearTimeout(settleTimer.current);
        settleTimer.current = null;
      }

      const index = Math.max(
        0,
        Math.min(MONTHS.length - 1, Math.round(offset / pageWidth)),
      );
      if (index === indexRef.current) return;

      indexRef.current = index;
      setCursor(MONTHS[index]!);
    },
    [setCursor, pageWidth],
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
        Math.min(MONTHS.length - 1, Math.round(offset / pageWidth)),
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
    pagerRef,
    () => ({
      go(delta) {
        const current = Math.round(offsetRef.current / pageWidth);
        const index = Math.max(
          0,
          Math.min(MONTHS.length - 1, current + delta),
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
    [pageWidth, pagerRef],
  );

  const handleSelect = useCallback(
    (date: Dayjs) => {
      setSelected(date);

      const index = monthIndex(date);
      const current = Math.round(offsetRef.current / pageWidth);
      if (index !== current) {
        listRef.current?.scrollToIndex({ index, animated: true });
      }
    },
    [setSelected, pageWidth],
  );

  const onScrollToIndexFailed = useCallback((info: { index: number }) => {
    setTimeout(() => {
      listRef.current?.scrollToIndex({
        index: info.index,
        animated: false,
      });
    }, 50);
  }, []);

  return {
    pageWidth,
    initialIndex,
    listRef,
    handleScroll,
    handleMomentumEnd,
    handleSelect,
    onScrollToIndexFailed,
  };
}
