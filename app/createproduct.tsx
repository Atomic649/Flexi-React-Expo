import { ScrollView, TouchableOpacity, Image, SafeAreaView } from "react-native";
import { View } from "@/components/Themed";
import { useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomAlert from "@/components/CustomAlert";
import { Text } from "@/components/CustomText";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import CallAPIProduct from "@/api/product_api";
import FormField2 from "@/components/FormField2";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from "@expo/vector-icons";
import { getMemberId } from "@/utils/utility";

export default function CreateProduct() {
  const { t } = useTranslation();
  const router = useRouter();
  const [memberId, setMemberId] = useState<string | null>(null);
  const [name, setproductname] = useState("");
  const [description, setdescription] = useState("");
  const [barcode, setbarcode] = useState("");
  const [stock, setstock] = useState("");
  const [price, setprice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState("");

  const fieldStyles = "mt-2 mb-2";

  useEffect(() => {
    const fetchMemberId = async () => {
      const uniqueId = await AsyncStorage.getItem("uniqueId");
      setMemberId(uniqueId);
    };

    fetchMemberId();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
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

  // Handle register
  const handleCreateProduct = async () => {
    setError("");

    // Check if all fields are filled
    if (!name || !description || !barcode || !stock || !price) {
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
      // Call the register API
      const data = await CallAPIProduct.createProductAPI({
        name,
        description,
        barcode,
        stock: Number(stock),
        price: Number(price),
        memberId: (await getMemberId()) || "",
        image: image || "",
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
              router.replace("/login");
            },
          },
        ],
      });

      // go to login page
      router.replace("(tabs)/product");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView className={`flex-1   ${useBackgroundColorClass()}`}>
      <ScrollView>
        <View className=" flex-1 justify-center h-full px-4 py-5 pb-20">

        {image && (
            <Image source={{ uri: image }} style={{ width: 350, height: 350 }} className="mt-4 mb-6 self-center rounded-md" />
          )}

        
         

          <FormField2
            title={t("product.productName")}
            value={name}
            handleChangeText={setproductname}
            otherStyles="mt-0 mb-2"
          />

          <FormField2
            title={t("product.barcode")}
            value={description}
            handleChangeText={setdescription}
            otherStyles={fieldStyles}
            keyboardType="number-pad"
          />

          <FormField2
            title={t("product.description")}
            value={barcode}
            handleChangeText={setbarcode}
            otherStyles={fieldStyles}
          />

          <View className="flex flex-row justify-between">
            <View className="w-1/2 pr-2">
              <FormField2
                title={t("product.stock")}
                value={stock}
                handleChangeText={setstock}
                otherStyles={fieldStyles}
                keyboardType="number-pad"
              />
            </View>
            <View className="w-1/2 pl-2">
              <FormField2
                title={t("product.price")}
                value={price}
                handleChangeText={setprice}
                otherStyles={fieldStyles}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <TouchableOpacity onPress={pickImage} className="mt-8 mb-2 items-center text">
           
            <Ionicons name="image" size={54} color="#d6d6dc" />
            <Text className="text-center text-zinc-500 mt-1">{t("product.uploadImage")}</Text>
          </TouchableOpacity>

          


          {error ? <Text className="text-red-500 mt-4">{error}</Text> : null}

          <CustomButton
            title={t("product.createbutton")}
            handlePress={handleCreateProduct}
            containerStyles="mt-5 "
            textStyles="!text-white"
          />
        </View>

        
      </ScrollView>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onClose={() => setAlertConfig((prev) => ({ ...prev, visible: false }))}
      />
    </SafeAreaView>
  );
}
