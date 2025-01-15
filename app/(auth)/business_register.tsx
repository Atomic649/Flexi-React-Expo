import {
  ScrollView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { View } from "@/components/Themed";
import FormField from "@/components/FormField";
import { router } from "expo-router";
import Button from "@/components/Button";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomAlert from "@/components/CustomAlert";
import { Text } from "@/components/CustomText";
import Dropdown from "@/components/Dropdown";

export default function Register() {
  const { t } = useTranslation();
  const [businessName, setbusinessName] = useState("");
  const [taxType, settaxType] = useState("");
  const [vatId, setvatId] = useState("");
  const [businessType, setbusinessType] = useState("");
  const [error, setError] = useState("");

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
  const handleRegister = async () => {
    setError("");

    // Check if all fields are filled
    if (!businessName || !taxType || !vatId || !businessType) {
      setAlertConfig({
        visible: true,
        title: t("auth.register.validation.incomplete"),
        message: t("auth.register.validation.invalidData"),
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
      // const data = await CallAPIUser.registerAPI({}):

      // TODO - call API business register

      // if (data.error) throw new Error(data.error);

      setAlertConfig({
        visible: true,
        title: t("auth.register.alerts.success"),
        message: t("auth.register.alerts.successMessage"),
        buttons: [
          {
            text: t("auth.register.alerts.ok"),
            onPress: () => {
              setAlertConfig((prev) => ({ ...prev, visible: false }));
              router.replace("/login");
            },
          },
        ],
      });

      // go to login page
      router.replace("/login");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <View
            className="w-full flex justify-center h-full px-4 py-10"
            style={{
              minHeight: Dimensions.get("window").height,
            }}
          >
            <View className="flex items-center">
              <Image
                source={images.logo}
                resizeMode="contain"
                className="h-[34px]"
              />
            </View>

            <Text weight="medium" className="text-2xl mt-10">
              {t("auth.businessRegister.title")}
            </Text>

            <FormField
              title={t("auth.businessRegister.businessName")}
              placeholder={t("auth.businessRegister.businessName")}
              value={businessName}
              handleChangeText={setbusinessName}
              otherStyles="mt-7"
            />

            <Dropdown
              title={t("auth.businessRegister.taxType")}
              options={[
                { label: "Juristic", value: "Juristic" },
                { label: "Individual", value: "Individual" },
                // TODO - en/th translation  and add more options
              ]}
              placeholder={t("auth.businessRegister.taxType")}
              onValueChange={settaxType}
              selectedValue={taxType}
              otherStyles="mt-7"
            />

            <FormField
              title={t("auth.businessRegister.vatId")}
              placeholder={t("0000000000000")}
              value={vatId}
              handleChangeText={setvatId}
              otherStyles="mt-7"
              keyboardType="number-pad"
            />

            <Dropdown
              title={t("auth.businessRegister.businessType")}
              options={[
                { label: "OnlineSale", value: "OnlineSale" },
                { label: "Massage", value: "Massage" },
                // TODO - en/th translation  and add more options
              ]}
              placeholder={t("auth.businessRegister.businessType")}
              selectedValue={businessType}
              onValueChange={setbusinessType}
              otherStyles="mt-7"
            />

            {error ? <Text className="text-red-500 mt-4">{error}</Text> : null}

            <CustomButton
              title={t("auth.register.button")}
              handlePress={handleRegister}
              containerStyles="mt-7"
              textStyles="!text-white"
            />

            <View className="flex justify-center pt-5 flex-row gap-2">
              <Text weight="regular" className="text-lg text-gray-100">
                {t("auth.register.hasAccount")}
              </Text>
              <Button
                title={t("auth.register.loginButton")}
                onPress={() => router.replace("/login")}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
