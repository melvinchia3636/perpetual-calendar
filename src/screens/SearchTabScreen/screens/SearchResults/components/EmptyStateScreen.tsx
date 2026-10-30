import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type { ComponentProps } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';

export function EmptyStateScreen({
  icon,
  title,
  description,
}: {
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  title: string;
  description?: string;
}) {
  return (
    <View className="items-center px-6 py-16">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-full border border-line bg-card">
        <MaterialCommunityIcons name={icon} size={30} color="#6B6B72" />
      </View>
      <Text className="text-[15px] text-ink">{title}</Text>
      {description && (
        <Text className="mt-2 text-[13px] text-muted">{description}</Text>
      )}
    </View>
  );
}
