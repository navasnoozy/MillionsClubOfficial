import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import AppLink from "../CustomLink";
import { CircularProgress } from "@mui/material";
import axiosInstance from "../../lib/axios";
import { useNavigate } from 'react-router';

interface UserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  anchorEl,
  open,
  onOpen,
  onClose,
}) => {
  const links = useSelector((state: RootState) => state.nav.userMenuLinks);

  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()

  const logout = async () => {
    setLoading(true);
    try {
      await axiosInstance.get("/api/users/signout");
      navigate('/dashboard')
    } catch (error) {
      console.log("An error occured while logout", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={onOpen} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={onClose}
      >
        {links.map((item) => (
          <MenuItem key={item.label} onClick={onClose}>
            <AppLink
              width={100}
              sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
              to={item.to}
            >
              {item.label}
            </AppLink>
          </MenuItem>
        ))}
        <MenuItem onClick={logout}>
          <Typography
            color="primary"
            sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
          >
            Logout
          </Typography>
          {isLoading && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
        </MenuItem>
      </Menu>
    </>
  );
};
