import React from "react";

import "./Popup.css";

const HelpShare = ({ goBack }) => {
  return (
    <div className="help-text">
      <p>
        Once you have finished the puzzle you can share with friends by clicking
        on the share button and then pasting the link into your social media.
        <br />
      </p>
      <button className="button-small-dark" onClick={goBack}>Go Back</button>
    </div>
  );
};

export default HelpShare;
