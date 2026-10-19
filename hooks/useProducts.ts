import { productService } from "@/services/product.service";
import { CategoryRequest } from "@/types/category.types";
import { ProductRequest } from "@/types/product.types";
import { useMutation, useQuery , useQueryClient} from "@tanstack/react-query";
import { toast } from "sonner";

//fetch all product with pagination
export const useProducts  = (pageNumber = 0, pageSize = 20) =>{
    return useQuery({
        queryKey:["products",[pageNumber,pageSize]],
        queryFn: () => productService.getAll({pageNumber,pageSize}),
        staleTime: 5 * 60 * 1000
    })
}

// fetch product with inventory data and a primary image 
export const useProductWithInventoryWithImage = (pageNumber = 0, pageSize = 20) =>{
    return useQuery({
        queryKey:["productsWithInventoryAndImage",[pageNumber,pageSize]],
        queryFn: () => productService.getAllWithInventoryAndImageAndCategory({pageNumber,pageSize}),
        staleTime: 5 * 60 * 1000 // 5mintues
    })
}


export const useCreateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:({productRequest, categoryRequest}: {
            productRequest:ProductRequest;
            categoryRequest: CategoryRequest
        }) => productService.createProduct(productRequest, categoryRequest),
        onSuccess: () => {
            toast.success("Product created successfully")
            queryClient.invalidateQueries({queryKey: ["productsWithInventoryAndImage"]});
            queryClient.invalidateQueries({queryKey: ["products"]});
        },
        onError: () =>{
            toast.error("Failed to create product ")
        }
    })
}