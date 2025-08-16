import { Box } from "@mui/material";
import CloudinaryUploadWidget from "../../../components/uploadWidget";

const AddImageButton = () => {
  return (
    <Box
      className="add-image-btn"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <CloudinaryUploadWidget folderName="prido" />
    </Box>
  );
};

export default AddImageButton;
