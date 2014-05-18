var { ActionButton } = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var selection = require("sdk/selection");
var panels = require("sdk/panel");
var self = require("sdk/self");
var sb = require("./shanbay.js");

tabs.open({url: "http://ruby.org"});


var panel = panels.Panel({
        contentURL: self.data.url("panel.html"),
        position: {
            top: 10,
            right: 10,
        },
        width: 350,
        height: 200,
});

var button = ActionButton({
        id: "my-button",
        label: "my button",
        icon: {
            "16": "./icon-16.png",
            "32": "./icon-32.png",
            "64": "./icon-64.png"
        },
        onClick: function() {
            panel.show();
        }
});

var tr_data;
selection.on('select', function() {
    sb.search_keyword(selection.text, function(data) {
        tr_data = data;
        panel.show();
    });
});

panel.on("show", function() {
    panel.port.emit("show", tr_data);
});

panel.port.on("text-entered", function (text) {
  console.log(text);
  text_entry.hide();
});
