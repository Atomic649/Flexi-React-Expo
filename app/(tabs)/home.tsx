import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBackgroundColorClass, useTextColorClass } from "@/utils/themeUtils";

export default function home() {
  const { theme } = useTheme();
  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <ScrollView>
        <View className="flex flex-col items-center justify-center h-full">
           <Text className={`${useTextColorClass()}`}>dashboard</Text>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
}
