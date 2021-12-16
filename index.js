const displayData = require('./services/displayData')
const saveScrapedData = require('./services/saveScrapedData')
const express = require('express');
const app = express();

const browserObject = require('./browser');
const scraperController = require('./pageController');

let browserInstance = browserObject.startBrowser();

scraperController(browserInstance)



app.get('/download/json', displayData);

app.get('/download/allData', saveScrapedData);

app.listen(3000, () =>{
    console.log(`Example app listening at http://localhost:${3000}`)
})