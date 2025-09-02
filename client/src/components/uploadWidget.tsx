import { useEffect, useRef, useCallback } from 'react';
import useCloudinaryConfig from '../hooks/useCloudnary';
import { Button } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axiosInstance from '../lib/axios';

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
  onUploadSuccess: (image: { secure_url: string; public_id: string }) => void;
}

const CloudinaryUploadWidget = ({ folderName: folder, onUploadSuccess }: UploadWidgetProps) => {
  const { data: config } = useCloudinaryConfig(folder);
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  const handleUploadResult = useCallback(
    (error: unknown, result: any) => {
      if (error) {
        console.error('Upload error:', error);
        return;
      }
      if (result?.event === 'success') {
        const image = {
          secure_url: result.info.secure_url,
          public_id: result.info.public_id,
        };
        onUploadSuccess?.(image);
      }
    },
    [onUploadSuccess]
  );

  // Dynamic signature generation function
  const generateSignature = useCallback(
    async (callback: (signature: string) => void, paramsToSign: Record<string, any>) => {
      try {
        const response = await axiosInstance.post('/api/image/signature', {
          params: paramsToSign,
        });

        const signature = response.data.data.signature;
        callback(signature);
      } catch (error) {
        console.error('Error generating signature:', error);
      }
    },
    []
  );

  // Creates widget configuration
  const createWidgetConfig = useCallback(() => {
    if (!config) return null;

    return {
      cloudName: config.cloud_name,
      apiKey: config.api_key,
      uploadSignature: generateSignature, // GENERATING SIGNATURE
      uploadPreset: 'Millionsclub-signed-crop', //UPLOAD PRESET NAME CONFIGURED IN CLOUDINARY
      folder,
      sources: ['local', 'url'],
      cropping: true,
      croppingAspectRatio: 1,
      croppingDefaultSelectionRatio: 1,
      showSkipCropButton: false,
      croppingCoordinatesMode: 'custom', // CUSTOM CORDINATION SET IN PRESET IN CLOUDINARY
      transformation: [{ width: 2048, height: 2048, crop: 'fill' }],
      multiple: false,
      maxFiles: 1,
      resourceType: 'image',
      tags: ['temp'],
    };
  }, [config, folder, generateSignature]);

  // Initializes the Cloudinary widget
  const initializeWidget = useCallback(() => {
    const widgetConfig = createWidgetConfig();
    if (!widgetConfig || !window.cloudinary) return;

    try {
      widgetRef.current = window.cloudinary.createUploadWidget(widgetConfig, handleUploadResult);
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
    return Boolean(config);
  }, [config]);

  // Creates button styles
  const getButtonStyles = useCallback(
    () => ({
      minWidth: '32px',
      width: '32px',
      height: '32px',
      backgroundColor: 'rgba(0,0,0,0.6)',
      boxShadow: '0 1px 3px rgba(255, 255, 255, 0.41)',
      padding: '4px',
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
      <AddPhotoAlternateIcon sx={{ fontSize: '20px' }} color="action" />
    </Button>
  );
};

export default CloudinaryUploadWidget;
