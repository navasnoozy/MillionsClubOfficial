//src/components/navbar/MobileMenu.tsx
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  anchorElNav: HTMLElement | null;
  open: boolean;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
}

export const MobileMenu = ({
  anchorElNav,
  open,
  onOpen,
  onClose,
}: MobileMenuProps) => (
  <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
    <IconButton
      size="large"
      aria-label="open navigation menu"
      onClick={onOpen}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
    <Menu
      anchorEl={anchorElNav}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={open}
      onClose={onClose}
      sx={{ display: { xs: "block", md: "none" } }}
    >
      <NavLinks isMobile onLinkClick={onClose} />
    </Menu>
  </Box>
);
