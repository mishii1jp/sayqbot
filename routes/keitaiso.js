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

module.exports = router;
