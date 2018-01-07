var express = require('express');
var decode = require('./decode');
var codeapi = require('./unicode');
var xlsx = require('./export-xlsx');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/decode',function(req, res){
  (async function(url){
    var callback = await decode.decode(url);
    console.log(callback);
    res.send(callback);
  })("http://item.jd.com/5212150.html")//JD http://item.jd.com/5212150.html
  //taobao "https://item.taobao.com/item.htm?spm=a230r.1.14.104.44e6f594eRFPJL&id=521290836518&ns=1&abbucket=6#detail"
  //tmall "https://detail.m.tmall.com/item.htm?spm=0.0.0.0.aMTq3a&id=544913594159&abtest=24&rn=7713f28d3fedc7cb058d504eb3e8f29b&sid=955b1b9ced6c4166792c309865f57d5f&skuId=3284758100324"
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
app.get('/bijia',function(req, res){
  (async function(url){
    var callback = await codeapi.bijia(url);
    console.log(callback);
    res.send(callback);
  })("http://item.jd.com/5212150.html")
});
var server = app.listen(4000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
