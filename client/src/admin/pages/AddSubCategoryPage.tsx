import { zodResolver } from "@hookform/resolvers/zod";
import type { AddSubCategory } from "@millionsclub/shared-libs/client";
import { addSubCategorySchema } from "@millionsclub/shared-libs/client";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CardContainer from "../../components/CardContainer";
import AddSubCategoryForm from "../components/AddSubCategoryForm";
import SubmitButton from "../components/SubmitButton";
import useAddSubCategory from "../hooks/useAddSubCategory";


const AddSubCategoryPage = () => {
  const navigate = useNavigate();

  const { mutate: addSubCategory, isPending } = useAddSubCategory();

  const methods = useForm<AddSubCategory>({
    resolver: zodResolver(addSubCategorySchema),
  });

  const handleAddSubCategories = (data: AddSubCategory) => {
    addSubCategory(data, {
      onSuccess: () => {
        navigate(`/admin/categorymanagement`);
        methods.reset();
      },
    });
  };

  return (
    <CardContainer heading="Add Sub-Category">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleAddSubCategories)}>
          <Stack spacing={3}>
            <AddSubCategoryForm  />

            <SubmitButton isLoading={isPending} disabled={isPending}>
              ADD SUB CATEGORY
            </SubmitButton>
          </Stack>
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default AddSubCategoryPage;
