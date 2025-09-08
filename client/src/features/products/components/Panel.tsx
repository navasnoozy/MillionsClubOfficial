import { Box } from "@mui/material"
import LinkButton from "../../../components/LinkButton"



const Panel = () => {
  return (
   <Box sx={{ display:'flex', justifyContent:'space-between'}}>
      <LinkButton to='/admin' size="small" variant="contained" color="primary">   Dashboard</LinkButton>
        <LinkButton to='/admin/addproduct' size="small" variant="contained" color="primary">   Add Product</LinkButton>
        
    </Box>
  )
}

export default Panel