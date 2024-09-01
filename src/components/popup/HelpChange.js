import React from "react";

import "./Popup.css";

const HelpPlay = ({ goBack }) => {
  return (
    <div className="help-text">
      <p>
        As you write the words the ones you've chosen will appear above the
        keyboard. You can go back to a previous word by selecting that word.
        <br />
        <br />
        Until you have added a new word, you can still go forward again to your
        previous word if you went back accidentally or decided your original
        choice was the best.
      </p>
      <button className="button-small-dark" onClick={goBack}>
        Go Back
      </button>
    </div>
  );
};

export default HelpPlay;
