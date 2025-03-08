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
} from "react-native";

import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import { FontAwesome } from "@expo/vector-icons";
import ExpenseTable from "./ExpenseTable";
import { getMemberId } from "@/utils/utility";
import CallAPIExpense from "@/api/expense_api";


export default function DetectExpense() {
  const { theme } = useTheme();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [expenses, setExpenses] = useState<any[]>([]);
 

  // Add more expenses as needed

  const pickAndProcessPdf = async () => {
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
        const response = await CallAPIExpense.extractPDFExpenseAPI(memberId, filePath);
        if (response) {
          setExpenses(response);
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

  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <TouchableOpacity
        className="items-center justify-start mt-5"
        style = {{backgroundColor: "transparent",
          width: "50%",         
          alignSelf: "center",         
          
        }}
        onPress={pickAndProcessPdf}
      >
        <FontAwesome name="file-pdf-o" size={60} color="#0feac2" />
        <View className=" flex-col ">
          <Text
            className="text-center text-xl font-bold pt-2"
            style={{ color: theme === "dark" ? "#ffffff" : "#6c6f6f" }}
          >
            Upload a PDF
          </Text>
        </View>
      </TouchableOpacity>

      <Text
        className="text-white text-center text-base "
        style={{ color: theme === "dark" ? "#ffffff" : "#424140" }}
      >
        Detect expenses automatically
      </Text>

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
