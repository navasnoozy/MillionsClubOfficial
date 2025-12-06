import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { createProductSchema, type CreateProductInput } from "@millionsclub/shared-libs/client";
import FormLayout from "../components/FormLayout";
import InfoAlerts from "../components/InfoAlerts";
import ProductFormFields from "../components/ProductFormFields";
import ProductImageUploader from "../components/ProductImageUploader";
import useCreateProduct from "../hooks/useCreateProduct";

const AdminAddProductPage = () => {
  const navigate = useNavigate();
  const { mutate: addProduct, isPending } = useCreateProduct();

  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    mode: "onSubmit",
  });

  const handleAddProduct = (data: CreateProductInput) => {
    addProduct(data, {
      onSuccess: (res) => {
        navigate(`/admin/addvariant/${res._id}`);
      },
    });
  };

  const alerts = ["If you add images for variants, upload here is optional.", "Each product must have at least 4 photos.", "All photos must be in a 1:1 aspect ratio (square)."];

  return (
    <FormLayout
      heading="Add Product"
      methods={methods}
      onSubmit={handleAddProduct}
      left={<ProductFormFields  />}
      right={<ProductImageUploader />}
      submitLabel="ADD PRODUCT"
      isLoading={isPending}
      showAlerts
      alerts={<InfoAlerts messages={alerts} />}
    />
  );
};

export default AdminAddProductPage;
