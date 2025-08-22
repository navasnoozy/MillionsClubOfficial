import { Stack, TextField } from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import ErrorMessages from '../../../components/errorMessge';
import RHFDropdown from '../../../components/RHFDropdown';
import useCategories from '../../categories/hooks/useCategories';
import TongleButton from './Switch';
import type { AddProductSchema } from '@millionsclub/shared-libs/client';
import { useEffect } from 'react';

type Props = {
  isError: boolean;
  errors: { message: string; field: string }[];
};

const AddProductForm = ({ isError, errors }: Props) => {
  const {
    register,
    control,
    setValue,
    formState: { errors: formErrors },
  } = useFormContext<AddProductSchema>();

  const { data: categories = [] } = useCategories();

  // Watch selected categoryId
  const selectedCategoryId = useWatch({ control, name: 'categoryId' });

  // Reset subcategory when category changes
  useEffect(() => {
    setValue('subCategoryId', '');
  }, [selectedCategoryId, setValue]);

  // Find the selected category's subcategories
  const subcategories = categories.find((cat) => cat._id === selectedCategoryId)?.subcategories || [];

  return (
    <Stack spacing={3} width="100%" height="100%">
      <TextField
        {...register('title')}
        label="Title"
        variant="standard"
        error={!!formErrors.title}
        helperText={formErrors.title?.message}
        fullWidth
      />

      <TextField
        {...register('brand')}
        label="Brand"
        variant="standard"
        error={!!formErrors.brand}
        helperText={formErrors.brand?.message}
        fullWidth
      />

      <Stack justifyContent='center' alignItems='center' gap={3} flexDirection={{xs:'column', sm:'row'}} >
        <RHFDropdown name="categoryId" options={categories} label="Category" />
        <RHFDropdown name="subcategoryId" options={subcategories} label="Subcategory" disabled={!selectedCategoryId} />
      </Stack>

      <TextField
        {...register('basePrice')}
        type="number"
        label="Base Price"
        variant="standard"
        error={!!formErrors.basePrice}
        helperText={formErrors.basePrice?.message}
        fullWidth
      />

      <TextField
        {...register('description')}
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

export default AddProductForm;
