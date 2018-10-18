$(document).ready(function(){
  let token=$.cookie("token");
  var country=$('#country');
	var township=$('#township');
	var village=$('#village');
	var pages=$('.allPage');
	var year=$('#year');
	var shuxing=$('#shuxing')
	var reason=$('#reason')
	var standard=$('#standard')
	var state=$('#state')
	var content=$('#container')
	var table=$('#formSubmit2');
	var page = $(".allPage");
	var codeType = '';
	function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
	var pieElsePovertyChart=echarts.init(document.getElementById("pieElsePoverty"));
	var barElsePovertyChart=echarts.init(document.getElementById("barElsePoverty"));   
	  var str = `<option value="">县（区）</option>`;
    var str1 = `<option value="">乡（镇）</option>`;
    var str2 = `<option value="">村</option>`;
    //var str3 = `<option value="">年份</option>`; 
    country.html(str);
    township.html(str1);
    village.html(str2);    
    //year.html(str3);    
  var k = [];
	    var i = 0;
    	$(".active").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
  $.ajax({
		url: url + "eight/one/query",
		
		data: { "page_index":1,"page_size": 100,"aar040":201808,'aac006':k[1],
				'aac007':k[2],'aac005':k[3],'aar010':k[4]},
		beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
		method: "get",
		dataType: "json",
		success: function(data){
				if(data.code == 2000){
					Eight_batches(0,table,data);
					init_County(country,data);          
					showPage($(".searchPage"),data.data.total);
					page.html(Math.ceil(data.data.total/100));
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
  
  
//初始化渲染
  function Eight_batches(index,obj,data){

    obj.empty();
    var n=0;
    var str =`
	    <table id="formSubmit2" class="form-x" style="border-collapse: collapse;width:1800px;" >
        	<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">单位</td>
					<td colspan="2">贫困人口规模</td>
					<td colspan="2">产业扶持</td>
					<td colspan="2">就业创业</td>						
					<td colspan="2">生态补偿</td>						
					<td colspan="2">异地搬迁</td>						
					<td colspan="2">危房改造</td>						
					<td colspan="2">医疗救助</td>						
					<td colspan="2">教育支持</td>						
					<td colspan="2">兜底保障</td>						
				</tr>					
				<tr >						
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>
					<td>户数（户）</td>
					<td>人数（人）</td>					
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
        	
			str +=`<tr>
					<td>${index*13+i+1}</td>
					<td codeType="${data.data.list[i].AAA011}" style='color:#1797f7'>${data.data.list[i].AAR009}</td>
					<td>${data.data.list[i].HOLD}</td>
					<td>${data.data.list[i].NUM}</td>
					<td>${data.data.list[i].CYHOLD}</td>
					<td>${data.data.list[i].CYNUM}</td>
					<td>${data.data.list[i].JYHOLD}</td>
					<td>${data.data.list[i].JYNUM}</td>
					<td>${data.data.list[i].STHOLD}</td>
					<td>${data.data.list[i].STNUM}</td>
					<td>${data.data.list[i].YDHOLD}</td>
					<td>${data.data.list[i].YDNUM}</td>
					<td>${data.data.list[i].WFHOLD}</td>
					<td>${data.data.list[i].WFNUM}</td>
					<td>${data.data.list[i].YLHOLD}</td>
					<td>${data.data.list[i].YLNUM}</td>
					<td>${data.data.list[i].EDHOLD}</td>
					<td>${data.data.list[i].EDNUM}</td>
					<td>${data.data.list[i].DDHOLD}</td>
					<td>${data.data.list[i].DDNUM}</td>															
				</tr>
                `;
            n++;
      
        }
        //console.log(n)
 				
        str +=`<tr>
		      <td>${n+1}</td>
		 			<td style='color:#1797f7'>汇总</td>
		 			<td>${data.data.list[n].ZHOLD}</td>
		 			<td>${data.data.list[n].ZNUM}</td>
		 			<td>${data.data.list[n].ZCYHOLD}</td>
		 			<td>${data.data.list[n].ZCYNUM}</td>
		 			<td>${data.data.list[n].ZJYHOLD}</td>
		 			<td>${data.data.list[n].ZJYNUM}</td>
		 			<td>${data.data.list[n].ZSTHOLD}</td>
		 			<td>${data.data.list[n].ZSTNUM}</td>
		 			<td>${data.data.list[n].ZYDHOLD}</td>
		 			<td>${data.data.list[n].ZYDNUM}</td>
		 			<td>${data.data.list[n].ZWFHOLD}</td>
		 			<td>${data.data.list[n].ZWFNUM}</td>
		 			<td>${data.data.list[n].ZYLHOLD}</td>
		 			<td>${data.data.list[n].ZYLNUM}</td>
		 			<td>${data.data.list[n].ZEDHOLD}</td>
		 			<td>${data.data.list[n].ZEDNUM}</td>
		 			<td>${data.data.list[n].ZDDHOLD}</td>
		 			<td>${data.data.list[n].ZDDNUM}</td>
		 		</tr>`;
		str +=`</table>`
        obj.html(str);
        
//柱状图表渲染        
for(let i = 0;i < data.data.list.length-1;i++){

        var barElsePovertyOption = {
          
          series : [
              {
                  name:'八个一批统计',
                  type:'bar',
                  barWidth : 30,
                  stack: '广告',
                  data:[data.data.list[data.data.list.length-1].ZCYNUM, data.data.list[data.data.list.length-1].ZJYNUM, data.data.list[data.data.list.length-1].ZSTNUM, data.data.list[data.data.list.length-1].ZYDNUM,  
                  data.data.list[data.data.list.length-1].ZWFNUM,data.data.list[data.data.list.length-1].ZYLNUM,data.data.list[data.data.list.length-1].ZEDNUM,data.data.list[data.data.list.length-1].ZDDNUM]
              }
          ],
          
          color: ['#39A2B2','#20B8B4','#6ED1B2','#68E39D','#A6F093','#F9CF86','#FD9FB6','#ee7694']
      };
      barElsePovertyChart.setOption(barElsePovertyOption);
	}        
        
   //饼状图渲染     
  for(let i = 0;i < data.data.list.length-1;i++){
          var pieElsePovertyOption = {              
              series : [
                  {
                      name: '八个一批统计',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '60%'],
                      label:{fontSize:16},
                      data:[
                          {value:data.data.list[data.data.list.length-1].ZCYHOLD, name:'产业扶贫(户)'},
                          {value:data.data.list[data.data.list.length-1].ZJYHOLD, name:'就业创业(户)'},
                          {value:data.data.list[data.data.list.length-1].ZSTHOLD, name:'生态补偿(户)'},
                          {value:data.data.list[data.data.list.length-1].ZYDHOLD, name:'易地搬迁(户)'},
                          {value:data.data.list[data.data.list.length-1].ZWFHOLD, name:'危房改造(户)'},
                          {value:data.data.list[data.data.list.length-1].ZYLHOLD, name:'医疗救助(户)'},
                          {value:data.data.list[data.data.list.length-1].ZEDHOLD, name:'教育支持(户)'},
                          {value:data.data.list[data.data.list.length-1].ZDDHOLD, name:'兜底保障(户)'}
                      ]
                      
                  }
              ],
              color:['#39A2B2','#20B8B4','#6ED1B2','#68E39D','#A6F093','#F9CF86','#FD9FB6','#ee7694']
            };
          pieElsePovertyChart.setOption(pieElsePovertyOption);
      }      

   }
  
  function showPage(obj,data){
 $("#Pagination").pagination(data,{
             callback:PageCallback,         //pageCallback() 为翻页调用函数
             items_per_page:100,                //每页显示条目数
             num_display_entries: 4,                //连续分页显示分页条目数
             num_edge_entries: 1          //两侧显示的首尾分页的条目数
        });


}

    //ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
 //   console.log('das');
    page_init(page_index);      //第一页为0
}
let indexs=1;
function page_init(index) {
      var k = [];
	    var i = 0;
    	$(".active").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
	indexs=index+1;
        $.ajax({
                url:url + "eight/one/query",
                type:"get",
                data:{ "page_index":1,"page_size": 100,"aar040":k[0],'aac006':k[1],
				'aac007':k[2],'aac005':k[3],'aar010':k[4]},
								beforeSend:function(request){
						          request.setRequestHeader("Authorization",token);
						          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
						    },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                          //  console.log("ok");
                     showDevelopment( index,two,data); 
                        }
                },
                error:function () {
                }
            })
        }

 //查询
 $("body").on("click",".btn_orange",function(){
 
    var k = [];
	  var i = 0;
	    $(".active").each(function(){   	
					  k[i] = $(this).attr("sleep");
					  i++;		 
		 	}) 

//	let shijian11=[];
//  let shuxing11=[];
//  let reason11=[];
//  let standard11=[];
//  let state11=[];
//		let shijian1=$("#shijian dl.active");
//		let shuxing1=$("#shuxing dl.active");
//		let reason1=$("#reason dl.active");
//  let standard1=$("#standard dl.active");
//  let state1=$("#state dl.active");
//  getValue(shijian1,shijian11);
//  getValue(shuxing1,shuxing11);
//  getValue(reason1,reason11);
//  getValue(standard1,standard11);
//  getValue(state1,state11);
//  /*获取选中筛选条件值*/
//  function getValue(obj,arr){
//      for(let i=0;i<obj.length;i++){
//          arr.push(obj.eq(i).attr("sleep"));
//      }
//      return arr;
//  }
//		console.log(shijian11)
//		console.log(shuxing11)
//		console.log(state11)

	    $.ajax({    	
				url: url + "eight/one/query",
//				data: { "page_index":1,"page_size": 100,"aar040":shijian11,'aac006':shuxing11,
//				'aac007':reason11,'aac005':standard11,'aar010':state11},
				data: { "page_index":1,"page_size": 100,"aar040":k[0],'aac006':k[1],
				'aac007':k[2],'aac005':k[3],'aar010':k[4]},
				beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          ShowLoading()
    		},
				method: "get",
				dataType: "json",
				success: function(data){
						if(data.code == 2000){							
							Eight_batches(0,table,data);
							
							init_County(country,data);	          
							showPage($(".searchPage"),data.data.total);
							page.html(Math.ceil(data.data.total/100));
							$("#total").html("总数:"+data.data.total);
						}else if(data.code == 1009){
								var str=`<tr rowspan="2">
									<td rowspan="2" valign="middle">序号</td>
									<td rowspan="2" valign="middle">单位</td>
									<td colspan="2">贫困人口规模</td>
									<td colspan="2">产业扶持</td>
									<td colspan="2">就业创业</td>						
									<td colspan="2">生态补偿</td>						
									<td colspan="2">异地搬迁</td>						
									<td colspan="2">危房改造</td>						
									<td colspan="2">医疗救助</td>						
									<td colspan="2">教育支持</td>						
									<td colspan="2">兜底保障</td>						
								</tr>					
								<tr >						
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>
									<td>户数（户）</td>
									<td>人数（人）</td>					
								</tr>
								<tr><td colspan='22' style="font-size:30px;color:#767272;">查无数据</td></tr>`
								table.html(str)
								//$('.box').html('查无数据');
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

//下钻
$("body").on('click',"#con table tr:nth-child(n+3) td:nth-child(2)",function(){

     var k = [];
	   var i = 0;
    	$(".active").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
		})
		codeType = $(this).attr("codeType");
    //console.log(codeType)    	
			$.ajax({
			url: url + "eight/one/query",
			type:"get",
			data: { "page_index":1,"page_size": 100,"aar040":k[0],'aac006':k[1],
				'aac007':k[2],'aac005':k[3],'aar010':k[4],'aaa011':codeType},
			beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          ShowLoading()
    },
			dataType:"json",
			success: function(data){
						if(data.code == 2000){							
							Eight_batches(0,table,data);
							
							init_County(country,data);	          
							showPage($(".searchPage"),data.data.total);
							page.html(Math.ceil(data.data.total/100));
							$("#total").html("总数:"+data.data.total);
						}
			},
        complete:function(){
            HideLoading();
        },
			error:function () {
			}
		})
			
		if(codeType.substring(9) == '000'){
			if(codeType.substring(6)=='000000'){
				if(codeType.substring(4)=='00000000'){								  
				}else{									
					  $("#countyName").html('>'+$(this).html());
					  $("#countyName").attr("sleep",codeType);
					  $("#countyName").css("color","#FFAC37").siblings("span").css("color","#555");
				}
			}else{					 				
					 $("#townName").html('>'+$(this).html());
					 $("#townName").attr("sleep",codeType);
					 $("#townName").css("color","#FFAC37").siblings("span").css("color","#555");
			}
		}else{						
					 $("#villageName").html('>'+$(this).html());
					 $("#villageName").attr("sleep",codeType);
					 $("#villageName").css("color","#FFAC37").siblings("span").css("color","#555");
//	 					 $('#content  div table tr:nth-child(n+3) td:nth-child(2)').live('click', function(event) {
//									event.preventDefault();
//						 })
		}	
	 	
	  
})
 
$("body").on("click","#selectCity span",function(){
		var code = $(this).attr("sleep");
		//var codeType = $(this).attr("codeType");
		$(this).nextAll().empty();
		$(this).css("color",":#FFAC37").siblings("span").css("color","#555");
		var k = [];
	  var i = 0;
    	$(".active").each(function(){
			  k[i] = $(this).attr("sleep");
			  i++;
	   	})
	  
	  //console.log(code)
	   $.ajax({
            url: url + "eight/one/query",
            data: { "page_index":1,"page_size": 100,"aar040":k[0],'aac006':k[1],
				'aac007':k[2],'aac005':k[3],'aar010':k[4],'aaa011':code },
				beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          ShowLoading()
   		 },
            method: "get",
            dataType: "json",
            success: function(data){
	            if(data.code==2000)
					{
					 Eight_batches(0,table,data); 
					 showPage($(".searchPage"),data.data.total);
                     page.html(Math.ceil(data.data.total/100));
                     $("#total").html("总数:"+data.data.total);
					 }
				},
        complete:function(){
            HideLoading();
        }
	   })
}) 
 
 //加载县区请求
function init_County(country){
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
                   // console.log("ok");
                    showCountyInfo(country,data);
                   
                }
                // console.log('111');
            }
        
    })
}
//加载县区
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
//加载乡镇
$("#country").change(function(){
    var opt=$("#country");
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
                     page.html(data.data.total/100);
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
     

     }
}
//贫困cun
$("#township").change(function(){
    var town = $("#township").val();

    var area = $("#village");
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
                
                    showVillageInfo(area,data);
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

/*导出*/
$("body").on("click","#dataImport",function(){
	$.ajax({
    url: url + "eight/excel/eightOne/check",
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
    	var codeType = $(this).attr("codeType");
    	console.log(codeType)
				data = {"page_index":indexs,"page_size": 100,"aar040":k[0],'aac006':k[1],'aac007':k[2],'aac005':k[3],'aar010':k[4],'aaa011':codeType}

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
						let cc=url+"eight/export/query?"+b;
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