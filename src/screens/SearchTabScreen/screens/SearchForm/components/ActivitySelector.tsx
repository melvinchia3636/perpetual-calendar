import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from '@/components/ui';
import { HOUR_ACTIVITY_GROUPS } from '@/lib/constants/activities';
import { useSearchForm } from '@/screens/SearchTabScreen/screens/SearchForm/contexts/SearchFormContext';
import { ActivityPicker } from './ActivityPicker';
import { Field } from '@/components/ui';

export function ActivitySelector() {
  const { form, setForm } = useSearchForm();
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <>
      <Field label="事项">
        <Pressable
          onPress={() => setPickerOpen(true)}
          className="flex-row items-center justify-between rounded-xl border border-line bg-card px-4 py-3.5"
        >
          <Text
            className={`text-[16px] ${
              form.activity === '' ? 'text-muted' : 'text-ink'
            }`}
          >
            {form.activity === '' ? '请选择事项' : form.activity}
          </Text>
          <View className="flex-row items-center gap-1">
            <Text className="text-[13px] text-muted">选择</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color="#9A9AA2"
            />
          </View>
        </Pressable>
      </Field>

      {pickerOpen && (
        <ActivityPicker
          visible
          value={form.activity}
          groups={form.scope === 'hour' ? HOUR_ACTIVITY_GROUPS : undefined}
          onClose={() => setPickerOpen(false)}
          onSelect={(activity) =>
            setForm((current) => ({ ...current, activity }))
          }
        />
      )}
    </>
  );
}
