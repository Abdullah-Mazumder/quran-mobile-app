import { ScrollView, View, TextInput } from "react-native";
import useTheme from "../hooks/useTheme";
import { banglaFont } from "../utils/fonts";
import FontAwesomeIcon from "../components/FontAwesomeIcon";
import CustomText from "../components/CustomText";
import { Button, Dialog, IconButton } from "@react-native-material/core";
import { useSelector } from "react-redux";
import Ionicon from "../components/Ionicon";
import { useState } from "react";
import vibrate from "../utils/vibratie";

const Notes = () => {
  const { color } = useTheme();
  const { notes } = useSelector((state) => state.app);
  const [addOrEditNoteModal, setAddOrEditNoteModal] = useState(false);

  return (
    <>
      <View
        style={{ backgroundColor: color.bgColor1 }}
        className="py-2 flex justify-center items-center"
      >
        <View className="flex flex-row items-center justify-center">
          <CustomText
            style={[{ color: color.activeIconColor }, banglaFont.banglaRegular]}
            className="text-lg font-bold mr-2"
          >
            নোটস
          </CustomText>
          <FontAwesomeIcon
            name="edit"
            size={15}
            color={color.activeIconColor}
          />
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: color.bgColor2 }}>
        {Object.keys(notes).length == 0 ? (
          <View className="w-full h-full flex flex-row items-center justify-center">
            <CustomText className="text-lg font-semibold">
              কোন নোট পাওয়া যায় নি!
            </CustomText>
          </View>
        ) : (
          <>
            <ScrollView></ScrollView>
          </>
        )}

        <View className="absolute bottom-14 right-10">
          <Button
            onPress={() => {
              vibrate();
              setAddOrEditNoteModal(true);
            }}
            title="লিখুন"
            leading={(props) => <FontAwesomeIcon name="pen" size={15} />}
            titleStyle={{ color: color.activeIconColor, fontWeight: 700 }}
            color={color.bgColor1}
            tintColor={color.maximumTintColor}
          />
        </View>

        <Dialog visible={Boolean(addOrEditNoteModal)}>
          <View
            className={`p-4 rounded`}
            style={{ backgroundColor: color.bgColor1 }}
          >
            <CustomText className="text-sm font-semibold my-1">
              শিরোনাম
            </CustomText>
            <TextInput
              className="py-1 px-2 rounded"
              style={{
                backgroundColor: color.bgColor2,
                color: color.txtColor,
                fontSize: 12,
              }}
              placeholder="নোট শিরোনাম"
              placeholderTextColor={color.txtColor}
            />
            <CustomText className="text-sm font-semibold my-1">
              বিস্তারিত
            </CustomText>
            <TextInput
              className="py-1 px-2 rounded"
              style={{
                backgroundColor: color.bgColor2,
                color: color.txtColor,
                fontSize: 12,
              }}
              placeholder="নোটের বিস্তারিত"
              placeholderTextColor={color.txtColor}
              multiline
              scrollEnabled
            />
            <View>
              <View className="flex flex-row justify-end mt-2">
                <IconButton
                  color={color.maximumTintColor}
                  icon={(props) => <Ionicon name="close-circle" size={30} />}
                  onPress={() => {
                    vibrate();
                    setAddOrEditNoteModal(false);
                  }}
                />
                <IconButton
                  color={color.maximumTintColor}
                  icon={(props) => (
                    <Ionicon name="checkmark-done-circle" size={30} />
                  )}
                />
              </View>
            </View>
          </View>
        </Dialog>
      </View>
    </>
  );
};

export default Notes;
