const { postResult, getResult } = require('./helper');
const config = require('./config.json');

// Running every 100 ms or just run once.
// For testing, comment both calls out.
setInterval(() => {
  getResult(config.getUrl).then((data) => {
    postResult(config.postUrl, data.id, data.result);
  });
}, 100);
