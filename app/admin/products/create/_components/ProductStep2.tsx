import { FormField } from "@/components/ui/FormField";
import { useCreateProduct } from "@/hooks/useProducts"
import { CategoryFormData, categorySchema , ProductFormData,productSchema} from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";


export default function ProductStep2() {
    const router = useRouter();
    const { mutate: createProduct, isPending } = useCreateProduct();
    const { register: registerCategory, handleSubmit: handleCategorySubmit, formState: { errors: categoryErrors} } =
        useForm<CategoryFormData>({
            resolver: zodResolver(categorySchema),
            mode: 'onTouched'
        });
    const {register: registerProduct, handleSubmit: handleProductSubmit, formState: {errors: productErrors}} =
    useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        mode: 'onTouched'
    })

    
    

    const onCategorySubmit = (data: CategoryFormData) => {

    }
    const onProductSubmit = (data: ProductFormData) =>{

    }
    // const handleSubmit = () => {
    //     createProduct(
    //         {productRequest, categoryRequest},
    //         {onSuccess: () => router.push("/admin/products")}
    //     )
    // }

    return (
        <div className="flex justify-center items-center">
            <label>
                <h1>Enter Product Details</h1>
            </label>


            <div>
                <form onSubmit={handleCategorySubmit(onCategorySubmit)}>
                    <FormField id="categoryName" label="categoryName" error={categoryErrors.categoryName?.message}>
                        <input
                        id="categoryName"
                        type="text"
                        placeholder="Enter category name"
                        className="input"
                        {...registerCategory("categoryName")}
                        />
                    </FormField>
                </form>

                <form onSubmit={handleProductSubmit(onProductSubmit)}>
                    <FormField id="name" label="name" error={productErrors.name?.message}>
                        <input
                        id="name"
                        type="text"
                        placeholder="Enter product name..."
                        className="input"
                        {...registerProduct("name")}
                        />
                    </FormField>
                    <FormField id="description" label="description" error={productErrors.description?.message}>
                        <textarea
                        id="description"
                        rows={5}
                        maxLength={1000}
                        placeholder="Enter product description..."
                        className="input"
                        {...registerProduct("description")}
                        ></textarea>
                    </FormField>
                    <FormField id="discount" label="discount" error={productErrors.discount?.message}>
                        <input
                        id="discount"
                        type="number"
                        placeholder="Enter product discount..."
                        className="input"
                        {...registerProduct("discount")}
                        />
                    </FormField>
                    <FormField id="price" label="price" error={productErrors.price?.message}>
                        <input
                        id="price"
                        type="number"
                        placeholder="Enter product price..."
                        className="input"
                        {...registerProduct("price")}
                        />
                    </FormField>
                    <FormField id="sku" label="sku" error={productErrors.sku?.message}>
                        <input
                        id="sku"
                        type="text"
                        placeholder="Enter product sku..."
                        className="input"
                        {...registerProduct("sku")}
                        />
                    </FormField>
                    <FormField id="stockQuantity" label="stockQuantity" error={productErrors.stockQuantity?.message}>
                        <input
                        id="stockQuantity"
                        type="number"
                        placeholder="Enter product stockQuantity..."
                        className="input"
                        {...registerProduct("stockQuantity")}
                        />
                    </FormField>
                </form>

            </div>
        </div>
    )
}