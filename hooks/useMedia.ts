import { mediaServices } from "@/services/media.service"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useMediaUpload = () => {
    return useMutation({
        mutationKey: ["product-images", "upload"],
        mutationFn: async ({ files, folder }: { files: File[], folder: string }) =>  mediaServices.upload(files, folder),
       
    })
}


export const useMultiMediaDelete = () => {
    return useMutation({
        mutationKey: ["product-images", "delete"],
        mutationFn: (publicIds: string[]) => mediaServices.delete(publicIds),
        onSuccess: () => {
            toast.info("Image Removed.")
        }

    })
}