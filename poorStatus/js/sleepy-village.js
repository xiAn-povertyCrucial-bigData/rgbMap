$(function(){
	
	
	
	var countryName=null;
    var villageName=null;
    var villageCode=null;
    /********************************************************请求参数截取************************************************************/
    //截取Url里面的参数   
    function GetRequest() {  
        var url = location.search; //获取url中"?"符后的字串 
        url=decodeURI(url);
        var theRequest = new Object();  
        if (url.indexOf("?") != -1) {  
            var str = url.substr(1);  
            //alert(str);  
            strs = str.split("&");  
            for (var i = 0; i < strs.length; i++) {  
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);//获取中文参数转码<span style="font-family: Arial, Helvetica, sans-serif;">decodeURI</span>，（unescape只针对数字，中文乱码)  
            }  
        }  
        return theRequest;  
    }  
            
        //通过url取数   
        var data = new Object();  
        data = GetRequest();  
        countryName = data['county'] ; 
        villageName = data['name'] ; 
        villageCode = data['villageCode'] ;
        console.log(countryName) 
        console.log(villageName)
        console.log(villageCode)
		  	
          /**************** 地图调用 ************************/
        var gis = null;
        function giscallback(type, param){
            switch (type) {
                case 'mapinit':
                    // 地图初始化完成
                    setTimeout(function(){
                       gis.gisapp.zoom(countryName,villageName);
                    },1500)
                    break;
                case 'county_select':
                    // 区域点击事件

                    break;
                case 'village_select':
                    // 村点击事件

                    break;
                case 'city_show':
                    break;
                default:
                    console.log(type +':' + param)
                    break;
            }
       }
        function gisready(){
            gis = document.getElementById("mapService").contentWindow
            gis.gisapp.init(giscallback);
        }	
	
	  
	$('#poor-village').text(villageName);
		
	
	
var y=201712;
var j;
var cunbianma=[];
var hubianma=[];
var hubianma2=[];
/////////黄兴村贫困户情况统计
var dom4= document.getElementById("echarts-4");
var myChart4 = echarts.init(dom4);
var dom3 = document.getElementById("echarts-3");
var myChart3 = echarts.init(dom3);
var colorL=['#AD4246','#C7CA33','#76A157'];
    var element=['未达标', '兜底保障','已达标'];
    var Element=element;
    option = {
        tooltip : {
            trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : ''        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:Element,        
        align:'left',
        itemGap: 6 ,
        itemWidth : 25,
        itemHeight : 15 ,       
        align: 'left',
        top:50,
        selectedMode: true,
        formatter: function(v) {
           return v ;
       },
       textStyle:{
        fontSize:13,
        color: '#fff'
    	}
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top : '3%',
        containLabel: true
    },
    xAxis:  {
        show:false,
        type: 'value',
         //刻度线设置  
            axisTick : {  
                show : true,  
            },
            axisLine : {  
                //轴线样式  
                lineStyle : {  
                    width : 0,  
                    color : 'rgba(1,134,198,0.8)'  
                }  
            },  
    },
    yAxis: {
        type: 'category',
        axisLabel : {
            textStyle : {
                color:'#fff',
                fontSize:20
            }
        },
        data:['贫困户'],
        axisLine : {  
                    //轴线样式  
                    lineStyle : {  
                        width : 0,  
                        color : 'rgba(1,134,198,0.8)'  
                    }  
                },
        },
    series: [
    {
        name: '未达标',
        type: 'bar',
        barWidth:35,
        stack: '总量',
        label: {
            normal: {
                show: false,
                position: 'insideRight'
            }
        },
        itemStyle : {
            normal : { 
                color : colorL[0]
            },
        },

        data:[]
    },
    {
        name: '兜底保障',
        type: 'bar',
        barWidth:35,
        stack: '总量',
        label: {
            normal: {
                show: false,
                position: 'insideRight'
            }
        },
        itemStyle : {
            normal : { 
                color : colorL[1]
            },
        },
        data:[]
    },
    {
        name: '已达标',
        type: 'bar',
        stack: '总量',
        barWidth:35,
        label: {
            normal: {
                show: false,
                position: 'insideRight'
            }
        },
        itemStyle : {
            normal : { 
                color : colorL[2]
            },
        },
        data: []
    }
        
        ]
    };

    myChart3.setOption(option);
//黄兴村贫困户情况统计ajax
$.ajax({           
        url:url+ 'map/house/village',
        data:{'year':y,'disctId':villageCode},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                console.log("ok0000");
                showhxcHu(myChart3,data);
            }
         
        }       
	})  
	function showhxcHu(myChart3,data){		
	    
	    var linNums1 = [];
	    var linNums2 = [];	 	     
	    var linNums3 = [];	 	     
		for (let i=0;i<data.data.length;i++) {
             linNums1[i]=data.data[i].standardNO; 
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK; 
            myChart3.setOption({               
                series: [
			    {
			        name: '未达标',
			        type: 'bar',
			     
			        stack: '总量',			        			
			        data:[linNums1[i]]
			    },
			    {
			        name: '兜底保障',
			        type: 'bar',
			       
			        stack: '总量',			        
			        data:[linNums2[i]]
			    },
			    {
			        name: '已达标',
			        type: 'bar',
			        stack: '总量',
			     			        
			        data: [linNums3[i]]
			    }
        
        ]              
           	
			})
		}

	} 
