import { useState } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import {CustomText} from './CustomText'; // Make sure to import CustomText

const Dropdown = ({
    title,
    options,
    selectedValue,
    onValueChange,
    placeholder,
    otherStyles,
    ...props
}: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
             <CustomText className="text-base text-zinc-500 font-pmedium mb-3">{title}</CustomText>
            <TouchableOpacity
                className="w-full h-16 px-4 bg-[#e4e4e7] rounded-2xl border-2 border-transparent flex flex-row items-center justify-between"
                onPress={() => setIsOpen(!isOpen)}
            >
                <CustomText className="text-[#747068] font-psemibold text-base">
                    {selectedValue || placeholder}
                </CustomText>
                <CustomText className="text-zinc-300 font-psemibold text-base">
                    {isOpen ? "▲" : "▼"}
                </CustomText>
            </TouchableOpacity>

            {isOpen && (
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="w-full h-16 px-4 bg-[#dbdbdc]  rounded-2xl border-1 border-transparent  flex flex-row items-center"
                            onPress={() => {
                                onValueChange(item.value);
                                setIsOpen(false);
                            }}
                        >
                            <CustomText className="text-[#747068] font-psemibold text-base">
                                {item.label}
                            </CustomText>
                        </TouchableOpacity>
                    )}
                    {...props}
                />
            )}
        </View>
    );
};

export default Dropdown;