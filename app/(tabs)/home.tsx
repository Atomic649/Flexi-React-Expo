import { View, Text,  TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useTheme } from '@/providers/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function home() {
    const { theme } = useTheme();
  return (
    <SafeAreaView className={`h-full ${theme === "dark" ? "bg-primary" : "bg-white"}`}>
      

      {/* Date Picker */}
      <View className="flex-row justify-between items-center px-4 py-2">
        <Text className="text-gray-500">เลือกเซลล์</Text>
        <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-lg">
          <Text>2020-01-C</Text>
        </TouchableOpacity>
      </View>

      {/* Summary Box */}
      <View className="mx-4 p-4 bg-white rounded-xl ">
        <Text className="text-center text-lg font-bold text-green-500">NaN%</Text>
        <Text className="text-center text-xl font-bold">0.00฿</Text>
        <Text className="text-center text-gray-500">ยอดขายรวม</Text>
      </View>

      {/* Sales Section */}
      <ScrollView className="mx-4 mt-4">
        {[...Array(4)].map((_, index) => (
          <View key={index} className="flex-row justify-between bg-white rounded-lg p-4 mb-4 ">
            <Text className="text-lg font-bold text-blue-600">Facebook</Text>
            <View>
              <Text className="text-gray-600">ยอดขาย</Text>
              <Text className="font-bold">0.00฿</Text>
            </View>
            <View>
              <Text className="text-gray-600">กำไรขั้นต้น</Text>
              <Text className="text-green-500 font-bold">0.00฿</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

