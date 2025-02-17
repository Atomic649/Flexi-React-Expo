import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import { useBackgroundColorClass, useTextColorClass } from "@/utils/themeUtils";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/providers/ThemeProvider";
import CallAPIBill from "@/api/bill_api";
import { getMemberId } from "@/utils/utility";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import BillCard from "../billCard";

type Bill = {
  id: number;
  createdAt: Date;
  updatedAt?: Date;
  cName: string;
  cLastName: string;
  cPhone: string;
  cGender: string;
  cAddress: string;
  cPostId: string;
  cProvince: string;
  product: string;
  payment: string;
  amount: number;
  platform: string;
  cashStatus: boolean;
  price: number;
  memberId: string;
  purchaseAt: Date;
  businessAcc: number;
  imageBill: string;
  storeId: number;
};

const ByOrder = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const memberId = await getMemberId();
      if (memberId) {
        const response = await CallAPIBill.getBillsAPI(memberId);
        setBills(response);
      } else {
        console.error("Member ID is null");
      }
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const onRefresh = async () => {
    try {
      const memberId = await getMemberId();
      if (memberId) {
        const response = await CallAPIBill.getBillsAPI(memberId);
        setBills(response);
      } else {
        console.error("Member ID is null");
      }
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
    setRefreshing(false);
  };

  const handleDelete = async (id: number) => {}


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <FlatList
        data={bills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BillCard
            id={item.id}
            platform={item.platform}
            product={item.product}
            cName={`${item.cName} ${item.cLastName}`}
            price={item.price}
            purchaseAt={item.purchaseAt}
            color={theme === "dark" ? "#616161" : "#aeadac"}
            onDelete={handleDelete}
          />
        )}
      
        ListEmptyComponent={() => (
          <Text className="text-center text-white">{t("ads.notfound")}</Text>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      
    
      
    </SafeAreaView>
  </GestureHandlerRootView>
);
}


export default ByOrder;
