"use client"
import { ProductStep1 } from "./ProductStep1";
import ProductStep2 from "./ProductStep2";
import ProductStep3 from "./ProductStep3";
import { ReactNode, useState } from "react";
import CreateHeader from "./CreateHeader";

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
    component: <ProductStep1 />,
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
    <div>
      <CreateHeader
        steps={steps}
        activeStepId={currentStepId}
        onStepChange={setCurrentStepId}
      />

      <div className="mt-6">{activeStep?.component}</div>
    </div>
  );
}
