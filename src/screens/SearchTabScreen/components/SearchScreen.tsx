import dayjs from 'dayjs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { styled } from 'nativewind';
import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  Button as PaperButton,
  IconButton,
  SegmentedButtons,
} from 'react-native-paper';
import type { MatchScope, YijiType } from '../../../lib/core';
import {
  ALL_ACTIVITIES,
  DEFAULT_ACTIVITY,
  DEFAULT_HOUR_ACTIVITY,
  HOUR_ACTIVITIES,
  HOUR_ACTIVITY_GROUPS,
} from '../../../data/activities';
import { ActivityPicker } from './ActivityPicker';
import { MonthPicker } from '../../../components/MonthPicker';
import { Text } from '../../../components/AppText';
import type { SearchParams } from './types';

const StyledButton = styled(PaperButton, { className: 'style' });

export function SearchScreen({
  onSubmit,
}: {
  onSubmit: (params: SearchParams) => void;
}) {
  const [month, setMonth] = useState(() => dayjs().startOf('month'));
  const [activity, setActivity] = useState('');
  const [type, setType] = useState<YijiType>('yi');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);
  const [scope, setScope] = useState<MatchScope>('day');
  const [loading, setLoading] = useState(false);

  const changeMonth = (delta: number) => {
    setMonth((current) => current.add(delta, 'month'));
  };

  const changeScope = (next: MatchScope) => {
    setScope(next);

    const available = next === 'hour' ? HOUR_ACTIVITIES : ALL_ACTIVITIES;
    if (activity !== '' && !available.includes(activity)) {
      setActivity(
        next === 'hour' ? DEFAULT_HOUR_ACTIVITY : DEFAULT_ACTIVITY,
      );
    }
  };

  const run = () => {
    const term = activity.trim();
    if (!term || loading) return;

    setLoading(true);
    // Paint the spinner before running the synchronous almanac scan.
    setTimeout(() => {
      onSubmit({
        month: month.format('YYYY-MM'),
        activity: term,
        type,
        scope,
      });
      setLoading(false);
    }, 0);
  };

  return (
    <>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-[18px] pb-10 pt-4">
          <Text className="mt-4 text-[24px] font-bold text-ink">
            良辰吉日查询
          </Text>
          <Text className="mt-1 text-[13px] text-muted">
            选择月份和事项，列出适合的日子
          </Text>

          <View className="mt-6 flex-row items-center justify-between rounded-2xl border border-line bg-card px-1">
            <IconButton
              icon="chevron-left"
              size={22}
              iconColor="#F2F2F3"
              onPress={() => changeMonth(-1)}
            />
            <Pressable
              onPress={() => setMonthPickerOpen(true)}
              className="flex-row items-center gap-1.5 px-2 py-1"
            >
              <Text className="text-[16px] font-semibold text-ink">
                {month.format('YYYY年M月')}
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
              onPress={() => changeMonth(1)}
            />
          </View>

          <Text className="mt-5 text-[13px] text-muted">范围</Text>
          <View className="mt-2">
            <SegmentedButtons
              value={scope}
              onValueChange={(value) => changeScope(value as MatchScope)}
              density="small"
              buttons={[
                { value: 'day', label: '吉日', icon: 'calendar-check' },
                { value: 'hour', label: '吉时', icon: 'clock-outline' },
              ]}
            />
          </View>

          {scope === 'hour' && (
            <Text className="mt-2 text-[12px] text-faint">
              时辰宜忌只包含 {HOUR_ACTIVITIES.length} 个事项，已按范围筛选
            </Text>
          )}

          <Text className="mt-5 text-[13px] text-muted">事项</Text>
          <Pressable
            onPress={() => setPickerOpen(true)}
            className="mt-2 flex-row items-center justify-between rounded-xl border border-line bg-card px-4 py-3.5"
          >
            <Text
              className={`text-[16px] ${
                activity === '' ? 'text-muted' : 'text-ink'
              }`}
            >
              {activity === '' ? '请选择事项' : activity}
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

          <View className="mt-5">
            <SegmentedButtons
              value={type}
              onValueChange={(value) => setType(value as YijiType)}
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
          </View>

          <View className="mt-6">
            <StyledButton
              mode="contained"
              uppercase={false}
              loading={loading}
              disabled={activity === ''}
              icon={scope === 'hour' ? 'clock-outline' : 'magnify'}
              onPress={run}
            >
              {scope === 'hour' ? '查询吉时' : '查询吉日'}
            </StyledButton>
          </View>
        </View>
      </ScrollView>

      {pickerOpen && (
        <ActivityPicker
          visible
          value={activity}
          groups={scope === 'hour' ? HOUR_ACTIVITY_GROUPS : undefined}
          onClose={() => setPickerOpen(false)}
          onSelect={setActivity}
        />
      )}
      {monthPickerOpen && (
        <MonthPicker
          visible
          value={month}
          onClose={() => setMonthPickerOpen(false)}
          onSelect={setMonth}
        />
      )}
    </>
  );
}
