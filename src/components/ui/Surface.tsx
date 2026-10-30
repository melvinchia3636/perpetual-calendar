import { styled } from 'nativewind';
import { Surface as PaperSurface } from 'react-native-paper';

// NativeWind interop: Paper renders through Animated.View, which does not
// consume `className` on its own.
export const Surface = styled(PaperSurface, { className: 'style' });
