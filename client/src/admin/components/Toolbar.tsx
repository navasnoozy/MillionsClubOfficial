import AddIcon from "@mui/icons-material/Add";
import { Grid, Paper, Stack, Typography, type SelectChangeEvent } from "@mui/material";
import AppButton from "../../components/AppButton";
import Dropdown from "../../components/Dropdown";
import SearchBar from "../../components/SearchBar";
import { STATUS } from "../../constants/status";
import { USER_ROLES } from "../../constants/user";
import type { User } from "../../interface/user";
import type { Filters } from "../hooks/useGetUsers";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const Toolbar = ({ filters, setFilters }: Props) => {
  

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setFilters((prev) => ({ ...prev, role: event.target.value as User["role"] }));
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
       
  };
  return (
    <Paper sx={{ padding: 2, gap: 2, display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
      <Grid container spacing={2} width={"100%"}>
        <Grid size={{ xs: 12, sm: 4, md: 3 }}>
          <Stack>
            <Typography color="gray" align="left">
              Search
            </Typography>
            <SearchBar />
          </Stack>
        </Grid>

        <Grid size="grow" gap={1} display={"flex"} justifyContent={"space-between"}>
          <Stack direction={"row"} gap={1}>
            <Stack>
              <Typography color="gray" align="left">
                Role
              </Typography>
              <Dropdown value={filters.role} onChange={handleRoleChange} options={USER_ROLES} width="130px" />
            </Stack>

            <Stack>
              <Typography color="gray" align="left">
                Status
              </Typography>
              <Dropdown value={status} onChange={handleStatusChange} options={STATUS} width="130px" />
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
