import { z } from "zod"

export const categorySchema = z.object({
    categoryName: z.string()
})

export const imageSchema = z.object({
    imageUrl: z.string(),
    publicId: z.string(),
    primaryImage: z.string()
})

export const productSchema = z.object({
    name: z.string().min(2, "Product name must be at least 2 characters"),
    description: z.string()
    .min(10, "Description name must be have at least 10 characters")
    .max(500, "Description must have at most 500 characters"),
    price: z.number()
    .positive("Price cannot be less than 0"),
    discount: z.number().positive("Discount cannot be less than 0"),
    sku: z.string(),
    stockQuantity: z.number().positive("Stock Quantity cannot be less than 0")

})

export type CategoryFormData = z.infer<typeof categorySchema>;
export type ImageFormData = z.infer<typeof imageSchema>
export type ProductFormData = z.infer<typeof productSchema>