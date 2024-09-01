import React from "react";

import "./Popup.css";

const Settings = ({ toggleSettings, changeFont, changeLang }) => {
  return (
    <div className="popup">
      <div className="quit">
        <div className="button" onClick={toggleSettings}>
          X
        </div>
      </div>
      <div className="text-medium settings-menu">
        <div className="title">Settings</div>
        <label htmlFor="langSelect">Language:</label>
        <select id="langSelect" value="" onChange={changeLang}>
          <option value="" disabled>
            Select a language
          </option>
          <option value="en">English</option>
          <option value="id">Indonesian</option>
        </select>
        <label htmlFor="fontSelect">Font:</label>
        <select id="fontSelect" value="" onChange={changeFont}>
          <option value="" disabled>
            Select a font
          </option>
          <option value="'Arial', sans-serif">Basic</option>
          <option value="'Concert One', sans-serif">Bubble</option>
          <option value="'JetBrains Mono', monospace">Mono</option>
        </select>
      </div>
    </div>
  );
};

export default Settings;
