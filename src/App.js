import React, { useState } from 'react'

import './App.css';
import YourLuckyNumber from './components/YourLuckyNumber';
import WinnerMessage from './components/winnerMessage';
import LoserMessage from './components/loserMessage';

function App() {

  const [randomNumber, setRandomNumber] = useState(0);
  const [isJackpot, setIsJackpot] = useState(null)

  const handlePlayButtonClick = (min, max) => {
    let i = 0;

    setInterval(() => {
      i++;
      if (i <= 10) {
        const randomized = Math.floor(Math.random() * (max - min) + min);
        setRandomNumber(randomized);
        if (i === 10) {
          clearInterval();
          checkForWinner(randomized);
        }
      }
    }, 100);
  };

  const checkForWinner = (randomNumber) => {
    if (randomNumber >= 1 && randomNumber <= 1000) {
      setIsJackpot(true)
    } else if (randomNumber > 1000) {
      setIsJackpot(false)
    }
  };

  const onCloseDialog = () => {
    setIsJackpot(null);
    setRandomNumber(0);
  };

  let buttonColorClass = randomNumber > 0 ? "clickedColor" : "defaultColor";

  return (
    <div className="App">
      <h2>The JavaScript Lottery</h2>
      <h3 style={{ marginTop: '30px' }}>
        Click the button to draw a number.
      </h3>
      <button
        style={{ fontWeight: 600, padding: '35px 55px', cursor: 'pointer' }}
        className={buttonColorClass}
        onClick={() => { handlePlayButtonClick(1, 100000) }}
      >
        Let's Play!
      </button>
      <YourLuckyNumber
        randomNumber={randomNumber}
      />
      {isJackpot === true &&
        <WinnerMessage
          onCloseDialog={onCloseDialog}
        />
      }
      {isJackpot === false &&
        <LoserMessage
          onCloseDialog={onCloseDialog}
        />
      }
      <p style={{ fontSize: '12px', fontWeight: '700', marginTop: '30px' }}>
        * Any number in the 1 to 1000 range wins!</p>
    </div>
  );
}

export default App;
