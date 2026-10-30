import 'react-native-gesture-handler';

import { registerRootComponent } from 'expo';
import { LogBox } from 'react-native';

import App from './App';

// Emitted by @gorhom/bottom-sheet's animated styles; harmless on native.
LogBox.ignoreLogs([
  '[Reanimated] Dependencies should only be used on the web',
]);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
