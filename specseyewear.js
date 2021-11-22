const fs = require('fs')

let upload = () => {
    try {
        let data = fs.readFileSync('specseyewear.com.txt', 'utf8');
        data = data.split("\r\n");
        data.pop('');
        return data
    } catch (err) {
        console.error(err)
    }
}

const scraperObject = {
    url: upload(),
    async scraper(browser){
        let products =[];
        for(let x=0; x < this.url.length; x++) {
            try {
                let page = await browser.newPage();
                console.log(`Navigating to ${this.url[x]}...`);
                await page.goto(this.url[x]);
                await page.waitForSelector('ul.snize-search-results-content.clearfix > li');
                let productsAmount = await page.$$eval(`ul.snize-search-results-content.clearfix > li`, el => el.length);
                console.log(productsAmount);
                for (let i = 1; i <= productsAmount; i++) {
                    let dataObj = {};
                    dataObj.productsUrl = await page.$eval(`ul.snize-search-results-content.clearfix > li:nth-child(${i}) > a`, el => el.href);
                    dataObj.title = await page.$eval(`ul.snize-search-results-content.clearfix > li:nth-child(${i}) > a > div.snize-item.clearfix > span > span.snize-title`, text => text.textContent);
                    dataObj.price = await page.$eval(`ul.snize-search-results-content.clearfix > li:nth-child(${i}) > a > div.snize-item.clearfix > span > div.snize-price-list > span.snize-price`, text => text.textContent);
                    products.push(dataObj)
                }
                console.log(products.length)
                await page.close()
            } catch (err) {
                console.log(err)
            }
        }
        fs.writeFileSync('newfile.csv', JSON.stringify(products))
        await browser.close()
    }
}

module.exports = scraperObject;