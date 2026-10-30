import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <View>
      <Text className="text-[13px] text-muted">{label}</Text>
      <View className="mt-2">{children}</View>
    </View>
  );
}
