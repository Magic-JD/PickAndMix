import React from "react";
import "./WelcomeScreen.css";
import { useTranslation } from "react-i18next";

const WelcomeScreen = ({ onStartClick }) => {
  const { t } = useTranslation();
  return (
    <div id="view" className="view">
      <div id="attacher" className="text-medium"></div>
      <div className="flex-stack">
        <div id="heading" className="heading">
          <h1 className="landing-text text-xl">Pick and Mix 🍬</h1>
          <div className="flex-stack">
            <div className="letter">N</div>
            <div className="animation-holder flex-container">
              {["N", "S", "C", "A", "L", "E", "N"].map((letter, index) => (
                <div key={index} className={`letter${index > 0 ? index : ""}`}>
                  {letter}
                </div>
              ))}
            </div>
            <div className="letter">N</div>
          </div>
          <div className="flex-container">
            <button
              id="start-button"
              className="button-small-dark"
              onClick={onStartClick}
            >
              {t("start")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
