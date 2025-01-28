import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { useTextColorClass } from "@/utils/themeUtils";

const PlatFormCard = () => {
  const { theme } = useTheme();
  return (
    <View className="flex flex-col p-1 items-center justify-center">
      {/* Total Sale */}
      <View
        className={`${
          theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
        } px-2 items-center justify-center w-52 h-44 rounded-2xl`}
      >
        <View className="flex-row justify-center w-full  ps-1">
          <Text className={`text-lg ${useTextColorClass()} font-bold`}>
            999,999,999฿
          </Text>
          <Text className="text-xs text-zinc-500 text-right">Sale</Text>
        </View>
        <View className="flex-row justify-evenly w-full mt-1 px-1 ps-1">
          {/* ADS */}
          <View className="flex-colum">
            <Text className="text-sm text-zinc-500 text-center">Ads Cost</Text>
            <Text className="text-sm text-zinc-500 font-bold text-center">
              999.99฿
            </Text>
          </View>

          {/* Profit */}
          <View className="flex-colum items-center justify-between w-full">
            <Text className="text-sm text-zinc-500 text-center">Profit</Text>
            <Text className="text-sm text-zinc-500 font-bold text-center">
              999.99฿
            </Text>
          </View>
        </View>

        <View className="flex-row justify-evenly w-full mt-2 px-0 ps-4">
          {/* %ADS */}
          <View className="flex-colum">
            <Text className="text-sm text-zinc-500 text-center">%Ads</Text>
            <Text className="text-sm text-zinc-500 font-bold text-center">
              9%
            </Text>
          </View>

          {/* Average */}
          <View className="flex-colum items-center justify-between w-full">
            <Text className="text-sm text-zinc-500 text-center">Avr.</Text>
            <Text className="text-sm text-zinc-500 font-bold text-center">
              99
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlatFormCard;
