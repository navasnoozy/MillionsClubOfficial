import { Stack, Typography, Divider as Br } from "@mui/material"





const Divider = () => {
  return (
      <Stack m={2} direction="row" alignItems='center' justifyContent="space-between">
        <Br sx={{ width: "100px" }} /> <Typography fontSize="small" color="gray">Or Login with</Typography> <Br sx={{ width: "100px" }} />
      </Stack>
  )
}

export default Divider