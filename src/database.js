const mysql = require("mysql2");

const pool = mysql.createPool({

    host                : "localhost",
    user                : "root",
    password            : "bocajuniors12I!",
    database            : "school",
    waitForConnections  : true,
    connectionLimit     : 10,
    maxIdle             : 10,
    idleTimeout         : 60000,
    queueLimit          : 0              
}).promise();


console.log("----------------------------------------------------------------------------------------------------")
console.log("------------------------------------------Connection is OK------------------------------------------")
console.log("----------------------------------------------------------------------------------------------------")


module.exports = {pool};