// src/features/products/ProductFormFields.tsx
import { Stack, TextField } from "@mui/material";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import type { CreateProductInput } from "@millionsclub/shared-libs/client";
import { useEffect } from "react";
import RHFDropdown from "../../components/RHFDropdown";
import TongleButton from "../../components/Switch";
import useCategories from "../../features/categories/hooks/useCategories";

// type Props = {
//   isError: boolean;
//   errors: { message: string; field: string }[];
// };

const ProductFormField = () => {
  const {
    register,
    control,
    setValue,
    formState: { errors: formErrors },
  } = useFormContext<CreateProductInput>();

  const { data: categories = [] } = useCategories();

  const selectedCategoryId = useWatch({ control, name: "categoryId" });

  useEffect(() => {
    setValue("subCategoryId", "");
  }, [selectedCategoryId, setValue]);

  const subcategories = categories.find((cat) => cat._id === selectedCategoryId)?.subcategories ?? [];

  return (
    <Stack spacing={3} width="100%">
      <TextField {...register("title")} label="Title" variant="standard" error={!!formErrors.title} helperText={formErrors.title?.message} fullWidth />

      <TextField {...register("brand")} label="Brand" variant="standard" error={!!formErrors.brand} helperText={formErrors.brand?.message} fullWidth />

      <Stack justifyContent="center" alignItems="center" gap={3} flexDirection={{ xs: "column", sm: "row" }}>
        <RHFDropdown name="categoryId" options={categories} label="Category" />
        <RHFDropdown name="subCategoryId" options={subcategories} label="Subcategory" disabled={!selectedCategoryId} />
      </Stack>

      <TextField
        {...register("basePrice", { valueAsNumber: true })}
        type="number"
        label="Base Price"
        variant="standard"
        error={!!formErrors.basePrice}
        helperText={formErrors.basePrice?.message}
        fullWidth
      />

      <TextField
        {...register("description")}
        label="Description"
        variant="outlined"
        multiline
        minRows={4}
        maxRows={10}
        error={!!formErrors.description}
        helperText={formErrors.description?.message}
        fullWidth
      />

      <Controller
        name="isActive"
        control={control}
        defaultValue={true}
        render={({ field }) => <TongleButton label="Active Status" checked={true} onChange={(_, checked) => field.onChange(checked)} />}
      />
    </Stack>
  );
};

export default ProductFormField;
