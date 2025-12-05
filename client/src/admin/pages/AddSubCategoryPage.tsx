import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateSubCategoryInput } from "@millionsclub/shared-libs/client";
import { createSubCategorySchema } from "@millionsclub/shared-libs/client";
import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CardContainer from "../../components/CardContainer";
import AddSubCategoryForm from "../components/AddSubCategoryForm";
import useAddSubCategory from "../hooks/useAddSubCategory";
import AppButton from "../../components/AppButton";

const AddSubCategoryPage = () => {
  const navigate = useNavigate();

  const { mutate: addSubCategory, isPending } = useAddSubCategory();

  const methods = useForm<CreateSubCategoryInput>({
    resolver: zodResolver(createSubCategorySchema),
    defaultValues: {
      parentCategoryId: "",
    },
  });

  const handleAddSubCategories = (data: CreateSubCategoryInput) => {
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
            <AddSubCategoryForm />

            <AppButton isLoading={isPending} disabled={isPending}>
              ADD SUB CATEGORY
            </AppButton>
          </Stack>
        </form>
      </FormProvider>
    </CardContainer>
  );
};

export default AddSubCategoryPage;
