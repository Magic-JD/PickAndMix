import "./Advent.css";
import { useError } from "../../context/ErrorContext";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function AdventDay({ number, playDay }) {
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    const savedState = localStorage.getItem(`advent-day-${number}`);
    if (savedState) {
      setIsComplete(true);
    }
  }, [number]);
  const { showError } = useError();

  const { t } = useTranslation();

  const handleClick = () => {
    if (new Date().getDate() < number) {
      showError(`It is not day ${number} yet`);
    } else {
      playDay(number);
    }
  };

  return (
    <div
      key={`advent-day-${number}`}
      className={`advent-day ${isComplete ? "completed" : ""}`}
      onClick={handleClick}
    >
      {" "}
      {number}{" "}
    </div>
  );
}

export default AdventDay;
