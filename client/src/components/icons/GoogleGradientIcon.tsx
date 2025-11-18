import { SvgIcon, type SvgIconProps } from "@mui/material";

export default function GoogleIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 48 48">
      {/* Blue - Top Right */}
      <path
        fill="#4285F4"
        d="M24 9.5c3.54 0 6.71 1.16 9.22 3.11l6.97-6.97C35.35 2.09 29.91 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.11 17.74 9.5 24 9.5z"
      />
      {/* Red - Top */}
      <path
        fill="#EA4335"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      {/* Yellow - Bottom Left */}
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      {/* Green - Bottom Right */}
      <path
        fill="#34A853"
        d="M24 48c5.91 0 11.35-2.09 15.19-5.64l-7.73-6c-2.05 1.37-4.76 2.19-7.46 2.19-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      {/* White center (Google "G" letter) - Optional if using full logo */}
      <path
        fill="#FFFFFF"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18v6h7.73c4.51-4.18 7.09-10.36 7.09-17.65z"
        opacity="0"
      />
    </SvgIcon>
  );
}