import { ScrollView, useWindowDimensions, View } from "react-native";
import RenderHTML, { defaultSystemFonts } from "react-native-render-html";
import { useSelector } from "react-redux";
import useTheme from "../../hooks/useTheme";
import { banglaFont } from "../../utils/fonts";
import vibrate from "../../utils/vibratie";
import CustomText from "../CustomText";
import TextButton from "../TextButton";

const TafsirModal = ({ tafsirModal, tafsir, setTafsirModal }) => {
  const { color } = useTheme();
  const { width } = useWindowDimensions();
  const systemFonts = [...defaultSystemFonts, "banglaSemi", "banglaRegular"];
  const { banglaTextSize } = useSelector((state) => state.nobleQuran);
  return (
    <View
      className={`absolute z-30 top-0 right-0 w-full h-full flex items-center justify-center ${
        tafsirModal ? "block" : "hidden"
      }`}
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        className="w-[95%] h-[90%] p-2 rounded-lg"
        style={{ backgroundColor: color.bgColor2 }}
      >
        <CustomText
          className="text-lg"
          style={[
            {
              borderBottomWidth: 0.3,
              borderBottomColor: color.txtColor,
              marginBottom: 5,
            },
            banglaFont.banglaSemi,
          ]}
        >
          সংক্ষিপ্ত ব্যাখ্যা
        </CustomText>
        <View className="h-[88%]">
          <ScrollView>
            <RenderHTML
              contentWidth={width}
              source={{
                html: tafsir[tafsirModal] ? tafsir[tafsirModal] : "",
              }}
              systemFonts={systemFonts}
              baseStyle={{
                color: color.txtColor,
                fontFamily: "banglaRegular",
                fontSize: banglaTextSize,
                lineHeight: banglaTextSize + 5,
                textAlign: "left",
                marginTop: 2,
              }}
            />
          </ScrollView>
        </View>
        <View className="w-full absolute bottom-2 flex items-center justify-center">
          <TextButton
            title="Close"
            onPress={() => {
              setTafsirModal(false);
              vibrate();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default TafsirModal;
