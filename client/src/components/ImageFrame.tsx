import ImageListItem from "@mui/material/ImageListItem";
import AddImageButton from "../features/products/components/AddImageButton";

const ImageFrame = () => {
  return (
    <>
      {/* Big image - spans 3 cols and 2 rows */}
      <ImageListItem cols={3} rows={2} sx={{ position: "relative" }}>
        <img
          src={"https://picsum.photos/600/600"} // bigger size ratio
          alt="image"
          loading="lazy"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
         <AddImageButton />
      </ImageListItem>

      {/* Three smaller images */}
      <ImageListItem cols={1} rows={1}>
        <img
          src={"https://picsum.photos/600/600"}
          alt="image"
          loading="lazy"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <AddImageButton />
      </ImageListItem>
      <ImageListItem cols={1} rows={1}>
        <img
          src={"https://picsum.photos/600/600"}
          alt="image"
          loading="lazy"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
           <AddImageButton />
      </ImageListItem>
      <ImageListItem cols={1} rows={1}>
        <img
          src={"https://picsum.photos/600/600"}
          alt="image"
          loading="lazy"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
           <AddImageButton />
      </ImageListItem>
    </>
  );
};

export default ImageFrame;
