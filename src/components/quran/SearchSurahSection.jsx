import { View, Image, TextInput } from "react-native";
import Ionicon from "../Ionicon";
import useTheme from "../../hooks/useTheme";

const SearchSurahSection = ({ searchTerm, setSearchTerm }) => {
  const { color } = useTheme();

  return (
    <View style={{ backgroundColor: color.bgColor1 }} className="p-2">
      <View className="flex flex-row items-center justify-between gap-2 w-full">
        <View className="w-[10%] h-9">
          <Image
            source={require("../../../assets/image/allah.png")}
            className="w-full h-full"
          />
        </View>
        <View className="relative w-[75.5%]">
          <TextInput
            style={{
              backgroundColor: color.bgColor2,
              color: color.txtColor,
              fontSize: 14,
            }}
            className="rounded-lg p-1 pl-3"
            placeholder="Search Surah..."
            multiline={false}
            placeholderTextColor={color.txtColor}
            value={searchTerm}
            onChangeText={(value) => setSearchTerm(value)}
          ></TextInput>
          <View className="absolute top-2 right-3">
            <Ionicon name="search" size={20} />
          </View>
        </View>
        <View className="w-[10%] h-9">
          <Image
            source={require("../../../assets/image/allah.png")}
            className="w-full h-full"
          />
        </View>
      </View>
    </View>
  );
};

export default SearchSurahSection;
