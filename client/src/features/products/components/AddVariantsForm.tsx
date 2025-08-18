import type { AddProductVariant } from "@millionsclub/shared-libs/client";
import {
  Stack,
  TextField
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessages from "../../../components/errorMessge";
import TongleButton from "./Switch";

type Props = {
  isLoading: boolean;
  isError: boolean;
  errors: { message: string; field: string }[];
};

const AddVariantForm = ({ isLoading, isError, errors }: Props) => {
  // ✅ Get access from FormProvider
  const {
    register,
    control,
    formState: { errors: formErrors },
  } = useFormContext<AddProductVariant>();

  return (
    <Stack spacing={3} width={"100%"} height={"100%"} justifyContent={'space-between'}>
      <TextField
        {...register("color")}
        label="Color"
        variant="standard"
        error={!!formErrors.color}
        helperText={formErrors.color?.message}
        fullWidth
      />

      <TextField
        {...register("size")}
        label="Size"
        variant="standard"
        error={!!formErrors.size}
        helperText={formErrors.size?.message}
        fullWidth
      />

      <TextField
        {...register("price")}
        type="number"
        label="Price"
        variant="standard"
        error={!!formErrors.price}
        helperText={formErrors.price?.message}
        fullWidth
      />

      <Controller
        name="isActive"
        control={control}
        defaultValue={true}
        render={({ field }) => (
          <TongleButton
            label="Active Status"
            checked={field.value}
            onChange={(_, checked) => field.onChange(checked)}
          />
        )}
      />

      {isError && <ErrorMessages errors={errors} />}
    </Stack>
  );
};

export default AddVariantForm;
