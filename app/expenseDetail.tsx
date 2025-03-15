import { ScrollView, TouchableOpacity, Image, Modal, Text, TextInput } from "react-native";
import { View } from "@/components/Themed";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomAlert from "@/components/CustomAlert";
import { CustomText } from "@/components/CustomText";
import FormField2 from "@/components/FormField2";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/providers/ThemeProvider";
import CallAPIExpense from "@/api/expense_api";

interface ExpenseDetailProps {
  visible: boolean;
  onClose: () => void;
  expense: {
    date: string;
    note: string;
    desc: string;
    amount: string;
    file: string;
    id: number;
  };
}

export default function ExpenseDetail({
  visible,
  onClose,
  expense,
}: ExpenseDetailProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [date, setDate] = useState(expense.date);
  const [note, setNote] = useState(expense.note);
  const [desc, setDesc] = useState(expense.desc);
  const [amount, setAmount] = useState(expense.amount);
  const [file, setFile] = useState(expense.file);
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fieldStyles = "mt-2 mb-2";

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const expense = await CallAPIExpense.getExpenseByIdAPI(Number(id));
        setDate(expense.date);
        setNote(expense.note);
        setDesc(expense.desc);
        setAmount(expense.amount);
        setFile(expense.file);
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    fetchExpense();
  }, [id]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Add alert config state
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    buttons: Array<{
      text: string;
      onPress: () => void;
      style?: "default" | "cancel" | "destructive";
    }>;
  }>({
    visible: false,
    title: "",
    message: "",
    buttons: [],
  });

  // Handle update
  const handleUpdateProduct = async () => {
    setError("");

    // Check if all fields are filled
    if (!date || !note || !desc || !amount) {
      setAlertConfig({
        visible: true,
        title: t("product.validation.incomplete"),
        message: t("product.validation.invalidData"),
        buttons: [
          {
            text: t("common.ok"),
            onPress: () =>
              setAlertConfig((prev) => ({ ...prev, visible: false })),
          },
        ],
      });
      return;
    }

    try {
      // Call the update API
      const data = await CallAPIExpense.updateExpenseAPI(Number(id), {
        date,
        note,
        desc,
        amount: Number(amount),
        file,
      });

      if (data.error) throw new Error(data.error);

      setAlertConfig({
        visible: true,
        title: t("product.alerts.successTitle"),
        message: t("product.alerts.successMessage"),
        buttons: [
          {
            text: t("product.alerts.ok"),
            onPress: () => {
              setAlertConfig((prev) => ({ ...prev, visible: false }));
              // go to product page
              router.replace("(tabs)/product");
            },
          },
        ],
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme === "dark" ? "#000000aa" : "#ffffffaa",
        }}
        activeOpacity={1}
        onPressOut={onClose}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{ width: "100%" }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={{
                            justifyContent: "center",
              width: "90%",
              backgroundColor: theme === "dark" ? "#2D2D2D" : "#ffffff",
              borderRadius: 10,
            }}
            onPress={() => {}}
          >
            <View className=" flex-1 justify-center h-full py-6 px-4 rounded-lg">
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 280, height: 300 }}
                  className="mt-4 mb-6 self-center rounded-md"
                />
              )}

              <CustomText className="text-center text-lg font-bold">
                {desc}
              </CustomText>
                <Text
                className="text-center text-2xl font-bold"
                style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
                >
                {amount}
                </Text>
              <TextInput
                className={`mt-3 mb-2 mx-1 h-14  px-4 rounded-2xl border-2 focus:border-secondary ${
                  theme === "dark"
                    ? "bg-primary-100 border-black-200"
                    : "bg-white border-gray-100"
                }`}
                value={note}
                onChangeText={setNote}
                placeholder="note"
              />
              <View className="flex-row justify-evenly">
                <TouchableOpacity
                  onPress={pickImage}
                  className=" items-center justify-center"
                >
                  <Ionicons name="document-text-outline"size={26} color="#999999" />
                  <CustomText className="text-center text-blue-500 mt-1">
                    Attach File
                  </CustomText>
                </TouchableOpacity>

                {error ? (
                  <CustomText className="text-red-500 mt-4">{error}</CustomText>
                ) : null}

                <CustomButton
                  title="Save"
                  handlePress={handleUpdateProduct}
                  containerStyles="px-12 mt-2"
                  textStyles="!text-white"
                />
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          onClose={() =>
            setAlertConfig((prev) => ({ ...prev, visible: false }))
          }
        />
      </TouchableOpacity>
    </Modal>
  );
}
