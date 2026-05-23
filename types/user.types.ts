import { Role } from "@/constants/roles";

export interface AddressResponse {
  addressId: number;
  district: string;
  province: string;
  municipality: string;
  wardNumber: number;
  landmark: string | null;
}

export interface UserResponse{
    userId:number;
    username: string;
    email: string;
    phoneNumber: string;
    fullName: string;
    imageUrl: string;
    imageCustomized: boolean;
    active : boolean;
    role: Role
    addresses: AddressResponse[];
    createdAt: string;
    updatedAt: string;
}