import React, { useState, useEffect } from "react";
import "./EndGame.css";
import { calculateTime, getTimeUntilMidnight } from "../utils/TimeUtils";

const Countdown = () => {
  const [time, setTime] = useState(getTimeUntilMidnight());
  useEffect(() => {
    countdown(setTime);
  }, []);
  return (
    <div className="flex-stack time-to-next-game">
      <span>Time to next puzzle</span>
      <span>{calculateTime(time)}</span>
    </div>
  );
};

function countdown(setTimeFunction) {
  setTimeFunction(getTimeUntilMidnight);
  setTimeout(() => {
    countdown(setTimeFunction);
  }, 1000);
}

export default Countdown;
