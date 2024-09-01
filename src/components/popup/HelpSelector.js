import React from "react";

import "./Popup.css";

const HelpSelector = ({ select }) => {
  return (
    <div className="select-menu">
      <div onClick={ () => select("HELP-PLAY") }>How to Play</div>
      <div onClick={ () => select("HELP-EXAMPLE") }>Example Game</div>
      <div onClick={ () => select("HELP-CHANGE") }>Changing your word choices</div>
      <div onClick={ () => select("HELP-SHARE") }>Sharing your words</div>
    </div>
  );
};

export default HelpSelector;
