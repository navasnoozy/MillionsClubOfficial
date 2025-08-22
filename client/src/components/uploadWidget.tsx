import { useEffect, useRef, useCallback } from 'react';
import useCloudinarySignature from '../hooks/useCloudnary';
import { Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
   

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


interface UploadWidgetProps {
  folderName: string;
  onUploadSuccess: (image:{url:string, publicId:string})=> void
 
}

const CloudinaryUploadWidget = ({ folderName: folder, onUploadSuccess }: UploadWidgetProps) => {
  const { data } = useCloudinarySignature(folder);
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  const handleUploadResult = useCallback((error: unknown, result: any) => {
    if (error) {
      console.error('Upload error:', error);
      return;
    }
    if (result?.event === 'success') {
      const image = {
        url: result.info.secure_url,
        publicId: result.info.public_id
      };
      onUploadSuccess?.(image)
    }
  }, [onUploadSuccess]);

  // Creates widget configuration
  const createWidgetConfig = useCallback(() => {
    if (!data) return null;

    return {
      cloudName: data.cloud_name,
      apiKey: data.api_key,
      uploadSignature: data.signature,
      uploadSignatureTimestamp: data.timestamp,
      folder,
      sources: ['local', 'url'],
      multiple: true,
      maxFiles: 1,
      resourceType: 'image', // or "auto" for all file types
    };
  }, [data, folder]);

  // Initializes the Cloudinary widget
  const initializeWidget = useCallback(() => {
    const config = createWidgetConfig();
    if (!config || !window.cloudinary) return;

    try {
      widgetRef.current = window.cloudinary.createUploadWidget(config, handleUploadResult);
      console.log('Cloudinary upload widget created successfully');
    } catch (error) {
      console.error('Error creating cloudinary widget:', error);
    }
  }, [createWidgetConfig, handleUploadResult]);

  // Handles button click to open widget
  const handleButtonClick = useCallback(() => {
    widgetRef.current?.open();
  }, []);

  // Determines if widget is ready to use
  const isWidgetReady = useCallback(() => {
    return Boolean(data);
  }, [data]);

  // Creates button styles
  const getButtonStyles = useCallback(
    () => ({
      maxWidth: '50px',
      height: '50px',
      backgroundColor: 'rgba(0,0,0,0.6)',
      boxShadow: '0 1px 3px rgba(255, 255, 255, 0.41)',
    }),
    []
  );

  useEffect(() => {
    initializeWidget();
  }, [initializeWidget]);

  return (
    <Button
      onClick={handleButtonClick}
      variant="contained"
      disabled={!isWidgetReady()}
      component="span"
      sx={getButtonStyles()}
    >
      <AddPhotoAlternateIcon color="action" />
    </Button>
  );
};

export default CloudinaryUploadWidget;
