//src/components/navbar/UserMenu.tsx
import LoginIcon from "@mui/icons-material/Login";
import { CircularProgress, Stack } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import { navlinks } from "../../../config/navlinks";
import useCurrentUser from "../../../features/auth/hooks/useCurrentUser";
import useSignout from "../../../features/auth/hooks/useSignout";
import AppLink from "../../CustomLink";

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
  const navigate = useNavigate();


  const { data: currentUser } = useCurrentUser();
  const { mutate: signout, isPending } = useSignout();

  const handleSignout = () => {
    onClose();
    signout(undefined, {
      onSuccess: () => {
        navigate("/");
      },
      onError: () => {
        console.log("signout error");
      },
    });
  };

  if (!currentUser) {
    return (
      <Stack direction={"row"} gap={1}>
        <LoginIcon sx={{ display: { xs: "none", md: "inline-block" } }} />
        <AppLink color="white" to={"/signin"}>
          Login
        </AppLink>
      </Stack>
    );
  }

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
        {navlinks.userMenuLinks.map((item) => (
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
        <MenuItem onClick={handleSignout}>
          <Typography
            color="primary"
            sx={{ fontWeight: "bold", fontSize: 20, textWrap: "nowrap" }}
          >
            Logout
          </Typography>
          {isPending && <CircularProgress sx={{ marginLeft: 1 }} size="2rem" />}
        </MenuItem>
      </Menu>
    </>
  );
};
