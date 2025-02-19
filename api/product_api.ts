import axios from "axios";
import { getAxiosWithAuth } from "@/utils/axiosInstance";

class CallAPIProduct {
  // Get Products
  async getProductsAPI(memberId: string): Promise<any> {
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

  // Get a Product
  async getAProductAPI(id: number): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.get(`/product/${id}`);
      return response.data;
    } catch (error) {
      console.error("🚨 Get Product API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  // Create Product
  async createProductAPI(data: {
    name: string;
    description: string;
    barcode: string;
    stock: number;
    price: number;
    memberId: string;
    image?: string;
  }): Promise<any> {
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

  // Update Product
  async updateProductAPI(
    id: number,
    data: {
      name: string;
      description: string;
      barcode: string;
      stock: number;
      price: number;
      image?: string;
    }
  ): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.put(`/product/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("🚨 Update Product API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  // Delete Product
  async deleteProductAPI(id: number): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.post(`/product/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("🚨 Delete Product API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }
  // Get Product Choice
  async getProductChoiceAPI(memberId: string): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.get(`/product/choice/${memberId}`);
      return response.data;
    } catch (error) {
      console.error("🚨 Get Product Choice API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }
  
}
export default new CallAPIProduct();
