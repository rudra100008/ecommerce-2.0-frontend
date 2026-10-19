import { ProductImageRequest } from "@/types/product.types";
import { create } from "zustand";

interface MediaState{
    images: ProductImageRequest[];
    setImages: (images: ProductImageRequest[]) => void;
    addImages: (image:ProductImageRequest) => void;
    removeImage: (imageUrl: string) => void;
    clearImages: () => void;
}


export const useMediaStore = create<MediaState>()((set) => ({
    images: [],

    setImages: (images) => set({images}),

    addImages: (image) => set((state) => ({
        images: [...state.images, image]
    })),

    removeImage: (imageUrl) => set((state) =>({
        images: state.images.filter(image => image.imageUrl !== imageUrl)
    })),
    clearImages: () => set({images:[]})
}))