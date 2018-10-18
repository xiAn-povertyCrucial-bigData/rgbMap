$(document).ready(function(){
	let token=$.cookie("token");
    var table = $("#table");
    var shuji = $("#shuji");
    var company = $("#company");
    var dianhua = $("#dianhua");
    var zcname = $("#zcname");
    var zcphone = $("#zcphone");
    var shuxing = $("#shuxing");
    var p_shi =$("#p_shi");
    var city = $("#county");
    var area = $("#township");
    var town =$("#village");
    var group =$("#group");
    var duizhang = $("#duizhang");
    var page = $(".allPage");
    var str = `<option value="">县（区）</option>`;
    city.html(str);
    var str1 = `<option value="">乡（镇）</option>`;
    area.html(str1);
    var str2 = `<option value="">村</option>`;
    town.html(str2);
//  var str3 = `<option value="">--请选择--</option>`;
//  shuji.html(str3);
//  duizhang.html(str3);
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
	var totle;
    function ShowLoading() {
        $(".spinner").show();
    }
    function HideLoading() {
        $(".spinner").hide();
    }
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
            url: url + "fpzt/zcgzd/query",
            data:data,
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading();
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
                    console.log(totle)
                    init_Shi();
                    //init_County(city,data);
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
	    var city = $("#county");
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
                    showCountyInfo( city,data);
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
        console.log(arr[i].number+"---"+aa.aaa113);
        if(arr[i].number==aa.aar008 ||arr[i].number==aa.aaa113){
            // $("#county").empty();
            $("#county").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            $("#p_shi").attr("disabled","disabled");
            var opt=$("#county");
            var opt1 = $("#township");
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
                    // console.log('111');
                }

            })
        }
    }
}

$("#county").change(function(){
    var opt=$("#county");
    var opt1 = $("#township");
        //console.log("111111111111");
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
      obj.html(str);
         let obj2={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
         arr.push(obj2);
     // console.log(obj.val());
     }
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    // console.log(aa.aar008.substring(6));
    if(aa.aar008.substring(6)!="000000"){
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                // $("#county").empty();
                $("#township").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
                var opt=$("#township");
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
                            var town = $("#township").val();
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


$("#township").change(function(){
    var town = $("#township").val();

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


  function showAllInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
            <th>序号</th>
            <th>贫困村名称</th>
            <th>贫困村所在地</th>
            <th>村属性</th>
            <th>村负责人</th>
            <th>村办公电话</th>
            <th>是否已筛选</th>
            <th>操作</th>
        </tr>
        `;
   for(let i = 0; i < data.data.list.length; i++ ){
   	//alert("12432")
     str +=`
     <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAR009_C}</td>
              <td>${data.data.list[i].AAR009_X}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_C}</td>
              <td>${data.data.list[i].AAD004}</td>
              <td>${data.data.list[i].AAR011}</td>
              <td>${data.data.list[i].AAR012}</td>
              <td>${data.data.list[i].AAR000}</td>
              <td>
                  <a href="show_village_working_team_detail.html?value=${data.data.list[i].AAA011}&value1=${data.data.list[i].AAR009_X}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_C}">详情</a>
              </td>
          </tr>`;
   }
        obj.html(str);
  }

  let indexs=1;
  function page_init(index) {
     	indexs=index+1;
        $.ajax({
                url:url + "fpzt/zcgzd/query",
                type:"get",
                data:{"page_index": index+1,"page_size": 12,"aap001":company.val(),'aar012':dianhua.val(),
                'aad004':shuxing.val(),'aab002':zcname.val(),'phone':zcphone.val(),"aar008":p_shi.val(),
                "aar009_x":city.val(),"aar009_z":area.val(),"aar009_c":town.val(),"aak032":shuji.val(),'aak039':duizhang.val()},
                dataType:"json",
                beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading();
              },
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
 //   console.log('das');
    page_init(page_index);      //第一页为0
}


$("body").on("click","#btn_orange",function(){
	$("#table").empty();
    var company = $("#company");
    var city = $("#county").val();
    var area = $("#township");
    var town =$("#village");
    var shuji =$("#shuji");
    var duizhang = $("#duizhang");
    var dianhua = $("#dianhua");
    var shuxing = $("#shuxing");
        $.ajax({
            url: url + "fpzt/zcgzd/query",
            data:{"page_index": 1,"page_size": 12,'aak032':shuji.val(),'aak039':duizhang.val(),
            "aap001":company.val(),'aab002':zcname.val(),'phone':zcphone.val(),"aar008":p_shi.val(),
            "aar009_x":city,"aar009_z":area.val(),"aar009_c":town.val(),'aar012':dianhua.val(),'aad004':shuxing.val()},
            method: "get",
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading();
              },
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                   // console.log("ok");
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
			            <th>村负责人</th>
			            <th>村办公电话</th>
			            <th>是否已筛选</th>
			            <th>操作</th>
			        </tr>
					<tr><td colspan='8' style="font-size:30px;color:#767272;">查无数据</td></tr>`
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


/*导出*/
$("body").on("click","#dataImport",function(){
	$.ajax({
        url: url + "fpztExport/excel/zcgzdEx/check",
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

			data = {"page_index": 1,"page_size": totle,'aak032':shuji.val(),'aak039':duizhang.val(),
			"aap001":company.val(),'aab002':zcname.val(),'phone':zcphone.val(),"aar008":p_shi.val(),
			"aar009_x":city.val(),"aar009_z":area.val(),"aar009_c":town.val(),'aar012':dianhua.val(),'aad004':shuxing.val()}

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
						let cc=url+"fpztExport/zcgzdEx?"+b;
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

})