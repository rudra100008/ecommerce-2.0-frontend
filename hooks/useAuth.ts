// useAuth.ts
import { LoginFormData } from "@/lib/validations/auth";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: LoginFormData) => await authService.login(data),
    onSuccess: async () => {
      try {
        const user = await userService.getCurrentUser();
        setUser(user);
        router.push(user.role === "ROLE_ADMIN" ? "/admin" : "/home");
      } catch {
        router.push("/login?error=profile_fetch_failed");
      }
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      router.push("/login");
    },
  });
};
