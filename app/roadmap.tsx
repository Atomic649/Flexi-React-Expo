import React, { useState, useEffect } from "react";
import { View, Animated, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import { useTranslation } from "react-i18next";
import CallAPIUser from "@/api/user_api";
import images from "@/constants/images";
import { CustomText } from "@/components/CustomText";
import { Ionicons } from "@expo/vector-icons";

export default function RoadMap() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<number | null>(null);
  const animatedValue = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const response = await CallAPIUser.getRegisteredUsersAPI();
        setRegisteredUsers(response);
        animateCounter(response);
      } catch (error) {
        console.error("Error fetching registered users:", error);
      }
    };

    fetchRegisteredUsers();
    const interval = setInterval(fetchRegisteredUsers, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const animateCounter = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (registeredUsers !== null) {
      animateCounter(registeredUsers);
    }
  }, [registeredUsers]);

  const animatedNumber = animatedValue.interpolate({
    inputRange: [registeredUsers || 0, registeredUsers || 1],
    outputRange: [registeredUsers || 0, registeredUsers || 1],
  });

  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <View className="flex-row items-center justify-center mb-5">
        <Image
          source={images.logo}
          style={{ width: 100, height: 100, marginBottom: 20 }}
        />
        {registeredUsers !== null && (
          <Animated.Text
            className="text-6xl text-center text-bold mt-8 mb-4 px-6"
            style={{ color: theme === "dark" ? "#03dcc7" : "#04ecd5" }}
          >
            {animatedNumber}
          </Animated.Text>
        )}
      </View>
      <View className="flex-col gap-4 bg px-2">
{/* mission 1 */}
        <View className="flex-row items-center justify-between mx-2 px-8">
          <View className="flex-col items-start justify-center">
        <CustomText className="text-center text-lg font-bold text-white">
          {t("5 Products ")}
        </CustomText>
        <CustomText className="text-center text-base text-white">
          {t("100 users")}
        </CustomText>
          </View>
          {/* lock icon */}
          <Ionicons
        name="lock-closed"
        size={24}
        color={theme === "dark" ? "#03dcc7" : "#04ecd5"}
          />
        </View>
{/* mission 2 */}
        <View className="flex-row items-center justify-between mx-2 px-8">
          <View className="flex-col items-start justify-center">
        <CustomText className="text-center text-lg font-bold text-white">
          {t("2 Business ")}
        </CustomText>
        <CustomText className="text-center text-base text-white">
          {t("500 users")}
        </CustomText>
          </View>
          {/* lock icon */}
          <Ionicons
        name="lock-closed"
        size={24}
        color={theme === "dark" ? "#03dcc7" : "#04ecd5"}
          />
        </View>
{/* mission 3 */}
        <View className="flex-row items-center justify-between mx-2 px-8">
          <View className="flex-col items-start justify-center">
        <CustomText className="text-center text-lg font-bold text-white">
          {t("5 Store Connections ")}
        </CustomText>
        <CustomText className="text-center text-base text-white">
          {t("1000 users")}
        </CustomText>
          </View>
          {/* lock icon */}
          <Ionicons
        name="lock-closed"
        size={24}
        color={theme === "dark" ? "#03dcc7" : "#04ecd5"}
          />
        </View>
{/* mission 4 */}
        <View className="flex-row items-center justify-between mx-2 px-8">
          <View className="flex-col items-start justify-center">
        <CustomText className="text-center text-lg  text-white"
        style= {{fontWeight: "bold"}}>
          {t("5 Ads Connections ")}
        </CustomText>
        <CustomText className="text-center text-base text-white">
          {t("1000 users")}
        </CustomText>
          </View>
          {/* lock icon */}
          <Ionicons
        name="lock-closed"
        size={24}
        color={theme === "dark" ? "#03dcc7" : "#04ecd5"}
          />
        </View>

      </View>
    </SafeAreaView>
  );
}
