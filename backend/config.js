const sql = require("mssql");

const config = {
    user: 'sa',
    password: '11eds2000',
    server: '192.168.4.9\\SQLEXPRESS',
    database: 'dbHRD'
};

// (async () => {
//     try {
//         let pool = await sql.connect(config)
//         let result = await pool.request()
//     } catch (error) {

//     }
// })()

let request = new sql.Request();

module.exports = { request };
