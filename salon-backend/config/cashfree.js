const { Cashfree } = require("cashfree-pg");
require("dotenv").config();

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;

// Correct way
Cashfree.XEnvironment = "sandbox";

module.exports = Cashfree;