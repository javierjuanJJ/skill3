#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * 
 * A command-line calculator supporting:
 * - Addition (+)
 * - Subtraction (-)
 * - Multiplication (×)
 * - Division (÷)
 * - Clear (C)
 * - Equals (=)
 * 
 * Usage: node index.js <operation> <number1> [number2]
 * Example: node index.js add 5 3
 */

const Calculator = require('./calculator');

// Create calculator instance
const calculator = new Calculator();

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  printUsage();
  process.exit(0);
}

const command = args[0].toLowerCase();

try {
  switch (command) {
    case 'add':
    case '+':
      if (args.length < 3) throw new Error('Add requires 2 numbers');
      const addResult = calculator.add(parseFloat(args[1]), parseFloat(args[2]));
      console.log(`${args[1]} + ${args[2]} = ${addResult}`);
      break;

    case 'subtract':
    case '-':
      if (args.length < 3) throw new Error('Subtract requires 2 numbers');
      const subtractResult = calculator.subtract(parseFloat(args[1]), parseFloat(args[2]));
      console.log(`${args[1]} - ${args[2]} = ${subtractResult}`);
      break;

    case 'multiply':
    case '×':
    case 'x':
      if (args.length < 3) throw new Error('Multiply requires 2 numbers');
      const multiplyResult = calculator.multiply(parseFloat(args[1]), parseFloat(args[2]));
      console.log(`${args[1]} × ${args[2]} = ${multiplyResult}`);
      break;

    case 'divide':
    case '÷':
      if (args.length < 3) throw new Error('Divide requires 2 numbers');
      const divideResult = calculator.divide(parseFloat(args[1]), parseFloat(args[2]));
      console.log(`${args[1]} ÷ ${args[2]} = ${divideResult}`);
      break;

    case 'interactive':
      startInteractiveMode();
      break;

    case 'help':
      printUsage();
      break;

    default:
      console.error(`Unknown command: ${command}`);
      printUsage();
      process.exit(1);
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}

/**
 * Print usage information
 */
function printUsage() {
  console.log(`
Node.js CLI Calculator

Supported Operations:
  - Addition (+)
  - Subtraction (-)
  - Multiplication (×)
  - Division (÷)

Usage:
  node index.js <operation> <number1> <number2>
  node index.js <operation> <number1> <number2>

Examples:
  node index.js add 5 3           # Output: 5 + 3 = 8
  node index.js subtract 10 4     # Output: 10 - 4 = 6
  node index.js multiply 6 7      # Output: 6 × 7 = 42
  node index.js divide 20 4       # Output: 20 ÷ 4 = 5
  node index.js + 5 3             # Output: 5 + 3 = 8
  node index.js - 10 4            # Output: 10 - 4 = 6
  node index.js x 6 7             # Output: 6 × 7 = 42
  node index.js ÷ 20 4            # Output: 20 ÷ 4 = 5

Interactive Mode:
  node index.js interactive       # Start interactive calculator mode
  `);
}

/**
 * Start interactive mode for continuous calculations
 */
function startInteractiveMode() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Interactive Calculator Mode');
  console.log('Commands: add, subtract, multiply, divide, clear, exit');
  console.log('');

  function prompt() {
    rl.question(`Display: ${calculator.getDisplay()}\n> `, (input) => {
      const parts = input.trim().split(/\s+/);
      const op = parts[0]?.toLowerCase();

      try {
        if (op === 'exit' || op === 'quit') {
          console.log('Goodbye!');
          rl.close();
          process.exit(0);
        }

        if (op === 'clear' || op === 'c') {
          calculator.clear();
          console.log(`Cleared. Display: ${calculator.getDisplay()}`);
        } else if (['add', '+', 'subtract', '-', 'multiply', 'x', '×', 'divide', '÷'].includes(op)) {
          const num = parseFloat(parts[1]);
          if (isNaN(num)) throw new Error('Please provide a valid number');
          calculator.setOperation(op === '+' ? '+' : op === '-' ? '-' : op === 'x' || op === '×' ? '×' : '÷');
          calculator.inputNumber(Math.floor(num));
        } else if (op === 'equals' || op === '=') {
          calculator.equals();
          console.log(`Result: ${calculator.getDisplay()}`);
        } else if (!isNaN(op)) {
          calculator.inputNumber(parseInt(op));
          console.log(`Input: ${calculator.getDisplay()}`);
        } else {
          console.log('Invalid command. Try: add, subtract, multiply, divide, clear, equals, or exit');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }

      prompt();
    });
  }

  prompt();
}
