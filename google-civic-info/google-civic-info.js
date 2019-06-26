const { google } = require('googleapis');

// https://developers.google.com/civic-information/docs/using_api
// https://developers.google.com/civic-information/docs/v2/representatives/representativeInfoByAddress
// https://github.com/googleapis/google-api-nodejs-client

var fs = require('fs');

async function fetch(key) {
  const civicInfo = google.civicinfo({
    version: 'v2',
    auth: key,
  });
  const res = await civicInfo.representatives.representativeInfoByAddress({
    address: '3423 Piedmont Rd NE, Atlanta, GA 30305'
  });
  const { officials, normalizedInput } = res.data;
  console.log(`\n\nReceived representatives for address: ${JSON.stringify(normalizedInput)}\n\n----------\n\n`);
  officials.forEach(official => {
    console.log(`${JSON.stringify(official)}\n\n----------\n\n`);
  });
};

fs.readFile('apikey.txt', 'utf8', function(err, data) {  
  if (err) throw err;
  console.log(data.toString());
  fetch(data.toString()).catch(console.error);
});

