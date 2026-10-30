import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';
import { useCalendar } from '../../../contexts/CalendarContext';
import type { Pager } from '../lib';

type PagerContextValue = {
  pagerRef: RefObject<Pager | null>;
};

const PagerContext = createContext<PagerContextValue | null>(null);

export function PagerProvider({ children }: { children: ReactNode }) {
  const { cursor } = useCalendar();
  const pagerRef = useRef<Pager>(null);

  useEffect(() => {
    pagerRef.current?.scrollToMonth(cursor);
  }, [cursor]);

  return (
    <PagerContext.Provider value={{ pagerRef }}>
      {children}
    </PagerContext.Provider>
  );
}

export function usePager() {
  const value = useContext(PagerContext);

  if (!value) {
    throw new Error('usePager must be used within a PagerProvider');
  }

  return value;
}
