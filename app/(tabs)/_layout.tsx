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
import { LinearGradient } from "expo-linear-gradient"; // Import LinearGradient

// ปรับปรุง interface ของ TabIcon
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
      ${size === "large" ? "-mt-5" : ""}  // ขยับไอคอนขึ้นถ้าเป็นขนาดใหญ่
    `}
    >
      <View
        className={`
        flex items-center justify-center
        ${
          size === "large" ? "bg-teal-400 p-3 rounded-full  "  : ""
        }  // เพิ่มพื้นหลังถ้าเป็นขนาดใหญ่
      `}
      >
        <Image
          source={icon}
          resizeMode="contain"
          // Color Icon of Middle Tab
          tintColor={size === "large" ? "#f4f4f5" : color}
          className={size === "large" ? "w-9 h-9  " : "w-9 h-7"}
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
  const tabBarBackgroundColor = theme === "dark" ? "#18181b" : "#f4f4f5"; // C2 - Main Tab Bar BG Color
  const tabBarBorderColor = theme === "dark" ? "#232533" : "#e0e0e0";
  const tabBarActiveTintColor = theme === "dark" ? "#03dcc7" : "#2dd4bf";
  const tabBarInactiveTintColor = theme === "dark" ? "#a1a1a1" : "#75726a";

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
                height: 60,
                paddingBottom: 0,
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
          name="income"
          options={{
            title: t("tabs.income"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.income} color={color} focused={focused} />
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
                  icon={icons.flexi}
                  color={color}
                  focused={focused}
                  size="large" // กำหนดให้เป็นขนาดใหญ่
                />
              </TouchableOpacity>
            ),
              tabBarLabel: () => null, // ซ่อน label สำหรับปุ่มตรงกลาง
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
          name="shop"
          options={{
            title: t("tabs.shop"),
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.shop2} color={color} focused={focused} />
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
  const ModalComponent = Platform.OS === "web" ? View : Modal;

  return (
    <ModalComponent
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
            className="flex-row rounded-t-full items-center justify-evenly"
            style={{
              backgroundColor: theme === "dark" ? "#18181b" : "#75726a",  
              borderColor: theme === "dark" ? "#2c3030" : "#75726a",
              borderStyle: "solid",
              //shadowColor: "#baf0ff",
              // shadowOffset: {
              //   width: 2,
              //   height: 2,
              // },
              // shadowOpacity: 0.5,
              borderWidth: 1,    
              width: Platform.OS === "web" ? "30%" : "95%",
              height: "7%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              position: "relative",
              bottom: 110,
            }}
          >
            <TouchableOpacity
              onPress={() => router.push("ads")}
              className="flex items-center mx-2"
            >
              <TabIcon
                icon={icons.ads2}
                color={getIconColor(theme)}
                focused={false}
              />
              <Text
                className="text-white"
                style={[ToolBarTextStyle(i18n, theme)]}
              >
                {t("tabs.ads")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("sell")}
              className="flex items-center mx-2"
            >
              <TabIcon
                icon={icons.sell}
                color={getIconColor(theme)}
                focused={false}
              />
              <Text
                className="text-white"
                style={[ToolBarTextStyle(i18n, theme)]}
              >
                {t("tabs.sell")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("product")}
              className="flex items-center mx-2"
            >
              <TabIcon
                icon={icons.product}
                color={getIconColor(theme)}
                focused={false}
              />
              <Text
                className="text-white"
                style={[ToolBarTextStyle(i18n, theme)]}
              >
                {t("tabs.product")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("settings")}
              className="flex items-center mx-2"
            >
              <TabIcon
                icon={icons.setting}
                color={getIconColor(theme)}
                focused={false}
              />
              <Text
                className="text-white"
                style={[ToolBarTextStyle(i18n, theme)]}
              >
                {t("tabs.settings")}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ModalComponent>
  );
};

const ToolBarTextStyle = (i18n: i18n, theme: string) => ({
  // ปรับปรุงสีข้อความของ TabBar
  color: theme === "dark" ? "#a1a1a1" : "#ffffff",
  fontSize: 12,
  fontFamily:
    i18n.language === "th" ? "NotoSansThai-Regular" : "Poppins-Regular",
  marginTop: 2,
});

// Define a function to get the color based on the theme
const getIconColor = (theme: string) =>
  // ปรับปรุงสีไอคอนของ TabBar
  theme === "dark" ? "#a1a1a1" : "#ffffff";
