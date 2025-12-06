import { Box, Paper, Stack, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material"; // Import types if using TS
import Dropdown from "../../components/Dropdown";
import SearchBar from "../../components/SearchBar";
import Container from "../components/Container";
import { dummyUsers } from "../../data/_dummyusers";
import { useState } from "react";
import { USER_ROLES } from "../../constants/user";
import { STATUS } from "../../constants/status";

const UserManagement = () => {
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setRole(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value);
  };

  return (
    <Container heading="User Management" caption="Manage your customers, admins, and moderators">
      <Paper sx={{ padding: 2, gap: 2, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <Stack>
            <Typography color="gray" align="left">
              Search
            </Typography>
            <SearchBar />
          </Stack>
          <Stack>
            <Typography color="gray" align="left">
              Role
            </Typography>
            <Dropdown value={role} onChange={handleRoleChange} options={USER_ROLES} width="130px" />
          </Stack>
          <Stack>
            <Typography color="gray" align="left">
              Status
            </Typography>
            <Dropdown value={status} onChange={handleStatusChange} options={STATUS} width="130px" />
          </Stack>
        </Stack>
        <Stack display={"flex"}></Stack>
      </Paper>
    </Container>
  );
};

export default UserManagement;
