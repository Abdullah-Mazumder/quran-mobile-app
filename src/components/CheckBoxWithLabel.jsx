import { Pressable } from "@react-native-material/core";
import { useDispatch } from "react-redux";
import useTheme from "../hooks/useTheme";
import CustomText from "./CustomText";
import Checkbox from "expo-checkbox";

const CheckBoxWithLabel = ({ label, value, actionName }) => {
  const dispatch = useDispatch();
  const { color } = useTheme();
  return (
    <Pressable
      style={{
        width: "100%",
        padding: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 1,
        paddingVertical: 15,
      }}
      onPress={() => {
        dispatch(actionName(!value));
      }}
    >
      <CustomText className="font-bold">{label} </CustomText>
      <Checkbox
        style={{
          borderColor: color.activeIconBorderColor,
        }}
        value={value}
        color={color.activeIconColor}
      />
    </Pressable>
  );
};

export default CheckBoxWithLabel;
