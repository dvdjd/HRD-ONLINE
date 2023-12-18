const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "outlook.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "admin-system@nmc-net.com",
        pass: "@dm!n5ys"
    },
});

module.exports = transporter