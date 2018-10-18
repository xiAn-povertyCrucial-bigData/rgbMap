$(document).ready(function(){
	let token=$.cookie("token");
    var table = $("#table");
    var name = $("#bfname");
    var company = $("#bfcompany");
    var bfphone = $("#bfphone");
    var id1 = $("#id1");
    var city = $("#city");
    var area = $("#area");
    var town =$("#town");   
    var p_shi =$("#p_shi");   
    var group =$("#group");
    var start = $("#start");
    var end = $("#end");
    var page = $(".allPage");
    var str = `<option value="">县（区）</option>`;
    city.html(str);
    var str1 = `<option value="">乡（镇）</option>`;
    area.html(str1);
    var str2 = `<option value="">村</option>`;
    town.html(str2);
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
	var totle;
    
    if(aa.aar008==610100000000){
        var data={"page_index": 1,"page_size": 12,'aar040':201808};
    }else if(aa.aar008=="619900000000"){
    		data={"page_index": 1,"page_size": 10,"aar040": 201808,"aar008":619900000000}
    }else if(aa.aar008.substring(6)=="000000"){
       var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_x':aa.aar008};
    }else if(aa.aar008.substring(9)=="000"){
        var data={"page_index": 1,"page_size": 12,'aar040':201808,'aar009_z':aa.aar008};
    }
    $(function(){
        $.ajax({
            url: url + "fpzt/bfzrr/query",
            data:data,
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
                    showAllInfo(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                    totle=data.data.total;
                    init_Shi();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
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
	    var city = $("#city");
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
    var city = $("#city");
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
                $("#city").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
                $("#p_shi").attr("disabled","disabled");
                var opt=$("#city");
                var opt1 = $("#area");
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

$("#city").change(function(){
    var opt=$("#city");
    var opt1 = $("#area");
      
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
                $("#area").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
                var opt=$("#area");
                var opt1 = $("#town");
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
                            var town = $("#area").val();
                            var vill = $("#town");
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

$("#area").change(function(){
    var town = $("#area").val();
  
    var vill = $("#town");
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
                   // showPage($(".searchPage"),data.data.total);
                   // init_County();
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



  function showAllInfo(index,obj,data){
      obj.empty();
      var str = `
      <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>派出单位</th>           
            <th>派出单位职务</th>
            <th>联系方式</th>
            <th>帮扶对象姓名</th>
            <th>行政区划</th>
            <th>操作</th>
        </tr>
        `;

   for(let i = 0; i < data.data.list.length; i++ ){
     str +=`  
     <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAB002}</td>
              <td>${data.data.list[i].AAB003}</td>
              <td>${data.data.list[i].AAP001}</td>
              <td>${data.data.list[i].AAK888}</td>
              <td>${data.data.list[i].AAR012}</td>
              <td>${data.data.list[i].AAC029}</td>
              <td>${data.data.list[i].AAR009_X}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_C}</td>
              <td>
                  <a href="show_member_detail_inform.html?aak110=${data.data.list[i].AAK110}&aac001=${data.data.list[i].AAC001}&aac080=${data.data.list[i].AAC080}">详情</a>
                  <a href="updateMember.html?aak110=${data.data.list[i].AAK110}&aac001=${data.data.list[i].AAC001}&aaa011_x=${data.data.list[i].AAA011_X}&aaa011_z=${data.data.list[i].AAA011_Z}&aaa011_c=${data.data.list[i].AAA011_C}&aac080=${data.data.list[i].AAC080}">修改</a>
              	  <a href="#" aak110='${data.data.list[i].AAK110}' aac001='${data.data.list[i].AAC001}' aac080='${data.data.list[i].AAC080}' class='shanchu'>删除</a>
              </td>
          </tr>`;
 
   }
        obj.html(str);  
	$("td").each(function(){	
	    if( $(this).text() == "null"){
		
	  	  $(this).text(" ");

	    }
		
	})   
  }

//删除帮扶责任人
	var tt;
	$('body').on('click','.shanchu',function(){
		var aak110=$(this).attr("aak110");
		var aac001=$(this).attr("aac001");
		var aac080=$(this).attr("aac080");
		tt=$(this);
		var sub;
		sub={"aak110":aak110,"aac001":aac001,'aac080':aac080}
		del();
		function del(){
			if( confirm("确认删除吗?")){				
				tt.parent('td').parent('tr').remove();
				
		   	$.ajax({
	            url:url+"fpzt/delZRR/detail",
	            method: "get",
		        dataType: "json",
		        json: "callback",
		        jsonpCallback: 'jsonpCallback',            
	            data:sub,
	            beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	          	},           
	            success:function(data){
			     if (data.code == 2000){
			            alert ("删除成功");		            
		            }else if(data.code==1005){
				alert(data.message)
			    }else if(data.code==1009){
				alert(data.message)
			    }else if(data.code==4000){
				alert(data.message)
			    }else{
		            	alert("删除失败");
		            }	
	            }
	        })	   	
	   	}else 
	   		return false;
		}
	})

let indexs=1;
  function page_init(index) {
       var start2 = start.val().replace(/-/g,"");
        var end2 = end.val().replace(/-/g,"");
        if(start2 >= end2){
           end2="";
           end.val("");
        }
        indexs=index+1;
   
        $.ajax({
                url:url + "fpzt/bfzrr/query",
                type:"get",
                data:{"page_index": index+1,"page_size": 12,"aab002":name.val(),"aab004":id1.val(),
                'aar040':201808,"aar008":p_shi.val(),'aar012':bfphone.val(),"aap001":company.val(),
                "aar009_x":city.val(),"aar009_z":area.val(),"aar009_c":town.val(),"aad042":group.val(),"aar020":start2,"aar021":end2},
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

//查询
$("body").on("click","#btn_orange",function(){
	$("#table").empty();
        var start1 = start.val().replace(/-/g,"");
        var end1 = end.val().replace(/-/g,"");
        if(start1 >= end1){
           end1="";
           end.val("");
        }
       $(function(){
        $.ajax({
            url: url + "fpzt/bfzrr/query",
            data:{"page_index": 1,"page_size": 12,"aab002":name.val(),"aab004":id1.val(),'aar040':201808,"aap001":company.val(),'aar012':bfphone.val(),
            "aar008":p_shi.val(),"aar009_x":city.val(),"aar009_z":area.val(),"aar009_c":town.val(),"aad042":group.val(),"aar020":start1,"aar021":end1},
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
                    showAllInfo(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                }else if(data.code == 1009){
					var str=`<tr>
			            <th>序号</th>
			            <th>姓名</th>
			            <th>性别</th>
			            <th>证件号码</th>
			            <th>帮扶对象姓名</th>
			            <th>职务级别</th>
			            <th>联系方式</th>
			            <th>行政区划</th>
			            <th>操作</th>
			        </tr>
					<tr><td colspan='9' style="font-size:30px;color:#767272;">查无数据</td></tr>`
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
        url: url + "fpztExport/excel/bfzrrEx/check", 
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
	
				data = {"page_index": 1,"page_size":totle,"aab002":name.val(),"aab004":id1.val(),'aar040':201808,"aap001":company.val(),'aar012':bfphone.val(),
	            "aar008":p_shi.val(),"aar009_x":city.val(),"aar009_z":area.val(),"aar009_c":town.val(),"aad042":group.val(),"aar020":start1,"aar021":end1}
	
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
							let cc=url+"fpztExport/bfzrrEx?"+b;
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

	function ShowLoading() {
    	$(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
})