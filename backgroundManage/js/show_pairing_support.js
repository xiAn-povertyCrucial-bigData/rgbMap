//此接口的县乡村参考签到管理的接口 重新写 show_sign_ranking.js

$(document).ready(function(){  
	let token=$.cookie("token");
    var table = $("#pkctable");
    //var table1 = $("#pkhtable");
    var shuxing = $("#villageType");
   // var company = $("#company");
    var p_shi = $("#p_shi");
    var p_shi1 = $("#p_shi1");
    var city = $("#country");
    var city1 = $("#country1");
    var town = $("#town");
    var town1 = $("#town1");
    var area = $("#village");
    var area1 = $("#village1");
    var pair = $("#pairing");
    var pair1 = $("#pairing1")
    var page = $(".allPage");
    var str = `<option value="">县（区）</option>`;
    city.html(str);
    city1.html(str);
    var str1 = `<option value="">乡（镇）</option>`;
    town.html(str1);
    town1.html(str1);
    var str2 = `<option value="">村</option>`;
    area.html(str2);
    area1.html(str2);
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    if(aa.aar008==610100000000){
        var data={"page_index": 1,"page_size": 12,'aar040':201808};
    }else if(aa.aar008=="619900000000"){
    		data={"page_index": 1,"page_size": 10,"aar040": 201808,"aar008":619900000000}
    }else if(aa.aar008.substring(6)=="000000"){
       var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_x':aa.aar008};
    }else if(aa.aar008.substring(9)=="000"){
        var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_z':aa.aar008};
    }
    $.ajax({
            url: url + "fpzt/jdgl/cjd/query",
            data:data,
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
            },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showAllInfo(0,table,data);
                    init_Shi();
                    //init_County1(city1,data);
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                    totle=data.data.total;
                    $('.btn_orange').addClass("btn_select");
                    $('.btn_orange').removeClass("btn_select1");
                    $('#dataImport').addClass("dataImport1");
                    $('#dataImport').removeClass("dataImport2");
                    showPage($(".searchPage"),data.data.total);
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
	    var city = $("#country");
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
//加载县
function init_County(){
	var opt=$("#p_shi");
    var city = $("#country");
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
                    showCountyInfo(city,data);
                }           
            }       
    	})
}
function showCountyInfo(obj,data){
        obj.empty();
        var str = `<option value="">县（区）</option>`;
        var string = "";
        let arr=[];
        for(let i = 0; i < data.data.length; i++){
            str += `
             <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
         `;
            let obj={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
            arr.push(obj);
        }
        console.log(arr)
        obj.html(str);
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);
        for(let i=0;i<arr.length;i++){
            //console.log(arr[i].number+"---"+aa.aaa113);
            if(arr[i].number==aa.aar008 ||arr[i].number==aa.aaa113){
                // $("#county").empty();
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

$("#country").change(function(){
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
     // console.log(obj.val());
     }
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    // console.log(aa.aar008.substring(6));
    if(aa.aar008.substring(6)!="000000"){
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                // $("#county").empty();
                $("#town").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
                var opt=$("#town");
                var opt1 = $("#village");
                $.ajax({
                    url: url + "district/village",
                    data:{"town":opt.val()},
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
                            showVillageInfo(opt1,data);
                            page.html(data.data.total);
                        }
                    }

                })
            }
        }
    }
}

