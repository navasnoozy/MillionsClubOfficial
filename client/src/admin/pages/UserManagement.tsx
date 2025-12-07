import { NewReleases, Verified } from "@mui/icons-material";
import { capitalize, Chip, TableCell, TableRow } from "@mui/material";
import Container from "../components/Container";
import TableContainer from "../components/TableContainer";
import Toolbar from "../components/Toolbar";
import useGetUsers, { type Filters } from "../hooks/useGetUsers";
import { useState } from "react";

const ROLE_COLORS = {
  customer: { bg: "#E8F4FF", text: "#5B8DEF" },
  admin: { bg: "#FFE8F5", text: "#D946A6" },
  moderator: { bg: "#FFF4E6", text: "#F59E0B" },
} as const;
const heading = ["Name", "Email", "Role", "Verified", "Orders", "Spent", "Action"];

const defaultFilters: Filters = {
  role: "All",
  isActive: undefined,
  search: undefined,
};

const UserManagement = () => {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { data: users } = useGetUsers(filters);

  return (
    <Container heading="User Management" caption="Manage your customers, admins, and moderators">
      <Toolbar filters={filters} setFilters={setFilters} />
      <TableContainer sx={{ mt: 2 }} heading={heading}>
        {users?.data?.map((u) => {
          return (
            <TableRow key={u.id}>
              <TableCell sx={{ fontWeight: "bold" }}>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Chip
                  size="small"
                  label={capitalize(u.role)}
                  sx={{ width: "100px", backgroundColor: ROLE_COLORS[u.role].bg, color: ROLE_COLORS[u.role].text, borderColor: ROLE_COLORS[u.role].text }}
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="center">{u.emailVerified ? <Verified fontSize="small" sx={{ color: "#1877F2" }} /> : <NewReleases fontSize="small" sx={{ color: "#898F9C" }} />}</TableCell>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.name}</TableCell>
            </TableRow>
          );
        })}
      </TableContainer>
    </Container>
  );
};

export default UserManagement;
