import { View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import TotalSale from "@/components/home/TotalSale";
import PlatFormCard from "@/components/home/PlatformCard";

export default function home() {
  const { theme } = useTheme();
  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <ScrollView>
        <TotalSale />
        <View className="flex flex-wrap flex-row justify-around">
          <View className="w-1/2 p-0 pt-0">
            <PlatFormCard />
          </View>
          <View className="w-1/2 p-0">
            <PlatFormCard />
          </View>
          <View className="w-1/2 p-0">
            <PlatFormCard />
          </View>
          <View className="w-1/2 p-0">
            <PlatFormCard />
          </View>
          <View className="w-1/2 p-0">
            <PlatFormCard />
          </View>
          <View className="w-1/2 p-0">
            <PlatFormCard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