//黄兴村贫困户信息
var table0=document.getElementById('table0');
$.ajax({
            url:url+ 'map/five/index/house', 
            data:{"year":201712,'disctId':villageCode},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showhxcAllhu(table0,data);
                }            
            }       
    })  
    function showhxcAllhu(table0,data){			   
	   
	      var str = `
	      
	       <tr style="background: linear-gradient(#0D4770, #000103);">  
                <th> 户主  </th>  
                <th> 性别  </th>  			                 			                 
                <th> 年龄  </th>  			                 			                 
                <th> 家庭人数  </th>  			                 			                 
                <th> 达标情况</th>  			                 
            </tr> `;
	          $('#table0').html(str);
		
		for(let i = 0; i < data.data.length; i++ ){
			hubianma[i]=data.data[i].AAC001;
		    var str1=`  
		      <tr sleep=${i}>
	              <td>${data.data[i].AAC029}</td>
	              <td>${data.data[i].SEX}</td>
	              <td>${data.data[i].AGE}</td>
				  <td>${data.data[i].AAC017}</td>
	              <td>${data.data[i].ISSTANDARDOK}</td>				              
	          </tr>`;
	           $('#table0').html(function (i, value) {
	                return value + str1;
	             	            
	            });
	             
		   }   
		   for(let k=0; k<=$('#wxtable >tr').length; k++){
		   		if($('#wxtable >tr').eq(k).find('td:nth-child(5)').text()==1){
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').css('color','red');
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').text('未达标');		         		
		        }else if($('#wxtable >tr').eq(k).find('td:nth-child(5)').text()==0){
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').text('已达标');
		         }else{
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').css('color','yellow');
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').text('兜底保障户');				     
				}
			}
		} 


/****************************echarts-4*************************************/
//黄兴村贫困户五项退出指标达标情况统计
var app = {};
option = null;

option = {
    color: ['#ad4246', '#76a157'],
    title: {
        text: '单位:户',
        textStyle:{    //图例文字的样式
	        color:'#fff',
	        fontSize:graph_unit
	    }
        
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
   
    legend: {
        data: ['未达标', '已达标'],
        x : 'right',
        textStyle:{    //图例文字的样式
	        color:'#fff'
	    }
    },
    grid: {
        top: "20%",
        left: '2%',
        right: '5%',
        bottom: '5%',
        containLabel: true
    },
    yAxis:  {
        type: 'value',
        axisLine:{  
                lineStyle:{  
                    color:'#fff'
                }  
            },
            splitLine:{
                show:false
            }
    },
    xAxis: {
        type: 'category',
        triggerEvent:true,
        data: [],
        axisLabel:{
        	interval:0,
        	rotate:-30,
        	 textStyle:{
                fontSize:10
            }  
        },
        axisLine:{  
                lineStyle:{  
                    color:'#fff'
                }  
            }  
    },
    series: [
        {
            name: '未达标',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: [],
            itemStyle: {
                        emphasis: {
                            barBorderRadius: [5, 5, 0, 0]
                        },                        
                        normal: {
                            barBorderRadius:[5, 5, 0, 0]
                        }
                    }
        },
        {
            name: '已达标',
            type: 'bar',
            stack: '总量',
            barWidth: 20,
            data: [],
            itemStyle: {
                        emphasis: {
                            barBorderRadius: [5, 5, 5, 5]
                        },                         
                        normal: {
                            barBorderRadius:[5, 5, 5, 5]
                        }
                    }
        },
    ]
};
//黄兴村贫困户五项退出指标达标情况统计ajax
$.ajax({
        url: url+'map/house/type', 
        data:{"year":y,'disctId':villageCode},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                console.log("ok");
                showhuWuxiang(myChart4,data);

            }
         
        }       
	})  
	function showhuWuxiang(myChart4,data){		
	    var linNames = [];
	    var linNums1 = [];
	    var linNums2 = [];	 	   
	    var type = [];	 	   
		for (let i=0;i<data.data.length;i++) {
			 linNames[i]=data.data[i].indexName; 
             linNums1[i]=data.data[i].STANDARDNO;
             linNums2[i]=data.data[i].STANDARDOK;            
            myChart4.setOption({ 
                xAxis: {  
                        data: linNames  
                       }, 
                yAxis:  {
			        type: 'value'

				},
                series: [
                	{   type: 'bar',
			            stack: '总量',
			                                   
                        name: ['未达标'],  
                        data: linNums1 
          			} ,
                	{   type: 'bar',
			            stack: '总量',
			                                  
                        name: ['已达标'],  
                        data: linNums2 
          			}
                                      
                	]               
           	
			})
		}			 
		
	} 

