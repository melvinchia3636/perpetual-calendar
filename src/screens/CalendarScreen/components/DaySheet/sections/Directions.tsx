import { View } from 'react-native';
import type { Almanac } from '@/lib/core';
import { useDaySheet } from '../contexts/DaySheetContext';
import { InfoTile, SectionTitle } from '@/components/ui';

const DIRECTION_ROWS: {
  label: string;
  key: keyof Almanac['jishen'];
  tone: string;
}[][] = [
  [
    { label: '喜神', key: 'dayXi', tone: 'text-brand' },
    { label: '福神', key: 'dayFu', tone: 'text-gold' },
    { label: '财神', key: 'dayCai', tone: 'text-success' },
  ],
  [
    { label: '阳贵神', key: 'dayYangGui', tone: 'text-info' },
    { label: '阴贵神', key: 'dayYinGui', tone: 'text-violet' },
  ],
];

export function Directions() {
  const { almanac } = useDaySheet();

  return (
    <>
      <SectionTitle>吉神财神吉方</SectionTitle>
      {DIRECTION_ROWS.map((row, index) => (
        <View
          key={index}
          className={`flex-row gap-2.5 ${index > 0 ? 'mt-2.5' : ''}`}
        >
          {row.map(({ label, key, tone }) => (
            <InfoTile
              key={label}
              label={label}
              value={almanac.jishen[key]}
              valueClassName={tone}
            />
          ))}
        </View>
      ))}
    </>
  );
}
