import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    theme,
    ...props
}: any) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-zinc-500 font-pmedium mb-3">{title}</Text>
            <View className="w-full h-16 px-4  bg-[#e4e4e7] rounded-2xl border-2 border-transparent focus:border-secondary flex flex-row items-center">
                <TextInput
                    className="flex-1 text-[#747068] font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#989795"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                    {...props}
                />

                {title === "Password" && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};


export default FormField