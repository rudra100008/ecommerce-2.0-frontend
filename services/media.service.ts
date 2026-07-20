import api from "@/lib/axios";


export const mediaServices = {
    upload: async (files: File[], folder: string) => {
        try {
            const formData = new FormData();
            formData.append("folder", folder)
            for (const file of files) {
                formData.append("files", file);
            }
            const response = await api.post("/api/media/upload/multiple", formData,)
            console.log("Response of mediaService:", response)
            return response.data;
        } catch (error) {
            console.error("Failed to upload media:", error);
            throw error;
        }
    }
}