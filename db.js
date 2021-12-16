const mysql = require('mysql2');
const password = "mysql123$";

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "glass_products",
    password: password
})

connection.connect(function(err){
    if (err) {
        return console.error("Error: " + err.message);
    }
    else{
        console.log("Successful connection");
    }
})


module.exports = connection;