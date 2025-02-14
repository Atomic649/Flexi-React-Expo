import { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

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
             <Text className="text-base text-zinc-500 font-pmedium mb-3">{title}</Text>
            <TouchableOpacity
                className="w-full h-16 px-4 bg-[#e4e4e7] rounded-2xl border-2 border-transparent flex flex-row items-center justify-between"
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text className="text-[#747068] font-psemibold text-base">
                    {selectedValue || placeholder}
                </Text>
                <Text className="text-zinc-300 font-psemibold text-base">
                    {isOpen ? "▲" : "▼"}
                </Text>
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
                            <Text className="text-[#747068] font-psemibold text-base">
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {...props}
                />
            )}
        </View>
    );
};

export default Dropdown;