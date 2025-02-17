import React from "react";
import { View, Text } from "react-native";
import { useTextColorClass } from "@/utils/themeUtils";

const Daily = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className={useTextColorClass()}>Daily</Text>
    </View>
  );
};

export default Daily;
