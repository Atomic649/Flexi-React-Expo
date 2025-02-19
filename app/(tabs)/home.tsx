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
import { useTranslation } from "react-i18next";
import DashboardAds from "@/components/home/DashboardAds";
import { LinearGradient } from 'expo-linear-gradient';
import { CustomText } from "@/components/CustomText";

const Dashboard = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const handleDatesChange = (dates: string[]) => {
    setSelectedDates(dates);
    console.log("Selected Dates:", dates);
  };

  return (
    <LinearGradient
      colors={theme === "dark" ? ["#18181b", "#18181b"] : ["#a6efe4", "#ffffff"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="flex-row items-center justify-end mt-2 px-3 font-bold">
            <CustomText
              className={`text-sm mx-2 ${
                theme === "dark" ? "text-[#c9c9c9]" : "text-[#48453e]"
              }`}
            >
              {selectedDates.length > 0
              ? selectedDates.join(" to ")
              : t("dashboard.selectDate")}
            </CustomText>
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
          <DashboardAds />
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
    </LinearGradient>
  );
};

export default Dashboard;
