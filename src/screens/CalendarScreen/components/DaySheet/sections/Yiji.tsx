import { View } from 'react-native';
import type { Almanac } from '../../../../../lib/core';
import { Text } from '../../../../../components/AppText';
import { SectionTitle } from '../../../../../components/ui';

function YiJiCard({ type, items }: { type: 'yi' | 'ji'; items: string[] }) {
  const good = type === 'yi';

  return (
    <View
      className={`rounded-2xl border p-3.5 ${
        good ? 'border-success-line' : 'border-brand-line'
      }`}
    >
      <View className="flex-row items-center">
        <View
          className={`h-6 w-6 items-center justify-center rounded-md ${
            good ? 'bg-success' : 'bg-brand'
          }`}
        >
          <Text className="text-[12px] font-bold text-white">
            {good ? '宜' : '忌'}
          </Text>
        </View>
        <Text
          className={`ml-2 text-[14px] font-semibold ${
            good ? 'text-success' : 'text-brand'
          }`}
        >
          {good ? '今日宜' : '今日忌'}
        </Text>
        <Text className="ml-auto text-[12px] text-faint">
          {good ? '顺应天时 · 择吉而行' : '审慎行事 · 规避凶煞'}
        </Text>
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <View
              key={item}
              className="rounded-lg border border-line bg-card-alt px-2.5 py-1"
            >
              <Text className="text-[13px] text-ink">{item}</Text>
            </View>
          ))
        ) : (
          <Text className="text-[13px] text-faint">—</Text>
        )}
      </View>
    </View>
  );
}

export function Yiji({ almanac }: { almanac: Almanac }) {
  return (
    <>
      <SectionTitle>今日宜忌</SectionTitle>
      <YiJiCard type="yi" items={almanac.yiji.yi} />
      <View className="h-2.5" />
      <YiJiCard type="ji" items={almanac.yiji.ji} />
    </>
  );
}
