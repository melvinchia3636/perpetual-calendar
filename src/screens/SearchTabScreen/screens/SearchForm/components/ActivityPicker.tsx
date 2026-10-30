import { useMemo } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Text } from "@/components/ui";
import { AppModal } from "@/components/AppModal";
import { ACTIVITY_GROUPS, ActivityGroup } from "@/lib/constants/activities";

export function ActivityPicker({
  visible,
  value,
  groups = ACTIVITY_GROUPS,
  onSelect,
  onClose,
}: {
  visible: boolean;
  value: string;
  groups?: ActivityGroup[];
  onSelect: (activity: string) => void;
  onClose: () => void;
}) {
  const sections = useMemo(
    () =>
      groups.map((group) => ({
        title: group.title,
        data: group.items,
      })),
    [groups],
  );

  return (
    <AppModal
      visible={visible}
      title="选择事项"
      onClose={onClose}
      contentClassName="h-[78%]"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {sections.map((section) => (
          <View key={section.title} className="mt-4">
            <Text className="mb-2 text-[13px] font-semibold text-muted">
              {section.title}
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {section.data.map((item) => {
                const selected = value === item;

                return (
                  <Pressable
                    key={item}
                    onPress={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className={`w-[31.5%] items-center justify-center rounded-lg border px-2 py-2.5 ${
                      selected
                        ? "border-brand bg-brand-bg"
                        : "border-line bg-card"
                    }`}
                  >
                    <Text
                      numberOfLines={1}
                      className={`text-[14px] ${
                        selected ? "text-brand" : "text-ink"
                      }`}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </AppModal>
  );
}
