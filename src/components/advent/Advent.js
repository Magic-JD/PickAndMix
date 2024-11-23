import React from "react";
import "./Advent.css";
import { useError } from "../../context/ErrorContext";
import { useTranslation } from "react-i18next";

function Advent({
  backToMain,
}) {
  const { showError } = useError();

  const handleBack = () => {
    backToMain();
  };

  const { t } = useTranslation();

  return (
      <div>
      <div className="advent-grid text-medium">
        {
            Array.from({length: 25}, (_, i) => i + 1 ).map(n => <div className="advent-day"> {n} </div>)
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
