import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ExpenseTable from "./ExpenseTable";

export default function DetectExpense() {
  const { theme } = useTheme();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const expenses = [
    {
      date: "2023-10-01",
      note: "Facebook ADS",
      amount: "$100",
      file: "receipt1.pdf",
    },
    {
      date: "2023-10-02",
      note: "Kerry Express",
      amount: "$20",
      file: "receipt2.pdf",
    },
    // Add more expenses as needed
  ];

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
    console.log("🔥uri", uri);

    try {
      const fileInfo = await FileSystem.getInfoAsync(uri);
      console.log("🔥fileInfo", fileInfo);

      setPdfUri(uri);
      setModalVisible(true);
    } catch (error) {
      console.error("🚨pickAndProcessPdf", error);
      setError("Failed to process PDF");
    }
  };

  return (
    <SafeAreaView className={`h-full ${useBackgroundColorClass()}`}>
      <TouchableOpacity
        className="items-center justify-start"
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
        className="text-white text-center text-base pb-10"
        style={{ color: theme === "dark" ? "#ffffff" : "#424140" }}
      >
        Detect expenses automatically
      </Text>

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
                onPress={() => {
                  setModalVisible(false);
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setError("Failed to process PDF");
                  }, 3000);
                }}
                color="#ff1713"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
