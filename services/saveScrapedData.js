const sql = require('../db.js');
const fs = require('fs')

let saveScrapedData = (req, response) => {
    if(req.url == '/download/allData'){
        sql.query("SELECT * FROM glasses;", (err, res) => {
            let currentdate = new Date()
            let exactDate = currentdate.getFullYear()+'-'+ (currentdate.getMonth() + 1) +'-'+currentdate.getDate()+'_'+currentdate.getHours()+'-'+currentdate.getMinutes()
            for (let i=0; i < res.length; i++){
                let product = res[i].id + "," + res[i].url + "," + res[i].title + "," + res[i].price;
                    fs.appendFileSync(`downloaded_${exactDate}.csv`, JSON.stringify(product) + '\n')
            }
        })
    }
    response.status(200).send("Data successfully saved")
    response.end();
}

module.exports = saveScrapedData;