import type { ReactNode } from 'react';
import { View } from 'react-native';
import { Text } from './Text';
import { TONES, type Tone } from './tones';

export function Pill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: Tone;
}) {
  const t = TONES[tone];

  return (
    <View className={`rounded-full border px-2.5 py-0.5 ${t.container}`}>
      <Text className={`text-[12px] font-semibold leading-4 ${t.text}`}>
        {children}
      </Text>
    </View>
  );
}
