import { z} from "zod/v4";

export const loginSchema = z.object({
    email: z.string().min(1,"Email is required").email("Invalid email"),
    password: z.string().min(8,"Minimum 8 characters")
})

export const registerSchema = z.object({
    username: z.string().min(2,"Username must be at least 2 characters"),
    fullname: z.string().min(5,"Full name must be at least 5 characters"),
    email: z.string().min(1,"Email is required").email("Invalid email"),
    password: z.string().min(8,"Min 8 characters"),
    confirmPassword: z.string(),
}).refine(
    (data)=> data.password === data.confirmPassword,
    {
        message:"Passwords do not match",
        path:["confirmPassword"]
    }
)


export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
