import React from "react";
import Cookies from "js-cookie";
import "./Results.css";
import { getYourPuzzleId } from "../utils/TimeUtils"

const Results = () => {
  let urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const decrypted = atob(code);
  urlParams = new URLSearchParams(decrypted);
  const id = urlParams.get("i") || 0;
  const futurePuzzle = id > getYourPuzzleId();
  let time = urlParams.get("t");
  let theirWords = urlParams.get("w");
  theirWords = theirWords.split(":");
  let choWords = Cookies.get("chosen-words");
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
      <div
        key={index}
        className={`text-medium ${!choWords || futurePuzzle ? "blurred" : ""}`}
      >
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
      <div id="time" style={{ textAlign: "center" }}>
        Their Time: {timeText}
        {yourTime != "" && !futurePuzzle && (
          <span>
            <br />
            Your Time: {yourTime}
          </span>
        )}
      </div>
      <a className="button-small-dark button-end" href="../">
        Play
      </a>
      {!choWords && !futurePuzzle && (
        <div className="motivation">Solve todays puzzle to see their words</div>
      )}
      {futurePuzzle && (
        <div className="motivation">
          Solve this puzzle when it becomes available in your time zone
        </div>
      )}
      <div className="end-container text-medium button-end">
        <div id="their-words" className="end-stack">
          <div>Their Words</div>
          {renderTheirWords()}
        </div>
        {choWords && !futurePuzzle && (
          <div id="your-words" className="end-stack">
            <div>Your Words</div>
            {renderYourWords()}
          </div>
        )}
      </div>
    </div>
  );
};

function timeToString(time) {
  const seconds = Math.trunc(time / 1000);
  const minutes = Math.trunc(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes + "m " + remainingSeconds + "s";
}


export default Results;
