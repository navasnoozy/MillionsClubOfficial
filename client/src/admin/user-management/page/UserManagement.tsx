//src/admin/pages/UserManagement.tsx

import type { PaginationInput } from "@millionsclub/shared-libs/client";
import { NewReleases, Verified } from "@mui/icons-material";
import { capitalize, Chip, TableCell, TableRow } from "@mui/material";
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import Paginations from "../../../components/Pagination";
import Container from "../../components/Container";
import TableContainer from "../../components/TableContainer";
import Toolbar from "../../components/Toolbar";
import UserActions from "../components/UserActions";
import { useGetUsers } from "../hooks/userUsers";

const ROLE_COLORS = {
  customer: { bg: "#E8F4FF", text: "#5B8DEF" },
  admin: { bg: "#FFE8F5", text: "#D946A6" },
  moderator: { bg: "#FFF4E6", text: "#F59E0B" },
  default: { bg: "white", text: "black" },
} as const;

const heading = ["Name", "Email", "Role", "Verified", "Orders", "Spent", "Action"];

const UserManagement = () => {
  const [searchParams, setsearchParams] = useSearchParams();

  const currentFilters = {
    page: searchParams.get("page") || 1,
    limit: 10,
    role: searchParams.get("role") || "all",
    status: searchParams.get("status") || "all",
    search: searchParams.get("search") || "",
    isDeleted: searchParams.get("isDeleted") ? true : false,
  };

  const apiParams: PaginationInput = {
    page: Number(currentFilters.page),
    limit: 10,
    search: currentFilters.search || undefined,
    role: currentFilters.role !== "all" ? (currentFilters.role as any) : undefined,
    status: currentFilters.status !== "all" ? (currentFilters.status as any) : undefined,
    isDeleted: currentFilters.isDeleted || undefined,
  };

  const { data: users } = useGetUsers(apiParams);

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setsearchParams((prev) => {
        if (value === "all" || value === "" || value === "false") {
          prev.delete(key);
        } else {
          prev.set(key, value);
        }

        return prev;
      });
    },
    [setsearchParams]
  );



  return (
    <Container heading="User Management" caption="Manage your customers, admins, and moderators">
      <Toolbar filters={currentFilters} onFilterChange={handleFilterChange} />
      <TableContainer sx={{ mt: 2 }} heading={heading}>
        {users?.data?.map((user) => {
          const roleColor = ROLE_COLORS[user.role] ?? ROLE_COLORS.default;
          return (
            <TableRow key={user.id} sx={{ overflowX: "auto", backgroundColor: user.isDeleted ? "#6e6c6c1f" : "auto" }}>
              <TableCell size="small" sx={{ fontWeight: "bold", color: user.isDeleted ? "red" : "" }}>
                {user.name}
              </TableCell>
              <TableCell size="small">{user.email}</TableCell>
              <TableCell size="small">
                <Chip size="small" label={capitalize(user.role)} sx={{ width: "100px", backgroundColor: roleColor.bg, color: roleColor.text, borderColor: roleColor.text }} variant="outlined" />
              </TableCell>
              <TableCell size="small">{user.emailVerified ? <Verified fontSize="small" sx={{ color: "#1877F2" }} /> : <NewReleases fontSize="small" sx={{ color: "#898F9C" }} />}</TableCell>
              <TableCell size="small">{user.name}</TableCell>
              <TableCell size="small">{user.name}</TableCell>
              <TableCell size="small">
                <UserActions user={user}  />
              </TableCell>
            </TableRow>
          );
        })}
      </TableContainer>
      {users?.count && <Paginations onChangePage={handleFilterChange} itemCount={users?.count} limit={currentFilters.limit} />}
    </Container>
  );
};

export default UserManagement;
