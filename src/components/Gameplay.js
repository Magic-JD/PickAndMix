import React, { useState } from "react";
import Keyboard from "./Keyboard";
import { useError } from "../context/ErrorContext";
import "./Gameplay.css"

const VALID = "";
const NOT_A_WORD = "This is not a recognised word.";
const ALREADY_CHOSEN = "You have already used this word.";
const INCORRECT_LENGTH = "Words must be 5 letters long.";
const TOO_MANY_MODIFICATIONS = "You can only change one letter per turn.";

const Gameplay = ({ startWord, endWord, words, backToWelcome, onGameEnd }) => {
  const { showError } = useError();
  const [inputText, setInputText] = useState("");
  const [previousWords] = useState([startWord]);
  const [lastWord, setLastWord] = useState(startWord);
  const [currentScore, setCurrentScore] = useState(0);

  const handleKeyPress = (key) => {
    if (inputText.length < 5) {
      setInputText((prev) => prev + key);
    }
  };

  const handleBackspace = () => {
    setInputText((prev) => (prev.length === 0 ? "" : prev.slice(0, -1)));
  };

  const handleEnterPress = () => {
    const word = inputText.toUpperCase();
    let gameState = validateWord(word, words, previousWords);
    if (gameState !== VALID) {
      showError(gameState);
      setInputText("");
      return;
    }
    gameState = validatePreviousWord(word, lastWord);
    if (gameState !== VALID) {
      showError(gameState);
      setInputText("");
      return;
    }
    const newScore = currentScore + 1;
    previousWords.length = newScore;
    previousWords.push(word);
    setCurrentScore(newScore);
    setLastWord(word);
    if (word === endWord) {
      onGameEnd(previousWords, newScore);
    }
    setInputText("");
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

  const formatPrevious = (previousWords) => {
      return previousWords.map((w) => {
          const index = previousWords.indexOf(w);
          let className = "previous-word"
          if (index > currentScore){
            className += " faded"
          }
          return <span className={className} onClick={goBack(index, w)}>{w}</span>})
  }

  return (
    <div>
      <div className="score-container">
        <div className="flex-container" id="playing">
          <div className="flex-stack">
            <div className="text-large">
              Current:
              <br />
              {renderWord(lastWord, endWord)}
            </div>
            <div className="text-large" id="last-word"></div>
          </div>
          <div className="flex-stack right-pushed">
            <div className="text-large">
              Goal:
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
      <div id="chosen-words" className="text-medium flex-container previous-word-holder">
      {(currentScore > 0 || previousWords.length > 1) && formatPrevious(previousWords)}
      </div>
      <Keyboard
        onKeyPress={handleKeyPress}
        onBackspace={handleBackspace}
        onEnter={handleEnterPress}
      />
    </div>
  );
};

function validatePreviousWord(word, lastWord) {
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

function validateWord(word, words, usedWords) {
  if (word.length !== 5) {
    return INCORRECT_LENGTH;
  }
  if (usedWords.includes(word)) {
    return ALREADY_CHOSEN;
  }
  if (!words.includes(word)) {
    return NOT_A_WORD;
  }
  return VALID;
}

export default Gameplay;
