import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./EndGame.css";
import { calculateTime, getTimeUntilMidnight } from "../utils/TimeUtils";

const Countdown = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState(getTimeUntilMidnight());
  useEffect(() => {
    countdown(setTime);
  }, []);
  return (
    <div className="flex-stack time-to-next-game">
      <span>{t("time-to-next-puzzle")}</span>
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
