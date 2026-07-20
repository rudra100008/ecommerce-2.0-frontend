import { LucideIcon } from "lucide-react";

export interface ProductFieldFormProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon?: LucideIcon;
}
export function ProductFieldForm({
  id,
  label,
  type,
  placeholder,
  icon,
}: ProductFieldFormProps) {
  return (
    <div className="flex flex-col ">
      <label htmlFor={id} className="">
        {label}
      </label>
      <input id={id} name={label} type={type} placeholder={placeholder} />
    </div>
  );
}
