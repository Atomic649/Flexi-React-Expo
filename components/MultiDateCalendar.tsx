import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useTheme } from "@/providers/ThemeProvider";

interface MultiDateCalendarProps {
  onDatesChange: (dates: string[]) => void;
}

const MultiDateCalendar: React.FC<MultiDateCalendarProps> = ({
  onDatesChange,
}) => {
  const { theme } = useTheme();
  const [selectedDates, setSelectedDates] = useState<{ [date: string]: any }>(
    {}
  );

  const handleDayPress = (day: DateData) => {
    const dateString = day.dateString;
    const newSelectedDates = { ...selectedDates };

    // Toggle the selected date
    if (newSelectedDates[dateString]) {
      delete newSelectedDates[dateString]; // Deselect the date
    } else {
      newSelectedDates[dateString] = {
        selected: true,
        selectedColor: theme === "dark" ? "#2dd4bf" : "#ffb30e",
      }; // Select the date
    }

    setSelectedDates(newSelectedDates);
    onDatesChange(Object.keys(newSelectedDates)); // Pass the selected dates to the parent
  };

  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  const calendarTheme =
    theme === "dark"
      ? {
          backgroundColor: "#8d8c8b",
          calendarBackground: "#18181b",
          textSectionTitleColor: "#ffffff",
          textSectionTitleDisabledColor: "#555555",
          dayTextColor: "#ffffff",
          todayTextColor: "#2dd4bf",
          selectedDayTextColor: "#ffffff",
          selectedDayBackgroundColor: "#2dd4bf",
          arrowColor: "#2dd4bf",
          monthTextColor: "#ffffff",
          indicatorColor: "#ffffff",
        }
      : {
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#000000",
          textSectionTitleDisabledColor: "#aaaaaa",
          dayTextColor: "#000000",
          todayTextColor: "#ffb30e",
          selectedDayTextColor: "#ffffff",
          selectedDayBackgroundColor: "#ffb30e",
          arrowColor: "#ffb30e",
          monthTextColor: "#000000",
          indicatorColor: "#000000",
        };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={selectedDates}
        theme={calendarTheme}
        enableMultiSelect={false} // Enable multi-date selection
      />
      {/* <Text style={[styles.selectedDatesText, { color: textColor }]}>
        Selected Dates: {Object.keys(selectedDates).join(', ')}
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  selectedDatesText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MultiDateCalendar;
