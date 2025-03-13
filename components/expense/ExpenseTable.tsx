import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "@/providers/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";

interface Expense {
  date: string;
  note: string;
  desc: string;
  amount: string;
  file: string;
  id: number;
}

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  const { theme } = useTheme();

  const headerClass = `font-bold p-2  ${
    theme === "dark" ? "text-white" : "text-[#ffffff]"
  }`;
  const cellClass = `flex-1 text-center pt-3 ${
    theme === "dark" ? "text-white" : "text-black"
  }`;
  const dateClass = `flex-1 text-center  text-sm p-3 ${
    theme === "dark" ? "text-white" : "text-black"
  }`;

  const handleFilePress = (file: string) => {
    // Handle file press logic here
    console.log(`File pressed: ${file}`);
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <View
      key={item.id}
      style={{
        backgroundColor: theme === "dark" ? "#3f3e3b" : "#fff",
      }}
    >
      <View
        className={`flex-row border-b ${
          theme === "dark" ? "border-zinc-700" : "border-gray-300"
        }`}
      >
        <View className=" w-1/4">
          <Text className={dateClass} numberOfLines={2}>
            {item.date.split("T")[0]}
            {"\n"}
            {item.date.split("T")[1].replace(":00.000Z", "")}
          </Text>
        </View>
        <View className=" w-3/6">
          <Text
            className={`flex-2 text-end pt-3  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            numberOfLines={1}
          >
            {item.desc}
          </Text>
          <Text
            className={`flex-2 text-end p-3  ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            numberOfLines={1}
          >
            {item.note}
          </Text>
        </View>
        <View className=" w-1/5">
          <Text className={cellClass} numberOfLines={1}>
            {item.amount}
          </Text>
          <TouchableOpacity
            onPress={() => handleFilePress(item.file)}
            className="flex-1 m-2 justify-center items-center"
            disabled={!item.file}
          >
            <Ionicons
              className="text-center"
              name="document-text-outline"
              size={16}
              color={
                !item.file
                  ? theme === "dark"
                    ? "rgba(255, 255, 255, 0.3)"
                    : "rgba(103, 103, 103, 0.3)"
                  : theme === "dark"
                  ? "white"
                  : "#676767"
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View className="flex-1 w-full mt-1">
      <View
        className="flex-row w-full justify-between p-1 px-4 "
        style={{ backgroundColor: theme === "dark" ? "#3f3e3b" : "#777471" }}
      >
        <Text className={`${headerClass} w-1/6`}>Date</Text>
        <Text className={`${headerClass} w-1/2`}>Note</Text>
        <Text className={`${headerClass} w-1/4`}>Amount</Text>
        {/* <Text className={`${headerClass} w-1/6`}>File</Text> */}
      </View>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};

export default ExpenseTable;
