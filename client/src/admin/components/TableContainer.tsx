import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableContainer as MuiTableContainer, TableCell } from "@mui/material";
import type { TableContainerProps } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { ReactNode } from "react";

interface Props extends TableContainerProps {
  heading: string[];
  children: ReactNode,
}

const TableContainer = ({ heading,children, ...props }: Props) => {
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
        <TableBody>{children}</TableBody>
      </Table>
    </MuiTableContainer>
  );
};

export default TableContainer;
