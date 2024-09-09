import React from "react";
import { useTranslation } from "react-i18next";

import "./Popup.css";

const HelpPlay = ({ goBack }) => {
  const { t } = useTranslation();
  return (
    <div className="help-text">
      <p>{t("game-aim")}</p>
      <p>{t("game-rules")}</p>
      <button className="button-small-dark" onClick={goBack}>
        {t("back-button")}
      </button>
    </div>
  );
};

export default HelpPlay;
