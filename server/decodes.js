var request = require('request-promise');
var md5 = require('./util/md5');
var iconv = require("iconv-lite");

async function decodeurl(url){
  var token = md5.d.encrypt(url,2,true);
  url = escape(url);
  var site = "http://tool.manmanbuy.com/m/history.aspx?DA=1";
  var result = site+"&action=gethistory&url="+url+"&token="+token;
  var item = new Object();
  console.log(result);
  var options =   { method: 'GET'
    , uri: result
    , gzip: true
    , jar: true
    , encoding: null
    , headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
      'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8',
      'Cache-Control':'no-cache',
      'Upgrade-Insecure-Requests':1,
      'Pragma':'no-cache',
      'Accept-Encoding':'gzip, deflate'
      }
    }
    var callback = await request(options)
        .then(function(data){
            var strJson = iconv.decode(data,'gb2312'); // 汉字不乱码
            var tmp = JSON.parse(strJson);
            if(tmp.ok==1){// 有数据的情况
              item.ok = tmp.ok;
              item.titles = tmp.spname;
              item.price = tmp.spprice;
              item.image = tmp.sppic;
              item.url = tmp.spurl;
            }
            else{// 没数据的情况
              item.ok = tmp.ok;
              item.msg = "无法搜索到查找的商品！";
            }
            return JSON.stringify(item);
        })
        .catch(function(err){
            throw err;
        })
    return callback;
}
module.exports = {
  decodeurl:decodeurl,
}
