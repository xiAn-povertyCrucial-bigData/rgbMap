$(function(){
	let token=$.cookie("token");
	var country1=$('#country1');
	var township1=$('#township1');
	var village1=$('#village1');
	var data1=$('#data1');
	var country2=$('#country2');
	var township2=$('#township2');
	var village2=$('#village2');
	var data2=$('#data2');
	var page=$('.allPage')
	var table=$('#formSubmit2');
	var zc = $("#zc");
	var bf = $("#bf");
	var str = `<option value="">县（区）</option>`;
    var str1 = `<option value="">乡（镇）</option>`;
    var str2 = `<option value="">村</option>`;
	var str3 = `<option value="">驻村工作队</option>`;
    var str4 = `<option value="">年/月/日</option>`;

    country1.html(str);
    country2.html(str);
    township1.html(str1);
    township2.html(str1);
    village1.html(str2);
    village2.html(str2);
    data1.html(str4);
    data2.html(str4);


	$.ajax({
            url: url + "logQD/log/zclog/query",
            data:{"page_index": 1,"page_size": 12},
            beforeSend:function(request){
		          request.setRequestHeader("Authorization",token);
		          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		    },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                  //  console.log("ok");
                    showAllInfo(0,table,data);
                    init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
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

            }

    })

  function showAllInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
              <th>序号</th>
              <th>上传日志地点</th>
              <th>日志作者</th>
              <th>日志数量</th>
              <th>排名</th>
          </tr>
        `;
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
    var str1=`
         <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAR009_C}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_X}</td>
              <td>${data.data.list[i].AAB002}</td>
              <td>${data.data.list[i].NUM}</td>
              <td>${index*12+i+1}</td>

          </tr>
          `;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }


//加载县
function init_County(){
   var city = $("#country1");
        $.ajax({
            url: url + "district/county",
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

                    showCountyInfo(city,data);

                }
            }
    	})
}

function showCountyInfo(obj,data){
     obj.empty();
     var str = `<option value="">县（区）</option>`;
     var string = "";
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
     }
     obj.html(str);
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
                    showTownInfo(opt1,data);
                     page.html(data.data.total);
                }
                // console.log('111');
            }

    })
});

function showTownInfo(obj,data){
        obj.empty();
     var str = `<option value="">乡（镇）</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
     // console.log(obj.val());
     }
}


