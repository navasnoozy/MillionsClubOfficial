import { useEffect, useRef } from "react";
import useCloudinarySignature from "../hooks/useCloudnary";
import { Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: Record<string, any>,
        callback: (error: unknown, result: any) => void
      ) => CloudinaryWidget;
    };
  }
}

interface CloudinaryWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

const CloudinaryUploadWidget = ({
  folderName: folder,
}: {
  folderName: string;
}) => {
  const { data } = useCloudinarySignature(folder);
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  useEffect(() => {
    if (!data || !window.cloudinary) return;

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: data.cloud_name,
        uploadSignature: data.signature,
        uploadSignatureTimestamp: data.timestamp,
        folder,
        sources: ["local", "url"],
        multiple: false,
        maxFiles: 1,
        resourceType: "image", // or "auto" for all file types
      },
      (error: unknown, result: any) => {
        if (error) {
          console.error("Upload error:", error);
          return;
        }
        if (result?.event === "success") {
          console.log("Upload success! URL:", result.info.secure_url);
        }
      }
    );
  }, [data, folder]);

  return (
    <Button
      onClick={() => widgetRef.current?.open()}
      variant="contained"
      disabled={!data}
      component="span"
      sx={{
        maxWidth: "50px",
        height: "50px",
        backgroundColor: "rgba(0,0,0,0.6)",
        boxShadow: "0 1px 3px rgba(255, 255, 255, 0.41)",
      }}
    >
      <AddPhotoAlternateIcon color="action" />
    </Button>
  );
};

export default CloudinaryUploadWidget;
