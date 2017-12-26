var casper = require('casper').create({
  //clientScripts: ["jquery.js"],
  verbose: false,
  onTimeout: 200,//留出页面动态加载价格的时间
  pageSettings: {
    loadImages: false, // The WebPage instance used by Casper will
    loadPlugins: false // use these settings
  }
});
//require("utils").dump(casper.cli.args);
var url = casper.cli.get("url");
var image = casper.cli.get("img");
var price = casper.cli.get("price");
var title = casper.cli.get("title");
var data = new Object();

casper.start(url, function() {//采集图片
  data.image = this.getElementInfo(image).attributes.src.substr(2);
})
casper.then(function(){//采集价格
  data.price = this.getElementsInfo(price)[0].html;
})
casper.then(function(){//采集标题
  data.titles = this.getElementsInfo(title)[0].html.trim();
})
/*casper.thenOpen('http://localhost:4000/test', {
  method: "get",
  data: {
    image: data.image,
    price: data.price,
    title: data.titles
  }
},function() {
    this.echo("选择信息已经提交到服务器。")
})*/
casper.then(function (){
  console.log(JSON.stringify(data));
  casper.exit();
})
casper.run();
