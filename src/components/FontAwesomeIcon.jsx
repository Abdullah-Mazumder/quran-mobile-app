import FontAwesomeIcon5 from "react-native-vector-icons/FontAwesome5";
import useTheme from "../hooks/useTheme";

const FontAwesomeIcon = ({ color, ...props }) => {
  const { color: themeColor } = useTheme();
  if (!color) {
    return (
      <>
        <FontAwesomeIcon5 {...props} color={themeColor.activeIconColor} />
      </>
    );
  } else {
    return (
      <>
        <FontAwesomeIcon5 {...props} color={color} />
      </>
    );
  }
};

export default FontAwesomeIcon;
