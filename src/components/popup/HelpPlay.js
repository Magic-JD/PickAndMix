import React from "react";

import "./Popup.css";

const HelpPlay = ({ goBack }) => {
  return (
    <div className="help-text">
      <p>
        <br />
        The aim of the game is to get from your starting word to the final word.
        Each turn make an anagram of the previous word and change one letter.
        The two words will change every day, and you need a maximum of 5 steps
        to get from the first to the final word.
      </p>
      <button className="button-small-dark" onClick={goBack}>Go Back</button>
    </div>
  );
};

export default HelpPlay;
