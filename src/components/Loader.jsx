import { View, Image } from "react-native";
import React from "react";

const Loader = () => {
  return (
    <View className="w-6 h-6">
      <Image
        source={require("../../assets/image/loading.gif")}
        className="w-full h-full"
      />
    </View>
  );
};

export default Loader;
