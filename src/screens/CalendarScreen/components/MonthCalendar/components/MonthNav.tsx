import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { usePager } from '../contexts/PagerContext';

const NAV_BUTTONS = [
  { icon: 'chevron-left', delta: -1 },
  { icon: 'chevron-right', delta: 1 },
] as const;

export function MonthNav() {
  const { pagerRef } = usePager();

  return (
    <View
      className="absolute left-0 right-0 top-0 h-12 flex-row items-center justify-between px-[6px]"
      pointerEvents="box-none"
    >
      {NAV_BUTTONS.map(({ icon, delta }) => (
        <IconButton
          key={icon}
          icon={icon}
          size={22}
          iconColor="#F2F2F3"
          onPress={() => pagerRef.current?.go(delta)}
        />
      ))}
    </View>
  );
}
