import { z } from "zod"

export const categorySchema = z.object({
    categoryName: z.string().trim().min(1, "Category Name is required.")
})

export const imageSchema = z.object({
    imageUrl: z.string().url("Invalid image URL."),
    publicId: z.string().min(1, "Public ID is required."),
    primaryImage: z.boolean()
})

export const productSchema = z.object({
    name: z.string().trim()
        .min(2, "Product name must have at least 2 characters"),

    description: z.string()
        .min(10, "Description name must be have at least 10 characters")
        .max(500, "Description must have at most 500 characters"),

    price: z.number({error:"Price is required"})
        .min(10, "Minimum price is 10."),

    discount: z.number({error:"Enter 0 if there is no discount"})
        .nonnegative("Discount cannot be less than 0") // allows 0
        .max(5000, "Maximum discount is 5000."),


    sku: z.string()
        .trim()
        .min(1, "SKU  is required."),

    stockQuantity: z.number({error:"Stock quantity is required"})
        .int("Stock must be a whole number.")
        .min(1, "Stock quantity must be at least 1"),

    images: z.array(imageSchema)
        .min(1, "Upload at least one images")
        .refine(
            (images) => images.filter(img => img.primaryImage).length === 1,
            "Exactly one primary images is required"
        )
}).refine((p) => p.discount <= p.price, {
    error:"Discount cannot be more than price.",
    path:["discount"]
} )

export const wizardSchema = z.object({
    category: categorySchema,
    product: productSchema,
})


export type WizardFormData = z.infer<typeof wizardSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type ImageFormData = z.infer<typeof imageSchema>
export type ProductFormData = z.infer<typeof productSchema>