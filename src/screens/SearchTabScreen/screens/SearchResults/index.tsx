import { useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSearchTab } from './contexts/SearchResultsContext';
import { ResultsHeader } from './components/ResultsHeader';
import { ResultsList } from './components/ResultsList';

export function SearchResults() {
  const { params, progress } = useSearchTab();
  const { width } = useWindowDimensions();

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: (1 - progress.value) * width }],
  }));

  if (!params) return null;

  return (
    <Animated.View className="absolute inset-0 bg-app" style={slideStyle}>
      <ResultsHeader />
      <ResultsList />
    </Animated.View>
  );
}
