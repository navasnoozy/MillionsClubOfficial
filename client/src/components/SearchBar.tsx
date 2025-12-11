//src/components/SearchBar.tsx
import { Box, debounce, InputBase } from "@mui/material";
import { useMemo, useState, type ChangeEvent } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>();

  const debouncedUpdate = useMemo(() => {
    return debounce((value: string) => {
      onSearch(value);
    }, 500);
  }, [searchQuery]);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchQuery(newValue);
    debouncedUpdate(newValue);
  };

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
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search users..." value={searchQuery} onChange={handleOnChange} inputProps={{ "aria-label": "search-users" }} />
    </Box>
  );
};

export default SearchBar;
