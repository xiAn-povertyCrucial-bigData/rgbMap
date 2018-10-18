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

 		var host = 'http://localhost/demo/';
          /**************** 地图调用 ************************/
        var gis = null;
        function giscallback(type, param){
            switch (type) {
                case 'mapinit':
                    // 地图初始化完成
                    setTimeout(function(){
                       gis.gisapp.zoom(countryName);
                    },2500)
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


var y=201808;
var j;
var cunbianma=[];
var hubianma=[];
var hubianma2=[];
/////////新红 村贫困户情况统计
var dom4= document.getElementById("echarts-4");
var myChart4 = echarts.init(dom4);
var dom3 = document.getElementById("echarts-3");
var myChart3 = echarts.init(dom3);
var colorL=['#DD4F43','#FFCE43','#1FA463'];
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
        x:'right',
        itemGap: 6 ,
        itemWidth : 25,
        top:20,
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
        barWidth:bar_width,
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
        barWidth:bar_width,
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
        barWidth:bar_width,
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
//xinhong村贫困户情况统计ajax
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

	    // var linNums1 = [];
	    // var linNums2 = [];
	    // var linNums3 = [];
		//for (let i=0;i<data.data.length;i++) {
            var linNums1=data.data.standardNO;
            var linNums2=data.data.doudi;
            var linNums3=data.data.standardOK;

            myChart3.setOption({
                series: [
			    {
			        name: '未达标',
			        type: 'bar',

			        stack: '总量',
			        data:[linNums1]
			    },
			    {
			        name: '兜底保障',
			        type: 'bar',

			        stack: '总量',
			        data:[linNums2]
			    },
			    {
			        name: '已达标',
			        type: 'bar',
			        stack: '总量',
					itemStyle : {
		                normal: {
		                    label:{
		                    	color:'#fff',
		                        show:true,
		                        position:'right',
		                        formatter: function(params) {//格式化柱状图显示label
		                        	//for (let i=0;i<data.data.length;i++) {
	                            		return parseInt(data.data.standardNO)+parseInt(data.data.doudi)+parseInt(data.data.standardOK)+'户';
		                        	//}
		                        }
		                    }
		                }
		            },
			        data: [linNums3]
			    }

        ]

			})
		//}

	}
myChart3.setOption(option);
/****************************echarts-4*************************************/
//xinhong村贫困户五项退出指标达标情况统计
var app = {};
option = null;

option = {
    color: ['#DD4F43','#1FA463'],
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
                show:true ,
                lineStyle:{
                    color:color,
                    width:num,
                    type:'dashed'
                }
            }
    },
    xAxis: {
        type: 'category',
        triggerEvent:true,
        data: [],
        axisLabel:{
        	interval:0,
        	rotate:-70,
        	 textStyle:{
                fontSize:graph_x
            }
        },
        axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            },
            splitLine:{
                show:true ,
                lineStyle:{
                    color:color,
                    width:num,
                    type:'dashed'
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
                            barBorderRadius: [0, 0, 0, 0]
                        },
                        normal: {
                            barBorderRadius:[0, 0, 0, 0]
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
                            barBorderRadius: [0, 0, 0, 0]
                        },
                        normal: {
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },
    ]
};
//xinhong村贫困户五项退出指标达标情况统计ajax
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
	$('#table1').html('');
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
        	$('#tit01').text(params.value)
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

		   		if($('#table1 >tr').eq(k).find('td:nth-child(5)').text()==0){
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').css('color','#DD4F43');
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').text('未达标');
		         	////五项原因展示
		         	$('#table1 >tr').eq(k).find("td:nth-child(5)").click(function(){
		         		huname=$('#table1 >tr').eq(k).find('td:nth-child(1)').text()

					   	var num = $(this).parent().attr("sleep");
					   			km = hubianma[num];
					   	var wxreason=document.getElementById('#xiangqing-left')
						$.ajax({
					            url:url+ 'map/five/index/reason',
					            data:{"year":y,'type':j,'aac001':km},
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
							$('#titreason').html(huname+params.value)
							 var str = `
							   <div class="t-list" style="overflow: hidden;text-align: left;text-indent:40px;font-size: 20px;padding:3px 4px;color:black;">
							        ${data.data}
							    </div>`;
						        $('#wxreason').html(str);
						}
					    $("#xiangqing-left").css("display","block");
					   });

		        }else{
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
		         	$('#table1 >tr').eq(k).find('td:nth-child(5)').text('已达标');
                    ////五项原因展示
                    $('#table1 >tr').eq(k).find("td:nth-child(5)").click(function(){
                    	huname=$('#table1 >tr').eq(k).find('td:nth-child(1)').text()

                        var num = $(this).parent().attr("sleep");
                        km = hubianma[num];
                        var wxreason=document.getElementById('#xiangqing-left')
                        $.ajax({
                            url:url+ 'map/five/index/reason',
                            data:{"year":y,'type':j,'aac001':km},
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
                            $('#titreason').html(huname+params.value)
                            var str = `
							   <div class="t-list" style="overflow: hidden;text-align: left;text-indent:40px;font-size: 20px;padding:3px;color:black;">
							        ${data.data}
							    </div>`;
                            $('#wxreason').html(str);
                        }
                        $("#xiangqing-left").css("display","block");
                    });
                }

			}
		}

	$(".xiangqing").css('display','block')
    }else{
    }
});


