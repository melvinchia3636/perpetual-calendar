import dayjs, { type Dayjs } from 'dayjs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { memo, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { Appbar } from 'react-native-paper';
import { findGoodDays, type DayMatch } from '../../../lib/core';
import { HourCard } from '../../../components/HourCard';
import { AppModal } from '../../../components/AppModal';
import { Text } from '../../../components/AppText';
import { Section } from '../../../components/ui';
import type { SearchParams } from './types';

const DayResult = memo(function DayResult({
  item,
  onPick,
}: {
  item: DayMatch;
  onPick: (date: Dayjs) => void;
}) {
  return (
    <Pressable onPress={() => onPick(dayjs(item.date))}>
      <Section className="mx-[18px] mt-3">
        <View className="flex-row items-baseline gap-2">
          <Text className="text-[17px] font-bold text-ink">
            {dayjs(item.date).format('M月D日')}
          </Text>
          <Text className="text-[13px] text-muted">{item.weekday}</Text>
        </View>

        <Text className="mt-1 text-[13px] text-muted">
          农历{item.lunar}
        </Text>
        <Text className="mt-0.5 text-[13px] text-muted">
          {item.ganzhiYear}年 · {item.ganzhiMonth}月 · {item.ganzhiDay}日
        </Text>

        <View className="mt-3 flex-row flex-wrap gap-y-3">
          <View className="w-1/2 pr-2">
            <Text className="text-[12px] text-faint">星神</Text>
            <Text className="mt-0.5 text-[14px] text-ink">
              {item.tianshen}
            </Text>
          </View>
          <View className="w-1/2">
            <Text className="text-[12px] text-faint">十二神</Text>
            <Text className="mt-0.5 text-[14px] text-ink">
              {item.zhixing}日
            </Text>
          </View>
          <View className="w-1/2 pr-2">
            <Text className="text-[12px] text-faint">廿八宿</Text>
            <Text className="mt-0.5 text-[14px] text-ink">{item.xiu}</Text>
          </View>
          <View className="w-1/2">
            <Text className="text-[12px] text-faint">相冲生肖</Text>
            <Text className="mt-0.5 text-[14px] text-ink">
              {item.chongShengXiao || '—'}
            </Text>
          </View>
        </View>

        {item.hours.length > 0 && (
          <Text className="mt-2 text-[12px] text-faint">
            {item.hours.length} 个时辰
          </Text>
        )}
      </Section>
    </Pressable>
  );
});

const HourGroup = memo(function HourGroup({
  item,
  onPick,
}: {
  item: DayMatch;
  onPick: (date: Dayjs) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable onPress={() => setOpen(true)}>
        <Section className="mx-[18px] mt-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <View className="flex-row items-baseline gap-2">
                <Text className="text-[17px] font-bold text-ink">
                  {dayjs(item.date).format('M月D日')}
                </Text>
                <Text className="text-[13px] text-muted">
                  {item.weekday}
                </Text>
              </View>

              <Text className="mt-0.5 text-[13px] text-muted">
                {item.hours.length} 个时辰 · 农历{item.lunar} ·{' '}
                {item.ganzhiYear}年 {item.ganzhiMonth}月{' '}
                {item.ganzhiDay}日
              </Text>
            </View>

            <MaterialCommunityIcons
              name="chevron-right"
              size={18}
              color="#9A9AA2"
            />
          </View>
        </Section>
      </Pressable>

      {open && (
        <AppModal
          visible
          title={`${dayjs(item.date).format('M月D日')} ${item.weekday}`}
          subtitle={`农历${item.lunar} · ${item.ganzhiYear}年 ${item.ganzhiMonth}月 ${item.ganzhiDay}日 · ${item.hours.length} 个匹配时辰`}
          onClose={() => setOpen(false)}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {item.hours.map((slot) => (
              <HourCard
                key={`${item.date}-${slot.ganzhi}-${slot.startTime}`}
                slot={slot}
              />
            ))}
          </ScrollView>

          <Pressable
            onPress={() => {
              setOpen(false);
              onPick(dayjs(item.date));
            }}
            className="mt-3 self-start rounded-lg border border-line bg-card px-3 py-2"
          >
            <Text className="text-[13px] text-ink">查看当天详情</Text>
          </Pressable>
        </AppModal>
      )}
    </>
  );
});

export function SearchResults({
  params,
  onBack,
  onPick,
}: {
  params: SearchParams;
  onBack: () => void;
  onPick: (date: Dayjs) => void;
}) {
  const { month, activity, type, scope } = params;

  const result = useMemo(
    () => findGoodDays(month, activity, { type, scope }),
    [activity, month, scope, type],
  );

  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = result.matches.slice(0, visibleCount);
  const hasMore = visibleCount < result.matches.length;

  const summary =
    result.matches.length === 0
      ? '没有匹配的结果'
      : result.scope === 'hour'
        ? `共 ${result.matches.reduce(
            (total, item) => total + item.hours.length,
            0,
          )} 个吉时 · ${result.matches.length} 天`
        : `共 ${result.matches.length} 个吉日`;

  return (
    <View className="flex-1 bg-app">
      <View className="border-b border-line">
        <Appbar.Header statusBarHeight={0} elevated={false}>
          <Appbar.BackAction onPress={onBack} />
          <View className="ml-1 flex-1">
            <Text className="text-[20px] font-bold text-ink">查询结果</Text>
            <Text
              numberOfLines={1}
              className="mt-0.5 text-[12px] text-muted"
            >
              {month.replace('-', '年')}月 · {activity} ·{' '}
              {scope === 'hour' ? '吉时' : '吉日'} · {summary}
            </Text>
          </View>
        </Appbar.Header>
      </View>

      <FlashList
        data={visible}
        keyExtractor={(item) => item.date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        onEndReached={() => {
          if (hasMore) setVisibleCount((current) => current + PAGE_SIZE);
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View className="items-center px-6 py-16">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full border border-line bg-card">
              <MaterialCommunityIcons
                name="calendar-remove-outline"
                size={30}
                color="#6B6B72"
              />
            </View>
            <Text className="text-[15px] text-ink">没有匹配的结果</Text>
            <Text className="mt-2 text-[13px] text-muted">
              试试其他月份或事项
            </Text>
          </View>
        }
        ListFooterComponent={
          hasMore ? (
            <Text className="py-4 text-center text-[12px] text-faint">
              加载更多…
            </Text>
          ) : null
        }
        renderItem={({ item }) =>
          scope === 'hour' ? (
            <HourGroup item={item} onPick={onPick} />
          ) : (
            <DayResult item={item} onPick={onPick} />
          )
        }
      />
    </View>
  );
}
