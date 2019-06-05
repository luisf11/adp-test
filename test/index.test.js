const axios = require('axios');
const solveMathOperation = require('../equation');
const { postResult } = require('../helper');

jest.mock('axios');
global.console = {
  log: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};

describe('Equation solver + sumitter', () => {
  test('Equation solver', () => {
    expect(solveMathOperation('subtraction', 26, 6)).toBe(20);
    expect(solveMathOperation('addition', 10, 6)).toBe(16);
    expect(solveMathOperation('division', 20, 2)).toBe(10);
    expect(solveMathOperation('multiplication', 10, 3)).toBe(30);
    expect(solveMathOperation('remainder', 10, 6)).toBe(4);
    expect(solveMathOperation('log', 15, 68)).toBe(null);
  });
  test('Solution Submission Failure', async () => {
    try {
      await postResult('https://interview.adpeai.com/api/v1/submit-task', 1, 42);
    } catch (e) {
      expect(global.console.log).toHaveBeenCalledWith('Error submitting equation id 1 with result 42');
    }
  });
  test('Solution Submission Failure Code 400', async () => {
    axios.post.mockReturnValue({ status: 400 });
    await postResult('https://interview.adpeai.com/api/v1/submit-task', 1, 42);
    expect(global.console.log).toHaveBeenCalledWith('Incorrect value in result; no ID specified; value is invalid!');
  });
  test('Solution Submission Failure Code 500', async () => {
    axios.post.mockReturnValue({ status: 500 });
    await postResult('https://interview.adpeai.com/api/v1/submit-task', 1, 42);
    expect(global.console.log).toHaveBeenCalledWith('ID cannot be found!');
  });
  test('Solution Submission Success', async () => {
    axios.post.mockReturnValue({ status: 200 });
    await postResult('https://interview.adpeai.com/api/v1/submit-task', 1, 42);
    expect(global.console.log).toHaveBeenCalledWith('Success! ID: 1 Result: 42');
  });
});
