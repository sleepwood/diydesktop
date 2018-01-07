var fs = require('fs');
var Url = "";
var Type = new Object();
async function decode(url){
  await typeJudgement(url).catch(function(err){
    console.log(err);
  });
  console.log(Url);
  return capture(Url,Type.image,Type.price,Type.titles);
}
/*
* 判断类型
*/
async function typeJudgement(url){
  var i = 0;
  var conf = await readDir('config').catch(function(err){//读取所有的配置文件
    console.log(err);
  });
  var type = url.split('/')[2];
  for(;i<conf.length;i++){
      var config = await readFile('config/'+conf[i]).catch(function(err){//返回JSON
        console.log(err);
      });
      config = JSON.parse(config);
      if(type == config.url.split("/")[2]){
          Type = config;//JSON转对象
        break;
      }
  }
  if(conf[i] == "jd.json"){
    Url = url;
  }
  else{
    var id = url.substring(url.indexOf('id='),url.indexOf('id=')+15);
    if(url.indexOf('skuId=') != -1){//如果是天猫链接
      id += '&' + url.substring(url.indexOf('skuId='),url.indexOf('skuId=')+19);
    }
    Url = config.url + id;
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
var readFile = function (fileName){
  return new Promise(function (resolve, reject){
    fs.readFile(fileName, function(error, data){
      if (error) reject(error);
      resolve(data);
    });
  });
};
var readDir = function (dirName){
  return new Promise(function (resolve, reject){
    fs.readdir(dirName, function(error, files){
      if (error) reject(error);
      resolve(files);
    });
  });
};
module.exports = {
  decode:decode,
}
