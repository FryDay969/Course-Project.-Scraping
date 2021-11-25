const puppeteer = require('puppeteer');

async function startBrowser(){
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true,
            defaultViewport: {
                width:1920,
                height:1080
            }
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
        fs.appendFileSync('log_file.txt', (err.message + '\n'))
    }
    return browser;
}

module.exports = {
    startBrowser
};