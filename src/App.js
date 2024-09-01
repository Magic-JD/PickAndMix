import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import GlobalHeader from "./components/GlobalHeader";
import Results from "./components/Results";
import Settings from "./components/popup/Settings";
import Help from "./components/popup/Help";
import Cookies from "js-cookie";
import { ErrorProvider } from "./context/ErrorContext";

import "./App.css";

function App() {
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isHelpVisible, setHelpVisible] = useState(false);

  const currentFont = Cookies.get("font");
  if (currentFont) {
    changeFont(currentFont);
  }
  const handleFontChange = (event) => {
    changeFont(event.target.value);
  };

  const handleLanguageChange = (event) => {
    Cookies.set("lang", event.target.value);
    window.location.reload();
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

export default App;
