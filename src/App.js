import React, { useState } from 'react'

import './App.css';
import YourLuckyNumber from './components/YourLuckyNumber';
import WinnerMessage from './components/winnerMessage';
import LoserMessage from './components/loserMessage';

function App() {

  const [randomNumber, setRandomNumber] = useState(0);
  const [jackpotMessage, setJackpotMessage] = useState(null)

  const getRandomizedNumber = (min, max) => {
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
      setJackpotMessage(true)
    } else if (randomNumber > 1000) {
      setJackpotMessage(false)
    }
  };

  const onCloseDialog = () => {
    setJackpotMessage(null);
    setRandomNumber(0);
  };

  // toggling the class for the play button
  let buttonColor = randomNumber > 0 ? "clickedColor" : "defaultColor";

  return (
    <div className="App">
      <h2>The JavaScript Lottery</h2>
      <h3 style={{ marginTop: '30px' }}>
        Click the button to draw a number.
      </h3>
      <button
        style={{ fontWeight: 600, padding: '35px 55px', cursor: 'pointer' }}
        className={buttonColor}
        onClick={() => { getRandomizedNumber(1, 100000) }}
      >
        Let's Play!
      </button>
      <YourLuckyNumber
        randomNumber={randomNumber}
      />
      {jackpotMessage === true &&
        <WinnerMessage
          onCloseDialog={onCloseDialog}
          messsage={jackpotMessage}
        />
      }
      {jackpotMessage === false &&
        <LoserMessage
          onCloseDialog={onCloseDialog}
          messsage={jackpotMessage}
        />
      }
      <p style={{ fontSize: '12px', fontWeight: '700', marginTop: '30px' }}>
        * Any number in the 1 to 1000 range wins!</p>
    </div>
  );
}

export default App;
