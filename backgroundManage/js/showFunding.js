$(document).ready(function(){
   //  var url = "http://192.168.1.135:8080/";
   	 let token=$.cookie("token");
     var formInfos = $('#formSubmit2')
     var page = $('.allPage');
     var totle;
     var datas={};
     let tokenCon=$.cookie("loginMessage");
     let aa=JSON.parse(tokenCon);
    if(aa.aar008=="610100000000"){
        datas={"page_index": 1,"page_size": 12,"aar040": 201808}
        console.log(datas)
    }else if(aa.aar008=="619900000000"){
    	datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aaa001":619900000000}
        console.log(datas)
    }else if(aa.aar008.substring(6)=='000000'){
        datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":aa.aar008}
        console.log(datas)
    }else{
    	datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aar002":aa.aar008}
    }
     $.ajax({
         url: url + "pkc/query",
         data:datas,
         beforeSend:function(request){
             request.setRequestHeader("Authorization",token);
             request.setRequestHeader("X-Requested-With","XMLHttpRequest");
             ShowLoading();
         },
         method: "post",
         dataType: "json",
         json: "callback",
         jsonpCallback: 'jsonpCallback',
         success: function(data){
             if (data.code == 2000){
                 showAllFundingInfo(0, formInfos,data);
                 showPage($(".searchPage"),data.data.total);
                 totle=data.data.total;
                 init_Shi()
                 //init_County();
                 page.html(Math.ceil(data.data.total/12));
                 $("#total").html('总贫困数：'+data.data.total);
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

function init_County(){
    var opt=$("#p_shi");
    var county = $("#p_qv");
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


function showCountyInfo(obj,data){
     obj.empty();
     var opt = $("#p_cun");
     var opt1 = $("#p_x");
     let arr=[];
     var str1 = `<option value="">乡（镇）</option>`;
     var str2 = `<option value="">村</option>`
     opt1.html(str1);
     opt.html(str2);
     var str = `<option value="">县（区）</option>`;
     var string = "";
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
            $("#p_qv").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            $("#p_shi").attr("disabled","disabled");
            var opt=$("#p_qv");
            var opt1 = $("#p_x");
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
//          $.ajax({
//              url: url + "pkc/query",
//              data:{"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":opt.val(),"aar002":$('#p_x').val()},
//              beforeSend:function(request){
//                  request.setRequestHeader("Authorization",token);
//                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
//              },
//              method: "post",
//              dataType: "json",
//              json: "callback",
//              jsonpCallback: 'jsonpCallback',
//              success: function(data){
//                  if (data.code == 2000){
//                      console.log("ok");
//                      showAllFundingInfo(0, formInfos,data);
//                      showPage($(".searchPage"),data.data.total);
//                      totle=data.data.total;
//                      page.html(Math.ceil(data.data.total/12));
//                      $("#total").html('总贫困数：'+data.data.total);
//                  }else if(data.code==1005){
//                      alert(data.message)
//                  }else if(data.code==1009){
//                      alert(data.message)
//                  }else if(data.code==4000){
//                      alert(data.message)
//                  }
//              }
//          })
        }
    }
}

$("#p_qv").change(function(){
    var opt=$("#p_qv");
    var opt1 = $("#p_x");
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
            }

    })
});

function showTownInfo(obj,data){
     obj.empty();
     let arr=[];
     let p_qv=$("#p_qv").val();  //区
     let p_xiang=$("#p_x").val();  //乡
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
                $("#p_x").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
            }
        }
        let p_qv=$("#p_qv").val();  //区
        let p_xiang=$("#p_x").val();  //乡
        $.ajax({
            url: url + "pkc/query",
            data:{"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":p_qv,"aar002":p_xiang},
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "post",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showAllFundingInfo(0, formInfos,data);
                    showPage($(".searchPage"),data.data.total);
                    totle=data.data.total;
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html('总贫困数：'+data.data.total);
                }else if(data.code==1005){
                    alert(data.message)
                }else if(data.code==1009){
                    alert(data.message)
                }else if(data.code==4000){
                    alert(data.message)
                }

            }

        })
    }
}



  function showAllFundingInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
              <th>序号</th>
              <th>贫困村编号</th>
              <th>县</th>
              <th>乡(镇)</th>
              <th>村</th>
              <th>负责人</th>
			  <th>村办公电话</th>
			  <th>村属性</th>
			  <th>是否出列</th>
			 <!-- <th>总户数</th>
			  <th>总人口数</th>
			  <th>自然村数</th>
			  <th>贫困户数</th>
			  <th>贫困人口数</th>
			  <th>低保人口数</th>
			  <th>低保户数</th>
			  <th>五保人口数</th>
			  <th>五保户数</th>
			  <th>少数民族人口数</th>
			  <th>妇女人口数</th>
			  <th>残疾人口数</th>
			  <th>外出务工人数</th>-->
              <th style="width: 200px;">操作</th>
          </tr>`;
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){

    var str1=`  
     <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAD001}</td>
              <td>${data.data.list[i].AAR009}</td>
              <td>${data.data.list[i].AAR001_X}</td>
              <td>${data.data.list[i].AAR001_C}</td>
              <td>${data.data.list[i].AAR011}</td>
              <td>${data.data.list[i].AAR012}</td>
			  <td>${data.data.list[i].AAD004}</td>
			  <td>${data.data.list[i].AAD100}</td>
              <td>
                  <a href="showDetailsFunding.html?value=${data.data.list[i].AAD001}&time=${$('#p_year').val()}">详情</a>
                  <a href="reviseFunding.html?value=${data.data.list[i].AAD001}&time=${$('#p_year').val()}">修改</a>
              </td>
          </tr>`;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }

var indexs = 1;
 function page_init(index) {
      indexs = index + 1;
            var p_year=$("#p_year").val();
            //   var p_number=$("#p_number").val();
            var p_shuxing=$("#p_shuxing").val();
            //   var p_status=$("#p_status").val();  //状态
            var p_ch=$("#p_ch").val(); //是否出列
            var p_xiang=$("#p_x").val();  //乡
            var p_qv=$("#p_qv").val();  //区

            var page = $('.allPage');
            $.ajax({
                    url:url + "pkc/query",
                    type:"post",
                    data:{"page_index": index+1,"page_size": 12,
                "aar040":p_year,"aad004":p_shuxing, "aar001":p_qv,"aar002":p_xiang,"aad100":p_ch},
                beforeSend:function(request){
	                  request.setRequestHeader("Authorization",token);
	                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	                  ShowLoading();
	            },
                    dataType:"json",
                    success:function (data) {
                    if (data.code == 2000){
                                console.log("ok");
                                showAllFundingInfo( index,formInfos,data);  
                                 //  page.html(Math.ceil(data.data.total/12));
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
             num_edge_entries:   1          //两侧显示的首尾分页的条目数
       });
}

//ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
    page_init(page_index);      //第一页为0
}

       $(".btn_orange1").on("click",function(){
                var p_name=$("#p_name").val();
                if(p_name==""||p_name==null){
                    p_name=null;
                }
                var p_year=$("#p_year").val();
                var p_shuxing=$("#p_shuxing").val();
                var p_ch=$("#p_ch").val(); //是否出列
                var p_xiang=$("#p_x").val();  //乡
                var p_qv=$("#p_qv").val();  //区
                var data_ = {"page_index": 1,"page_size": 12,
                "aar040":p_year,"aad004":p_shuxing,'aaa001':$('#p_shi').val(), "aar001":p_qv,"aar002":p_xiang,"aad100":p_ch};
                $.ajax({
                        url:url + "pkc/query",
                        type:"post",
                        data:data_,
                        beforeSend:function(request){
			                  request.setRequestHeader("Authorization",token);
			                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
			                  ShowLoading();
			            },
                        dataType:"json",
                        success:function (data) {
                        if (data.code == 2000){
                               
                                showAllFundingInfo(0,formInfos,data);
                                showPage($(".searchPage"),data.data.total);
                                page.html(Math.ceil(data.data.total/12));
                                $("#total").html("总数："+data.data.total);
                        }else if(data.code == 1005){
								var str=`<tr>
					              <th>序号</th>
					              <th>贫困村编号</th>
					              <th>县</th>
					              <th>乡(镇)</th>
					              <th>村</th>
					              <th>负责人</th>
								  <th>村办公电话</th>
								  <th>村属性</th>
								  <th>是否出列</th>
								  <th>总户数</th>
								  <th>总人口数</th>
								  <th>自然村数</th>
								  <th>贫困户数</th>
								  <th>贫困人口数</th>
								  <th>低保人口数</th>
								  <th>低保户数</th>
								  <th>五保人口数</th>
								  <th>五保户数</th>
								  <th>少数民族人口数</th>
								  <th>妇女人口数</th>
								  <th>残疾人口数</th>
								  <th>外出务工人数</th>
					              <th style="width: 200px;">操作</th>
					          </tr>
								<tr><td colspan='23' style="font-size:30px;color:#767272;">查无数据</td></tr>`
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
                });

                
/*导出*/
$("body").on("click","#dataImport",function(){
	$.ajax({
        url: url + "pkc/export/exist/query",  
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",           
        success: function(data){
        if (data.code == 2000){
        var p_name=$("#p_name").val();
                if(p_name==""||p_name==null){
                    p_name=null;
                }
                var p_year=$("#p_year").val();
                var p_shuxing=$("#p_shuxing").val();
                var p_ch=$("#p_ch").val(); //是否出列
                var p_xiang=$("#p_x").val();  //乡
                var p_qv=$("#p_qv").val();  //区
                var data = {"page_index": 1,"page_size": totle,
                "aar040":p_year,"aad004":p_shuxing, "aar001":p_qv,"aar002":p_xiang,"aad100":p_ch};

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
			let cc=url+"pkc/export/query?"+b;
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
