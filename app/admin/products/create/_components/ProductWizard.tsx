"use client";
import { ProductStep1 } from "./ProductStep1";
import ProductStep2 from "./ProductStep2";
import ProductStep3 from "./ProductStep3";
import { ReactNode, useState } from "react";
import CreateHeader from "./CreateHeader";
import { ProductStepExample1 } from "./ProductStepExample1";

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
    component: <ProductStepExample1/>,
  },
  {
    id: 2,
    name: "Information",
    component: <ProductStep2 />,
  },
  {
    id: 3,
    name: "Details",
    component: <ProductStep3 />,
  },
];
export default function ProductWizard() {
  const [currentStepId, setCurrentStepId] = useState<ProductStepId>(1);

  const activeStep = steps.find((step) => step.id === currentStepId);
  return (
    <div className="flex flex-col justify-center max-w-5xl  border ">
      <div className="py-2 px-4 mb-5 text-2xl font-normal ">
        <h1 >Product Registration</h1>
      </div>
      <CreateHeader
        steps={steps}
        activeStepId={currentStepId}
        onStepChange={setCurrentStepId}
      />

      <div className="mt-6">{activeStep?.component}</div>
    </div>
  );
}
