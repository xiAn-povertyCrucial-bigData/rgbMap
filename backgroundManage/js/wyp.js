/*
* @Author: ypWan
* @Date:   2018-07-12 17:15:45
* @Last Modified by:   ypWan
* @Last Modified time: 2018-07-24 20:16:28
*/
let token=$.cookie("token");
/**-----------------------------------------数据对象监管--------------------------------------**/
function ruleEvent(YearCode){
        rule(url+'dataScreen/twoNoWorry?year='+YearCode,$(aStrong[0]),$(aOl[0]));//规则 1
        rule(url+'dataScreen/idNumberNormal?year='+YearCode,$(aStrong[1]),$(aOl[1]));//规则 2
        rule(url+'dataScreen/importantTarget?year='+YearCode,$(aStrong[2]),$(aOl[2]));//规则 3
        rule(url+'dataScreen/povertyCause?year='+YearCode,$(aStrong[3]),$(aOl[3]));//规则 4
        rule(url+'dataScreen/povertyBottom?year='+YearCode,$(aStrong[4]),$(aOl[4]));//规则 5
        rule(url+'dataScreen/laborAbility?year='+YearCode,$(aStrong[5]),$(aOl[5]));//规则 6
        rule(url+'dataScreen/Income?year='+YearCode,$(aStrong[6]),$(aOl[6]));//规则 7
        rule(url+'dataScreen/laborStatus?year='+YearCode,$(aStrong[7]),$(aOl[7]));//规则 8
        rule(url+'dataScreen/helpPerson?year='+YearCode,$(aStrong[8]),$(aOl[8]));//规则 9
        rule(url+'dataScreen/targetNoTrue?year='+YearCode,$(aStrong[9]),$(aOl[9]));//规则 10
        rule(url+'dataScreen/DistrictNumber?year='+YearCode,$(aStrong[10]),$(aOl[10]));//规则 11
}
function clickEvent(YearCode){
    for(var i=0;i<ali.length;i++){
      $(ali[i]).click(function(){
        // var aP=$(this).find("p:first-child");
        // var txtName=aP.innerHTML;
        var txtName=$(this).find("p:first-child").attr("new");
        console.log(txtName)
        // alert(1)
        window.location.href = 'data_mange_detail.html?name='+txtName+'&year='+YearCode;
      })
    }
}
function rule(ourl,obj1,obj2){//概况介绍
    $.ajax({
        url:ourl, //http://192.168.1.195:9999/poverty-web-1.0-SNAPSHOT/
        type:"get", 
        dataType:"json",  
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (result) {
            // alert(result.code)
            if(result.code==2000){
                var data=result.data;
                obj1.append(data);
            }
        }
    })
}

