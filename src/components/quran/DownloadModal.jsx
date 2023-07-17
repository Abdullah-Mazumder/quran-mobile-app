import { View, Modal } from "react-native";
import useTheme from "../../hooks/useTheme";
import { banglaFont } from "../../utils/fonts";
import CustomText from "../CustomText";
import convertToBanglaNumber from "engnumber-to-banglanumber";
import { Slider } from "@miblanchard/react-native-slider";

const DownloadModal = ({ downloadModal, numDownloadedFiles, totalAyah }) => {
  const { color } = useTheme();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={Boolean(downloadModal)}
    >
      <View
        className={`absolute top-0 right-0 w-full h-full flex items-center justify-center`}
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          className="w-[90%] h-[150] p-2 rounded-lg"
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
            ডাউনলোড হচ্ছেঃ
          </CustomText>
          <View className="">
            <>
              <View className="w-full flex flex-row items-center justify-between px-2">
                <CustomText
                  className="font-bold"
                  style={[{ color: color.activeIconColor }]}
                >
                  {convertToBanglaNumber(
                    Math.ceil((numDownloadedFiles / totalAyah) * 100).toString()
                  )}
                  {" %"}
                </CustomText>
                <CustomText
                  className="font-bold"
                  style={[{ color: color.activeIconColor }]}
                >
                  {convertToBanglaNumber("100")}
                  {" %"}
                </CustomText>
              </View>
              <View className="px-2">
                <Slider
                  value={numDownloadedFiles}
                  minimumValue={1}
                  maximumTrackTintColor={color.maximumTintColor}
                  minimumTrackTintColor={color.activeIconColor}
                  maximumValue={totalAyah}
                  thumbStyle={{
                    backgroundColor: color.activeIconColor,
                  }}
                  thumbTouchSize={{ width: 50, height: 50 }}
                  step={1}
                  trackStyle={{ height: 6 }}
                  disabled
                />
              </View>
            </>
            <CustomText style={[banglaFont.banglaSemi]} className="px-2">
              দয়া করে ডাউনলোড হওয়া পর্যন্ত অপেক্ষা করুন।
            </CustomText>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DownloadModal;
