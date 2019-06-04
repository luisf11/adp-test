const { postResult, getResult } = require('./helper');

const getUrl = 'https://interview.adpeai.com/api/v1/get-task';
const postUrl = 'https://interview.adpeai.com/api/v1/submit-task';

// Running every 100 ms or just run once.
// For testing, comment both calls out.
setInterval(() => {
  getResult(getUrl).then((data) => {
    postResult(postUrl, data.id, data.result);
  });
}, 100);
