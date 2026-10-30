import { View } from "react-native";
import { TabPane } from "@/components/TabPane";
import { SearchForm } from "./screens/SearchForm";
import { SearchResults } from "./screens/SearchResults";
import { SearchTabProvider } from "./screens/SearchResults/contexts/SearchResultsContext";
import { SearchFormProvider } from "./screens/SearchForm/contexts/SearchFormContext";

export function SearchTabScreen() {
  return (
    <TabPane side="search">
      <SearchTabProvider>
        <SearchFormProvider>
          <View className="flex-1">
            <SearchForm />
            <SearchResults />
          </View>
        </SearchFormProvider>
      </SearchTabProvider>
    </TabPane>
  );
}
