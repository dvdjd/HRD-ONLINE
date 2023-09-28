const sql = require("mssql");

//MSSQL Config
const config = {
    user: 'sa',
    password: '11eds2000',
    server: '192.168.4.9\\SQLEXPRESS',
    database: 'AMPS_NIPPON',
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        trustServerCertificate: true
    }
};

const request = new sql.Request();

module.exports = { request };
