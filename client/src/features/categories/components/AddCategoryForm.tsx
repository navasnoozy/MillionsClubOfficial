import type { AddCategory } from "@millionsclub/shared-libs/client";
import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import ErrorMessages from "../../../components/errorMessge";
// import useCategories from "../../categories/hooks/useCategories";

type Props = {
  isError: boolean;
  errors: { message: string; field: string }[];
};

const AddCategoryForm = ({ isError, errors }: Props) => {
  const {
    register,
    formState: { errors: formErrors },
  } = useFormContext<AddCategory>();

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

      {isError && <ErrorMessages errors={errors} />}
    </Stack>
  );
};

export default AddCategoryForm;
