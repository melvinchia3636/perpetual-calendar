import dayjs, { type Dayjs } from 'dayjs';
import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { SearchParams } from '../../../types';

type SearchFormContextValue = {
  form: SearchParams<Dayjs>;
  setForm: Dispatch<SetStateAction<SearchParams<Dayjs>>>;
};

const SearchFormContext = createContext<SearchFormContextValue | null>(null);

export function SearchFormProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<SearchParams<Dayjs>>(() => ({
    month: dayjs().startOf('month'),
    activity: '',
    type: 'yi',
    scope: 'day',
  }));

  return (
    <SearchFormContext.Provider value={{ form, setForm }}>
      {children}
    </SearchFormContext.Provider>
  );
}

export function useSearchForm() {
  const value = useContext(SearchFormContext);

  if (!value) {
    throw new Error('useSearchForm must be used within a SearchFormProvider');
  }

  return value;
}
