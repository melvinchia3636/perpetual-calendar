import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { TONES, type Tone } from './tones';

export function Chip({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const t = TONES[tone];

  return (
    <View className={`rounded-lg border px-2.5 py-1 ${t.container}`}>
      <Text className={`text-[13px] leading-[17px] ${t.text}`}>
        {children}
      </Text>
    </View>
  );
}
