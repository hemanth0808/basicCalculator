import React, { useState, useEffect, useCallback } from 'react';
import { evaluate } from 'mathjs';
import './Calculator.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = useCallback((value) => {
    if (value === '=') {
      try {
        const evalResult = evaluate(input); 
        setResult(evalResult.toString());
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '←') {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  }, [input]);

  const handleKeyPress = useCallback((event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
      handleClick(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      handleClick(key);
    } else if (key === 'Enter') {
      handleClick('=');
    } else if (key === 'Backspace' || key === 'Delete') {
      handleClick('←');
    } else if (key === 'Escape') {
      handleClick('C');
    }
  }, [handleClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="calculator">
      <div className="display">
        <input type="text" value={input} readOnly />
        <input type="text" value={result} readOnly />
      </div>
      <div className="buttons">
        <button onClick={() => handleClick('C')} className="double">C</button>
        <button onClick={() => handleClick('←')} className="backspace">←</button>
        <button onClick={() => handleClick('+')} className="operator">+</button>
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('*')} className="operator">*</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('/')} className="operator">/</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('-')} className="operator">-</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('=')} className="operator double">=</button>
      </div>
    </div>
  );
};

export default Calculator;
