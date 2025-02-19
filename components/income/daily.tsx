import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import { useBackgroundColorClass, useTextColorClass } from "@/utils/themeUtils";
import { getMemberId } from "@/utils/utility";
import CallAPIReport from "@/api/report_api";
import { useTheme } from "@/providers/ThemeProvider";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DailyCard from "../DailyCard";

type DailyCardProps = {
  date: string;
  amount: number;
  sale: number;
  adsCost: number;
  profit: number;
  percentageAds: number;
  ROI: number;
};

const Daily = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [dailyReport, setDailyReport] = useState<DailyCardProps[]>([]);

  // Call API to get daily data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const memberId = await getMemberId();
        if (memberId) {
          const response = await CallAPIReport.getDailyReportsAPI(memberId);
          setDailyReport(response);
        } else {
          console.log("Member ID is null");
        }
      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };
    fetchReport();
  }, []);

  // Refetch data when refreshing
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const memberId = await getMemberId();
      if (memberId) {
        const response = await CallAPIReport.getDailyReportsAPI(memberId);
        setDailyReport(response);
      } else {
        console.error("Member ID is null");
      }
    } catch (error) {
      console.error("Error fetching reports", error);
    }
    setRefreshing(false);
  };
// Adjust front size and color of Title Table
  const textStyle = "text-sm text-zinc-600 font-bold";

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
        <View
          className={`flex flex-col items-end `}
          style={{
            backgroundColor: theme === "dark" ? "#adacac" : "#d0cfcb",
          }}
        >
          <View className="flex flex-row m-2 items-start justify-evenly w-full pl-5 px-5">
            <View className="flex flex-col items-center w-1/5">
              <Text className={textStyle} numberOfLines={1}>
                Date
              </Text>
            </View>

            <View className="flex flex-col items-center w-1/6">
              <Text className={textStyle} numberOfLines={1}>
                Amount
              </Text>
            </View>

            <View className="flex flex-col items-center w-1/6">
              <Text className={textStyle} numberOfLines={3}>
                Sales
              </Text>
            </View>

            <View className="flex flex-col items-center w-1/6">
              <Text className={textStyle} numberOfLines={1}>
                AdCost
              </Text>
            </View>

            <View className="flex flex-col items-center w-1/6">
              <Text className={textStyle} numberOfLines={1}>
                Profit
              </Text>
            </View>
            <View className="flex flex-col items-center w-1/6">
              <Text className={textStyle} numberOfLines={1}>
                % Ads
              </Text>
            </View>
          </View>
        </View>

        <FlatList
          data={dailyReport}
          keyExtractor={(item) => item.date.toString()}
          renderItem={({ item }) => (
            <DailyCard
              date={item.date}
              amount={item.amount}
              sale={item.sale}
              adsCost={item.adsCost}
              profit={item.profit}
              percentageAds={item.percentageAds}
              ROI={item.ROI}
              tableColor={theme === "dark" ? "bg-gray-800" : "bg-white"}
              broaderColor={
                theme === "dark" ? "border-teal-900" : "border-gray-300"
              }
            />
          )}
          ListEmptyComponent={() => (
            <Text className={`text-center text-lg ${useTextColorClass()}`}>
              {t("product.notfound")}
            </Text>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Daily;
