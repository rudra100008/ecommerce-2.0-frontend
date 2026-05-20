import api from "@/lib/axios";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth.types";
import { refresh } from "next/cache";



export const authService = {

    login: async (data: LoginRequest): Promise<AuthResponse> =>{
        try{
            const response = await api.post("/api/auth/login",data);
            return response.data;
        }catch(error){
            console.error("Failed to login:",error);
            throw error;
        }
    },
    
    register: async (data: RegisterRequest): Promise<AuthResponse> =>{
        try{
            const response = await api.post("/api/auth/register",data);
            return response.data;
        }catch(error){
            console.error("Failed to register:",error);
            throw error;
        }
    },


    refresh: async (): Promise<AuthResponse> =>{
          try{
            const response = await api.post("/api/auth/refresh");
            return response.data;
        }catch(error){
            console.error("Failed to refresh:",error);
            throw error;
        }
    }
}