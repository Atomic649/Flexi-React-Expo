import { View, Text,Image } from "react-native";
import React from "react";
import { icons } from "@/constants";


export default function AdsCard({
  platform,
  accName,
  accId
}: any) {
  return (
    <View className="flex flex-col items-center px-4 my-2">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
         
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-lg text-gray-500"
              numberOfLines={3}
            >
              {platform}
            </Text>
            <Text
              className="text-xl text-zinc-500 font-pregular"
              numberOfLines={1}
            >
              {accName}
            </Text>

            <Text
              className="text-xl text-zinc-500 font-pregular"
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
