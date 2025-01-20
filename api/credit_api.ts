import axios from 'axios';
import { getAxiosWithAuth } from '@/utils/axiosInstance';

class CallAPICredit{
    // Get Credit API by id
    async getCreditAPI(id: number): Promise<any> {
        try {
            const axiosInstance = await getAxiosWithAuth();
            const response = await axiosInstance.get(`/credit/${id}`);
            console.log("🚀CreditAPI:", response.data);
            return response.data;
        } catch (error) {
            console.error("🚨 Get Credit API Error:", error);
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw new Error("Network Error");
            }
        }
    }

}

export default new CallAPICredit();