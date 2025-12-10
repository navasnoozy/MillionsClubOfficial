//src/admin/components/Toolbar.tsx

import AddIcon from "@mui/icons-material/Add";
import { Grid, Paper, Stack, Typography, type SelectChangeEvent, debounce, Switch, Box, Tooltip } from "@mui/material";
import AppButton from "../../components/AppButton";
import Dropdown from "../../components/Dropdown";
import SearchBar from "../../components/SearchBar";
import { useMemo, useState, type ChangeEvent } from "react";
import UserFormDialog from "../user-management/components/UserFormContent";

const ROLE_OPTIONS = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Moderator", value: "moderator" },
  { label: "Customer", value: "customer" },
];

const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Blocked", value: "blocked" },
];

interface ToolbarProps {
  filters: { role: string; status: string; search: string; isDeleted: boolean };
  onFilterChange: (key: string, value: string) => void;
}

const Toolbar = ({ filters, onFilterChange }: ToolbarProps) => {
  const [localSearch, setLocalSearch] = useState(filters.search);
  const [openUserAdd, setOpenUseradd] = useState<boolean>(false);

  const debouncedUpdate = useMemo(() => {
    return debounce((value: string) => {
      onFilterChange("search", value);
    }, 500);
  }, [onFilterChange]);

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    debouncedUpdate(value);
  };

  const handleDropdownChange = (key: string) => (e: SelectChangeEvent<unknown>) => {
    onFilterChange(key, e.target.value as string);
  };

  const handleToggleChange = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    onFilterChange(key, String(e.target.checked));
  };

  return (
    <Paper sx={{ padding: 2, gap: 2, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <Grid container spacing={2} width={"100%"}>
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Stack>
            <Typography color="gray" align="left">
              Search
            </Typography>
            <SearchBar value={localSearch} onChange={handleSearchChange} />
          </Stack>
        </Grid>

        <Grid size="grow" gap={1} display={"flex"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={1}>
            <Stack>
              <Typography color="gray" align="left">
                Role
              </Typography>
              <Dropdown value={filters.role || "all"} onChange={handleDropdownChange("role")} options={ROLE_OPTIONS} width="130px" />
            </Stack>

            <Stack>
              <Typography color="gray" align="left">
                Status
              </Typography>
              <Dropdown value={filters.status || "all"} onChange={handleDropdownChange("status")} options={STATUS_OPTIONS} width="130px" />
            </Stack>
            <Tooltip sx={{ display: { xs: "none", sm: "block" } }} title="Show Deleted user">
              <Stack>
                <Typography color="gray" align="left">
                  Deleted
                </Typography>
                <Switch checked={filters.isDeleted} onChange={handleToggleChange("isDeleted")} />
              </Stack>
            </Tooltip>
          </Stack>
          <Tooltip title="Add user">
            <AppButton
              onClick={() => setOpenUseradd(true)}
              size="small"
              sx={{ height: "40px", marginTop: 3.4, textWrap: "nowrap", position: { xs: "fixed", md: "static" }, right: 20, bottom: 30, borderRadius: 50 }}
              variant="contained"
            >
              <AddIcon />
              <Box component="span" sx={{ display: { xs: "none", sm: "block" }, ml: 1, mr: 1 }}>
                Add user
              </Box>
            </AppButton>
          </Tooltip>
        </Grid>
      </Grid>
      <UserFormDialog open={openUserAdd} onClose={() => setOpenUseradd(false)} />
    </Paper>
  );
};

export default Toolbar;
