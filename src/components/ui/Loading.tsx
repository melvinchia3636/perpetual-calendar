import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import { Text } from './Text';

export function Loading({ className = '' }: { className?: string }) {
  return (
    <View className={`items-center justify-center ${className}`}>
      <ActivityIndicator animating size="small" color="#E5484D" />
      <Text className="mt-2 text-[13px] text-muted">加载中…</Text>
    </View>
  );
}
