import api from "@/lib/axios";


export const mediaServices = {
    upload: async (files: File[], folder: string) => {
        try {
            const formData = new FormData();
            formData.append("folder", folder)
            for (const file of files) {
                formData.append("files", file);
            }
            const response = await api.post("/api/media/upload/multiple", formData, {
                headers: { "Content-Type": undefined }
            })
            console.log("Response of mediaService:", response)
            return response.data;
        } catch (error) {
            console.error("Failed to upload media:", error);
            throw error;
        }
    }
    ,
    delete: async (publicIds: string[]) => {
        try {
            const requests = publicIds.map((publicId) => ({
                publicId,
            }));

            console.log("Removed image:", Array.from(publicIds))
            const response = await api.delete("/api/media/delete/multiple", {
                data: requests
            })

            return response.data;
        } catch (error) {
            console.error("Failed to delete images:", error);
            throw error;
        }
    }
}