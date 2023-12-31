const axios = require('axios');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:80';
const REQUESTS_COUNT = Number(process.env.REQUESTS_COUNT || '1000');
const INTERVAL = Number(process.env.RQEUESTS_INTERVAL || '60000');

let total = 0;
let success = 0;
let error = 0;
const WAIT_TIME = Math.floor(INTERVAL / REQUESTS_COUNT);
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const doJob = async () => {
  for (let i = 0; i < REQUESTS_COUNT; i++) {
    await sleep(WAIT_TIME)
    total++;
    axios.get(ENDPOINT, {
      params: {
        transactions: new Array(Number(process.env.NUM_OF_TR || '100')).fill({
          hello: 'world',
          test: '123',
          myNameIs: 'annasun',
          exo: 'ho du esh ches',
          testing_num: 123,
          semantic: 'release',
          node: 'js',
          transaction_id: '1231',
          fixed_: 123
        })
      }
    }).then((e) => {
      success++;
    }).catch(e => {
      error++;
      // console.error(e);
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