import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TongleButton from "../components/Switch";
import tableHeadings from "../config/tableHeading";
import Panel from "../components/Panel";

const ProductManagement = () => {

  return (
    <Box display="grid" gridAutoRows="auto" rowGap={2}>
      <Panel />
      <Paper>
        <Table>
          <TableHead>
            <TableRow hover>
              {tableHeadings.map((heading) => (
                <TableCell key={heading.value}>{heading.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {exampleRow.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img src={item.images}></img>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.baseprice}</TableCell>
                <TableCell>
                  <TongleButton />
                </TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(item.updatedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ProductManagement;
