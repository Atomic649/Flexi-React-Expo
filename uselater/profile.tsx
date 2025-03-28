import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import { useTextColorClass } from "@/utils/themeUtils";
import { useState, useEffect } from "react";
import CallAPIUser from "@/api/user_api";
import CallAPICredit from "@/api/credit_api";
import { IMAGE_URL } from "@/utils/config";
import { images } from "@/constants";


export default function Profile() {
  const { theme } = useTheme();
  const textColorClass = useTextColorClass();

  // get user data from API
  const [userData, setUserData] = useState<any>({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await CallAPIUser.getUserAPI(1);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  // get creditor data from API
  const [creditorData, setCreditorData] = useState<any>([]);
  useEffect(() => {
    const fetchCreditorData = async () => {
      try {
        const response = await CallAPICredit.getCreditAPI(1);
        setCreditorData(response);
      } catch (error) {
        console.error("Error fetching creditor data:", error);
      }
    };
    fetchCreditorData();
  }, []);

  console.log("👌creditorData", creditorData);

  return (
    <SafeAreaView
      className={`h-full ${theme === "dark" ? "bg-primary" : "bg-white"}`}
    >
      {/* Header */}
      <View
        className={`flex-row justify-between items-center p-4 
         
          `}
      >
        <TouchableOpacity>
          <Ionicons
            name="list"
            size={24}
            color={theme === "dark" ? "white" : "primary"}
          />
        </TouchableOpacity>

        <Text className={`${textColorClass} text-lg font-bold `}>
          {userData.businessName}
        </Text>

        <TouchableOpacity>
          <Ionicons
            name="people"
            size={24}
            color={theme === "dark" ? "white" : "primary"}
          />
          <Text className="text-xs font-bold text-white bg-orange-400 rounded-full px-1 absolute -top-1 -right-3">
            2
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* Profile Section */}
        <View className="items-center mt-5">
          <Image
            source={{ uri: IMAGE_URL + userData.avatar }}
            className="w-24 h-24 rounded-full"
          />

          <Text className={`text-lg font-bold mt-4 ${textColorClass}`}>
            {userData.firstName} {userData.lastName}
          </Text>
          <Text className="text-gray-500">{userData.username}</Text>
          <Text className="italic mt-2 text-gray-500">{userData.bio}</Text>
          <Text className={`mt-2 ${textColorClass}`}>{userData.email}</Text>
          <View className="bg-orange-400 px-2 py-1 rounded-full mt-2">
            <Text className="text-white text-xs">7% TAX</Text>
          </View>
        </View>

        {/* Credit Stats */}
        <View className="flex-row justify-around mt-8">
          <View className="items-center">
            <Text className={`text-xl font-bold ${textColorClass}`}>4</Text>
            <Text className="text-gray-500">Crediting</Text>
          </View>
          <View className="items-center">
            <Text className={`text-xl font-bold ${textColorClass}`}>6</Text>
            <Text className="text-gray-500">Creditors</Text>
          </View>
          <View className="items-center">
            <Text className={`text-xl font-bold ${textColorClass}`}>96.4K</Text>
            <Text className="text-gray-500">Credit</Text>
          </View>
        </View>

        {/* Call-to-Action Section */}
        <TextInput
          className={`mx-3 min-w-min h-16 px-4 rounded-2xl border-2 focus:border-secondary mt-8 ${
            theme === "dark"
              ? "bg-black-100 border-black-200"
              : "bg-white border-gray-100"
          }`}
          value=""
          placeholder="Tell universe if your business need help?"
          placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
        />
         
          <View className="flex-row items-center">
                       <TextInput
                         className={` mt-2 mx-1 h-12 w-48 px-4 rounded-2xl border-2 focus:border-secondary ${
                           theme === "dark"
                             ? "bg-primary-100 border-black-200"
                             : "bg-white border-gray-100"
                         }`}
                         value={bankAccountNo ?? undefined}
                         onChangeText={setBankAccountNo}
                         placeholder="Bank Account No."
                         placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
                         style={{ color: theme === "dark" ? "#ffffff" : "#000000" }} // Adjusted text color
                         onFocus={() => setIsFocused(true)}
                         onBlur={() => setIsFocused(false)}
                       />
                       {isFocused && (
                         <TouchableOpacity
                           className="items-center justify-center px-2"
                           onPress={handleCheck}
                         >
                           <FontAwesome
                             name="check-circle"
                             size={24}
                             color={theme === "dark" ? "#ffa600" : "#000000"}
                           />
                         </TouchableOpacity>
                       )}
                     </View>



        {/* Creditors List */}
        <View className="flex-row mt-5 ml-2 items-baseline ">
          <Text className={`text-lg font-bold mb-2 ${textColorClass}`}>
            Creditors
          </Text>
          <Text className={` mt-2 text-gray-500 px-2 mb-2`}>
            Your inver circle
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {creditorData.map((creditor: any, index: number) => (
            <View key={index} className="mx-safe px-0 items-center">
              <Image
                source={{ uri: IMAGE_URL + creditor.avatar }}
                style={{  width : 78 ,height: 100 }}
                className= "square cropped"                
                resizeMode="cover"


              />
              <View className="items-start text-wrap w-20 h-12">
                <Text className={`text-sm mt-1  ${textColorClass}`}>
                  {creditor.firstName}
                </Text>
                <Text className={`text-sm  ${textColorClass}`}>
                  {creditor.lastName}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
