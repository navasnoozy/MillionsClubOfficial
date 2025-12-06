import { Box, InputBase,  } from "@mui/material";

const SearchBar = () => {
  return (
    <Box
      component="form"
      sx={{
        p: "2px 4px",
        border: "1px solid",
        borderColor: "divider", // MUI’s subtle system color
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        maxWidth:500
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search users..." inputProps={{ "aria-label": "search-users" }} />
    </Box>
  );
};

export default SearchBar;

{
  /* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */
}
{
  /* <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton> */
}
