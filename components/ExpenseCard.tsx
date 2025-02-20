import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options); // Change 'en-US' to desired locale
};

export default function ExpenseCard({
  id,
  date,
  expenses,
  type,
  note,
  AdsCardColor,
  ExCardColor,
  ExpenseColor,
  NoteColor,
  onDelete,
}: any) {
  const getCardColor = (platform: string) => {
    switch (type) {
      case "ads":
        return AdsCardColor;
      case "expense":
        return ExCardColor;
      default:
        return "#61fff2"; // Default color
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this report?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(id),
      },
    ]);
  };

  const renderRightActions = () => (
    <TouchableOpacity
      onPress={handleDelete}
      className="bg-[#ff2a00] justify-center items-center w-20 m-1 rounded-lg"
    >
      <Ionicons name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <View className="flex ">
      <Swipeable renderRightActions={renderRightActions}>
        <View
          className={`flex flex-col items-center pt-3 pb-4 px-4 pe-12  my-1 rounded-se-md          
        `}
          style={{            
            backgroundColor: getCardColor(type),
          }}
        >
          <View className="flex flex-row gap-3 items-start">
            <View className="flex justify-center items-center flex-row flex-1">
              <View className="flex justify-center flex-1 ml-3 gap-y-1">
                <Text
                  className="text-sm text-zinc-500 font-normal"
                  numberOfLines={1}
                >
                  {formatDate(date)}
                </Text>

                <Text
                  className="text-base  font-psemibold"
                  style={{ color: NoteColor }}
                  numberOfLines={1}
                >
                  {note}
                </Text>
              </View>
            </View>
            <View className="pt-2">
              <Text
                className="text-xl font-bold justify-end"
                style={{ color: ExpenseColor }}
                numberOfLines={1}
              >
                -{expenses}
              </Text>
              {/* <TouchableOpacity
          onPress={() => {
            router.push(`editads?id=${id}`);
          }}
              >
          <Ionicons
            name="options"
            color={color}
            size={22}
          ></Ionicons>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </Swipeable>
    </View>
  );
}
