import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import ByOrder from "../../components/income/byOrder";
import Daily from "../../components/income/daily";
import Monthly from "../../components/income/monthly";
import { useTranslation } from "react-i18next";

const Income = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "byOrder", title: t("income.title.byOrder") },
    { key: "daily", title: t("income.title.Daily") },
    { key: "monthly", title: t("income.title.Monthly") },
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
                    backgroundColor: "#1d1d1d",
                    margin: 5,
                    borderRadius: 10,
                  }
                : { backgroundColor: "#4e4b47", margin: 5, borderRadius: 10 }
            }
            indicatorStyle={{ backgroundColor: "#1afee0" }}
            style={
              theme === "dark"
                ? { backgroundColor: "#1d1d1d" }
                : { backgroundColor: "#4e4b47" }
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Income;
