import 'react-native';

// React Native 0.88 still supports this Android prop, but it was removed from
// the public TypeScript types. Noto Sans SC has large metrics, so leaving it on
// adds extra vertical padding around every Text.
declare module 'react-native' {
  interface TextProps {
    includeFontPadding?: boolean;
  }

  interface TextInputProps {
    includeFontPadding?: boolean;
  }
}
