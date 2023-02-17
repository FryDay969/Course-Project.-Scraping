const sql = require('../db.js');


const Glasses = (glasses) => {
        this.url = glasses.id,
        this.url = glasses.url,
        this.title = glasses.title,
        this.price = glasses.price
}

Glasses.saveScrapedResults = (id,url,title,price) => {
    sql.query(`INSERT INTO glasses (id, url, title, price) VALUES ("${id}", "${url}","${title}","${price}");`, (err, res) => {
        // if(err){
        //     fs.appendFileSync('log_file.txt', (err.stackTrace + '\n'))
        //     result (err, null);
        // }
        // if (res){
        //     result (null,res);
        // }
        // result (null,null);
    })
}



module.exports = Glasses;