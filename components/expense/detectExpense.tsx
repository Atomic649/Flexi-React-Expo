import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ExpenseTable from "./ExpenseTable";
import { getMemberId } from "@/utils/utility";
import CallAPIExpense from "@/api/expense_api";
import { router } from "expo-router";


export default function DetectExpense() {
  const { theme } = useTheme();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<any[]>([]);
 

  // auto delete if save is false
  const autoDelete = async () => {
    try {
      const response = await CallAPIExpense.autoDeleteExpenseAPI();
      console.log("🔥response", response)
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
  };


  const pickAndProcessPdf = async () => {
    autoDelete();   
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    console.log("🔥result", result);

    //get uri from result
    const uri =
      result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
    if (!uri) {
      setError("No PDF selected or invalid file.");
      return;
    }
    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      console.log("🔥fileInfo", fileInfo);

      setPdfUri(uri);
      setModalVisible(true);
      console.log("🔥pdfUri", pdfUri);
    } catch (error) {
      console.error("🚨pickAndProcessPdf", error);
      setError("Failed to process PDF");
    }
  };

  const confirmAndProcessPdf = async () => {
    setModalVisible(false);
    setLoading(true);
    try {
      const memberId = await getMemberId();
      const filePath = pdfUri;
      if (memberId && filePath) {
        const response = await CallAPIExpense.extractPDFExpenseAPI(
          memberId,
          filePath
        );
        if (response.message === "Expenses created successfully") {
          setError(null);
          setExpenses(response.expenses);
          console.log("🔥response", response);
        } else {
          console.error("No expenses found in the PDF.");
        }
      } else {
        console.error("Member ID is null or filePath is null");
      }
    } catch (error: any) {
      console.error("Error fetching expenses:", error);
      if (error.message === "Duplicate data found") {
        setError("Duplicate data found");
      } else {
        setError("Failed to process PDF");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    const allExpenseIds = expenses.map(expense => expense.id);
    console.log("🔥allExpenseIds", allExpenseIds);

    if (allExpenseIds.length > 0) {
      try {
        const response = await CallAPIExpense.saveDetectExpenseAPI(allExpenseIds);
        console.log("🔥response", response);
        setExpenses([]); // Clear all data in
        Alert.alert("Expenses saved successfully"),
        router.push("(tabs)/expense");
        
        
       
      } catch (error) {
        console.error("Error saving expenses:", error);
      }
    }
  };

  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <View className="flex-row items-center justify-between px-5 py-3">
        <View className="flex-row items-center justify-center">
        <TouchableOpacity
          className="items-start justify-start mt-2 px-4"
          style={{
            backgroundColor: "transparent",
            alignSelf: "center",
          }}
          onPress={pickAndProcessPdf}
        >
          <FontAwesome name="file-pdf-o" size={36} color="#0feac2" />
          <View className=" flex-row "></View>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
        <Text
          className="text-start text-xl font-bold pt-2"
          style={{ color: theme === "dark" ? "#ffffff" : "#6c6f6f" }}
        >
          SCB - 
        </Text>
        <TextInput
          className={` mt-2 mx-1 h-12 w-48 px-4 rounded-2xl border-2 focus:border-secondary ${
            theme === "dark"
              ? "bg-primary-100 border-black-200"
              : "bg-white border-gray-100"
          }`}
          value=""
          placeholder="Bank Account No."
          placeholderTextColor={theme === "dark" ? "#ccc" : "#666"}
        />
       
        
        </View>
        </View>

        <TouchableOpacity
          className="items-center justify-center  px-2"
          style={{
            backgroundColor: "#0feac2",
            width: 56,
            height: 50,
            borderRadius: 10,
            alignSelf: "center",
          }}
          onPress={handleSave}
        >
        <Text className="text-white text-center text-base font-bold ">SAVE</Text>
        
        
        </TouchableOpacity>
      </View>

    

      {error && (
        <Text
          className="text-center text-red-500 pb-2 "
          style={{ color: theme === "dark" ? "#ff8800" : "#ff0000" }}
        >
          {error}
        </Text>
      )}

      <ExpenseTable expenses={expenses} />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          className="flex-1 justify-center items-center "
          style={{
            backgroundColor: theme === "dark" ? "#000000aa" : "#ffffffaa",
          }}
        >
          <View
            className="bg-white p-4 rounded-lg "
            style={{ width: "90%", height: "62%" }}
          >
            {loading && <ActivityIndicator size="large" />}
            {pdfUri && (
              <WebView
                className="flex-1 w-full h-full"
                originWhitelist={["*"]}
                source={{ uri: pdfUri }}
              />
            )}
            <View className="flex-row justify-between px-10 mt-4">
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="#006eff"
              />
              <Button
                title="Confirm"
                onPress={confirmAndProcessPdf}
                color="#ff1713"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
