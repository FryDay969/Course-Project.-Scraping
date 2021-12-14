const fs = require('fs')
const Glasses = require('../db.models/glasses.model')
const { v4: uuidv4 } = require('uuid');

const scraperObject2 = {
    url: "https://shadesofcharleston.com/search?q=maui+jim",
    async scraper(browser){
        let products =[];
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        async function recutsiveScrape(){
            try {
                await page.waitForSelector('#MainContent > div > div.grid.grid--no-gutters.grid--uniform > div:nth-child(1) > div > a:nth-child(2) > div');
                let productsAmount = await page.$$eval(`#MainContent > div > div.grid.grid--no-gutters.grid--uniform > div`, el => el.length);
                for (let i = 2; i <= productsAmount; i++) {
                    let dataObj = {};
                    dataObj.productsUrl = await page.$eval(`#MainContent > div > div.grid.grid--no-gutters.grid--uniform > div:nth-child(${i}) > div > a:nth-child(2)`, el => el.href);
                    dataObj.title = await page.$eval(`#MainContent > div > div.grid.grid--no-gutters.grid--uniform > div:nth-child(${i}) > div > div > a > div.product-card__name`, text => text.textContent);
                    let cleanPrice = await page.$eval(`#MainContent > div > div.grid.grid--no-gutters.grid--uniform > div:nth-child(${i}) > div > div > a > div.product-card__price`, text => text.textContent);
                    dataObj.price = cleanPrice.replace('Regular price', '').trim();
                    products.push(dataObj)

                }
                let nextButton = false;
                nextButton = await page.$eval('#MainContent > div > div.pagination > span.next > a', a => a.textContent);
                if(nextButton){
                    await page.click('#MainContent > div > div.pagination > span.next > a');
                    return recutsiveScrape();
                }else{
                    await page.close()
                }

            }catch (err) {
                fs.appendFileSync('log_file.txt', (err.message + '\n'))
            }
            for (let y=0; y < products.length; y++){
                Glasses.saveScrapedResults(uuidv4(), products[y].productsUrl,products[y].title,products[y].price);
            }
        }
        recutsiveScrape()
    }

}

module.exports = scraperObject2;

