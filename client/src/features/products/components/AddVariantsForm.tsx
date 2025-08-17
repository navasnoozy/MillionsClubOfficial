import { zodResolver } from "@hookform/resolvers/zod";
import {
  addProductSchema,
  type AddProductSchema,
} from "@millionsclub/shared-libs/client";
import {
  Button,
  CircularProgress,
  ImageList,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import Dropdown from "../../../components/Dropdown";
import ErrorMessages from "../../../components/errorMessge";
import ImageFrame from "../../../components/ImageFrame";
import {
  dummyCategories,
  dummySubcategories,
} from "../../../data/categorySample";
import TongleButton from "./Switch";
// import useCategories from "../../categories/hooks/useCategories";

type Props = {
  onSubmit: (data: AddProductSchema) => void;
  isLoading: boolean;
  isError: boolean;
  errors: { message: string; field: string }[];
};

const AddVariantForm = ({ onSubmit, isLoading, isError, errors }: Props) => {
  const methods = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
  });

  const { control, register, handleSubmit } = methods;

  // const { data: categories } = useCategories();
  const categories = dummyCategories;
  const subCategories = dummySubcategories;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <ImageList
            variant="quilted"
            cols={3}
            rowHeight={200}
            gap={4}
            sx={{ border: "2px solid gray", borderRadius: 2 }}
          >
            <ImageFrame />
          </ImageList>

          <Stack spacing={3}>
            <TextField
              {...register("title")}
              label="Title"
              variant="standard"
              error={!!methods.formState.errors.title}
              helperText={methods.formState.errors.title?.message}
              fullWidth
            />

            <TextField
              {...register("brand")}
              label="Brand"
              variant="standard"
              error={!!methods.formState.errors.brand}
              helperText={methods.formState.errors.brand?.message}
              fullWidth
            />

            <Stack
              className="jabar"
              direction={{ xs: "column", sm: "row" }}
              sx={{ width: "100%", alignItems: "center" }}
            >
              {categories && (
                <Dropdown
                  fieldname="categoryId"
                  options={categories}
                  label="Category"
                />
              )}{" "}
              {subCategories && (
                <Dropdown
                  fieldname="subCategoryId"
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
              error={!!methods.formState.errors.basePrice}
              helperText={methods.formState.errors.basePrice?.message}
              fullWidth
            />

            <TextField
              {...register("description")}
              label="Description"
              variant="outlined"
              multiline
              minRows={4}
              maxRows={10}
              error={!!methods.formState.errors.description}
              helperText={methods.formState.errors.description?.message}
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
        </Stack>
      </form>
    </FormProvider>
  );
};

export default AddVariantForm;
