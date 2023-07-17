import { TouchableOpacity } from "react-native";

const CustomIconButton2 = ({ children, ...props }) => {
  return (
    <TouchableOpacity className="px-1 py-0.5 mx-0.5" {...props}>
      {children}
    </TouchableOpacity>
  );
};
export default CustomIconButton2;
