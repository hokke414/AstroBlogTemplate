---
layout: ../../layouts/BlogPostLayout.astro
title: '無知がGoogle App Scriptで学校祭の受付予約サービスを構築してみた話'
pubDate: 2025-11-24
description: 'Google Apps Script を使った実装と、公開への導線を整理しました。'
author: 'hokke414'
tags: 
  - GAS
---

最後の学校祭、なにか新しいことにチャレンジしたいということ、そして来てくれたお客さんに混雑のない快適な展示をつくるためにはどうすればよいかなどを考えた結果、オンライン予約システムを作ろうという考えに至りました。

自分が勝手に考え出してやったことなのでなかなか忙しい開発になりましたが、そこそこ使えるものにもなりましたし、校外の方々を含めたお客さんにも評価いただいてやってよかったな〜と感じております。


校内でも前例がなく、いろいろ試行錯誤を繰り返した中で気づいたこともありましたのでぜひお話させてください。

:::alert
説明のためコードを載せていますが、不十分な部分もあるかと思いますので参考にするときには十分注意してください。
:::

## 1.開発環境
開発に使ったのはChromebookだけです。スペックは
- ストレージ : 32GB
- CPU : Intel(R) Celeron(R) N4020 CPU @ 1.10GHz（スレッド数 2、2.800 GHz）
- メモリー : 4GB

と、小・中学校においてあるタブレットと体感ほぼ同じです。
自宅にはデスクトップパソコンはありましたが、ブラウザ上のVSCがあることを知りChromebookで始めました。


予約システムの構築等には主にGoogle Apps Scriptを使用しました。
Googleスプレッドシートをデータベースとして使用し、入退場記録や予約情報をGoogleフォームで送信してデータベースで管理、GASでHTMLに値を渡して公開、という形です。


このGAS開発には学校祭のシステム構築に見合ったメリットがあります。それが**操作の単純さと費用**です。

予約システムを活用することは、受付をし得るクラスメイト全員がこのシステムを操作できること、そして低コストであることが絶対条件となります。
それを一気に解決するのがGoogleのサービスです。直感的で多機能なGoogleのサービスを使えば操作しやすくて安定したシステムを構築することができます。そのうえ無料です。


## 2.開発の流れ
私がこの予約システムを開発したうえで踏んだステップは以下です。

1.機能・デザインの決定
2.入場者、案内完了のカウント実装
3.予約案内フォームの情報処理
4.待ち時間や、待ち組数の計算
5.お客さんに見せる案内Webサイトの構築
6.テスト公開、フィードバック


### ①機能・デザインの決定
代表委員や他の人と話してあれば便利そうなアイデアをだしてもらいました。

今回は「予約が簡単にできる」という手軽さを重視するということで、便利ですが「順番が近づいたらメールでお知らせする」などの機能は実装せず、
- もうすぐ呼ばれる組の受付番号
- 受付番号を入力すると推定待ち時間を計算する機能

を実装することとなりました。
ここはもっと時間があれば機能つけれたな〜と後悔しているところでもあります。


### ②入場者、案内完了のカウント実装
入場者と退場者のカウントは以下の関数で一発完了です。

```js
function CountSubmit() {
  const sh = SpreadsheetApp.openById('id').getSheetByName('sheet');
  const range = sh.getRange("B4");
  let number = range.getValue();     
  number++;     

  range.setValue(number);
```

