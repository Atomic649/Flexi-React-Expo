import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { Ionicons } from '@expo/vector-icons';

interface Expense {
  date: string;
  note: string;
  amount: string;
  file: string;
}

interface ExpenseTableProps {
  expenses: Expense[];
}

const ExpenseTable = ({ expenses }: ExpenseTableProps) => {
  const { theme } = useTheme();
  const headerClass = `text-center font-bold p-2 ${theme === 'dark' ? 'text-white' : 'text-[#ffffff]'}`;
  const cellClass = `flex-1 text-center p-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`;

  const handleFilePress = (file: string) => {
    // Handle file press logic here
    console.log(`File pressed: ${file}`);
  };

  const renderItem = ({ item }: { item: Expense }) => (
    <View
      className={`flex-row border-b ${
        theme === 'dark' ? 'border-zinc-700' : 'border-gray-300'
      }`}
    >
      <Text className={cellClass}>{item.date}</Text>
      <Text className={`flex-2 text-end pt-3 pl-4 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.note}</Text>
      <Text className={cellClass}>{item.amount}</Text>
      <TouchableOpacity 
      onPress={() => handleFilePress(item.file)} className= 'flex-1 pt-2 '>
        <Ionicons 
        className='text-center'
        name="document-text-outline" 
        size={24} color={theme === 'dark' ? 'white' : '#676767'}
         />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 w-full mt-3">
      <View className="flex-row w-full justify-between p-1 px-4 "
      style={{ backgroundColor: theme === 'dark' ? '#3f3e3b' : '#777471' }}>
        <Text className={`${headerClass} w-1/6`}>Date</Text>
        <Text className={`${headerClass} w-2/6`}>Note</Text>
        <Text className={`${headerClass} w-1/7`}>Amount</Text>
        <Text className={`${headerClass} w-1/6`}>File</Text>
      </View>
      <FlatList
        data={expenses}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};

export default ExpenseTable;
