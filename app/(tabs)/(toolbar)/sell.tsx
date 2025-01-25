import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/providers/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function sell() {
   const { theme } = useTheme();
  return (
    <SafeAreaView className={`h-full ${theme === "dark" ? "bg-primary" : "bg-white"}`}>
      <View>
      
      </View>
    </SafeAreaView>
  )
}