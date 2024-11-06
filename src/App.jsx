import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [mode, setMode] = useState(null);
  const [autoMode, setAutoMode] = useState(null);
  const [color, setColor] = useState('#FFFFFF');
  const [colorHistory, setColorHistory] = useState([]);
  const [speed, setSpeed] = useState(1000); // Slider for speed control

  useEffect(() => {
    let interval;
    if (autoMode === 'fully-automatic') {
      interval = setInterval(() => {
        const randomColor = generateRandomColor();
        setColor(randomColor);
        setColorHistory((prevHistory) => [randomColor, ...prevHistory.slice(0, 4)]);
      }, speed);
    }

    return () => clearInterval(interval);
  }, [autoMode, speed]);

  const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor.padEnd(7, '0'); // Ensures color code is always 6 digits
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setColorHistory((prevHistory) => [e.target.value, ...prevHistory.slice(0, 4)]);
  };

  const handleRandomColor = () => {
    const randomColor = generateRandomColor();
    setColor(randomColor);
    setColorHistory((prevHistory) => [randomColor, ...prevHistory.slice(0, 4)]);
  };

  const copyColorToClipboard = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: color }}
      onClick={autoMode === 'click-to-change' ? handleRandomColor : null}
    >
      {!mode && (
        <div className="button-container">
          <button onClick={() => setMode('auto')}>Automatic Color Change</button>
          <button onClick={() => setMode('manual')}>Manual Color Change</button>
        </div>
      )}
      {mode === 'auto' && !autoMode && (
        <div className="button-container">
          <button onClick={() => setAutoMode('click-to-change')}>Click to Change</button>
          <button onClick={() => setAutoMode('fully-automatic')}>Fully Automatic</button>
          <button className="back-button" onClick={() => setMode(null)}>Back</button>
        </div>
      )}
      {autoMode && (
        <div>
          <div className="slider-container">
            <label>Speed: {speed}ms</label>
            <input
              type="range"
              min="200"
              max="5000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
          </div>
          <button className="back-button" onClick={() => { setMode(null); setAutoMode(null); }}>Back</button>
        </div>
      )}
      {mode === 'manual' && (
        <div className="manual-container">
          <input type="color" onChange={handleColorChange} />
          <button className="back-button" onClick={() => setMode(null)}>Back</button>
        </div>
      )}

      <div className="color-info">
        <button onClick={copyColorToClipboard}>Copy Color</button>
        <p>Current Color: {color}</p>
      </div>

      <div className="history-container">
        <h3>Color History</h3>
        <ul>
          {colorHistory.map((col, index) => (
            <li key={index} style={{ backgroundColor: col }}>{col}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
