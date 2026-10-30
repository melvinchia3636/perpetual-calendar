import { useState } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Text } from '@/components/ui';
import { EmptyStateScreen } from './EmptyStateScreen';
import { useSearchTab } from '../contexts/SearchResultsContext';
import { DayEntry } from './DayEntry';
import { HourEntry } from './HourEntry';

export function ResultsList() {
  const { result } = useSearchTab();
  const [visibleCount, setVisibleCount] = useState(10);

  if (!result) return null;

  const hasMore = visibleCount < result.matches.length;

  return (
    <FlashList
      data={result.matches.slice(0, visibleCount)}
      keyExtractor={(item) => item.date}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 12, paddingBottom: 40 }}
      onEndReached={() => {
        if (hasMore) setVisibleCount((current) => current + 10);
      }}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <EmptyStateScreen
          icon="calendar-remove-outline"
          title="没有匹配的结果"
          description="试试其他月份或事项"
        />
      }
      ListFooterComponent={
        hasMore ? (
          <Text className="py-4 text-center text-[12px] text-faint">
            加载更多…
          </Text>
        ) : null
      }
      renderItem={({ item }) =>
        result.scope === 'hour' ? (
          <HourEntry item={item} />
        ) : (
          <DayEntry item={item} />
        )
      }
    />
  );
}
