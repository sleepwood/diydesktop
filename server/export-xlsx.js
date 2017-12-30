const fs = require('fs');
const xlsx = require('better-xlsx');

function exportXlsx(data){
  var file = new xlsx.File();
  var sheet = file.addSheet('装机单');

  //Title
  var row = sheet.addRow();
  row.setHeightCM(1.5);
  var cell = row.addCell();
  cell.value = data.title;
  cell.hMerge = 4;
  style(cell,0);
  border(cell,1,1,1,1);
  fill(cell,0);


  //Header
  hrow = sheet.addRow();
  hrow.setHeightCM(0.8);
  for(var q=0;q<data.header.length;q++){
    var cell = hrow.addCell();
    cell.value = data.header[q];
    style(cell,0);
    border(cell,1,1,1,1);
    fill(cell,1);
  }
  //Content
  for(var j=0;j<data.data.length;j++){
    var jrow = sheet.addRow();
    var line = data.data[j];
    jrow.setHeightCM(0.8);
    //Col 1
    var cell = jrow.addCell();
    cell.value = line[0];
    style(cell,0);
    border(cell,1,1,1,1);
    fill(cell,2);
    //Col 2
    var cell = jrow.addCell();
    cell.value = line[1];
    style(cell,1);
    border(cell,1,1,1,1);
    fill(cell,3);
    //Col 3
    var cell = jrow.addCell();
    cell.value = line[2];
    style(cell,1);
    border(cell,1,1,1,1);
    fill(cell,3);
    //Col 4
    var cell = jrow.addCell();
    cell.setNumber(line[3]);
    style(cell,0);
    border(cell,1,1,1,1);
    fill(cell,3);
    //Col 5
    var cell = jrow.addCell();
    cell.setNumber(line[4]);
    cell.numFmt = "¥#,##0.00";
    style(cell,2);
    border(cell,1,1,1,1);
    fill(cell,3);
  }
  //Footer
  var srow = sheet.addRow();
  srow.setHeightCM(1);
    var cell = srow.addCell();
    cell.value = "总计";
    style(cell,0);
    border(cell,1,1,1,1);
    fill(cell,1);
    var sum = srow.addCell();
    sum.hMerge = 3;
    sum.setNumber(data.footer[0]);
    sum.numFmt = "¥#,##0.00";
    style(sum,0);
    border(sum,1,1,1,1);
    fill(sum,1);
  srow = sheet.addRow();
  srow.setHeightCM(0.6);
    var cell = srow.addCell();
    cell.hMerge = 4;
    cell.value = data.footer[2]+"  "+data.footer[3]+"  "+data.footer[1];
    style(cell,0);
    border(cell,1,1,1,1);
    fill(cell,0);

  //ColStyle
  var col = sheet.col(0);
  col.width = 9.65;
  col = sheet.col(1);
  col.width = 26;
  col = sheet.col(2);
  col.width = 26;
  col = sheet.col(3);
  col.width = 13.5;
  col = sheet.col(4);
  col.width = 11;


  return new Promise(function(resolve,reject){
    file
        .saveAs()
        .pipe(fs.createWriteStream('tmp/'+data.footer[2].substr(3)+data.footer[3]+'.xlsx'))
        .on('error',(err)=>{
          reject(error);
        })
        .on('finish', () => {
          resolve('tmp/'+data.footer[2].substr(3)+data.footer[3]+'.xlsx');
        })
  })
}

function fill(cell, type) {
  var colors = ['ff8db4e2', 'ffc4d79b', 'fffabf8f', 'ffddd9c4'];
  // 0: header/footer, 1: title/sum row, 2: first col, 3: body col
  cell.style.fill.patternType = 'solid';
  cell.style.fill.fgColor = colors[type];
  cell.style.fill.bgColor = 'ffffffff';
}

function border(cell,top,left,bottom,right){
  var black = 'ff000000';
  cell.style.border.top = 'thin';
  cell.style.border.topColor = black;
  cell.style.border.left = 'thin';
  cell.style.border.leftColor = black;
  cell.style.border.bottom = 'thin';
  cell.style.border.bottomColor = black;
  cell.style.border.right = 'thin';
  cell.style.border.rightColor = black;
}

function style(cell,type){
  var aligns = ['center','left','right'];
  //0: header/title/footer/sum, 1: body, 2: body(price)
  cell.style.align.h = aligns[type];
  cell.style.align.v = "center";
}
module.exports = {
  exportXlsx:exportXlsx,
}
