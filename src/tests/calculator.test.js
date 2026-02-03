const Calculator = require('../calculator');

describe('Calculator - Basic Operations', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Addition', () => {
    test('should add two positive numbers', () => {
      expect(calculator.add(5, 3)).toBe(8);
    });

    test('should add numbers with negative values', () => {
      expect(calculator.add(-5, 3)).toBe(-2);
    });

    test('should add decimals', () => {
      expect(calculator.add(2.5, 3.5)).toBe(6);
    });
  });

  describe('Subtraction', () => {
    test('should subtract two positive numbers', () => {
      expect(calculator.subtract(10, 3)).toBe(7);
    });

    test('should handle negative results', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });

    test('should subtract decimals', () => {
      expect(calculator.subtract(5.5, 2.3)).toBeCloseTo(3.2);
    });
  });

  describe('Multiplication', () => {
    test('should multiply two positive numbers', () => {
      expect(calculator.multiply(4, 5)).toBe(20);
    });

    test('should multiply with zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    test('should multiply negative numbers', () => {
      expect(calculator.multiply(-3, 4)).toBe(-12);
    });
  });

  describe('Division', () => {
    test('should divide two positive numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    test('should divide with decimals', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.divide(5, 0)).toThrow('Cannot divide by zero');
    });

    test('should divide negative numbers', () => {
      expect(calculator.divide(-10, 2)).toBe(-5);
    });
  });
});

describe('Calculator - New Extended Operations', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Modulo', () => {
    test('should calculate modulo: 5 % 2 = 1', () => {
      expect(calculator.modulo(5, 2)).toBe(1);
    });

    test('should calculate modulo: 10 % 3 = 1', () => {
      expect(calculator.modulo(10, 3)).toBe(1);
    });

    test('should calculate modulo: 7 % 4 = 3', () => {
      expect(calculator.modulo(7, 4)).toBe(3);
    });

    test('should handle modulo with negative numbers', () => {
      expect(calculator.modulo(-5, 2)).toBe(-1);
    });

    test('should return 0 when number is perfectly divisible', () => {
      expect(calculator.modulo(10, 5)).toBe(0);
    });

    test('should throw error when dividing by zero', () => {
      expect(() => calculator.modulo(5, 0)).toThrow('Cannot perform modulo by zero');
    });

    test('should work with decimals', () => {
      expect(calculator.modulo(5.5, 2)).toBeCloseTo(1.5);
    });
  });

  describe('Power/Exponentiation', () => {
    test('should calculate power: 2 ^ 3 = 8', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    test('should calculate power: 5 ^ 2 = 25', () => {
      expect(calculator.power(5, 2)).toBe(25);
    });

    test('should calculate power: 3 ^ 4 = 81', () => {
      expect(calculator.power(3, 4)).toBe(81);
    });

    test('should handle power of zero: 5 ^ 0 = 1', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    test('should handle power of one: 7 ^ 1 = 7', () => {
      expect(calculator.power(7, 1)).toBe(7);
    });

    test('should handle negative exponents: 2 ^ -2 = 0.25', () => {
      expect(calculator.power(2, -2)).toBe(0.25);
    });

    test('should handle negative bases: (-2) ^ 3 = -8', () => {
      expect(calculator.power(-2, 3)).toBe(-8);
    });

    test('should handle negative base with even exponent: (-2) ^ 2 = 4', () => {
      expect(calculator.power(-2, 2)).toBe(4);
    });

    test('should work with decimal exponents: 4 ^ 0.5 = 2', () => {
      expect(calculator.power(4, 0.5)).toBe(2);
    });
  });

  describe('Square Root', () => {
    test('should calculate square root: √16 = 4', () => {
      expect(calculator.squareRoot(16)).toBe(4);
    });

    test('should calculate square root: √25 = 5', () => {
      expect(calculator.squareRoot(25)).toBe(5);
    });

    test('should calculate square root: √9 = 3', () => {
      expect(calculator.squareRoot(9)).toBe(3);
    });

    test('should handle square root of 0: √0 = 0', () => {
      expect(calculator.squareRoot(0)).toBe(0);
    });

    test('should handle square root of 1: √1 = 1', () => {
      expect(calculator.squareRoot(1)).toBe(1);
    });

    test('should calculate square root of decimals: √2.25 = 1.5', () => {
      expect(calculator.squareRoot(2.25)).toBe(1.5);
    });

    test('should throw error for negative numbers', () => {
      expect(() => calculator.squareRoot(-4)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should throw error for large negative numbers', () => {
      expect(() => calculator.squareRoot(-100)).toThrow('Cannot calculate square root of a negative number');
    });

    test('should handle square root of large numbers: √10000 = 100', () => {
      expect(calculator.squareRoot(10000)).toBe(100);
    });
  });
});

describe('Calculator - Integration with Calculate Method', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should use modulo operator in calculate method', () => {
    const result = calculator.calculate(5, 2, '%');
    expect(result).toBe(1);
  });

  test('should use power operator in calculate method', () => {
    const result = calculator.calculate(2, 3, '^');
    expect(result).toBe(8);
  });

  test('should handle existing operators in calculate method', () => {
    expect(calculator.calculate(10, 5, '+')).toBe(15);
    expect(calculator.calculate(10, 5, '-')).toBe(5);
    expect(calculator.calculate(10, 5, '×')).toBe(50);
    expect(calculator.calculate(10, 5, '÷')).toBe(2);
  });

  test('should return current value for unknown operator', () => {
    const result = calculator.calculate(5, 3, '?');
    expect(result).toBe(3);
  });
});

describe('Calculator - UI Integration', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should initialize display correctly', () => {
    expect(calculator.getDisplay()).toBe('0');
  });

  test('should clear calculator state', () => {
    calculator.display = '10';
    calculator.previousValue = 5;
    calculator.operation = '+';
    calculator.clear();
    
    expect(calculator.display).toBe('0');
    expect(calculator.previousValue).toBeNull();
    expect(calculator.operation).toBeNull();
    expect(calculator.waitingForNewValue).toBe(false);
  });

  test('should input numbers correctly', () => {
    calculator.inputNumber(5);
    expect(calculator.getDisplay()).toBe('5');
    
    calculator.inputNumber(3);
    expect(calculator.getDisplay()).toBe('53');
  });

  test('should replace display when waiting for new value', () => {
    calculator.inputNumber(5);
    calculator.waitingForNewValue = true;
    calculator.inputNumber(3);
    expect(calculator.getDisplay()).toBe('3');
  });
});
