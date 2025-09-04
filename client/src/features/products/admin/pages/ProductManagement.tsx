import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, CardMedia } from '@mui/material';
import TongleButton from '../../components/Switch';
import tableHeadings from '../config/tableHeading';
import Panel from '../../components/Panel';
import useProducts from '../../hooks/useProducts';
import ImagePreview from '../../../../components/ImagePreview';

const ProductManagement = () => {
  const { data: products } = useProducts();

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
            {products?.map((item) => (
              <TableRow key={item.id}>
                <TableCell size="small">
                  <CardMedia sx={{width:'200px',}}>
                    <ImagePreview src={item.images?.[0]?.secure_url} />
                  </CardMedia>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.basePrice}</TableCell>
                <TableCell>
                  <TongleButton checked={item.isActive} />
                </TableCell>
                <TableCell>{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default ProductManagement;
