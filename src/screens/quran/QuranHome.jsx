import { View } from "react-native";
import useGoToBackHandler from "../../hooks/useGoToBackHandler";
import SearchSurahSection from "../../components/quran/SearchSurahSection.jsx";
import ShortSurahListContainer from "../../components/quran/ShortSurahListContainer.jsx";
import { useState } from "react";

const QuranHome = () => {
  useGoToBackHandler();
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <SearchSurahSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <ShortSurahListContainer searchTerm={searchTerm} />
    </View>
  );
};

export default QuranHome;
