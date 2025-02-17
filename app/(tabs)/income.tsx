import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import ByOrder from "../../components/income/byOrder";
import Daily from "../../components/income/daily";
import Monthly from "../../components/income/monthly";

const Income = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "byOrder", title: "byOrder" },
    { key: "daily", title: "Daily" },
    { key: "monthly", title: "Monthly" },
  ]);

  const renderScene = SceneMap({
    byOrder: ByOrder,
    daily: Daily,
    monthly: Monthly,
  });

  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
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
