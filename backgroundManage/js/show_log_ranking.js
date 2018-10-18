$(document).ready(function(){
    var table = $("#formSubmit2");
    var shuxing = $("#villageType");
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
        $.ajax({
            url: url + "fpzt/zclog/query",
            data:{"page_index": 1,"page_size": 12},
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){                  
                    showAllInfo(0,table,data);
                    init_County(city,data);
                    //init_County(city1,data);
                    init_shuxing(shuxing,data)
                    page.html(Math.ceil(data.data.total/12));
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
               
            }
        
    })

  function showAllInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
              <th>序号</th>
              <th>干部姓名</th>
              <th>日志时间</th>
              <th>日志内容</th>
              <th>日志图片</th>
              <th>所在地</th>
          </tr>
        `;
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
   	console.log(data.data.list[i].AAB002)
    var str1=`  
         <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAB002}</td>
              <td>${data.data.list[i].HELPTIME}</td>
              <td title='${data.data.list[i].HELPLOG}'>${data.data.list[i].HELPLOG}</td>
              <td><img src='${data.data.list[i].IMAGEPATH}'/></td>
              <td>${data.data.list[i].AAR009_C}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_X}</td>
          </tr>
          `;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }

  function page_init(index) {
  	if($('.btn_orange').hasClass("btn_select")){
        $.ajax({ 
                url:url + "fpzt/zclog/query",
                type:"get",
	                data:{"page_index": index+1,"page_size": 12,"aar009_z":town.val(),
	           "aad004":shuxing.val(),"aar009_c":area.val(),"aar009_x":city.val()},
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){                         
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
        }else{
        	var start1 = start.val().replace(/-/g,"");
     		var end1 = end.val().replace(/-/g,"");
     		 if(start1 >= end1){
	           end1="";
	           end.val("");
	        }
        	 $.ajax({
            url: url + "fpzt/bflog/query",
            data:{"page_index": index+1,"page_size": 12,"aar009_x":city1.val(),"aar009_z":town1.val(),"aar009_c":area1.val(),
            'aab002':xingming.val(),'aap001':danwei.val(),'aar020':start1,'aar021':end1},
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showAllInfo1(index,table,data);
                }              
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
 //   console.log('das');
    page_init(page_index);      //第一页为0
}

//驻村日志县加载
function init_County(city){
    //var city = $("#country");
            $.ajax({
            url: url + "district/county", 
            data:{},
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
function init_County1(city1){
    //var city = $("#country");
            $.ajax({
            url: url + "district/county", 
            data:{},
            method: "get",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                 
                    showCountyInfo( city1,data);
                  
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

$("#country").change(function(){
    var opt=$("#country");
    var opt1 = $("#town");
    
         $.ajax({
            url: url + "district/town", 
            data:{"county":opt.val()},
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

$("#country1").change(function(){
    var opt=$("#country1");
    var opt1 = $("#township1");
    
         $.ajax({
            url: url + "district/town", 
            data:{"county":opt.val()},
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
     var str = `<option value="">乡（镇）</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
    
     }
}


$("#town").change(function(){
    var town = $("#town").val();
  
    var vill = $("#village");
         $.ajax({
            url: url + "district/village", 
            data:{"town": town},
            method: "get",
            dataType: "json",
            
            success: function(data){
                if (data.code == 2000){               
                    showVillageInfo(vill,data);                 
                }
               
            }
        
    })
});

$("#township1").change(function(){
    var town1 = $("#township1").val();
  
    var area1 = $("#village1");
         $.ajax({
            url: url + "district/village", 
            data:{"town": town1},
            method: "get",
            dataType: "json",
            
            success: function(data){
                if (data.code == 2000){
                
                    showVillageInfo(area1,data);

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
//驻村日志 村属性
function init_shuxing(shuxing,data){
    var shuxing = $("#villageType");
            $.ajax({
            url: url + "fpzt/cNature/query", 
            data:{},
            method: "get",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){                 
                    showShuxingInfo(shuxing,data);                 
                }            
            }        
    })
}
function showShuxingInfo(obj,data){
     obj.empty();
     var str = `<option value="">村属性</option>`;
     var string = "";
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAA102}">${data.data[i].AAA103}</option>
     `;
     }
     obj.html(str);
}




$("body").on("click",".btn_select",function(){
	alert(111)	
        $.ajax({
            url: url + "fpzt/zclog/query",
            data:{"page_index": 1,"page_size": 12,"aad004":shuxing.val(),"aar009_x":city.val(),"aar009_c":area.val(),"aar009_z":town},
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
		var start1 = start.val().replace(/-/g,"");
        var end1 = end.val().replace(/-/g,"");
         if(start1 >= end1){
           end1="";
           end.val("");
        }
       $(function(){
        $.ajax({
            url: url + "fpzt/bflog/query",
            data:{"page_index": 1,"page_size": 12,"aar009_x":city1.val(),"aar009_z":town1.val(),"aar009_c":area1.val(),
            'aab002':xingming.val(),'aap001':danwei.val(),'aar020':start1,'aar021':end1},
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


$("#zhucun").on("click",(function(){
        $("#zc").show();
        $(".bf").hide();
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(function(){
        $.ajax({
            url: url + "fpzt/zclog/query",
            data:{"page_index": 1,"page_size": 12},
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showAllInfo(0,table,data);
                    // init_County();
                    page.html(Math.ceil(data.data.total/12));
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
        
        $.ajax({
            url: url + "fpzt/bflog/query",
            data:{"page_index": 1,"page_size": 12},
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                
                    showAllInfo1(0,table,data);
                    
                    init_County1(city1,data);
                    page.html(Math.ceil(data.data.total/12));
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
               
            }
        
    })

 })

 function showAllInfo1(index,obj,data){
      obj.empty();
      var str = `
       <tr>
              <th>序号</th>
              <th>干部姓名</th>
              <th>日志时间</th>
              <th>日志内容</th>
              <th>日志图片</th>
              <th>所在地</th>
          </tr>
        `;
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
    var str1=`  
         <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAB002}</td>
              <td>${data.data.list[i].HELPTIME}</td>
              <td title='${data.data.list[i].HELPLOG}'>${data.data.list[i].HELPLOG}</td>
              <td><img src='${data.data.list[i].IMAGEPATH}'/></td>
              <td>${data.data.list[i].AAR009_X}-${data.data.list[i].AAR009_Z}-${data.data.list[i].AAR009_C}</td>
             </tr>
          `;
           obj.html(function (i, value) {
                return value + str1;
            });
   }
  }
})