$("#town").change(function(){
    var town = $("#town").val();  
    var vill = $("#village");
         $.ajax({
            url: url + "district/village", 
            data:{"town": town},
            beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
            method: "get",
            dataType: "json",
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


//贫困村结对村属性

//function init_shuxing(shuxing,data){
//  var shuxing = $("#villageType");
//          $.ajax({
//          url: url + "fpzt/cNature/query", 
//          data:{},
//          beforeSend:function(request){
//                    request.setRequestHeader("Authorization",token);
//                    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
//              },
//          method: "get",
//          dataType: "json",
//          json: "callback",
//          jsonpCallback: 'jsonpCallback',
//          success: function(data){
//              if (data.code == 2000){                 
//                  showShuxingInfo(shuxing,data);                 
//              }            
//          }        
//  })
//}
//function showShuxingInfo(obj,data){
//   obj.empty();
//   var str = `<option value="">村属性</option>`;
//   var string = "";
//   for(let i = 0; i < data.data.length; i++){
//       str += `
//       <option value="${data.data[i].AAA102}">${data.data[i].AAA103}</option>
//   `;
//   }
//   obj.html(str);
//}

//初始渲染
  function showAllInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
              <th>序号</th>
              <th>贫困村名称</th>
              <th>贫困村所在地</th>
              <th>村属性</th>
              <th>结对数量</th>
              <th>是否结对</th>
             
          </tr>
        `;

          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
    var str1=`  
         <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAR009_C}</td>
              <td>西安市-${data.data.list[i].AAR009_X}-${data.data.list[i].AAR009_Z}</td>
              <td>${data.data.list[i].AAD004}</td>
              <td>${data.data.list[i].NUM}</td>`
              if(data.data.list[i].NUM==0){
                    str1+=`<td >否</td>`
                }else{
                    str1+=`<td >是</td>`
                }              
              
          str1 +=`</tr>`;
          
//<td><a href="#" style="background-color:#DE5347">详情</a></td>

           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }
let indexs=1;
let indexss=1;
  function page_init(index) {
  		indexs=index+1;
       if($('.btn_orange').hasClass("btn_select")){
       
          $.ajax({
                url:url + "fpzt/jdgl/cjd/query",
                type:"get",
                data:{"page_index": index+1,"page_size": 12,'jd':pair.val(),'aar040':201808,"aad004":shuxing.val(),
                "aar009_c":area.val(),"aar009_x":city.val(),"aar009_z":town.val(),"aar008":p_shi.val()},
                beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
            	},
                dataType:"json",
                success:function (data) {
                  if (data.code == 2000){
                    showAllInfo( index,table,data);    
                  }
                },
                complete:function(){
				     HideLoading();
				},
                error:function () {
                }
            })
        }else{
        	indexss=index+1;
             $.ajax({
                url:url + "fpzt/jdgl/hjd/query",
                type:"get",
                data:{"page_index":index+1,"page_size": 12,'jd':pair1.val(),'aar040':201808,
                 "aar009_z":town1.val(),"aar009_c":area1.val(),"aar009_x":city1.val(),'aar008':p_shi1.val()},
                 beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
            	},
                dataType:"json",
                success:function (data) {
                  if (data.code == 2000){
                    showAllInfo1( index,table,data);    
                  }
                },
                complete:function(){
				     HideLoading();
				},
                error:function () {
                }
            })
                         
         }
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
    page_init(page_index);      //第一页为0
}

$("body").on("click",".btn_select",function(){   
	table.empty()
        $.ajax({
            url: url + "fpzt/jdgl/cjd/query",
            data:{"page_index": 1,"page_size": 12,'jd':pair.val(),'aar040':201808,"aad004":shuxing.val(),
                "aar009_c":area.val(),"aar009_x":city.val(),"aar009_z":town.val(),"aar008":p_shi.val()},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
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
			              <th>贫困村名称</th>
			              <th>贫困村所在地</th>
			              <th>村属性</th>
			              <th>结对数量</th>
			              <th>是否结对</th>
			             
			          </tr>
					<tr><td colspan='6' style="font-size:30px;color:#767272;">查无数据</td></tr>`
					table.html(str)
					$("#total").empty();
				    $(".allPage").empty();
				}else if(data.code==1005){
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

/*贫困村结对导出*/
$("body").on("click",".dataImport1",function(){
	$.ajax({
        url: url + "fpztExport/excel/cjdgl/check",  
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",           
        success: function(data){
        if (data.code == 2000){
	        var k = [];
		    var i = 0;
	    	$(".active").each(function(){
				  k[i] = $(this).attr("sleep");
				  i++;
		   	})
	
			data={"page_index":1,"page_size": totle,'jd':pair.val(),'aar040':201808,"aad004":shuxing.val(),
			"aar009_c":area.val(),"aar009_x":city.val(),"aar009_z":town.val(),"aar008":p_shi.val()}
	
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
					let cc=url+"fpztExport/cjdEx?"+b;
					console.log(cc);
			        window.location.href=cc;	
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


$("body").on("click",".btn_select1",function(){
	table.empty()
       $(function(){
        $.ajax({
            url: url + "fpzt/jdgl/hjd/query",
            data:{"page_index":1,"page_size": 12,'jd':pair1.val(),'aar040':201808,'aar008':p_shi1.val(),
                 "aar009_z":town1.val(),"aar009_c":area1.val(),"aar009_x":city1.val()},
            method: "get",
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
            },
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showAllInfo1(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                }else if(data.code == 1009){
					var str=`<tr>
			          <th>序号</th>
			          <th>户主姓名</th>
			          <th>贫困户所在地</th>
			          <th>户属性</th>
			          <th>结对数量</th>
			          <th>是否结对</th>
			         </tr>
					<tr><td colspan='6' style="font-size:30px;color:#767272;">查无数据</td></tr>`
					table.html(str)
					$("#total").empty();
				    $(".allPage").empty();
				}else if(data.code==1005){
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
 })
/*贫困户结对导出*/
$("body").on("click",".dataImport2",function(){
	$.ajax({
        url: url + "fpztExport/excel/hjdgl/check",
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",           
        success: function(data){
        if (data.code == 2000){
	        var k = [];
		    var i = 0;
	    	$(".active").each(function(){
				  k[i] = $(this).attr("sleep");
				  i++;
		   	})
	
			data = {"page_index":1,"page_size": totle1,'jd':pair1.val(),'aar040':201808,'aar008':p_shi1.val(),
	                 "aar009_z":town1.val(),"aar009_c":area1.val(),"aar009_x":city1.val()}
	
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
					let cc=url+"fpztExport/hjdEx?"+b;
					console.log(cc);
			        window.location.href=cc;	
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

$("#pkc").on("click",(function(){
	table.empty()
	if(aa.aar008==610100000000){
        var data={"page_index": 1,"page_size": 12,'aar040':201808};
    }else if(aa.aar008=="619900000000"){
    		data={"page_index": 1,"page_size": 10,"aar040": 201808,"aar008":619900000000}
    }else if(aa.aar008.substring(6)=="000000"){
       var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_x':aa.aar008};
    }else if(aa.aar008.substring(9)=="000"){
        var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_z':aa.aar008};
    }
        $("#pkhjd").hide();
        $("#pkcjd").show();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(function(){
        $.ajax({
            url: url + "fpzt/jdgl/cjd/query",
            data:data,
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
            },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showAllInfo(0,table,data);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                    totle=data.data.total;
                    $('.btn_orange').addClass("btn_select");
                    $('.btn_orange').removeClass("btn_select1");
                    $('#dataImport').addClass("dataImport1");
                    $('#dataImport').removeClass("dataImport2");
                    showPage($(".searchPage"),data.data.total);
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
 })
)




$("#pkh").click(function(){
	table.empty()
	if(aa.aar008==610100000000){
        var data={"page_index": 1,"page_size": 12,'aar040':201808};
    }else if(aa.aar008=="619900000000"){
    		data={"page_index": 1,"page_size": 10,"aar040": 201808,"aar008":619900000000}
    }else if(aa.aar008.substring(6)=="000000"){
       var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_x':aa.aar008};
    }else if(aa.aar008.substring(9)=="000"){
        var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_z':aa.aar008};
    }
	$.ajax({
        url: url + "fpzt/jdgl/hjd/query",
        data:data,
        beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
            },
        method: "get",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showAllInfo1(0,table,data);              
                init_Shi1();
                page.html(Math.ceil(data.data.total/12));
                $("#total").html("总数："+data.data.total);
                totle1=data.data.total;
                $('.btn_orange').addClass("btn_select");
                $('.btn_orange').removeClass("btn_select1");
                $('#dataImport').addClass("dataImport2");
                $('#dataImport').removeClass("dataImport1");
                showPage($(".searchPage"),data.data.total);
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
		
	
        $("#pkcjd").hide();
        $("#pkhjd").show();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(function(){
        $.ajax({
            url: url + "fpzt/jdgl/hjd/query",
            data:data,
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
            },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showAllInfo1(0,table,data);    
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                    $('.btn_orange').addClass("btn_select1");
                    $('.btn_orange').removeClass("btn_select");
                    $('#dataImport').addClass("dataImport2");
                    $('#dataImport').removeClass("dataImport1");
                    showPage($(".searchPage"),data.data.total);
                }
            },
            complete:function(){
			     HideLoading();
			}
	    })
	  })
 })

//加载西安市
    function init_Shi1(){
        var p_shi=$("#p_shi1");
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
                    showShiInfo1(p_shi,data);
                    init_County1()
                }
            }
        })
    }
    function showShiInfo1(obj,data){
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
        	$("#p_shi1").empty().append("<option value='619900000000'>西咸新区</option>").attr("disabled","disabled");
        }
    }
	$("#p_shi1").change(function(){
	    var opt=$("#p_shi1");
	    var city = $("#country1");
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
	                     init_County1();
	                     //showTownInfo1();
                         //showVillageInfo1();
	                }
	            }
	    })
	});
//加载县
function init_County1(){
	var opt=$("#p_shi1");
    var city = $("#country1");
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
                    showCountyInfo1(city,data);
                }           
            }       
    	})
}
function showCountyInfo1(obj,data){
        obj.empty();
        var str = `<option value="">县（区）</option>`;
        var string = "";
        let arr=[];
        for(let i = 0; i < data.data.length; i++){
            str += `
             <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
         `;
            let obj={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
            arr.push(obj);
        }
        console.log(arr)
        obj.html(str);
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);
        for(let i=0;i<arr.length;i++){
            //console.log(arr[i].number+"---"+aa.aaa113);
            if(arr[i].number==aa.aar008 ||arr[i].number==aa.aaa113){
                // $("#county").empty();
                $("#country1").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
                $("#p_shi1").attr("disabled","disabled");
                var opt=$("#country1");
                var opt1 = $("#town1");
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
                            showTownInfo1(opt1,data);
                            page.html(data.data.total);

                        }
                    }

                })
            }
        }
    }

$("#country1").change(function(){
    var opt=$("#country1");
    var opt1 = $("#town1");
      
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
                    showTownInfo1(opt1,data);
                     page.html(data.data.total);
                }
            }
        
    })
});

