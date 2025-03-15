import axios from "axios";
import { getAxiosWithAuth } from "@/utils/axiosInstance";

class CallAPIExpense {
  // Extract expenses from PDF
  async extractPDFExpenseAPI(memberId: string, filePath: string): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.post(`/pdf/pdfExtract`, {
        memberId,
        filePath,
      });

      console.log("🚀PDFExtractAPI:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨 Extract PDF Expense API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          throw new Error("API endpoint not found (404)");
        }
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  // auto delete if save is false
  async autoDeleteExpenseAPI(): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.delete(`/expense/autoDelete`);

      console.log("🚀AutoDeleteExpenseAPI:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨 Auto Delete Expense API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          throw new Error("API endpoint not found (404)");
        }
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  // set save to true multiple id
  async saveDetectExpenseAPI(ids: number[]): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.put(`/pdf/saveDetect`, {
        ids,
      });

      console.log("🚀SaveDetectExpenseAPI:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨 Save Detect Expense API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          throw new Error("API endpoint not found (404)");
        }
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  // get expense by id
  async getExpenseByIdAPI(id: number): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.get(`/expense/${id}`);

      console.log("🚀GetExpenseByIdAPI:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨 Get Expense By Id API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          throw new Error("API endpoint not found (404)");
        }
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }

  //update expense by id
  async updateExpenseAPI(id: number, data: any): Promise<any> {
    try {
      const axiosInstance = await getAxiosWithAuth();
      const response = await axiosInstance.put(`/expense/${id}`, data);

      console.log("🚀UpdateExpenseAPI:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨 Update Expense API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404) {
          throw new Error("API endpoint not found (404)");
        }
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }
}

export default new CallAPIExpense();