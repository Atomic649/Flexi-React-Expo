// Button.tsx
import { useTextColorClass } from '@/utils/themeUtils'
import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
}

const Button: React.FC<ButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text className={`${useTextColorClass()}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button