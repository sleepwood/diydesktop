var request = require('request');

async function bijia(url){
    return capture(url);
}

async function capture(url) {
  var exec = require('child_process').exec;
  return new Promise(function(resolve,reject){
    exec('casperjs manbuy.js --url='+url
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
  bijia:bijia,
}
