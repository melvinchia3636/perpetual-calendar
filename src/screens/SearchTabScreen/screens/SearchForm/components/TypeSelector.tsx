import { SegmentedButtons } from 'react-native-paper';
import type { YijiType } from '@/lib/core';
import { Field } from '@/components/ui';
import { useSearchForm } from '@/screens/SearchTabScreen/screens/SearchForm/contexts/SearchFormContext';

export function TypeSelector() {
  const { form, setForm } = useSearchForm();

  return (
    <Field label="宜忌">
      <SegmentedButtons
        value={form.type}
        onValueChange={(value) =>
          setForm((current) => ({
            ...current,
            type: value as YijiType,
          }))
        }
        density="small"
        buttons={[
          {
            value: 'yi',
            label: '宜',
            icon: 'check',
            checkedColor: '#3DD68C',
          },
          {
            value: 'ji',
            label: '忌',
            icon: 'close',
            checkedColor: '#E5484D',
          },
        ]}
      />
    </Field>
  );
}
