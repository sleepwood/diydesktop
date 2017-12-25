var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

//定义常量
var Url = 'https://item.taobao.com/item.htm?id=558818203763';//tmail-525432847421/3681469779062 jd-4055764
var Type = new Object();

function decode(type,id,skuId){
  typeJudgement(type);
  if(skuId != null){//如果有不同商品的商品选项
    Url = Type.url + id + '&skuId=' + skuId;
  }
  else{
    Url = Type.url + id;
  }
  if(type == 'jd'){
    console.log("123");
    Url = Type.url+id+'.html';
  }
  console.log(Url);
  //发送请求
  request({
    url : Url,
    method : 'GET',
    encoding : null
  },function(err, red, body) {
    //请求到body
    if(err){
      console.log(Url);
      console.error('[ERROR]Collection' + err);
      return;
    }
    if(Url){
      var buf =  iconv.decode(body, 'gbk');
      var data = dataPraseDolphin(buf);
      return data;
    }
  })
}

/*
* 解析html
*/
function dataPraseDolphin(body) {
  var $ = cheerio.load(body);

  var img = $(Type.image).attr('data-origin').substr(2);
  var price = $(Type.price).text();

  var title = $(Type.titles).text().trim();

  var feedback = new Object();
  feedback.image = img;
  feedback.price = price;
  feedback.titles = title;
  var data = JSON.stringify(feedback);
  console.log(data);
  return data;
}
/*
* 判断类型 待Promise化
*/
function typeJudgement(type){
  var conf = fs.readdirSync('config');
  for(var i=0;i<conf.length;i++){
    if(type == conf[i].split(".")[0]){
      var config = fs.readFileSync('config/'+conf[i]);//返回JSON
      Type = JSON.parse(config);//JSON转对象
      break;
    }
  }
}
module.exports = {
  decode:decode,
  typeJudgement:typeJudgement,
}
