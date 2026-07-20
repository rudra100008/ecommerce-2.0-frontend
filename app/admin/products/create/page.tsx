import { CreateProductForm } from "./_components/CreateProductForm";
import { ProductStep1 } from "./_components/ProductStep1";

export const metadata = {
  title: "Create Product",
};
export default function CreateProductsPage() {
  return (
    <>
      <ProductStep1 />
    </>
  );
}
