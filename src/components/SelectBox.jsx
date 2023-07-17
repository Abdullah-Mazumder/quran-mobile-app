import { forwardRef } from "react";
import { TouchableOpacity } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import useTheme from "../hooks/useTheme";
import FontAwesomeIcon from "./FontAwesomeIcon";

const SelectBox = forwardRef(
  ({ dropdownHeight = 300, dropdownWidth = 120, ...props }, ref) => {
    const { color } = useTheme();
    return (
      <TouchableOpacity>
        <SelectDropdown
          ref={ref}
          {...props}
          statusBarTranslucent={true}
          buttonStyle={{
            backgroundColor: color.bgColor1,
            width: dropdownWidth,
            height: 30,
            borderRadius: 7,
            borderWidth: 2,
            borderColor: color.activeIconColor,
          }}
          buttonTextStyle={{
            color: color.txtColor,
            fontSize: 14,
            fontWeight: 600,
            marginLeft: "auto",
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesomeIcon
                name={isOpened ? "chevron-up" : "chevron-down"}
                size={15}
              />
            );
          }}
          dropdownStyle={{
            backgroundColor: color.bgColor1,
            borderRadius: 7,
            height: dropdownHeight,
          }}
          rowTextStyle={{
            color: color.txtColor,
            fontWeight: 600,
            fontSize: 14,
          }}
          selectedRowStyle={{
            backgroundColor: color.activeIconColor,
          }}
          selectedRowTextStyle={{
            color: "white",
          }}
        />
      </TouchableOpacity>
    );
  }
);

export default SelectBox;
