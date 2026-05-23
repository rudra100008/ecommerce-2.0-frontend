import { keyof } from "zod/v4";

export const ROLES = {
    ADMIN: "ROLE_ADMIN",
    SUB_ADMIN: "ROLE_SUB_ADMIN",
    CUSTOMER: "ROLE_CUSTOMER"
} as const;


export type Role =typeof ROLES[keyof typeof ROLES];