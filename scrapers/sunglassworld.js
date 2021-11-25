const scraperObject4 = {
    url: "https://www.sunglassworld.net/product-category/sunglasses/maui-jim/",
    async scraper(browser){
        let products =[];
        let page = await browser.newPage();
        await page.goto(this.url);
        console.log(`Navigating to ${this.url}...`);
        async function recutsiveScrape() {
            try {
                await page.waitForSelector('ul.products.columns-3');
                let productsAmount = await page.$$eval(`#products > ul > li`, el => el.length);
                for (let i = 1; i <= productsAmount; i++) {
                    let dataObj = {};
                    dataObj.productsUrl = await page.$eval(`#products > ul > li:nth-child(${i}) > a.woocommerce-LoopProduct-link.woocommerce-loop-product__link`, el => el.href);
                    dataObj.title = await page.$eval(`#products > ul > li:nth-child(${i}) > a.woocommerce-LoopProduct-link.woocommerce-loop-product__link > h2`, text => text.textContent);
                    dataObj.price = (await page.$eval(`#products > ul > li:nth-child(${i}) > a.woocommerce-LoopProduct-link.woocommerce-loop-product__link > span.price > span > bdi`, text => text.textContent)).replace('\n', '');
                    products.push(dataObj)
                }
                console.log(products)
                let nextButton = false;
                await page.waitForSelector('#products > nav > ul > li:nth-child(3) > a');
                nextButton = await page.$eval('#products > nav > ul > li:nth-child(3) > a', a => a.textContent);
                if(nextButton){
                    await page.click('#products > nav > ul > li:nth-child(3) > a');
                    return recutsiveScrape();
                }else{
                    nextButton = false;
                }
            }catch(err){
                const error = new Error("An error message")
            }
        }
        recutsiveScrape()
    }
}

module.exports = scraperObject4;



