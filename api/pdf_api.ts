import axios from 'axios';
import { checkNetwork } from "@/utils/utility";
import { getAxiosPython } from '@/utils/axiosInstance';

// Send PDF path to server
export const sendPdfPath = async (data: { pdfPath: string }): Promise<any> => {
    if (!(await checkNetwork())) {
      return { message: "No Network Connection" };
    }
    try {
      console.log("🔥Send PDF Path API:", data)
      const response = await getAxiosPython().post("/pdfpath", data);
      console.log("📝Send PDF Path API:", response.data)
        
      return response.data;
    } catch (error) {
      console.error("🚨Send PDF Path API Error:", error)
        
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("🚨Response Error:", error.response.data);
          throw error.response.data;
        } else if (error.request) {
          console.error("🚨Request Error:", error.request);
          throw new Error("No response received from server");
        } else {
          console.error("🚨Setup Error:", error.message);
          throw new Error("Error in setting up the request");
        }
      } else {
        throw new Error("Network Error");
      }
    }
};