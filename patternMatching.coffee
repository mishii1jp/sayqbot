# FAQのデータセットを取得
faqs = require '../resource/faqdata_securitycard.json'
faqArray = faqs.questions

# Hubotから取ってくる
targetWord = 'たのめーるを使いたいのですが'

# スコアの配列
scores = []
# マッチングした中でのハイスコア
highScore = 0
# ハイスコアを獲得した質問No
highScoreNumber
# 回答文
highScoreText = ''

# FAQの数だけ繰り返す
# question:jsonオブジェクト,index配列のindex
for question, index in faqArray
    scoring = {}
    scoring.number = question.number
    # キーワードを取り出し
    words = question.words
    # 設問文に対するスコア
    totalScore = 0
    # key:元の単語,keywordArray:類語配列
    for key, keywordArray of words
        # キーワード配列
        keywordArray.unshift(key)
        for temp, j in keywordArray
            if targetWord.indexOf(temp) != -1
                totalScore = totalScore + 1
                break


    if highScore < totalScore
        highScore = totalScore
        highScoreNumber = question.number
        highScoreText = question.text
    scoring.totalScore = totalScore
    scores.push(scoring)
resData = {}
resData.highScore = highScore
resData.highScoreNumber = highScoreNumber
resData.highScoreText = highScoreText
resData.results = scores
console.log resData
