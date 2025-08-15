import { Box } from "@mui/material"
import CloudinaryUploadWidget from "../../../components/uploadWidget"




const AddImageButton = () => {
  return (
     <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }} ><CloudinaryUploadWidget folderName="product" /></Box>
  )
}

export default AddImageButton