import { View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import TotalSale from "@/components/home/TotalSale";
import PlatFormCard from "@/components/home/FacebookCard";
import FacebookCard from "@/components/home/FacebookCard";
import TiktokCard from "@/components/home/TiktokCard";
import ShopeeCard from "@/components/home/ShopeeCard";
import ShopCard from "@/components/home/StoreForntCard";
import LineCard from "@/components/home/LineCard";

export default function home() {
  const { theme } = useTheme();
  return (
    <SafeAreaView className={`h-full ${theme === "dark" ? "bg-[#1B1B1E]" : "bg-[#dbf0f0]"}`}>
      <ScrollView>
        <TotalSale />
        <View className="flex flex-wrap flex-row justify-around">
          <View className="w-1/2 pl-3 ">
            <FacebookCard />
          </View>
          <View className="w-1/2 p-0">
            <TiktokCard />
          </View>         
          <View className="w-1/2 pl-3">
            <ShopeeCard />
          </View>
          <View className="w-1/2 p-0">
            <LineCard />
          </View>
          {/* <View className="w-full p-0"> 
            <ShopCard />
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
