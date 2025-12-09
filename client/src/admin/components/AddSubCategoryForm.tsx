import type { CreateSubCategoryInput } from "@millionsclub/shared-libs/client";
import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FormDropdown from "../../components/FormDropdown";
import useCategories from "../../features/categories/hooks/useCategories";

// type Props = {
//   isError: boolean;
//   errors: { message: string; field: string }[];
// };

const AddSubCategoryForm = () => {
  const { data: categories } = useCategories();

  const {
    register,
    formState: { errors: formErrors },
  } = useFormContext<CreateSubCategoryInput>();

  return (
    <Stack spacing={3} width={"100%"} height={"100%"} alignItems="center">
      <TextField {...register("name")} label="Category Name" variant="standard" error={!!formErrors.name} helperText={formErrors.name?.message} fullWidth />

      <TextField {...register("slug")} label="Category Slug" variant="standard" error={!!formErrors.slug} helperText={formErrors.slug?.message} fullWidth />

      <Stack>{categories && <FormDropdown name="parentCategoryId" options={categories} label="Select Main Category" />}</Stack>
    </Stack>
  );
};

export default AddSubCategoryForm;
