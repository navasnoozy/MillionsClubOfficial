import { Stack, TextField, type StackProps } from "@mui/material";
import { forwardRef, useRef, useState, type ForwardedRef } from "react";
import handleOnChange from "../handlers/handleOnChange";
import handleClearInput from "../handlers/handleClearInput";
import LinkButton from "../../../components/LinkButton";

const OtpInputGroup = forwardRef<HTMLDivElement, StackProps>((stackProps, ref: ForwardedRef<HTMLDivElement>) => {
  const [otp, setOtp] = useState<string[]>(() => Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <>
      <Stack {...stackProps} ref={ref} direction="row" justifyContent="center" spacing={1}>
        {otp.map((value, index: number) => (
          <TextField
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={value}
            onChange={(e) => handleOnChange({ otp, setOtp, inputRefs, e, index })}
            onKeyDown={(e) => handleClearInput({ otp, setOtp, inputRefs, e, index })}
            slotProps={slotProps}
            sx={sxProps}
          />
        ))}
      </Stack>
      <LinkButton variant="contained" >Verify Account</LinkButton>
    </>
  );
});

OtpInputGroup.displayName = "OtpInputGroup";

export default OtpInputGroup;

const slotProps = {
  htmlInput: {
    maxLength: 1,
    inputMode: "numeric",
    pattern: "[0-9]*",
  },
};

const sxProps = {
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
};
