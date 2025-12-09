//src/components/SearchBar.tsx
import { Box, InputBase } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <Box

      sx={{
        p: "2px 4px",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 50,
        display: "flex",
        alignItems: "center",
        maxWidth: 500,
      }}
    >
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search users..." value={value} onChange={(e) => onChange(e.target.value)} inputProps={{ "aria-label": "search-users" }} />
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
