import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import useProducts from "../features/products/hooks/useProducts";
import TongleButton from "../features/products/components/Switch";

interface TableHeadings {
  label: string;
  value: string;
}

const ProductManagement = () => {
  const { data: products } = useProducts();

  const tableHeadings: TableHeadings[] = [
    { label: "Images", value: "images" },
    { label: "Title", value: "title" },
    { label: "Brand", value: "brand" },
    { label: "Base Price", value: "baseprice" },
    { label: "Status", value: "isActive" },
    { label: "Created", value: "createdAt" },
    { label: "Updated", value: "updatedAt" },
  ];

  return (
    <Box  display="grid" gridAutoRows="auto" rowGap={2}>
    <Paper>
      navigation panel 
    </Paper>
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
            <TableCell>{new Date (item.createdAt).toLocaleString ()}</TableCell>
            <TableCell>{new Date (item.updatedAt).toLocaleString ()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </Paper>
    </Box>
  );
};

export default ProductManagement;

const exampleRow = [
  {
    id: "dfd",
    images: "https://picsum.photos/200/300",
    title: "Sample Product",
    brand: "BrandX",
    baseprice: 99.99,
    isActive: true,
    createdAt: "2025-08-10T12:34:56Z",
    updatedAt: "2025-08-11T08:00:00Z",
  },
  {
    id: "dsfsd",
    images: "https://picsum.photos/200/300",
    title: "Sample Product",
    brand: "BrandX",
    baseprice: 99.99,
    isActive: true,
    createdAt: "2025-08-10T12:34:56Z",
    updatedAt: "2025-08-11T08:00:00Z",
  },
];
