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
