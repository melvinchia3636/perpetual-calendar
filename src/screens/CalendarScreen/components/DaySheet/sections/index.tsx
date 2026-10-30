import { View } from 'react-native';
import { Loading } from '@/components/ui';
import { useDaySheet } from '../contexts/DaySheetContext';
import { ChongSha } from './ChongSha';
import { Directions } from './Directions';
import { Hours } from './Hours';
import { Meta } from './Meta';
import { Tianshen } from './Tianshen';
import { Xiu } from './Xiu';
import { Yiji } from './Yiji';
import { Zmt } from './Zmt';
import { Zodiac } from './Zodiac';

export function Sections() {
  const { expanded, contentReady } = useDaySheet();

  if (!expanded) return null;

  return (
    <>
      <View className="mt-4 h-px bg-line" />
      {!contentReady ? (
        <Loading className="py-10" />
      ) : (
        <>
          <Yiji />
          <Hours />
          <Tianshen />
          <Directions />
          <ChongSha />
          <Zodiac />
          <Xiu />
          <Zmt />
          <Meta />
        </>
      )}
    </>
  );
}
