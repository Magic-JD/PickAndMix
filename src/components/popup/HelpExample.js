import React from "react";

import "./Popup.css";

const HelpExample = ({ goBack }) => {
  return (
    <div className="help-text">
      <p>
        With the starting word OUGHT and the goal word SPEAK
        <br />
        <br />
        OUGHT - SOUTH (changing G to S) <br />
        SOUTH - THOSE (changing U to E) <br />
        THOSE - HATES (changing O to A) <br />
        HATES - SHAKE (changing T to K) <br />
        SHAKE - SPEAK (changing H to P) <br />
      </p>
      <button className="button-small-dark" onClick={goBack}>Go Back</button>
    </div>
  );
};

export default HelpExample;