if (option && typeof option === "object") {
    myChart4.setOption(option, true);
}
//hu五项达标情况点击
myChart4.on('click', function (params) {  
	$('#zhezhao').show();
    if(params.componentType == "xAxis"){           	       	     	 	    
    	console.log(params);
    	switch(params.value)
				{
				case '人均纯收入':
				  j=1;
				  break;
				case '安全住房':
				  j=2;
				  break;
				case '义务教育阶段辍学':
				  j=3;
				  break;
				case '新农合和大病保险':
				  j=4;
				  break;
				case '安全饮水':
				  j=5;
				  break;				  
				default:	
				return ;
				}
    	//hu五项达标情况
    	var table1=document.getElementById('table1');
		$.ajax({
	            url:url+ 'map/five/index/house', 
	            data:{"year":y,'disctId':villageCode,'type':j},
	            method: "post",
	            dataType: "json",
	            success: function(data){
	                if (data.code == 2000){
	                    console.log("ok");
	                    shoAllwuxiang(table1,data);
	                }            
	            }       
		   })  
        function shoAllwuxiang(table1,data){			   	   
	        var str = `	      
	        <tr style="background: linear-gradient(#0D4770, #000103);">  
                <th> 户主  </th>  
                <th> 性别  </th>  			                 			                 
                <th> 年龄  </th>  			                 			                 
                <th> 家庭人数  </th>  			                 			                 
                <th> 达标情况</th>  			                 
            </tr> `;
	          $('#table1').html(str);
		
			for(let i = 0; i < data.data.length; i++ ){
				hubianma[i]=data.data[i].AAC001;
			    var str1=`  
			      <tr sleep=${i}>
		              <td>${data.data[i].AAC029}</td>
		              <td>${data.data[i].SEX}</td>
		              <td>${data.data[i].AGE}</td>
					  <td>${data.data[i].AAC017}</td>
		              <td>${data.data[i].ISSTANDARD}</td>				              
		          </tr>`;
		           $('#table1').html(function (i, value) {
		                return value + str1;	             	            
		           });	             
			}   
		    for(let k=0; k<=$('#table1 >tr').length; k++){
		   	
		   		if($('#table1 >tr').eq(k).find('td:nth-child(5)').text()==1){
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').css('color','red');
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').text('未达标');
		         	////五项原因展示
		         	$('#table1 >tr').eq(k).find("td:nth-child(5)").click(function(){
					   	var num = $(this).parent().attr("sleep");					  
					   			km = hubianma[num];					   			
					   	var wxreason=document.getElementById('xiangqing-left')      
						$.ajax({
					            url:url+ 'map/five/index/reason', 
					            data:{"year":201712,'type':j,'aac001':km},
					            method: "post",
					            dataType: "json",
					            success: function(data){
					                if (data.code == 2000){
					                    //console.log("ok");
					                    showreason(wxreason,data);
					                }            
					            }       
					    })
					   	function showreason(wxreason,data){
							$('#titreason').html(params.value)
							 var str = `						 
							   <div class="t-list">
							        ${data.data}
							    </div>`;
						        $('#wxreason').html(str);
						}
					    $("#xiangqing-left").css("display","block");
					   });	
		         	
		        }else{
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').text('已达标');
		        }		        		        
		        
			}		   
		}   
		
	$(".xiangqing").css('display','block')
    }else{           
    }  
});	     



