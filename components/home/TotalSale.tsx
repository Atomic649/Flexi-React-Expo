import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { useTextColorClass } from "@/utils/themeUtils";

const TotalSale = () => {
  const { theme } = useTheme();
  return (
    <View className="flex flex-col pt-3 pb-2 px-2 items-center justify-center">
      <View
        className={`flex-row ${
          theme === "dark" ? "bg-zinc-800" : "bg-white"
        } items-center w-full h-60 rounded-2xl border ${
          theme === "dark" ? "border-zinc-700" : "border-zinc-300"
        }`}
      >
        <View className="flex-1 bg-transparent items-center justify-center">
          {/* Center the circles */}
          <View className="items-center justify-center">
            <View className="bg-teal-400 items-center justify-center w-48 h-48 rounded-full">
              {/* Teal Circle */}
            </View>
            <View className="bg-teal-300 items-center justify-center w-36 h-36 rounded-full absolute">
              {/* Smaller Circle */}
            </View>
            <View className="bg-white items-center justify-center w-36 h-36 rounded-full absolute">
              {/* Smaller Circle */}
            </View>

          </View>
        </View>

        {/* Total Sale */}
        <View className="bg-transparent items-center ps-8 justify-center w-52 h-60 rounded-2xl">
          <View className="flex-row justify-center w-full">
            <Text
              className={`text-2xl font-bold ${useTextColorClass()}`}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              1,999,999฿
            </Text>

            <Text className="text-xs  text-zinc-500">Sale</Text>
          </View>
          {/* row Ads and Profit */}
          <View className="flex-row justify-around  mt-2 px-6 ps-3">
            {/* ADS */}
            <View className="flex-colum ">
              <Text className="text-sm text-zinc-500 ">Ads</Text>
              <Text
                className={`text-base ${
                  theme === "dark" ? "text-stone-400 " : "text-orange-400 "
                } font-bold text-center`}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                999.99฿
              </Text>
            </View>

            {/* Profit */}
            <View className="flex-colum items-center justify-between w-full">
              <Text className="text-sm text-zinc-500">Profit</Text>
              <Text
                className={`text-base font-bold ${
                  999.99 >= 0
                   
                    ? theme === "dark"
                    ? "text-teal-400"
                      : "text-teal-500"
                    : "text-red-500"
                }`}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                999.99
              </Text>
            </View>
          </View>

          <View className="flex-row justify-around mt-3 px-0 ps-4">
            {/* %ADS */}
            <View className="flex-colum">
              <Text className="text-sm text-zinc-500 text-center">%Ads</Text>
              <Text
                className="text-base text-zinc-500 font-bold text-center"
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                9%
              </Text>
            </View>

            {/* Average */}
            <View className="flex-colum items-center justify-between w-full">
              <Text className="text-sm text-zinc-500 text-center">Avr.</Text>
              <Text
                className="text-base text-zinc-500 font-bold text-center"
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                99
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TotalSale;
