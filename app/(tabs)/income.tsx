import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { useBackgroundColorClass, useTextColorClass } from "@/utils/themeUtils";

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
        <Text className={useTextColorClass()}>byOrder</Text>
      </View>
    ),
    daily: () => (
      <View className="flex-1 justify-center items-center">
      <Text className={useTextColorClass()}>Expense</Text>
      </View>
    ),
    monthly: () => (
      <View className="flex-1 justify-center items-center">
      <Text className={useTextColorClass()}>Summary</Text>
      </View>
    ),
  });

  return (
    <SafeAreaView
      className={`h-full ${useBackgroundColorClass()}`}
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
                    backgroundColor: "#18181b",
                    margin: 5,
                    borderRadius: 10,
                  }
                : { backgroundColor: "#00d2b6", borderColor: "gray" }
            }
            indicatorStyle={{ backgroundColor: "#1afee0" }}
            style={
              theme === "dark"
                ? { backgroundColor: "#18181b" }
                : { backgroundColor: "#fff" }
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Income;
