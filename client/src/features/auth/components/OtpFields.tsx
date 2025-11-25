import { Stack, TextField, type StackProps } from "@mui/material";
import { forwardRef, useRef } from "react";
import handleClearInput from "../handlers/handleClearInput";
import handleOnChange from "../handlers/handleOnChange";
import handleOnPaste from "../handlers/handleOnPaste";

interface Props extends StackProps {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  error: string;
  verifyStatus: boolean;
  disabled: boolean;
}

const OtpFields = forwardRef<HTMLDivElement, Props>(({ otp, setOtp, error, verifyStatus, disabled, ...stackProps }, ref) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  return (
    <>
      <Stack {...stackProps} ref={ref} direction="row" justifyContent="center" spacing={1}>
        {otp.map((value, index: number) => (
          <TextField
            disabled={disabled}
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={value}
            onChange={(e) => handleOnChange({ otp, setOtp, inputRefs, e, index })}
            onKeyDown={(e) => handleClearInput({ otp, setOtp, inputRefs, e, index })}
            onPaste={(e) => handleOnPaste({ setOtp, inputRefs, e, index })}
            slotProps={slotProps}
            sx={{
              ...sxProps, // spread existing styles
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: 2,
                borderColor: `${error ? "red" : verifyStatus ? "green" : "#c4c4c4"}`,
              },
            }}
          />
        ))}
      </Stack>
    </>
  );
});

OtpFields.displayName = "OtpInputGroup";

export default OtpFields;

const slotProps = {
  htmlInput: {
    maxLength: 1,
    inputMode: "numeric",
    pattern: "[0-9]*",
    autoComplete: "one-time-code",
    autoCorrect: "off",
  },
};

const sxProps = {
  Border: "red",
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
};