//新红村贫困户五项退出指标达标情况统计标题点击
$(".content-2 .c-title").click(function(){
	$('#zhezhao').show();
    	$(".wuxiang").css('display','block');

var table0=document.getElementById('table0');
		$.ajax({
	            //url:url+ 'map/five/index/house',
	            url:url+ 'map/house/info',
	            data:{"year":y,'disctId':villageCode},
	            method: "post",
	            dataType: "json",
	            success: function(data){
	                if (data.code == 2000){
	                    console.log("ok");
	                    shoAllhu(table1,data);
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
		   		if($('#table0 >tr').eq(k).find('td:nth-child(5)').text()==0){
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').css('color','#DD4F43');
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').text('未达标');
		         	$('#table0 >tr').eq(k).find("td:nth-child(5)").click(function(){
		         		$('#reason0').html('');
		         			var num1 = $(this).parent().attr("sleep");
					   			kn = hubianma2[num1];
					 $('#huming').text($('#table0 >tr').eq(k).find("td:nth-child(1)").text())
					 var huzhibiao=document.getElementById('wuxiang-left') ;
					 $.ajax({
			            url:url+ 'map/five/house/five',
			            data:{"year":y,'aac001':kn},
			            method: "post",
			            dataType: "json",
			            success: function(data){
			                if (data.code == 2000){
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
		         	$('#table0 >tr').eq(k).css('display','none');
		         	$('#table0 >tr').eq(k).find("td:nth-child(5)").click(function(){
		         		$('#reason0').html('');
		         			var num1 = $(this).parent().attr("sleep");
					   			kn = hubianma2[num1];
					 $('#huming').text($('#table0 >tr').eq(k).find("td:nth-child(1)").text())
					 var huzhibiao=document.getElementById('wuxiang-left') ;
					 $.ajax({
			            url:url+ 'map/five/house/five',
			            data:{"year":y,'aac001':kn},
			            method: "post",
			            dataType: "json",
			            success: function(data){
			                if (data.code == 2000){
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
		        }else{
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
		         	$('#table0 >tr').eq(k).find('td:nth-child(5)').text('已达标');
		         	$('#table0 >tr').eq(k).find("td:nth-child(5)").click(function(){
		         		$('#reason0').html('');
		         			var num1 = $(this).parent().attr("sleep");
					   			kn = hubianma2[num1];
					 $('#huming').text($('#table0 >tr').eq(k).find("td:nth-child(1)").text())
					 var huzhibiao=document.getElementById('wuxiang-left') ;
					 $.ajax({
			            url:url+ 'map/five/house/five',
			            data:{"year":y,'aac001':kn},
			            method: "post",
			            dataType: "json",
			            success: function(data){
			                if (data.code == 2000){
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
		        }
			}

		}

		var reasonspan=$(" #wuxiang-left .t-list .itme-des >a");

	    for (var i=0;i<reasonspan.length;i++) {
			 $("#wuxiang-left .t-list .itme-des>a").eq(i).attr("sleep",i+1);
		};
		$("#wuxiang-left .t-list .itme-des a ").on('click',function(){
		//if($(this).hasClass('red')){
			var reason0=document.getElementById('reason0')
			$.ajax({
		            url:url+ 'map/five/index/reason',
		            data:{"year":y,'type':$(this).attr('sleep'),'aac001':kn},
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
				   <p style='font-size: 16px;'>
				        ${data.data}
				    </p>`;
			        $('#reason0').html(str);
			}
		//};
		})





});


//xinhong村七项退出指标达标情况
var zhibiao=document.getElementById('p-list1') ;

	 $.ajax({
        url:url+ 'villSeven/villIndexs',
        data:{'code':villageCode},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                console.log("ok");
                AllhuWuxiang(zhibiao,data);
            }
        }
	})
	function AllhuWuxiang(zhibiao,data){

		var account=data.data.account;
		$('#cun-score1').text(account);
		$('#defen4').html(data.data.aad371)
		$('#defen1').html(data.data.aac331)
		$('#defen5').html(data.data.aae113)
		$('#defen7').html(data.data.aad391)
		$('#defen3').html(data.data.aac313)
		$('#defen6').html(data.data.aac312)
		$('#defen2').html(data.data.aad328)

        if( data.data.aac331==0){
            $('#color71').addClass('red').removeClass('green');
        }else{
            $('#color71').addClass('green').removeClass('red');
        }
        if( data.data.aad328==0){
            $('#color72').addClass('red').removeClass('green');
        }else{
            $('#color72').addClass('green').removeClass('red');
        }
        if( data.data.aac313==0){
            $('#color73').addClass('red').removeClass('green');
        }else{
            $('#color73').addClass('green').removeClass('red');
        }
        if( data.data.aad391==0){
            $('#color74').addClass('red').removeClass('green');
        }else{
            $('#color74').addClass('green').removeClass('red');
        }
        if( data.data.aae113==0){
            $('#color75').addClass('red').removeClass('green');
        }else{
            $('#color75').addClass('green').removeClass('red');
        }
        if( data.data.aac312==0){
            $('#color76').addClass('red').removeClass('green');
        }else{
            $('#color76').addClass('green').removeClass('red');
        }
        if( data.data.aad371==0){
            $('#color77').addClass('red').removeClass('green');
        }else{
            $('#color77').addClass('green').removeClass('red');
        }

        $("#p-list8 .p-item1").click(function(){
            if($(this).index()==0){
                $("#ger3").text(data.data.aac331Reason)
            }else if($(this).index()==1){
                $("#ger3").text(data.data.aad328Reason);
            }else if($(this).index()==2){
                $("#ger3").text(data.data.aac313Reason);
            }else if($(this).index()==3){
                $("#ger3").text(data.data.aad391Reason);
            }else if($(this).index()==4){
                $("#ger3").text(data.data.aae113Reason);
            }else if($(this).index()==5){
                $("#ger3").text(data.data.aac312Reason);
            }else if($(this).index()==6){
                $("#ger3").text(data.data.aad371Reason);
            }
        })


	}

  /*$("body ").on('click','.p-list .itme-des .t-item',function(){

    if($(this).hasClass('red')){
        //alert("eqwe");
        var index = $(".p-list .itme-des .t-item").index(this);
        var ger3=document.getElementById('ger3') ;
        switch(index){
            case 0:
            var ss = 'aac331';
            break;
            case 1:
            var ss = 'aad328';
            break;
            case 2:
            var ss = 'aac313';
            break;
            case 3:
            var ss = 'aad391';
            break;
            case 4:
            var ss = 'aae113';
            break;
            case 5:
            var ss = 'aac312';
            break;
            case 6:
            var ss = 'aad371';
            break;
            default:
           break;
        }
        $.ajax({
                url:url+ 'villSeven/aIndexReason',
                data:{'index':ss,"code":610124001010},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        //console.log("ok");
                        showreason11(ger3,data);
                    }
                }
    })
    function showreason11(ger3,data){
            var str = `
            <p style='font-size: 18px;'>
                ${data.data}
            </p>`;
            $('#ger3').html(str);
    }
};
})	*/
    /*列表滚动*/
    /*function autoScroll(obj){
        $(obj).find("ul").animate({
            marginTop : "-39px"
        },500,function(){
            $(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
        })
    }
    $(function(){
        setInterval('autoScroll(".maquee")',3000);
        alert(1)
    })*/
    /*户列表渲染*/
    let nameList=$("#poorlists");
    var num11;
    $.ajax({
        url:url+"map/house/info",
        method:"post",
        dataType:"json",
        data:{"year":y,"disctId":villageCode},
        success:function (result) {
            let data = result.data;
            showList(nameList,data);
            for(let i=0;i<$("#poorlists .status").length;i++){
                //console.log($(this))
                if($("#poorlists .status").eq(i).text()==0){
                    $("#poorlists .status").eq(i).text("未达标");
                    $("#poorlists .status").eq(i).css("color",'#DD4F43');
                }else if($("#poorlists .status").eq(i).text()==1){
                    $("#poorlists .status").eq(i).text("已达标");
                    $("#poorlists .status").eq(i).css("color",'#1FA463');
                }else{
                    $("#poorlists .status").eq(i).text("兜底保障户");
                    $("#poorlists .status").eq(i).css("color",'#FFCE43');
                }
            }
        }
    })
    function showList(obj,data){
        obj.empty();
        //console.log(data);
        for(let i=0;i<data.length;i++){
            let str=`
                     <li sleep=${data[i]['AAC001']} style="display: flex;justify-content: space-between;text-align: center;line-height: 46px;border-bottom:1px dashed #1B1147;cursor:pointer;font-size:16px">
						<div style="width:20%;">${data[i]['AAC029']}</div>
						<div style="width:20%;">${data[i]['SEX']}</div>
						<div style="width:20%;">${data[i]['AGE']}</div>
						<div style="width:20%;">${data[i]['AAC017']}</div>
						<div style="width:20%;" class="status">${data[i]['ISSTANDARDOK']}</div>
					</li>
                  `;
            obj.html(function (i,value) {
                return value+str;
            })
        }


		for(let j=0;j<$("#poorlists .status").length;j++){

	         	$('#poorlists .status').eq(j).click(function(){
	         		$('#zhezhao').show()
	         		$('#reason00').html('');
	         			 num11 = $(this).parent().attr("sleep");

				 $('#huming0').text($(this).parent().children('div:nth-child(1)').text())
				 var huzhibiao=document.getElementById('wuxiang-left1') ;
				 $.ajax({
		            url:url+ 'map/five/house/five',
		            data:{"year":y,'aac001':num11},
		            method: "post",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
		                    huWuxiang1(huzhibiao,data);
		                }
		            }
		    	})
				function huWuxiang1(huzhibiao,data){
					    if( data.data.STUDENT==0){
					    	$('#color30').addClass('green');
					    	$('#color30').removeClass('red');
			    			$('#hudefen30').html(20);
					    }else{
					    	$('#color30').addClass('red');
					    	$('#color30').removeClass('green');
			    			$('#hudefen30').html(0);
					    }
					    if( data.data.INSURANCE==0){
					    	$('#color40').addClass('green');
					    	$('#color40').removeClass('red');
			    			$('#hudefen40').html(20);
					    }else{
					    	$('#color40').addClass('red');
					    	$('#color40').removeClass('green');
			    			$('#hudefen40').html(0);
					    }
					    if( data.data.INCOME==0){
					    	$('#color10').addClass('green');
					    	$('#color10').removeClass('red');
			    			$('#hudefen10').html(20);
					    }else{
					    	$('#color10').addClass('red');
					    	$('#color10').removeClass('green');
			    			$('#hudefen10').html(0);
					    }
					    if( data.data.WATER==0){
					    	$('#color50').addClass('green');
					    	$('#color50').removeClass('red');
			    			$('#hudefen50').html(20);
					    }else{
					    	$('#color50').addClass('red');
					    	$('#color50').removeClass('green');
			    			$('#hudefen50').html(0);
					    }
					    if( data.data.HOUSE==0){
					    	$('#color20').addClass('green');
					    	$('#color20').removeClass('red');
			    			$('#hudefen20').html(20);
					    }else{
					    	$('#color20').addClass('red');
					    	$('#color20').removeClass('green');
			    			$('#hudefen20').html(0);
				       }
					    $('#hu-score0').html(parseInt($('#hudefen10').text())+parseInt($('#hudefen20').text())+parseInt($('#hudefen30').text())+parseInt($('#hudefen40').text())+parseInt($('#hudefen50').text()))
					}
				    $("#huwuxiang").css("display","block");
			   });

	        var reasonspan=$(" #wuxiang-left1 .t-list .itme-des >a");

	    for (var i=0;i<reasonspan.length;i++) {
			 $("#wuxiang-left1 .t-list .itme-des>a").eq(i).attr("sleep",i+1);
		};
		$("#wuxiang-left1 .t-list .itme-des a ").on('click',function(){
		//if($(this).hasClass('red')){
			var reason00=document.getElementById('reason00')
			$.ajax({
		            url:url+ 'map/five/index/reason',
		            data:{"year":y,'type':$(this).attr('sleep'),'aac001':num11},
		            method: "post",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
		                    //console.log("ok");
		                    showreason1(reason00,data);
		                }
		            }
			})
			function showreason1(reason00,data){
					var str = `
				 	<h3>未达标原因</h3>
				   <p style='font-size: 16px;'>
				        ${data.data}
				    </p>`;
			        $('#reason00').html(str);
			}
		//};
		})

		}

		$('#close00').click(function(){
			$("#huwuxiang").css("display","none");
			$('#zhezhao').hide()
		})
	}

})