import { Stack, TextField, type StackProps } from "@mui/material";
import { forwardRef, type ForwardedRef } from "react";
import { useRef, useState } from "react";

const OtpInputGroup = forwardRef<HTMLDivElement, StackProps>((stackProps, ref: ForwardedRef<HTMLDivElement>) => {

    
  const [otp, setOtp] = useState<string[]>(() => Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <Stack {...stackProps} ref={ref} direction="row" justifyContent="center" spacing={1}>
      {otp.map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          slotProps={{
            htmlInput: {
              maxLength: 1,
              inputMode: "numeric",
              pattern: "[0-9]*",
            },
          }}
          sx={{
            maxWidth: 60,
            mx: 0.5,
            "& .MuiInputBase-root": {
              backgroundColor: "#d8d5d542",
            },
            "& .MuiInputBase-input": {
              height: 60,
              padding: "0 14px",
              boxSizing: "border-box",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "1.5rem",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: 2,
            },
          }}
        />
      ))}
    </Stack>
  );
});

OtpInputGroup.displayName = "OtpInputGroup";

export default OtpInputGroup;
