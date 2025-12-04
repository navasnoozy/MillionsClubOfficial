import { Grid, Paper, Stack } from "@mui/material";
import Container from "../components/Container";
import SearchBar from "../../components/SearchBar";
import Dropdown from "../../components/Dropdown";
import { dummyUsers } from "../../data/_dummyusers";
import { useState } from "react";
import { categories } from "../../data/_categories";
import AppButton from "../../components/AppButton";

const ProductManagement = () => {
  const [state, setState] = useState("");
  console.log(state);

  const handlechange = (value) => {
    setState(value);
  };

  const catego = categories.map((item) => ({ _id: item._id, name: item.name }));

  return (
    <Container heading="User Management" caption="Manage your customers, admins, and moderators">
      <Paper sx={{ padding: 2, gap: 2, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Stack>
          <SearchBar />
          <Dropdown value={state} onChange={handlechange} options={catego} />
        </Stack>
        <Stack>
            <AppButton></AppButton>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ProductManagement;