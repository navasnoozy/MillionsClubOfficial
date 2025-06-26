import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'
import type { RootState } from '../../store/store';


interface NavLinksProps {
  isMobile?: boolean;
  onLinkClick: () => void;
}

export const NavLinks = ({ isMobile = false, onLinkClick }:NavLinksProps) => {
  const pages = useSelector((state: RootState) => state.nav.pages);

  return (
    <>
      {pages.map(page => (
        isMobile ? (
          <MenuItem key={page} onClick={onLinkClick}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ) : (
          <Button key={page} onClick={onLinkClick} sx={{ my: 2, color: 'white', display: 'block' }}>
            {page}
          </Button>
        )
      ))}
    </>
  );
};
