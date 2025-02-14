import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import CallAPIPlatform from "@/api/platform_api";
import { useTranslation } from "react-i18next";
import AdsCard from "@/components/adsCard";
import { getMemberId } from "@/utils/utility";

type Platform = {
  id: number;
  platform: string;
  accName: string;
  accId: string;
  businessAcc: number;
  memberId: string;
};

export default function ads() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
      const fetchPlatform = async () => {
        try {
          const memberId = await getMemberId();
          if (memberId) {
            const response = await CallAPIPlatform.getPlatformsAPI(memberId);
            setPlatforms(response);
          }
        } catch (error) {
          console.error("Error fetching platform:", error);
        }
      };
  
      fetchPlatform();
    }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    console.log("Fetching Data...");
    setRefreshing(false);
  };

  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <FlatList
        data={platforms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <AdsCard
            platform={item.platform}
            accName={item.accName}
            accId={item.accId}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <Text className="text-2xl font-semibold text-white">{t('ads.title')}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center text-white">{t('ads.notfound')}</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 65,
          right: 30,
          backgroundColor: "#04eccd",
          borderRadius: 50,
          padding: 15,
          elevation: 5,
        }}
        onPress={() => {
          router.push("/createads");
        }}
      >
        <Ionicons
          name="add"
          size={24}
          color={theme === "dark" ? "#ffffff" : "#444541"}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
