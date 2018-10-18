$(document).ready(function(){
  //初始页面
  let token=$.cookie("token");
	var page = $(".allpage");
	var one = $("#one");
	var codeType = '';
	var data ;
	var dataType;
	function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
	$.ajax({
		url: url + "povStat/naturalChange",
		data: { "page_index":1,"page_size": 50,"aar040":201808},
		beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
		method: "get",
		dataType: "json",
		success: function(data){
				if(data.code == 2000){
					showDevelopment(0,one,data);
					showPage($(".searchPage"),data.data.total);
					page.html(Math.ceil(data.data.total/50));
					$("#total").html("总数:"+data.data.total);
				}else if(data.code==1005){
					alert(data.message)
				}else if(data.code==1009){
					alert(data.message)
				}else if(data.code==4000){
					alert(data.message)
				}
		}
    })

  function   showDevelopment(index,obj,data){
	 // alert("3123")
     obj.empty();
   //  var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		 <tr> 
                        <td    valign="middle">序号</td>
                        <td    valign="middle">地区</td>
                        <td    valign="middle">自然净增加人数</td>
                        <td    valign="middle">增加人员的人数</td>
                        <td    valign="middle">新生儿人数</td>
                        <td    valign="middle">嫁入人数</td>
                        <td    valign="middle">其他原因新增人数</td>
                        <td    valign="middle">减少人员的人数</td>
                        <td    valign="middle">死亡人数</td>
                        <td    valign="middle">嫁出人数</td>
                        <td    valign="middle">出国定居人数</td>
                        <td    valign="middle">判刑收监人数</td>
                        <td    valign="middle">其他原因减少人数</td>					
                    </tr>							
                    `;
        for(let i = 0;i < data.data.list.length;i++)
		{
			str +=`<tr>
					<td>${index*50+i+1}</td>
					<td codeType="${data.data.list[i].AAR008}">${data.data.list[i].AAR009}</td>
					<td>${data.data.list[i].FACT_NUM}</td>
					<td>${data.data.list[i].ADD_NUM}</td>
                    <td>${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
                    <td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].CUT_NUM}</td>
                    <td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
                    <td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
				</tr>
                `;
        }
		str +=`</table>`
        obj.html(str);
				$("td").each(function(){		    
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		})
   }
  
  $("body").on("click","#btn_orange1",function(){
       var k = [];
	   var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
	      if( dataType == 'aar001'){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar001":codeType,"aac005":k[1] }
			}else if( dataType == "aar002"){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":codeType,"aac005":k[1]}					
			    }else if(dataType == "aar003" ){
				 data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":codeType,"aac005":k[1]}
		              }else{
					   data = { "page_index":1,"page_size": 50,'aar040':k[0],"aac005":k[1]}
					  }
	   $.ajax({
            url: url + "povStat/naturalChange",
            data: data,
            beforeSend:function(request){
					          request.setRequestHeader("Authorization",token);
					          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
					          ShowLoading();
					    },
            method: "get",
            dataType: "json",
            success: function(data){
	            if(data.code==2000){
							 showDevelopment(0,one,data);  
							 showPage($(".searchPage"),data.data.total);
		                     page.html(Math.ceil(data.data.total/50));
		                     $("#total").html("总数:"+data.data.total);
							 }else if(data.code == 1009){
									var str=`<div align="center" style="margin-top:40px;font-size:32px;color:#767272;">查无数据</div>`
									one.html(str)
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
//脚页
function page_init(index) {
        var k = [];
	    var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
	   if( dataType == 'aar001'){
					 data ={ "page_index":index+1,"page_size": 50,'aar040':k[0],"aar001":codeType,"aac005":k[1]}
			}else if( dataType == "aar002"){
					 data ={ "page_index":index+1,"page_size": 50,'aar040':k[0],"aar002":codeType,"aac005":k[1] }					
			    }else if(dataType == "aar003" ){
				 data = { "page_index":index+1,"page_size": 50,'aar040':k[0],"aar003":codeType,"aac005":k[1] }
		              }else{
					   data = { "page_index":index+1,"page_size": 50,'aar040':k[0],"aac005":k[1]}
					  }
        $.ajax({
                url:url + "povStat/naturalChange",
                type:"get",
                data:data,
                beforeSend:function(request){
						          request.setRequestHeader("Authorization",token);
						          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
						    },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                          //  console.log("ok");
                     showDevelopment( index,one,data); 
					// showPage($(".searchPage"),data.data.total);
                    // page.html(Math.ceil(data.data.total/50));
                     //$("#total").html("总数:"+data.data.total);
                        }
                },
                error:function () {
                }
            })
        }


function showPage(obj,data){
 $("#Pagination").pagination(data,{
             callback:PageCallback,         //pageCallback() 为翻页调用函数
             items_per_page:50,                //每页显示条目数
             num_display_entries: 4,                //连续分页显示分页条目数
             num_edge_entries: 1          //两侧显示的首尾分页的条目数
        });


}

    //ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
 //   console.log('das');
    page_init(page_index);      //第一页为0
}


$("body").on('click',"#content  div table tr:nth-child(n+2) td:nth-child(2)",function(){
       var k = [];
	   var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
		})
		codeType = $(this).attr("codeType");
        if(codeType.substring(9) == '000'){
			if(codeType.substring(6)=='000000'){
				if(codeType.substring(4)=='00000000'){			
					   data = { "page_index":1,"page_size": 50,'aar040':k[0]}
				}else{
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar001":codeType}
					 dataType = 'aar001';
					 $("#countyName").html('>'+$(this).html());
					 $("#countyName").attr("sleep",codeType);
					 $("#countyName").css("color","#FFAC37").siblings("span").css("color","#555");
				}
			}else{
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":codeType}
					 dataType = "aar002";
				     $("#townName").html('>'+$(this).html());
					 $("#townName").attr("sleep",codeType);
					 $("#townName").css("color","#FFAC37").siblings("span").css("color","#555");
			}
		}else{
				 data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":codeType }
			     dataType = "aar003"; 
				 $("#villageName").html('>'+$(this).html())
				 $("#villageName").attr("sleep",codeType);
				 $("#villageName").css("color","#FFAC37").siblings("span").css("color","#555");
		}
    
			$.ajax({
			url:url + "povStat/naturalChange",
			type:"get",
			data:data,
			beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          ShowLoading()
    },
			dataType:"json",
			success:function (data) {
			if (data.code == 2000){
						//  console.log("ok");
					 showDevelopment(0,one,data); 
					 showPage($(".searchPage"),data.data.total);
                     page.html(Math.ceil(data.data.total/50));
                     $("#total").html("总数:"+data.data.total);
					}
			},
        complete:function(){
            HideLoading();
        },
			error:function () {
			}
		})
})

$("body").on("click","#btn_blue1",function(){
	$("#search").empty();
	str=`  <ul class="select"> 
				  <label  class="label1"> 年份</label>
                 <dt >
                    <dl sleep="2015">2014年</dl>
                    <dl sleep="2016">2015年</dl>
                    <dl sleep="2017">2016年</dl>
                    <dl sleep="201712">2017年</dl>
										<dl sleep="201808" class="active1">2018年</dl>
                </dt>
			  </ul>
     
       		<!--<ul class="select">
				<label  class="label1">识别标准</label>
       		 	<dt>                  
                    <dl  sleep="01" class="active1">国家标准</dl>
                    <dl sleep="02">省定标准</dl> 
					 <dl sleep="03">市定标准</dl>                 
                </dt>
       		</ul>
            <ul class="select">
                 <label  class="label1">脱贫状态</label>
                 <dt>                   
                    <dl  class="active1">全部</dl>
                    <dl sleep="1"> 已脱贫享受政策</dl>
					<dl sleep="4"> 已脱贫未享受政策</dl>
					<dl sleep="0"> 未脱贫</dl>
					<dl sleep="3"> 返贫</dl>
                    <dl sleep="2"> 预脱贫</dl>                
                </dt>
       		</ul>-->
         <div>
            <input type="button" id="btn_orange1" class="btn_orange1" style="float: right;" name="" value="查询">
            <input type="button" id="btn_blue1" class="btn_blue1" style="float: right;" name="" value="重置条件">
        </div>`;
	$("#search").html(str);
})

$("body").on("click","#selectCity span",function(){
		var code = $(this).attr("sleep");
		var city = $(this).attr("id");
		$(this).nextAll().empty();
		$(this).css("color","#FFAC37").siblings("span").css("color","#555");
		var k = [];
	    var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
	      if( city == 'countyName'){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0]}
			}else if( city == "townName"){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":code }					
			    }else if(city == "villageName" ){
				 data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":code}
		              }else{
					   data = { "page_index":1,"page_size": 50,'aar040':k[0]}
					  }
	   $.ajax({
            url: url + "povStat/naturalChange",
            data: data,
            beforeSend:function(request){
				          request.setRequestHeader("Authorization",token);
				          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
				          ShowLoading()
				    },
            method: "get",
            dataType: "json",
            success: function(data){
	            if(data.code==2000){
							 showDevelopment(0,one,data);  
							 showPage($(".searchPage"),data.data.total);
		                     page.html(Math.ceil(data.data.total/50));
		                     $("#total").html("总数:"+data.data.total);
							 }
				},
        complete:function(){
            HideLoading();
        }
	   })
})


	$("body").on("click","",function(){
		var k = [];
		var i = 0;
		$(".active1").each(function(){
			k[i] = $(this).attr("sleep");
			i++;
		})
		if( dataType == 'aar001'){
					data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar001":codeType,"aac005":k[1] }
		}else if( dataType == "aar002"){
					data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":codeType,"aac005":k[1]}					
			}else if(dataType == "aar003" ){
				data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":codeType,"aac005":k[1]}
					}else{
					data = { "page_index":1,"page_size": 50,'aar040':k[0],"aac005":k[1]}
				}
		$.ajax({
			url:url+"",
			method:"post",
			data:data,
			beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
			dataType:"json",
			success:function(data){

			}
		})

	})

	
/*导出*/
$("body").on("click","#dataImport",function(){
	$.ajax({
        url: url + "povStat/export/exist/naturalChange",  
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
    	$(".active1").each(function(){
				  k[i] = $(this).attr("sleep");
				  i++;
		   	})
	      if( dataType == 'aar001'){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar001":codeType,"aac005":k[1],"aar010":k[2] }
			}else if( dataType == "aar002"){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":codeType,"aac005":k[1],"aar010":k[2] }					
			    }else if(dataType == "aar003" ){
				 data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":codeType,"aac005":k[1],"aar010":k[2] }
		              }else{
					   data = { "page_index":1,"page_size": 50,'aar040':k[0],"aac005":k[1],"aar010":k[2] }
					  }

            /*主体内容渲染*/
         //   let formList=$("#formSubmit2");
           // let urls=url+"povStatExcel/export/perbasicstat";
            // console.log(urls,datas)
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
		    let cc=url+"povStat/export/stablePov?"+b;

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
})