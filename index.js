const axios = require('axios');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:80';
const REQUESTS_COUNT = Number(process.env.REQUESTS_COUNT || '1000');
const INTERVAL = Number(process.env.RQEUESTS_INTERVAL || '60000');

let total = 0;
let success = 0;
let error = 0;

const doJob = async () => {
  for (let i = 0; i < REQUESTS_COUNT; i++) {
    total++;
    axios.get(ENDPOINT).then((e) => {
      success++;
    }).catch(e => {
      error++;
      console.error(e);
    });
  }
}

doJob();
setInterval(async () => {
  await doJob();
}, INTERVAL);

setInterval(() => {
  console.info(`<METRICS>:${error}:${success}:${total}`);
  error = 0;
  success = 0;
  total = 0;
}, 10000);