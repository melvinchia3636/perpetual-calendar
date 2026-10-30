import { memo } from "react";
import { FlatList } from "react-native";
import { useMonthPages } from "../hooks/useMonthPages";
import { usePagerSync } from "../hooks/usePagerSync";
import { usePagerViewability } from "../hooks/usePagerViewability";
import { MONTHS } from "../lib";

export const MonthPager = memo(function MonthPager() {
  const {
    pageWidth,
    initialIndex,
    listRef,
    handleScroll,
    handleMomentumEnd,
    handleSelect,
    onScrollToIndexFailed,
  } = usePagerSync();
  const { viewabilityConfig, onViewableItemsChanged } = usePagerViewability();
  const { renderItem, keyExtractor } = useMonthPages(handleSelect, pageWidth);

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
});
