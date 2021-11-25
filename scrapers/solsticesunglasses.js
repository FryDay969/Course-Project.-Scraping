const scraperObject4 = {
    url: "https://solsticesunglasses.com/search?page=1&q=maui+jim&type=product",
    async scraper(browser){
        let products =[];
        let page = await browser.newPage();
        await page.goto(this.url);
        console.log(`Navigating to ${this.url}...`);
        async function recutsiveScrape() {
            try {
                await page.waitForSelector('#MainContent > div.page-width.page-content > div > div > div:nth-child(4) > div.grid.grid--uniform');
                let productsAmount = await page.$$eval(`#MainContent > div.page-width.page-content > div > div > div:nth-child(4) > div.grid.grid--uniform > div.grid__item.grid-product`, el => el.length);
                for (let i = 1; i <= productsAmount; i++) {
                    let dataObj = {};
                    dataObj.productsUrl = await page.$eval(`#MainContent > div.page-width.page-content > div > div > div:nth-child(4) > div.grid.grid--uniform > div:nth-child(${i}) > div > a`, el => el.href);
                    dataObj.title = await page.$eval(`#MainContent > div.page-width.page-content > div > div > div:nth-child(4) > div.grid.grid--uniform > div:nth-child(${i}) > div > a > div.grid-product__meta > div.grid-product__title.grid-product__title--body`, text => text.textContent);
                    dataObj.price = (await page.$eval(`#MainContent > div.page-width.page-content > div > div > div:nth-child(4) > div.grid.grid--uniform > div:nth-child(${i}) > div > a > div.grid-product__meta > div.grid-product__price`, text => text.textContent)).replace('\n', '');
                    products.push(dataObj)
                }
                console.log(products)
                let nextButton = false;
                await page.waitForSelector('#MainContent > div.page-width.page-content > div > div > div.pagination > span.next > a');
                nextButton = await page.$eval('#MainContent > div.page-width.page-content > div > div > div.pagination > span.next > a', a => a.textContent);
                console.log(nextButton)
                if(nextButton){
                    await page.click('#MainContent > div.page-width.page-content > div > div > div.pagination > span.next > a');
                    return recutsiveScrape();
                }else{
                    nextButton = false;
                    await page.close()
                    await page.close()
                }
            }catch(err){
                fs.appendFileSync('log_file.txt', (err.message + '\n'))
            }
        }
        recutsiveScrape()
    }
}

module.exports = scraperObject4;



