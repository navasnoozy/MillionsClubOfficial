import ImageListItem from "@mui/material/ImageListItem";
import AddImageButton from "../features/products/components/AddImageButton";
import { Box } from "@mui/material";

const ImageFrame = () => {
  const images = Array(4).fill("https://picsum.photos/600/600");

  return (
    <>
      {images.map((src, index) => (
        <ImageListItem
          key={index}
          cols={index === 0 ? 3 : 1}
          rows={index === 0 ? 2 : 1}
          sx={{
            position: "relative",
            "&:hover .add-image-btn": { opacity: 1 },
          }}
        >
          <Box
            component="img"
            src={'/imageplaceholder.png'}
            alt="image"
            loading="lazy"
            sx={{
              objectFit: "unset",
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
          <AddImageButton />
        </ImageListItem>
      ))}
    </>
  );
};

export default ImageFrame;
