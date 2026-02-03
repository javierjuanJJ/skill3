/**
 * Node.js CLI Calculator Module
 * 
 * Supported Operations:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (×)
 * - Division (÷)
 */

class Calculator {
  constructor() {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForNewValue = false;
  }

  /**
   * Handle number input (0-9)
   */
  inputNumber(num) {
    if (this.waitingForNewValue) {
      this.display = String(num);
      this.waitingForNewValue = false;
    } else {
      this.display = this.display === '0' ? String(num) : this.display + num;
    }
    return this.display;
  }

  /**
   * Clear display and reset calculator state
   */
  clear() {
    this.display = '0';
    this.previousValue = null;
    this.operation = null;
    this.waitingForNewValue = false;
    return this.display;
  }

  /**
   * Addition operation
   */
  add(previousValue, currentValue) {
    return previousValue + currentValue;
  }

  /**
   * Subtraction operation
   */
  subtract(previousValue, currentValue) {
    return previousValue - currentValue;
  }

  /**
   * Multiplication operation
   */
  multiply(previousValue, currentValue) {
    return previousValue * currentValue;
  }

  /**
   * Division operation
   */
  divide(previousValue, currentValue) {
    if (currentValue === 0) {
      throw new Error('Cannot divide by zero');
    }
    return previousValue / currentValue;
  }

  /**
   * Set operation and store current value
   */
  setOperation(op) {
    const currentValue = parseFloat(this.display);

    if (this.previousValue === null) {
      this.previousValue = currentValue;
    } else if (this.operation) {
      // Calculate intermediate result if operation was already set
      const result = this.calculate(this.previousValue, currentValue, this.operation);
      this.display = String(result);
      this.previousValue = result;
    }

    this.operation = op;
    this.waitingForNewValue = true;
    return this.display;
  }

  /**
   * Calculate result based on operation
   */
  calculate(previous, current, op) {
    switch (op) {
      case '+':
        return this.add(previous, current);
      case '-':
        return this.subtract(previous, current);
      case '×':
        return this.multiply(previous, current);
      case '÷':
        return this.divide(previous, current);
      default:
        return current;
    }
  }

  /**
   * Execute equals operation and display result
   */
  equals() {
    if (this.operation && this.previousValue !== null) {
      const currentValue = parseFloat(this.display);
      const result = this.calculate(this.previousValue, currentValue, this.operation);
      this.display = String(result);
      this.previousValue = null;
      this.operation = null;
      this.waitingForNewValue = true;
    }
    return this.display;
  }

  /**
   * Get current display value
   */
  getDisplay() {
    return this.display;
  }
}

module.exports = Calculator;
