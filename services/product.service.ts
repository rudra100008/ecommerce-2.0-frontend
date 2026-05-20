import api from "@/lib/axios";
import { CategoryDTO } from "@/types/category.types";
import { PageInfo, ProductDTO, ProductWithImageAndCategory } from "@/types/product.types";

export const productService = {
  getAll: async (params: {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortDir?: string;
  }): Promise<PageInfo<ProductWithImageAndCategory>> => {
    try {
      const response = await api.get("/api/products/fetchAll", { params });
      return response.data;
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  },

  getById: async (id:number):Promise<ProductDTO> =>{
    try{
        const response  = await api.get(`/api/products/${id}/details`);
        return response.data;
    }catch(error){
        console.error("API call failed: ",error);
        throw error;
    }
  },

  getCateogries: async(): Promise<CategoryDTO[]> =>{
    try{
        const response  = await api.get("/api/products/categories");
        return response.data;
    }catch(error){
        console.error("API call failed: ",error);
        throw error;
    }
  }
};
