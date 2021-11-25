const scraperObject3 = {
    url: "https://www.bloomingdales.com/shop/search?keyword=maui+jim+",
    async scraper(browser){
        let products =[];
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        try{
            await page.goto(this.url);
            await page.waitForSelector('#row_0 > div > div.small-12.medium-12.large-10.cell.right-column > ul > li > div > ul');
            let productsAmount = await page.$$eval(`#row_0 > div > div.small-12.medium-12.large-10.cell.right-column > ul > li > div > ul > li`, el => el.length);
            for (let i = 1; i <= productsAmount; i++) {
                let dataObj = {};
                dataObj.productsUrl = await page.$eval(`ul > li > div > ul > li:nth-child(${i}) > div.productThumbnail > a`, el => el.href);
                dataObj.title = await page.$eval(`ul > li > div > ul > li:nth-child(${i}) > div.productThumbnail > a > div.productDescription > span:nth-child(2)`, text => text.textContent);
                let cleanPrice = await page.$eval(`ul > li > div > ul > li:nth-child(${i}) > div.productThumbnail > div.productDetail > div.priceInfo > div > div > span`, text => text.textContent);
                dataObj.price = cleanPrice.trim()
                products.push(dataObj)
                console.log(dataObj)
            }
            await page.close()
        }catch(err){
            fs.appendFileSync('log_file.txt', (err.message + '\n'))
        }

    }
}

module.exports = scraperObject3;




