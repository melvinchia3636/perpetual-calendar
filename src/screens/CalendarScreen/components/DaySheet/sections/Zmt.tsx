import { View } from 'react-native';
import type { Almanac } from '../../../../../lib/core';
import { Text } from '../../../../../components/AppText';
import { SectionTitle } from '../../../../../components/ui';

const ZMT_FIELDS: {
  label: string;
  key: keyof Almanac['zmt'];
}[] = [
  { label: '几鼠偷粮', key: 'touLiang' },
  { label: '草子几分', key: 'caoZi' },
  { label: '几牛耕田', key: 'gengTian' },
  { label: '花收几分', key: 'huaShou' },
  { label: '几龙治水', key: 'zhiShui' },
  { label: '几马驮谷', key: 'tuoGu' },
  { label: '几鸡抢米', key: 'qiangMi' },
  { label: '几姑看蚕', key: 'kanCan' },
  { label: '几屠共猪', key: 'gongZhu' },
  { label: '甲田几分', key: 'jiaTian' },
  { label: '几人分饼', key: 'fenBing' },
  { label: '几日得金', key: 'deJin' },
  { label: '几人几丙', key: 'renBing' },
  { label: '几人几锄', key: 'renChu' },
];

export function Zmt({ almanac }: { almanac: Almanac }) {
  return (
    <>
      <SectionTitle
        right={
          <Text className="text-[13px] text-muted">农候年景经验</Text>
        }
      >
        民间灶马头岁首占卜
      </SectionTitle>
      <View className="flex-row flex-wrap gap-2.5">
        {ZMT_FIELDS.map((item) => (
          <View
            key={item.key}
            className="w-[48%] rounded-[14px] border border-line bg-card p-3.5"
          >
            <Text className="text-[12px] text-muted">{item.label}</Text>
            <Text className="mt-1.5 text-[15px] font-semibold text-gold">
              {almanac.zmt[item.key]}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}
