export  interface CloudinarySignatureResponse {
  timestamp: number;
  signature: string;
  cloud_name: string;
  api_key: string;
  folder?: string;
}
