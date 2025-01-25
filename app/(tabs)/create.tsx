// rnf
import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import { useTheme } from '@/providers/ThemeProvider';

export default function Create() {
  const { theme } = useTheme();
  return (
    <SafeAreaView className={`h-full ${theme === "dark" ? "bg-primary" : "bg-white"}`}>
         <View>
         
         </View>
       </SafeAreaView>
     )
   }