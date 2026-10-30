import './global.css';

import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { styled } from 'nativewind';
import {
  GestureHandlerRootView as RawGestureHandlerRootView,
} from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  SafeAreaView as RawSafeAreaView,
} from 'react-native-safe-area-context';
import { configureFonts, MD3DarkTheme, PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { NotoSansSC_400Regular } from '@expo-google-fonts/noto-sans-sc/400Regular';
import { NotoSansSC_700Bold } from '@expo-google-fonts/noto-sans-sc/700Bold';
import type { Dayjs } from 'dayjs';
import { BottomNav, type Tab } from './components/BottomNav';
import { CalendarScreen } from './screens/CalendarScreen';
import { SearchTabScreen } from './screens/SearchTabScreen';

const GestureHandlerRootView = styled(RawGestureHandlerRootView, {
  className: 'style',
});
const SafeAreaView = styled(RawSafeAreaView, { className: 'style' });

const paperTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({
    config: { fontFamily: 'NotoSansSC_400Regular' },
  }),
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#E5484D',
    onPrimary: '#FFFFFF',
    primaryContainer: '#2A1214',
    onPrimaryContainer: '#FFB4B6',
    secondary: '#E5484D',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#2A2A2E',
    onSecondaryContainer: '#F2F2F3',
    background: '#08080A',
    onBackground: '#F2F2F3',
    surface: '#1A1A1E',
    onSurface: '#F2F2F3',
    surfaceVariant: '#232327',
    onSurfaceVariant: '#9A9AA2',
    outline: '#34343A',
    outlineVariant: '#2B2C30',
    error: '#E5484D',
  },
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    NotoSansSC_400Regular,
    NotoSansSC_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return <View className="flex-1 bg-app" />;
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <Shell />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function Shell() {
  const [tab, setTab] = useState<Tab>('calendar');
  const [picked, setPicked] = useState<{
    date: string;
    nonce: number;
  } | null>(null);

  const progress = useSharedValue(0);
  const { width } = useWindowDimensions();

  const changeTab = (next: Tab) => {
    if (next === tab) return;

    setTab(next);
    progress.value = withTiming(next === 'search' ? 1 : 0, {
      duration: 280,
      easing: Easing.out(Easing.cubic),
    });
  };

  const pickDate = (date: Dayjs) => {
    setPicked({ date: date.format('YYYY-MM-DD'), nonce: Date.now() });
    changeTab('calendar');
  };

  const calendarStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    transform: [
      { translateX: -progress.value * width * 0.18 },
      { scale: 1 - progress.value * 0.02 },
    ],
  }));

  const searchStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateX: (1 - progress.value) * width * 0.18 }],
  }));

  return (
    <View className="flex-1 bg-app">
      <StatusBar style="light" />

      <SafeAreaView edges={['top']} className="bg-brand-strong">
        <View className="h-3" />
      </SafeAreaView>

      <View className="flex-1">
        <Animated.View
          className="absolute inset-0"
          style={calendarStyle}
          pointerEvents={tab === 'calendar' ? 'auto' : 'none'}
        >
          <CalendarScreen active={tab === 'calendar'} picked={picked} />
        </Animated.View>

        <Animated.View
          className="absolute inset-0"
          style={searchStyle}
          pointerEvents={tab === 'search' ? 'auto' : 'none'}
        >
          <SearchTabScreen onPickDate={pickDate} />
        </Animated.View>
      </View>

      <BottomNav tab={tab} onChange={changeTab} />
    </View>
  );
}
