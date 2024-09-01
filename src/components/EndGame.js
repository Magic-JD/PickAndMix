import React from "react";
import "./EndGame.css"
import { useError } from "../context/ErrorContext"

function EndGameComponent({
  tryAgain,
  previousWords,
  currentScore,
  streak,
  msecondsPlayed,
}) {
  const { showError } = useError();
  const handleShare = () => {
    const domain = "https://pick-and-mix.vercel.app/results?";
    const wordsChosenId = previousWords;
    const wordsChosenString = wordsChosenId.join(":");
    const emojiText = convertToEmoji(previousWords);
    const params = `t=${msecondsPlayed}&w=${wordsChosenString}`;
    const encode = `code=${btoa(params).replace(/=*$/, '')}`;
    const url = `${domain}${encode}`;
    const stringText = `Play Pick and Mix with me!\n${url}\n\n${emojiText}`;
    navigator.clipboard.writeText(stringText);
      showError("Copied to Clipboard")
  };

  const handleTryAgain = () => {
    tryAgain();
  };

  const calculateTime = () => {
    let time = msecondsPlayed;
    let seconds = Math.trunc(time / 1000);
    let minutes = Math.trunc(seconds / 60);
    let remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <div id="end-page" className="text-large bold landing-text">
      <div className="text-large end-title">🎉 Congratulations! 🎉</div>
      {streak >= 3 && <div>{streak} Day Streak!</div>}
      <br />
      <div className="end-container">
        <div className="end-stack">
          <div className="end-stack">
            Choices:
            <br />
            {previousWords.map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </div>
        </div>
        <div className="end-stack">
          <div className="text-medium">Score: {currentScore}</div>
          <br />
          <div className="text-medium">
            Time:
            <br />
            {calculateTime()}
          </div>
          <div className="text-medium"></div>
          <br />
          <button
            className="button-small-dark button-end"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
          <button
            className="button-small-dark button-end"
            onClick={handleShare}
          >
            Share
          </button>
          <a
            className="button-small-dark button-end"
            href="https://paypal.me/JosephDaunt"
          >
            Donate
          </a>
        </div>
      </div>
    </div>
  );
}

function convertToEmoji(wc) {
  const fw = wc[0];
  const ew = wc[wc.length - 1];
  return wc
    .map((w) => {
      const usedChar = [];
      return w
        .split("")
        .map((c) => {
          if (usedChar.includes(c)) {
            return "❓";
          }
          usedChar.push(c);
          if (fw.includes(c)) {
            return "🟥";
          }
          if (ew.includes(c)) {
            return "🟢";
          }
          return "❓";
        })
        .join("");
    })
    .join("\n");
}

export default EndGameComponent;
