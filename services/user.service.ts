import api from "@/lib/axios";
import { UserResponse } from "@/types/user.types";



export const userService = {

    getCurrentUser: async (): Promise<UserResponse> =>{
        try{
            const response = await api.get("/api/users/me");
            return response.data;
        }catch(error){
            console.log("Failed to get current user::",error);
            throw error;
        }
    }
}