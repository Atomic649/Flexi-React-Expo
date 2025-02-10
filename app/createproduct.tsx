import { useBackgroundColorClass } from "@/utils/themeUtils";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native";

export default function CreateProduct(){
    useTheme();
    return (
        <SafeAreaView
            className={`h-full ${useBackgroundColorClass()}`}
        >
           \/</SafeAreaView>
    )
}