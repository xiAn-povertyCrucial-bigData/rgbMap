$(document).ready(function(){
  	let token=$.cookie("token");
  	var totle;
     //var  url="http://192.168.1.135:8080/"
     var formInfos = $('#formSubmit2')
     var page = $(".allPage");
     var city = $("#country");
     var town = $("#town");
     var area = $("#village");
     var p_shi = $("#p_shi");
     //全部户数/人数
     var allLifeHome=$("#allLifeHome");
     var allLifePerson = $("#allLifePerson");
     //达标户数/人数
     var isReachHome=$("#isReachHome");
     var isReachPerson = $("#isReachPerson");
     //未达标户数/人数
     var noReachHome=$("#noReachHome");
     var noReachPerson = $("#noReachPerson");
     var str = `<option value="">县（区）</option>`;
     city.html(str);
     var str1 = `<option value="">乡（镇）</option>`;
     town.html(str1);
     var str2 = `<option value="">村</option>`;
     area.html(str2);
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    if(aa.aar008=="610100000000"){
        datas={"page_index": 1,"page_size": 12,"aar040": 201808}
    }else if(aa.aar008=="619900000000"){
    	datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aaa001":619900000000}
    }else if(aa.aar008.substring(6)=='000000'){
        datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":aa.aar008}
    }else{
        datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":aa.aar008}
    }
     $.ajax({
      url: url + "tpjg/hzbquery", 
      //data:{"page_index":1,"page_size": 12,"aar040": 201808},
      data:datas,
      beforeSend:function(request){
        request.setRequestHeader("Authorization",token);
        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        ShowLoading();
      },
      method: "get",
      dataType: "json",
      success: function(data){
        if (data.code == 2000){
	           showAllPoorInfo( 0,formInfos,data);
	           showPage($(".searchPage"),data.data.total);
	           init_Shi()
	           page.html('共'+Math.ceil(data.data.total/12)+"页");
	           $("#total").html("总数："+data.data.total);
	           totle=data.data.total;
	             }else if(data.code==1005){
	               alert(data.message)
	             }else if(data.code==1009){
	               alert(data.message)
	             }else if(data.code==4000){
	               alert(data.message)
	             }	         
	        },
	        complete:function(){
			     HideLoading();
			}	       
	    })

//加载西安市
    function init_Shi(){
        var p_shi=$("#p_shi");
        $.ajax({
            url: url + "district/city",
            data:{},
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "get",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                    showShiInfo(p_shi,data);
                    init_County()
                }
            }
        })
    }
    function showShiInfo(obj,data){
        obj.empty();
        var str = `<option value="">全部</option>`;
        var string = "";
        let arr=[];
        for(let i = 0; i < data.data.length; i++){
            str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
            let obj={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
            arr.push(obj);
        }
        obj.html(str);
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);

        if(aa.aar008==619900000000){
        	$("#p_shi").empty().append("<option value='619900000000'>西咸新区</option>").attr("disabled","disabled");
        }
    }
	$("#p_shi").change(function(){
	    var opt=$("#p_shi");
	    //var opt1 = $("#p_qv");
	         $.ajax({
	            url: url + "district/county", 
	            data:{"aar001":opt.val()},
	            beforeSend:function(request){
			        request.setRequestHeader("Authorization",token);
			        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
	            method: "get",
	            dataType: "json",
	            json: "callback",
	            jsonpCallback: 'jsonpCallback',
	            success: function(data){
	                if (data.code == 2000){
	                     init_County();
	                }
	            }
	    })
	});
     function init_County(){
      var opt=$("#p_shi");
      var county = $("#country");
      $.ajax({
        url: url + "district/county", 
        data:{"aar001":opt.val()},
        beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        success: function(data){
          if (data.code == 2000){
                   showCountyInfo( county,data);
                }
              }
              
            })
    }


    function  showCountyInfo(obj,data){
     let arr=[];
     obj.empty();
     var str = `<option value="">县（区）</option>`;
     for(let i = 0; i < data.data.length; i++){
       str += `
       <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
       `;
         let obj={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
         arr.push(obj);
     }
     obj.html(str);
     let tokenCon=$.cookie("loginMessage");
     let aa=JSON.parse(tokenCon);
     for(let i=0;i<arr.length;i++){
        // console.log(arr[i].number+"---"+aa.aaa113);
        if(arr[i].number==aa.aar008 ||arr[i].number==aa.aaa113){
            $("#country").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            $("#p_shi").attr("disabled","disabled");
            var opt=$("#country");
            var opt1 = $("#town");
            $.ajax({
                url: url + "district/town",
                data:{"county":opt.val()},
                beforeSend:function(request){
                    request.setRequestHeader("Authorization",token);
                    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
                method: "get",
                dataType: "json",
                json: "callback",
                jsonpCallback: 'jsonpCallback',
                success: function(data){
                    if (data.code == 2000){
                        showTownInfo(opt1,data);
                        page.html(data.data.total);
                    }
                }
            })
        }
    }
}

   $("body").on("change","#country",function(){
    var opt=$("#country");
    var opt1 = $("#town");
        $.ajax({
          url: url + "district/town", 
          data:{"county":opt.val()},
          beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          },
          method: "get",
          dataType: "json",
          json: "callback",
          jsonpCallback: 'jsonpCallback',
          success: function(data){
            if (data.code == 2000){
              showTownInfo(opt1,data);
            }
                // console.log('111');
              }
              
            })
      });

   function showTownInfo(obj,data){
    obj.empty();
    let arr=[];
    var str = `<option value="">乡（镇）</option>`;
    for(let i = 0; i < data.data.length; i++){
     str += `
     <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
     let obj2={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
     arr.push(obj2);
     obj.html(str);     
    }
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    if(aa.aar008.substring(6)!="000000"){
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                $("#town").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
            }
        }
        let p_qv=$("#country").val();  //区
        //let p_xiang=$("#p_x").val();  //乡
        var town = $("#town").val();
        var vill = $("#village");       
        $.ajax({
            url: url + "district/village",
            data:{"town": town},
            method: "get",
            dataType: "json",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            success: function(data){
                if (data.code == 2000){
                    showVillageInfo(vill,data);
                }
            }
        })
    }
 }


 $("body").on("change","#town",function(){
  var town = $("#town").val();
   // console.log(town);
   var vill = $("#village");
   $.ajax({
    url: url + "district/village", 
    data:{"town": town},
    method: "get",
    dataType: "json",
    beforeSend:function(request){
      request.setRequestHeader("Authorization",token);
      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
    success: function(data){
      if (data.code == 2000){
        
        	showVillageInfo(vill,data);
            }
          }
          
        })
 });
 function showVillageInfo(obj,data){
   obj.empty();
   var str = `<option value="">村</option>`;
   for(let i = 0; i < data.data.length; i++){
     str += `
     <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
     obj.html(str);
     
   }
 }
 function showAllPoorInfo(index,obj,data){
  obj.empty();
  var str = `
  <tr>
  <th>序号</th>
  <th>户主姓名</th>                          
  <th>贫困户所在地</th>              
  <th>家庭年人均纯收入(总分20)</th>
  <th>有安全住房(总分20)</th>
  <th>有安全饮水(总分20)</th>
  <th>无义务教育阶段辍学学生(总分20)</th>
  <th>是否参加大病保险(总分20)</th>
  <th>指标得分</th>
  <th>是否达标</th> 
  </tr>`
  obj.html(str);

  for(let i = 0; i < data.data.list.length-1; i++ ){
    var str1=`  
    <tr>
    <td>${index*12+1+i}</td>
    <td><a href="showDetailsPoor1.html?value=${data.data.list[i].AAC001}&time=${201808}" style='color:#09c;background:none;'>${data.data.list[i].HOLDERNAME}</a></td>
    <td>${data.data.list[i].ADDRESS}</td>
    <td>${data.data.list[i].INCOME}</td>
    <td>${data.data.list[i].HOUSE}</td>
    <td>${data.data.list[i].WATER}</td>
    <td>${data.data.list[i].STUDENT}</td>
    <td>${data.data.list[i].INSURANCE}</td>
    <td>${data.data.list[i].SCORE}</td>
    <td>${data.data.list[i].IS_STANDARD}</td>
    </td>
    </tr>`;
    obj.html(function (i, value) {
      return value + str1;
    });
  }
  var num = data.data.list.length-1;
  allLifeHome.html(data.data.list[num].HOLDER_NUM);
  allLifePerson.html(data.data.list[num].PEOPLE_NUM);
  isReachHome.html(data.data.list[num].OKHOLDER_NUM);
  isReachPerson.html(data.data.list[num].OKPEO_NUM);
  noReachHome.html(data.data.list[num].NOHOLDER_NUM)
  noReachPerson.html(data.data.list[num].NOPEO_NUM);
  isReach = parseFloat(Number(data.data.list[num].OKHOLDER_NUM)/Number(data.data.list[num].HOLDER_NUM)*100).toFixed(2);
  noReach = parseFloat(Number(data.data.list[num].NOHOLDER_NUM)/Number(data.data.list[num].HOLDER_NUM)*100).toFixed(2);
  $("#isReach1").html(isReach+"%");
  $("#noReach").html(noReach+"%");
}
var indexs = 1;
function page_init(index) {
 indexs = index + 1;
 var income = $("#income"); 
 var isReach = $("#isReach");
 var water = $("#water");
 var student = $("#nostudent");
 var soreSection = $("#scoreSection");
 var safehouse = $("#safehouse");
 var care = $("#care");
 var aar001;
var town = $("#town");  //乡
var village =$("#village");
var country=$("#country");  //区
        if(village.val()!=""){
          aar001 = village.val();
        }else if(town.val()!=""&&village.val()==""){
          aar001 = town.val();
        }else if(town.val()==""&&village.val()==""&&country.val()!=""){
          aar001 = country.val();
        }
        $.ajax({
          url:url + "tpjg/hzbquery",
          type:"post",
          data:{"page_index": index+1,"page_size": 12,'aar040':201808,'aaa001':$('#p_shi').val(),'aar001':aar001,'isReach':isReach.val(),'scoreSection':soreSection.val(),'one':income.val(),'two':safehouse.val(),
          'three':water.val(), 'four':student.val(),'five':care.val()},
          dataType:"json",
          beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            ShowLoading();
          },
          success:function (data) {
            if (data.code == 2000){
              showAllPoorInfo( index,formInfos,data);
            }
          },
          complete:function(){
		     HideLoading();
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

    //ajax分页请求,page_index :页码
    function PageCallback(page_index,jq){
 //   console.log('das');
    page_init(page_index);      //第一页为0
  }
//查询
$(".btn_orange1").on("click",function(){
        var income = $("#income"); //人均收入
        var isReach = $("#isReach");//是否达标
        var water = $("#water");   //安全饮水
        var student = $("#nostudent");  //辍学人数
        var scoreSection = $("#scoreSection");  //指标得分
        var safehouse = $("#safehouse");//安全住房
        var care = $("#care"); //医保
        var town = $("#town");  //乡
        var village =$("#village");
        var country=$("#country");  //区
		var p_shi=$("#p_shi");  //shi
		var aar001;
        if(country.val()=="610112000000"||country.val()=="610104000000"||country.val()=="610113000000"||country.val()=="610103000000"||country.val()=="610102000000"){
         var str=`<div align="center" style="margin-top:40px;margin-bottom:80px;font-size:32px;color:#767272;">查无数据</div>`
         $("#total").empty();
         $(".allPage").empty();
         showPage($(".searchPage"),0);
         formInfos.css("width","100%");
         formInfos.html(str);
         $("#allLifeHome").html("--");
         $("#isReachHome").html("--");
         $("#noReachHome").html("--");
         $("#allLifePerson").html("--");
         $("#isReachPerson").html("--");
         $("#noReachPerson").html("--");
         $("#isReach1").html("--");
         $("#noReach").html("--");
       }else{
        if(village.val()!=""){
          aar001 = village.val();
        }else if(town.val()!=""&&village.val()==""){
          aar001 = town.val();
        }else if(town.val()==""&&village.val()==""&&country.val()!=""){
          aar001 = country.val();
        }
        var data= {"page_index": 1,"page_size": 12,'aar040':201808,'aaa001':$('#p_shi').val(),'aar001':aar001,'isReach':isReach.val(),'scoreSection':scoreSection.val(),'one':income.val(),'two':safehouse.val(),
        'three':water.val(), 'four':student.val(),'five':care.val()};
                    // console.log(data_);
                    $.ajax({
                      url:url + "tpjg/hzbquery",
                      type:"get",
                      data:data,
                      beforeSend:function(request){
                        request.setRequestHeader("Authorization",token);
                        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                        ShowLoading();
                      },
                      dataType:"json",
                      success:function (data) {
                        if (data.code == 2000){
                                    //   console.log("ok");
                                    showAllPoorInfo(0, formInfos,data);
                                    formInfos.css("width","1600px");
                                    showPage($(".searchPage"),data.data.total);
                                    totle=data.data.total
                                    page.html("共"+Math.ceil(data.data.total/12)+"页");
                                    $("#total").html("总数："+data.data.total);
                                        //alert("213")
                                      }else if(data.code == 1005){
                                        var str=`<tr>
                                        <th>序号</th>
                                        <th>户主姓名</th>                          
                                        <th>贫困户所在地</th>              
                                        <th>家庭年人均纯收入(总分20)</th>
                                        <th>有安全住房(总分20)</th>
                                        <th>有安全饮水(总分20)</th>
                                        <th>无义务教育阶段辍学学生(总分20)</th>
                                        <th>是否参加城乡居民医保(总分20)</th>
                                        <th>指标得分</th>
                                        <th>是否达标</th> 
                                        </tr>
                                        <tr><td colspan='10' style="font-size:30px;color:#767272;">查无数据</td></tr>`
                                        formInfos.html(str)
                                        $("#total").empty();
                                        $(".allPage").empty();
                                      }else if(data.code==1009){
                                       alert(data.message)
                                     }else if(data.code==4000){
                                       alert(data.message)
                                     }
                                   },
                                   complete:function(){
								     HideLoading();
								   },
                                   error:function () {
                                   }
                                 })
                  }
                });
//清空
$("body").on("click",'.btn_blue1',function(){
  $("#searchCity").empty();
  $("#searchbase1").empty();
  $("#searchbase2").empty();
  $("#searchbase3").empty();
  var str1 =` <label for="">行政区划</label>
  <input type="text" value="陕西省" disabled>
  <input type="text" value="西安市" disabled>
  <select name="" id="country">
  </select>
  <select name="" id="town">
  </select>
  <select name="" id="village">
  </select>             `
  $("#searchCity").html(str1);
  var str2 =`  <label for="" style="width: 145px;">家庭年人均纯收入</label>                  
  <select name="" id="income">
  <option value="">--是否达标--</option>
  <option value="0">未达标</option>
  <option value="1">已达标</option>                     
  </select>
  <label for="" style="width: 145px;">有安全住房</label>                  
  <select name="" id="safehouse">
  <option value="">--是否达标--</option>
  <option value="0">未达标</option>
  <option value="1">已达标</option>                     
  </select>                  
  <label for="" style="width: 145px;">有安全饮水</label>                  
  <select name="" id="water">
  <option value="" >--是否达标--</option>
  <option value="0">未达标</option>
  <option value="1">已达标</option>                     
  </select>`;
  $("#searchbase1").html(str2);

  var str3 = `<label for="" style="width: 145px;">无义务教育阶段辍学学生</label>                  
  <select name="" id="nostudent">
  <option value="">--是否达标--</option>
  <option value="0">未达标</option>
  <option value="1">已达标</option>                     
  </select>
  <label for="" style="width: 145px;">是否参加城乡居民医保</label>                  
  <select name="" id="care">
  <option value="">--是否达标--</option>
  <option value="0">未达标</option>
  <option value="1">已达标</option>                     
  </select>           `;
  $("#searchbase2").html(str3);
  var str4 = `	<label for="" style="width: 145px;">指标得分</label>
  <select id="scoreSection">             		
  <option value="">--请选择--</option>
  <option value="0-20">0-20分</option>
  <option value="20-40">20-40分</option>
  <option value="40-60">40-60分</option>
  <option value="60-80">60-80分</option>
  <option value="80-100">80-100分</option>
  </select>  
  <label for="" style="width: 145px;">是否达标</label>
  <select id="isReach">
  <option value="">--请选择--</option>
  <option value="0">否</option>
  <option value="1">是</option>                     
  </select> `;
  $("#searchbase3").html(str4);
  var city = $("#country");
  var town = $("#town");
  var area = $("#village");
  var str5 = `<option value="">县（区）</option>`;
  city.html(str5);
  var str6 = `<option value="">乡（镇）</option>`;
  town.html(str6);
  var str7 = `<option value="">村</option>`;
  area.html(str7);
  init_County();
}) 



/*导出*/
$("body").on("click","#dataImport",function(){
	$.ajax({
    url: url + "tpjg/export/exist/hzbquery",  
    data:{},
    beforeSend:function(request){
      request.setRequestHeader("Authorization",token);
      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
      ShowLoading();
    },
    method: "get",
    dataType: "json",           
    success: function(data){
      if (data.code == 2000){
        var income = $("#income"); //人均收入
        var isReach = $("#inReach");//是否达标
        var water = $("#water");   //安全饮水
        var student = $("#nostudent");  //辍学人数
        var soreSection = $("#soreSection");  //指标得分
        var safehouse = $("#safehouse");//安全住房
        var care = $("#care"); //医保
        var town = $("#town");  //乡
        var village =$("#village");
        var country=$("#country");  //区
		var aar001;
        if(country.val()=="610112000000"||country.val()=="610104000000"||country.val()=="610113000000"||country.val()=="610103000000"||country.val()=="610102000000"){
         alert("数据为空,无法导出");
        }else{
        if(village.val()!=""){
          aar001 = village.val();
        }else if(town.val()!=""&&village.val()==""){
          aar001 = town.val();
        }else if(town.val()==""&&village.val()==""&&country.val()!=""){
          aar001 = country.val();
        }
        var data= {"page_index":1,"page_size": totle,'aar040':201808,'aaa001':$('#p_shi').val(),'aar001':aar001,'isReach':isReach.val(),'scoreSection':soreSection.val(),'one':income.val(),'two':safehouse.val(),
          'three':water.val(), 'four':student.val(),'five':care.val()};

            /*去空*/
            function qukong(obj){
              for(var key in obj){
                if(obj[key]==null || obj[key]=='' || obj[key]=="null"){
                  console.log(obj[key]);
                  delete obj[key];
                }
              }
              return obj;
            }
            var newmap=qukong(data);
            console.log(newmap);
            /*拼接*/
            let strs="";
            function pinjie(obj){
              for(let key in obj){
                strs+=key+"="+obj[key]+"&";
              }
              return strs;
            }
            let a=pinjie(newmap)
            let b=a.substring(0,a.length-1);
            console.log(b);
            let cc=url+"tpjg/export/hzbquery?"+b;
            console.log(cc);
            window.location.href=cc;	
          }
          
        }else if(data.code==1005){
          alert(data.message)
        }else if(data.code==1009){
          alert(data.message)
        }else if(data.code==4000){
          alert(data.message)
        }               
      },
      complete:function(){
	     HideLoading();
	  }
    })     
})   

function ShowLoading() {
    $(".spinner").show();
}
function HideLoading() {
    $(".spinner").hide();
}

})

