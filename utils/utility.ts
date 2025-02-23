import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Network from 'expo-network';
import jwtDecode from 'jwt-decode';



// Function to check the network status
export const checkNetwork = async (): Promise<boolean> => {
  try {
    const networkState = await Network.getNetworkStateAsync();
    return networkState.isConnected ?? false;
  } catch (error) {
    console.error('Error checking network status:', error);
    return false;
  }
};

// Function to save the token to AsyncStorage
export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
    console.log('💾 Token saved:', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Function to get the token from AsyncStorage
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log('✅ Token Get :', token);
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
}

// Function to remove the token from AsyncStorage
export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    console.log('🗑️ Token removed');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Function to save userId  to AsyncStorage
export const saveUserId = async (userId: number) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
    console.log('💾 userId saved:', userId);
  } catch (error) {
    console.error('Error saving userId:', error);
  }
}

// Function to get userId from AsyncStorage and convert it to number
export const getUserId = async (): Promise<number | null> => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    console.log('✅ userId Get :', userId);
    return userId ? parseInt(userId) : null;
  } catch (error) {
    console.error('Error getting userId:', error);
    return null;
  }
}

// Fuction to save meberId to AsyncStorage
export const saveMemberId = async (memberId: string) => {
  try {
    await AsyncStorage.setItem('memberId', memberId);
    console.log('💾 memberId saved:', memberId);
  } catch (error) {
    console.error('Error saving memberId:', error);
  }
}

// Function to get memberId from AsyncStorage
export const getMemberId = async (): Promise<string | null> => {
  try {
    const memberId = await AsyncStorage.getItem('memberId');
    console.log('✅ memberId Get :', memberId);
    return memberId;
  } catch (error) {
    console.error('Error getting memberId:', error);
    return null;
  }
}

// Function to remove memberId from AsyncStorage
export const removeMemberId = async () => {
  try {
    await AsyncStorage.removeItem('memberId');
    console.log('🗑️ memberId removed');
  } catch (error) {
    console.error('Error removing memberId:', error);
  }
}