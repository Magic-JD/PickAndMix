import React from "react";
import "./EndGame.css";
import { calculateTime } from "../utils/TimeUtils";

const Countdown = () => {
    return (
      <div className="flex-stack time-to-next-game">
        <span>Time to next puzzle</span>
        <span>{calculateTime(100000)}</span>
      </div>);
}

export default Countdown;
