import React from "react";

import "./GlobalHeader.css"

const GlobalHeader = ( { toggleSettings, toggleHelp } ) => {
    return (
    <div className="flex-container bar">
        <button id="help-button" className="icon right-pushed">
          <img
            id="help-image"
            src="images/help.png"
            alt="Help"
            onClick={toggleHelp}
          />
        </button>
        <button id="settings-button" className="icon">
          <img
            id="settings-image"
            src="images/settings.png"
            alt="Settings"
            onClick={toggleSettings}
          />
        </button>
</div>
    );
}

export default GlobalHeader;
