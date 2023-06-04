require("dotenv").config();

const sendgridTransport = require("@sendgrid/mail");

sendgridTransport.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = sendgridTransport;
