// useAuth.ts
import type { AxiosError } from "axios";
import { LoginFormData } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/useAuthStore";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


export const useLogin = () => {
    const router = useRouter();
    const setUser = useAuthStore(state => state.setUser);

    return useMutation({
        mutationFn: async (data: LoginFormData) => await authService.login(data),
        onSuccess: async () =>{
            await new Promise(resolve => setTimeout(resolve,500))
            const user = await userService.getCurrentUser();
            setUser(user);
            if(user.role === "ROLE_ADMIN"){
                router.push("/admin")
            }else{
                router.push("/")
            }
        },
        onError: (error: AxiosError<{message: string}>) =>{
            console.error(error?.response?.data?.message || "Login Failed");
        }
    })
}


export const useLogout = () =>{
    const router = useRouter();
    const clearUser = useAuthStore(state => state.clearUser);
    const queryClient = new QueryClient();
    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () =>{
            clearUser();
            queryClient.clear();
            router.push("/login")
        }
    })
}