import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { Text } from '@/components/ui';
import { useSearchTab } from '../contexts/SearchResultsContext';

export function ResultsHeader() {
  const { result, close } = useSearchTab();

  if (!result) return null;

  const { month, activity, scope } = result;

  return (
    <View className="border-b border-line">
      <Appbar.Header statusBarHeight={0} elevated={false}>
        <Appbar.BackAction onPress={close} />
        <View className="ml-1 flex-1">
          <Text className="text-[20px] font-bold text-ink">查询结果</Text>
          <Text numberOfLines={1} className="mt-0.5 text-[12px] text-muted">
            {month.replace('-', '年')}月 · {activity} ·{' '}
            {scope === 'hour' ? '吉时' : '吉日'} ·{' '}
            {result.matches.length === 0
              ? '没有匹配的结果'
              : result.scope === 'hour'
                ? `共 ${result.matches.reduce(
                    (total, item) => total + item.hours.length,
                    0,
                  )} 个吉时 · ${result.matches.length} 天`
                : `共 ${result.matches.length} 个吉日`}
          </Text>
        </View>
      </Appbar.Header>
    </View>
  );
}
