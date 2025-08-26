// src/features/products/VariantFormFields.tsx
import { Stack, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import type { AddProductVariant } from '@millionsclub/shared-libs/client';
import TongleButton from '../../components/Switch';
import ErrorMessages from '../../../../components/errorMessge';

type Props = {
  isError: boolean;
  errors: { message: string; field: string }[];
};

const VariantFormFields =({ isError, errors }: Props)=> {
  const {
    register,
    control,
    formState: { errors: formErrors },
  } = useFormContext<AddProductVariant>();

  return (
    <Stack spacing={3} width="100%" justifyContent="space-between">
      <TextField
        {...register('color')}
        label="Color"
        variant="standard"
        error={!!formErrors.color}
        helperText={formErrors.color?.message}
        fullWidth
      />

      <TextField
        {...register('size')}
        label="Size"
        variant="standard"
        error={!!formErrors.size}
        helperText={formErrors.size?.message}
        fullWidth
      />

      <TextField
        {...register('price')}
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
        render={({ field }) => <TongleButton label="Active Status" checked={field.value} onChange={(_, checked) => field.onChange(checked)} />}
      />

      {isError && <ErrorMessages errors={errors} />}
    </Stack>
  );
}

export default VariantFormFields