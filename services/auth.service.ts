import api from "@/lib/axios";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth.types";
import axios from "axios";


export const authService = {

    login: async (data: LoginRequest): Promise<AuthResponse> => {
        try {
            const response = await api.post("/api/auth/login", data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.data.status === 401) {
                    console.error("Login Failed:: Invalid Credentials");
                } else if (error.response?.data.status === 503) {
                    console.error("Service failed:: Try after some time");
                }
                else {
                    console.error("Login Failed::", error.response?.data || "Something went wrong");
                }
            }
            throw error;
        }
    },

    register: async (data: RegisterRequest): Promise<AuthResponse> => {
        try {
            const response = await api.post("/api/auth/register", data);
            return response.data;
        } catch (error) {
            console.error("Failed to register:", error);
            throw error;
        }
    },


    refresh: async (): Promise<AuthResponse> => {
        try {
            const response = await api.post("/api/auth/refresh");
            return response.data;
        } catch (error) {
            console.error("Failed to refresh:", error);
            throw error;
        }
    },

    logout: async () => {
        try {
            const resposne = await api.post("/api/auth/logout");
            return resposne.data;
        } catch (error) {
            console.error("Failed to logout::", error);
            throw error;
        }
    }
}