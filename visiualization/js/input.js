function autocomple(){
   $("#autocomplete").empty();
   var text=$("#search-text").val();
     // alert("478");
    $.ajax({
       url:"http://192.168.1.171:8080/cun/Search?item="+text+"&aar008=619905002006",
       type:"get",
       data:{},
       dataType:"json",
       success:function(data,textStatus){
        alert(1)
            console.log(data);
          if(data!=null||!"".equals(data)){
              var str = "";
              $.each(data,function(n,obj){
                 $("#autocomplete").show();
                  str = "<li>"+obj.name+"<li>";
                  $("#autocomplete").append(str);
                   $("li").click(function(){
                    //当点击哪个列表时就把它的值load到输入框中
                     $("#search-text").val($(this).text());
                     $("#autocomplete").empty();
                     });
                   //鼠标移到当前元素和移出当前元素的背景色
                   $("li").hover(function(){
                      $(this).addClass("clor");
                   },function(){
                       $(this).removeClass("clor");
                   });
                  });
          }
         
       },
       error:function(textStatus){
          //alert(textStatus);
       }
   }); 
}
function CUNsearchEvent(url,obj1,obj2,obj3,countryName,villageName,villageCode){//村级户搜索户列表填充
  obj1.click(function(e){
    var text=$('.keywords').val();
    console.log(url);
    console.log(villageCode);
    obj3.html("");
    obj2.show();
      $(document).one("click", function(){
          obj2.hide();
      });
      e.stopPropagation();

    $.ajax({
        url:url+'?item='+text+'&aar008='+villageCode, 
        type:"get", 
        dataType:"json",  
        data:{},  
        success:function (result) {
          console.log(result)
            var data=result.data;// "data":[{"AAC001":3116426500,"AAR009":"沙窝村委会","AAC029":"陈亚琴"}]
          console.log(data.length)
          for (var i=0;i<data.length;i++) {
              obj3.append('<tr><td>'+data[i].AAR009+'</td><td>'+data[i].AAC029+'</td><td style="color: #efe43b;cursor: pointer;" onclick=CUNLookDetails("'+countryName+'","'+villageName+'","'+villageCode+'","'+data[i].AAC001+'","'+data[i].AAC029+'");>查看</td></tr>');
            }
            //console.log('onclick=LookDetails("'+name+'","'+data[0].村名+'","'+data[0].村编号+'")')
        }
    })
  })

  obj2.on("click", function(e){
      e.stopPropagation();
  });
}