import Container from "../components/Container";
import ProductToolbar from "./components/ProductToolbar";

const ProductManagement = () => {
  return (
    <Container heading="User Management" caption="Manage your customers, admins, and moderators">
      <ProductToolbar />
    </Container>
  );
};

export default ProductManagement;
