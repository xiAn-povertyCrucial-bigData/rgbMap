/*
* @Author: 22
* @Date:   2018-06-28 10:28:34
* @Last Modified by:   万怡佩
* @Last Modified time: 2018-08-30 09:48:03
*/
var url='http://113.141.72.212:9292/poverty-web-1.0-SNAPSHOT';
// var host = 'http://192.168.1.195:8088';
//var host = 'http://localhost:63342/rgbMap/visiualization';
var host="http://113.141.72.212:9295/visiualization";
//var host="http://localhost:8080";
var config={
    url:"http://113.141.72.212:9292/poverty-web-1.0-SNAPSHOT"
}


var screenWidth=window.screen.width;
var screenHeight=window.screen.height;
//alert(screenWidth+'+++'+screenHeight);


if (screenWidth>=1024) {
    var fontSize=10;
    var left1='20%';
    var top1='10%';
    var right1='10%';
    var bottom1='25%';

    var left2='5%';
    var top2='20%';
    var right2='5%';
    var bottom2='25%';
}
if (screenWidth>=1920) {
    var fontSize=16;
    var left1='20%';
    var top1='10%';
    var right1='10%';
    var bottom1='25%';

    var left2='5%';
    var top2='20%';
    var right2='5%';
    var bottom2='25%';
}
// function searchEvent(ourl,obj1,obj2,obj3,name,type){
//  obj1.click(function(){
//      var text=$('.keywords').val();
//      //console.log(ourl+'?item='+text+'&aar009='+name);
//      obj3.html("");
//      obj2.show();
//      if(type=='区县'){
//          listShow(ourl+'?item='+text+'&aar009='+name,type,obj3);
//      }
//      if(type=='村'){
//          listShow(ourl+'?item='+text+'&aar008='+name,type,obj3);
//      }
//  })

// }
// function listShow(requestUrl,type,obj3){
//  //console.log(obj3)
//  //console.log(requestUrl)
//  $.ajax({
//      url:requestUrl, 
//      type:"get", 
//      dataType:"json",  
//      data:{},  
//      success:function (result) {
//          var data=result.data;// {村名: "东石门村委会", 村编号: "610124001002", 县区名: "周至县", 县编号: "610124000000"}
//          if (type=='区县') {
//              for (var i=0;i<data.length;i++) {
//                  obj3.append('<tr><td>'+data[i].县区名+'</td><td>'+data[i].村名+'</td><td style="color: #efe43b;cursor: pointer;" onclick=LookDetails("'+name+'","'+data[i].村名+'","'+data[i].村编号+'","'+type+'");>查看</td></tr>');
//              }
//          }
//          if (type=='村') {
//              for (var i=0;i<data.length;i++) {
//                  obj3.append('<tr><td>'+data[i].AAR009+'</td><td>'+data[i].AAC029+'</td><td style="color: #efe43b;cursor: pointer;" onclick=LookDetails("'+name+'","'+data[i].村名+'","'+data[i].村编号+'","'+type+'");>查看</td></tr>');
//              }
//          }
//          //console.log('onclick=LookDetails("'+name+'","'+data[0].村名+'","'+data[0].村编号+'")')
//      }
//  })
// }
// function LookDetails(countryName,villageName,villageCode,type){
//  if(type=='区县'){
//      var url = host + '/village.html?county='+ countryName + '&name=' + villageName+ '&code=' + villageCode;
//      window.location.href = url;
//  }
//  if(type=='村'){
//      var url = host + '/households.html?county='+ countryName + '&name=' + villageName+ '&code=' + villageCode; 
//      window.location.href = url;
//  }
//  //console.log(countryName);console.log(villageName);
    
//      //console.log(url);
// }