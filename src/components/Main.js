import React, { useState } from "react";
import WelcomeScreen from "./WelcomeScreen";
import Gameplay from "./gameplay/Gameplay";
import EndGame from "./EndGame";
import Advent from "./advent/Advent";
import {
  getWords,
  getTodaysWords,
  getAdventWordStart,
  getAdventWordEnd,
} from "../data/words.js";
import { wipeCookies } from "../utils/CookiesUtils.js";
import Cookies from "js-cookie";

function Main() {
  const [appState, setAppState] = useState(getCurrentAppState());
  const [previousWords, setPreviousWords] = useState(retrievePreviousWords());
  const [currentScore, setCurrentScore] = useState(Cookies.get("score"));
  const [streak, setStreak] = useState(Cookies.get("streak"));
  const [secondsPlayed, setSecondsPlayed] = useState(calculateSecondsPlayed());
  const [adventDay, setAdventDay] = useState(0);

  const handleBackToWelcome = () => {
    wipeCookies();
    setAppState("WELCOME");
  };

  const handleGameEnd = (words, score) => {
    const midnight = calculateMidnight();
    const midnightTomorrow = calculateMidnight();
    midnightTomorrow.setDate(midnightTomorrow.getDate() + 1);
    const onStreak = Cookies.get("onStreak");
    let currentStreak = Number(streak);
    if (!onStreak || !currentStreak) {
      setStreak(1);
      currentStreak = 1;
    } else if (onStreak !== midnight.toString() && currentStreak) {
      currentStreak = currentStreak + 1;
      setStreak(currentStreak);
    }

    Cookies.set("streak", currentStreak, { expires: midnightTomorrow });
    Cookies.set("onStreak", midnight.toString(), { expires: midnightTomorrow });
    Cookies.set("chosen-words", [...words].join(","), { expires: midnight });
    Cookies.set("endTime", new Date().getTime(), { expires: midnight });
    setSecondsPlayed(calculateSecondsPlayed());
    setPreviousWords(words);
    Cookies.set("score", score, { expires: midnight });
    setCurrentScore(score);
    setAppState("ENDED");
  };

  const handlePartialChoice = (wordList) => {
    Cookies.set("partial-choice", wordList, { expires: calculateMidnight() });
  };

  const handleStartClick = () => {
    wipeCookies();
    if (!Cookies.get("startTime")) {
      Cookies.set("startTime", new Date().getTime(), {
        expires: calculateMidnight(),
      });
    }
    setAppState("PLAYING");
  };

  const handleChristmasClick = () => {
    setAppState("CHRISTMAS");
  };

  const handlePlayDay = (number) => {
    setAdventDay(number);
    setAppState("CHRISTMAS-DAY");
  };

  const handleAdventEnd = () => {
    localStorage.setItem(`advent-day-${adventDay}`, "true");
    setAppState("CHRISTMAS");
  };

  let lang = Cookies.get("lang");
  if (!lang) {
    lang = "en";
  }
  switch (appState) {
    case "WELCOME":
      return (
        <WelcomeScreen
          onStartClick={handleStartClick}
          onChristmasClick={handleChristmasClick}
        />
      );
    case "PLAYING":
      return (
        <Gameplay
          startWord={getOrUseWords(getTodaysWords(lang).startWord)}
          endWord={getTodaysWords(lang).endWord}
          words={getWords(lang)}
          onGameEnd={handleGameEnd}
          partialChoice={handlePartialChoice}
          mustCompleteInFive={false}
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
    case "CHRISTMAS":
      return (
        <Advent backToMain={handleBackToWelcome} playDay={handlePlayDay} />
      );
    case "CHRISTMAS-DAY":
      return (
        <div className="text-medium">
          <div className="flex-stack">
            <span>Advent Challenge!</span>
            <span>There are {25 - adventDay} days until Christmas,</span>
            <span>There are only {25 - adventDay} possible solutions!</span>
          </div>
          <Gameplay
            startWord={[getAdventWordStart(adventDay)]}
            endWord={getAdventWordEnd(adventDay)}
            words={getWords("en")}
            onGameEnd={handleAdventEnd}
            partialChoice={() => {}}
            mustCompleteInFive={true}
          />
        </div>
      );
    default:
      return <WelcomeScreen onStartClick={handleStartClick} />;
  }
}

function getOrUseWords(dailyStartWord) {
  const partialChoice = Cookies.get("partial-choice");
  if (partialChoice) {
    return partialChoice.split(",");
  }
  return [dailyStartWord];
}

// Maybe we can extend this to be able to save in game state
function getCurrentAppState() {
  const ended = Cookies.get("endTime");
  if (ended) {
    return "ENDED";
  }
  if (Cookies.get("partial-choice")) {
    return "PLAYING";
  }
  return "WELCOME";
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
