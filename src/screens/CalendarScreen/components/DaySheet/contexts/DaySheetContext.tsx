import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { Almanac, DayCalendarInfo, DayDetails } from '@/lib/core';

type DaySheetContextValue = {
  details: DayDetails;
  almanac: Almanac;
  calendar: DayCalendarInfo;
  month: number;
  date: string;
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
  contentReady: boolean;
  setContentReady: Dispatch<SetStateAction<boolean>>;
  collapsedHeight: number;
  setCollapsedHeight: Dispatch<SetStateAction<number>>;
};

const DaySheetContext = createContext<DaySheetContextValue | null>(null);

export function DaySheetProvider({
  details,
  children,
}: {
  details: DayDetails;
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const [contentReady, setContentReady] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(120);

  const value = useMemo(
    () => ({
      details,
      almanac: details.almanac,
      calendar: details.calendar,
      month: Number(details.date.slice(5, 7)),
      date: details.date,
      expanded,
      setExpanded,
      contentReady,
      setContentReady,
      collapsedHeight,
      setCollapsedHeight,
    }),
    [details, expanded, contentReady, collapsedHeight],
  );

  return (
    <DaySheetContext.Provider value={value}>
      {children}
    </DaySheetContext.Provider>
  );
}

export function useDaySheet() {
  const value = useContext(DaySheetContext);

  if (!value) {
    throw new Error('useDaySheet must be used within a DaySheetProvider');
  }

  return value;
}
