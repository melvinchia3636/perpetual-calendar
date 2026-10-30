import { View } from 'react-native';
import { Text } from '../AppText';

export function Row({
  label,
  value,
  valueClassName = 'text-ink',
  last = false,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  last?: boolean;
}) {
  return (
    <View
      className={`flex-row items-center justify-between gap-4 py-3.5 ${
        last ? '' : 'border-b border-line'
      }`}
    >
      <Text className="text-[14px] text-muted">{label}</Text>
      <Text
        className={`shrink text-right text-[14px] font-semibold ${valueClassName}`}
      >
        {value}
      </Text>
    </View>
  );
}
