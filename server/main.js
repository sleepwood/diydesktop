var express = require('express');
var decode = require('./decode');
var xlsx = require('./export-xlsx');
var app = express();
const data = {
  "title":"装机单——测试装机",
  "header":["部件","名称","链接","数量","价格"],
  "data":[
    ["CPU","测试数据","https://github.com",1,619],
    ["主板","测试数据","https://github.com",1,689],
    ["内存","测试数据","https://github.com",2,689],
    ["显卡","测试数据","https://github.com",1,1299],
    ["机械硬盘","测试数据","https://github.com",1,299]
  ],
  "footer":[2976,"power by diydesktop","ID:admin","2018-1-1"]
};


app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/decode',function(req, res){
  (async function(){
    var callback = await decode.decode("jd","4055764");
    console.log(callback);
    res.send(callback);
  })()
});
app.get('/xlsx',function(req, res){
  (async function(){
    var callback = await xlsx.exportXlsx(data);
    console.log(callback);
    res.download(callback, 'desktoplan.xlsx');
  })()
});
/*app.get('/decode',function(req, res){
  var callback = decode.decode("jd","4055764");
  res.end(callback);
});*/
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
