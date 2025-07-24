// Hallo-Welt-React/app/components/BallGame/BallGame.jsx
import React, { useEffect, useState } from 'react';

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
    if (index === targetIndex) {
      setResult('🎉 Richtig!');
    } else {
      setResult('❌ Falsch!');
    }
    setCanGuess(false);
  };

  return (
    <div style={{ position: 'relative', width: AREA_SIZE, height: AREA_SIZE, border: '1px solid black', marginTop: 20 }}>
      <button onClick={() => {
        setTargetIndex(Math.floor(Math.random() * 4));
        setShowTarget(true);
      }}>Show Target</button>
      <button onClick={handleStart}>Start</button>
      {positions.map((pos, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          style={{
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: BALL_SIZE,
            height: BALL_SIZE,
            borderRadius: '50%',
            backgroundColor: showTarget && index === targetIndex ? 'red' : 'blue',
            cursor: canGuess ? 'pointer' : 'default',
          }}
        />
      ))}
      <div>{result}</div>
    </div>
  );
}

