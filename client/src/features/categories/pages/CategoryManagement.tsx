import { Stack } from "@mui/material";
import AddCategoryPage from "./AddCategoryPage";
import AddSubCategoryPage from "./AddSubCategoryPage";

const CategoryManagement = () => {
  return (
    <Stack spacing={3} justifyContent={"center"} direction={"row"}>
      <AddCategoryPage />
      <AddSubCategoryPage />
    </Stack>
  );
};

export default CategoryManagement;
