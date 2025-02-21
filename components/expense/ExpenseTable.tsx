import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';

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
  const headerClass = "text-center font-bold p-6 ${theme === 'dark' ? 'text-white' : 'text-black'}";
  const cellClass = "flex-1 text-center p-2 ${theme === 'dark' ? 'text-white' : 'text-black'}";

  return (
    <ScrollView 
    
    horizontal>
      <View className="flex-1 w-full p-6 items-center"> 
        <View className="flex-row w-full">
          <Text className={headerClass}>Date</Text>
          <Text className={headerClass}>Note</Text>
          <Text className={headerClass}>Amount</Text>
          <Text className={headerClass}>File</Text>
        </View>
        {expenses.map((expense, index) => (
          <View
            key={index}
            className={`flex-row border-b ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-300'
            }`}
          >
            <Text className={cellClass}>{expense.date}</Text>
            <Text className={cellClass}>{expense.note}</Text>
            <Text className={cellClass}>{expense.amount}</Text>
            <Text className={cellClass}>{expense.file}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ExpenseTable;
