import { motion } from "motion/react";

export const AnimatedTick = () => {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2e7d32"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M4 12 L9 17 L20 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 1,
        }}
      />
    </motion.svg>
  );
};
