import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/providers/ThemeProvider";
import TabIcon from "./TabIcon";
import { icons } from "@/constants";
import { i18n } from "i18next";
import { router } from "expo-router";

const ToolBarTextStyle = (i18n: i18n) => ({
  fontSize: 12,
  fontFamily:
    i18n.language === "th" ? "NotoSansThai-Regular" : "Poppins-Regular",
});

interface ToolbarProps {
  visible: boolean;
  onClose: () => void;
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

export default Toolbar;
