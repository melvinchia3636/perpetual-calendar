import dayjs, { type Dayjs } from "dayjs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { memo, useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { Loading } from "@/components/ui";
import { Text } from "@/components/ui";
import { DayCell } from "./DayCell";
import { buildDays, DAY_CACHE, type DayInfo } from "../lib";

function MonthPageBase({
  month,
  selectedTs,
  onSelect,
  onPressMonth,
  width,
}: {
  month: Dayjs;
  selectedTs: number | null;
  onSelect: (date: Dayjs) => void;
  onPressMonth: (month: Dayjs) => void;
  width: number;
}) {
  const cacheKey = month.format("YYYY-MM");
  const [days, setDays] = useState<DayInfo[] | null>(
    () => DAY_CACHE.get(cacheKey) ?? null,
  );

  // Build after the first frame so an uncached month shows its spinner
  // instead of blocking the scroll with synchronous work.
  useEffect(() => {
    if (days) return;

    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) setDays(buildDays(month));
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [days, month]);

  return (
    <View style={{ width }} className="bg-app">
      <Pressable
        onPress={() => onPressMonth(month)}
        hitSlop={8}
        className="h-12 flex-row items-center justify-center gap-1.5"
      >
        <Text className="text-[20px] font-bold leading-none tracking-wide text-ink">
          {month.format("YYYY年M月")}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={20} color="#9A9AA2" />
      </Pressable>
      <View className="h-[36px]" />
      {days ? (
        <View className="h-[372px] flex-row flex-wrap px-[18px]">
          {days.map(({ date, label, accent, inMonth }) => (
            <DayCell
              key={date.format("YYYY-MM-DD")}
              date={date}
              label={label}
              accent={accent}
              inMonth={inMonth}
              isSelected={selectedTs !== null && date.valueOf() === selectedTs}
              isToday={date.isSame(dayjs(), "day")}
              onSelect={onSelect}
            />
          ))}
        </View>
      ) : (
        <Loading className="h-[372px]" />
      )}
    </View>
  );
}

/**
 * Only the pages that actually contain the selected day (or none) need to
 * re-render when the selection changes; all other pages keep the same
 * `selectedTs` (null) and are skipped.
 */
export const MonthPage = memo(
  MonthPageBase,
  (prev, next) =>
    prev.month === next.month &&
    prev.selectedTs === next.selectedTs &&
    prev.onSelect === next.onSelect &&
    prev.onPressMonth === next.onPressMonth &&
    prev.width === next.width,
);
