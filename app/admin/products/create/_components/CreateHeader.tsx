
import { ProductStep, ProductStepId } from "./ProductWizard";

type HeaderItemProps = {
  name: string;
  isSelected: boolean;
  onClick: () => void;
};

type CreatHeaderProps = {
  steps: ProductStep[];
  activeStepId: ProductStepId;
  onStepChange: (stepId: ProductStepId) => void;
};

function HeaderItems({ name, isSelected, onClick }: HeaderItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4  ${isSelected ? "text-accent" : "text-gray-600"} `}
    >
      {name}
    </button>
  );
}
export default function CreateHeader({
  steps,
  activeStepId,
  onStepChange,
}: CreatHeaderProps) {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step) => (
        <HeaderItems
          key={step.id}
          name={step.name}
          isSelected={activeStepId === step.id}
          onClick={() => onStepChange(step.id)}
        />
      ))}
    </div>
  );
}
