import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@/providers/ThemeProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBackgroundColorClass } from '@/utils/themeUtils';
import { Ionicons } from '@expo/vector-icons';

export default function Sell() {
  const { theme } = useTheme();
  return (
    <SafeAreaView 
      className={`h-full ${useBackgroundColorClass()}`}>
      <View>
      
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 65,
          right: 30,
          backgroundColor: '#04eccd',
          borderRadius: 50,
          padding: 15,
          elevation: 5,
        }}
        onPress={() => {
          // Handle button press
        }}
      >
        <Ionicons name="add" size={24} color={theme === 'dark' ? '#ffffff' : '#444541'} />
      </TouchableOpacity>
    </SafeAreaView>
  )
}