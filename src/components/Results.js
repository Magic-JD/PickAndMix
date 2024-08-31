import React from "react";
import Cookies from "js-cookie";
import "./Results.css";

const Results = () => {
  let urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    const decrypted = hexToString(code);
    urlParams = new URLSearchParams(decrypted);
  }
  let score = urlParams.get("score");
  let time = urlParams.get("time");
  let theirWords = urlParams.get("words");
  theirWords = theirWords.split(":");
  let choWords = Cookies.get("chosen-words");
  const yourScore = Cookies.get("score");
  const yourTimeStartNs = Cookies.get("startTime");
  const yourTimeEndNs = Cookies.get("endTime");
  let yourTime = "";
  if (yourTimeEndNs) {
    yourTime = timeToString(yourTimeEndNs - yourTimeStartNs);
  }
  let previousWords = [];
  if (choWords) {
    previousWords = choWords.split(",");
  }

  const timeText = timeToString(time);
  const renderTheirWords = () => {
    return theirWords.map((value, index) => (
      <div key={index} className={`text-medium ${!choWords ? "blurred" : ""}`}>
        {value}
      </div>
    ));
  };

  const renderYourWords = () => {
    return previousWords.map((value, index) => (
      <div key={index} className="text-medium">
        {value}
      </div>
    ));
  };

  return (
    <div className="end-stack text-medium">
      <div className="text-large results-title">Shared Results</div>
      <div id="score" style={{ textAlign: "center" }}>
        Their Score: {score}{yourScore && <span><br />Your Score: {yourScore}</span>}
      </div>
      <div id="time" style={{ textAlign: "center" }}>
        Their Time: {timeText}{yourTime != "" && <span><br />Your Time: {yourTime}</span>}
      </div>
      <a className="button-small-dark button-end" href="../">
        Play
      </a>
      {!choWords && (
        <div className="motivation">Solve todays puzzle to see their words</div>
      )}
      <div className="end-container text-medium button-end">
        <div id="their-words" className="end-stack">
          <div>Their Words</div>
          {renderTheirWords()}
        </div>
        <div id="your-words" className="end-stack">
          <div>Your Words</div>
          {renderYourWords()}
        </div>
      </div>
    </div>
  );
};

function hexToString(hex) {
  let str = "";
  for (let i = 0; i < hex.length; i += 2) {
    let hexCode = hex.substr(i, 2);
    let charCode = parseInt(hexCode, 16);
    str += String.fromCharCode(charCode);
  }
  return str;
}

function timeToString(time) {
  const seconds = Math.trunc(time / 1000);
  const minutes = Math.trunc(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes + "m " + remainingSeconds + "s";
}
export default Results;
