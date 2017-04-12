const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(3000);
console.log('Server is online.');

app.post('/', function(req, res) {
    // リクエストボディを出力
    console.log(req.body);
    // パラメータ名、nameを出力
    console.log(req.body.roomId);

    var data = req.body;
    fs.writeFile('./add.json', JSON.stringify(data, null, '    '));


    var exec = require('child_process').exec;
    exec('casperjs ./facility_add.js', function(err, stdout, stderr){
      if (err) { console.log(err); }
    });
        res.send('POST request to the homepage');
})
