$(document).ready(function(){
    //var url = "http://192.168.1.135:8080/"
    let token=$.cookie("token");
     var formInfos = $('#formSubmit2')
     var page = $(".allPage");
     var totle;
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon)
    $(function(){
        $.ajax({
            url: url + "zrc/query",
            data:{"page_index":1,"page_size": 12,"aar040": 201808},
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
                    if(aa.aar008==610100000000){
                        showAllPoorInfo(0, formInfos,data);
                    }
                    showPage($(".searchPage"),data.data.total);
                    totle=data.data.total;
                    console.log(totle)
                    init_County();
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
function init_County(){
    var county = $("#p_qv");
            $.ajax({
            url: url + "district/county",
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
                   // console.log("ok");
                    showCountyInfo( county,data);
                   // showPage($(".searchPage"),data.data.total);
                   // init_County();
                }
                // console.log('111');
            }

    })
}


function  showCountyInfo(obj,data){
     obj.empty();
    let arr=[];
     var opt = $("#p_cun");
     var opt1 = $("#p_xiang");
     var str1 = `<option value="">乡（镇）</option>`;
     var str2 = `<option value="">村</option>`
     opt1.html(str1);
     opt.html(str2);
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
            $("#p_qv").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            var opt=$("#p_qv");
            var opt1 = $("#p_xiang");
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
            $.ajax({
                url: url + "zrc/query",
                data:{"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":opt.val()},
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
                        showAllPoorInfo(0, formInfos,data);
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
}

$("#p_qv").change(function(){
    var opt=$("#p_qv");
    var opt1 = $("#p_xiang");
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
                }
                // console.log('111');
            }

    })
});

function showTownInfo(obj,data){
    let arr=[];
    let p_qv=$("#p_qv").val();  //区
    let p_xiang=$("#p_xiang").val();  //乡
    obj.empty();
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
                $("#p_xiang").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
            }
        }
        let p_qv=$("#p_qv").val();  //区
        let p_xiang=$("#p_xiang").val();  //乡
        var town = $("#p_xiang").val();
        var vill = $("#p_cun");
        $.ajax({
            url: url + "zrc/query",
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
                    showAllPoorInfo(0, formInfos,data);
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
                    // showPage($(".searchPage"),data.data.total);
                    // init_County();
                }
                // console.log('111');
            }

        })
    }
}


$("#p_xiang").change(function(){
    var town = $("#p_xiang").val();
   // console.log(town);
    var vill = $("#p_cun");
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
                   // showPage($(".searchPage"),data.data.total);
                   // init_County();
                }
                // console.log('111');
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
              <th>自然村名称</th>
              <th>县</th>
              <th>乡(镇)</th>
              <th>村</th>
              <th>负责人</th>
			  <th>村办公电话</th>
              <th>操作</th>
          </tr>`
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
    var str1=`
     <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAD042}</td>
              <td>${data.data.list[i].H}</td>
              <td>${data.data.list[i].D}</td>
              <td>${data.data.list[i].E}</td>

              <td>${data.data.list[i].AAR011}</td>
              <td>${data.data.list[i].AAR012}</td>
              <td>
                  <a href="showDetailsObject.html?value=${data.data.list[i].AAD041}&value2=${data.data.list[i].AAD042}&time=${$('#p_year').val()}">详情</a>
                  <a href="reviseObject.html?value=${data.data.list[i].AAD041}&time=${$('#p_year').val()}">修改</a>
              </td>
          </tr>`;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }

  var  indexs = 1;
  function page_init(index) {
      indexs = index + 1;
        var p_year=$("#p_year").val();
        var p_xiang=$("#p_xiang").val();  //乡
        var p_cun =$("#p_cun").val();
        var p_qv=$("#p_qv").val();  //区
        if(p_cun!="" && p_cun!=null){
            p_xiang=p_cun;
        }
        //console.log("data:"+p_year);
        $.ajax({
                url:url + "zrc/query",
                type:"get",
                data:{"page_index": index+1,"page_size": 12,
            "aar040":p_year,"aar001":p_qv,"aar003":p_cun,"aar002":p_xiang},
            beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                            console.log("ok");
                            showAllPoorInfo( index,formInfos,data);
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

    //ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
 //   console.log('das');
    page_init(page_index);      //第一页为0
}

 $(".btn_orange1").on("click",function(){
        var p_year=$("#p_year").val();
        var p_xiang=$("#p_xiang").val();  //乡
        var p_cun =$("#p_cun").val();
        var p_qv=$("#p_qv").val();  //区
        var data= {"page_index": 1,"page_size": 12,
            "aar040":p_year,
           "aar001":p_qv,"aar003":p_cun,"aar002":p_xiang};
        $.ajax({
                url:url + "zrc/query",
                type:"get",
                data:data,
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                            console.log("ok");
                            showAllPoorInfo(0, formInfos,data);
                            showPage($(".searchPage"),data.data.total);
                            page.html(Math.ceil(data.data.total/12));
                                $("#total").html("总数："+data.data.total);
                        }else if(data.code == 1005){
							var str=`<tr>
					             <th>序号</th>
					              <th>自然村编号</th>
					              <th>县</th>
					              <th>乡(镇)</th>
					              <th>村</th>
					              <th>负责人</th>
								  <th>村办公电话</th>
					              <th>操作</th>
					          </tr>
							<tr><td colspan='8' style="font-size:30px;color:#767272;">查无数据</td></tr>`
							formInfos.html(str)
							$("#total").empty();
						    $(".allPage").empty();
						}
                },
                error:function () {
                }
            })
        });


/*导出*/
$("body").on("click","#dataImport",function(){
	$.ajax({
        url: url + "zrc/export/exist/query",
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",
        success: function(data){
        if (data.code == 2000){
        var p_year=$("#p_year").val();
        var p_xiang=$("#p_xiang").val();  //乡
        var p_cun =$("#p_cun").val();
        var p_qv=$("#p_qv").val();  //区
        var data= {"page_index": 1,"page_size": totle,
            "aar040":p_year,
           "aar001":p_qv,"aar003":p_cun,"aar002":p_xiang};

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
			let cc=url+"zrc/export/query?"+b;
			console.log(cc);
            window.location.href=cc;
      		}
        }
    })
    })

})

