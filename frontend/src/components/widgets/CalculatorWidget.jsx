import { useState, useEffect } from 'react';
import { Calculator, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CalculatorWidget = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState([]);

  // Gestione input tastiera
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignora se stai scrivendo in un input, textarea o elemento editabile
      const activeElement = document.activeElement;
      const isTyping = activeElement.tagName === 'INPUT' || 
                       activeElement.tagName === 'TEXTAREA' || 
                       activeElement.isContentEditable;
      
      if (isTyping) return;
      
      // Numeri
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        inputDigit(e.key);
      }
      // Operatori
      else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        performOperation(e.key);
      }
      // Decimale
      else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        inputDecimal();
      }
      // Calcola
      else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        performOperation('=');
      }
      // Cancella ultimo
      else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      }
      // Reset
      else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        clearDisplay();
      }
      // Percentuale
      else if (e.key === '%') {
        e.preventDefault();
        inputPercent();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (!waitingForOperand) {
      const newDisplay = display.slice(0, -1);
      setDisplay(newDisplay || '0');
    }
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleSign = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      // Aggiungi alla cronologia
      if (nextOperation === '=') {
        const historyEntry = `${currentValue} ${operation} ${inputValue} = ${newValue}`;
        setHistory([historyEntry, ...history].slice(0, 5));
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (leftValue, rightValue, operation) => {
    switch (operation) {
      case '+':
        return leftValue + rightValue;
      case '-':
        return leftValue - rightValue;
      case '*':
        return leftValue * rightValue;
      case '/':
        return rightValue !== 0 ? leftValue / rightValue : 0;
      default:
        return rightValue;
    }
  };

  const CalcButton = ({ value, onClick, className = '', span = 1 }) => (
    <Button
      onClick={onClick}
      className={`h-12 text-lg font-medium ${span === 2 ? 'col-span-2' : ''} ${className}`}
      variant="outline"
    >
      {value}
    </Button>
  );

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-primary" />
          <span className="widget-title">Calcolatrice</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-4">
        {/* Display */}
        <div className="mb-4 p-4 bg-muted rounded-lg">
          <div className="text-right text-3xl font-bold text-foreground truncate">
            {display}
          </div>
          {operation && previousValue !== null && (
            <div className="text-right text-sm text-muted-foreground mt-1">
              {previousValue} {operation}
            </div>
          )}
        </div>

        {/* Pulsanti */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Riga 1 */}
          <CalcButton value="C" onClick={clearDisplay} className="bg-destructive/20 text-destructive hover:bg-destructive/30" />
          <CalcButton value="±" onClick={toggleSign} />
          <CalcButton value="%" onClick={inputPercent} />
          <CalcButton value="÷" onClick={() => performOperation('/')} className="bg-primary/20 text-primary hover:bg-primary/30" />

          {/* Riga 2 */}
          <CalcButton value="7" onClick={() => inputDigit('7')} />
          <CalcButton value="8" onClick={() => inputDigit('8')} />
          <CalcButton value="9" onClick={() => inputDigit('9')} />
          <CalcButton value="×" onClick={() => performOperation('*')} className="bg-primary/20 text-primary hover:bg-primary/30" />

          {/* Riga 3 */}
          <CalcButton value="4" onClick={() => inputDigit('4')} />
          <CalcButton value="5" onClick={() => inputDigit('5')} />
          <CalcButton value="6" onClick={() => inputDigit('6')} />
          <CalcButton value="−" onClick={() => performOperation('-')} className="bg-primary/20 text-primary hover:bg-primary/30" />

          {/* Riga 4 */}
          <CalcButton value="1" onClick={() => inputDigit('1')} />
          <CalcButton value="2" onClick={() => inputDigit('2')} />
          <CalcButton value="3" onClick={() => inputDigit('3')} />
          <CalcButton value="+" onClick={() => performOperation('+')} className="bg-primary/20 text-primary hover:bg-primary/30" />

          {/* Riga 5 */}
          <CalcButton value="0" onClick={() => inputDigit('0')} span={2} />
          <CalcButton value="." onClick={inputDecimal} />
          <CalcButton value="=" onClick={() => performOperation('=')} className="bg-success/20 text-success hover:bg-success/30" />
        </div>

        {/* Cronologia */}
        {history.length > 0 && (
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Cronologia</span>
              <button 
                onClick={() => setHistory([])}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
            <div className="space-y-1 max-h-20 overflow-auto">
              {history.map((entry, index) => (
                <div key={index} className="text-xs text-muted-foreground p-1 bg-muted/30 rounded">
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
