import api from "@/lib/axios";
import { CategoryDTO, CategoryRequest } from "@/types/category.types";
import { PageInfo, ProductDTO, ProductRequest, ProductWithImageAndCategory, ProductWithInventoryAndImageAndCategory } from "@/types/product.types";

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


  getAllWithInventoryAndImageAndCategory: async (params: {
    pageNumber?: number;
    pageSize?: number;
    sortBy?: string;
    sortDir?: string;
  }): Promise<PageInfo<ProductWithInventoryAndImageAndCategory>> => {
    try {
      const response = await api.get("/api/products/fetchAllWithInventoryAndImageAndCategory", { params });
      return response.data;
    } catch (error) {
      console.error("Product API call failed:", error);
      throw error;
    }
  },

  getById: async (id: number): Promise<ProductDTO> => {
    try {
      const response = await api.get(`/api/products/${id}/details`);
      return response.data;
    } catch (error) {
      console.error("API call failed: ", error);
      throw error;
    }
  },

  getCateogries: async (): Promise<CategoryDTO[]> => {
    try {
      const response = await api.get("/api/products/categories");
      return response.data;
    } catch (error) {
      console.error("API call failed: ", error);
      throw error;
    }
  },
  createProduct: async (product: ProductRequest, category: CategoryRequest): Promise<ProductDTO> => {
    try {
      const formData = new FormData();
      formData.append(
        "product",
        new Blob([JSON.stringify(product)],{
          type:"application/json"
        })
      )

      formData.append(
        "category",
        new Blob([JSON.stringify(category)],{
          type:"application/json"
        })
      )

      const response = await api.post<ProductDTO>(
      "/api/products",
      formData,
      {
        headers: {
          "Content-Type": undefined,
        },
      }
    );
      return response.data;
    } catch (error) {
      console.error("Failed to create a product: ", error)
      throw error;
    }
  }
};
