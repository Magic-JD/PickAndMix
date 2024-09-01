import React, {useState} from "react";

import "./Popup.css";
import HelpPlay from "./HelpPlay";
import HelpExample from "./HelpExample";
import HelpChange from "./HelpChange";
import HelpShare from "./HelpShare";
import HelpSelector from "./HelpSelector";

const Help = ({ toggleHelp }) => {
  const [helpState, setHelpState] = useState("SELECT");

  const changeState = (newState) => {
    setHelpState(newState);
  };

  const showCurrentState = () => {
    switch (helpState) {
      case "SELECT":
        return <HelpSelector select={changeState} />;
      case "HELP-PLAY":
        return <HelpPlay goBack={() => changeState("SELECT")}/>;
      case "HELP-EXAMPLE":
        return <HelpExample goBack={() => changeState("SELECT")}/>;
      case "HELP-CHANGE":
        return <HelpChange goBack={() => changeState("SELECT")}/>;
      case "HELP-SHARE":
        return <HelpShare goBack={() => changeState("SELECT")}/>;
      default:
        return <HelpSelector select={changeState} />;
    }
  };

  return (
    <div className="popup">
      <div className="quit">
        <div className="button" onClick={toggleHelp}>
          X
        </div>
      </div>
      <div className="help-menu text-small">
        <div className="title">Help</div>
        {showCurrentState()}
      </div>
    </div>
  );
};

export default Help;
