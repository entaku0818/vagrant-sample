

var casper = require('casper').create({
    verbose: true,
    logLevel: "debug"
});
  var fs = require("fs");
  var json = fs.read("./add.json");
  var jsondata = JSON.parse(json);
	var userList = jsondata["users"];
  //フェイスブックにログインする

  casper.start("https://dn.ap-com.co.jp/cgi-bin/dneo/dneo.cgi?cmd=plantweekgrp&log=on#cmd=plantdaygrp", function(){
    //ログイン



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
			//ユーザー選択
	    this.wait(5000, function() {
				this.capture('userstart.png');
				this.click('#inputfrm > div.co-ebtnarea.sch-ebtnarea > a:nth-child(2) > span.sch-edit-icon.add-user');
				this.capture('userend.png');
	    });
			//メニュー選択
			this.wait(5000, function() {
				this.capture('userstart2.png');
				this.click('#sch-entry-other-to-dialog > div > div.co-sel-header > ul > li.co-sel-search > a');
				this.capture('userend2.png');
			});
  });




  casper.then(function(){


			for(var i=0; i<userList.length; i++){

				var email = userList[i]["email"];
				this.echo(email);
				casper.wait(5000, function() {

					this.fillSelectors('div.co-sel-search > form', {
						 'input[name="mail"]': email
				 }, true);
				});

				casper.wait(5000, function() {
					this.capture('user' + i + '.png');
					this.click('#sch-entry-other-to-dialog > div > div.co-sel-content.ui-layout-container > div.ui-layout-center.co-sel-center.ui-layout-pane.ui-layout-pane-center.ui-layout-container > div.ui-layout-north.co-sel-top.ui-layout-pane.ui-layout-pane-north > div.co-sel-search.co-sel-chooser-items > div > table > tbody > tr > td.co-sel-button > a');
				});
			}


		//user登録
		this.wait(5000, function() {
			this.capture('userstart5.png');
			this.click('body > div.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.dn-dialog.co-sel-dialog.ui-draggable > div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button:nth-child(1) > span');
			this.capture('userend5.png');
		});
		 this.wait(5000, function() {
      this.echo("スケジュール入力画面へ遷移完了");
      this.capture('scheduleInput.png');

      var startHour = "22";
      var endHour = "23";

			this.fillSelectors('form#inputfrm', {
				'input[data-name="startdate"]': '2017/04/20',
				'input[data-name="enddate"]': '2017/04/20',
				 'input[name="detail"]':   'test',

				 'span:nth-child(5) > select.co-timepicker-hour': startHour,
				 'span:nth-child(9) > select.co-timepicker-hour': endHour,
				 'span:nth-child(5) > select.co-timepicker-minute': '00',
				 'span:nth-child(9) > select.co-timepicker-minute': '00'

		 }, true);

        this.echo("時間選択完了");

    });


  });
  casper.then(function(){

      this.capture('schedulesubmit.png');
  })
  //結果のキャプチャ

	casper.run(function() {
    // echo results in some pretty fashion
		this.echo('exiting..');
		this.exit();
	});
