import { useMemo } from "react";
import { useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { Loading } from "@/components/ui";
import { useCalendar } from "../../contexts/CalendarContext";
import { MonthNav } from "./components/MonthNav";
import { MonthPager } from "./components/MonthPager";
import { WeekdayRow } from "./components/WeekdayRow";
import { PagerProvider } from "./contexts/PagerContext";
import { useCalendarMotion } from "./hooks/useCalendarMotion";
import { buildDays, PAGE_HEIGHT } from "./lib";

function MonthCalendarContent() {
  const { cursor, ready } = useCalendar();
  const { height } = useWindowDimensions();
  const motionStyle = useCalendarMotion();

  useMemo(() => {
    for (const offset of [-1, 0, 1]) {
      buildDays(cursor.add(offset, "month"));
    }
  }, []);

  return (
    <View
      className="flex-1 justify-center overflow-hidden"
      style={{ paddingBottom: height * 0.24 }}
    >
      <Animated.View style={motionStyle} className="pt-[30px]">
        <View className="relative" style={{ height: PAGE_HEIGHT }}>
          <MonthPager />
          {!ready && (
            <View
              className="absolute bottom-0 left-0 right-0 top-12 items-center justify-center bg-app"
              pointerEvents="none"
            >
              <Loading className="flex-1" />
            </View>
          )}
          <WeekdayRow />
          <MonthNav />
        </View>
      </Animated.View>
    </View>
  );
}

export function MonthCalendar() {
  return (
    <PagerProvider>
      <MonthCalendarContent />
    </PagerProvider>
  );
}
