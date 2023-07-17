import IonicIcon from "react-native-vector-icons/Ionicons";
import useTheme from "../hooks/useTheme";

const Ionicon = ({ ...props }) => {
  const { color } = useTheme();
  return (
    <>
      <IonicIcon color={color.activeIconColor} {...props} />
    </>
  );
};

export default Ionicon;
