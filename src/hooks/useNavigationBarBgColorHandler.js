import useTheme from "./useTheme";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";

const useNavigationBarBgColorHandler = () => {
  const { color } = useTheme();
  useEffect(() => {
    const fn = async () => {
      try {
        await NavigationBar.setBackgroundColorAsync(color.bgColor1);
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [color]);
  return {};
};

export default useNavigationBarBgColorHandler;
