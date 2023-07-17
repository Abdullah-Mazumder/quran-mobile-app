import { View } from "react-native";
import { useSelector } from "react-redux";
import CustomText from "../../components/CustomText";
import useTheme from "../../hooks/useTheme";
import { englishFont } from "../../utils/fonts";
import { FlashList } from "@shopify/flash-list";
import BookmarkedAyah from "../../components/quran/BookmarkedAyah";
import useGoToBackHandler from "../../hooks/useGoToBackHandler";

const Bookmark = () => {
  useGoToBackHandler("QuranHome");
  const { color } = useTheme();
  const { bookmarkList } = useSelector((state) => state.nobleQuran);

  return (
    <>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center">
          <CustomText
            style={[
              { color: color.activeIconColor },
              englishFont.englishRegular,
            ]}
            className="text-lg font-bold"
          >
            আপনার বুকমার্ক লিস্ট
          </CustomText>
        </View>
      </View>

      <View
        style={{ flex: 1, backgroundColor: color.bgColor2 }}
        className="container mx-auto p-0.5 px-1 pb-0"
      >
        <>
          {Object.keys(bookmarkList).length > 0 ? (
            <View className="w-full h-full">
              <FlashList
                data={Object.keys(bookmarkList)}
                renderItem={({ item }) => {
                  return <BookmarkedAyah ayah={bookmarkList[item]} />;
                }}
                estimatedItemSize={97}
              />
            </View>
          ) : (
            <View
              className="flex items-center justify-center"
              style={{ flex: 1 }}
            >
              <CustomText className="text-lg font-semibold text-center">
                আপনার বুকমার্ক লিস্ট খালি।
              </CustomText>
            </View>
          )}
        </>
      </View>
    </>
  );
};

export default Bookmark;
