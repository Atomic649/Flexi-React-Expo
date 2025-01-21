import axios from 'axios';
import { getAxiosWithAuth } from '@/utils/axiosInstance';

class CallAPIUser{
    // Get User API by id
    async getUserAPI(id: number): Promise<any> {
        try {
            const axiosInstance = await getAxiosWithAuth();
            const response = await axiosInstance.get(`/user/profile/${id}`);
            console.log("🚀UserAPI:", response.data);
            return response.data;
        } catch (error) {
            console.error("🚨 Get User API Error:", error);
            if (axios.isAxiosError(error) && error.response) {
                throw error.response.data;
            } else {
                throw new Error("Network Error");
            }
        }
    }

}

export default new CallAPIUser();