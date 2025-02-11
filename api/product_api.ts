import axios from 'axios';
import { getAxiosWithAuth } from '@/utils/axiosInstance';

class CallAPIProduct {
  // Get Products
  async getProductsAPI(memberId:string): Promise<any> {
    try {
      
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.get(`/product/member/${memberId}`);
        
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

  // Create Product
  async createProductAPI(data: 
    {
      name: string;
      description: string;
      barcode: string;
      stock: number;
      price: number;
      memberId: string;
      image?: string;
    }
  ): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.post("/product/", data);
      return response.data;
    } catch (error) {
      console.error("🚨 Create Product API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

}
export default new CallAPIProduct();
