import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { NavLinks } from './NavLinks';
import { UserMenu } from './UserMenu';
import { Box } from '@mui/material';
import { useState } from 'react';

export const NavBar: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo variant="desktop" />
          <MobileMenu
            anchorElNav={anchorElNav}
            open={Boolean(anchorElNav)}
            onOpen={handleOpenNavMenu}
            onClose={handleCloseNavMenu}
          />
          <Logo variant="mobile" />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <NavLinks onLinkClick={handleCloseNavMenu} />
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <UserMenu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onOpen={handleOpenUserMenu}
              onClose={handleCloseUserMenu}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
