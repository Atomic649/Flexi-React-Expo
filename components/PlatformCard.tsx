import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
  // TEXT styles
  const titleStyle = "text-sm text-[#48453e] text-center font-normal";
  const percentadsarv = "text-sm text-[#7f7765] text-center font-bold";

  return (
    <View
      className={`flex flex-col p-1 items-center justify-center ${otherStyles}`}
    >
      {/* Icon */}
      <View className="flex flex-col items-center justify-center mb-1">
        <View
          className={`
            w-12 h-12
            ${theme === "dark" ? "bg-[#a8a29e]" : "bg-[#423f39]"}
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
        {/* adjust size box here */}
        <View
          className={`${
            theme === "dark" ? "bg-zinc-800" : "bg-white"
          } px-2 items-center justify-center w-52 h-36 rounded-2xl border
          ${ theme === "dark" ? "border-zinc-700" : "border-[#61fff2]"}                     
            `}
        >
          {/* Sales */}
          <View className="flex-row justify-center mt-1 w-full  ps-6">
            <Text
              className={`text-lg text-[#423f39] font-bold`}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {sale}
            </Text>
            <Text className={titleStyle}>sale</Text>
          </View>
          <View className="flex-row justify-around w-full mt-1 px-0 ps-4">
            {/* ADS */}
            <View className="flex-colum">
              <Text className={titleStyle}>ads</Text>
              <Text
                className={`text-base ${
                  theme === "dark" ? "text-stone-400 " : "text-[#7d776a] "
                } font-bold text-center`}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {adsCost}
              </Text>
            </View>

            {/* Profit */}
            <View className="flex-colum items-center justify-items-center ">
              <Text className={titleStyle}>profit</Text>
              <Text
                className={`text-base font-bold text-center ${
                  parseFloat(profit)  >= 0
                    ? theme === "dark"
                      ? "text-teal-400"
                      : "text-[#5500ff]"
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
              <Text className={titleStyle}>%ads</Text>
              <Text
                className={percentadsarv}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {percentAds}
              </Text>
            </View>

            {/* Average */}
            <View className="flex-colum items-center justify-between ">
              <Text className={titleStyle}>arv.</Text>
              <Text
              className={percentadsarv}
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
