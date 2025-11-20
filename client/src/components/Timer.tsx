import { useEffect, useRef } from "react";

interface TimerProps {
  time: number;
  running: boolean;
  onTick: () => void;
  onFinish: () => void;
}

const Timer = ({ time, running, onTick, onFinish }: TimerProps) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = window.setInterval(() => {
      if (time <= 1) {
        onFinish();
        return;
      }
      onTick();
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [running, time]);
  return null;
};

export default Timer;
