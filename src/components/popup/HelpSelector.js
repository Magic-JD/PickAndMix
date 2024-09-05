import React from "react";
import { useTranslation } from "react-i18next";

import "./Popup.css";

const HelpSelector = ({ select }) => {
    const { t } = useTranslation();
  return (
    <div className="select-menu">
      <div onClick={() => select("HELP-PLAY")}>{t('how-to-play')}</div>
      <div onClick={() => select("HELP-EXAMPLE")}>{t('example-game')}</div>
      <div onClick={() => select("HELP-CHANGE")}>{t('changing-word-choices')}</div>
      <div onClick={() => select("HELP-SHARE")}>{t('sharing-words')}</div>
    </div>
  );
};

export default HelpSelector;
