import React from "react";
import Cookies from "js-cookie";
import "./Results.css";
import { getYourPuzzleId } from "../utils/TimeUtils";
import { useTranslation } from "react-i18next";

const Results = () => {
  let urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const decrypted = atob(code);
  urlParams = new URLSearchParams(decrypted);
  const id = urlParams.get("i") || 0;
  const futurePuzzle = id > getYourPuzzleId();
  const pastPuzzle = id < getYourPuzzleId();
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
        className={`text-medium ${(!choWords || futurePuzzle) && !pastPuzzle ? "blurred" : ""}`}
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

  const { t } = useTranslation();
  return (
    <div className="end-stack text-medium">
      <div className="text-large results-title">{t("results-title")}</div>
      <div id="time" style={{ textAlign: "center" }}>
        {t("their-time")} {timeText}
        {yourTime !== "" && !futurePuzzle && !pastPuzzle && (
          <span>
            <br />
            {t("your-time")} {yourTime}
          </span>
        )}
      </div>
      <a className="button-small-dark button-end" href="../">
        {t("play-button")}
      </a>
      {!choWords && !futurePuzzle && !pastPuzzle && (
        <div className="motivation">{t("motivation-todays-puzzle")}</div>
      )}
      {futurePuzzle && (
        <div className="motivation">{t("motivation-future-puzzle")}</div>
      )}
      {pastPuzzle && (
        <div className="motivation">{t("motivation-past-puzzle")}</div>
      )}
      <div className="end-container text-medium button-end">
        <div id="their-words" className="end-stack">
          <div>{t("their-words-title")}</div>
          {renderTheirWords()}
        </div>
        {choWords && !futurePuzzle && !pastPuzzle && (
          <div id="your-words" className="end-stack">
            <div>{t("your-words-title")}</div>
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