$("#township1").change(function(){
    var town = $("#township1").val();

    var vill = $("#village1");
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


  function page_init(index) {
  	var time1 = data1.val().replace(/-/g,"");

        $.ajax({
                url:url + "logQD/log/zclog/query",
                type:"get",
                data:{"page_index": index+1,"page_size": 12,'helpTime':time1,
           		"aaa011_x":country1.val(),"aaa011_z":township1.val(),"aaa011_c":village1.val()},
           		beforeSend:function(request){
			          request.setRequestHeader("Authorization",token);
			          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
			    },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                          //  console.log("ok");
                          if($('.btn_orange').hasClass("btn_select")){
                             showAllInfo( index,table,data);
                          }else{
                             showAllInfo1( index,table,data);
                          }
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

$("body").on("click",".btn_select",function(){
    var time1 = data1.val().replace(/-/g,"");
       $(function(){
        $.ajax({
            url: url + "logQD/log/zclog/query",
            data:{"page_index":1,"page_size": 12,'helpTime':time1,
           "aaa011_x":country1.val(),"aaa011_z":township1.val(),"aaa011_c":village1.val()},
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
			              <th>上传日志地点</th>
			              <th>日志作者</th>
			              <th>日志数量</th>
			              <th>排名</th>
			          </tr>
					<tr><td colspan='5' style="font-size:30px;color:#767272;">查无数据</td></tr>`
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
/*驻村日志导出*/
$("body").on("click",".dataImport1",function(){
	$.ajax({
        url: url + "logQDExport/excel/zclogEx/check",
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",
        success: function(data){
        if (data.code == 2000){
			var time1 = data1.val().replace(/-/g,"");
			data = {"page_index":1,"page_size": 12,'aaa011_x':country1.val(),'aaa011_z':township1.val(),'aaa011_c':village1.val(),'helpTime':time1}

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
						let cc=url+"logQDExport/zclogEx?"+b;
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
    var time2 = data2.val().replace(/-/g,"");
        // console.log(city);
       $(function(){
        $.ajax({
            url: url + "logQD/log/bflog/query",
            data:{"page_index": 1,"page_size": 12,'helpTime':time2,
           "aaa011_x":country2.val(),"aaa011_z":township2.val(),"aaa011_c":village2.val()},
            beforeSend:function(request){
		          request.setRequestHeader("Authorization",token);
		          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		    },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showAllInfo1(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                }else if(data.code == 1009){
					var str=`<tr>
			              <th>序号</th>
			              <th>上传日志地点</th>
			              <th>日志作者</th>
			              <th>日志数量</th>
			              <th>排名</th>
			          </tr>
					<tr><td colspan='5' style="font-size:30px;color:#767272;">查无数据</td></tr>`
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
/*帮扶日志导出*/
$("body").on("click",".dataImport2",function(){
	$.ajax({
        url: url + "logQDExport/excel/bflogEx/check",
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",
        success: function(data){
        if (data.code == 2000){

			var time2 = data2.val().replace(/-/g,"");
			data = {"page_index":1,"page_size": 12,'aaa011_x':country1.val(),'aaa011_z':township1.val(),'aaa011_c':village1.val(),'helpTime':time2}

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
					let cc=url+"logQDExport/bflogEx?"+b;
					console.log(cc);
			        window.location.href=cc;

     		} else if(data.code==1005){
			alert(data.message)
		}else if(data.code==1009){
			alert(data.message)
		}else if(data.code==4000){
			alert(data.message)
		}
        }
    })

})


$("#zhucun").on("click",(function(){
        $("#zc").show();
        $("#bf").hide();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(function(){
        $.ajax({
            url: url + "logQD/log/zclog/query",
            data:{"page_index": 1,"page_size": 12},
            beforeSend:function(request){
		          request.setRequestHeader("Authorization",token);
		          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		    },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                  //  console.log("ok");
                    showAllInfo(0,table,data);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
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

            }

    })
  })
 })
)

$("#bangfu").click(function(){
        $("#zc").hide();
        $("#bf").show();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(function(){
        $.ajax({
            url: url + "logQD/log/bflog/query",
            data:{"page_index": 1,"page_size": 12},
            beforeSend:function(request){
		          request.setRequestHeader("Authorization",token);
		          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		    },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                  //  console.log("ok");
                    showAllInfo1(0,table,data);
                    init_County2();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
                    $('.btn_orange').addClass("btn_select1");
                    $('.btn_orange').removeClass("btn_select");
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

            }

    })
  })
 })

 function showAllInfo1(index,obj,data){
      obj.empty();

      var str = `
          <tr>
              <th>序号</th>
              <th>上传日志地点</th>
              <th>日志作者</th>
              <th>日志数量</th>
              <th>排名</th>
          </tr>
        `;
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
    var str1=`
          <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAR009_C}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_X}</td>
              <td>${data.data.list[i].AAB002}</td>
              <td>${data.data.list[i].NUM}</td>
              <td>${index*12+i+1}</td>
          </tr>
          `;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }

//加载县
function init_County2(){
   var city = $("#country2");
        $.ajax({
            url: url + "district/county",
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

                    showCountyInfo2(city,data);

                }
            }
    	})
}

function showCountyInfo2(obj,data){
     obj.empty();
     var str = `<option value="">县（区）</option>`;
     var string = "";
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
     }
     obj.html(str);
}

$("#country2").change(function(){
    var opt=$("#country2");
    var opt1 = $("#township2");

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
                    showTownInfo2(opt1,data);
                     page.html(data.data.total);
                }
                // console.log('111');
            }

    })
});

function showTownInfo2(obj,data){
        obj.empty();
     var str = `<option value="">乡（镇）</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
     // console.log(obj.val());
     }
}


$("#township2").change(function(){
    var town = $("#township2").val();

    var vill = $("#village2");
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

                    showVillageInfo2(vill,data);

                }
                // console.log('111');
            }

    })
});
function showVillageInfo2(obj,data){
       obj.empty();
     var str = `<option value="">村</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);

     }
}



})
