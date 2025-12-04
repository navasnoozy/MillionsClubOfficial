import { Paper, Stack } from "@mui/material";
import { useState } from "react";
import Dropdown from "../../components/Dropdown";
import SearchBar from "../../components/SearchBar";
import Container from "../components/Container";
import { dummyUsers } from "../../data/_dummyusers";

const UserManagement = () => {
  const [state, setState] = useState("");
  console.log(state);


  const handlechange = (value) => {
    setState(value);
  };

   const role = dummyUsers.map(u=> ({_id: u._id}))

  return (
    <Container heading="User Management" caption="Manage your customers, admins, and moderators">
      <Paper sx={{ padding: 2, gap: 2, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Stack>
          <SearchBar />
          <Dropdown value={state} onChange={handlechange} options={dum} />
        </Stack>
        <Stack>

        </Stack>
      </Paper>
    </Container>
  );
};

export default UserManagement;
