const pageScraper = require('./scrapers/specseyewear');
const pageScraper2 = require('./scrapers/shadesofcharleston');
const pageScraper3 = require('./scrapers/bloomingdales');
const pageScraper4 = require('./scrapers/solsticesunglasses');
const pageScraper5 = require('./scrapers/sunglassworld');

async function scrapeAll(browserInstance){
    let browser;
    try{
        browser = await browserInstance;
        // await pageScraper.scraper(browser);
        // await pageScraper2.scraper(browser);
        await pageScraper3.scraper(browser);
        // await pageScraper4.scraper(browser);
        // await pageScraper5.scraper(browser);
    }
    catch(err){
        console.log("Could not resolve the browser instance => ", err);
        fs.appendFileSync('log_file.txt', (err.message + '\n'))
    }
}

module.exports = (browserInstance) => scrapeAll(browserInstance)