import React, { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="squares" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    const currentHistory = history.slice(0, stepNumber + 1);
    const currentSquares =
      currentHistory[currentHistory.length - 1].squares.slice();

    if (currentSquares[i] || calculateWinner(currentSquares)) return;

    currentSquares[i] = xIsNext ? "X" : "O";

    setHistory([...currentHistory, { squares: currentSquares }]);
    setStepNumber(currentHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleRestart() {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  let status = "";
  if (winner) {
    status = "Pemenang: " + winner;
  } else {
    status = "Giliran pemain selanjutnya: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Langkah ke-${move}` : "Mulai Permainan";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <>
      <div className="status">{status}</div>

      <div className="board">
        {current.squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
          />
        ))}
      </div>

      <button className="restart-button" onClick={handleRestart}>
        Restart Game
      </button>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </>
  );
}

export function Game() {
  return <div className="game"></div>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
