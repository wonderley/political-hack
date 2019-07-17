// https://api.open.fec.gov/developers/
const fs = require('fs')
const fetch = require('node-fetch')

function apiKey() {
  return new Promise((resolve, reject) => {
    fs.readFile('./openfec/apikey.txt', (err, data) => {  
      if (err) reject(err)
      const key = data.toString()
      resolve(key)
    })
  })
}

async function candidatesForName(req, res) {
  const key = await apiKey()
  const name = req.params.name
  const url = `https://api.open.fec.gov/v1/candidates/search?api_key=${key}&name=${name}`
  const response = await fetch(url)
  const results = await response.json()
  res.status(200).json(results)
}

async function test() {
  const name = 'David Perdue'
  candidatesForName({ params: { name } }, {
    status: () => {
      return {
        json: (res) => { 
          console.log(JSON.stringify(res))
        }
      } 
    }
  })
}

if (require.main === module) {
  test()
}

module.exports = {
  candidatesForName,
}