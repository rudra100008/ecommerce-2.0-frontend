import { productService } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

//fetch all product with pagination
export const useProducts  = (pageNumber = 0, pageSize = 20) =>{
    return useQuery({
        queryKey:["products",{pageNumber,pageSize}],
        queryFn: () => productService.getAll({pageNumber,pageSize}),
        staleTime: 5 * 60 * 1000
    })
}


export const useProductWithInventoryWithImage = (pageNumber = 0, pageSize = 20) =>{
    return useQuery({
        queryKey:["productsWithInventoryAndImage",[pageNumber,pageSize]],
        queryFn: () => productService.getAllWithInventoryAndImageAndCategory({pageNumber,pageSize}),
        staleTime: 5 * 60 * 1000
    })
}