/**---------------------------------------每个数据对象监管详情------------------------------------**/
function RequestData(ourl){
      $.ajax({
          url:ourl, 
          data:{"pageNum":1,"pageSize": 12,"year": 201808},
          method: "get",
          dataType: "json",
          json: "callback",
          jsonpCallback: 'jsonpCallback',
          beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          },
          success: function(data){
              if (data.code == 2000){
                  console.log(data.data);
                  $('#allTotal').html("总数："+data.data.total);
                  // page.html(Math.ceil(data.data.PageTotal/12));
                  // showAllPoorInfo(0,formInfos,data,year);
                  showPage($(".searchPage"),data.data.total);
              }
              else{console.log('error!')}
              // console.log('111');
          }
      })
}
function RequestData2(ourl){
    $.ajax({
        url:ourl,
        data:{"pageNum":1,"pageSize": 12,"year": 201808},
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success: function(data){
            if (data.code == 2000){
                console.log(data.data);
                $('#allTotal').html("总数："+data.data.total);
                // page.html(Math.ceil(data.data.PageTotal/12));
                // showAllPoorInfo(0,formInfos,data,year);
                showPage2($(".searchPage"),data.data.total);
            }
            else{console.log('error!')}
            // console.log('111');
        }
    })
}
function RequestData3(ourl){
    $.ajax({
        url:ourl,
        data:{"pageNum":1,"pageSize": 12,"year": 201808},
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success: function(data){
            if (data.code == 2000){
                console.log(data.data);
                $('#allTotal').html("总数："+data.data.total);
                // page.html(Math.ceil(data.data.PageTotal/12));
                // showAllPoorInfo(0,formInfos,data,year);
                showPage3($(".searchPage"),data.data.total);
            }
            else{console.log('error!')}
            // console.log('111');
        }
    })
}
function RequestData4(ourl){
    $.ajax({
        url:ourl,
        data:{"pageNum":1,"pageSize": 12,"year": 201808},
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success: function(data){
            if (data.code == 2000){
                console.log(data.data);
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                showAllPoorInfo(0,formInfos,data,year);
                console.log(ourl)
                if(ourl.endsWith("smallDetail/TwoNoWarry")){
                    showPage4($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/IDNumberNotNormal")){
                    showPage5($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/ImportantTarget")){
                    showPage6($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/PovertyCause")){
                    showPage7($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/PovertyBottom")){
                    showPage8($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/LaborAbility")){
                    showPage9($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/Income")){
                    showPage10($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/LaborStatus")){
                    showPage11($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/HelpPerson")){
                    showPage12($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/targetNoTrue")){
                    showPage13($(".searchPage"),data.data.PageTotal);
                }else if(ourl.endsWith("smallDetail/DistrictNumber")){
                    showPage14($(".searchPage"),data.data.PageTotal);
                }
            }
            else{console.log('error!')}
            // console.log('111');
        }
    })
}
function RequestData5(ourl){
    $.ajax({
        url:ourl,
        data:{"pageNum":1,"pageSize": 12,"year": 201808},
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success: function(data){
            if (data.code == 2000){
                console.log(data.data);
                $('#allTotal').html("总数："+data.data.total);
                // page.html(Math.ceil(data.data.PageTotal/12));
                // showAllPoorInfo(0,formInfos,data,year);
                showPage15($(".searchPage"),data.data.total);
            }
            else{console.log('error!')}
            // console.log('111');
        }
    })
}

function RequestData6(ourl){
    $.ajax({
        url:ourl,
        data:{"pageNum":1,"pageSize": 12,"year": 201808},
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success: function(data){
            if (data.code == 2000){
                console.log(data.data);
                $('#allTotal').html("总数："+data.data.total);
                // page.html(Math.ceil(data.data.PageTotal/12));
                // showAllPoorInfo(0,formInfos,data,year);
                showPage16($(".searchPage"),data.data.total);
            }
            else{console.log('error!')}
            // console.log('111');
        }
    })
}
/**-----------------------------------------数据清洗户列表--------------------------------------**/
function showAllPoorInfo(index,obj,data,year){//所有贫困户信息
      obj.empty();
      var data=data.data.AllPoverty;
      //console.log('点击传递'+data);
      //year=parseInt(year/100);
      var str = `
       <tr>
             <th>序号</th>
              <th>户主姓名</th>
              <th>贫困户属性</th>
              <th>主要致贫原因</th>
              <th>成员人数(人)</th>
              <th>贫困户所在地</th>
              <th>操作</th>
          </tr>`
          obj.html(str);
       for(var i=0; i<data.length; i++){
        //console.log(data[i].aac001)
          var str1=`  
            <tr>
                <td>${index*12+i+1}</td>
                <td>${data[i].aac029}</td>
                <td>${data[i].aac006}</td>
                <td>${data[i].aac007}</td>
                <td>${data[i].aac017}</td>
                <td>${data[i].aad001}</td>
                <td>
                    <a href="showDetailsPoor1.html?value=${data[i].aac001}&time=${year}">户详情</a>
                </td>
            </tr>`;
            obj.html(function (i, value) {
                return value + str1;
            });
       }
}

/**-----------------------------------------质量排名区县列表--------------------------------------**/
function showQualityInfo(obj,year){//所有贫困户信息
      obj.empty();
      var str = `
          <tr>
              <th>排行</th>
              <th>行政区划</th>                          
              <th>质量指数</th>
              <th>有问题贫困户占比</th>
              <th>最终得分</th>              
              <!-- <th>操作</th> -->       
          </tr>`
      obj.html(str);
      $.ajax({
          url:url + "quality/findObejctSupervise",
          type:"get",
          data:{"year":year},
          dataType:"json",
          beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          },
          success:function (data) {
            if (data.code == 2000){
                var data=data.data;
                console.log(data);
                for(var i=0; i<data.length; i++){
                    var str1=`  
                      <tr>
                          <td>${i+1}</td>
                          <td>${data[i].administrativeDivision}</td>
                          <td>${data[i].massIndex}</td>
                          <td>${data[i].noPoverty}</td>
                          <td>${data[i].finalScore}</td>
                      </tr>`;
                      obj.html(function (i, value) {
                          return value + str1;
                      });
                }
            }
          },
          error:function () {
            alert('数据加载失败！')
          }
      })                     
}

/**-----------------------------------------信息审核贫困户管理列表--------------------------------------**/
// function showPoorPerson(obj,year){//所有贫困户信息
//       obj.empty();
//       var str = 
//           `<tr>
//               <th rowspan="2" style="line-height: 80px">所在区县</th>
//               <th rowspan="2" style="line-height: 80px">所在村组</th>
//               <th rowspan="2" style="line-height:80px">户主</th>
//               <th colspan="2" >信息变更</th>
//               <th rowspan="2" style="line-height: 40px">帮扶干部确认审核</th>
//               <th rowspan="2" style="line-height: 40px">第一书记确认审核</th>
//               <th rowspan="2" style="line-height: 40px">市扶贫办确认审核</th>
//           </tr>
//           <tr>
//               <th >原始信息</th>
//               <th >变更信息</th>
//           </tr>`
//       obj.html(str);
//       $.ajax({
//           url:url + "quality/findObejctSupervise",
//           type:"get",
//           data:{"year":year},
//           dataType:"json",
//           success:function (data) {
//             if (data.code == 2000){
//                 var data=data.data;
//                 console.log(data);
//                 for(var i=0; i<data.length; i++){
//                     var str1=`  
//                       <tr>
//                           <td>${i+1}</td>
//                           <td>${data[i].administrativeDivision}</td>
//                           <td>${data[i].massIndex}</td>
//                           <td>${data[i].noPoverty}</td>
//                           <td>${data[i].finalScore}</td>
//                       </tr>`;
//                       obj.html(function (i, value) {
//                           return value + str1;
//                       });
//                 }
//             }
//           },
//           error:function () {
//             alert('数据加载失败！')
//           }
//       })                     
// }
/*导出*/
let aa=$.cookie("loginMessage");
let bb=JSON.parse(aa);
if(bb.aar008.substring(6)!="000000"){
    $("#export").hide();
}
$("#export").click(function(){
    let aa=$.cookie("loginMessage");
    let bb=JSON.parse(aa);
    let aar008=bb.aar008;
    let department=bb.department;
    let cc=url+"/village/export?year="+201808+"&disNum="+aar008+"&department="+department;
    window.location.href=cc;
})


function showTableInfo(ourl1,ourl2,ourl3,ourl4){
    var table = $("#table");
    $.ajax({
        url: ourl1,
        method: "get",
        data: {"pageNum": 1, "pageSize": 12,year:"201808"},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            ShowLoading();
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 2000){
                var data = data.data;
                //对数据的解析
                $(".page-sum").text("共"+data.pages+"页");
                $("#allTotal").text("总户数："+data.total);
                showTable(table, data,ourl3,ourl4)
            }else if (data.code == 4000){
                $('.form-01').html('<h1>无权限查看！</h1>');
            }else{
                $('.form-01').html('<h1>无审核信息！</h1>');
            }
        },
        error:function(data,type, err){
             console.log(data);
             console.log("ajax错误类型："+type);
             console.log(err);
        },
        complete:function(){
            HideLoading();
        }
    });
    $("body").on("click", ".detail", function () {
        var ids =  $(this).parent().find("td").eq("1").attr("sleep");
        var tableName =  $(this).parent().find("td").eq("1").attr("sleep1");
        if(ourl2==url+"eight/insert/aduit/detail"){
            showTab2(ourl2,ids,tableName);
        }else if(ourl2==url+"/evidence/aduit/detail"){
            showTab3(ourl2,ids,tableName);
        }else{
            showTab(ourl2,ids,tableName);
        }


    });
    $(".pop-close").click(function () {
        $('.form-02').hide(200);
        $('.form-01').show();
    });

    function ShowLoading() {
        $(".spinner").show();
    }
    function HideLoading() {
        $(".spinner").hide();
    }
}




//页面获取到数据之后，对数据解析的函数
function showTable(obj, data,ourl3,ourl4) {
        //console.log(data.data.list[0]);
        obj.empty();
        if(data.list==0){$('.form-01').html('<h1>无审核信息！</h1>');}
        else if(data.list[0].povertyName){
            var str = ` <tr>
                  <td>序号</td>
                  <th rowspan="" style="line-height: 80px">所在地址</th>
                  <th rowspan="" style="line-height: 80px">户主</th>
                  <th rowspan="" style="line-height:80px">修改类别</th>
                  <th rowspan=""  style="line-height: 40px">信息变更</th>
                  <th rowspan=""  style="line-height: 40px">提交时间</th>
                  <th rowspan="" style="line-height: 40px">第一书记确认审核</th>
                  <th rowspan="" style="line-height: 40px">镇街扶贫办确认审核</th>
                  <th rowspan="" style="line-height: 40px">区县确认审核</th>
              </tr>`;
              for (let i = 0; i < data.list.length; i++) {
                  var isReach,isReach2;
                  if (data.list[i].townAduit == 1) {
                      isReach = "已通过"
                  } 
                  else if (data.list[i].townAduit == 0) {
                      isReach = '<a href="#" class="pass1 pass">是</a><a href="#" class="no-pass1 no-pass">否</a>'
                  }
                  if (data.list[i].districtAduit == 1) {
                      isReach2 = "已通过"
                  } 
                  else if (data.list[i].districtAduit == 0) {
                      isReach2 = '<a href="#" class="pass2 pass">是</a><a href="#" class="no-pass2 no-pass">否</a>'
                  }
                  data.list[i].updateTime=data.list[i].updateTime.substring(0,4)+"-"+data.list[i].updateTime.substring(4,6)+"-"+data.list[i].updateTime.substring(6,8)+" "+data.list[i].updateTime.substring(8,10)+":"+data.list[i].updateTime.substring(10,12)+":"+data.list[i].updateTime.substring(12,14);
                  str += `<tr>
                    <td>${(data.pageNum-1)*12+i+1}</td>
                    <td sleep="${data.list[i].id}" sleep1="${data.list[i].tableName}">${data.list[i].districtName}${data.list[i].townName}${data.list[i].villageName}</td>
                    <td >${data.list[i].povertyName}</td>
                    <td >${data.list[i].updateTheme}</td>
                    <td class="detail" >详情</td>
                    <td>${data.list[i].updateTime}</td>
                    <td class="panduan0">已通过</td>
                    <td class="panduan1">${isReach}</td>
                    <td class="panduan2">${isReach2}</td>
                  </tr>`;
              }
        }
        else if(data.list[0].villageName){
            var str = ` <tr>
                  <td>序号</td>
                  <th rowspan="" style="line-height: 80px">所在地址</th>
                  <th rowspan="" style="line-height: 80px">村名</th>
                  <th rowspan="" style="line-height:80px">修改类别</th>
                  <th rowspan=""  style="line-height: 40px">信息变更</th>
                  <th rowspan=""  style="line-height: 40px">提交时间</th>
                  <th rowspan="" style="line-height: 40px">镇街扶贫办确认审核</th>
                  <th rowspan="" style="line-height: 40px">区县确认审核</th>
              </tr>`;
              for (let i = 0; i < data.list.length; i++) {
                  var isReach,isReach2;
                  if (data.list[i].townAduit == 1) {
                      isReach = "已通过"
                  }else if (data.list[i].townAduit == 0){
                      isReach = '<a href="#" class="pass1 pass">是</a><a href="#" class="no-pass1 no-pass">否</a>'
                  }
                  if (data.list[i].districtAduit== 1) {
                      isReach2 = "已通过"
                  }else if (data.list[i].districtAduit== 0){
                      isReach2 = '<a href="#" class="pass2 pass">是</a><a href="#" class="no-pass2 no-pass">否</a>'
                  }
                  data.list[i].updateTime=data.list[i].updateTime.substring(0,4)+"-"+data.list[i].updateTime.substring(4,6)+"-"+data.list[i].updateTime.substring(6,8)+" "+data.list[i].updateTime.substring(8,10)+":"+data.list[i].updateTime.substring(10,12)+":"+data.list[i].updateTime.substring(12,14);
                  str += `<tr>
                    <td>${(data.pageNum-1)*12+i+1}</td>
                    <td sleep="${data.list[i].id}" sleep1="${data.list[i].tableName}">${data.list[i].districtName}${data.list[i].townName}${data.list[i].villageName}</td>
                    <td >${data.list[i].villageName}</td>
                    <td >${data.list[i].updateTheme}</td>
                    <td class="detail" >详情</td>
                    <td >${data.list[i].updateTime}</td>
                    <td class="panduan1">${isReach}</td>
                    <td class="panduan2">${isReach2}</td>
                  </tr>`;
              }
        }else if(data.list[0].ACCOUNTNO){
            var str = ` <tr>
                  <td>序号</td>
                  <th rowspan="" style="line-height: 80px">所在地址</th>
                  <th rowspan="" style="line-height: 80px">户主</th>
                  <th rowspan="" style="line-height:80px">佐证类别</th>
                  <th rowspan=""  style="line-height: 40px">信息变更</th>
                  <th rowspan="" style="line-height: 40px">上传时间</th>
                  <th rowspan="" style="line-height: 40px">区县确认审核</th>
              </tr>`;
            for (let i = 0; i < data.list.length; i++) {
                var isReach='<a href="#" class="pass1 pass">是</a><a href="#" class="no-pass1 no-pass">否</a>';
                data.list[i].UPLOADTIME=data.list[i].UPLOADTIME.substring(0,4)+"-"+data.list[i].UPLOADTIME.substring(4,6)+"-"+data.list[i].UPLOADTIME.substring(6,8)+" "+data.list[i].UPLOADTIME.substring(8,10)+":"+data.list[i].UPLOADTIME.substring(10,12)+":"+data.list[i].UPLOADTIME.substring(12,14);
                str += `<tr>
                    <td>${(data.pageNum-1)*12+i+1}</td>
                    <td sleep="${data.list[i].ID}" sleep1="${data.list[i].IMAGETYPE}">${data.list[i].DIS}${data.list[i].TOWN}${data.list[i].VILL}</td>
                    <td >${data.list[i].ACCOUNTNO}</td>
                    <td >${data.list[i].IMAGETYPE_NAME}</td>
                    <td class="detail" >详情</td>
                    <td class="panduan1">${data.list[i].UPLOADTIME}</td>
                    <td class="panduan2">${isReach}</td>
                  </tr>`;
            }
        }
        else{
            var str = ` <tr>
                  <td>序号</td>
                  <th rowspan="" style="line-height: 80px">所在地址</th>
                  <th rowspan="" style="line-height: 80px">户主</th>
                  <th rowspan=""  style="line-height: 40px">添加类别</th>
                  <th rowspan=""  style="line-height: 40px">信息详情</th>
                  <th rowspan="" style="line-height: 40px">第一书记确认审核</th>
                  <th rowspan="" style="line-height: 40px">镇街扶贫办确认审核</th>
                  <th rowspan="" style="line-height: 40px">区县确认审核</th>
              </tr>`;
            for (let i = 0; i < data.list.length; i++) {
                var isReach,isReach2;
                if (data.list[i].TOWN_ADUIT == 1) {
                    isReach = "已通过"
                }
                else if (data.list[i].TOWN_ADUIT == 0) {
                    isReach = '<a href="#" class="pass1 pass">是</a><a href="#" class="no-pass1 no-pass">否</a>'
                }
                if (data.list[i].DIS_ADUIT == 1) {
                    isReach2 = "已通过"
                }
                else if (data.list[i].DIS_ADUIT == 0) {
                    isReach2 = '<a href="#" class="pass2 pass">是</a><a href="#" class="no-pass2 no-pass">否</a>'
                }
                if(data.list[i].FIRST_TIME!=null){
                    data.list[i].FIRST_TIME=data.list[i].FIRST_TIME.substring(0,4)+"-"+data.list[i].FIRST_TIME.substring(4,6)+"-"+data.list[i].FIRST_TIME.substring(6,8)+" "+data.list[i].FIRST_TIME.substring(8,10)+":"+data.list[i].FIRST_TIME.substring(10,12)+":"+data.list[i].FIRST_TIME.substring(12,14);
                }else{
                    data.list[i].FIRST_TIME="";
                }
                if(data.list[i].TOWN_TIME!=null){
                    data.list[i].TOWN_TIME=data.list[i].TOWN_TIME.substring(0,4)+"-"+data.list[i].TOWN_TIME.substring(4,6)+"-"+data.list[i].TOWN_TIME.substring(6,8)+" "+data.list[i].TOWN_TIME.substring(8,10)+":"+data.list[i].TOWN_TIME.substring(10,12)+":"+data.list[i].TOWN_TIME.substring(12,14);
                }else{
                    data.list[i].TOWN_TIME="";
                }
                str += `<tr>
                    <td>${(data.pageNum-1)*12+i+1}</td>
                    <td sleep="${data.list[i].ID}" sleep1="${data.list[i].NUM}">${data.list[i].DIS}${data.list[i].TOWN}${data.list[i].VILL}</td>
                    <td >${data.list[i].AAC029}</td>
                    <td >${data.list[i].ModifyType}</td>
                    <td class="detail" >详情</td>
                    <td class="panduan0">已通过<br>${data.list[i].FIRST_TIME}</td>
                    <td class="panduan1">${isReach}${data.list[i].TOWN_TIME}</td>
                    <td class="panduan2">${isReach2}</td>
                </tr>`;
            }
        }
        obj.html(str);
        //console.log(obj.html())
        for (let i = 0; i < data.list.length; i++) {
            if (data.list[i].townAduit == 0) {

                $("body").on("click", ".pass1", function () {
                    var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                    console.log(id) //91   94    30
                    $(this).parent().html("已通过");
                    $('#table .panduan1').attr("sleep","1");
                    var pd1=$('#table .panduan1').attr("sleep");
                    console.log(pd1)
                    if (pd1) {
                        massageAudit(ourl3,id,1);
                    }
                    return;
                    //这里还要使用ajax,向后台发送。。。,这里我还没有写
                });
                $("body").on("click", ".no-pass1", function () {
                    var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                    console.log(id) 
                    $(this).parent().html("未确认");
                    // massageAudit(ourl4,id,4);
                    $('#table .panduan1').attr("sleep","1");
                    var pd1=$('#table .panduan1').attr("sleep");
                    if (pd1) {
                        $(".alertBox").show();
                        $("#submit").click(function(){
                            if($(".alertBox textarea").val()!=""){
                                let con=$(".alertBox textarea").val();
                                console.log(ourl3)
                                massageAudit(ourl3,id,4,con);
                                $(".alertBox").hide();
                            }else if($(".alertBox textarea").val()!=""){
                                alert("未通过原因不能为空");
                            }
                        })

                    }
                    return;
                    //这里还要使用ajax,向后台发送。。。
                });
                $("body").on("mouseover", ".panduan2", function (){
                  $('#table .pass2').css({ "cursor" : "not-allowed"});
                  $('#table .no-pass2').css({ "cursor" : "not-allowed"});
                  $('#table .panduan2').attr('title','无权限操作！')
                })
            }

            else if (data.list[i].townAduit == 1) {
              if (data.list[i].districtAduit == 0) {
                  $("body").on("click", ".pass2", function () {
                      var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                      console.log(id) //91   94    30
                      $(this).parent().html("已通过");
                      $('#table .panduan2').attr("sleep","1");
                      var pd2=$('#table .panduan2').attr("sleep");
                      if (pd2) {
                        massageAudit(ourl4,id,1);
                      }
                      return;
                  });
                  $("body").on("click", ".no-pass2", function () {
                      var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                      $(this).parent().html("未确认");
                      $('#table .panduan2').attr("sleep","1");
                      var pd2=$('#table .panduan2').attr("sleep");
                      if (pd2) {
                          $(".alertBox").show();
                          $("#submit").click(function(){
                              if($(".alertBox textarea").val()!=""){
                                  let con=$(".alertBox textarea").val();
                                  massageAudit(ourl4,id,4,con);
                                  $(".alertBox").hide();
                              }else if($(".alertBox textarea").val()==""){
                                  alert("未通过原因不能为空");
                              }
                          })

                      }
                      return;
                      //这里还要使用ajax,向后台发送。。。
                  });
              }
            }

            if (data.list[i].TOWN_ADUIT == 0) {
                $("body").on("click", ".pass1", function () {
                    var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                    var number =  $(this).parent().parent().find("td").eq("1").attr("sleep1");
                    $(this).parent().html("已通过");
                    $('#table .panduan1').attr("sleep","1");
                    var pd1=$('#table .panduan1').attr("sleep");
                    if (pd1) {
                        massageAudit2(ourl3,id,number,1);
                    }
                    return;
                    //这里还要使用ajax,向后台发送。。。,这里我还没有写
                });
                $("body").on("click", ".no-pass1", function () {
                    var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                    var number =  $(this).parent().parent().find("td").eq("1").attr("sleep1");
                    $(this).parent().html("未确认");
                    // massageAudit(ourl4,id,4);
                    $('#table .panduan1').attr("sleep","1");
                    var pd1=$('#table .panduan1').attr("sleep");
                    console.log(pd1)
                    if (pd1) {
                        $(".alertBox").show();
                        $("#submit").click(function(){
                            if($(".alertBox textarea").val()!=""){
                                let con=$(".alertBox textarea").val();
                                massageAudit2(ourl3,id,number,4,con);
                                $(".alertBox").hide();
                            }else if($(".alertBox textarea").val()!=""){
                                alert("未通过原因不能为空");
                            }
                        })
                    }
                    return;
                    //这里还要使用ajax,向后台发送。。。
                });
                $("body").on("mouseover", ".panduan2", function (){
                    $('#table .pass2').css({ "cursor" : "not-allowed"});
                    $('#table .no-pass2').css({ "cursor" : "not-allowed"});
                    $('#table .panduan2').attr('title','无权限操作！')
                })
            }

            else if (data.list[i].TOWN_ADUIT == 1) {
                if (data.list[i].DIS_ADUIT == 0) {
                    $("body").on("click", ".pass2", function () {
                        var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                        var number =  $(this).parent().parent().find("td").eq("1").attr("sleep1");
                        console.log(id) //91   94    30
                        $(this).parent().html("已通过");
                        $('#table .panduan2').attr("sleep","1");
                        var pd2=$('#table .panduan2').attr("sleep");
                        console.log(pd2)
                        if (pd2) {
                            massageAudit2(ourl4,id,number,1);
                        }
                        return;
                    });
                    $("body").on("click", ".no-pass2", function () {
                        var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                        var number =  $(this).parent().parent().find("td").eq("1").attr("sleep1");
                        //console.log(id)
                        $(this).parent().html("未确认");
                        // massageAudit(ourl4,id,4);
                        $('#table .panduan2').attr("sleep","1");
                        var pd2=$('#table .panduan2').attr("sleep");
                        if (pd2) {
                            $(".alertBox").show();
                            $("#submit").click(function(){
                                if($(".alertBox textarea").val()!=""){
                                    let con=$(".alertBox textarea").val();
                                    massageAudit2(ourl4,id,number,4,con);
                                    $(".alertBox").hide();
                                }else  if($(".alertBox textarea").val()!=""){
                                    alert("未通过原因不能为空");
                                }
                            })
                        }
                        return;
                        //这里还要使用ajax,向后台发送。。。
                    });
                }
            }

            else if(data.list[i].townAduit=="undefined" || data.list[i].townAduit==undefined) {
                $("body").on("click", ".pass1", function () {
                    var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                    console.log(id) //91   94    30
                    $(this).parent().html("已通过");
                    $('#table .panduan2').attr("sleep","1");
                    var pd2=$('#table .panduan2').attr("sleep");
                    console.log(pd2)
                    if (pd2) {
                        massageAudit3(ourl4,id,1);
                    }
                    return;
                });
                $("body").on("click", ".no-pass1", function () {
                    var id =  $(this).parent().parent().find("td").eq("1").attr("sleep");
                    //console.log(id)
                    $(this).parent().html("未确认");
                    $('#table .panduan2').attr("sleep","1");
                    var pd2=$('#table .panduan2').attr("sleep");
                    console.log(pd2)
                    if (pd2) {
                        $(".alertBox").show();
                        $("#submit").click(function(){
                            if($(".alertBox textarea").val()!=""){
                                let con=$(".alertBox textarea").val();
                                massageAudit3(ourl4,id,4,con);
                                $(".alertBox").hide();
                            }else if($(".alertBox textarea").val()!=""){
                                alert("未通过原因不能为空");
                            }
                        })
                    }
                    return;
                    //这里还要使用ajax,向后台发送。。。
                });
            }
            return;
        }        
};
function massageAudit(oburl,id,num,value){//信息审核贫困户审核
   $.ajax({
        url: oburl,
        method: "get",
        data: {"id": id, "type": num,"year":201808,"noContent":value},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType: "json",
        json: "callback",
        success: function (data) {
            console.log(oburl+'?id='+id+'&type='+num)
            if (data.code == 2000) {
                alert('信息审核成功！')
                if(oburl.endsWith("povertyAduit/updateTownAduit") || oburl.endsWith("povertyAduit/updateDisAduit")){
                    location.href="../html/show_poor_audit.html";
                }else if(oburl.endsWith("village/townAduit") || oburl.endsWith("village/townAduit")){
                    location.href="../html/show_funding_audit.html";
                }
            }
            else {
                alert('信息审核发送失败！')
            }
        }
    });
}
function massageAudit2(oburl,id,number,num,value){//信息审核贫困户审核
    $.ajax({
        url: oburl,
        method: "get",
        data: {"id": id, "type": number,"isAduit":num,"noContent":value},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType: "json",
        json: "callback",
        success: function (data) {
            console.log(oburl+'?id='+id+'&type='+num)
            if (data.code == 2000) {
                alert('信息审核成功！')
            }
            else {
                alert('信息审核发送失败！')
            }
        }
    });
}
function massageAudit3(oburl,id,num,value){//信息审核贫困户审核
    $.ajax({
        url: oburl,
        method: "get",
        data: {"id": id, "type": num,"year":201808,"noContent":value},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType: "json",
        json: "callback",
        success: function (data) {
            console.log(oburl+'?id='+id+'&type='+num)
            if (data.code == 2000) {
                alert('信息审核成功！')
                location.href="../html/show_evidence.html";
            }
            else {
                alert('信息审核发送失败！')
                location.href="../html/show_evidence.html";
            }
        }
    });
}
function showTab(ourl,ids) {//信息变更详情
    //这里是显示弹出框
    var tab = $("#tab");
    // var ids =  $(this).parent().find("td").eq("1").attr("sleep");
    // var tableName =  $(this).parent().find("td").eq("1").attr("sleep1");
    //console.log(ourl)
    //console.log(ids)
    //console.log(tableName)
    $('.form-02').show(200);
    $('.form-01').hide();
    $.ajax({
        url: ourl,
        method: "get",
        data: {"id": ids},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType: "json",
        json: "callback",
        success: function (data) {
            if (data.code == 2000) {
                var data = data.data;
                //console.log(data);
                //showTab(tab, data)
                //console.log('222');
                tab.empty();
                var str = ` <tr>
                    <th rowspan="" style="line-height: 80px">修改内容</th>
                    <th rowspan="" style="line-height: 80px">修改前</th>
                    <th rowspan="" style="line-height: 80px">修改后</th>
                </tr>`;
                for (let i = 0; i < data.length; i++) {
                    str += `<tr>
                      <td >${data[i].infoName}</td>
                      <td >${data[i].updateBefore}</td>
                      <td >${data[i].updateAfter}</td>
                  </tr>`;
                }
                tab.html(str)
            }
            else {
                console.log('error!')
            }
        }
    });
}
function showTab2(ourl,ids,tableName) {//信息变更详情
    //这里是显示弹出框
    var tab = $("#tab");
    $('.form-02').show(200);
    $('.form-01').hide();
    $.ajax({
        url: ourl,
        method: "get",
        data: {"id": ids,"type":tableName},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType: "json",
        json: "callback",
        success: function (data) {
            if (data.code == 2000) {
                var data = data.data.detail;
                //console.log(data);
                //showTab(tab, data)
                //console.log('222');
                tab.empty();
                var str = ` <tr>
                    <th rowspan="" style="line-height: 80px">添加字段</th>
                    <th rowspan="" style="line-height: 80px">添加内容</th>
                </tr>`;
                for (let i = 0; i < data.length; i++) {
                    str += `<tr>
                      <td >${data[i].COMMENTS}</td>
                      <td >${data[i].Field}</td>
                  </tr>`;
                }
                tab.html(str)
            }
            else {
                console.log('error!')
            }
        }
    });
}
function showTab3(ourl,ids,tableName) {//信息变更详情
    //这里是显示弹出框
    var tab = $("#tab");
    $('.form-02').show(200);
    $('.form-01').hide();
    $.ajax({
        url: ourl,
        method: "get",
        data: {"id": ids,"type":tableName},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        dataType: "json",
        json: "callback",
        success: function (data) {
            if (data.code == 2000) {
                var data = data.data;
                //console.log(data);
                //showTab(tab, data)
                //console.log('222');
                tab.empty();
                var str = ` <tr>
                    <th rowspan="" style="line-height: 80px">作证类别</th>
                    <th rowspan="" style="line-height: 80px">图片内容</th>
                </tr>`;
                for (let i = 0; i < data.detail.length; i++) {
                    str += `<tr>
                      <td >${data.type}</td>
                      <td ><img modal="zoomImg" src="${data.detail[i]}" alt="" style="width:300px;height:200px;"></td>
                  </tr>`;
                }
                tab.html(str)
                boxImg();
            }
            else {
                console.log('error!')
            }
        }
    });
}
/**-----------------------------------------分页--------------------------------------**/
function page_init(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
            url:url + "povertyAduit/select",
            type:"get",
            data:{"year":201808,"pageNum": index+1,pageSize:12},
            dataType:"json",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            success:function (data) {
            if (data.code == 2000){
                $(".page-sum").text("共"+data.data.pages+"页");
                $("#allTotal").text("总户数："+data.data.total);
                showTable(table,data.data)
                // showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
            },
            error:function () {
            }
    })
}
function page_init2(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "village/aduitInfo",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $(".page-sum").text("共"+data.data.pages+"页");
                $("#allTotal").text("总户数："+data.data.total);
                showTable(table,data.data)
                // showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init3(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "eight/aduit",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $(".page-sum").text("共"+data.data.pages+"页");
                $("#allTotal").text("总户数："+data.data.total);
                showTable(table,data.data)
                // showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init4(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/TwoNoWarry",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init5(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/IDNumberNotNormal",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init6(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/ImportantTarget",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init7(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/PovertyCause",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init8(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/PovertyBottom",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init9(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/LaborAbility",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init10(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/Income",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init11(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/LaborStatus",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init12(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/HelpPerson",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init13(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/targetNoTrue",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init14(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "smallDetail/DistrictNumber",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.PageTotal);
                $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                // showTable(table,data.data)
                showAllPoorInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init15(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "/evidence/aduit/background",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.total);
                $(".page-sum").html("共"+Math.ceil(data.data.total/12)+"页");
                showTable(table,data.data)
                // showTableInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function page_init16(index) {
    var p_qv=$("#p_qv").val();  //监管分类
    var p_xiang=$("#p_xiang").val();  //监管规则
    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
        // select1=parseInt($(this).html());
        //console.log(select1);
    })
    console.log(index);
    let table=$("#table");
    $.ajax({
        url:url + "/eight/batch/list",
        type:"get",
        data:{"year":201808,"pageNum": index+1,pageSize:12},
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function (data) {
            if (data.code == 2000){
                $('#allTotal').html("总数："+data.data.total);
                $(".page-sum").html("共"+Math.ceil(data.data.total/12)+"页");
                showTable(table,data.data)
                // showTableInfo(index,$('#formSubmit2'),data,select1)
            }
        },
        error:function () {
        }
    })
}
function showPage(obj,data){
    $("#Pagination").pagination(data,{
         callback:PageCallback,         //pageCallback() 为翻页调用函数
         items_per_page:12,                //每页显示条目数
         num_display_entries: 4,                //连续分页显示分页条目数
         num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage2(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback2,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage3(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback3,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage4(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback4,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage5(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback5,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage6(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback6,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage7(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback7,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage8(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback8,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage9(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback9,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage10(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback10,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage11(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback11,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage12(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback12,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage13(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback13,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage14(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback14,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage15(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback15,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
function showPage16(obj,data){
    $("#Pagination").pagination(data,{
        callback:PageCallback16,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
    });
}
//ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
 //   console.log('das');
    page_init(page_index);      //第一页为0
}
function PageCallback2(page_index,jq){
    //   console.log('das');
    page_init2(page_index);      //第一页为0
}
function PageCallback3(page_index,jq){
    //   console.log('das');
    page_init3(page_index);      //第一页为0
}
function PageCallback4(page_index,jq){
    page_init4(page_index);      //第一页为0
}
function PageCallback5(page_index,jq){
    page_init5(page_index);      //第一页为0
}
function PageCallback6(page_index,jq){
    page_init6(page_index);      //第一页为0
}
function PageCallback7(page_index,jq){
    page_init7(page_index);      //第一页为0
}
function PageCallback8(page_index,jq){
    page_init8(page_index);      //第一页为0
}
function PageCallback9(page_index,jq){
    page_init9(page_index);      //第一页为0
}
function PageCallback10(page_index,jq){
    page_init10(page_index);      //第一页为0
}
function PageCallback11(page_index,jq){
    page_init11(page_index);      //第一页为0
}
function PageCallback12(page_index,jq){
    page_init12(page_index);      //第一页为0
}
function PageCallback13(page_index,jq){
    page_init13(page_index);      //第一页为0
}
function PageCallback14(page_index,jq){
    page_init14(page_index);      //第一页为0
}
function PageCallback15(page_index,jq){
    page_init15(page_index);      //第一页为0
}
function PageCallback16(page_index,jq){
    page_init16(page_index);      //第一页为0
}