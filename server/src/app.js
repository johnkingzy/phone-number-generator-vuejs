const express = require('express');
const fs = require('fs');
const cors = require('cors');

const helpers = require('./helper');

const port = process.env.port || 8000;
const jsonStore = './src/data/store.json';

const app = express();

app.use(cors());

app.get('/api/numbers', function(req, res) {

    // get the generated number
    let generatedNumbers = helpers.generateNumbers();

    // read content from json file
    let results = [];
    if (fs.existsSync(jsonStore)) {
        let jsonFileReader = fs.readFileSync(jsonStore, 'utf8');
        results = JSON.parse(jsonFileReader);
    }
    

    generatedNumbers = generatedNumbers.map((value) => {
        value.id = value.id + (results.length + 1);
        return value;
    });

    const mergedNumbers = [
        ...results,
        ...generatedNumbers
    ];

    // write generated numbers to json file
    fs.writeFileSync(jsonStore, JSON.stringify(mergedNumbers));

    // return a response with status 200 If numbers was generated successfully
    return res.status(200)
    .json({
        numbers: mergedNumbers,
        message:`${generatedNumbers.length} numbers was generated successfully`
    });
});

app.listen(port, function() {1
    console.log('App is running on port: ', port);
});

module.exports = app;