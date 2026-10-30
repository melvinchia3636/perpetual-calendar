import { XIU_GROUPS, xiuGroup } from '@/lib/constants/zodiac';
import { useDaySheet } from '../contexts/DaySheetContext';
import { Text } from '@/components/ui';
import { Section, SectionTitle } from '@/components/ui';

export function Xiu() {
  const { almanac } = useDaySheet();
  const group = xiuGroup(almanac.xiu.xiu);

  return (
    <>
      <SectionTitle>二十八宿</SectionTitle>
      <Section>
        <Text className="text-[14px] leading-6 text-ink">
          今日是{group.direction}七宿 {almanac.xiu.xiu}
          ，对应的七政是{almanac.xiu.zheng}
          ，对应的动物是{almanac.xiu.animal}。
        </Text>
        <Text className="mt-2.5 text-[13px] leading-6 text-muted">
          {XIU_GROUPS.map(
            (item) => `${item.direction}七宿：${item.xiu.join('、')}；`,
          ).join('')}
        </Text>
        <Text className="mt-2.5 text-[13px] leading-6 text-muted">
          星宿歌诀：{almanac.xiu.xiuSong}
        </Text>
      </Section>
    </>
  );
}
