var fs = require('fs');
//var async = require('async');
var Url = "";
var Type = new Object();
async function decode(type,id,skuId){
  await typeJudgement(type,id,skuId).catch(function(err){
    console.log(err);
  });
  return capture(Url,Type.image,Type.price,Type.titles);
}
/*
* 判断类型
*/
async function typeJudgement(type,id,skuId){
  var conf = await readDir('config').catch(function(err){
    console.log(err);
  });
  for(var i=0;i<conf.length;i++){
      if(type == conf[i].split(".")[0]){
        var config = await readFile('config/'+conf[i]).catch(function(err){//返回JSON
          console.log(err);
        });
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
