import React, { useState, useEffect } from 'react'
import { ScrollView, TextInput, TouchableOpacity, Image, Alert, ActivityIndicator, Modal, Pressable, SafeAreaView } from 'react-native'
import { View } from '@/components/Themed'
import { Stack, useLocalSearchParams, router } from 'expo-router'
import { useTheme } from '@/providers/ThemeProvider'
import { useTranslation } from 'react-i18next'

import * as ImagePicker from 'expo-image-picker'
import { decode } from 'base64-arraybuffer'
import { FontAwesome } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import * as ImageManipulator from 'expo-image-manipulator';
import CustomAlert from '@/components/CustomAlert'
import { Text } from "@/components/CustomText"

