import { mediaServices } from "@/services/media.service"
import { MediaUploadResponse } from "@/types/media.types";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export const useMediaUpload = () => {
    const [mediaResponse, setMediaResponse] = useState<MediaUploadResponse[]>([]);
    return useMutation({
        mutationFn: async ({ files, folder }: { files: File[], folder: string }) => await mediaServices.upload(files, folder),
        onSuccess: async (data) => {
            setMediaResponse(data ?? []);
        }
    })
}