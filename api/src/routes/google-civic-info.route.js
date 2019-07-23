// https://developers.google.com/civic-information/docs/using_api
// https://developers.google.com/civic-information/docs/v2/representatives/representativeInfoByAddress
// https://github.com/googleapis/google-api-nodejs-client
const { google } = require('googleapis');
const fs = require('fs');

function apiKey() {
  return new Promise((resolve, reject) => {
    if (process.env.GOOGLE_API_KEY) {
      resolve(process.env.GOOGLE_API_KEY);
    } else {
      fs.readFile('./keys/google/apikey.txt', (err, data) => {  
        if (err || !data) {
          reject(err || new Error('Failed to fetch data.'));
          return;
        }
        const key = data.toString();
        resolve(key);
      });
    }
  });
}

async function repsForAddress(req, res) {
  const address = req.params.address;
  let key;
  try {
    key = await apiKey();
  } catch (e) {
    console.error(e);
    return;
  }
  const civicInfo = google.civicinfo({
    version: 'v2',
    auth: key,
  });
  const results = await civicInfo.representatives.representativeInfoByAddress({
    address: address,
  });
  res.status(200).json(results.data);
}

async function test() {
  const address = '3423 Piedmont Rd NE, Atlanta, GA 30305';
  repsForAddress({ params: { address } }, {
    status: () => {
      return {
        json: (res) => { 
          const { officials, normalizedInput } = res;
          console.log(`\n\nReceived representatives for address: ${JSON.stringify(normalizedInput)}\n\n----------\n\n`);
          officials.forEach(official => {
            console.log(`${JSON.stringify(official)}\n\n----------\n\n`);
          });
        }
      }; 
    }
  });
}

if (require.main === module) {
  test();
}

module.exports = {
  repsForAddress,
};