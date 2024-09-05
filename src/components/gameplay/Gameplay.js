import React, { useState } from "react";
import Keyboard from "./Keyboard";
import PreviousWords from "./PreviousWords";
import { useError } from "../../context/ErrorContext";
import "./Gameplay.css";
import { useTranslation } from 'react-i18next';

const VALID = 0;
const NOT_A_WORD = 1;
const ALREADY_CHOSEN = 2;
const INCORRECT_LENGTH = 3;
const TOO_MANY_MODIFICATIONS = 4;

const Gameplay = ({
  startWord,
  endWord,
  words,
  backToWelcome,
  onGameEnd,
  partialChoice,
}) => {
  const { showError } = useError();
  const [inputText, setInputText] = useState("");
  const [previousWords] = useState(startWord);
  const [lastWord, setLastWord] = useState(startWord[startWord.length - 1]);
  const [currentScore, setCurrentScore] = useState(startWord.length - 1);
  const { t, i18n } = useTranslation();
  const handleKeyPress = (key) => {
    if (inputText.length < 5) {
      setInputText((prev) => prev + key);
    }
  };

  const handleBackspace = () => {
    if (inputText.length === 5) {
      const word = inputText.toUpperCase();
      let gameState = validateWord(
        word,
        words,
        previousWords.slice(0, currentScore + 1),
        lastWord,
      );
      if (gameState === VALID) {
        updateGame(word);
        return;
      }
    }
    setInputText((prev) => (prev.length === 0 ? "" : prev.slice(0, -1)));
  };

  const handleEnterPress = () => {
    const word = inputText.toUpperCase();
    let gameState = validateWord(
      word,
      words,
      previousWords.slice(0, currentScore + 1),
      lastWord,
    );
    if (gameState !== VALID) {
      showError(findErrorString(gameState));
      setInputText("");
      return;
    }
    updateGame(word);
  };

  const updateGame = (word) => {
    const newScore = currentScore + 1;
    previousWords.length = newScore;
    previousWords.push(word);
    setCurrentScore(newScore);
    setLastWord(word);
    if (word === endWord) {
      onGameEnd(previousWords, newScore);
    }
    setInputText("");
    partialChoice(previousWords);
  };

  const goBack = (wordIndex, word) => () => {
    setCurrentScore(wordIndex);
    setLastWord(word);
  };

  // Function to color letters based on their presence in the other word
  const colorLetter = (char, word) => {
    const className = word.includes(char) ? "contained" : "uncontained";
    return <span className={className}>{char}</span>;
  };

  // Render the word with colored letters
  const renderWord = (word, comparisonWord) => {
    return word.split("").map((char) => colorLetter(char, comparisonWord));
  };

  return (
    <div>
      <div className="score-container">
        <div className="flex-container" id="playing">
          <div className="flex-stack">
            <div className="text-large">
              {t("current")}:
              <br />
              {renderWord(lastWord, endWord)}
            </div>
            <div className="text-large" id="last-word"></div>
          </div>
          <div className="flex-stack right-pushed">
            <div className="text-large">
              {t("goal")}:
              <br />
              {renderWord(endWord, lastWord)}
            </div>
            <div className="text-large" id="goal-word"></div>
          </div>
        </div>
      </div>
      <div id="word-input" className="monster-input">
        {inputText}
      </div>
      <div className="bottom-component">
        <PreviousWords
          previousWords={previousWords}
          currentIndex={currentScore}
          goBack={goBack}
        />
        <Keyboard
          onKeyPress={handleKeyPress}
          onBackspace={handleBackspace}
          onEnter={handleEnterPress}
        />
      </div>
    </div>
  );
};

function validateWord(word, words, usedWords, lastWord) {
  if (word.length !== 5) {
    return INCORRECT_LENGTH;
  }
  if (usedWords.includes(word)) {
    return ALREADY_CHOSEN;
  }
  if (!words.includes(word)) {
    return NOT_A_WORD;
  }
  const lastWordCharacters = Array.from(lastWord);
  const nextWordCharacters = Array.from(word);
  let foundChanged = false;
  for (const char of nextWordCharacters) {
    const index = lastWordCharacters.indexOf(char);
    if (index === -1) {
      if (foundChanged) {
        return TOO_MANY_MODIFICATIONS;
      }
      foundChanged = true;
    } else {
      lastWordCharacters.splice(index, 1);
    }
  }
  return VALID;
}

function findErrorString(errorCode){
    switch (errorCode) {
        case 1:
           return "not-a-word";
        case 2:
           return "already-chosen";
        case 3:
           return "incorrect-length";
        case 4:
           return "too-many-modifications";
        default:
            return "500 server error";
    }
}

export default Gameplay;
