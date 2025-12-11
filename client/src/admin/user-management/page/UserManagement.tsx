//src/admin/pages/UserManagement.tsx

import type { PaginationInput } from "@millionsclub/shared-libs/client";
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import Paginations from "../../../components/Pagination";
import Container from "../../components/Container";
import UserTable from "../../components/TableContainer";
import Toolbar from "../../components/Toolbar";
import { useGetUsers } from "../hooks/userUsers";



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
      <UserTable users={users?.data} sx={{ mt: 2 }}  />
      {users?.count && <Paginations onChangePage={handleFilterChange} itemCount={users?.count} limit={currentFilters.limit} />}
    </Container>
  );
};

export default UserManagement;
