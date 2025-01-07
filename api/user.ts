import axios from 'axios';
import { checkNetwork } from '@/utils/utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.103:3000/'; // Replace with your backend URL

class CallAPIUser {
  private _axios = axios.create({
    baseURL: API_URL,
  });

  private async _getAxiosWithAuth() {
    const token = await AsyncStorage.getItem('token');
    return axios.create({
      baseURL: API_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Register API
  async registerAPI(data: any): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: 'No Network Connection' };
    }
    try {
      const response = await this._axios.post('/auth/register', data);

      console.log('response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Register API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error('Network Error');
      }
    }
  }

  // Login API
  async loginAPI(data: any): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: 'No Network Connection' };
    }
    try {
      const response = await this._axios.post('/auth/login', data);

      console.log('response:', response.data);

      return response.data;
    } catch (error) {
      console.error('Login API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error('Network Error');
      }
    }
  }

  // Get Session
  async getSession(): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: 'No Network Connection' };
    }
    try {
      const axiosInstance = await this._getAxiosWithAuth();
      const response = await axiosInstance.get('/auth/session');
      return response.data;
    } catch (error) {
      console.error('Get Session Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error('Network Error');
      }
    }
  }

  // Logout API
  async logoutAPI(): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: 'No Network Connection' };
    }
    try {
      const axiosInstance = await this._getAxiosWithAuth();
      const response = await axiosInstance.get('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout API Error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error('Network Error');
      }
    }
  }

  // onAuthStateChange
  onAuthStateChange(callback: (session: any) => void) {
    // Implement this method to listen to authentication state changes
  }
}


export default new CallAPIUser();