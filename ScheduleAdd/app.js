const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const app = express();
const TEMPLATE = fs.readFileSync(path.join(__dirname, 'template', 'main.tmpl'));
const compiled = _.template(TEMPLATE);
const PORT = process.env.PORT || 3000;

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.get('/', (req, res) => {
	  var data = req.body;
		console.log(req.body);
		res.send(compiled({data: data}));
});



app.post('/add', function(req, res) {
    // リクエストボディを出力

    // パラメータ名、nameを出力
		var data = req.body;
		console.log(data);


    fs.writeFile('./add.json', JSON.stringify(data, null, '    '));

    var exec = require('child_process').exec;
    exec('casperjs ./facility_add.js', function(err, stdout, stderr){
      if (err) { console.log(err); }
    });


		res.send("予約完了しました！！！");
})

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});
