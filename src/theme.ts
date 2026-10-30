import { configureFonts, MD3DarkTheme } from 'react-native-paper';

export const paperTheme = {
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
