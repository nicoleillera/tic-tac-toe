import './App.css';
import React, { useState } from 'react';
import Confetti from 'react-confetti';

function Box({ value, handleClick }) {
  return (
    <button className='box' onClick={handleClick}>
      {value}
    </button>
  );
}

function Row({ boxes, rowIndex, handleClick }) {
  return (
    <div className='row'>
      {[0, 1, 2].map((elem) => (
        <Box
          value={boxes[rowIndex * 3 + elem]}
          handleClick={() => handleClick(rowIndex * 3 + elem)}
        />
      ))}
    </div>
  );
}

function Board() {
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [xTurn, setxTurn] = useState(true);
  const [winText, setWinText] = useState('');

  function handleClick(i) {
    if (winText || boxes[i]) return;

    const newBoxes = [...boxes];
    xTurn ? (newBoxes[i] = 'X') : (newBoxes[i] = 'O');
    setBoxes(newBoxes);
    const winner = checkWinner(newBoxes);
    if (winner) {
      setWinText(`${winner} wins!`);
    } else {
      setxTurn((prev) => !prev);
    }
  }

  // winning condition
  function checkWinner(arr) {
    const winsArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // loop through winsArr
    for (let winArr of winsArr) {
      // still confucious
      const [a, b, c] = winArr;
      // Compare value of boxes (at these indicies) against eachother
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        return arr[a];
      }
    }
    return null;
  }

  function resetGame() {
    setBoxes(Array(9).fill(null));
    setxTurn(true);
    setWinText('');
  }

  return (
    <>
      {/* Use array fill instead of [0,1,2] */}
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <Row
            boxes={boxes}
            rowIndex={i}
            handleClick={handleClick}
            key={`row${i}`}
          />
        ))}
      <div id='winGame'>
        <p id='winText'>{winText}</p>
        {winText ? (
          <button onClick={resetGame} id='restartButton'>
            Play Again
          </button>
        ) : null}
        {winText ? <Confetti numberOfPieces={100} /> : null}
      </div>
    </>
  );
}

function App() {
  return (
    <div className='app'>
      <h1 style={{ fontSize: '50px' }}>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

export default App;