function showTownInfo1(obj,data){
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
     // console.log(obj.val());
     }
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    // console.log(aa.aar008.substring(6));
    if(aa.aar008.substring(6)!="000000"){
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                // $("#county").empty();
                $("#town1").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
                var opt=$("#town1");
                var opt1 = $("#village1");
                $.ajax({
                    url: url + "district/village",
                    data:{"town":opt.val()},
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
                            var town1 = $("#town1").val();
                            var vill1 = $("#village1");
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
                                        showVillageInfo(vill1,data);
                                    }
                                }
                            })
                            showVillageInfo1(opt1,data);
                            page.html(data.data.total);
                        }
                    }

                })
            }
        }
    }
}

$("#town1").change(function(){
    var town1 = $("#town1").val();  
    var vill1 = $("#village1");
         $.ajax({
            url: url + "district/village", 
            data:{"town": town1},
            beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showVillageInfo1(vill1,data);
                }
            }
    })
});
function showVillageInfo1(obj,data){
     obj.empty();
     var str = `<option value="">村</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
    
     }
}
 function showAllInfo1(index,obj,data){
      obj.empty();
      var str = `
       <tr>
          <th>序号</th>
          <th>户主姓名</th>
          <th>贫困户所在地</th>
          <th>户属性</th>
          <th>结对数量</th>
          <th>是否结对</th>
         </tr>
        `;
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
    var str1=`  
         <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAC029}</td>
              <td>西安市-${data.data.list[i].AAR009_X}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_C}</td>
              <td>${data.data.list[i].AAC006}</td>
              <td>${data.data.list[i].NUM}</td>`
              if(data.data.list[i].NUM==0){
                    str1+=`<td >否</td>`
                }else{
                    str1+=`<td >是</td>`
                }
             str1 +=`</tr>`;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
}
 
function ShowLoading() {
	$(".spinner").show();
}
function HideLoading() {
    $(".spinner").hide();
}
 
})