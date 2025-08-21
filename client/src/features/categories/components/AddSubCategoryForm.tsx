import type { AddSubCategory } from '@millionsclub/shared-libs/client';
import { Stack, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import ErrorMessages from '../../../components/errorMessge';
import RHFDropdown from '../../../components/RHFDropdown';
import useCategories from '../hooks/useCategories';

type Props = {
  isLoading: boolean;
  isError: boolean;
  errors: { message: string; field: string }[];
};

const AddSubCategoryForm = ({ isLoading, isError, errors }: Props) => {
  const { data: categories } = useCategories();

  const {
    register,
    formState: { errors: formErrors },
  } = useFormContext<AddSubCategory>();

  return (
    <Stack spacing={3} width={'100%'} height={'100%'} alignItems="center">
      <TextField
        {...register('name')}
        label="Category Name"
        variant="standard"
        error={!!formErrors.name}
        helperText={formErrors.name?.message}
        fullWidth
      />

      <TextField
        {...register('slug')}
        label="Category Slug"
        variant="standard"
        error={!!formErrors.slug}
        helperText={formErrors.slug?.message}
        fullWidth
      />

      <Stack>
        {categories && <RHFDropdown name="parentCategoryId" options={categories} label="Select Main Category" />}
      </Stack>

      {isError && <ErrorMessages errors={errors} />}
    </Stack>
  );
};

export default AddSubCategoryForm;
