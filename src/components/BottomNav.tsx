import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styled } from 'nativewind';
import type { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from './AppText';

const SafeArea = styled(SafeAreaView, { className: 'style' });

export const NAV_HEIGHT = 72;

export type Tab = 'calendar' | 'search';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const TABS: { key: Tab; icon: IconName; label: string }[] = [
  { key: 'calendar', icon: 'calendar-month-outline', label: '万年历' },
  { key: 'search', icon: 'calendar-star', label: '良辰吉日查询' },
];

export function BottomNav({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (tab: Tab) => void;
}) {
  return (
    <SafeArea edges={['bottom']} className="border-t border-line bg-sheet">
      <View className="h-[72px] flex-row">
        {TABS.map((item) => {
          const active = item.key === tab;

          return (
            <Pressable
              key={item.key}
              onPress={() => onChange(item.key)}
              className="flex-1 items-center justify-center"
            >
              {active && (
                <View className="absolute left-0 right-0 top-0 h-0.5 bg-brand" />
              )}
              <View
                className={`h-7 w-7 items-center justify-center rounded-lg ${
                  active ? 'bg-brand-bg' : ''
                }`}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={active ? '#E5484D' : '#9A9AA2'}
                />
              </View>
              <Text
                className={`mt-0.5 text-[11px] ${
                  active ? 'text-brand' : 'text-muted'
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeArea>
  );
}
