"use client";
import { ProductStep1 } from "./ProductStep1";
import ProductStep2 from "./ProductStep2";
import ProductStep3 from "./ProductStep3";
import { ReactNode, useState } from "react";
import CreateHeader from "./CreateHeader";
import { ProductStepExample1 } from "./ProductStepExample1";
import { FieldPath, FormProvider, useForm } from "react-hook-form";
import { WizardFormData, wizardSchema } from "@/lib/validations/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { useIsMutating } from "@tanstack/react-query";
import { error } from "console";


export type ProductStepId = 1 | 2 | 3;

export type ProductStep = {
  id: ProductStepId;
  name: string;
  component: ReactNode;
};
const steps: ProductStep[] = [
  {
    id: 1,
    name: "Images",
    component: <ProductStepExample1 />,
  },
  {
    id: 2,
    name: "Information",
    component: <ProductStep2 />,
  },
  {
    id: 3,
    name: "Review",
    component: <ProductStep3 />,
  },
];


const informationFields: FieldPath<WizardFormData>[] = [
  "category",
  "category.categoryName",
  "product",
  "product.name",
  "product.description",
  "product.price",
  "product.discount",
  "product.sku",
  "product.stockQuantity"
]
export default function ProductWizard() {
  const router = useRouter();
  const [currentProductStepId, setCurrentProductStepId] = useState<ProductStepId>(1);


  const { mutateAsync: createProduct, isPending } = useCreateProduct();
  const methods = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    mode: 'onTouched',
    shouldUnregister: false,
    defaultValues: {
      category: {
        categoryName: ""
      },
      product: {
        name: "",
        description: "",
        sku: "",
        discount:0,
        images: [],
      }
    }
  })

  const activeImageMutations = useIsMutating({
    mutationKey: ["product-images", "upload"],
  })

  const imageBusy = activeImageMutations > 0;


  const validateCurrentStep = async () => {
    if (currentProductStepId === 1) {
      return methods.trigger("product.images");
    }
    if (currentProductStepId === 2) {
      return methods.trigger(informationFields);
    }
    return true;
  }

  const nextStep = async () => {
    if (isPending || imageBusy) return;


    const valid = await validateCurrentStep();
    if(process.env.NODE_ENV === 'development'){
      console.debug("[ProductWizard] Step Validation:",{
        step:currentProductStepId,
        valid,
        errors:methods.formState.errors
      });
    }


    if (!valid) return;

    if (currentProductStepId < 3) {
      setCurrentProductStepId((currentProductStepId + 1) as ProductStepId);
    }

  }

  const previousStep = () => {
    if (isPending || imageBusy) return;

    if (currentProductStepId > 1) {
      setCurrentProductStepId((currentProductStepId - 1) as ProductStepId);
    }
  }


  const goToStep = async(target: ProductStepId) => {
    if(isPending || imageBusy) return;

    if(target <= currentProductStepId){
      setCurrentProductStepId(target);
      return;
    }
    
    if(target === currentProductStepId + 1){
      await nextStep();
    }
  }

  const onSubmit = async (data: WizardFormData) => {
    console.debug("[ProductWizard] onSubmit fired on step", currentProductStepId);
    if (currentProductStepId !== 3) return;
    if (isPending || imageBusy) return;
    try {
      await createProduct({
        productRequest: data.product,
        categoryRequest: data.category,
      })

      router.push("/admin/products");
    } catch {
      // useCreateProduct's onError already shows the error toast; just stay on this page.
    }
  }

  const activeStep = steps.find((step) => step.id === currentProductStepId);


  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-5xl space-y-6"
      >


        <h1 className="text-2xl font-semibold">
          Product Registration
        </h1>


        <CreateHeader
          steps={steps}
          activeStepId={currentProductStepId}
          onStepChange={goToStep}
        />

        <div className="rounded-xl border p-6">{activeStep?.component}</div>


        <div className="flex justify-between border-t pt-4">
          {
            currentProductStepId > 1 ? (
              <button
              type="button"
              onClick={previousStep}
              disabled={isPending || imageBusy}
              >
                Back
              </button>
            ):(
              <span/>
            )
          }

          {
            currentProductStepId < 3 ? (
              <button
              key={"next"}
              type="button"
              onClick={nextStep}
              disabled={isPending || imageBusy}
              >
                Next
              </button>
            ): (
              <button
              key={"submit"}
              type="submit"
              disabled={isPending || imageBusy}
              >
                {isPending ?  "Creating.....": "Create Product"}
              </button>
            )
          }
        </div>
      </form>
    </FormProvider>

  );
}
