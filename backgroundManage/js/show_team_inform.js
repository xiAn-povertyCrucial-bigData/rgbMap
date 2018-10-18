$(document).ready(function(){
	let token=$.cookie("token");
    var table = $("#table");
    var shuxing = $("#shuxing");
    var company = $("#company");
    var city = $("#city");
    var area = $("#area");
    var start = $("#start");
    var end = $("#end");
    var page = $(".allPage");
    var bianma=[];
        $(function(){
        $.ajax({
            url: url + "fpzt/bfdw/query",
            data:{"page_index": 1,"page_size": 12},
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
                    //console.log("ok");
                    showAllInfo(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                    init_County(shuxing);
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                }else if(data.code==1005){
			alert(data.message)
		}else if(data.code==1009){
			alert(data.message)
		}else if(data.code==4000){
			alert(data.message)
		}
             
            }
        
    })
  })

  function showAllInfo(index,obj,data){
      obj.empty();
      var str = `
      <tr>
            <th>序号</th>
            <th>单位名称</th>
            <th>单位所在地</th>
            <th>隶属关系</th>
            <th>对口帮扶区县</th>
            <th>对口帮扶村</th>
            <th>开始时间</th>
            <th>结束时间</th>
            <th>帮扶单位类型</th>
            <th>联系人姓名</th>
            <th>操作</th>
        </tr>
        `;
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
   	//bianma[i]=data.data.list[i].AAP110;
   	//console.log(bianma[i])
    var str1=`  
     <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAP001}</td>
              <td>陕西省</td>
              <td>${data.data.list[i].AAP004}</td>
              <td>${data.data.list[i].AAR009_X}</td>
              <td>${data.data.list[i].AAR009}</td>
              <td>${data.data.list[i].AAR020}</td>
              <td>${data.data.list[i].AAR021}</td>
              <td>${data.data.list[i].AAP051}</td>
              <td>${data.data.list[i].AAR011}</td>
              <td>
                  <a href="show_team_detail_inform.html?value=${data.data.list[i].AAP110}" id='xiangqing'>详情</a>
                  <a href="revise_team_inform.html?value=${data.data.list[i].AAP110}" id='xiugai'>修改</a>
              </td>
          </tr>`;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }
  
  let indexs=1;

  function page_init(index) {
        var start2 = start.val().replace(/-/g,"");//开始结束时间的截取数字
        var end2 = end.val().replace(/-/g,"");
        if(start2 >= end2){
           end2="";
           end.val("");
        }
        indexs=index+1;
        $.ajax({
                url:url + "fpzt/bfdw/query",
                type:"get",
                data:{"page_index": index+1,"page_size": 12,
           "aap004":shuxing.val(),"aap001":company.val(),"aar009_x":city.val(),"aar009":area.val(),"aar020":start2,"aar021":end2},
                beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                          //  console.log("ok");
                            showAllInfo( index,table,data); 
                        }
                },
                error:function () {
                }
            })
        //console.log(indexs)
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

//隶属关系

function init_County(shuxing){
    var shuxing = $("#shuxing");
            $.ajax({
            url: url + "fpzt//lsgx/query", 
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
                 
                    showCountyInfo( shuxing,data);
                  
                }
            
            }
        
    })
}


function showCountyInfo(obj,data){
     obj.empty();
     var str = `<option value="">--请选择--</option>`;
     var string = "";
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAA102}">${data.data[i].AAA103}</option>
     `;
     }
     obj.html(str);
}


$("body").on("click","#btn_orange",function(){
	//alert(111)
     var start1 = start.val().replace(/-/g,"");
     var end1 = end.val().replace(/-/g,"");
        // console.log(city);
       $(function(){
        $.ajax({
            url: url + "fpzt/bfdw/query",
            data:{"page_index": 1,"page_size": 12,"aap004":shuxing.val(),"aap001":company.val(),
            "aar009_x":city.val(),"aar009":area.val(),"aar020":start1,"aar021":end1},
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
                    console.log("ok");
                    showAllInfo(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                }else if(data.code == 1009){
					var str=`<tr>
			            <th>序号</th>
			            <th>单位名称</th>
			            <th>单位所在地</th>
			            <th>隶属关系</th>
			            <th>对口帮扶区县</th>
			            <th>对口帮扶村</th>
			            <th>开始时间</th>
			            <th>结束时间</th>
			            <th>帮扶单位类型</th>
			            <th>联系人姓名</th>
			            <th>操作</th>
			        </tr>
					<tr><td colspan='11' style="font-size:30px;color:#767272;">查无数据</td></tr>`
					table.html(str)
					$("#total").empty();
				    $(".allPage").empty();
				}else if(data.code==1005){
			alert(data.message)
		}else if(data.code==4000){
			alert(data.message)
		}
                
            }
        
    })
  })
 })
 end.change(function(){
        var start2 = start.val().replace(/-/g,"");
        var end2 = end.val().replace(/-/g,"");
        if(start2 >= end2){
           end.val("");
        }
 })

 /*导出*/
$("body").on("click","#dataImport",function(){
	$.ajax({
        url: url + "fpztExport/excel/bfdwEx/check",   
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",           
        success: function(data){
        if (data.code == 2000){
			var start1 = start.val().replace(/-/g,"");
	        var end1 = end.val().replace(/-/g,"");
	        if(start1 >= end1){
	           end1="";
	           end.val("");
	        }
	
			data = {"page_index": indexs,"page_size": 12,"aap004":shuxing.val(),"aap001":company.val(),
	            "aar009_x":city.val(),"aar009":area.val(),"aar020":start1,"aar021":end1}
	
	            /*主体内容渲染*/
	     
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
							let cc=url+"fpztExport/bfdwEx?"+b;
							console.log(cc);
				      window.location.href=cc;	
      		}               
        }        
    })  
})

   //重置条件
//  $("body").on("click",".btn_blue",function(){
//	$(".searchs").empty();
//	
//	str=`   <div>
//              <div class="form-group">
//                  <label for="">隶属关系</label>
//                  <select name="" id="shuxing">
//                      <option value="">--请选择--</option>                       
//                      <!--<option value="40">市、地区</option>
//                      <option value="50">县（区）</option>                      
//                      <option value="60">街道、镇、乡</option>
//                      <option value="73">村两委</option>
//                      <option value="80">军队</option>
//                      <option value="90">其他</option>-->
//                     
//                  </select>
//              </div>
//              <div class="form-group">
//                  <label for="">单位名称</label><input type="text" id="company"/>                   
//              </div>
//              <div class="form-group">
//                  <label for="">对口帮扶区县</label><input type="text" value="" id="city" />                   
//              </div>
//              <div class="form-group">
//                  <label for="">对口帮扶村</label><input type="text" id="area" />                   
//              </div>               
//          </div>
//          <div id="" style="clear: both;">
//          	<div class="form-group">
//                  <label for="">开始时间</label><input id="start" type="date" style="margin-left: 5px;"/>                   
//              </div>
//              <div class="form-group">
//                  <label for="">结束时间</label><input type="date" id="end" />                   
//              </div> 
//          </div>
//          <div>
//              <input type="button" id="btn_orange" class="btn_orange" style="float: right;" name="" value="查询">
//              <input type="button" class="btn_blue" style="float: right;" name="" value="重置条件">
//          </div>
//       `;
//	$(".searchs").html(str);
//	
//	init_County(shuxing);
//	
//})
 
})