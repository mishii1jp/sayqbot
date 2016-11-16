var express = require("express");
var path = require("path");
var app = express();

var bodyParser = require("body-parser");
//形態素解析
var keitaiso = require("./routes/keitaiso.js");

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

//形態素解析結果取得
app.post("/keitaiso", keitaiso);

app.listen(3000, function () {
  console.log("＜サーバ起動＞")
  console.log("http://localhost:3000/index.html へアクセスしてください。")
});
