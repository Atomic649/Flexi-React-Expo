import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";

const Income = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "byOrder", title: "byOrder" },
    { key: "daily", title: "Daily" },
    { key: "monthly", title: "Monthly" },
  ]);

  const renderScene = SceneMap({
    byOrder: () => (
      <View className="flex-1 justify-center items-center">
        <Text>byOrder</Text>
      </View>
    ),
    daily: () => (
      <View className="flex-1 justify-center items-center">
        <Text>Expense</Text>
      </View>
    ),
    monthly: () => (
      <View className="flex-1 justify-center items-center">
        <Text>Summary</Text>
      </View>
    ),
  });

  return (
    <SafeAreaView
      className={`h-full ${theme === "dark" ? "bg-primary" : "bg-white"}`}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            tabStyle={
              theme === "dark"
                ? {
                    backgroundColor: "#161622",
                    margin: 5,
                    borderRadius: 10,
                  }
                : { backgroundColor: "#ff8513", borderColor: "gray" }
            }
            indicatorStyle={{ backgroundColor: "#ff9d00" }}
            style={
              theme === "dark"
                ? { backgroundColor: "#161622" }
                : { backgroundColor: "#fff" }
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Income;
