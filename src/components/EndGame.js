import React from "react";
import "./EndGame.css";
import { useError } from "../context/ErrorContext";
import { getYourPuzzleId } from "../utils/TimeUtils";
import { useTranslation } from "react-i18next";

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
    const params = `t=${msecondsPlayed}&w=${wordsChosenString}&i=${getYourPuzzleId()}`;
    const encode = `code=${btoa(params).replace(/=*$/, "")}`;
    const url = `${domain}${encode}`;
    const stringText = t('share-text', { url, emojiText });
    navigator.clipboard.writeText(stringText);
    showError("Copied to Clipboard");
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
  const { t } = useTranslation();

  return (
    <div id="end-page" className="text-large bold landing-text">
      <div className="text-large end-title">🎉 {t("congratulations")} 🎉</div>
      {streak >= 2 && (
        <div>
          {streak} {t("streak")}
        </div>
      )}
      <br />
      <div className="end-container">
        <div className="end-stack">
          <div className="end-stack">
            {t("choices")}:
            <br />
            {previousWords.map((word, index) => (
              <div key={index}>{word}</div>
            ))}
          </div>
        </div>
        <div className="end-stack">
          <div className="text-medium">
            {t("time")}:
            <br />
            {calculateTime()}
          </div>
          <div className="text-medium"></div>
          <br />
          <button
            className="button-small-dark button-end"
            onClick={handleTryAgain}
          >
            {t("try-again")}
          </button>
          <button
            className="button-small-dark button-end"
            onClick={handleShare}
          >
            {t("share")}
          </button>
          <a
            className="button-small-dark button-end"
            href="https://paypal.me/JosephDaunt"
          >
            {t("donate")}
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
