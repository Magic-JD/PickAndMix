import React from "react";

import "./Popup.css";

const Help = ({ toggleHelp }) => {
  return (
    <div className="popup">
      <div className="quit">
        <div className="button" onClick={toggleHelp}>
          X
        </div>
      </div>
      <div className="help-menu text-small">
        <div className="title">Help</div>
        <div className="help-text">
                <p>
            <br />
            The aim of the game is to get from your starting word to the final word. Each turn make an anagram of the previous word and change one letter. The two words will change every day, and you need a maximum of 5 steps to get from the first to the final word.<br /><br />
      For example: With the starting word OUGHT and the goal word SPEAK<br /><br />
      OUGHT - SOUTH (changing G to S) <br />
      SOUTH - THOSE (changing U to E) <br />
      THOSE - HATES (changing O to A) <br />
      HATES - SHAKE (changing T to K) <br />
      SHAKE - SPEAK (changing H to P) <br /><br />
      <br />As you write the words the ones you've chosen will appear above the keyboard. You can go back to a previous word by selecting that word. Once you have finished the puzzle you can share with friends by clicking on the share button and then pasting the link into your social media.
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
