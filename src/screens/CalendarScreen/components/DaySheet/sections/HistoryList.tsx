import { View } from 'react-native';
import { HISTORY } from '../../../../../data/history';
import { Text } from '../../../../../components/AppText';
import { SectionTitle } from '../../../../../components/ui';

export function HistoryList({ date }: { date: string }) {
  const history = HISTORY[date.slice(5)] ?? [];

  if (history.length === 0) return null;

  return (
    <>
      <SectionTitle>历史上的今天</SectionTitle>
      {history.map((entry) => (
        <View
          key={`${entry.year}-${entry.text}`}
          className="mb-2.5 rounded-[14px] border border-line bg-card p-4"
        >
          <View className="self-start rounded-md border border-line bg-card-alt px-2 py-1">
            <Text className="text-[12px] font-semibold text-ink">
              {entry.year}
            </Text>
          </View>
          <Text className="mt-2 text-[14px] leading-5 text-muted">
            {entry.text}
          </Text>
        </View>
      ))}
    </>
  );
}
