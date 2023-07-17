import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { BackHandler } from "react-native";
import showToast from "../utils/showToast";

const useExitApp = () => {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      let timer;
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          if (timer) {
            BackHandler.exitApp();
          } else {
            timer = setTimeout(() => {
              timer = null;
            }, 500);
            showToast("Double Press To Exit!");
          }
          return true;
        }
      );

      return () => {
        backHandler.remove();
      };
    }
  }, [isFocused]);
  return {};
};

export default useExitApp;
