import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { MonthPicker } from '@/components/MonthPicker';
import { Text } from '@/components/ui';
import { Field } from '@/components/ui';
import { useSearchForm } from '@/screens/SearchTabScreen/screens/SearchForm/contexts/SearchFormContext';

export function MonthSelector() {
  const { form, setForm } = useSearchForm();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <Field label="月份">
        <View className="flex-row items-center justify-between rounded-2xl border border-line bg-card px-1">
          <IconButton
            icon="chevron-left"
            size={22}
            iconColor="#F2F2F3"
            onPress={() =>
              setForm((current) => ({
                ...current,
                month: current.month.add(-1, 'month'),
              }))
            }
          />
          <Pressable
            onPress={() => setPickerOpen(true)}
            className="flex-row items-center gap-1.5 px-2 py-1"
          >
            <Text className="text-[16px] font-semibold text-ink">
              {form.month.format('YYYY年M月')}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={18}
              color="#9A9AA2"
            />
          </Pressable>
          <IconButton
            icon="chevron-right"
            size={22}
            iconColor="#F2F2F3"
            onPress={() =>
              setForm((current) => ({
                ...current,
                month: current.month.add(1, 'month'),
              }))
            }
          />
        </View>
      </Field>

      {pickerOpen && (
        <MonthPicker
          value={form.month}
          onClose={() => setPickerOpen(false)}
          onSelect={(month) =>
            setForm((current) => ({ ...current, month }))
          }
        />
      )}
    </>
  );
}
