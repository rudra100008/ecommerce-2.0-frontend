
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
    role: "ROLE_ADMIN" | "ROLE_SUB_ADMIN" | "ROLE_CUSTOMER"
    addresses: AddressResponse[];
    createdAt: string;
    updatedAt: string;
}