import { useState, useEffect } from "react";
import CallAPIPlatform from "@/api/platform_api";
import CallAPIStore from "@/api/store_api"; // Adjust the import path as necessary
import { useTranslation } from "react-i18next";
import { getMemberId } from "@/utils/utility";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBackgroundColorClass } from "@/utils/themeUtils";
import { ScrollView, View ,Text} from "react-native";
import CustomButton from "@/components/CustomButton";
import CustomAlert from "@/components/CustomAlert";
import FormField2 from "@/components/FormField2";
import Dropdown2 from "@/components/Dropdown2";

export default function EditStore() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [memberId, setMemberId] = useState<string | null>(null);
  const [platform, setPlatform] = useState("");
  const [accName, setAccName] = useState("");
  const [accId, setAccId] = useState("");
  const [error, setError] = useState("");

  const fieldStyles = "mt-2 mb-2";

  type AlertButton = {
    text: string;
    onPress: () => void;
  };
  
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    buttons: AlertButton[];
  }>({
    visible: false,
    title: "",
    message: "",
    buttons: [],
  });


// Handle update ads
  const handleUpdateStore = async () => {
    setError("");

    // Check if all fields are filled
    if (!platform || !accName || !accId) {
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
      const data = await CallAPIStore.updateStoreAPI(Number(id), {
        platform,
        accName,
        accId,
        memberId: memberId!,
      });
      if (data.error) throw new Error(data.error);

      setAlertConfig({
        visible: true,
        title: t("store.alerts.successTitle"),
        message: t("store.alerts.successMessage"),
        buttons: [
          {
        text: t("store.alerts.ok"),
        onPress: () => {
          setAlertConfig((prev) => ({ ...prev, visible: false }));
          // go to store page
          router.replace("(tabs)/store");
        },
          },
        ],
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <SafeAreaView className={`flex-1  ${useBackgroundColorClass()}`}>
      <ScrollView>
        <View className=" flex-1 justify-center mt-14 h-full px-4 py-5 pb-20">
          <Dropdown2
            title={t("store.platform")}
            options={[
              {
          label: t("store.platformOption.Facebook"),
          value: "Facebook",
              },
              {
          label: t("store.platformOption.Tiktok"),
          value: "Tiktok",
              },
              {
          label: t("store.platformOption.Shopee"),
          value: "Shopee",                
              },
              {
          label: t("store.platformOption.Line"),
          value: "Line"
              }
            ]}
            placeholder={t("store.choosePlatform")}
            selectedValue={t(`store.platformOption.${platform}`)}
            onValueChange= {setPlatform}
            otherStyles="mt-0 mb-2"
          />
          <FormField2
            title={t("store.accName")}
            value={accName}
            handleChangeText={setAccName}
            placeholder={t("store.accNameRecommend")}
            otherStyles={fieldStyles}
          />
          <FormField2
            title={t("store.accId")}
            value={accId}
            handleChangeText={setAccId}
            otherStyles={fieldStyles}
            placeholder= "00000000000000"
            keyboardType="numeric"
          />

          {error ? <Text className="text-red-500 mt-4">{error}</Text> : null}

          <CustomButton
            title={t("store.createbutton")}
            handlePress={handleUpdateStore}
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

