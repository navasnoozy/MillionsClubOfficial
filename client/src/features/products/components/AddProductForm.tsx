import type { AddProductSchema } from "@millionsclub/shared-libs/client";
import {
  Stack,
  TextField
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Dropdown from "../../../components/Dropdown";
import ErrorMessages from "../../../components/errorMessge";
import {
  dummySubcategories
} from "../../../data/categorySample";
import useCategories from "../../categories/hooks/useCategories";
import TongleButton from "./Switch";
import RHFDropdown from "../../../components/RHFDropdown";
import useSubCategories from "../../categories/hooks/useSubCategories";
// import useCategories from "../../categories/hooks/useCategories";

type Props = {
  isLoading: boolean;
  isError: boolean;
  errors: { message: string; field: string }[];
};

const AddProductForm = ({ isLoading, isError, errors }: Props) => {
  const {
    register,
    control,
    formState: { errors: formErrors },
  } = useFormContext<AddProductSchema>();

  const {data:categories} = useCategories();
  const {data:subCategories} = useSubCategories() ;

  return (
    <Stack spacing={3} width={"100%"} height={"100%"} justifyContent={'space-between'}>
      <TextField
        {...register("title")}
        label="Title"
        variant="standard"
        error={!!formErrors.title}
        helperText={formErrors.title?.message}
        fullWidth
      />

      <TextField
        {...register("brand")}
        label="Brand"
        variant="standard"
        error={!!formErrors.brand}
        helperText={formErrors.brand?.message}
        fullWidth
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ width: "100%", alignItems: "center" }}
      >
        {categories && (
          <RHFDropdown
            name="categoryId"
            options={categories}
            label="Category"
          />
        )}
        {subCategories && (
          <RHFDropdown
            name="subCategoryId"
            options={subCategories}
            label="SubCategory"
          />
        )}
      </Stack>

      <TextField
        {...register("basePrice")}
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
