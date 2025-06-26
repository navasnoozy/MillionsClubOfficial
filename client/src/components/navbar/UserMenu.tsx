import React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';


interface UserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ anchorEl, open, onOpen, onClose }) => {
  const settings = useSelector((state: RootState) => state.nav.settings);

  return (
    <>
      <Tooltip title="Open settings">
        <IconButton onClick={onOpen} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        onClose={onClose}
      >
        {settings.map(setting => (
          <MenuItem key={setting} onClick={onClose}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};