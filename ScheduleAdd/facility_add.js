

  var casper = require("casper").create();
  var fs = require("fs");
  var json = fs.read("./add.json");
  var jsondata = JSON.parse(json);
  //フェイスブックにログインする

  casper.start("https://dn.ap-com.co.jp/cgi-bin/dneo/dneo.cgi?cmd=plantweekgrp&log=on#cmd=plantdaygrp", function(){
    //ログイン
  	this.echo("開始");

    this.fill('#inputfrm', { UserID: 'endo', _word: 'soccer10' }, true);

  		this.echo("ロード中");
  		this.wait(5000, function() {
          this.echo("ログイン完了");
  				this.capture('login_done.png');
          this.click('#jsch-tab-plantdaygrp > a');
  		});
      this.wait(5000, function() {
          this.echo("スケジュール1日画面へ遷移");
  			this.capture('scheduleURL.png');
        //lukeの予約画面
        this.mouse.doubleclick('#jsch-plantdaygrp > form > div.sch-gday-wrap.sch-cal-group-day.jsch-cal-list > div > div.cal-h-timebar.sch-gday-allday > div:nth-child(2) > div.cal-timebar-allday-body');
      });

  });


  casper.then(function(){
    this.wait(3000, function() {

      this.echo("スケジュール入力画面へ遷移完了");
      this.capture('scheduleInput.png');

      var startTime = jsondata["startTime"];
      var endTime = jsondata["endTime"];
      this.evaluate(function(){
        document.querySelector('#inputfrm > div.co-mainarea.co-editarea > table > tbody > tr.sch-row-date.normal > td > div > span:nth-child(5) > input').setAttribute('value',startTime);
        document.querySelector('#inputfrm > div.co-mainarea.co-editarea > table > tbody > tr.sch-row-date.normal > td > div > span:nth-child(9) > input').setAttribute('value',endTime);
      });

        this.echo("時間選択完了");

    });
  		this.wait(3000, function() {

        var html = this.evaluate(function(){
  				return document.querySelector('#inputfrm > div.co-mainarea.co-editarea > table > tbody > tr.sch-row-date.normal > td > div').outerHTML;
  	    });
        var fs = require('fs');
  	    fs.write('./facility_add.html', html, 'w');
  			this.capture('scheduleInput1.png');

  this.sendKeys('#inputfrm > div.co-mainarea.co-editarea > table > tbody > tr.sch-row-event > td > input', 'test', {reset: true});



  		});

  });
  casper.then(function(){
    this.wait(1000, function() {

      this.capture('scheduleInput2.png');
      this.click('#inputfrm > div.co-actionwrap.bottom > div > input[type="submit"]');
    });
    this.wait(3000, function() {

      this.capture('schedulesubmit.png');
    });
  })
  //結果のキャプチャ

  casper.run();
