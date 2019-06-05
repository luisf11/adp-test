// Helper function to get result of operation
function solveMathOperation(operation, value1, value2) {
  let answer = null;

  switch (operation) {
    case 'addition':
      answer = value1 + value2;
      break;
    case 'subtraction':
      answer = value1 - value2;
      break;
    case 'multiplication':
      answer = value1 * value2;
      break;
    case 'division':
      answer = value1 / value2;
      break;
    case 'remainder':
      answer = value1 % value2;
      break;
    default:
      console.log(`Operation: ${operation} not found.`);
  }
  return answer;
}

module.exports = solveMathOperation;
