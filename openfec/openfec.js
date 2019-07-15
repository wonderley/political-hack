// https://api.open.fec.gov/developers/
const fs = require('fs');
const fetch = require('node-fetch');

async function candidatesForName(key, name) {
  const url = encodeURI(`https://api.open.fec.gov/v1/candidates/search?api_key=${key}&name=${name}`);
  const response = await fetch(url);
  const json = await response.json();
  console.log(JSON.stringify(json));
};

fs.readFile('apikey.txt', 'utf8', function(err, data) {  
  if (err) throw err;
  const name = 'David Perdue';
  candidatesForName(data.toString(), name).catch(console.error);
});

