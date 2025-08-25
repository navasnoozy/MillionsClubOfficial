import { Box, CircularProgress, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const OrderManagement = () => {
  return (
    <Box sx={{ 
      position: 'relative',
      display: 'flex',           // Changed from inline-flex
      alignItems: 'center',      // Vertical centering
      justifyContent: 'center',  // Horizontal centering
      // width: 48,
      // height: 48,
    }}>
      <IconButton
        sx={{
          // width: 40,
          // height: 40,
          padding: '4px',
          position: 'absolute',    // Keep absolute for overlay effect
          zIndex: 2,               // Ensure icon is above progress
        }}
      >
        <DeleteIcon color="error" sx={{ fontSize: '20px' }} />
      </IconButton>

      <CircularProgress
        size={48}
        thickness={3}
        sx={{ color: 'error.main' }}
      />
    </Box>
  );
};


export default OrderManagement;
