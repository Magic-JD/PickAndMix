import React from "react";
import { useTranslation } from "react-i18next";

import "./Popup.css";

const HelpShare = ({ goBack }) => {
  const { t } = useTranslation();
  return (
    <div className="help-text">
      <p>{t("share-instructions")}</p>
      <button className="button-small-dark" onClick={goBack}>
      {t('back-button')}
      </button>
    </div>
  );
};

export default HelpShare;
