import {
  View,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import TotalSale from "@/components/home/TotalSale";
import FacebookCard from "@/components/home/FacebookCard";
import TiktokCard from "@/components/home/TiktokCard";
import ShopeeCard from "@/components/home/ShopeeCard";
import LineCard from "@/components/home/LineCard";
import MultiDateCalendar from "@/components/MultiDateCalendar";
import { Ionicons } from "@expo/vector-icons";

const Dashboard = () => {
  const { theme } = useTheme();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const handleDatesChange = (dates: string[]) => {
    setSelectedDates(dates);
    console.log("Selected Dates:", dates);
  };

  return (
    <SafeAreaView
      className={`h-full ${theme === "dark" ? "bg-[#18181b]" : "bg-[#e0fafa]"}`}
    >
      <ScrollView>
        <View className="flex-row items-center justify-end mt-2 px-3 font-bold">
          <Text
            className={`text-sm mx-2 ${
              theme === "dark" ? "text-[#c9c9c9]" : "text-[#48453e]"
            }`}
          >
            {selectedDates.length > 0
              ? selectedDates.join(" to ")
              : "Select Dates"}
          </Text>
          {/* icon Calendar */}
          <Ionicons
            name="calendar"
            size={24}
            color={theme === "dark" ? "#ffffff" : "#444541"}
            onPress={() => setCalendarVisible(true)}
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

      {/* Modal for MultiDateCalendar */}
      <Modal
        visible={calendarVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setCalendarVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setCalendarVisible(false)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme === "dark" ? "#000000b5" : "#b4cac6a9",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
              padding: 16,
              borderRadius: 16,
            }}
          >
            <MultiDateCalendar onDatesChange={handleDatesChange} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default Dashboard;
