import { Box } from "@mui/material";
import AppLink from "../components/CustomLink";

const AdminDashboard = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'column' , gap:2}}>
      <AppLink to={'/admin/productmanagement'}>Product Management</AppLink>
      <AppLink to={'/admin/categorymanagement'}>Category Management</AppLink>
    </Box>
  )
};

export default AdminDashboard;
