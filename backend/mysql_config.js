const mysql = require('mysql');
const util = require('util');

//MySQL Config
const conn = mysql.createConnection({
    host: '192.168.4.4',
    user: 'root',
    password: 'rr3m0',
    database: 'dbhrdonline'
});

const request = util.promisify(conn.query).bind(conn);

module.exports = { request };