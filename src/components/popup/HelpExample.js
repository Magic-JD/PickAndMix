import React from "react";
import { useTranslation } from "react-i18next";

import "./Popup.css";

const HelpExample = ({ goBack }) => {
  const { t } = useTranslation();
  return (
    <div className="help-text">
      <p>
        {t("puzzle-path-title")}
        <br />
        <br />
        {t("puzzle-step-1")} <br />
        {t("puzzle-step-2")} <br />
        {t("puzzle-step-3")} <br />
        {t("puzzle-step-4")} <br />
        {t("puzzle-step-5")} <br />
      </p>
      <button className="button-small-dark" onClick={goBack}>
        {t("back-button")}
      </button>
    </div>
  );
};

export default HelpExample;
