import { ToastAndroid } from "react-native";

const showToast = (title = "Something went wrong.") => {
  ToastAndroid.showWithGravityAndOffset(
    title,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    50
  );
};

export default showToast;
