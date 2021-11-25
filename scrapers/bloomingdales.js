const scraperObject3 = {
    url: "https://www.bloomingdales.com/shop/search?keyword=maui+jim+",
    async scraper(browser){
        let products =[];
        let page = await browser.newPage();
        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url);
        await page.waitForSelector('#row_0 > div > div.small-12.medium-12.large-10.cell.right-column > ul > li > div > ul');
        let productsAmount = await page.$$eval(`#row_0 > div > div.small-12.medium-12.large-10.cell.right-column > ul > li > div > ul > li`, el => el.length);
        for (let i = 1; i <= productsAmount; i++) {
            let dataObj = {};
            dataObj.productsUrl = await page.$eval(`ul > li > div > ul > li:nth-child(${i}) > div.productThumbnail > a`, el => el.href);
            dataObj.title = await page.$eval(`ul > li > div > ul > li:nth-child(${i}) > div.productThumbnail > a > div.productDescription > span:nth-child(2)`, text => text.textContent);
            dataObj.price = await page.$eval(`ul > li > div > ul > li:nth-child(${i}) > div.productThumbnail > div.productDetail > div.priceInfo > div > div > span`, text => text.textContent);
            products.push(dataObj)
        }
        await page.close()
    }
}

module.exports = scraperObject3;




