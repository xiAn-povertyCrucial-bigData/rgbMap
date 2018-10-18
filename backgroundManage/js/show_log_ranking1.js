$(document).ready(function(){
	let token=$.cookie("token");
    var table = $("#formSubmit2");
    var shuxing = $("#villageType");
    var zcname = $("#zcname");
    var shuji = $("#shuji");
    var duizhang = $("#duizhang");
    var fuduizhang = $("#fuduizhang");
    var ganbu = $("#ganbu");
    var duiyuan = $("#duiyuan");
    var p_shi = $("#p_shi");
    var p_shi1 = $("#p_shi1");
    var city = $("#country");
    var city1 = $("#country1");
    var town = $("#town");
    var town1 = $("#township1");
    var area = $("#village");
    var area1 = $("#village1");
    var group = $("#group");
    var group1 = $("#group1");
    var xingming = $("#xingming");
    var danwei = $("#danwei")
    var start = $("#start")
    var end = $("#end")
    var start01 = $("#start1");
    var end01 = $("#end1");
    var page = $(".allPage");
    var str = `<option value="">县（区）</option>`;
    var str1 = `<option value="">乡（镇）</option>`;
    var str2 = `<option value="">村</option>`;
    city.html(str);
    city1.html(str);
    town.html(str1);
    town1.html(str1);
    area.html(str2);
    area1.html(str2);
    var zc = $("#zc");
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    if(aa.aar008==610100000000){
        var data={"page_index": 1,"page_size": 6,'aar040':201808};
    }else if(aa.aar008=="619900000000"){
    	var	data={"page_index": 1,"page_size": 6,"aar040": 201808,"aar008":619900000000}
    }else if(aa.aar008.substring(6)=="000000"){
        var data={"page_index": 1,"page_size": 6,'aar040':201808,'aar009_x':aa.aar008};
    }else if(aa.aar008.substring(9)=="000"){
        var data={"page_index": 1,"page_size": 6,'aar040':201808,'aar009_z':aa.aar008};
    }
        $.ajax({
            url: url + "fpzt/log/zclog/query",
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
                    //init_County(city,data);
                    init_Shi()
                    //init_County(city1,data);
                    //init_shuxing(shuxing,data)
                    page.html(Math.ceil(data.data.total/6));
                    $("#total").html("总数："+data.data.total);
                    $('.btn_orange').addClass("btn_select");
                    $('.btn_orange').removeClass("btn_select1");
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
var helplog=[];
  function showAllInfo(index,obj,data){
    obj.empty();

    for(let i = 0; i < data.data.list.length; i++ ){
	if(data.data.list[i].HELPLOG==null){
		console.log(111)
		helplog='';			
	}else{
		helplog=data.data.list[i].HELPLOG;
	}
    var str1=`
    		<ul rizhi_ul>
      			<li>
      				<div id="rizhi_li">
      					<h4>${data.data.list[i].AAB002}<span style="color: #f98803;">（${data.data.list[i].AAR009_C}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_X}）</span></h4>
      					<p>${helplog}</p>
      				<ul style='height:auto;'>`
      				for(let k = 0; k < data.data.list[i].IMAGEPATH.length; k++){
			    		 str1+=`<li style='float:left;'><img src="${data.data.list[i].IMAGEPATH[k]}" style="width: 200px;height: 130px;margin-right:20px;"/></li>`
			    	}
      		 str1+=`</ul>
      				</div>
      			</li>
      		</ul>
      		<hr />
      		<p style='margin-left:2%;'><span style="display: inline-block;"><img src="../images/icon_mobile.png"/></span>
      		<span style="display: inline-block;margin-left: 10px;"> ${data.data.list[i].HELPTIME}</span></p>
          	<hr />
      		`;
            obj.html(function (i, value) {
                return value + str1;
            });
		
    }
}

  function page_init(index) {
  	if($('.btn_orange').hasClass("btn_select")){
  		var start011 = start01.val().replace(/-/g,"");
 		var end011 = end01.val().replace(/-/g,"");
 		 if(start011 >= end011){
           end011="";
           end01.val("");
        }
        $.ajax({
                url:url + "fpzt/log/zclog/query",
                type:"get",
	                data:{"page_index": index+1,"page_size": 6,"aar009_z":town.val(),'aar008':p_shi.val(),
	           "aad004":shuxing.val(),"aar009_c":area.val(),"aar009_x":city.val(),'aab002':zcname.val(),
	            'aak031':duizhang.val(),'aak666':fuduizhang.val(),'aak032':shuji.val(),
                'aak777':ganbu.val(),'aak039':duiyuan.val(),'startTime':start011,'endTime':end011},
                dataType:"json",
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                          ShowLoading()
                      },
                success:function (data) {
                if (data.code == 2000){
	                      if($('.btn_orange').hasClass("btn_select")){
	                         showAllInfo( index,table,data);
	                      }else{
	                         showAllInfo1( index,table,data);
	                      }
                    }
                },
                complete:function(){
				     HideLoading();
				},
                error:function () {
                }
            })
        }else{
        	var start1 = start.val().replace(/-/g,"");
     		var end1 = end.val().replace(/-/g,"");
     		 if(start1 >= end1){
	           end1="";
	           end.val("");
	        }
        	 $.ajax({
            url: url + "fpzt/log/bflog/query",
            data:{"page_index": index+1,"page_size": 6,"aar009_x":city1.val(),"aar009_z":town1.val(),"aar009_c":area1.val(),
            'aar008':p_shi1.val(),'aab002':xingming.val(),'aar020':start1,'aar021':end1},
            method: "get",
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
              },
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showAllInfo1(index,table,data);
                }
            },
            complete:function(){
				     HideLoading();
				}

    		})

        }

    }


