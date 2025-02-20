import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import detectExpense from '../../components/expense/detectExpense';
import list from '../../components/expense/list';


const Expense = () => {
  const { theme } = useTheme();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "list", title: "Expense List" },
    { key: "detectExpense", title: "Update Expense" },
    
  ]);

  const renderScene = SceneMap({
    list: list,
    detectExpense: detectExpense,
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

export default Expense;
