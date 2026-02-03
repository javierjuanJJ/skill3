/**
 * Unit Tests for Calculator Module
 * 
 * Tests cover all basic arithmetic operations:
 * - Addition
 * - Subtraction
 * - Multiplication
 * - Division (including edge cases)
 */

const Calculator = require('../calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Addition', () => {
    test('2 + 3 should equal 5', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('0 + 0 should equal 0', () => {
      expect(calculator.add(0, 0)).toBe(0);
    });

    test('-5 + 3 should equal -2', () => {
      expect(calculator.add(-5, 3)).toBe(-2);
    });

    test('10 + (-4) should equal 6', () => {
      expect(calculator.add(10, -4)).toBe(6);
    });

    test('0.5 + 0.3 should equal 0.8', () => {
      expect(calculator.add(0.5, 0.3)).toBeCloseTo(0.8);
    });

    test('100 + 200 should equal 300', () => {
      expect(calculator.add(100, 200)).toBe(300);
    });

    test('Large numbers: 999999 + 1 should equal 1000000', () => {
      expect(calculator.add(999999, 1)).toBe(1000000);
    });
  });

  describe('Subtraction', () => {
    test('10 - 4 should equal 6', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    test('0 - 0 should equal 0', () => {
      expect(calculator.subtract(0, 0)).toBe(0);
    });

    test('5 - 10 should equal -5', () => {
      expect(calculator.subtract(5, 10)).toBe(-5);
    });

    test('-5 - 3 should equal -8', () => {
      expect(calculator.subtract(-5, 3)).toBe(-8);
    });

    test('10 - (-4) should equal 14', () => {
      expect(calculator.subtract(10, -4)).toBe(14);
    });

    test('0.9 - 0.4 should equal 0.5', () => {
      expect(calculator.subtract(0.9, 0.4)).toBeCloseTo(0.5);
    });

    test('100 - 25 should equal 75', () => {
      expect(calculator.subtract(100, 25)).toBe(75);
    });
  });

  describe('Multiplication', () => {
    test('45 * 2 should equal 90', () => {
      expect(calculator.multiply(45, 2)).toBe(90);
    });

    test('0 * 5 should equal 0', () => {
      expect(calculator.multiply(0, 5)).toBe(0);
    });

    test('6 * 7 should equal 42', () => {
      expect(calculator.multiply(6, 7)).toBe(42);
    });

    test('-5 * 3 should equal -15', () => {
      expect(calculator.multiply(-5, 3)).toBe(-15);
    });

    test('-4 * -5 should equal 20', () => {
      expect(calculator.multiply(-4, -5)).toBe(20);
    });

    test('0.5 * 2 should equal 1', () => {
      expect(calculator.multiply(0.5, 2)).toBe(1);
    });

    test('3.5 * 2 should equal 7', () => {
      expect(calculator.multiply(3.5, 2)).toBe(7);
    });

    test('10 * 10 should equal 100', () => {
      expect(calculator.multiply(10, 10)).toBe(100);
    });

    test('1 * 1 should equal 1', () => {
      expect(calculator.multiply(1, 1)).toBe(1);
    });
  });

  describe('Division', () => {
    test('20 / 5 should equal 4', () => {
      expect(calculator.divide(20, 5)).toBe(4);
    });

    test('10 / 2 should equal 5', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    test('0 / 5 should equal 0', () => {
      expect(calculator.divide(0, 5)).toBe(0);
    });

    test('7 / 2 should equal 3.5', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });

    test('-10 / 2 should equal -5', () => {
      expect(calculator.divide(-10, 2)).toBe(-5);
    });

    test('-10 / -2 should equal 5', () => {
      expect(calculator.divide(-10, -2)).toBe(5);
    });

    test('1 / 3 should be approximately 0.333...', () => {
      expect(calculator.divide(1, 3)).toBeCloseTo(0.333, 3);
    });

    test('100 / 4 should equal 25', () => {
      expect(calculator.divide(100, 4)).toBe(25);
    });

    test('Division by zero should throw an error', () => {
      expect(() => {
        calculator.divide(10, 0);
      }).toThrow('Cannot divide by zero');
    });

    test('Negative division by zero should throw an error', () => {
      expect(() => {
        calculator.divide(-5, 0);
      }).toThrow('Cannot divide by zero');
    });

    test('Zero divided by zero should throw an error', () => {
      expect(() => {
        calculator.divide(0, 0);
      }).toThrow('Cannot divide by zero');
    });
  });

  describe('Number Input', () => {
    test('Input number 5 when display is 0', () => {
      expect(calculator.inputNumber(5)).toBe('5');
    });

    test('Input multiple numbers sequentially', () => {
      calculator.inputNumber(1);
      calculator.inputNumber(2);
      expect(calculator.inputNumber(3)).toBe('123');
    });

    test('Input 0 should display 0', () => {
      expect(calculator.inputNumber(0)).toBe('0');
    });

    test('Input number after operation', () => {
      calculator.setOperation('+');
      expect(calculator.inputNumber(5)).toBe('5');
    });
  });

  describe('Clear Operation', () => {
    test('Clear should reset display to 0', () => {
      calculator.inputNumber(5);
      expect(calculator.clear()).toBe('0');
    });

    test('Clear should reset state after operations', () => {
      calculator.inputNumber(5);
      calculator.setOperation('+');
      calculator.inputNumber(3);
      calculator.clear();
      expect(calculator.getDisplay()).toBe('0');
      expect(calculator.equals()).toBe('0');
    });
  });

  describe('Get Display', () => {
    test('Get initial display value', () => {
      expect(calculator.getDisplay()).toBe('0');
    });

    test('Get display after input', () => {
      calculator.inputNumber(5);
      expect(calculator.getDisplay()).toBe('5');
    });

    test('Get display after multiple inputs', () => {
      calculator.inputNumber(1);
      calculator.inputNumber(2);
      calculator.inputNumber(3);
      expect(calculator.getDisplay()).toBe('123');
    });
  });

  describe('Full Calculation Flows (from image examples)', () => {
    test('Complete flow: 2 + 3 = 5', () => {
      calculator.inputNumber(2);
      calculator.setOperation('+');
      calculator.inputNumber(3);
      const result = calculator.equals();
      expect(result).toBe('5');
    });

    test('Complete flow: 10 - 4 = 6', () => {
      calculator.inputNumber(1);
      calculator.inputNumber(0);
      calculator.setOperation('-');
      calculator.inputNumber(4);
      const result = calculator.equals();
      expect(result).toBe('6');
    });

    test('Complete flow: 45 * 2 = 90', () => {
      calculator.inputNumber(4);
      calculator.inputNumber(5);
      calculator.setOperation('×');
      calculator.inputNumber(2);
      const result = calculator.equals();
      expect(result).toBe('90');
    });

    test('Complete flow: 20 / 5 = 4', () => {
      calculator.inputNumber(2);
      calculator.inputNumber(0);
      calculator.setOperation('÷');
      calculator.inputNumber(5);
      const result = calculator.equals();
      expect(result).toBe('4');
    });

    test('Chain operations: (5 + 3) * 2 = 16', () => {
      calculator.inputNumber(5);
      calculator.setOperation('+');
      calculator.inputNumber(3);
      calculator.setOperation('×');
      calculator.inputNumber(2);
      const result = calculator.equals();
      expect(result).toBe('16');
    });

    test('Complex flow: ((10 + 5) * 2) / 5 = 6', () => {
      calculator.inputNumber(1);
      calculator.inputNumber(0);
      calculator.setOperation('+');
      calculator.inputNumber(5);
      calculator.setOperation('×');
      calculator.inputNumber(2);
      calculator.setOperation('÷');
      calculator.inputNumber(5);
      const result = calculator.equals();
      expect(result).toBe('6');
    });
  });

  describe('Edge Cases and Errors', () => {
    test('Very large numbers', () => {
      expect(calculator.add(1e10, 1e10)).toBe(2e10);
    });

    test('Very small decimal numbers', () => {
      expect(calculator.multiply(0.0001, 0.0001)).toBeCloseTo(0.00000001, 8);
    });

    test('Operations with negative numbers', () => {
      expect(calculator.subtract(-5, -3)).toBe(-2);
    });

    test('Equals without setting operation returns same value', () => {
      calculator.inputNumber(5);
      expect(calculator.equals()).toBe('5');
    });

    test('Multiple equals operations', () => {
      calculator.inputNumber(5);
      calculator.setOperation('+');
      calculator.inputNumber(3);
      calculator.equals();
      calculator.equals();
      expect(calculator.getDisplay()).toBe('8');
    });
  });
});
