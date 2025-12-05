// src/features/products/VariantFormFields.tsx
import { Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import type { CreateProductVariantInput } from "@millionsclub/shared-libs/client";
import TongleButton from "../../components/Switch";

// type Props = {
//   isError: boolean;
//   errors: { message: string; field: string }[];
// };

const VariantFormFields = () => {
  const {
    register,
    control,
    formState: { errors: formErrors },
  } = useFormContext<CreateProductVariantInput>();

  return (
    <Stack spacing={3} width="100%" justifyContent="space-between">


      <TextField {...register("size")} label="Size" variant="standard" error={!!formErrors.size} helperText={formErrors.size?.message} fullWidth />

      <TextField {...register("price", { valueAsNumber: true })} type="number" label="Price" variant="standard" error={!!formErrors.price} helperText={formErrors.price?.message} fullWidth />

      <Controller
        name="isActive"
        control={control}
        defaultValue={true}
        render={({ field }) => <TongleButton label="Active Status" checked={field.value} onChange={(_, checked) => field.onChange(checked)} />}
      />
    </Stack>
  );
};

export default VariantFormFields;
