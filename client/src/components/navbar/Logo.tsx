import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Typography from "@mui/material/Typography";
import useAppNavigate from '../../hooks/useAppNavigate';

export const Logo = ({ variant }: { variant: "desktop" | "mobile" }) => {
  const {goHome} = useAppNavigate()

 return (
  <>
    <ShoppingBasketIcon
      sx={{
        display: {
          xs: variant === "mobile" ? "flex" : "none",
          md: variant === "desktop" ? "flex" : "none",
        },
        mr: 1,
      }}
    />

    <Typography
      variant={variant === "desktop" ? "h6" : "h5"}
      noWrap
      component="a"
      onClick={()=>goHome()}
      sx={{
        mr: 2,
        display: {
          xs: variant === "mobile" ? "flex" : "none",
          md: variant === "desktop" ? "flex" : "none",
        },
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: ".3rem",
        color: "inherit",
        textDecoration: "none",
        flexGrow: variant === "mobile" ? 1 : 0,
      }}
    >
       MILLIONSCLUB
    </Typography>

  </>
)
};
