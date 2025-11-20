import { motion } from "motion/react";
import { type ReactNode } from "react";

const shake = {
  animate: {
    x: [0, -6, 6, -6, 6, 0],
    transition: {
      duration: 0.35,
      easing: ["ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out"],
    },
  },
};

interface Props {
  verifyStatus: boolean;
  children: ReactNode;
}

export const Shake = ({ verifyStatus, children }: Props) => {
  return (
    <motion.div key={verifyStatus ? "ok" : "error"} animate={!verifyStatus ? shake.animate : undefined}>
      {children}
    </motion.div>
  );
};
