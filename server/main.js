var express = require('express');
var decodes = require('./decodes');
var xlsx = require('./export-xlsx');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/decode', function (req, res) {
  (async function(url){
    var callback = await decodes.decodeurl(url);
    console.log(callback);
    res.send(callback);
  })("http://item.jd.com/5212150.html")
});
app.get('/xlsx',function(req, res){
  (async function(data){
    var callback = await xlsx.exportXlsx(data);
    //res.send(callback);
    res.download(callback, 'desktoplan.xlsx');
  })({
    "title":["装机单——测试装机","ID:admin","2018-1-1"],
    "header":["部件","名称","链接","数量","价格"],
    "data":[
      ["CPU","测试数据","https://github.com",1,619],
      ["主板","测试数据","https://github.com",1,689],
      ["内存","测试数据","https://github.com",2,689],
      ["显卡","测试数据","https://github.com",1,1299],
      ["机械硬盘","测试数据","https://github.com",1,299]
    ],
    "footer":[2976,"power by diydesktop"]
  })
  //测试数据如上
});
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
