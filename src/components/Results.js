import React from "react";
import Cookies from "js-cookie";
import "./Results.css";
import Countdown from "./Countdown";
import { getYourPuzzleId, calculateTime } from "../utils/TimeUtils";
import { useTranslation } from "react-i18next";

const Results = () => {
  const { t } = useTranslation();
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
    yourTime = calculateTime(t, yourTimeEndNs - yourTimeStartNs);
  }
  let previousWords = [];
  if (choWords) {
    previousWords = choWords.split(",");
  }

  const timeText = calculateTime(t, time);
  const idSame = Number(id) === getYourPuzzleId();
  const timeSame = Number(time) === yourTimeEndNs - yourTimeStartNs;
  const wordsSame = theirWords.toString() === previousWords.toString();
  const ownSolve = idSame && timeSame && wordsSame;
  const renderTheirWords = () => {
    return theirWords.map((value, index) => (
      <div
        key={index}
        className={`text-medium ${(!choWords && !pastPuzzle) || futurePuzzle ? "blurred" : ""}`}
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
      <div className="text-large results-title">{t("results-title")}</div>
      <div id="time" style={{ textAlign: "center" }}>
        {!ownSolve && (
          <span>
            {t("their-time")} {timeText}
            <br />
          </span>
        )}
        {yourTime !== "" && !futurePuzzle && !pastPuzzle && (
          <span>
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
        {!ownSolve && (
          <div id="their-words" className="end-stack">
            <div>{t("their-words-title")}</div>
            {renderTheirWords()}
          </div>
        )}
        {choWords && !futurePuzzle && !pastPuzzle && (
          <div id="your-words" className="end-stack">
            <div>{t("your-words-title")}</div>
            {renderYourWords()}
          </div>
        )}
      </div>
      {(choWords || futurePuzzle) && <Countdown />}
    </div>
  );
};

export default Results;
