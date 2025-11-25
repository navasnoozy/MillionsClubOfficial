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
  shouldShake: number; 
  children: ReactNode;
}

export const Shake = ({ shouldShake, children }: Props) => {
  const controls = useAnimation();

  useEffect(() => {
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