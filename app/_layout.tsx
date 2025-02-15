// Import your global CSS file
import "../global.css";
import "@/i18n";
import React, { useEffect } from "react";
import { router, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { SafeAreaView, StatusBar, TouchableOpacity, Text } from "react-native";
import { ThemeProvider, useTheme } from "@/providers/ThemeProvider";
import * as NavigationBar from "expo-navigation-bar";
import { AuthProvider } from "@/providers/AuthProvider";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

function RootLayoutNav() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    async function updateNavigationBar() {
      try {
        const navBarColor = theme === "dark" ? "#18181b" : "#ffffff";
        await NavigationBar.setBackgroundColorAsync(navBarColor);
        // Set button style based on theme
        await NavigationBar.setButtonStyleAsync(
          theme === "dark" ? "light" : "dark"
        );
      } catch (error) {
        console.error("Error setting navigation bar:", error);
      }
    }

    updateNavigationBar();
  }, [theme]);

  return (
    <SafeAreaView
      className={`h-screen ${theme === "dark" ? "bg-zinc-900" : "bg-white"}`} // color of last bottom bar
    >
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme === "dark" ? "#18181b" : "#ffffff"}
        animated={true}
      />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            ...mainTopBar(theme),
            title: "",
            //TODO : 🚧 add business name here
          }}
        />
        <Stack.Screen
          name="(auth)"
          options={{
            ...HideTopBar(),
            title: t("auth.login.title"),
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            ...HideTopBar(),
            title: t("tabs.home"),
          }}
        />
        <Stack.Screen
          name="profile" // file name
          options={{
            ...showTopBarAndBackIcon(theme),
            title: t("profile.myProfile"), // Tab Name
          }}
        />
        <Stack.Screen
          name="business_info" // file name
          options={{
            ...showTopBarAndBackIcon(theme),
            title: t("settings.businessInfo"), // Tab Name
          }}
        />
        // Roadmap
        <Stack.Screen
          name="roadmap" // file name
          options={{
            ...showTopBarAndBackIcon(theme),
            title: "Roadmap", // Tab Name
          }}
        />
        // Create Product
        <Stack.Screen
          name="createproduct" // file name
          options={{
            ...showTopBarAndBackIcon(theme),
            title: t("create.title"), // Tab Name
          }}
        />
        // Edit Product
        <Stack.Screen
          name="editproduct" // file name
          options={{
            ...showTopBarAndBackIcon(theme),
            title: t("product.detail"), // Tab Name
          }}
        />
        // Create Ads
        <Stack.Screen
          name="createads" // file name
          options={{
            ...showTopBarAndBackIcon(theme),
            title: t("ads.createAd"), // Tab Name
          }}
        />
        // Create Store
        <Stack.Screen
          name="createstore" // file name
          options={{
            ...showTopBarAndBackIcon(theme),
            title: t("ads.createStore"), // Tab Name
          }}
        />
        {/* <Stack.Screen name="productdetail" options={{ headerShown: true }} />
        <Stack.Screen name="editproduct" options={{ headerShown: true }} /> */}
      </Stack>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  // Load fonts before rendering the app
  const [fontsLoaded, error] = useFonts({
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "NotoSansThai-Thin": require("../assets/fonts/NotoSansThai-Thin.ttf"),
    "NotoSansThai-ExtraLight": require("../assets/fonts/NotoSansThai-ExtraLight.ttf"),
    "NotoSansThai-Light": require("../assets/fonts/NotoSansThai-Light.ttf"),
    "NotoSansThai-Regular": require("../assets/fonts/NotoSansThai-Regular.ttf"),
    "NotoSansThai-Medium": require("../assets/fonts/NotoSansThai-Medium.ttf"),
    "NotoSansThai-SemiBold": require("../assets/fonts/NotoSansThai-SemiBold.ttf"),
    "NotoSansThai-Bold": require("../assets/fonts/NotoSansThai-Bold.ttf"),
    "NotoSansThai-ExtraBold": require("../assets/fonts/NotoSansThai-ExtraBold.ttf"),
    "NotoSansThai-Black": require("../assets/fonts/NotoSansThai-Black.ttf"),
  });

  if (error) throw error;
  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}

// Reuseable functions for showing Top bar
const showTopBarAndBackIcon = (theme: string) => ({
  headerShown: true,
  headerStyle: {
    backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
  },
  headerTintColor: theme === "dark" ? "#ffffff" : "#18181b",
  headerLeft: () => (
    // Back button
    <Ionicons
      name="chevron-back"
      size={24}
      color={theme === "dark" ? "#ffffff" : "#18181b"}
      onPress={() => router.back()}
    />
  ),
});

// Reuseable functions for hiding Top bar
const HideTopBar = () => ({
  headerShown: false,
});

// Reuseable functions for Main Top bar
const mainTopBar = (theme: string) => ({
  headerShown: true,
  headerStyle: {
    backgroundColor: theme === "dark" ? "#18181b" : "#ffffff", //
  },
  headerTintColor: theme === "dark" ? "#ffffff" : "#18181b",
  headerRight: () => (
    <TouchableOpacity onPress={() => router.push("roadmap")} className="mr-2">
      <Ionicons
        name="people"
        size={24}
        color={theme === "dark" ? "#ffffff" : "#75726a"}
      />
      <Text className="text-xs font-bold text-white bg-teal-400 rounded-full px-1 absolute -top-1 -right-3">
        2
      </Text>
    </TouchableOpacity>
  ),
});
