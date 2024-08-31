import React, { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Gameplay from "./Gameplay";
import EndGame from "./EndGame";
import { getWords, getTodaysWords } from "../data/words.js";
import Cookies from "js-cookie";

function Main() {
  const [appState, setAppState] = useState(getCurrentAppState());
  const [previousWords, setPreviousWords] = useState(retrievePreviousWords());
  const [currentScore, setCurrentScore] = useState(Cookies.get("score"));
  const [streak, setStreak] = useState(Cookies.get("streak"));
  const [secondsPlayed, setSecondsPlayed] = useState(calculateSecondsPlayed());
  const midnight = calculateMidnight();
  const midnightTomorrow = calculateMidnight().setDate(midnight.getDate() + 1);

  const handleBackToWelcome = () => {
    Cookies.remove("chosen-words");
    Cookies.remove("endTime");
    Cookies.remove("score");
    setAppState("WELCOME");
  };

  const handleGameEnd = (words, score) => {
    const onStreak = Cookies.get("onStreak");
    if (!onStreak || !streak) {
      setStreak(1);
    } else if (onStreak !== midnight.toString() && streak) {
      setStreak(Number(streak) + 1);
    }

    Cookies.set("streak", streak, { expires: midnightTomorrow });
    Cookies.set("onStreak", midnight.toString(), { expires: midnightTomorrow });
    Cookies.set("chosen-words", [...words].join(","), { expires: midnight });
    Cookies.set("endTime", new Date().getTime(), { expires: midnight });
    setSecondsPlayed(calculateSecondsPlayed());
    setPreviousWords(words);
    Cookies.set("score", score, { expires: midnightTomorrow });
    setCurrentScore(score);
    setAppState("ENDED");
  };
  const handleStartClick = () => {
    if (!Cookies.get("startTime")) {
      Cookies.set("startTime", new Date().getTime(), { expires: midnight });
    }
    setAppState("PLAYING");
  };

  let lang = Cookies.get("lang");
  if (!lang) {
    lang = "en";
  }
  switch (appState) {
    case "WELCOME":
      return <WelcomeScreen onStartClick={handleStartClick} />;
    case "PLAYING":
      return (
        <Gameplay
          startWord={getTodaysWords(lang).startWord}
          endWord={getTodaysWords(lang).endWord}
          words={getWords(lang)}
          backToWelcome={handleBackToWelcome}
          onGameEnd={handleGameEnd}
        />
      );
    case "ENDED":
      return (
        <EndGame
          tryAgain={handleBackToWelcome}
          previousWords={previousWords}
          currentScore={currentScore}
          streak={streak}
          msecondsPlayed={secondsPlayed}
        />
      );
    default:
      return <WelcomeScreen onStartClick={handleStartClick} />;
  }
}

// Maybe we can extend this to be able to save in game state
function getCurrentAppState() {
  const ended = Cookies.get("endTime");
  if (!ended) {
    return "WELCOME";
  }
  return "ENDED";
}

function calculateSecondsPlayed() {
  const startTime = Cookies.get("startTime");
  const endTime = Cookies.get("endTime");
  if (startTime && endTime) {
    return endTime - startTime;
  }
  return 0;
}

function retrievePreviousWords() {
  const previousWords = Cookies.get("chosen-words");
  if (previousWords) {
    return previousWords.split(",");
  }
  return [];
}
function calculateMidnight() {
  const midnight = new Date();
  midnight.setDate(midnight.getDate() + 1);
  midnight.setHours(0, 0, 0, 0);
  return midnight;
}
export default Main;
