import { Box, Grid, Stack, Typography } from '@mui/material';
import ImagePreview from '../components/ImagePreview';
import useProducts from '../features/products/hooks/useProducts';

const HomePage = () => {
  const { data:products} = useProducts()

  if (!products || products.length ===0){
    return (
      <Box>No item found</Box>
    )
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid key={item.id}  sx={{
          border: '1px solid #09e6e63c', 
          borderRadius: 2,               
          padding: 2,                   
        }} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Stack flexDirection={{ xs: 'row', sm: 'column' }} gap={2}>
              <Stack
                sx={{
                  width: { xs: '40%', sm: '100%' },
                }}
              >
                <ImagePreview src={item?.images?.[0]?.secure_url} />
              </Stack>
              <Stack sx={{ width: { xs: '60%', sm: '100%' }, justifyContent: 'flex-start', textAlign: 'left', gap: 1 }}>
                <Typography sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
                <Box>{'★★★★☆'}</Box>
                <Typography >Price {item.basePrice}</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
