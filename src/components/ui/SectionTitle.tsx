import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from './Text';

export function SectionTitle({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <View className="mb-3 mt-6 flex-row items-center justify-between gap-3">
      <Text className="text-[19px] font-bold text-ink">{children}</Text>
      {right}
    </View>
  );
}
