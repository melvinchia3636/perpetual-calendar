import { View } from "react-native";
import { useDaySheet } from '../contexts/DaySheetContext';
import { zodiacRelations } from "@/lib/constants/zodiac";
import { Text } from "@/components/ui";
import { Pill, Section, SectionTitle } from "@/components/ui";

export function ChongSha() {
  const { almanac } = useDaySheet();
  const relations = zodiacRelations(almanac.shengxiao.dayShengXiao);

  const relationRows = [
    { label: "相冲", value: relations?.chong, className: "text-brand" },
    {
      label: "相刑",
      value: relations?.xing.join("、"),
      className: "text-gold",
    },
    {
      label: "相害",
      value: relations?.hai.join("、"),
      className: "text-gold",
    },
    {
      label: "相破",
      value: relations?.po.join("、"),
      className: "text-orange",
    },
    {
      label: "三合",
      value: relations?.sanHe.join("、"),
      className: "text-success",
    },
    {
      label: "六合",
      value: relations?.liuHe.join("、"),
      className: "text-success",
    },
  ];

  return (
    <>
      <SectionTitle>生肖冲煞与禁忌</SectionTitle>
      <Section padded={false}>
        <View className="flex-row items-center justify-between border-b border-line p-4">
          <Text className="text-[14px] text-muted">
            今日生肖属相{" "}
            <Text className="font-bold text-brand">
              {almanac.shengxiao.dayShengXiao}
            </Text>
          </Text>
          <Pill tone="red">煞{almanac.chongsha.daySha}</Pill>
        </View>
        <View className="px-4">
          {relationRows.map((item, index) => (
            <View
              key={item.label}
              className={`flex-row items-center justify-between gap-4 py-3.5 ${
                index === relationRows.length - 1
                  ? ''
                  : 'border-b border-line'
              }`}
            >
              <Text className="text-[14px] text-muted">{item.label}</Text>
              <Text
                className={`shrink text-right text-[14px] font-semibold ${item.className}`}
              >
                {item.value ?? '-'}
              </Text>
            </View>
          ))}
        </View>
        <View className="border-t border-line p-4">
          <Text className="text-[13px] text-faint">彭祖百忌</Text>
          <Text className="mt-1 text-[14px] leading-5 text-muted">
            {almanac.pengzu.tiangan}，{almanac.pengzu.dizhi}。
          </Text>
        </View>
      </Section>
    </>
  );
}
