function convertImgToBase64(url,target,callback){
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image();
    img.crossOrigin = '*';
    img.onload = function(){
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img,0,0);
      var dataURL = canvas.toDataURL('image/png');
      callback.call(this, dataURL);
      canvas = null;
    };
    img.src = url;
}
