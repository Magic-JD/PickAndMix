import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import GlobalHeader from "./components/GlobalHeader";
import Results from "./components/Results";
import Settings from "./components/popup/Settings";
import Help from "./components/popup/Help";
import Cookies from "js-cookie";
import { ErrorProvider } from "./context/ErrorContext";

import "./App.css";
import "./i18n";
import { useTranslation } from 'react-i18next';

function App() {
  useEffect(() => {
    // This will refresh the app at midnight to ensure that the user is not caught in an indeterminate state
    refreshAtMidnight();
    const currentLang = Cookies.get("lang") || "en";
    i18n.changeLanguage(currentLang);
  }, []);

  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isHelpVisible, setHelpVisible] = useState(false);
  const { t, i18n } = useTranslation();
  const currentFont = Cookies.get("font");
  if (currentFont) {
    changeFont(currentFont);
  }
  const handleFontChange = (event) => {
    changeFont(event.target.value);
  };

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    Cookies.set("lang", lang);
    window.location.reload();
  };

  const handleLayoutChange = (event) => {
    localStorage.setItem("layout", event.target.value);
  };

  const toggleSettings = () => {
    setSettingsVisible(!isSettingsVisible);
  };

  const toggleHelp = () => {
    setHelpVisible(!isHelpVisible);
  };

  return (
    <Router>
      <ErrorProvider>
        <GlobalHeader toggleSettings={toggleSettings} toggleHelp={toggleHelp} />
        {isSettingsVisible && (
          <Settings
            toggleSettings={toggleSettings}
            changeFont={handleFontChange}
            changeLang={handleLanguageChange}
            changeLayout={handleLayoutChange}
          />
        )}
        {isHelpVisible && <Help toggleHelp={toggleHelp} />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </ErrorProvider>
    </Router>
  );
}

function changeFont(font) {
  Cookies.set("font", font);
  document.documentElement.style.setProperty("--ff-primary", font);
}
function refreshAtMidnight() {
  const timeUntilMidnight = getTimeUntilMidnight();
  setTimeout(() => {
    window.location.reload();
    refreshAtMidnight();
  }, timeUntilMidnight);
}
function getTimeUntilMidnight() {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
}
export default App;
