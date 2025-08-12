import { useEffect, useRef } from "react";
import useCloudinarySignature from "../hooks/useCloudnary";
import { Button } from "@mui/material";

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

const UploadWidget = ({ folderName: folder }: { folderName: string }) => {
  const { data } = useCloudinarySignature(folder);

  const widgetRef = useRef<CloudinaryWidget | null>(null);

  useEffect(() => {
    if (!data || !window.cloudinary) return;

    widgetRef.current = window.cloudinary.createUploadWidget(
      {
        cloudName: data.cloud_name,
        uploadSignature: {
          signature: data.signature,
          timestamp: data.timestamp,
        },
        folder,
        sources: ["local", "url"],
        multiple: false,
      },
      (error: unknown, result: any) => {
        if (!error && result?.event === "success") {
          console.log("Upload success! URL:", result.info.secure_url);
        }
      }
    );
  }, [data, folder]);

  return (
    <Button
      onClick={() => widgetRef.current?.open()}
      size="large"
      variant="contained"
    >
      Upload
    </Button>
  );
};

export default UploadWidget;
