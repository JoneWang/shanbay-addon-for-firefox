var ss = require("sdk/simple-storage");
var tabs = require("sdk/tabs");
var config = require("./config");
var Request = require("sdk/request").Request;
var querystring = require('sdk/querystring');

console.log(config.AppConf.client_id)

var conf = config.ShanbayConf;
var client_id = config.AppConf.client_id;
var oauth = {};

exports.authorize = function() {
    console.log('auth');
    if (tabs.activeTab.id == oauth.tabID || token_valid()) {
        return false;
    }

    var authorize_url = conf.api_root + conf.auth_url;
    tabs.open({
            url: authorize_url + "?" + 
                querystring.stringify({
                        "response_type": "token", 
                        "client_id": client_id
                }),
            onReady: function onReady(tab) {
                console.log(tab.id);
                oauth.tabID = tab.id;
            }
    });
};

tabs.on("load", function(tab) {
    console.log('load');
    if (tab.id != oauth.tabID) {
        return false;
    }

    if (tab.url.indexOf(conf.auth_success_url) != -1) {
        var index = tab.url.indexOf('#') + 1;
        var hash = tab.url.slice(index, tab.url.length);
        hash = JSON.parse('{"' + decodeURI(hash).replace(/&/g, '","').replace(/=/g,'":"') + '"}');
        ss.storage.access_token = hash.access_token;
        ss.storage.expired_at = new Date((new Date()).getTime() + hash.expires_in * 1000);

        console.log(ss.storage.access_token);
        console.log(ss.storage.expired_at);

        tab.close();
    }
});

var has_token = function() {
    return ss.storage.access_token != undefined;
};

var expired = function() {
    var expired_at = ss.storage.expired_at;
    return expired_at == undefined || expired_at < new Date();
};

var token_valid = function() {
    return has_token() && !expired();
};

exports.clearToken = function() {
    delete ss.storage.access_token;
    delete ss.storage.expired_at;
};

exports.search_keyword = function(keyword, onComplete) {
    var search_url = conf.api_root + conf.search;
    console.log(search_url + "?" + querystring.stringify({word: keyword}));
    Request({
            url: search_url + "?" + querystring.stringify({word: keyword}),
            onComplete: function(response) {
                console.log(response.json);
                var data = response.json;
                if (data.status_code == 0) {
                    onComplete(data.data);
                }
            }
    }).get();
};
