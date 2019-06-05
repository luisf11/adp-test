const axios = require('axios');
const solveMathProblem = require('./equation');
// Retrieving and solving problem from API
const getResult = async (url) => {
  try {
    const response = await axios.get(url);
    const { data } = response;
    const {
      id, operation, left, right,
    } = data;
    const result = solveMathProblem(operation, left, right);

    return { id, result };
  } catch (error) {
    return console.error(error);
  }
};

// Post request to the given URL to check if result is correct
const postResult = async (pURL, id, result) => {
  try {
    const res = await axios.post(pURL, { id, result });
    if (res.status === 200) console.log(`Success! ID: ${id} Result: ${result}`);
    if (res.status === 400) console.log('Incorrect value in result; no ID specified; value is invalid!');
    else if (res.status === 500) console.log('ID cannot be found!');
    return res.data;
  } catch (error) {
    return console.error(error);
  }
};


module.exports = { postResult, getResult };
