import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { memo } from "react";
import { View } from "react-native";
import { useCalendar } from "../../contexts/CalendarContext";
import { BottomSheetWrapper } from "./components/BottomSheetWrapper";
import { DaySheetProvider } from "./contexts/DaySheetContext";
import { Header } from "./components/Header";
import { Sections } from "./sections";

function DaySheetBase() {
  const { details } = useCalendar();

  return (
    <DaySheetProvider details={details}>
      <BottomSheetWrapper>
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4 pb-16">
            <Header />
            <Sections />
          </View>
        </BottomSheetScrollView>
      </BottomSheetWrapper>
    </DaySheetProvider>
  );
}

export const DaySheet = memo(DaySheetBase);
