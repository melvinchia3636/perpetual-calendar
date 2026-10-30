import { View } from 'react-native';
import type { Almanac } from '../../../../../lib/core';
import { InfoTile, SectionTitle } from '../../../../../components/ui';

export function Directions({ almanac }: { almanac: Almanac }) {
  return (
    <>
      <SectionTitle>吉神财神吉方</SectionTitle>
      <View className="flex-row gap-2.5">
        <InfoTile
          label="喜神"
          value={almanac.jishen.dayXi}
          valueClassName="text-brand"
        />
        <InfoTile
          label="福神"
          value={almanac.jishen.dayFu}
          valueClassName="text-gold"
        />
        <InfoTile
          label="财神"
          value={almanac.jishen.dayCai}
          valueClassName="text-success"
        />
      </View>
      <View className="mt-2.5 flex-row gap-2.5">
        <InfoTile
          label="阳贵神"
          value={almanac.jishen.dayYangGui}
          valueClassName="text-info"
        />
        <InfoTile
          label="阴贵神"
          value={almanac.jishen.dayYinGui}
          valueClassName="text-violet"
        />
      </View>
    </>
  );
}
