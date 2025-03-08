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
}
export default new CallAPIExpense();