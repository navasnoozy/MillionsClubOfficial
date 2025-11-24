import React, { type ClipboardEvent } from "react";

type OnPasteEvent = {
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  inputRefs: React.RefObject<(HTMLInputElement | null)[]>;
  e: ClipboardEvent<HTMLDivElement | HTMLInputElement>;
  index: number;
};

const handleOnPaste = ({ setOtp, inputRefs, e, index }: OnPasteEvent) => {
  e.preventDefault();

  const pastedText = e.clipboardData.getData("text").replace(/\s+/g, "");
  if (!pastedText) return;

  const chars = pastedText.split("");

  let lastPos = index;

  setOtp((prev) => {
    const updated = [...prev];
    let pos = index;

    for (const ch of chars) {
      if (pos >= updated.length) break; 
      updated[pos] = ch.charAt(0);
      lastPos = pos; 
      pos++;
    }

    return updated;
  });

  // Move focus to last inserted character
  const nextInput = inputRefs.current[lastPos];
  nextInput?.focus();
  nextInput?.select();
};

export default handleOnPaste;
