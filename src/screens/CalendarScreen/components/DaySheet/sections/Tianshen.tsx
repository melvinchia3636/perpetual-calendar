import { View } from 'react-native';
import type { Almanac } from '../../../../../lib/core';
import { Text } from '../../../../../components/AppText';
import { Chip, Pill, Section, SectionTitle } from '../../../../../components/ui';

export function Tianshen({ almanac }: { almanac: Almanac }) {
  return (
    <>
      <SectionTitle
        right={
          <Pill tone="gold">
            值神：{almanac.tianshen.dayTianShen} ·{' '}
            {almanac.tianshen.dayTianShenType === '黄道'
              ? '黄道吉日'
              : '黑道日'}
          </Pill>
        }
      >
        吉凶神煞与值神
      </SectionTitle>

      <Section tone="green" className="mb-2.5">
        <View className="flex-row items-center gap-2.5">
          <View className="rounded-lg bg-success px-2.5 py-1">
            <Text className="text-[13px] font-bold text-white">
              吉神宜趋
            </Text>
          </View>
          <Text className="text-[13px] text-success">诸吉星加临庇佑</Text>
        </View>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {almanac.jishenxiongsha.dayJiShen.map((item) => (
            <Chip key={item} tone="green">
              {item}
            </Chip>
          ))}
        </View>
      </Section>

      <Section tone="red">
        <View className="flex-row items-center gap-2.5">
          <View className="rounded-lg bg-brand px-2.5 py-1">
            <Text className="text-[13px] font-bold text-white">
              凶煞宜忌
            </Text>
          </View>
          <Text className="text-[13px] text-brand">诸凶星所临宜避</Text>
        </View>
        <View className="mt-3 flex-row flex-wrap gap-2">
          {almanac.jishenxiongsha.dayXiongSha.map((item) => (
            <Chip key={item} tone="red">
              {item}
            </Chip>
          ))}
        </View>
      </Section>
    </>
  );
}
