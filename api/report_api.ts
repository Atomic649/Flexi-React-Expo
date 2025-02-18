import axios from "axios";
import { getAxiosWithAuth } from "@/utils/axiosInstance";

class CallAPIReport {
    // Get Reports
    async getDailyReportsAPI(memberId: string): Promise<any> {
        try {
            const axiosInstance = await getAxiosWithAuth();
            const response = await axiosInstance.get(`/report/daily/${memberId}`);

            console.log("🚀ReportAPI:", response.data);

            return response.data;
        } catch (error) {
            console.error("🚨 Get Reports API Error:", error);
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw new Error("Network Error");
            }
        }
    }
}
export default new CallAPIReport();