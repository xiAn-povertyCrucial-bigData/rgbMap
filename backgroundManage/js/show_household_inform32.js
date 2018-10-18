$(document).ready(function(){
  //初始页面
  let token=$.cookie("token");
	var page = $(".allPage");
	var twelve = $("#twelve");
	var codeType = '';
	var data ;
	var dataType;
    var pieElsePovertyChart=echarts.init(document.getElementById("pieElsePoverty"));
    var barElsePovertyChart=echarts.init(document.getElementById("barElsePoverty"));
	$.ajax({
		url: url + "povStat/holdfamilyincome",
		data: { "page_index":1,"page_size": 50,"aar040":201808},
		beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
		method: "get",
		dataType: "json",
		success: function(data){
				if(data.code == 2000){
					showDevelopment(0,twelve,data);
					showPage($(".searchPage"),data.data.total);
					page.html(Math.ceil(data.data.total/50));
					$("#alltotal").html("总数:"+data.data.total);
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
     obj.empty();
     var n=0;
     var str =`
      <table border="" cellspacing="" cellpadding="" style="width:1600px;overflow-x:auto">		   
	    		<tr>
					<td  valign="middle">序号</td>
					<td  valign="middle">地区</td>
					<td  valign="middle">贫困户数</td>
					<td  valign="middle">贫困人口 </td>						
					<td  valign="middle">年收入（元）</td>						
					<td  valign="middle">户均年收入（元）</td>	
                    <td  valign="middle">户均生产经营性收入（元）</td>						
					<td  valign="middle">户均务工收入（元）</td>
                    <td  valign="middle">户均财产性收入（元）</td>
					<td  valign="middle">户均转移性收入（元） </td>						
					<td  valign="middle">户均生产经营性支出（元）</td>						
					<td  valign="middle">户均纯收入（元）</td>	
                    <td  valign="middle">人均纯收入（元）</td>																						
				</tr>			
                    `;
        for(let i = 0;i < data.data.list.length;i++)
		{
			str +=`<tr>
					<td>${index*50+i+1}</td>
					<td codeType="${data.data.list[i].AAR008}">${data.data.list[i].AAR009}</td>
					<td>${data.data.list[i].HOLDER_NUM}</td>
					<td>${data.data.list[i].PEOPLE}</td>
					<td>${data.data.list[i].ALLINCOME}</td>
					<td>${data.data.list[i].AVGINCOME}</td>
					<td>${data.data.list[i].PROINCOME}</td>
					<td>${data.data.list[i].WORKINCOME}</td>
					<td>${data.data.list[i].ASSINCOME}</td>
					<td>${data.data.list[i].TRANINCOME}</td>
					<td>${data.data.list[i].PROOUTCOME}</td>
					<td>${data.data.list[i].HOLDINCOME}</td>
					<td>${data.data.list[i].PERINCOME}</td>
				</tr>
                `;
                n++;
        }
			option={
	    	   series : [
                  {
                      name: '贫困户上年度家庭收入',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '60%'],
                      label:{fontSize:13},
                      data:[
                          {value:data.data.list[n-1].WORKINCOME, name:'户均务工收入'},
                          {value:data.data.list[n-1].PROINCOME, name:'户均生产经营性收入'},
                          {value:data.data.list[n-1].ASSINCOME, name:'户均财产性收入'},
                          {value:data.data.list[n-1].TRANHINCOME, name:'户均转移性收入'},
                          {value:data.data.list[n-1].PROOUTCOME, name:'户均生产经营性支出'},
                          {value:data.data.list[n-1].HOLDINCOME, name:'户均纯收入'}
                      ],
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ],
			}
			 pieElsePovertyChart.setOption(option);
			 option1={
				 series : [
                  {
                      name:'贫困户上年度家庭收入',
                      type:'bar',
                      barWidth : 30,
                      data:[data.data.list[n-1].WORKINCOME,data.data.list[n-1].PROINCOME, data.data.list[n-1].ASSINCOME, data.data.list[n-1].TRANHINCOME, data.data.list[n-1].PROOUTCOME, data.data.list[n-1].HOLDINCOME,]
                  }
              ],
			 }
			 barElsePovertyChart.setOption(option1);
      str+=`</table>`

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
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar001":codeType,"aac005":k[1],"aar010":k[2] }
			}else if( dataType == "aar002"){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":codeType,"aac005":k[1],"aar010":k[2] }					
			    }else if(dataType == "aar003" ){
				 data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":codeType,"aac005":k[1],"aar010":k[2] }
		              }else{
					   data = { "page_index":1,"page_size": 50,'aar040':k[0],"aac005":k[1],"aar010":k[2] }
					  }
	   $.ajax({
            url: url + "povStat/holdfamilyincome",
            data: data,
            beforeSend:function(request){
				          request.setRequestHeader("Authorization",token);
				          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
				    },
            method: "get",
            dataType: "json",
            success: function(data){
	            if(data.code==2000)
					{
					 showDevelopment(0,twelve,data);  
					 showPage($(".searchPage"),data.data.total);
                     page.html(Math.ceil(data.data.total/50));
                     $("#total").html("总数:"+data.data.total);
					 }else if(data.code == 1009){
							var str=`<div align="center" style="margin-top:40px;font-size:32px;color:#767272;">查无数据</div>`
							twelve.html(str)
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
//脚页
function page_init(index) {
        var k = [];
	    var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
	   if( dataType == 'aar001'){
					 data ={ "page_index":index+1,"page_size": 50,'aar040':k[0],"aar001":codeType,"aac005":k[1],"aar010":k[2] }
			}else if( dataType == "aar002"){
					 data ={ "page_index":index+1,"page_size": 50,'aar040':k[0],"aar002":codeType,"aac005":k[1],"aar010":k[2] }					
			    }else if(dataType == "aar003" ){
				 data = { "page_index":index+1,"page_size": 50,'aar040':k[0],"aar003":codeType,"aac005":k[1],"aar010":k[2] }
		              }else{
					   data = { "page_index":index+1,"page_size": 50,'aar040':k[0],"aac005":k[1],"aar010":k[2] }
					  }
        $.ajax({
                url:url + "povStat/holdfamilyincome",
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
                     showDevelopment( index,twelve,data); 
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
					   data = { "page_index":1,"page_size": 50,'aar040':k[0],"aac005":k[1],"aar010":k[2] }
				}else{
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar001":codeType,"aac005":k[1],"aar010":k[2] }
					 dataType = 'aar001';
					 $("#countyName").html('>'+$(this).html());
					 $("#countyName").attr("sleep",codeType);
					 $("#countyName").css("color","#FFAC37").siblings("span").css("color","#555");
				}
			}else{
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":codeType,"aac005":k[1],"aar010":k[2] }
					 dataType = "aar002";
					  $("#townName").html('>'+$(this).html())
					  $("#townName").attr("sleep",codeType);
					  $("#townName").css("color","#FFAC37").siblings("span").css("color","#555");
			}
		}else{
				 data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":codeType,"aac005":k[1],"aar010":k[2] }
			     dataType = "aar003"; 
				 $("#villageName").html('>'+$(this).html());
				 $("#villageName").attr("sleep",codeType);
				 $("#villageName").css("color","#FFAC37").siblings("span").css("color","#555");
		}
    
			$.ajax({
			url:url + "povStat/holdfamilyincome",
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
					 showDevelopment(0,twelve,data); 
					 showPage($(".searchPage"),data.data.total);
                     page.html(Math.ceil(data.data.total/50));
                     $("#alltotal").html("总数:"+data.data.total);
					}
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
     
       		<ul class="select">
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
       		</ul>
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
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar001":code,"aac005":k[1],"aar010":k[2] }
			}else if( city == "townName"){
					 data ={ "page_index":1,"page_size": 50,'aar040':k[0],"aar002":code,"aac005":k[1],"aar010":k[2] }					
			    }else if(city == "villageName" ){
				 data = { "page_index":1,"page_size": 50,'aar040':k[0],"aar003":code,"aac005":k[1],"aar010":k[2] }
		              }else{
					   data = { "page_index":1,"page_size": 50,'aar040':k[0],"aac005":k[1],"aar010":k[2] }
					  }
	   $.ajax({
            url: url + "povStat/holdfamilyincome",
            data: data,
            beforeSend:function(request){
				          request.setRequestHeader("Authorization",token);
				          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
				    },
            method: "get",
            dataType: "json",
            success: function(data){
	            if(data.code==2000)
					{
					 showDevelopment(0,twelve,data);  
					 showPage($(".searchPage"),data.data.total);
                     page.html(Math.ceil(data.data.total/50));
                     $("#alltotal").html("总数:"+data.data.total);
					 }
				}
	   })
})


/*导出*/
$("body").on("click","#dataImport",function(){
		$.ajax({
        url: url + "holderStatExcel/export/exist/holdfamilyincome",  
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
           // let urls=url+"holderStatExcel/export/perbasicstat";
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
			let cc=url+"holderStatExcel/export/holdfamilyincome?"+b;
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