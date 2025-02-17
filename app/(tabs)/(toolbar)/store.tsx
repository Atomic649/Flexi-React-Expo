import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/providers/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackgroundColorClass } from '@/utils/themeUtils';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { getMemberId } from '@/utils/utility';
import CallAPIStore from '@/api/store_api';
import StoreCard from '@/components/StoreCard';
import { router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Store = {
  id: number,
  platform: string,
  accName: string,
  accId: string,
  memberId: string
};

export default function Store() {
  const { theme } = useTheme();
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState(false);
    const [store, setStore] = useState<Store[]>([]);

    useEffect(() => {
      const fetchStore = async () => {
        try {
          const memberId = await getMemberId();
          if (memberId) {
            const response = await CallAPIStore.getStoresAPI(memberId);
            setStore(response);
          }
        } catch (error) {
          console.error("Error fetching store:", error);
        }
      };

      fetchStore();
    }, []);

    const onRefresh = async () => {
      try {
        const memberId = await getMemberId();
        if (memberId) {
          const response = await CallAPIStore.getStoresAPI(memberId);
          setStore(response);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
      }
      setRefreshing(false);
    };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
         <FlatList
           data={store}
           keyExtractor={(item) => item.id.toString()}
           renderItem={({ item }) => (
             <StoreCard
               platform={item.platform}
               accName={item.accName}
               accId={item.accId}
             />
           )}
           ListHeaderComponent={() => (
             <View className="flex my-6 px-4 space-y-6 items-center">
              {/* <Text className={`text-xl my-6 font-bold ${theme === "dark" ? "text-white" : "text-[#5d5a54]"}`}>
                 {t('store.title')}
               </Text> */}
               <Text className={`text-base font-normal ${theme === "dark" ? "text-white" : "text-[#5d5a54]"}`}>
                 {t('store.limit')}
               </Text>
               <TouchableOpacity onPress={() => router.push("roadmap")}>
                 <Text className={`mt-1 text-base font-bold text-[#FF006E]`}>
                   {t('store.help')}
                 </Text>
               </TouchableOpacity>
             </View>
           )}
           ListEmptyComponent={() => (
             <Text className="text-center text-white">{t('store.notfound')}</Text>
           )}
           refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
           }
         />
         {/* Setting Limit Ads Connection Acc "4" */}
         {store.length < 4 && (
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
               router.push("/createstore");
             }}
           >
             <Ionicons
               name="add"
               size={24}
               color={theme === "dark" ? "#ffffff" : "#444541"}
             />
           </TouchableOpacity>
         )}
       </SafeAreaView>
    </GestureHandlerRootView>
     );
   }
