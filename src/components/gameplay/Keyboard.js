import React from "react";
import { useEffect } from "react";
import "./Keyboard.css";
import Cookies from "js-cookie";

const Keyboard = ({ onKeyPress, onBackspace, onEnter }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key === "Enter") {
        event.preventDefault();
        onEnter();
      } else if (key === "Backspace") {
        event.preventDefault();
        onBackspace();
      } else if (/^[a-zA-Z]$/.test(key)) {
        event.preventDefault();
        onKeyPress(key);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKeyPress, onBackspace, onEnter]);

  const keyboardLayout = localStorage.getItem("layout") || "STANDARD";

  const keyboardKeys = getKeyboardLayout(Cookies.get("lang"));
  return (
    <div id="keyboard" className="keyboard">
      <div className="keyboard-row">
        {keyboardKeys[0].map((letter) => (
          <div key={letter} className="key" onClick={() => onKeyPress(letter)}>
            {letter}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        <div className="half-key" />
        {keyboardKeys[1].map((letter) => (
          <div key={letter} className="key" onClick={() => onKeyPress(letter)}>
            {letter}
          </div>
        ))}
        <div className="half-key" />
      </div>
      <div className="keyboard-row">
        <div
          id={keyboardLayout === "STANDARD" ? "ENTER" : "BACK"}
          className="big-key"
          onClick={keyboardLayout === "STANDARD" ? onEnter : onBackspace}
        >
          {keyboardLayout === "STANDARD" ? "ENTER" : "BACK"}
        </div>
        {keyboardKeys[2].map((letter) => (
          <div key={letter} className="key" onClick={() => onKeyPress(letter)}>
            {letter}
          </div>
        ))}
        <div
          id={keyboardLayout === "STANDARD" ? "BACK" : "ENTER"}
          className="big-key"
          onClick={keyboardLayout === "STANDARD" ? onBackspace : onEnter}
        >
          {keyboardLayout === "STANDARD" ? "BACK" : "ENTER"}
        </div>
      </div>
    </div>
  );
};

function getKeyboardLayout(lang) {
  switch (lang) {
    case "en":
    case "id":
      return keyboardLayouts["LATIN"];
    case "uk":
      return keyboardLayouts["CYRILLIC_UK"];
    default:
      return keyboardLayouts["LATIN"];
  }
}

const keyboardLayouts = {
  LATIN: [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ],
  CYRILLIC_UK: [
    ["Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ї"],
    ["Ф", "І", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Є"],
    ["Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"],
  ],
};
export default Keyboard;
