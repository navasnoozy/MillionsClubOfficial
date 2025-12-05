import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { createProductVariantSchema, type CreateProductVariantInput } from "@millionsclub/shared-libs/client";
import FormLayout from "../components/FormLayout";
import InfoAlerts from "../components/InfoAlerts";
import ProductImageUploader from "../components/ProductImageUploader";
import VariantFormFields from "../components/VariantFormFields";
import useCreateVariant from "../hooks/useCreateVariant";

const AdminAddVariantPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Product ID is required</div>;

  const { mutate: addVariant, isPending } = useCreateVariant(id);

  const methods = useForm<CreateProductVariantInput>({
    resolver: zodResolver(createProductVariantSchema),
    mode: "onSubmit",
  });

  const handleAddVariant = (data: CreateProductVariantInput) => {
    addVariant(data, {
      onSuccess: () => navigate("/admin/productmanagement"),
    });
  };

  const alerts = ["Each product must have at least 4 photos.", "All photos must be in a 1:1 aspect ratio (square)."];

  return (
    <FormLayout
      heading="Add Variant"
      methods={methods}
      onSubmit={handleAddVariant}
      left={<VariantFormFields  />}
      right={<ProductImageUploader />}
      submitLabel="Add VARIANT"
      isLoading={isPending}
      alerts={<InfoAlerts messages={alerts} />}
    />
  );
};

export default AdminAddVariantPage;
