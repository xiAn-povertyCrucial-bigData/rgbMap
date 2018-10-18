$(document).ready(function(){
  //初始页面
  let token=$.cookie("token");
	var page = $(".allPage");
	var eight = $("#eight");
	var codeType = '';
	var data ;
	var dataType;
    var pieElsePovertyChart=echarts.init(document.getElementById("pieElsePoverty"));
    var barElsePovertyChart=echarts.init(document.getElementById("barElsePoverty"));
	$.ajax({
		url: url + "povStat/isstustat",
		data: { "page_index":1,"page_size": 50,"aar040":201808},
		beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
		method: "get",
		dataType: "json",
		success: function(data){
				if(data.code == 2000){
					showDevelopment(0,eight,data);
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
     <table border="" cellspacing="" cellpadding="" style="width:1600px;overflow-x:auto ">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">贫困人口</td>
					<td colspan="2">非在校生</td>						
					<td colspan="2">学前教育</td>						
					<td colspan="2">小学</td>		
                    <td colspan="2">七年级</td>						
					<td colspan="2">八年级</td>
                    <td colspan="2">九年级</td>						
					<td colspan="2">高中一年级</td>		
                    <td colspan="2">高中二年级</td>						
					<td colspan="2">高中三年级</td>	
                    <td colspan="2">中职一年级</td>
                    <td colspan="2">中职二年级</td>						
					<td colspan="2">中职三年级</td>		
                    <td colspan="2">高职一年级</td>	
                    <td colspan="2">高职二年级</td>		
                    <td colspan="2">高职三年级</td>						
					<td colspan="2">大专及以上</td>								
				</tr>		
                 <tr >						
					<td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>		
                    <td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>	
                    <td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>		
                    <td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>		
                    <td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
			        <td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
					<td>占比（%）</td>		
                    <td>人数</td>
					<td>占比（%）</td>
					<td>人数</td>
				</tr>		
                    `;
        for(let i = 0;i < data.data.list.length;i++)
		{
			str +=`<tr>
					<td>${index*50+i+1}</td>
					<td codeType="${data.data.list[i].AAR008}">${data.data.list[i].AAR009}</td>
					<td>${data.data.list[i].PEOPLE_NUM}</td>
					<td>${data.data.list[i].A}</td>
					<td>${data.data.list[i].APER}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].BPER}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].CPER}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].DPER}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].EPER}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].FPER}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].GPER}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].HPER}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].IPER}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].JPER}</td>
					<td>${data.data.list[i].K}</td>
					<td>${data.data.list[i].KPER}</td>
					<td>${data.data.list[i].L}</td>
					<td>${data.data.list[i].LPER}</td>
					<td>${data.data.list[i].M}</td>
					<td>${data.data.list[i].MPER}</td>
					<td>${data.data.list[i].N}</td>
					<td>${data.data.list[i].NPER}</td>
					<td>${data.data.list[i].O}</td>
					<td>${data.data.list[i].OPER}</td>
					<td>${data.data.list[i].P}</td>
					<td>${data.data.list[i].PPER}</td>
				</tr>
                `;
                n++;
        }

	option={
		   series : [
                  {
                      name: '贫困人口在校生情况',
                      type: 'pie',
                      radius : '35%',
                      center: ['50%', '60%'],
                      label:{fontSize:15},
                      data:[
                          {value:data.data.list[n-1].A, name:'非在校生'},
                          {value:data.data.list[n-1].B, name:'学前教育'},
                          {value:data.data.list[n-1].C, name:'小学'},
                          {value:data.data.list[n-1].D, name:'七年级'},
						  {value:data.data.list[n-1].E, name:'八年级'},
                          {value:data.data.list[n-1].F, name:'九年级'},
						  {value:data.data.list[n-1].G, name:'高中一年级'},
                          {value:data.data.list[n-1].H, name:'高中二年级'},
                          {value:data.data.list[n-1].I, name:'高中三年级'},
                          {value:data.data.list[n-1].J, name:'中职一年级'},
						  {value:data.data.list[n-1].K, name:'中职二年级'},
                          {value:data.data.list[n-1].L, name:'中职三年级'},
						  {value:data.data.list[n-1].M, name:'高职一年级'},
                          {value:data.data.list[n-1].N, name:'高职二年级'},
						  {value:data.data.list[n-1].O, name:'高职三年级'},
                          {value:data.data.list[n-1].P, name:'大专及以上'},  
  
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
                      name:'贫困人口在校生情况',
                      type:'bar',
                      barWidth : 20,
                      data:[data.data.list[n-1].A,data.data.list[n-1].B, data.data.list[n-1].C, data.data.list[n-1].D, data.data.list[n-1].E, data.data.list[n-1].F,data.data.list[n-1].G, data.data.list[n-1].H, data.data.list[n-1].I, data.data.list[n-1].J, data.data.list[n-1].K,data.data.list[n-1].L, data.data.list[n-1].M, data.data.list[n-1].N, data.data.list[n-1].O, data.data.list[n-1].P]
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
            url: url + "povStat/isstustat",
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
					 showDevelopment(0,eight,data);  
					 showPage($(".searchPage"),data.data.total);
                     page.html(Math.ceil(data.data.total/50));
                     $("#total").html("总数:"+data.data.total);
					 }else if(data.code == 1009){
							var str=`<tr rowspan="2">
									<td rowspan="2" valign="middle">序号</td>
									<td rowspan="2" valign="middle">地区</td>
									<td rowspan="2" valign="middle">贫困人口</td>
									<td colspan="2">非在校生</td>						
									<td colspan="2">学前教育</td>						
									<td colspan="2">小学</td>		
				                    <td colspan="2">七年级</td>						
									<td colspan="2">八年级</td>
				                    <td colspan="2">九年级</td>						
									<td colspan="2">高中一年级</td>		
				                    <td colspan="2">高中二年级</td>						
									<td colspan="2">高中三年级</td>	
				                    <td colspan="2">中职一年级</td>
				                    <td colspan="2">中职二年级</td>						
									<td colspan="2">中职三年级</td>		
				                    <td colspan="2">高职一年级</td>	
				                    <td colspan="2">高职二年级</td>		
				                    <td colspan="2">高职三年级</td>						
									<td colspan="2">大专及以上</td>								
								</tr>		
				                 <tr >						
									<td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>		
				                    <td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>	
				                    <td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>		
				                    <td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>		
				                    <td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
							        <td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
									<td>占比（%）</td>		
				                    <td>人数</td>
									<td>占比（%）</td>
									<td>人数</td>
								</tr>	
							<tr><td colspan='38' style="font-size:30px;color:#767272;">查无数据</td></tr>`
							eight.html(str)
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
                url:url + "povStat/isstustat",
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
                     showDevelopment( index,eight,data); 
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


$("body").on('click',"#content  div table tr:nth-child(n+3) td:nth-child(2)",function(){
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
					 $("#countyName").html('>'+$(this).html())
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
				 $("#villageName").html('>'+$(this).html())
				 $("#villageName").attr("sleep",codeType);
				 $("#villageName").css("color","#FFAC37").siblings("span").css("color","#555");
		}
    
			$.ajax({
			url:url + "povStat/isstustat",
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
					 showDevelopment(0,eight,data); 
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
            url: url + "povStat/isstustat",
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
					 showDevelopment(0,eight,data);  
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
        url: url + "povStatExcel/export/exist/isstustat",  
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
			let cc=url+"povStatExcel/export/isstustat?"+b;
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