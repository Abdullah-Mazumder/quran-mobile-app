import useTheme from "./useTheme";
import { StyleSheet } from "react-native";

const useGlobalStyle = () => {
  const { color } = useTheme();

  const borderStyle = StyleSheet.create({
    boder: {
      borderWidth: 2,
      borderRadius: 5,
      borderColor: color.borderColor,
    },
  });

  return { borderStyle };
};

export default useGlobalStyle;
