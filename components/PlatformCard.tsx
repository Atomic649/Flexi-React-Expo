import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { useTextColorClass } from "@/utils/themeUtils";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

const PlatFormCard = ({
  sale,
  adsCost,
  profit,
  percentAds,
  average,
  icon,
  iconType,
  iconSize,
  otherStyles,
}: any) => {
  const { theme } = useTheme();

  const renderIcon = () => {
    const IconComponent = iconType === "FontAwesome" ? FontAwesome : Ionicons;
    return (
      <IconComponent
      name={icon}
      size={iconSize}
      color={theme === "dark" ? "#27272a" : "#ffffff"}
      />
    );
  };
// styles
  const titleStyle = "text-sm text-[#A6A6A6] text-center font-bold";

  return (
    <View
      className={`flex flex-col p-1 items-center justify-center ${otherStyles}`}
    >
      {/* Icon */}
      <View className="flex flex-col items-center justify-center mb-1">
        <View
          className={`
            w-12 h-12
            ${theme === "dark" ? "bg-[#a8a29e]" : "bg-[#3c22ff]"}
            rounded-full 
            items-center 
            justify-center 
            absolute -top-2        
            right-16
            z-10
          `}
        >
          {renderIcon()}
        </View>
      </View>
      <View className="relative">
        <View
          className={`${
            theme === "dark" ? "bg-zinc-800" : "bg-white"
          } px-2 items-center justify-center w-52 h-44 rounded-2xl
            
          shadow-violet-600
          
            

            
            `}
        >
          {/* Sales */}
          <View className="flex-row justify-center w-full  ps-6">
            <Text
              className={`text-lg ${useTextColorClass()} font-bold`}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {sale}
            </Text>
            <Text className={titleStyle}>sale</Text>
          </View>
          <View className="flex-row justify-around w-full mt-2 px-0 ps-4">
            {/* ADS */}
            <View className="flex-colum">
              <Text className={titleStyle}>Ads</Text>
              <Text
                className={`text-base ${
                  theme === "dark" ? "text-stone-400 " : "text-stone-500" 
                } font-bold text-center`}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {adsCost}
              </Text>
            </View>

            {/* Profit */}
            <View className="flex-colum items-center justify-items-center ">
              <Text className={titleStyle}>Profit</Text>
              <Text
                className={`text-base font-bold text-center ${
                  profit >= 0
                    ? theme === "dark"
                      ? "text-teal-400"
                      : "text-[#3c22ff]"
                    : "text-[#FF006E] "
                }`}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.5}
              >
                {profit}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-around w-full mt-2 px-0 ps-4">
            {/* %ADS */}
            <View className="flex-colum">
              <Text className={titleStyle}>%Ads</Text>
              <Text
                className="text-base text-stone-400 font-bold text-center"
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {percentAds}
              </Text>
            </View>

            {/* Average */}
            <View className="flex-colum items-center justify-between ">
              <Text className={titleStyle}>Avr.</Text>
              <Text
                className="text-base text-stone-400 font-bold text-center"
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {average}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlatFormCard;
