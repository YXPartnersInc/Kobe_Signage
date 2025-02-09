import { useEffect, useState } from "react";

const MILLISECOND = 0.001;
const DEFAULT_QUAKE_TIME = 10.03;

const QuakeCountdown = () => {
  const [quakeTime, setQuakeTime] = useState(DEFAULT_QUAKE_TIME);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setQuakeTime((prevTime) => {
        const newTime = prevTime - 10 * MILLISECOND;
        return newTime > 0 ? newTime : 0;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, []);

};

export default QuakeCountdown;