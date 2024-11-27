import React from "react";
import "./Advent.css";
import { useError } from "../../context/ErrorContext";
import { useTranslation } from "react-i18next";

function AdventDay({
  number,
  playDay
}) {
  const { showError } = useError();

  const { t } = useTranslation();

  const handleClick  = () => { 
      if(  new Date().getDate() < number ) {
          showError(`It is not day ${number} yet`);
      } else {
          playDay(number);
      } };

  return (
        <div key={`advent-day-${number}`} className="advent-day" onClick={ handleClick }> {number} </div>
  );
}

export default AdventDay;
