import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";

import { useBackgroundColorClass } from "@/utils/themeUtils";
import { Ionicons } from "@expo/vector-icons";
import ProductCard from "@/components/ProductCard";
import AdsCard from "@/components/adsCard";


export default function ads() {
  const { theme } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  // Product Data
  const Platform = [
    {
      id: 1,
      platform: "Google",
      accName: "ZZ250",
      accId: "529260684116679",
     
    },
    {
      id: 2,
      platform: "Facebook",
      accName: "ZZ350",
      accId: "529260684116658",
     
    },
    {
      id: 3,
      platform: "Tiktok",
      accName: "ZZ380",
      accId: "529260684116555",
   
    }
  ]
    
  

 

  const onRefresh = async () => {
    setRefreshing(true);
    // Fetch Data from API
    console.log("Fetching Data...");
    setRefreshing(false);
  };

  type Platform = {
    id: number;
    platform: string;
    accName: string;
    accId: string;
    businessAcc : number;
  };

  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <FlatList
        data={Platform}
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
            <Text className="text-2xl font-semibold text-white">ads</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center text-white">No ads acc found</Text>
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
          backgroundColor: '#04eccd',
          borderRadius: 50,
          padding: 15,
          elevation: 5,
        }}
        onPress={() => {
          // Handle button press
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
