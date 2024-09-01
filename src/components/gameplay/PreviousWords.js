import React, { useState, useEffect } from "react";

const PreviousWords = ({ previousWords, currentIndex, goBack }) => {
  const [startIndex, setStartIndex] = useState(Math.max(0, currentIndex-4));
 useEffect(() => {
    setStartIndex(Math.max(0, currentIndex - 4));
  }, [currentIndex]);
  const formatPrevious = (previousWords) => {
    let displayWords = [...previousWords];
    const length = displayWords.length;
    if (length > 5) {
        let si = startIndex;
        si = si + 0;
        console.log(si);
      displayWords = displayWords.slice(startIndex, startIndex + 5);
    }
    return displayWords.map((w) => {
      const index = previousWords.indexOf(w);
      let className = "previous-word";
      if (index > currentIndex) {
        className += " faded";
      }
      return (
        <span className={className} onClick={goBack(index, w)}>
          {w}
        </span>
      );
    });
  };

  const scrollBack = () => {
      setStartIndex(startIndex -1 )
  };
  const scrollForward = () => {
      setStartIndex(startIndex +1 )
  };

  return (
    <div
      id="chosen-words"
      className="flex-container previous-word-holder"
    >
      {previousWords.length >= 5 && startIndex > 0 && <span className="word-arrow" onClick={() => scrollBack()}>⇜</span>}
      {(currentIndex > 0 || previousWords.length > 1) &&
        formatPrevious(previousWords)}
      {previousWords.length >= 5 && startIndex < previousWords.length-5 && <span className="word-arrow" onClick={() => scrollForward()}>⇝</span>}
    </div>
  );
};

export default PreviousWords;
