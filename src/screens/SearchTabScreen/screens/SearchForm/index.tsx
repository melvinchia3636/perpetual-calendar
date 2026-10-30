import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui";
import { ActivitySelector } from "./components/ActivitySelector";
import { MonthSelector } from "./components/MonthSelector";
import { ScopeSelector } from "./components/ScopeSelector";
import { SubmitButton } from "./components/SubmitButton";
import { TypeSelector } from "./components/TypeSelector";

export function SearchForm() {
  return (
    <>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pb-10 pt-4">
          <Text className="mt-4 text-[24px] font-bold text-ink">
            良辰吉日查询
          </Text>
          <Text className="mt-1 text-[13px] text-muted">
            选择月份和事项，列出适合的日子
          </Text>
          <View className="mt-6 gap-4">
            <MonthSelector />
            <ScopeSelector />
            <ActivitySelector />
            <TypeSelector />
            <SubmitButton />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
