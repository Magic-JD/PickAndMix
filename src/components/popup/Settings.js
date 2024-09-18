import React from "react";
import { useTranslation } from "react-i18next";

import "./Popup.css";

const Settings = ({ toggleSettings, changeFont, changeLang, changeLayout }) => {
  const { t } = useTranslation();
  return (
    <div className="popup">
      <div className="quit">
        <div className="button" onClick={toggleSettings}>
          X
        </div>
      </div>
 <div className="text-medium settings-menu">
        <div className="title">{t('settings-title')}</div>
        <label htmlFor="langSelect">{t('language-label')}</label>
        <select id="langSelect" value="" onChange={changeLang}>
          <option value="" disabled>
            {t('language-placeholder')}
          </option>
          <option value="en">{t('language-en')}</option>
          <option value="id">{t('language-id')}</option>
          <option value="uk">{t('language-uk')}</option>
        </select>
        <label htmlFor="fontSelect">{t('font-label')}</label>
        <select id="fontSelect" value="" onChange={changeFont}>
          <option value="" disabled>
            {t('font-placeholder')}
          </option>
          <option value="'Arial', sans-serif">{t('font-basic')}</option>
          <option value="'Concert One', sans-serif">{t('font-bubble')}</option>
          <option value="'JetBrains Mono', monospace">{t('font-mono')}</option>
        </select>
        <label htmlFor="layoutSelect">{t('layout-label')}</label>
        <select id="layoutSelect" value="" onChange={changeLayout}>
          <option value="" disabled>
            {t('layout-placeholder')}
          </option>
          <option value="STANDARD">{t('layout-standard')}</option>
          <option value="INVERTED">{t('layout-inverted')}</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
