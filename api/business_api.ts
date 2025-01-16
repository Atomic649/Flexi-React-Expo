import { getAxios } from "@/utils/axiosInstance";
import { checkNetwork } from "@/utils/utility";
import axios from "axios";

class CallAPIBusiness {
  // Register Member API
  async RegisterAPI(data: {
    businessName: string;
    vatId: string;
    businessType: string;
    taxType: string;
    userId: number;
    memberId: any;

  }): Promise<any> {
    if (!(await checkNetwork())) {
      return { message: "No Network Connection" };
    }
    try {
      const response = await getAxios().post("/businessacc/register", data);

      console.log("📝Business Register API:", response.data);

      return response.data;
    } catch (error) {
      console.error("🚨Register API Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw new Error("Network Error");
      }
    }
  }}
export default new CallAPIBusiness();
