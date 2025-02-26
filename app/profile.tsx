import { useTheme } from "@/providers/ThemeProvider";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import CallAPIUser from "@/api/user_api";
import CallAPIBusiness from "@/api/business_api";
import { IMAGE_URL } from "@/utils/config";
import { getMemberId, getUserId } from "@/utils/utility";
import { SafeAreaView, ScrollView, View, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/AuthProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";

export default function Profile() {
  const { t, i18n } = useTranslation();
  const { session } = useAuth();
  const { theme } = useTheme();
  const [businessData, setBusinessData] = useState<any>([]);
  const [businessAvatar, setBusinessAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(t("profile.avatar.permission"));
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setBusinessAvatar(result.assets[0].uri);
      const memberId = await getMemberId();
      if (memberId !== null) {
        try {
          await CallAPIBusiness.UpdateBusinessAvatarAPI({
            memberId,
            businessAvatar: result.assets[0].uri,
          });
        } catch (error) {
          console.error("Error updating business avatar:", error);
        }
      }
    }
  };


    // get user data from API
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const userId = await getUserId();
          if (userId) {
            const response = await CallAPIUser.getUserAPI(userId);
            setUserData(response);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }, []);

    const getImageUri = (image: string | null) => {
      if (!image) return null;
      return image.startsWith("file://") ? image : IMAGE_URL + image;
    };

    // get business data from API
    useEffect(() => {
      const fetchBusinessData = async () => {
        try {
          const memberId = await getMemberId();
          if (memberId !== null) {
            const response = await CallAPIBusiness.getBusinessDetailsAPI(
              memberId
            );
            setBusinessData(response);
          }
        } catch (error) {
          console.error("Error fetching business data:", error);
        }
      };
      fetchBusinessData();
    }, []);

    return (
      <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
        <ScrollView>
          {/* Profile Section */}
          <View className="items-center mt-5">
            <Image
              source={{ uri: getImageUri(businessAvatar) || '' }}
              className="w-24 h-24 rounded-full"
            />

            <TouchableOpacity
              onPress={pickImage}
              className="mt-2 flex flex-row items-center"
            >
              <FontAwesome
                name="camera"
                size={20}
                color={theme === "dark" ? "white" : "[#000000]"}
              />

              <Text className="text-primary ml-2">
                {t("profile.avatar.change")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

