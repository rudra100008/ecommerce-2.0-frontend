

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    role: string;
    userId: number;
}

export  interface LoginRequest{
    email: string;
    password: string
}


export interface RegisterRequest{
    fullName: string;
    username: string;
    email: string;
    password: string;
}
