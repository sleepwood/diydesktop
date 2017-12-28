var fs = require('fs');
//var async = require('async');
var Url = "";
var Type = new Object();
function testDecode(type,id,skuId){
    typeJudgement(type,id,skuId);
    return capture(Url,Type.image,Type.price,Type.titles);
    //data = capture(Url,Type.image,Type.price,Type.titles);
}
/*
* 判断类型
*/
function typeJudgement(type,id,skuId){
  var conf = fs.readdirSync('config');
  for(var i=0;i<conf.length;i++){
    if(type == conf[i].split(".")[0]){
      var config = fs.readFileSync('config/'+conf[i]);//返回JSON
      Type = JSON.parse(config);//JSON转对象
      break;
    }
  }
  if(skuId != null){//如果有不同商品的商品选项
    Url = Type.url + id + '&skuId=' + skuId;
  }
  else{
    Url = Type.url + id;
  }
  if(type == 'jd'){
    Url = Type.url+id+'.html';
  }
}
async function capture(url,img,price,title) {
  var exec = require('child_process').exec;
  return new Promise(function(resolve,reject){
    exec('casperjs casper.js --url='+url+' --img='+img+' --price='+price+' --title='+title
      ,function(e,out){
      if(e){
        reject(e);
      }
      else{
        resolve(out);
      }
    });
  })
}
module.exports = {
  testDecode:testDecode,
}
