import { Pressable } from "@react-native-material/core";
import { View } from "react-native";
import useTheme from "../../hooks/useTheme";
import { banglaFont } from "../../utils/fonts";
import vibrate from "../../utils/vibratie";
import CustomText from "../CustomText";
import TextButton from "../TextButton";

const DownloadWarningModal = ({
  downloadWarningModal,
  setDownloadWarningModal,
  downloadSurah,
}) => {
  const { color } = useTheme();
  return (
    <View
      className={`absolute top-0 right-0 w-full h-full flex items-center justify-center ${
        downloadWarningModal ? "block" : "hidden"
      }`}
      style={{
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <View
        className="w-[90%] h-[30%] p-2 rounded-lg"
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
          ডাউনলোড নোটিশঃ
        </CustomText>
        <View className="">
          <CustomText style={[banglaFont.banglaRegular]}>
            আপনি যে সূরাটি শুনতে চাচ্ছেন সেটি হয়ত ডাউনলোড করা নেই। সূরাটি শুনতে
            হলে আপনাকে প্রথমে সম্পূর্ণ সূরাটি ডাউনলোড করতে হবে। আপনি কি সূরাটি
            ডাউনলোড করতে চান?
          </CustomText>
        </View>
        <View className="w-full absolute bottom-2 flex items-center justify-end">
          <View className="w-full flex flex-row items-center justify-end gap-2">
            <Pressable
              style={{
                fontSize: 11,
                color: color.txtColor,
                borderWidth: 0.3,
                borderColor: color.txtColor,
                borderRadius: 2,
                paddingVertical: 3,
                paddingHorizontal: 15,
                backgroundColor: color.bgColor1,
              }}
              onPress={() => {
                setDownloadWarningModal(false);
                vibrate();
              }}
            >
              <View className="flex justify-center items-center">
                <CustomText className="" style={[banglaFont.banglaSemi]}>
                  না
                </CustomText>
              </View>
            </Pressable>
            <Pressable
              style={{
                fontSize: 11,
                color: color.txtColor,
                borderWidth: 0.3,
                borderColor: color.txtColor,
                borderRadius: 2,
                paddingVertical: 3,
                paddingHorizontal: 15,
                backgroundColor: color.bgColor1,
              }}
              onPress={() => {
                vibrate();
                setDownloadWarningModal(false);
                downloadSurah();
              }}
            >
              <View className="flex justify-center items-center">
                <CustomText className="" style={[banglaFont.banglaSemi]}>
                  হ্যাঁ
                </CustomText>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DownloadWarningModal;
