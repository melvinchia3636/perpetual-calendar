import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useMemo } from 'react';
import { Pressable, SectionList } from 'react-native';
import { ACTIVITY_GROUPS, type ActivityGroup } from '../../../data/activities';
import { Text } from '../../../components/AppText';
import { AppModal } from '../../../components/AppModal';

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
      <SectionList
        className="flex-1"
        sections={sections}
        keyExtractor={(item) => item}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        initialNumToRender={16}
        maxToRenderPerBatch={16}
        windowSize={7}
        renderSectionHeader={({ section }) => (
          <Text className="mb-1 mt-4 text-[13px] font-semibold text-muted">
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => {
          const selected = value === item;

          return (
            <Pressable
              onPress={() => {
                onSelect(item);
                onClose();
              }}
              className={`flex-row items-center justify-between rounded-lg px-2 py-3 ${
                selected ? 'bg-brand-bg' : ''
              }`}
            >
              <Text
                className={`text-[15px] ${
                  selected ? 'text-brand' : 'text-ink'
                }`}
              >
                {item}
              </Text>
              {selected && (
                <MaterialCommunityIcons
                  name="check"
                  size={18}
                  color="#E5484D"
                />
              )}
            </Pressable>
          );
        }}
      />
    </AppModal>
  );
}
