import axios from 'axios';
import { getAxiosWithAuth } from '@/utils/axiosInstance';

class CallAPIProduct {
  // Get Products
  async getProductsAPI(): Promise<any> {
    try {
      
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.get("/product/");
        
      console.log("🚀ProductAPI:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨 Get Products API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

}
export default new CallAPIProduct();
