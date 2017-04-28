

var casper = require('casper').create({
    verbose: true,
});
  var fs = require("fs");
  var json = fs.read("./add.json");
  var jsondata = JSON.parse(json);
	var userList = jsondata["users"];


  casper.start("https://dn.ap-com.co.jp/cgi-bin/dneo/dneo.cgi?cmd=plantweekgrp&log=on#cmd=plantdaygrp", function(){
    //ログイン



    this.fill('#inputfrm', { UserID: 'endo', _word: 'soccer10' }, true);

  		this.wait(5000, function() {
  				this.capture('login_done.png');
          this.click('#jsch-tab-plantdaygrp > a');
  		});
      this.wait(5000, function() {
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


		 this.wait(5000, function() {
      this.capture('scheduleInput.png');

      var startHour = jsondata["starttime"].slice(0,2);
      var endHour = jsondata["endtime"].slice(0,2);
			var startMin = jsondata["starttime"].slice(-2);
      var endMin = jsondata["endtime"].slice(-2);

			var startdate = jsondata["stertdate"].replace( /-/g  , "/" );
			var enddate = jsondata["enddate"].replace( /-/g  , "/" );
			this.fillSelectors('form#inputfrm', {
				'input[data-name="startdate"]': startdate,
				'input[data-name="enddate"]': enddate,
				 'input[name="detail"]':   jsondata["title"],

				 'span:nth-child(5) > select.co-timepicker-hour': startHour,
				 'span:nth-child(9) > select.co-timepicker-hour': endHour,
				 'span:nth-child(5) > select.co-timepicker-minute': startMin,
				 'span:nth-child(9) > select.co-timepicker-minute': endMin

		 }, true);


    });


  });
  casper.then(function(){
		this.wait(5000, function() {
      this.capture('schedulesubmit.png');
			if(this.getElementAttribute('#jsch-plantweekgrp', 'style') == 'display: block;'){
				this.echo('OK');
			}else{
				this.echo('NG');
			}
		});
  })
  //結果のキャプチャ

	casper.run(function() {
    // echo results in some pretty fashion
		this.exit();
	});
