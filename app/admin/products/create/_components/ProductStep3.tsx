import { CategoryFormData, ImageFormData, ProductFormData, WizardFormData } from "@/lib/validations/product"
import Image from "next/image";
import { useFormState } from "react-dom"
import { AnimatePresence, motion } from "framer-motion";
import { useFormContext, useWatch } from "react-hook-form";
import { ImageOff } from "lucide-react";

export default function ProductStep3() {

    const { control } = useFormContext<WizardFormData>();
    const images = useWatch({ control, name: "product.images" });
    const product = useWatch({ control, name: "product" });
    const category = useWatch({ control, name: "category" });


    return (
        <div className="flex flex-col justify-center ">
            <label>
                <h1>Product Review</h1>
            </label>

            <div>
                <ImagePreview
                images={images}
                />
            </div>

            <div className="">
                <ProductDisplay category={category} product={product} />
            </div>
        </div>
    )
}


interface ImagePreviewProps {
    images: ImageFormData[],
}

function ImagePreview({ images }: ImagePreviewProps) {
    if (images.length === 0) {
        return (
            <div className="flex w-full max-w-[400px] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 p-10 text-gray-400">
                <ImageOff size={40} strokeWidth={1.3} />
                <p className="text-sm">No images uploaded yet</p>
            </div>
        )
    }

    const primaryImage = images.find((image) => image.primaryImage);
     const otherImages = images.filter((image) => !image.primaryImage);
   return (
    <div className="grid w-full max-w-[400px] grid-cols-2 gap-3">
      {primaryImage && (
        <ImageCard
        
          image={primaryImage}

        />
      )}

      {otherImages.map((image) => (
        <ImageCard
          key={image.publicId}
          image={image}
        />
      ))}
    </div>
  );
}


interface ImageCardProps {
    image: ImageFormData
}

function ImageCard({ image }: ImageCardProps) {
    if (!image.imageUrl) {
        return (
            <div>
                Image url not found
            </div>
        )
    }

    return (
        <motion.div
            layout
            whileHover={{ scale: 1.02 }}
            className={`group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg
        ${image.primaryImage ? "col-span-2" : ""}`}
        >
            <Image
                src={image.imageUrl}
                alt={image.primaryImage ? "Primary Product Image" : "Product Image"}
                fill
                sizes={image.primaryImage ? "400px" : "200px"}
                className="object-cover"
            />
        </motion.div>
    )
}


interface ProductProps{
    category: CategoryFormData;
    product:ProductFormData;
}

function ProductDisplay({category, product}: ProductProps){
    return (
        <div className="">
            <ProductCard label={"category"} value={category.categoryName} />
            <div className="">
                <ProductCard label="Product Name"  value={product.name}/>
                <ProductCard label="Description" value={product.description}/>
                <ProductCard label="Discount" value={product.discount}/>
                <ProductCard label="Price" value={product.price}/>
                <ProductCard label="SKU" value={product.sku}/>
                <ProductCard label="Stock Quantity" value={product.stockQuantity}/>
            </div>
        </div>
    )
}

interface ProductCardProps {

    label: string;
    value: string | number | boolean;
}
function ProductCard({label, value}: ProductCardProps){
    return (
        <div className="flex flex-col justify-center gap-2 ">
            <label htmlFor={label}>{label}</label>
            <p>{value}</p>
        </div>
    )
}