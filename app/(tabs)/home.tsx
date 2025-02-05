import { View, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import TotalSale from "@/components/home/TotalSale";
import FacebookCard from "@/components/home/FacebookCard";
import TiktokCard from "@/components/home/TiktokCard";
import ShopeeCard from "@/components/home/ShopeeCard";
import LineCard from "@/components/home/LineCard";
import DateTimePicker from "@react-native-community/datetimepicker";


const Home = () => {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <SafeAreaView
      className={`h-full ${theme === "dark" ? "bg-[#1B1B1E]" : "bg-[#e0fafa]"}`}
    >
      <ScrollView>
        <View className="flex-row justify-end mt-3 px-3">
          {/* Datetime Picker */}
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              if (date) {
                setSelectedDate(date);
              }
            }}
          />
        </View>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
