import type { AddSubCategory } from "@millionsclub/shared-libs/client";
import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Dropdown from "../../../components/Dropdown";
import ErrorMessages from "../../../components/errorMessge";
import useCategories from "../hooks/useCategories";
// import useCategories from "../../categories/hooks/useCategories";

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
    <Stack
      spacing={3}
      width={"100%"}
      height={"100%"}
      justifyContent={"space-between"}
    >
      <TextField
        {...register("name")}
        label="Category Name"
        variant="standard"
        error={!!formErrors.name}
        helperText={formErrors.name?.message}
        fullWidth
      />

      <TextField
        {...register("slug")}
        label="Category Slug"
        variant="standard"
        error={!!formErrors.slug}
        helperText={formErrors.slug?.message}
        fullWidth
      />

      {categories && (
        <Dropdown
          fieldname="parentCategoryId"
          options={categories}
          label="Select Main Category"
        />
      )}

      {isError && <ErrorMessages errors={errors} />}
    </Stack>
  );
};

export default AddSubCategoryForm;
