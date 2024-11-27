import React from "react";
import "./Advent.css";
import AdventDay from "./AdventDay"
import { useError } from "../../context/ErrorContext";
import { useTranslation } from "react-i18next";

function Advent({
  backToMain,
    playDay
}) {
  const { showError } = useError();

  const handleBack = () => {
    backToMain();
  };

  const { t } = useTranslation();

  return (
      <div className="flex-stack">
      <div className="advent-grid text-large">
        {
            Array.from({length: 44}, (_, i) => i + 1 ).map(n => <AdventDay number={n} playDay={playDay}/>)
        }
      </div>
          <button
            className="button-small-dark button-end"
            onClick={handleBack}
          >
            {t("back-button")}
          </button>
      </div>
  );
}

export default Advent;
