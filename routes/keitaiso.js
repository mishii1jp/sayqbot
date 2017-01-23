var express = require("express");
var router = express.Router();

router.post("/keitaiso", function(req, res, next) {
    var kuromoji = require('kuromoji');

    //builderは形態素解析機オブジェクト
    var builder = kuromoji.builder({
        dicPath: 'node_modules/kuromoji/dict'
    });

    builder.build(function(err, tokenizer) {
        if(err) { throw err; }
        //形態素解析実行
        var tokens = tokenizer.tokenize(req.body.testwords);
        res.send(tokens);
    });
});

router.post("/faqdata", function(req, res, next) {
    //FAQのjsonファイルを読み込み
    var faqs = require('../resource/faqdata_securitycard.json');
    var faqArray = faqs.questions;
//    console.log(faqArray);
    //ユーザ入力の文字列
    var targetWord = req.body.targetWord;
    var scores =[];
    //ハイスコア
    var highScore = 0;
    //ハイスコアのFAQ
    var highScoreNumber;
    //回答
    var highScoreText = "";
    for (var i in faqArray) {
        //質問文を取り出し
        var question = faqArray[i];
        var scoring = {};
        scoring.number = question.number;
        //キーワード取り出し
        var words = question.words;
        //スコア
        var totalScore = 0;

        //キーワードごとに文字列引っ掛ける
        for (var keyword in words) {
            var keywordArray = words[keyword];
            keywordArray.unshift(keyword);
            for (var j in keywordArray) {
                var temp = keywordArray[j];
                if (targetWord.indexOf(temp) != -1) {
                    //含まれるため、１点加算してfor文を抜ける
                    totalScore = totalScore + 1;
                    break;
                }
            }
        }
        if (highScore < totalScore) {
            //ハイスコアを設定
            highScore = totalScore;
            //ハイスコアを叩き出したFAQを設定
            highScoreNumber = question.number;
            //回答をセット
            highScoreText = question.text;
        }
        //点数を加算
        scoring.totalScore = totalScore;
        scores.push(scoring);
    }
    //レスポンスを編集
    var resData = {};
    resData.highScore = highScore;
    resData.highScoreNumber = highScoreNumber;
    resData.highScoreText = highScoreText;
    resData.results = scores;
    res.send(resData);
});

module.exports = router;
