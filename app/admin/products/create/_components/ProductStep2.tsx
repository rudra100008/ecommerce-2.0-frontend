import { FormField } from "@/components/ui/FormField";
import { WizardFormData } from "@/lib/validations/product";
import { useFormContext} from "react-hook-form";


export default function ProductStep2() {
    const {
        register,
        formState: { errors}
    } = useFormContext<WizardFormData>();
    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-xl font-semibold">Product Information</h2>
                <p className="text-sm text-gray-500">Fill in category and product details</p>
            </header>


            
                    <FormField id="categoryName" label="categoryName" error={errors.category?.categoryName?.message}>
                        <input
                        id="categoryName"
                        type="text"
                        placeholder="Enter category name"
                        className="input"
                        {...register("category.categoryName")}
                        />
                    </FormField>
            

                
                    <FormField id="name" label="name" error={errors.product?.name?.message}>
                        <input
                        id="name"
                        type="text"
                        placeholder="Enter product name..."
                        className="input"
                        {...register("product.name")}
                        />
                    </FormField>
                    <FormField id="description" label="description" error={errors.product?.description?.message}>
                        <textarea
                        id="description"
                        rows={5}
                        maxLength={1000}
                        placeholder="Enter product description..."
                        className="input"
                        {...register("product.description")}
                        ></textarea>
                    </FormField>

                    <FormField id="price" label="price" error={errors.product?.price?.message}>
                        <input
                        id="price"
                        type="number"
                        step={0.01}
                        
                        placeholder="0.00"
                        className="input"
                        {...register("product.price",{valueAsNumber:true})}
                        />
                    </FormField>

                    <FormField id="discount" label="discount" error={errors.product?.discount?.message}>
                        <input
                        id="discount"
                        type="number"
                        
                        placeholder="0.00"
                        className="input"
                        {...register("product.discount",{valueAsNumber:true})}
                        />
                    </FormField>
                    
                    <FormField id="sku" label="sku" error={errors.product?.sku?.message}>
                        <input
                        id="sku"
                        type="text"
                        placeholder="Enter product sku..."
                        className="input"
                        {...register("product.sku")}
                        />
                    </FormField>
                    <FormField id="stockQuantity" label="stockQuantity" error={errors.product?.stockQuantity?.message}>
                        <input
                        id="stockQuantity"
                        type="number"
                        placeholder="0"
                        className="input"
                        {...register("product.stockQuantity",{valueAsNumber:true})}
                        />
                    </FormField>
                

        
        </section>
    )
}