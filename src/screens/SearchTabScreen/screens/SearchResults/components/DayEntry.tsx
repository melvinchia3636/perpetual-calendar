import dayjs from "dayjs";
import { memo } from "react";
import { Pressable, View } from "react-native";
import type { DayMatch } from "@/lib/core";
import { Text } from "@/components/ui";
import { Section } from "@/components/ui";
import { useApp } from "@/contexts/AppContext";

export const DayEntry = memo(function DayEntry({ item }: { item: DayMatch }) {
  const { pickDate } = useApp();

  const details = [
    ["星神", item.tianshen],
    ["十二神", `${item.zhixing}日`],
    ["廿八宿", item.xiu],
    ["相冲生肖", item.chongShengXiao || "-"],
  ] as const;

  return (
    <Pressable onPress={() => pickDate(dayjs(item.date))}>
      <Section className="mx-[18px] mt-3">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-[17px] font-bold text-ink">
            {dayjs(item.date).format("M月D日")}
          </Text>
          <Text className="text-[13px] text-muted">{item.weekday}</Text>
        </View>
        <Text className="mt-1 text-[13px] text-muted">农历{item.lunar}</Text>
        <Text className="mt-0.5 text-[13px] text-muted">
          {item.ganzhiYear}年 · {item.ganzhiMonth}月 · {item.ganzhiDay}日
        </Text>
        <View className="mt-3 flex-row flex-wrap gap-y-3">
          {details.map(([label, value], index) => (
            <View
              key={label}
              className={`w-1/2 ${index % 2 === 0 ? "pr-2" : ""}`}
            >
              <Text className="text-[12px] text-faint">{label}</Text>
              <Text className="mt-0.5 text-[14px] text-ink">{value}</Text>
            </View>
          ))}
        </View>
        {item.hours.length > 0 && (
          <Text className="mt-2 text-[12px] text-faint">
            {item.hours.length} 个时辰
          </Text>
        )}
      </Section>
    </Pressable>
  );
});
