import { useSelector } from "react-redux";

const useTheme = () => {
  const { color, isDark } = useSelector((state) => state.theme);
  return {
    color,
    isDark,
  };
};

export default useTheme;
