//src/admin/components/Toolbar.tsx

import AddIcon from "@mui/icons-material/Add";
import { Grid, Paper, Stack, Typography, type SelectChangeEvent } from "@mui/material";
import AppButton from "../../components/AppButton";
import Dropdown from "../../components/Dropdown";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";

const ROLE_OPTIONS = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Moderator", value: "moderator" },
];

const STATUS_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];

interface ToolbarProps {
  filters: { role: string; isActive: string; search: string };
  onFilterChange: (key: string, value: string) => void;
}

const Toolbar = ({ filters, onFilterChange }: ToolbarProps) => {
  const [localSearch, setLocalSearch] = useState(filters.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      onFilterChange("search", localSearch);
    }, 500);

    return () => clearTimeout(handler);
  }, [localSearch, onFilterChange]);

  const handleRoleChange = (e: SelectChangeEvent<string>) => {
    onFilterChange("role", e.target.value);
  };
  const handleStatusChange = (e: SelectChangeEvent<string>) => {
    onFilterChange("isActive", e.target.value);
  };

  return (
    <Paper sx={{ padding: 2, gap: 2, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <Grid container spacing={2} width={"100%"}>
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Stack>
            <Typography color="gray" align="left">
              Search
            </Typography>
            <SearchBar value={localSearch} onChange={setLocalSearch} />
          </Stack>
        </Grid>

        <Grid size="grow" gap={1} display={"flex"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={1}>
            <Stack>
              <Typography color="gray" align="left">
                Role
              </Typography>
              <Dropdown value={filters.role || "All"} onChange={handleRoleChange} options={ROLE_OPTIONS} width="130px" />
            </Stack>

            <Stack>
              <Typography color="gray" align="left">
                Status
              </Typography>
              <Dropdown value={filters.isActive} onChange={handleStatusChange} options={STATUS_OPTIONS} width="130px" />
            </Stack>
          </Stack>

          <AppButton size="small" sx={{ height: "40px", marginTop: 3.4, textWrap: "nowrap" }} variant="contained">
            <AddIcon />
            Add User
          </AppButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Toolbar;
