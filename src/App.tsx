import "./global.css";

import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styled } from "nativewind";
import { GestureHandlerRootView as RawGestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  SafeAreaView as RawSafeAreaView,
} from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { NotoSansSC_400Regular } from "@expo-google-fonts/noto-sans-sc/400Regular";
import { NotoSansSC_700Bold } from "@expo-google-fonts/noto-sans-sc/700Bold";
import { paperTheme } from "./theme";
import { AppProvider } from "./contexts/AppContext";
import { BottomNav } from "./components/BottomNav";
import { CalendarScreen } from "./screens/CalendarScreen";
import { SearchTabScreen } from "./screens/SearchTabScreen";

const GestureHandlerRootView = styled(RawGestureHandlerRootView, {
  className: "style",
});
const SafeAreaView = styled(RawSafeAreaView, { className: "style" });

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
          <AppProvider>
            <View className="flex-1 bg-app">
              <StatusBar style="light" />
              <SafeAreaView edges={["top"]} className="bg-brand">
                <View className="h-3" />
              </SafeAreaView>
              <View className="flex-1">
                <CalendarScreen />
                <SearchTabScreen />
              </View>
              <BottomNav />
            </View>
          </AppProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
