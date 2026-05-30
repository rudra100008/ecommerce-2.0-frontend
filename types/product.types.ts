import { CategoryDTO } from "./category.types"
import { InventoryDTO } from "./inventory.types";
import { ProductImageDTO} from "./productImage.types"

export interface ProductDTO{
    productId:number;
    name: string;
    description: string;
    price: number;
    discount: number;
    sku: string;
    active:boolean;
    createdAt: string;
    updatedAt: string;
    category: CategoryDTO;
    inventory: InventoryDTO;
    images : ProductImageDTO[];
}

export interface ProductWithImageAndCategory {
    productId:number;
    name: string;
    description: string;
    price: number;
    discount: number;
    sku: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    category:CategoryDTO;
    primaryImage: ProductImageDTO;
}

export interface ProductWithInventoryAndImageAndCategory {
    productId:number;
    name: string;
    description: string;
    price: number;
    discount: number;
    sku: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
    category:CategoryDTO;
    image: ProductImageDTO;
    inventory: InventoryDTO
}


export interface PageInfo<T>{
    content: T[];
    pageNumber: number;
    pageSize: number;
    totalElement: number;
    totalPages: number;
    lastPage: boolean
}
