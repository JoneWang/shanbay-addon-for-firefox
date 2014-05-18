// get html object
var textArea = document.getElementById("edit-box");
var word = document.getElementById("word");
var uk_audio = document.getElementById("uk_audio");
var us_audio = document.getElementById("us_audio");
var content = document.getElementById("content");

// show
addon.port.on("show", function onShow(data) {
    word.innerHTML = data.content;
    uk_audio.href = data.uk_audio;
    us_audio.href = data.us_audio;

    //var contentHTML = "<li>" + data.cn_definition.defn.replace("\n", "</li><li>") + "</li>";
    var contentHTML = data.cn_definition.defn.replace("\n", "<br />");
    console.log(contentHTML);
    content.innerHTML = contentHTML;
});

