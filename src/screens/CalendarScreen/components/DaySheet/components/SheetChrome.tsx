import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { View } from 'react-native';

export function SheetBackground({ style }: BottomSheetBackgroundProps) {
  return (
    <View style={style} className="rounded-t-3xl border border-line bg-sheet" />
  );
}

export function SheetHandle() {
  return (
    <View className="items-center pb-1 pt-3">
      <View className="h-1 w-11 rounded-full bg-handle" />
    </View>
  );
}
