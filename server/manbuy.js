var casper = require('casper').create({
  verbose: false,
  pageSettings: {
    loadImages: false, // The WebPage instance used by Casper will
    loadPlugins: false // use these settings
  }
});
var url ="http://tool.manmanbuy.com/m/history.aspx";
var target = casper.cli.get("url");
var data = new Object();

casper.start(url, function() {
  var text = this.getElementInfo('.textarea');
  this.sendKeys(".textarea", target);
})
casper.then(function(){
  var btn = this.getElementsInfo('.btn > input');
  this.click(".btn > input:nth-child(1)")
})
casper.waitForSelector('.spinfo > div:nth-child(1)', function() {
  data.titles = this.getElementInfo('.spinfo > div:nth-child(1)').text;
});
casper.waitForSelector('.currentprice', function() {
  data.price = this.getElementInfo('.currentprice').text;
});
casper.then(function(){
  console.log(JSON.stringify(data));
  casper.exit();
})
casper.run();
