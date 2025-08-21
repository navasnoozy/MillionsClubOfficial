import { Stack } from "@mui/material";
import AddCategoryPage from "./AddCategoryPage";
import AddSubCategoryPage from "./AddSubCategoryPage";
import AppLink from "../../../components/CustomLink";

const CategoryManagement = () => {
  return (
    <Stack spacing={3} justifyContent={"center"} alignItems={"center"} direction={{xs:'column', md:'row'}}>
      <AddCategoryPage />
      <AddSubCategoryPage />
      <AppLink to='/admin/addcategory'>Add Category</AppLink>
      <AppLink  to='/admin/addsubcategory'>Add Sub-Category</AppLink>
    </Stack>
  );
};

export default CategoryManagement;
