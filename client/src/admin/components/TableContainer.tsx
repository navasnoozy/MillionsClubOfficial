import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableContainer as MuiTableContainer } from "@mui/material";
import type { TableContainerProps } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import UserActions from "../user-management/components/UserActions";
import type { User } from "../user-management/interface/user";
import { NewReleases, Verified } from "@mui/icons-material";
import { capitalize, Chip, TableCell, TableRow } from "@mui/material";

const heading = ["Name", "Email", "Role", "Verified", "Orders", "Spent", "Action"];

const ROLE_COLORS = {
  customer: { bg: "#E8F4FF", text: "#5B8DEF" },
  admin: { bg: "#FFE8F5", text: "#D946A6" },
  moderator: { bg: "#FFF4E6", text: "#F59E0B" },
  default: { bg: "white", text: "black" },
} as const;

interface Props extends TableContainerProps {
  users?: User[];
}

const UserTable = ({ users, ...props }: Props) => {
  return (
    <MuiTableContainer component={Paper} {...props}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {heading.map((h) => (
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => {
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
                  <UserActions user={user} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </MuiTableContainer>
  );
};

export default UserTable;