function showPage(obj,data){
 $("#Pagination").pagination(data,{
             callback:PageCallback,         //pageCallback() 为翻页调用函数
             items_per_page:6,                //每页显示条目数
             num_display_entries: 4,                //连续分页显示分页条目数
             num_edge_entries: 1          //两侧显示的首尾分页的条目数
        });


}

    //ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
 //   console.log('das');
    page_init(page_index);      //第一页为0
}

//驻村日志
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
//驻村日志 村属性
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

$("body").on("click",".btn_select",function(){
		var start011 = start01.val().replace(/-/g,"");
 		var end011 = end01.val().replace(/-/g,"");
 		 if(start011 >= end011){
           end011="";
           end01.val("");
        }
        $.ajax({
            url: url + "fpzt/log/zclog/query",
            data:{"page_index": 1,"page_size": 6,"aad004":shuxing.val(),"aar009_x":city.val(),"aar009_c":area.val(),"aar009_z":town.val(),
            'aar008':p_shi.val(),'aak031':duizhang.val(),'aak666':fuduizhang.val(),'aak032':shuji.val(),'aab002':zcname.val(),
            'aak777':ganbu.val(),'aak039':duiyuan.val(),'startTime':start011,'endTime':end011},
            method: "get",
            beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	              ShowLoading()
	          },
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showAllInfo(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                    // init_County();
                    page.html(Math.ceil(data.data.total/6));
                    $("#total").html("总数："+data.data.total);
                }else if(data.code == 1009){
			var str=`<div align="center" style="margin-top:40px;font-size:32px;color:#767272;">查无数据</div>`
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


$("body").on("click",".btn_select1",function(){
		var start1 = start.val().replace(/-/g,"");
        var end1 = end.val().replace(/-/g,"");
         if(start1 >= end1){
           end1="";
           end.val("");
        }
       $(function(){
        $.ajax({
            url: url + "fpzt/log/bflog/query",
            data:{"page_index": 1,"page_size": 6,"aar009_x":city1.val(),"aar009_z":town1.val(),"aar009_c":area1.val(),
            'aar008':p_shi1.val(),'aab002':xingming.val(),'aar020':start1,'aar021':end1},
            method: "get",
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading()
              },
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showAllInfo1(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                    // init_County();
                    page.html(Math.ceil(data.data.total/6));
                    $("#total").html("总数："+data.data.total);
                }else if(data.code == 1009){
			var str=`<div align="center" style="margin-top:40px;font-size:32px;color:#767272;">查无数据</div>`
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


$("#zhucun").on("click",(function(){
	if(aa.aar008==610100000000){
        var data={"page_index": 1,"page_size": 6,'aar040':201808};
    }else if(aa.aar008=="619900000000"){
    	var	data={"page_index": 1,"page_size": 6,"aar040": 201808,"aar008":619900000000}
    }else if(aa.aar008.substring(6)=="000000"){
       var data={"page_index": 1,"page_size": 6,'aar040':201808,'aar009_x':aa.aar008};
    }else if(aa.aar008.substring(9)=="000"){
        var data={"page_index": 1,"page_size": 6,'aar040':201808,'aar009_z':aa.aar008};
    }
        $("#zc").show();
        $(".bf").hide();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(function(){
        $.ajax({
            url: url + "fpzt/log/zclog/query",
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
                    page.html(Math.ceil(data.data.total/6));
                    $("#total").html("总数："+data.data.total);
                    $('.btn_orange').addClass("btn_select");
                    $('.btn_orange').removeClass("btn_select1");
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

$("#bangfu").click(function(){
        $("#zc").hide();
        $(".bf").show();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
		if(aa.aar008==610100000000){
	        var data={"page_index": 1,"page_size": 6,'aar040':201808};
	    }else if(aa.aar008=="619900000000"){
	    	var	data={"page_index": 1,"page_size": 6,"aar040": 201808,"aar008":619900000000}
	    }else if(aa.aar008.substring(6)=="000000"){
	        var data={"page_index": 1,"page_size": 6,'aar040':201808,'aar009_x':aa.aar008};
	    }else if(aa.aar008.substring(9)=="000"){
	        var data={"page_index": 1,"page_size": 6,'aar040':201808,'aar009_z':aa.aar008};
	    }
        $.ajax({
            url: url + "fpzt/log/bflog/query",
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
					init_Shi1()
                    //init_County1(city1,data);
                    page.html(Math.ceil(data.data.total/6));
                    $("#total").html("总数："+data.data.total);
                    $('.btn_orange').addClass("btn_select1");
                    $('.btn_orange').removeClass("btn_select");
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
var zhucunlog=[];
function showAllInfo1(index,obj,data){
    obj.empty();
    for(let i = 0; i < data.data.list.length; i++ ){
	if(data.data.list[i].HELPLOG==null){
		zhucunlog='';			
	}else{
		zhucunlog=data.data.list[i].HELPLOG;
	}
    var str1=`
    		<ul rizhi_ul>
      			<li>
      				<div id="rizhi_li">
      					<h4>${data.data.list[i].AAB002}<span style="color: #f98803;">（${data.data.list[i].AAR009_C}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_X}）</span></h4>
      					<p>${zhucunlog}</p>
      				<ul>`
      				for(let k = 0; k < data.data.list[i].IMAGEPATH.length; k++){
			    		 str1+=`<li ><img src="${data.data.list[i].IMAGEPATH[k]}" style="width: 200px;height: 130px;margin-right:20px;float:left;"/></li>`
			    	}

      		 str1+=`</ul>
      				</div>
      			</li>
      			<hr />
      		</ul>
      		<p style='margin-left:2%;border-bottom: 1px solid #ddd;'><span style="display: inline-block;"><img src="../images/icon_mobile.png"/></span>
      		<span style="display: inline-block;margin-left: 10px;"> ${data.data.list[i].HELPTIME}</span></p>
            `;
            obj.html(function (i, value) {
                return value + str1;
            });

    }
  }

//帮扶加载西安市
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
                var opt1 = $("#township1");
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
    var opt1 = $("#township1");
      
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
                var opt=$("#township1");
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

$("#township1").change(function(){
    var town1 = $("#township1").val();  
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

function ShowLoading() {
	$(".spinner").show();
}
function HideLoading() {
    $(".spinner").hide();
}

})