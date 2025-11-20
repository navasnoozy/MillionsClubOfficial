import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

const Flip = ({ children, key }: { children: ReactNode; key: string }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial={{ opacity: 0, rotateX: 90, y: 20, transformPerspective: 600 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        exit={{ opacity: 0, rotateX: -90, y: -20 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};


export default Flip