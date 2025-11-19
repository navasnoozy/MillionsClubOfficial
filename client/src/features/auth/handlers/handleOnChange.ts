import React, { type ChangeEvent } from "react";

type OnChangeEvent = {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
  index: number;
};

const handleOnChange = ({ otp, setOtp, inputRefs, e, index }: OnChangeEvent) => {
  let newValue = e.target.value;

  if (newValue.length > 1) {
    newValue.charAt(0);
  }

  setOtp((prev) => {
    const updated = [...prev];
    updated[index] = newValue;

    return updated;
  });

  if (newValue !== "" && index < otp.length - 1) {
    const nextInput = inputRefs.current[index + 1];

    nextInput?.focus();
    nextInput?.select();
  }
};

export default handleOnChange;
