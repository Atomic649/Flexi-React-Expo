import { View, Text, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

export default function StoreCard({
  platform,
  accName,
  accId
}: any) {
  const getBorderColor = (platform: string) => {
    switch (platform) {
      case "Facebook":
        return "#3c22ff";
      case "Tiktok":
        return "#424040";
      case "Line":
        return "#56ff56"; // Lemon green
      case "Shopee":
        return "#ff4000"; // Orange red
      case "SCB":
        return "#9900ff"; // Red
      default:
        return "#61fff2"; // Default color
    }
  };

  return (
    <View className={`flex flex-col items-center pt-2 pb-4 px-4 my-1 mb-5-2 mx-10 rounded-se-md 
    bg-[#918b8b0d]
    border-s-8 `}
    style={{ borderColor: getBorderColor(platform) }}>

      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
         
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-bold text-sm text-zinc-500"
              numberOfLines={3}
            >
              {platform}
            </Text>
            <Text
              className="text-lg text-zinc-500 font-psemibold"
              numberOfLines={1}
            >
              {accName}
            </Text>

            <Text
              className="text-base text-zinc-500 font-pregular"
              numberOfLines={1}
            >
              {accId}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
    </View>
  );
}
