// rnf
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import { icons } from "@/constants";
import {
  View,
  Image,
  Platform,
  Modal,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/providers/ThemeProvider";
import { i18n } from "i18next";

const ToolBarTextStyle = (i18n: i18n) => ({
  fontSize: 12,
  fontFamily:
    i18n.language === "th" ? "NotoSansThai-Regular" : "Poppins-Regular",
});

// สรับปรุง interface ของ TabIcon
interface TabIconProps {
  icon: any;
  color: string;
  focused: boolean;
  size?: "normal" | "large"; // เพิ่ม prop สำหรับกำหนดขนาด
}

// ปรับปรุง TabIcon component
const TabIcon = ({ icon, color, focused, size = "normal" }: TabIconProps) => {
  return (
    <View
      className={`
      flex items-center justify-center
      ${size === "large" ? "-mt-7" : ""}  // ขยับไอคอนขึ้นถ้าเป็นขนาดใหญ่
    `}
    >
      <View
        className={`
        flex items-center justify-center
        ${
          size === "large" ? "bg-secondary-200 p-3 rounded-full" : ""
        }  // เพิ่มพื้นหลังถ้าเป็นขนาดใหญ่
      `}
      >
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={size === "large" ? "#FFFFFF" : color}
          className={size === "large" ? "w-9 h-9" : "w-6 h-8"}
        />
      </View>
    </View>
  );
};

interface ToolbarProps {
  visible: boolean;
  onClose: () => void;
}

export default function TabLayout() {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();
  const [toolbarVisible, setToolbarVisible] = useState(false);

  // Define colors based on theme
  const tabBarBackgroundColor = theme === "dark" ? "#161622" : "#ffffff";
  const tabBarBorderColor = theme === "dark" ? "#232533" : "#e0e0e0";
  const tabBarActiveTintColor = theme === "dark" ? "#FFA001" : "#FFA001";
  const tabBarInactiveTintColor = theme === "dark" ? "#CDCDE0" : "#8e8e93";

  return (
    // -------- Major Tap --------

    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: tabBarActiveTintColor,
          tabBarInactiveTintColor: tabBarInactiveTintColor,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily:
              i18n.language === "th"
                ? "NotoSansThai-Regular"
                : "Poppins-Regular",
            marginTop: 5,
          },
          tabBarStyle: {
            backgroundColor: tabBarBackgroundColor,
            borderTopWidth: 0,
            borderTopColor: tabBarBorderColor,
            height: Platform.OS === "ios" ? 90 : 70,
            paddingTop: 5,
            // paddingLeft: 40,
            paddingBottom: Platform.OS === "ios" ? 30 : 5,
            ...Platform.select({
              ios: {
                height: 90,
                paddingBottom: 35,
                safeAreaInsets: { bottom: 35 },
              },
            }),
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t("tabs.home"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: t("tabs.profile"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: t("tabs.create"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TouchableOpacity onPress={() => setToolbarVisible(true)}>
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  focused={focused}
                  size="large" // กำหนดให้เป็นขนาดใหญ่
                />
              </TouchableOpacity>
            ),
            // tabBarLabel: () => null, // ซ่อน label สำหรับปุ่มตรงกลาง
          }}
        />

        <Tabs.Screen
          name="expense"
          options={{
            title: t("tabs.expense"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.expense} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="setting"
          options={{
            title: t("tabs.settings"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.setting} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="(toolbar)"          
          options={{
            headerShown: false,
            tabBarItemStyle: {
              display: "none",
            },
          }}
        />
      </Tabs>
      <Toolbar
        visible={toolbarVisible}
        onClose={() => setToolbarVisible(false)}
      />
    </>
  );
}

const Toolbar = ({ visible, onClose }: ToolbarProps) => {
  const { t, i18n } = useTranslation();
  const { theme } = useTheme();

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity activeOpacity={1} onPress={onClose} style={{ flex: 1 }}>
        <View className="flex-row justify-center items-end flex-1">
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className="flex-row bg-orange-400 rounded-t-full items-center justify-evenly"
            style={{
              width: "95%",
              height: "7%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              backgroundColor: "#FFA001",
              position: "relative",
              bottom: 145,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("ads")}
              className="flex items-center mx-2"
            >
              <Ionicons name="create-outline" size={24} color="white" />
              <Text className="text-white" style={ToolBarTextStyle(i18n)}>
                Ads
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("shop")}
              className="flex items-center mx-2"
            >
              <Ionicons name="home-outline" size={24} color="white" />
              <Text className="text-white" style={ToolBarTextStyle(i18n)}>
                Shop
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("product")}
              className="flex items-center mx-2"
            >
              <Ionicons name="people-outline" size={24} color="white" />
              <Text className="text-white" style={ToolBarTextStyle(i18n)}>
                Product
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("settings")}
              className="flex items-center mx-2"
            >
              <TabIcon icon={icons.setting} color="white" focused={false} />
              <Text className="text-white" style={ToolBarTextStyle(i18n)}>
                {t("tabs.settings")}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
