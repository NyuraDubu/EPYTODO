const mysql = require('mysql2');
require('dotenv').config();
const config = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
};
const connection = mysql.createConnection(config);

module.exports.initconnection = () => {
    connection.connect(function(err) {
        if (err) {
            console.error("error connecting: " + err.stack);
            return;
        }
        console.log("Successfully Connected to DB");
    });
    return (connection);
}


