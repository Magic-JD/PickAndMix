import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import GlobalHeader from "./components/GlobalHeader";
import Results from "./components/Results";
import Settings from "./components/Settings";
import Help from "./components/Help";
import Cookies from "js-cookie";
import { ErrorProvider } from './context/ErrorContext';

import "./App.css";

function App() {
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [isHelpVisible, setHelpVisible] = useState(false);

  const handleFontChange = (event) => {
    document.documentElement.style.setProperty(
      "--ff-primary",
      event.target.value,
    );
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
        <GlobalHeader
          toggleSettings={toggleSettings}
          toggleHelp={toggleHelp}
        />
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

export default App;
