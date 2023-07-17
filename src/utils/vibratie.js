import { Vibration } from "react-native";

const vibrate = (duration = 40) => {
  Vibration.vibrate(duration);
};

export default vibrate;
