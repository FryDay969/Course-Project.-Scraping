const sql = require('../db.js');

let displayData = (req, response) => {
    if(req.url == '/download/json'){
        sql.query("SELECT * FROM glasses;", (err, res) => {
            response.send(res)
        })
    }

}


module.exports = displayData;