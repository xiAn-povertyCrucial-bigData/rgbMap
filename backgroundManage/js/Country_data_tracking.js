$(document).ready(function(){
	var theRequest = new Object();
    var url1=window.location.search; //获取url中"?"符后的字串
    if(url1.indexOf("?")!=-1) {
        var str = url1.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
	let token=$.cookie("token");
	let tokenCon=$.cookie("loginMessage");    
	let aa=JSON.parse(tokenCon);
	let zhanghao=aa.aar008;
	console.log(zhanghao)
	//渲染
	var table=$('#formSubmit00');
	var page = $(".allPage");
	let indexs=1;
	var totle;
	let updateType=$("#updateType");
	let typeShip=$("#typeShip");
	var p_shi=$("#p_shi");  //xianshi
    var p_qv=$("#p_qv");  //县区
    var datas={}
    var start=$('#start');
    var end=$('#end');
	updateType.change(function(){
        tiantype();
    })
	if(aa.aar008=="610100000000"){
        datas={"page_index": 1,"page_size": 12}
        console.log(datas)
    }else if(aa.aar008=="619900000000"){
    	datas={"page_index": 1,"page_size": 12,'aae000':619900000000}
        console.log(datas)
    }else{
        datas={"page_index": 1,"page_size": 12,"aae001":zhanghao}
        console.log(datas)
    }
	$.ajax({
            url: url + "fpdx/display/query",
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
                    showAllInfo(0,table,data);
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                    totle=data.data.total;
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

	function showAllInfo(index,obj,data){
		obj.empty();
		var str=`
				 <tr>
		              <th>序号</th>
		              <th>县名</th>
		              <th>操作人</th>
		              <th>时间</th>
		              <th>变更项目</th>
		              <th>原有值</th>
		              <th>变更值</th>
		          </tr>
				`
		obj.html(str);

	for(let i = 0; i < data.data.list.length; i++ ){
	
	var str1=`
	     <tr>
	          <td>${index*12+i+1}</td>
	          <td>${data.data.list[i].CITY_NAME}</td>
	          <td>${data.data.list[i].OPERATE_NAME}</td>
	          <td>${data.data.list[i].MODIFY_TIME}</td>
	          <td>${data.data.list[i].REMARKS}</td>
	          <td>${data.data.list[i].MODIFY_BEFORE}</td>
	          <td>${data.data.list[i].MODIFY_AFTER}</td>
	      </tr>
	      `;
	      obj.html(function (i, value) {
	            return value + str1;
	        });
	      $("td").each(function(){
	          if( $(this).text() == 'null'){
	               $(this).text('');
	              }
	          })
	   }
	}

	/*修改类别函数*/
        function tiantype(){
            var type=$("#updateType").val();
            $.ajax({
                url: url+"fpdx/dataPlay/query",
                beforeSend:function(request){
                    request.setRequestHeader("Authorization",token);
                    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
                data:{"flag":type},
                async:false,
                method:"post",
                type:"json",
                success:function(data){
                    if(data.code === 2000){
                        showType(typeShip,data.data);
                    }
                }
            })
        }
        function showType(obj,data){
            obj.empty();
            let str=`<option value="">--请选择--</option>`;
            for(let i in data){
                str+=`
                 <option value="${data[i].COLUMN_NAME}">${data[i].COMMENTS}</option>
                `;
            }
            obj.html(function(i,value){
                return value+str;
            })
        }
        
//查询
	$('body').on('click','.btn_blue',function(){		  
		var start2 = start.val().replace(/-/g,"");//开始结束时间的截取数字
        var end2 = end.val().replace(/-/g,"");
        if(start2 >= end2){
           end2="";
           end.val("");
        }
		$.ajax({
        url: url + "fpdx/display/query",
        data:{"page_index": 1,"page_size": 12,'aae000':p_shi.val(),'aae001':p_qv.val(),'filed':typeShip.val(),'startTime':start2,'endTime':end2},
        method: "get",
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              ShowLoading()
          },
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showAllInfo(0,table,data);
                page.html(Math.ceil(data.data.total/12));
                $("#total").html("总数："+data.data.total);
                showPage($(".searchPage"),data.data.total);
            }else if(data.code == 1009){
				var str=`<tr>
		              <th>序号</th>
		              <th>县名</th>
		              <th>操作人</th>
		              <th>时间</th>
		              <th>变更项目</th>
		              <th>原有值</th>
		              <th>变更值</th>
		          </tr>
				<tr><td colspan='7' style="font-size:30px;color:#767272;">查无数据</td></tr>`
				table.html(str)
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

  	function page_init(index) {
  		var start2 = start.val().replace(/-/g,"");//开始结束时间的截取数字
        var end2 = end.val().replace(/-/g,"");
        if(start2 >= end2){
           end2="";
           end.val("");
        }
		indexs=index+1;
	        $.ajax({
	            url:url + "fpdx/display/query",
			    type:"get",
			    data:{"page_index": index+1,"page_size": 12,'aae000':p_shi.val(),'aae001':p_qv.val(),'filed':typeShip.val(),'startTime':start2,'endTime':end2},
			    beforeSend:function(request){
			          request.setRequestHeader("Authorization",token);
			          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
			          ShowLoading();
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
	//动画加载
	function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}

//导出
$("body").on("click",".marginR",function(){
	var start2 = start.val().replace(/-/g,"");//开始结束时间的截取数字
    var end2 = end.val().replace(/-/g,"");
    if(start2 >= end2){
       end2="";
       end.val("");
    }
	$.ajax({
        url: url + "fpdx/excel/displayEx/check",
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",
        success: function(data){
        if (data.code == 2000){
		data = {"page_index": 1,"page_size": totle,'aae000':p_shi.val(),'aae001':p_qv.val(),'filed':typeShip.val(),'startTime':start2,'endTime':end2}
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
						let cc=url+"fpdx/displayEx/query?"+b;
						console.log(cc);
			      window.location.href=cc;
      			}else if(data.code==1005){
				alert(data.message)
		    	}else if(data.code==1009){
				alert(data.message)
		    	}else if(data.code==4000){
				alert(data.message)
		    	}else{
	            		alert("导出失败");
	        	}
	        }
	    })
	})
 
//加载西安市
init_Shi();
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
//      if(aa.aar008=="610100000000"){
//	        datas={"page_index": 1,"page_size": 12,'aae001':610100000000}
//	        console.log(datas)
//	    }else if(aa.aar008=="619900000000"){
//	    	datas={"page_index": 1,"page_size": 12,'aae001':619900000000}
//	        console.log(datas)
//	    }else{
//	        datas={"page_index": 1,"page_size": 12,"aae001":zhanghao}
//	        console.log(datas)
//	    }
        if(aa.aar008==619900000000){
        	$("#p_shi").empty().append("<option value='619900000000'>西咸新区</option>").attr("disabled","disabled");
        }
    }
	$("#p_shi").change(function(){
	    var opt=$("#p_shi");
	    var opt1 = $("#p_qv");
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
//加载区县
    function init_County(){
    	var p_shi=$("#p_shi");
        var p_qv=$("#p_qv");
        $.ajax({
            url: url + "district/county",
            data:{"aar001":p_shi.val()},
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
                    showCountyInfo(p_qv,data);
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
        obj.html(str);
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                $("#p_qv").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            	$('#p_shi').attr('disabled','disabled')
            }
        }
    } 

})