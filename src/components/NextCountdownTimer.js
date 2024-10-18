import React, { useState, useEffect } from 'react';

const NextCountdownTimer = () => {
  // Season End Time - Dec 21, 2024
  let seasonEndTime = 1734739200;
  let currentTime = Math.floor(Date.now() / 1000);

  let initialTime = seasonEndTime - currentTime;
  if (initialTime < 0) {
    initialTime = 0;
  }

  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          // Perform actions when the timer reaches zero
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Convert seconds to hours, minutes, and seconds
  const days = Math.floor(timeRemaining / (60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (60 * 60 * 24)) / (60 * 60));
  
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  return (
    <div>
      <p className="pinkText boldText">Time Remaining in Season 2:<br />
      <span className="whiteText"> {`${days}d ${hours}h ${minutes}m ${seconds}s`}</span></p>
    </div>
  );
};

export default NextCountdownTimer;