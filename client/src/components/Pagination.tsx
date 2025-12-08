import { Pagination as MuiPagination, Stack } from "@mui/material";

interface Props {
  itemCount: number | string;
  limit: number | string;
  onChangePage: (key: string, value: string) => void;
}

export const Paginations = ({ itemCount, limit, onChangePage }: Props) => {
  const pagecount = Math.ceil(Number(itemCount) / Number(limit));

  return (
    <Stack mt={2} spacing={2} alignItems={"center"}>
      <MuiPagination onChange={(_e, page) => onChangePage("page", String(page))} count={pagecount } variant="outlined" shape="rounded" />
    </Stack>
  );
};

export default Paginations;
