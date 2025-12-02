import { zodResolver } from "@hookform/resolvers/zod";
import type { AddCategory } from "@millionsclub/shared-libs/client";
import { addCategorySchema } from "@millionsclub/shared-libs/client";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CardContainer from "../../components/CardContainer";
import AddCategoryForm from "../components/AddCategoryForm";
import SubmitButton from "../components/SubmitButton";
import useAddCategory from "../hooks/useAddCategory";


const AddCategoryPage = () => {
  const navigate = useNavigate();
  const { mutate: addCategory, isPending } = useAddCategory();

  const methods = useForm<AddCategory>({
    resolver: zodResolver(addCategorySchema),
  });

  const handleAddCategory = (data: AddCategory) => {
    addCategory(data, {
      onSuccess: () => {
        navigate(`/admin/categorymanagement`);
        methods.reset();
      },
    });
  };

  return (
    <CardContainer heading="Add Category">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleAddCategory)}>
          <Stack spacing={3}>
            <AddCategoryForm  />

            <SubmitButton isLoading={isPending} disabled={isPending}>
              ADD CATEGORY
            </SubmitButton>
          </Stack>
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default AddCategoryPage;
