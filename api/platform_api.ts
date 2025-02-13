import axios from "axios";
import { getAxiosWithAuth } from "@/utils/axiosInstance";

class CallAPIPlatform {
  // Get Platforms
  async getPlatformsAPI(): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.get(`/platform/`);

      console.log("🚀PlatformAPI:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨 Get Platforms API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  // Get a Platform
  async getAPlatformAPI(id: number): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.get(`/platform/${id}`);
      return response.data;
    } catch (error) {
      console.error("🚨 Get Platform API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  // Create a Platform
  async createPlatformAPI(data: {
    platform: string;
    accName: string;
    accId: string;
    businessAcc: number;
  }): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.post("/platform/", data);
      return response.data;
    } catch (error) {
      console.error("🚨 Create Platform API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }
  // Update a Platform
  async updatePlatformAPI(
    id: number,
    data: {
      platform: string;
      accName: string;
      accId: string;
      businessAcc: number;
    }
  ): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.put(`/platform/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("🚨 Update Platform API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }
}

export default new CallAPIPlatform();
