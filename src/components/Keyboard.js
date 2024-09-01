import React from "react";
import { useEffect } from "react";
import "./Keyboard.css";

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

  return (
    <div id="keyboard" className="keyboard">
      <div className="keyboard-row">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((letter) => (
          <div key={letter} className="key" onClick={() => onKeyPress(letter)}>
            {letter}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
          <div key={letter} className="key" onClick={() => onKeyPress(letter)}>
            {letter}
          </div>
        ))}
      </div>
      <div className="keyboard-row">
        <div
          id={keyboardLayout === "STANDARD" ? "ENTER" : "BACK"}
          className="big-key"
          onClick={keyboardLayout === "STANDARD" ? onEnter : onBackspace}
        >
          {keyboardLayout === "STANDARD" ? "ENTER" : "BACK"}
        </div>
        {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
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

export default Keyboard;
