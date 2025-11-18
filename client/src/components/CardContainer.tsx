import { Card, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
  heading?: string;
  icon?: ReactNode
  children: ReactNode;
}

const CardContainer = ({ heading,icon, children }: Props) => {
  return (
    <Card
      variant="outlined"
      
      sx={{
        p: 4,
        width: { xs: '90%', sm: 'fit-content' },
        minWidth: { sm: '400px' },
        mx: 'auto',
        borderRadius: '8px',
        display: 'inline-block',
        // boxShadow: '0 1px 4px rgba(228, 223, 220, 0.63)',
      }}
    >    {icon}
      <Typography sx={{ fontSize: 30 }} fontWeight="bold" mb={3}>
        {heading}
      </Typography>
  
      {children}
    </Card>
  );
};

export default CardContainer;
