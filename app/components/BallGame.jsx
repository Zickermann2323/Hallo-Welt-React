import React, { useEffect, useState } from 'react';
import './BallGame.css'; // <- CSS importieren

const BALL_SIZE = 50;
const AREA_SIZE = 400;

function getRandomPosition() {
  const x = Math.floor(Math.random() * (AREA_SIZE - BALL_SIZE));
  const y = Math.floor(Math.random() * (AREA_SIZE - BALL_SIZE));
  return { x, y };
}

export default function BallGame() {
  const [positions, setPositions] = useState(
    Array(4).fill().map(() => getRandomPosition())
  );
  const [targetIndex, setTargetIndex] = useState(null);
  const [showTarget, setShowTarget] = useState(false);
  const [canGuess, setCanGuess] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(Array(4).fill().map(() => getRandomPosition()));
    }, 1000 / 60); // 60 FPS
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    setShowTarget(false);
    setCanGuess(false);
    setResult('');
    const stopTimer = setTimeout(() => {
      setCanGuess(true);
      clearTimeout(stopTimer);
    }, 15000);
  };

  const handleClick = (index) => {
    if (!canGuess) return;
    setResult(index === targetIndex ? '🎉 Richtig!' : '❌ Falsch!');
    setCanGuess(false);
  };

  return (
    <div className="ball-area">
      <button onClick={() => {
        setTargetIndex(Math.floor(Math.random() * 4));
        setShowTarget(true);
      }}>Show Target</button>
      <button onClick={handleStart}>Start</button>
      {positions.map((pos, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={`ball ${showTarget && index === targetIndex ? 'target' : ''}`}
          style={{ left: pos.x, top: pos.y }}
        />
      ))}
      <div className="result">{result}</div>
    </div>
  );
}

