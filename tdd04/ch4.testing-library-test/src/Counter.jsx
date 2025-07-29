import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  const setCustomValue = () => {
    const num = parseInt(inputValue);
    if (!isNaN(num)) {
      setCount(num);
      setInputValue("");
    }
  };

  return (
    <div className="counter">
      <h2 data-testid="counter-title">Counter Value: {count}</h2>

      <div className="counter-controls">
        <button onClick={decrement} aria-label="decrement">
          -
        </button>
        <button onClick={increment} aria-label="increment">
          +
        </button>
        <button onClick={reset} aria-label="reset">
          Reset
        </button>
      </div>

      <div className="custom-input">
        <label htmlFor="custom-value">Set custom value:</label>
        <input
          id="custom-value"
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button onClick={setCustomValue}>Set</button>
      </div>

      <div className="counter-info">
        <p>
          Current count: <span data-testid="count-display">{count}</span>
        </p>
        {count > 0 && <p className="positive">Count is positive!</p>}
        {count < 0 && <p className="negative">Count is negative!</p>}
        {count === 0 && <p className="zero">Count is zero!</p>}
      </div>
    </div>
  );
}

export default Counter;
