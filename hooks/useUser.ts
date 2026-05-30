import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/useAuthStore";
import { UserResponse } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";



export const useCurrentUser = () =>{
    const setUser = useAuthStore((state)=> state.setUser);

    return useMutation({
        mutationFn: () => userService.getCurrentUser(),
        onSuccess: (data:UserResponse) => {
            setUser(data);
        }
    })
}