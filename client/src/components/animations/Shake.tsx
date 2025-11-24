import { motion, useAnimation } from "motion/react";
import { type ReactNode, useEffect } from "react";

const shakeConfig = {
  x: [0, -6, 6, -6, 6, 0],
  transition: {
    duration: 0.35,
    easing: ["ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out"],
  },
};

interface Props {
  // We use a number here. Every time it increments, we shake.
  shouldShake: number; 
  children: ReactNode;
}

export const Shake = ({ shouldShake, children }: Props) => {
  const controls = useAnimation();

  useEffect(() => {
    // Only shake if the trigger number is greater than 0
    if (shouldShake > 0) {
      controls.start(shakeConfig);
    }
  }, [shouldShake, controls]);

  return (
    <motion.div animate={controls}>
      {children}
    </motion.div>
  );
};