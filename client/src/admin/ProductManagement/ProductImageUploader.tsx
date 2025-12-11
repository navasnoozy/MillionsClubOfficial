import { useFormContext, useWatch } from "react-hook-form";
import type { CreateProductInput, CreateProductVariantInput } from "@millionsclub/shared-libs/client";
import ImageFrame from "../../components/ImageFrame";

const ProductImageUploader = () => {
  const { control } = useFormContext<CreateProductInput | CreateProductVariantInput>();
  const watchedImages = useWatch({ control, name: "images" }) ?? [];
  const images: { secure_url: string; public_id: string }[] = watchedImages;

  const paddedImages = [...images, ...Array(Math.max(0, 4 - images.length)).fill(null)];

  return <ImageFrame images={paddedImages} />;
};

export default ProductImageUploader;

