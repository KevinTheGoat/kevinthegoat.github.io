import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useTheme } from '../../context/ThemeContext'

export default function Calculator() {
  const { theme } = useTheme()
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState([])
  const [isScientific, setIsScientific] = useState(false)

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
      return
    }
    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)))
  }

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100))
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      let result
      switch (operation) {
        case '+': result = currentValue + inputValue; break
        case '-': result = currentValue - inputValue; break
        case '×': result = currentValue * inputValue; break
        case '÷': result = inputValue !== 0 ? currentValue / inputValue : 'Error'; break
        case '^': result = Math.pow(currentValue, inputValue); break
        default: result = inputValue
      }
      const historyEntry = `${currentValue} ${operation} ${inputValue} = ${result}`
      setHistory([historyEntry, ...history.slice(0, 4)])
      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = () => {
    if (!operation || previousValue === null) return
    performOperation(null)
    setOperation(null)
    setPreviousValue(null)
  }

  // Scientific functions
  const scientificOp = (op) => {
    const val = parseFloat(display)
    let result
    switch (op) {
      case 'sin': result = Math.sin(val * Math.PI / 180); break
      case 'cos': result = Math.cos(val * Math.PI / 180); break
      case 'tan': result = Math.tan(val * Math.PI / 180); break
      case 'sqrt': result = Math.sqrt(val); break
      case 'log': result = Math.log10(val); break
      case 'ln': result = Math.log(val); break
      case 'x²': result = val * val; break
      case 'π': result = Math.PI; break
      case 'e': result = Math.E; break
      default: result = val
    }
    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const Button = ({ value, onClick, span = 1, variant = 'default' }) => {
    const styles = {
      default: { backgroundColor: theme.elevated, color: theme.text },
      operator: { backgroundColor: theme.accent, color: theme.bg },
      function: { backgroundColor: theme.surface, color: theme.accent },
    }
    return (
      <button
        onClick={onClick}
        className={`p-4 rounded-xl text-xl font-semibold transition-all active:scale-95 hover:brightness-110 ${
          span === 2 ? 'col-span-2' : ''
        }`}
        style={styles[variant]}
      >
        {value}
      </button>
    )
  }

  return (
    <div className="max-w-sm mx-auto">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsScientific(!isScientific)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: theme.elevated, color: theme.text }}
        >
          <Icon icon={isScientific ? 'ph:calculator-bold' : 'ph:function-bold'} className="w-4 h-4" />
          {isScientific ? 'Standard' : 'Scientific'}
        </button>
      </div>

      {/* Display */}
      <div
        className="p-6 rounded-2xl mb-4"
        style={{ backgroundColor: theme.elevated }}
      >
        <div
          className="text-sm text-right mb-2 h-5 font-mono"
          style={{ color: theme.muted }}
        >
          {previousValue !== null && `${previousValue} ${operation || ''}`}
        </div>
        <div
          className="text-4xl font-bold text-right font-mono overflow-hidden"
          style={{ color: theme.text }}
        >
          {display.length > 12 ? parseFloat(display).toExponential(6) : display}
        </div>
      </div>

      {/* Scientific Buttons */}
      {isScientific && (
        <div className="grid grid-cols-5 gap-2 mb-2">
          {['sin', 'cos', 'tan', 'sqrt', 'log'].map((op) => (
            <Button key={op} value={op} onClick={() => scientificOp(op)} variant="function" />
          ))}
          {['ln', 'x²', '^', 'π', 'e'].map((op) => (
            <Button
              key={op}
              value={op}
              onClick={() => op === '^' ? performOperation('^') : scientificOp(op)}
              variant="function"
            />
          ))}
        </div>
      )}

      {/* Main Buttons */}
      <div className="grid grid-cols-4 gap-2">
        <Button value="C" onClick={clear} variant="function" />
        <Button value="±" onClick={toggleSign} variant="function" />
        <Button value="%" onClick={inputPercent} variant="function" />
        <Button value="÷" onClick={() => performOperation('÷')} variant="operator" />

        <Button value="7" onClick={() => inputDigit('7')} />
        <Button value="8" onClick={() => inputDigit('8')} />
        <Button value="9" onClick={() => inputDigit('9')} />
        <Button value="×" onClick={() => performOperation('×')} variant="operator" />

        <Button value="4" onClick={() => inputDigit('4')} />
        <Button value="5" onClick={() => inputDigit('5')} />
        <Button value="6" onClick={() => inputDigit('6')} />
        <Button value="-" onClick={() => performOperation('-')} variant="operator" />

        <Button value="1" onClick={() => inputDigit('1')} />
        <Button value="2" onClick={() => inputDigit('2')} />
        <Button value="3" onClick={() => inputDigit('3')} />
        <Button value="+" onClick={() => performOperation('+')} variant="operator" />

        <Button value="0" onClick={() => inputDigit('0')} span={2} />
        <Button value="." onClick={inputDecimal} />
        <Button value="=" onClick={calculate} variant="operator" />
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: theme.muted }}>History</span>
            <button
              onClick={() => setHistory([])}
              className="text-xs px-2 py-1 rounded"
              style={{ backgroundColor: theme.elevated, color: theme.muted }}
            >
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {history.map((entry, i) => (
              <div
                key={i}
                className="text-sm font-mono px-3 py-2 rounded-lg"
                style={{ backgroundColor: theme.elevated, color: theme.muted }}
              >
                {entry}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
