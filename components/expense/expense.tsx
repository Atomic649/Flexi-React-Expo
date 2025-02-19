import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import { useTheme } from "@/providers/ThemeProvider";
import { useBackgroundColorClass } from "@/utils/themeUtils";

export default function Expense() {
  const { theme } = useTheme();
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (error) {
      console.error("🚨pickAndProcessPdf", error);
      setError("Failed to process PDF");
    }
  };

  return (
    <SafeAreaView 
    className={`h-full ${useBackgroundColorClass()}`}
    style={styles.container}>
      <View style={styles.content}>
        <Button 
        title="Select PDF" onPress={pickAndProcessPdf} />
        {loading && <ActivityIndicator size="large" />}
        {error && <Text style={styles.error}>{error}</Text>}
        {pdfUri && (
          <WebView
            style={styles.pdf}
            originWhitelist={["*"]}
            source={{ uri: pdfUri }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pdfContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  error: {
    color: "red",
    marginTop: 10,
  },
});
