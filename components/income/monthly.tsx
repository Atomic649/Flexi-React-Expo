import React from "react";
import { View, Text } from "react-native";
import { useTextColorClass } from "@/utils/themeUtils";

const Monthly = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className={useTextColorClass()}>Monthly</Text>
    </View>
  );
};

export default Monthly;
