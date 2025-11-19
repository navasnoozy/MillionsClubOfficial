import React, { type KeyboardEvent } from "react";

type KeyPressEvent = {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  e: KeyboardEvent<HTMLDivElement | HTMLInputElement>;
  index: number;
};

const handleClearInput = ({ otp, setOtp, inputRefs, e, index }: KeyPressEvent) => {
  if (e.key === "Backspace") {
    e.preventDefault();

    const inputValue = otp[index];

    setOtp((prev) => {
      const updated = [...prev];
      if (inputValue) {
        updated[index] = "";
        return updated;
      } else {
        const inputField = inputRefs.current[index - 1];
        inputField?.focus();
        inputField?.select();
        return updated;
      }
    });
  }
};

export default handleClearInput;
