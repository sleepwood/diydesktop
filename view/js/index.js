var targetItem;
var item = new Object();//获取导入信息对象
var list = new Object();//列表对象
var listimg = [];//列表——图片链接数组
var listdata = [];//列表——生成xls文件所需数据数组
var category = ['CPU','主板','内存','显卡','HHD','SSD','散热','电源','机箱','显示器','鼠标','键盘','其他'];
var catecode = ['cpu','mdboard','memory','graphy','hhd','ssd','fans','power','case','monitor','mouse','keyboard','other'];
var clipboard = new Clipboard("#share-btn");
function setItem(e){
  if(e == 'add'){
    //设置图片
    targetItem.children().eq(1).css({"background-image":"url("+item.image+")","background-size":"95% 95%","background-repeat":"no-repeat"});
    //设置标题和数字框
    targetItem.children().eq(2).empty();
    targetItem.children().eq(2).addClass("item");
    var $itemtle = $("<div class='col-lg-8'><a target='_blank' href='"+item.url+"'>"+item.titles+"</a></div>");
    var $span = $("<span class='col-lg-2 item-price'>¥"+item.price+"</span>");
    var $div_1 = $("<div class='col-lg-2 item-line'></div>");
    var $div_2 = $("<div class='input-group'></div>");
    var $div_3 = $("<div class='input-group-btn'></div>");
    var $div_4 = $("<div class='input-group-btn'></div>");
    var $btn_1 = $("<button type='button' class='btn btn-default' style='margin-right:-2px;' onclick='numberInput(event)'>+</button>");
    var $btn_2 = $("<button type='button' class='btn btn-default' style='margin-left:-2px;' onclick='numberInput(event)'>-</button>");
    var $input = $("<input type='number' maxlength='2' class='form-control num' style='text-align:center;float:none;' value='"+$('#add-num').val()+"'/>");
    $div_3.append($btn_1);
    $div_4.append($btn_2);
    $div_2.append($div_3);
    $div_2.append($input);
    $div_2.append($div_4);
    $div_1.append($div_2);
    targetItem.children().eq(2).append($itemtle);
    targetItem.children().eq(2).append($span);
    targetItem.children().eq(2).append($div_1);
    //设置按钮
    targetItem.children().remove("button");
    var $btn_1 = $("<button type='button' class='btn btn-danger btn-sm' onclick='deleteItem(event)'>删除</button>");
    var $btn_2 = $("<button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#set-item' data-type='modify'>修改</button>");
    targetItem.append($btn_2);
    targetItem.append($btn_1);
    $input.trigger('input');
  }
  else if(e=='modify'){
    var $tent = targetItem.children().eq(2);
    console.log($tent);
    $tent.find("a").text = $('#add-name').val();
    $tent.find("span").text = $('#add-price').val();
    $tent.find("input").val($('#add-num').val());
  }
  //移除校验状态和禁用按钮
  $('#set-item').find('.has-success').toggleClass("has-success",false);
  $('#first-submit').removeAttr('disabled');
  $('#first-submit').toggleClass('disabled',false);
  $('#set-item').modal('toggle');
  updatePrice();
}
$(function(){
  //修改类目按钮
  $('#modify-cate').bind('click',function(event){
      var lastToggle = (jQuery._data(this, "lastToggle" + event.handleObj.guid) || 0)%2;
      modifyCate = function(){
        var $row = $(".list-group-item").find('.row');
        $row.append($("<span class='glyphicon glyphicon-remove remove-cate' aria-hidden='true'></span>"));
        $('#modify-cate').attr("class","btn btn-success btn-xs")
        $('#modify-cate').text("确定修改");
      }
      submitCate = function(){
        var $row = $(".list-group-item").find('.row');
        $row.find('.glyphicon').remove();
        $('#modify-cate').attr("class","btn btn-info btn-xs")
        $('#modify-cate').text("修改类目");
      }
      if(lastToggle==0){
        modifyCate();
      }
      else{
        submitCate();
      }
      jQuery._data(this, "lastToggle" + event.handleObj.guid, lastToggle+1)
  })
  //删除类目
  $(document).on('click','.remove-cate',function(event){
    $(this).parents('.list-group-item').remove();
  })
  $('[data-toggle="tooltip"]').tooltip();

  //初始化添加类目中的类目类型
  var $catename = $('#cate_list');
  for(var i=0;i<category.length;i++){
    $catename.append($("<option lable='"+catecode[i]+"' value='"+category[i]+"'/>"));
  }
  //初始化添加类目中的类目序号
  var $cateindex = $('#index_list');
  for(var i=1;i<=$('.list-group-item').length+1;i++){
    $cateindex.append($("<option lable='"+i+"' value='"+i+"'/>"));
  }
  //添加类目弹出框打开时操作
  $('#set-cate').on('show.bs.modal', function (event) {
    $('#cate-name').val("");
    $('#cate-name').parents('.form-group').toggleClass('has-success',false);
    $('#cate-index').val($('.list-group-item').length);
    $('#cate-index').parents('.form-group').toggleClass('has-success',true);

    $('#cate-sumbit').toggleClass('disabled',true);
    $('#cate-sumbit').attr("disabled",true);
  })

  //添加类目弹出框验证功能
  $('#cate-name').bind('input propertychange blur',function(){
    var $inputs = $('#cate-name').val();
    var $error = $('#cate-name').parents('.form-group');
    if($inputs.length==0||$inputs.length>10){
      $error.removeClass('has-success');
      $error.addClass('has-error');
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
    }
    if($('#set-cate').find('.has-success').length == 2){
      $('#cate-sumbit').toggleClass('disabled',false);
      $('#cate-sumbit').removeAttr("disabled");
    }
    else{
      $('#cate-sumbit').toggleClass('disabled',true);
      $('#cate-sumbit').attr("disabled",true);
    }
  })
  $('#cate-index').bind('input propertychange blur',function(){
    var $inputs = $('#cate-index').val();
    var $error = $('#cate-index').parents('.form-group');
    if($inputs.length==0||$inputs.length>10){
      $error.removeClass('has-success');
      $error.addClass('has-error');
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
    }
    if($('#set-cate').find('.has-success').length == 2){
      $('#cate-sumbit').toggleClass('disabled',false);
      $('#cate-sumbit').removeAttr("disabled");
    }
    else{
      $('#cate-sumbit').toggleClass('disabled',true);
      $('#cate-sumbit').attr("disabled",true);
    }
  })

  //添加类目功能
  $('#cate-sumbit').bind('click',function(){
    var index = $('#cate-index').val();
    var name = $('#cate-name').val();
    var css = "";
    for(var i=0;i<category.length;i++){
      if(name == category[i]){
        var css = catecode[i];
      }
      if(i==category.length-1&&css==""){
        css = "other";
      }
    }
    index = index > $('.list-group-item').length ? $('.list-group-item').length:index;

    var $sumbit = $("<li class='list-group-item'></li>");
    var $div = $("<div class='row'></div>");
    var $span1 = $("<span class='col-lg-1'>"+name+"</span>");
    var $span2 = $("<span class='col-lg-2 "+css+"'></span>");
    var $span3 = $("<span class='col-lg-9 item'>请设置物品</span>");
    var $button = $("<button type='button' class='btn btn-default' data-toggle='modal' data-target='#set-item'>设置物品</button>");

    $div.append($span1);
    $div.append($span2);
    $div.append($span3);
    $div.append($button);
    $sumbit.append($div);

    if(index == $('.list-group-item').length){
      $('.list-group').children().eq(index-1).after($sumbit);
    }
    else{
      $('.list-group').children().eq(index-1).before($sumbit);
    }
    $('#set-cate').modal('toggle');
  })
  //添加弹出框关闭时操作
  $('#set-item').on('hidden.bs.modal', function (e) {
    $(this).find('#add-num').val("");
    $(this).find('#add-price').val("");
    $(this).find('#add-img').val("");
    $(this).find('#add-name').val("");
    $(this).find('#add-url').val("");
  })
  //添加弹出框打开时操作
  $('#set-item').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    targetItem = $(event.relatedTarget).parent();
    var type = button.data('type');
    console.log(type);
    if(type=='modify'){
      var $tent = targetItem.children().eq(2);
      $('#add-name').val($tent.find("a").text());
      $('#add-img').val(targetItem.children().eq(1).css("background-image").split("\"")[1]);
      $('#add-price').val($tent.find("span").text().substr(1));
      $('#add-num').val($tent.find("input").val());
      $(".modal-footer").find(".btn-primary").attr("onclick","setItem('modify')")
    }
    console.log(targetItem);
  })
  //关闭错误处理警告框
  $('#add-alert').on('click','.close',function(){
    $('#add-alert').attr("class","alert alert-info");
    $('#add-alert').text("商品导入功能获取的数据受时效限制，仅供参考！");
    $('#add-alert button:first').remove();
    $('#add-url').val("");
  })

  //处理添加商品对话框的输入判定
  $('#add-url').bind('input propertychange blur',function(){
    var $inputs = $('#add-url').val();
    var $error = $('#add-url').parents('.input-group');
    if($inputs.length==0||$inputs.match("http")==null){
      $error.removeClass('has-success');
      $error.addClass('has-error');
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
      item.url = $('#add-url').val();
    }
    if($('#set-item').find('.has-success').length == 5){
      $('#modal-sumbit').toggleClass('disabled',false);
      $('#modal-sumbit').removeAttr("disabled");
    }
    else{
      $('#modal-sumbit').toggleClass('disabled',true);
      $('#modal-sumbit').attr("disabled",true);
    }
  })
  $('#add-name').bind('input propertychange blur',function(){
    var $inputs = $('#add-name').val();
    var $error = $('#add-name').parents('.form-group');
    if($inputs.length==0||$inputs.length>40){
      $error.removeClass('has-success');
      $error.addClass('has-error');
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
      item.titles = $('#add-name').val();
    }
    if($('#set-item').find('.has-success').length == 5){
      $('#modal-sumbit').toggleClass('disabled',false);
      $('#modal-sumbit').removeAttr("disabled");
    }
    else{
      $('#modal-sumbit').toggleClass('disabled',true);
      $('#modal-sumbit').attr("disabled",true);
    }
  })
  $('#add-img').bind('input propertychange blur',function(){
    var $inputs = $('#add-img').val();
    var $error = $('#add-img').parents('.form-group');
    if($inputs.length==0||$inputs.match("http")==null){
      $error.removeClass('has-success');
      $error.addClass('has-error');
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
      item.image = $('#add-img').val();
    }
    if($('#set-item').find('.has-success').length == 5){
      $('#modal-sumbit').toggleClass('disabled',false);
      $('#modal-sumbit').removeAttr("disabled");
    }
    else{
      $('#modal-sumbit').toggleClass('disabled',true);
      $('#modal-sumbit').attr("disabled",true);
    }
  })
  $('#add-price').bind('input propertychange blur',function(){
    var $inputs = $('#add-price').val();
    var $error = $('#add-price').parents('.form-group');
    if($inputs.length==0){
      $error.removeClass('has-success');
      $error.addClass('has-error');
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
      item.price = $('#add-price').val();
    }
    if($('#set-item').find('.has-success').length == 5){
      $('#modal-sumbit').toggleClass('disabled',false);
      $('#modal-sumbit').removeAttr("disabled");
    }
    else{
      $('#modal-sumbit').toggleClass('disabled',true);
      $('#modal-sumbit').attr("disabled",true);
    }
  })
  $('#add-num').bind('input propertychange blur',function(){
    var $inputs = $('#add-num').val();
    var $error = $('#add-num').parents('.form-group');
    if($inputs.length==0){
      $error.removeClass('has-success');
      $error.addClass('has-error');
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
    }
    if($('#set-item').find('.has-success').length == 5){
      $('#modal-sumbit').toggleClass('disabled',false);
      $('#modal-sumbit').removeAttr("disabled");
    }
    else{
      $('#modal-sumbit').toggleClass('disabled',true);
      $('#modal-sumbit').attr("disabled",true);
    }
  })

  var fixHelper = function(e, ui) {
    ui.children().each(function() {
    $(this).width($(this).width());  //在拖动时，拖动行的cell（单元格）宽度会发生改变。在这里做了处理就没问题了
    });
    return ui;
  };
  //第二步输入判定
  $('#list-name').bind('input propertychange blur',function(){
    var $inputs = $('#list-name').val();
    var $error = $('#list-name').parents('.form-group');
    $feedback = $("<span class='glyphicon form-control-feedback' aria-hidden='true'></span>");
    $('#list-name').parent().append($feedback);
    if($inputs.length==0||$inputs.length>20){
      $error.removeClass('has-success');
      $error.addClass('has-error');
      $('#list-name').next().toggleClass('glyphicon-ok',false);
      $('#list-name').next().toggleClass('glyphicon-remove',true);

      $('#name-help').text("配置单名称不能为空或大于20汉字");
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
      $('#list-name').next().toggleClass('glyphicon-ok',true);
      $('#list-name').next().toggleClass('glyphicon-remove',false);

      $('#name-help').text("配置单名称已满足要求");
    }
    if($('#collapseOne').find('.has-success').length == 2){
      $('#next-btn').toggleClass('disabled',false);
      $('#next-btn').removeAttr("disabled");
    }
    else{
      $('#next-btn').toggleClass('disabled',true);
      $('#next-btn').attr("disabled","disabled");
    }
  })
  $('#list-author').bind('input propertychange blur',function(){
    var $inputs = $('#list-author').val();
    var $error = $('#list-author').parents('.form-group');
    $feedback = $("<span class='glyphicon form-control-feedback' aria-hidden='true'></span>");
    $('#list-author').parent().append($feedback);
    if($inputs.length==0||$inputs.length>20){
      $error.removeClass('has-success');
      $error.addClass('has-error');
      $('#list-author').next().toggleClass('glyphicon-ok',false);
      $('#list-author').next().toggleClass('glyphicon-remove',true);

      $('#author-help').text("作者昵称不能为空或大于20汉字");
    }
    else{
      $error.removeClass('has-error');
      $error.toggleClass('has-success',true);
      $('#list-author').next().toggleClass('glyphicon-ok',true);
      $('#list-author').next().toggleClass('glyphicon-remove',false);

      $('#author-help').text("作者昵称已满足要求");
    }
    if($('#collapseOne').find('.has-success').length == 2){
        $('#next-btn').toggleClass('disabled',false);
        $('#next-btn').removeAttr("disabled");
    }
    else{
        $('#next-btn').toggleClass('disabled',true);
        $('#next-btn').attr("disabled","disabled");
    }
  })
  //第二步表格拖动功能
  $("#sortable").sortable({
    disabled:true,
    axis: "y",
    containment: "parent",
    helper: fixHelper,
    cursor: "move",
    tolerance :"intersect",
    start:function(e, ui){
    ui.helper.css({"background":"#fff"})     //拖动时的行，要用ui.helper
    return ui;}
});
  $("#sortable").disableSelection();
  //按下按钮进行排序
  $(document).on('mousedown','.sort',function(){
    $( "#sortable" ).sortable( "enable" );
  })
  //松开按钮不可排序
  $( "#sortable" ).on( "sortupdate", function( event, ui ) {
    $( "#sortable" ).sortable( "disable" );
  });
  //复制到剪切板后的提示
  $('#share-btn').bind('click',function(){
    alert("已经保存到剪切板！");
  })
})
//导入失败的错误处理
function setError(msg){
  console.log($('#add-alert').val());
  $('#add-alert').attr("class","alert alert-warning alert-dismissible");
  $('#add-alert').text(msg);
  var $btn = $("<button type='button' class='close' aria-label='Close'><span aria-hidden='true'>&times;</span></button>");
  $('#add-alert').append($btn);
}
//请求商品信息
function inporitem(e){
  var target = $('#add-url').val();
  var $btn = $(e.relatedTarget).button('loading')
  $.ajax({
      type:"GET",
      url:"http://localhost:4000/decode",
      data:{
        url:target
      },
      dataType: 'JSONP',
      success:function(data){
        item = data;
        if(item.ok == 1){
          $('#add-name').val(item.titles);
          $('#add-img').val(item.image);
          $('#add-price').val(item.price);
          $('#add-num').val(1);
          $('#add-name').trigger('blur');
          $('#add-img').trigger('blur');
          $('#add-price').trigger('blur');
          $('#add-num').trigger('blur');
        }
        else{
          setError(item.msg);
        }
        $btn.button('reset');
      }
  })
}
//删除添加的商品
function deleteItem(e){
  targetItem = $(e.target).parent();
  targetItem.children().eq(1).css({"background":"","background-size":"","background-repeat":""});
  targetItem.children().eq(2).empty();
  targetItem.children().eq(2).removeClass('item');
  targetItem.children().eq(2).text("请设置物品");
  targetItem.children().remove("button");
  var $btn = $("<button type='button' class='btn btn-default' data-toggle='modal' data-target='#set-item'>设置物品</button>");
  targetItem.append($btn);

  if($('.item').length==0){
    $('#first-submit').toggleClass('disabled',true);
    $('#first-submit').attr("disabled",true);
  }
}
//刷新表格价格
function updatePrice(){
  var tmp=0;
  for(var i=0;i<$('.item-price').length;i++){
    tmp += $('.item-price').eq(i).text().substr(1) * $('.num').eq(i).val()
    //console.log(tmp);
  }
  $('.sum-price').text('¥ '+tmp);
}
function sumbitList(){
  //保存商品到数组中
  var $items = $('.item');
  for(var i=0;i<$items.length;i++){
    var item = [];
    item.push($items.eq(i).prevAll('.col-lg-1').text());
    item.push($items.eq(i).find('a').text());
    item.push($items.eq(i).find('a').attr("href"));
    item.push($items.eq(i).find('input').val());
    item.push($items.eq(i).children('span').text().substr(1));
    listdata.push(item);
    listimg.push($items.eq(i).prevAll('.col-lg-2').css("background-image").split("\"")[1])
  }
  console.log(listdata);

  //渲染内容确认部分
  var $body = $('#collapseTwo').find("tbody");
  for(var j=0;j<listdata.length;j++){
    var $tr = $("<tr class='list' title='"+listdata[j][0]+"'></tr>");
    var $img = $("<td class='img'></td>");
    $img.css("background-image","url("+listimg[j]+")");
    var $name = $("<td><a target='_blank' href='"+listdata[j][2]+"'>"+listdata[j][1]+"</a></td>");
    var $num = $("<td>"+listdata[j][3]+"</td>");
    var $price = $("<td>"+listdata[j][4]+"</td>");
    var $option = $("<td><span class='glyphicon glyphicon-menu-hamburger sort' aria-hidden='true'></span></td>");

    $tr.append($img);
    $tr.append($name);
    $tr.append($num);
    $tr.append($price);
    $tr.append($option);
    $body.append($tr);
  }

  //页面跳转到第二页
  $('.first-step').css("display","none");
  $('#top-bar').attr("aria-valuenow","66");
  $('#top-bar').css("width","66%");
  $('#top-bar').text("第二步——确认配置");
  $('.second-step').css("display","block");
}
function resetList(){
  //页面跳转到第一页
  $('.first-step').css("display","block");
  $('#top-bar').attr("aria-valuenow","33");
  $('#top-bar').css("width","33%");
  $('#top-bar').text("第一步——选择配置");
  $('.second-step').css("display","none");

  var $body = $('#collapseTwo').find("tbody");
  listdata=[];
  listimg=[];
  $body.empty();
}
function getDocument(){
  $name = $('#list-name').val();
  $author = $('#list-author').val();
  //保存更改完顺序的商品数组
  var $data = $('.list');
  //清空原先的数组
  listdata = [];
  listimg =[];

  for(var i=0;i<$data.length;i++){
    var item = [];
    item.push($data.eq(i).attr("title"));
    item.push($data.eq(i).find('a').text());
    item.push($data.eq(i).find('a').attr("href"));
    item.push($data.eq(i).children().eq(2).text());
    item.push($data.eq(i).children().eq(3).text());
    listdata.push(item);
    listimg.push($data.eq(i).find('.img').css("background-image").split("\"")[1]);
  }

  var times = new Date();
  times = times.toLocaleDateString();
  list.data = listdata;
  list.footer = [$('.sum-price').text().substr(1),"Copyright (c) 2018 diydesktop."];
  list.header = ["部件","名称","链接","数量","价格"];
  list.title = [$name,$author,times];

  //设置要复制到剪切板的文本内容
  var l2text = list.title[0]+"\n作者:"+list.title[1]+" 在 "+list.title[2]+" 制作\n";
  for(var i=0;i<list.data.length;i++){
    l2text += list.data[i][0]+": "+list.data[i][1]+" "+list.data[i][3]+"件 "+list.data[i][4]+"元\n";
  }
  l2text += "总价:"+list.footer[0]+"元\n此条配置生成于 diyDeskTop 转发请保留此版权信息。"
  console.log(l2text);
  $('#share-btn').attr("data-clipboard-text",l2text);

  //设置要最终显示的配置单内容
  $('#list-title').text(list.title[0]);
  $('#third-author').text("作者: "+list.title[1]);
  $('#list-time').text("时间: "+list.title[2]);
  $('#list-sum').text(list.footer[0]+" 元")

  var $ilist = $('.list-group-item');
  for(var i=0;i<list.data.length;i++){
     for(var j=0;j<$ilist.length;j++){
       if($ilist.eq(j).find('.col-lg-8').text()==list.data[i][1]){
         $ilist.eq(j).clone().appendTo('#third-list');
         $('#third-list').children('.list-group-item').find('button').remove();
         $('#third-list .item').attr("class","col-lg-10 item");
         var $num = $('#third-list').children('.list-group-item').eq(i).find('.num').val();
         $('#third-list').children('.list-group-item').eq(i).find('.item-line').empty();
         $('#third-list').children('.list-group-item').eq(i).find('.item-line').text($num);
       }
     }
  }
  //移除校验状态
  $('#collapseOne').find('.has-success').toggleClass("has-success",false);
  $('#collapseOne').find('.glyphicon-ok').remove();
  //页面跳转到第三页
  $('.second-step').css("display","none");
  $('#top-bar').attr("aria-valuenow","100");
  $('#top-bar').css("width","100%");
  $('#top-bar').text("第三步——分享配置");
  $('.third-step').css("display","block");
  printList(list.title[0]+".png");
}
function printList(name){
  html2canvas($("#list-msg")[0],{useCORS: true}).then(function(canvas){//proxy:"http://localhost:4000/proxy",
      //document.body.appendChild(canvas);
      var image = canvas.toDataURL("image/png");
      $('#pic-btn').attr("href",image);
      $('#pic-btn').attr("download",name);
  });
}
function writeList(){
  var $form = $("form");
  var $input1 = $form.find('input');
  $input1.attr("value",JSON.stringify(list));
  $form.submit();
}