$(".content-2 .c-title").click(function(){   
	$('#zhezhao').show();
    	$(".wuxiang").css('display','block');
    
var table0=document.getElementById('table0');
		$.ajax({
	            url:url+ 'map/house/info', 
	            data:{"year":y,'disctId':villageCode},
	            method: "post",
	            dataType: "json",
	            success: function(data){
	                if (data.code == 2000){
	                    console.log("ok");
	                    shoAllhu(table0,data);
	                }            
	            }       
		   })  
        function shoAllhu(table0,data){	
        	
	        var str = `	      
	        <tr style="background: linear-gradient(#0D4770, #000103);">  
                <th> 户主  </th>  
                <th> 性别  </th>  			                 			                 
                <th> 年龄  </th>  			                 			                 
                <th> 家庭人数  </th>  			                 			                 
                <th> 达标情况</th>  			                 
            </tr> `;
	          $('#table0').html(str);
	        for(let i = 0; i < data.data.length; i++ ){
				hubianma2[i]=data.data[i].AAC001;
				
			    var str1=`  
			      <tr sleep=${i}>
		              <td>${data.data[i].AAC029}</td>
		              <td>${data.data[i].SEX}</td>
		              <td>${data.data[i].AGE}</td>
					  <td>${data.data[i].AAC017}</td>
		              <td>${data.data[i].ISSTANDARDOK}</td>				              
		          </tr>`;
		           $('#table0').html(function (i, value) {
		                return value + str1;	             	            
		           });	             
			} 
		
//达标情况点击 --户五项  
		 	for(let k=0; k<=$('#table0 >tr').length; k++){
		   		if($('#table0 >tr').eq(k).find('td:nth-child(5)').text()==1){
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').css('color','red');
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').text('未达标');
		         	
		         	$('#table0 >tr').eq(k).find("td:nth-child(5)").click(function(){
		         			var num1 = $(this).parent().attr("sleep");					  
					   			kn = hubianma2[num1];		         				
					 var huzhibiao=document.getElementById('wuxiang-left') ;
					 $('#huming').text($('#table0 >tr').eq(k).find("td:nth-child(1)").text())
					 $.ajax({
			            url:url+ 'map/five/house/five', 
			            data:{"year":201712,'aac001':kn},
			            method: "post",
			            dataType: "json",
			            success: function(data){
			                if (data.code == 2000){
			                    console.log("ok");			                           
			                    huWuxiang(huzhibiao,data);				            
			             
			                } 
			            }
			    	})    	
					function huWuxiang(huzhibiao,data){	
												
						    if( data.data.STUDENT==0){
						    	$('#color3').addClass('green'); 
						    	$('#color3').removeClass('red'); 
				    			$('#hudefen3').html(20); 
						    }else{
						    	$('#color3').addClass('red'); 
						    	$('#color3').removeClass('green');
				    			$('#hudefen3').html(0); 
						    }
						    if( data.data.INSURANCE==0){
						    	$('#color4').addClass('green'); 
						    	$('#color4').removeClass('red');
				    			$('#hudefen4').html(20);
						    }else{
						    	$('#color4').addClass('red'); 
						    	$('#color4').removeClass('green');
				    			$('#hudefen4').html(0); 
						    }
						    if( data.data.INCOME==0){
						    	$('#color1').addClass('green'); 
						    	$('#color1').removeClass('red');
				    			$('#hudefen1').html(20); 
						    }else{
						    	$('#color1').addClass('red'); 
						    	$('#color1').removeClass('green');
				    			$('#hudefen1').html(0); 
						    }
						    if( data.data.WATER==0){
						    	$('#color5').addClass('green'); 
						    	$('#color5').removeClass('red');
				    			$('#hudefen5').html(20);
						    }else{
						    	$('#color5').addClass('red'); 
						    	$('#color5').removeClass('green');
				    			$('#hudefen5').html(0); 
						    }
						    if( data.data.HOUSE==0){
						    	$('#color2').addClass('green'); 
						    	$('#color2').removeClass('red');
				    			$('#hudefen2').html(20); 
						    }else{
						    	$('#color2').addClass('red');
						    	$('#color2').removeClass('green');
				    			$('#hudefen2').html(0); 
					        }
						    
						    $('#hu-score').html(parseInt($('#hudefen1').text())+parseInt($('#hudefen2').text())+parseInt($('#hudefen3').text())+parseInt($('#hudefen4').text())+parseInt($('#hudefen5').text()))
					}					   						   	
				    $("#wuxiang-left").css("display","block");
				    
				   });	
		        }else if($('#table0 >tr').eq(k).find('td:nth-child(5)').text()==2){		        	
		        	$('#table0 >tr').eq(k).find('td:nth-child(5)').css('color','yellow');
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').text('兜底保障户');
		        }else{		         	
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').text('已达标');
		        }		        				
			}   
			
		}

		var reasonspan=$(" #wuxiang-left .t-list .itme-des >a");	
		
	    for (var i=0;i<reasonspan.length;i++) {
			 $("#wuxiang-left .t-list .itme-des>a").eq(i).attr("sleep",i+1);
		};	 
		$("#wuxiang-left .t-list .itme-des a ").on('click',function(){			
		if($(this).hasClass('red')){
			var reason0=document.getElementById('reason0')      
			$.ajax({
		            url:url+ 'map/five/index/reason', 
		            data:{"year":201712,'type':$(this).attr('sleep'),'aac001':kn},
		            method: "post",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
		                    //console.log("ok");
		                    showreason1(reason0,data);
		                }            
		            }       
			})
			function showreason1(reason0,data){					
					var str = `
				 	<h3>未达标原因</h3>
				   <p>
				        ${data.data}
				    </p>`;
			        $('#reason0').html(str);				 
			}										
		};
		})





});	
	
	
	
	
})