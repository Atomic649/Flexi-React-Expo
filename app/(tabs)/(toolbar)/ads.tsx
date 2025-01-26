import { View, Text } from 'react-native'
import React from 'react'
import { useTheme } from '@/providers/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackgroundColorClass } from '@/utils/themeUtils';


export default function ads() {
   const { theme } = useTheme();
  return (
    <SafeAreaView 
    className={`h-full ${useBackgroundColorClass()}`}>
      <View>
      
      </View>
    </SafeAreaView>
  )
}