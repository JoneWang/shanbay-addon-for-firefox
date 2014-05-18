/*
  * Custom your app config
  * include this script before lib/shanbay_oauth2.js
  */

exports.AppConf = {
    "client_id": "30dda9780248003666c9",
    "client_secret": "53bc5ab4db510680c9151917256caf3973ce3e21"
};

exports.ShanbayConf = {
    "api_version":"1.0",
    "api_root": "https://api.shanbay.com",
    "auth_url":"/oauth2/authorize/",
    "token_url":"/oauth2/token/",
    "auth_success_url": "/oauth2/auth/success/",
    "search": "/bdc/search/",
};
