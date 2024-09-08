import React, { useState, useEffect } from "react";

const PreviousWords = ({ previousWords, currentIndex, goBack }) => {
  const [startIndex, setStartIndex] = useState(Math.max(0, currentIndex - 4));
  useEffect(() => {
    setStartIndex(Math.max(0, currentIndex - 4));
  }, [currentIndex]);

  const formatPrevious = (previousWords) => {
    let displayWords = [...previousWords];
    const length = displayWords.length;
    if (length > 5) {
      displayWords = displayWords.slice(startIndex, startIndex + 5);
    }
    return displayWords.map((w) => {
      const index = previousWords.indexOf(w);
      let className = "previous-word";
      if (index > currentIndex) {
        className += " faded";
      }
      return (
        <span className={className} key={w} onClick={() => goBack(index, w)}>
          {w}
        </span>
      );
    });
  };

  return (
    <div id="chosen-words" className="flex-container previous-word-holder">
        <span
          className={`word-arrow ${currentIndex > 0 ? "" : "hidden"}`}
          onClick={() =>
            goBack(currentIndex - 1, previousWords[currentIndex - 1])
          }
        >
          ←
        </span>
      {(currentIndex > 0 || previousWords.length > 1) &&
        formatPrevious(previousWords)}
        <span
          className={`word-arrow ${currentIndex < previousWords.length - 1 ? "" : "hidden"}`}
          onClick={() =>
            goBack(currentIndex + 1, previousWords[currentIndex + 1])
          }
        >
          →
        </span>
    </div>
  );
};

export default PreviousWords;
