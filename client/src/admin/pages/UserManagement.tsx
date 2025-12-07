//src/admin/pages/UserManagement.tsx

import { NewReleases, Verified } from "@mui/icons-material";
import { capitalize, Chip, TableCell, TableRow } from "@mui/material";
import Container from "../components/Container";
import TableContainer from "../components/TableContainer";
import Toolbar from "../components/Toolbar";
import useGetUsers from "../hooks/useGetUsers";
import { useSearchParams } from "react-router";
import type { PaginationInput } from "@millionsclub/shared-libs/client";
import { useCallback } from "react";
import Paginations from "../../components/Pagination";

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
    isActive: searchParams.get("isActive") || "all",
    search: searchParams.get("search") || "",
  };

  const apiParams: PaginationInput = {
    page: Number(currentFilters.page),
    limit: 10,
    search: currentFilters.search || undefined,
    role: currentFilters.role !== "all" ? (currentFilters.role as any) : undefined,
    isActive: currentFilters.isActive !== "all" ? (currentFilters.isActive as any) : undefined,
  };

  const { data: users } = useGetUsers(apiParams);

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setsearchParams((prev) => {
        if (value === "all" || value === "") {
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
        {users?.data?.map((u) => {
          const roleColor = ROLE_COLORS[u.role] ?? ROLE_COLORS.default;
          return (
            <TableRow key={u.id} sx={{ overflowX: "auto" }}>
              <TableCell size="small" sx={{ fontWeight: "bold" }}>
                {u.name}
              </TableCell>
              <TableCell size="small">{u.email}</TableCell>
              <TableCell size="small">
                <Chip size="small" label={capitalize(u.role)} sx={{ width: "100px", backgroundColor: roleColor.bg, color: roleColor.text, borderColor: roleColor.text }} variant="outlined" />
              </TableCell>
              <TableCell size="small" align="center">
                {u.emailVerified ? <Verified fontSize="small" sx={{ color: "#1877F2" }} /> : <NewReleases fontSize="small" sx={{ color: "#898F9C" }} />}
              </TableCell>
              <TableCell size="small">{u.name}</TableCell>
              <TableCell size="small">{u.name}</TableCell>
            </TableRow>
          );
        })}
      </TableContainer>
      {users?.count && <Paginations onChangePage={handleFilterChange} itemCount={users?.count} limit={currentFilters.limit} />}
    </Container>
  );
};

export default UserManagement;