スプレッドシート側のGASで「フォーム送信時に実行」トリガーで上の関数を実行すればセル上に何回受付フォームが送信されたか、すなわち何組客が予約したかが表示できるわけです。
それを利用しいくつかトリガーを設定しておきます。
![トリガー設定画面](https://storage.googleapis.com/zenn-user-upload/70141585b177-20251124.png)
*トリガー設定画面*

同様に客が出たときに「受付案内完了フォーム」を送信してセル上に実行された回数を記録、あとはスプレッドシート上の関数で2つの値の差をを未案内組数とします。

:::message
1つのスプレッドシートにつき1つのフォームの回答しか集められないので、案内完了フォームのカウントについては別のシートで行い、後ほどGASで別シートからメインのシートに値を引っ張ってきています。
:::

これらを後でHTMLに渡します。


### ③予約案内フォームの情報処理
予約をするにあたってお客さんに求めた情報は「代表者の氏名」と「人数」です。
プライバシーの観点からこれらの情報を受付番号でまとめて管理します。

受付番号の発行は以下の関数です。
```js
function CreateRepnumber(e) {
  if (!e) {
    console.log('エディタから起動できません。フォームから回答してください。');
    return;
  }
  const range = e.range;
  const sheet = range.getSheet();
  const row = range.getRow();

  let numberReceipt = 998 + row;

  sheet.getRange(row, 1).setValue(numberReceipt);
  const nextNumber = numberReceipt + 1;
  const form = FormApp.openByUrl(sheet.getFormUrl());
  form.setConfirmationMessage(`受付番号は、${nextNumber} です。\n番号を控えておき、入場の際はこの番号をお知らせください。`);
}
```
仕組みとしては、まずGoogleフォームの機能「回答をスプレッドシートに送信」を使用して回答をすべて一つのシートに集めます。引数rowではシートに溜まった情報数を格納し、それを使って受付番号を生成します。

:::message
"998+row"の部分については、受付の先頭番号を1001に揃えること、稼働前のテストプレイで1回フォームを送信することを考えて記述しています。
:::
コードの後半では発行した受付番号をフォームで送信された情報と同じ行に入力し、予約案内フォーム送信後の画面で受付番号を表示し、お客さんに知らせるコードとなっています。


### ④待ち人数や待ち組数の計算
ここもとてもシンプルです。②と③で数値化したものをいろいろ計算して完了です。

今回は受付組数や案内完了数、待ち組数を可視化したいのでそれぞれの情報をセルに移してそれをまたGASで取得、HTMLに出力、という感じです。

![実際のスプレッドシート画像](https://storage.googleapis.com/zenn-user-upload/2de6156aea5a-20251124.png)
*実際のスプレッドシートの画像*

せっかくスプレッドシート上に値があるので、スプレッドシート側で全フォーム入力数から案内完了数を引いた未案内数を求め、GASに取得してもらっています。B9のセルについては後ほど。

また待ち時間については展示の回転率を考慮します。私達の展示は一組だいたい5分だったので、未案内数に5をかけて待ち時間としています。これはGAS側で計算。


### ⑤お客さんに見せる案内Webサイトの構築
予約システムの大方はすでに出来上がっているので、これをWebサイトでお客さんに知らせます。完成品は以下の画像です。
![予約Webサイト](https://storage.googleapis.com/zenn-user-upload/8ba66e338cbb-20251124.jpg)
*予約Webサイト*

まずコード上段部ではまもなく案内する組の受付番号を表示しています。これは以下の関数をGAS側で5回繰り返すだけです。
```js
function get1() {
  const sheet = SpreadsheetApp.openById('id').getSheetByName('sheet');
  const value = sheet.getRange("D4").getValue();
  const cus = sheet.getRange("F4").getValue();
  let number = value + 1000;
  let text = "今待ち組はありません";

  if(cus<=0){
    return text;
  }else{
    return number;

  }
```
表示されている受付番号は受付完了数と1000を足した値で計算しています。受付案内フォームが送信されると受付完了数が増えるので、それに対応してHTML側の表示している値も増えます。

また、受付完了数が増えてもGASを再実行しないと値は更新されないので以下の関数を。
```js
function fetchAndCheckValue(){
      google.script.run.withSuccessHandler(function(value) {document.getElementById('1-value').innerText = value;}).get1();
      google.script.run.withSuccessHandler(function(value) {document.getElementById('2-value').innerText = value;}).get2();
      google.script.run.withSuccessHandler(function(value) {document.getElementById('3-value').innerText = value;}).get3();
      google.script.run.withSuccessHandler(function(value) {document.getElementById('4-value').innerText = value;}).get4();
      google.script.run.withSuccessHandler(function(value) {document.getElementById('5-value').innerText = value;}).get5();
      google.script.run.withSuccessHandler(function(value) {document.getElementById('time').innerText = value;}).CalWaiting();
      google.script.run.withSuccessHandler(function(value) {document.getElementById('cus').innerText = value;}).cus();
    }
    fetchAndCheckValue();
    setInterval(fetchAndCheckValue, 15000);
```
いろいろ実行するべき関数をすべて詰め込み、最後でsetIntervalを設定します。
ここはもっときれいな記述の仕方なかったのかな〜というのと、setintervalのdelayが15000ミリ秒(=15秒)なのが少し謎ですが問題なく動いていたのでいいでしょう。


下段では自分の受付番号を入力すると待ち組数と推定待ち時間を計算して教えてくれる機能です。これは有名飲食店の予約のような「いつアクセスしても自分の受付番号を覚えてくれる」機能を実装できなかったゆえのものです。高望みかもしれませんがそこまでできたら最高だったなと感じています。
関数は以下です。

```js
function calculateWait() {
    const userNum = parseInt(document.getElementById('userNumber').value, 10);
    if (isNaN(userNum)) {
      document.getElementById('waitResult').innerText = "番号は半角で正しく入力してください。";
      return;
    }
    google.script.run.withSuccessHandler(function(currentNum) {
      currentNum = parseInt(currentNum, 10);
      const remaining = userNum - currentNum;

      if (remaining <= 0) {
        document.getElementById('waitResult').innerText = "ただいまご案内中、またはすでに呼ばれています。";
      }else {
        const estimatedTime = remaining * 5; // 1人5分で計算（必要に応じて変更）
        document.getElementById('waitResult').innerText =
          `あと ${remaining} 組待ち（約 ${estimatedTime} 分）です。`;
      }
    }).getCurrentNumber();
   }
```

もう案内された番号は「もう案内済みですよ~」と出力します。しかし案内済み番号より大きい番号ならなんでも入力できるため、例えば間違って12000と入力してしまうと数千組待ちと表示されてしまいます。

コードが完成したら、いよいよデプロイです。
GAS側でウェブアプリとして実行してデプロイすれば完了です。
![たくさんのデプロイ](https://storage.googleapis.com/zenn-user-upload/21b0cb3d5928-20251124.jpg)
*たくさんのデプロイ*

:::message
doGet関数の記述を忘れるとHTMLが表示されないのでご注意ください。一応貼っておきます。
:::

```js
function doGet() {
  const htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
  htmlOutput.setTitle('PageTitle');
  return htmlOutput;
```

### ⑥テスト公開、フィードバック
システム自体は完成したので、実際にテストプレイを行ってみます。
流れとしては
- お客さんが来る
- 案内フォームに必要事項を記入、送信
(待ち組が5組以上なら予約へ、以下なら展示室前で待機してもらう)
- お客さんが出たら、次の組を展示へ案内し、案内完了フォームを送信する

これらを延々と繰り返します。待ち組が何組か、予約が使えるかどうかを示すために④で示したif関数を使用しています。

また、GASコードを約270行記述してこのシステムを構築していますが、特にラグや動作不良はありませんでした。

運用するうえで不十分がないことを確認すればあとは各シフトの受付係の人たちに説明するようの紙やお客さんへの案内文書を作るだけです。


## 3.いざ当日
完成してから時間があったのでいろいろ微調整を繰り返しながら迎えた当日。
ちゃんと動いてくれるか、成功するかどうか少し心配でしたが万全の準備をしたので大丈夫だろう、と迎えた日です。

### 急に動かなくなる
当日、私は指定されている登校時間よりも学校につきました。いろいろ展示室内の補強や最終チェック、それこそシステムの動作チェックも目的の1つです。

その日は学校祭1日目で生徒全員が体育館に集まる全校観覧があるので、それの15分前から最終チェックを始めました。
シートの情報を初期化し、フォームのテスト送信を行いました。

値が反映されない。

心臓が止まるほどの衝撃。なんで?昨日まで動いていたのに...

急いで原因の究明に移りました。コードがおかしいのか?どこかでエラーが起きているのか?最後まで探しましたが時間までに見つからず、全校観覧のため体育館へ移動しました。

今でも鮮明に覚えています。全校観覧の休憩時間、本来はトイレなどに行くのが大半ですが私だけ急いでタブレットがおいてある展示室へ走り原因究明を続けました。

結局、原因がGoogle側のラグでした。全校観覧を楽しんでいたら急に値が反映され、その後のテスト送信もうまく動作しました。
本当に怖かったです。


### お客さんが時間通りにこない
これはこの学校祭に限った話では無いと思います。
それこそ有名飲食店でも起こることです。

今回は少し遅れても案内しましたが、そこらへんのルールを詳しく設定していなかったので、これから予約系のサービスを作る際には予約時間通りに来ない客の対応、もしくは対策を考える必要がありそうです。


## 4.まとめ
他にもいろいろなことがありましたが、なんとか2日間、バグなしで終われました！

全126組、335人の方に楽しんでいただけました。少ないのか多いのかわかりませんが、どんな数字でも見てみると達成感が感じられます。

自分自身、GAS開発は基礎知識しかなく、調べながらの開発になりましたが、「なにかものを作って便利にする」精神を活動をもって感じられたかなと思いますし、この開発活動に協力してくれたクラスメイトや先生方に心から感謝したいと思っております。

ここまで読んでいただいてありがとうございました！
これからも頑張って活動して行きますのでよろしくお願いします！
