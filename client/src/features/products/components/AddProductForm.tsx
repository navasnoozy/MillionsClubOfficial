import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductSchema,
  type AddProductSchema,
} from "@millionsclub/shared-libs/client";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import Dropdown from "../../../components/Dropdown";
import ErrorMessages from "../../../components/errorMessge";
import { dummyCategories, dummySubcategories } from "../../../data/categorySample";
// import useCategories from "../../categories/hooks/useCategories";


type Props = {
  onSubmit: (data: AddProductSchema) => void;
  isLoading: boolean;
  isError: boolean;
  errors: { message: string; field: string }[];
};

const AddProductForm = ({ onSubmit, isLoading, isError, errors }: Props) => {
  const methods = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
  });

  // const { data: categories } = useCategories();
  const categories = dummyCategories;
  const subCategories = dummySubcategories

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField
            {...methods.register("title")}
            label="Title"
            variant="standard"
            error={!!methods.formState.errors.title}
            helperText={methods.formState.errors.title?.message}
            fullWidth
          />

          <TextField
            {...methods.register("brand")}
            label="Brand"
            variant="standard"
            error={!!methods.formState.errors.brand}
            helperText={methods.formState.errors.brand?.message}
            fullWidth
          />

          <Stack sx={{display:'flex', flexDirection:'row'}}>
            {categories && (
              <Dropdown
                fieldname="categoryId"
                options={categories}
                label="Category"
              />
            )}

            {categories && (
              <Dropdown
                fieldname="subCategoryId"
                options={subCategories}
                label="SubCategory"
              />
            )}
          </Stack>

          <Button
            disabled={isLoading}
            type="submit"
            size="large"
            variant="contained"
          >
            ADD PRODUCT
            {isLoading && (
              <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />
            )}
          </Button>

          {isError && <ErrorMessages errors={errors} />}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AddProductForm;
