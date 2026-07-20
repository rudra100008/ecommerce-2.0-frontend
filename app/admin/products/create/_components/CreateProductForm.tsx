import { LucideIcon } from "lucide-react";
import { ProductFieldForm } from "./ProductFieldForm";

export function CreateProductForm() {
  return (
    <div>
      <div>
        <h1 className="text-centers">Product Form</h1>
      </div>

      <form className="flex flex-col justify-center items-center gap-1">
        {/* {
          ProductInputForm(
            "productName",
            "Product Name",
            "text",
            "Enter your product name",
          ),
          ProductInputForm(
            "description",
            "Description",
            "text",
            "Enter your description",
          ),
          ProductInputForm("price", "Price", "number", "Enter your price"))
        } */}

        <ProductFieldForm
          id="name"
          label="Product Name"
          type="text"
          placeholder="Enter your product name"
        />

        <ProductFieldForm
          id="description"
          label="Description"
          type="text"
          placeholder="Enter your product description"
        />
        <ProductFieldForm
          id="price"
          label="Product Price"
          type="number"
          placeholder="Enter your product price"
        />
      </form>
    </div>
  );
}
