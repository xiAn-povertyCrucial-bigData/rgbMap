$(document).ready(function(){
	// var url = 'http://192.168.1.153:8080/';
/****************************echarts-4  全市贫困户达标情况及数量分布统计*************************************/

//全市贫困户五项退出指标达标情况统计
var dom7= document.getElementById("echarts-7");
var myChart7 = echarts.init(dom7);
var linNames_wuxiang2 = [];
var linNames_wuxiang3 = [];
var linNames_wuxiang4 = [];
var xianbianma = [];
var zhenbianma = [];
var cunbianma = [];
var hubianma = [];
var hubianma1 = [];
var page = $('.allPage');
var app = {};
option = null;
var y=201808;
/****************************echarts-7全市贫困户五项退出指标达标情况统计*************************************/

option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:户',
        textStyle:{    //图例文字的样式
	        color:'#fff',
	        fontWeight: 'normal',
	        fontSize:graph_x
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
	        color:'#fff',
            fontSize:graph_x
	    }
    },
    grid: {
        top: "20%",
        left: '2%',
        right: '5%',
        bottom: '10%',
        containLabel: true
    },
    yAxis:  {
        type: 'value',
        axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            },
        axisLabel: {
            textStyle: {
                fontSize: graph_x
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
        data: [/*'人均纯收入','安全住房','义务教育辍学学生','新农合和大病保险','安全饮水'*/],
        axisLabel:{
        	interval:0,
        	rotate:-45,
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
            barWidth: bar_width,
            data: [/*320, 302, 301, 334, 390*/],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },
        {
            name: '已达标',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,
            data: [/*120, 132, 101, 134, 90*/],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius: [0, 0, 0, 0]
                        }
                    }
        },

    ]
};

   $.ajax({
            url: url+'map/five',
            data:{"year":y},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){

                    showShiWuxiang(myChart7,data);

                }

            }
    	})
	function showShiWuxiang(myChart7,data){
	    var linNames_wuxiang1 = [];
	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang1[data.data[i].type-1]=data.data[i].indexName;
             linNums1[data.data[i].type-1]=data.data[i].STANDARDNO;
             linNums2[data.data[i].type-1]=data.data[i].STANDARDOK;
             type[data.data[i].type-1]=data.data[i].type;
            
            myChart7.setOption({
                xAxis: {
                        data: linNames_wuxiang1
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
	var j;
//县贫困户五项
myChart7.on('click', function(param) {

    $('.tab-2').show()
});
if (option && typeof option === "object") {
    myChart7.setOption(option, true);
}

myChart7.on('click', function (params) {

        if(params.componentType == "xAxis"){
        	$('#zhezhao').show();
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
            $(".content-5-2").css({'opacity':'1','top':'50%'});
			$("#content-5-2-left").css('display','none');
			$("#content-5-2-mid #mid-top").css('display','block');
			$("#content-5-2-mid #mid-bottom").css({'position':'relative','opacity':'0','top':'-100%'});
			$("#content-5-2-right0").css({'position':'relative','opacity':'0','top':'-100%'});
			$("#content-5-2-right").css('display','none');
        }else{

        }


   $.ajax({
            url: url+'map/five/index',
            data:{"year":y,'type':j},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){                   
                    showXianWuxiang(myChart5_21,data);
                }
            }
    	})
	function showXianWuxiang(myChart5_21,data){
	    var linNums1 = [];
	    var linNums2 = [];
	    $("#xianwuxiang").text(params.value);
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang2[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             xianbianma[i]=data.data[i].AAR008;
            myChart5_21.setOption({
                xAxis: {
                        data: linNames_wuxiang2
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
});

var dom5_21= document.getElementById("echarts-5-21");
var myChart5_21 = echarts.init(dom5_21);
option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:户',
        textStyle:{    //图例文字的样式
	        color:'#fff',
	        fontWeight: 'normal',
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
        data: [/*'蓝田县','周至县','鄠邑区','长安区','临潼区','临潼区','灞桥区','高陵区','国际港务区'*/],
        axisLabel:{
        	interval:0,
        	rotate:-45,
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
            barWidth: bar_width,

            data: [/*320, 302, 301, 334, 390, 330, 320,100,120*/],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [0, 0, 0, 0]
                        },
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },
        {
            name: '已达标',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,
            data: [/*320, 302, 301, 334, 390, 330, 320,100,120*/],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [0, 0, 0, 0]
                        },
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },

    ]
};
/****************************echarts-5-21*************************************/
option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:户',
        textStyle:{    //图例文字的样式
	        color:'#fff',
	        fontWeight: 'normal',
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
        data: [/*'xx镇','xx镇','xx镇','xx镇','xx镇','xx镇','xx镇','xx镇','xx镇'*/],
        axisLabel:{
        	interval:0,
        	rotate:-45,
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
            barWidth: bar_width,
            data: [/*320, 302, 301, 334, 390, 330, 320,100,120*/],
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
            barWidth: bar_width,
            data: [/*120, 132, 101, 134, 90, 230, 210,100,210*/],
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
if (option && typeof option === "object") {
    myChart5_21.setOption(option, true);
}

myChart5_21.on('click', function (params) {
	$("#cunwuxiang").text('');
	$("#huwuxiang0").text('');
	$('#wxtable').html('')
	$('#huwuxiang').html('');
	$("#zhenwuxiang").text(params.value);
        if(params.componentType == "xAxis"){
        	for (var i=0;i<linNames_wuxiang2.length;i++) {

			   if(params.value==linNames_wuxiang2[i]){
			   	 kk = xianbianma[i];
			   	}
		    }
		}

        $("#content-5-2-mid #mid-bottom").css({'opacity':'1','top':'100%'});

  var dom5_22= document.getElementById("echarts-5-22");
  var myChart5_22 = echarts.init(dom5_22);
   $.ajax({
            url:url+ 'map/five/index/count',
            data:{"year":y,'type':j,'disctId':kk},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNames_wuxiang3=[]
	 	   	   	    myChart5_22.setOption({
	   	                xAxis: {
	                        data:linNames_wuxiang3
	                    }
	   		        });
                    linNames_wuxiang4=[];
                    linNums1=[];
                    linNums2=[];
	 	   	   	    myChart5_23.setOption({
	   	                xAxis: {
	                        data:linNames_wuxiang4
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
	   		        });
                    showZhenWuxiang(myChart5_22,data);

                }

            }
    	})
	function showZhenWuxiang(myChart5_22,data){

	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang3[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             zhenbianma[i]=data.data[i].AAR008;
            myChart5_22.setOption({
                xAxis: {
                        data: linNames_wuxiang3
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

});

/****************************echarts-5-22*************************************/
var dom5_22= document.getElementById("echarts-5-22");
var myChart5_22 = echarts.init(dom5_22);
var app = {};
option = null;

option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:户',
        textStyle:{    //图例文字的样式
	        color:'#fff',
	        fontWeight: 'normal',
	        fontSize:graph_x
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
        x : '305',
        textStyle:{    //图例文字的样式
	        color:'#fff',
            fontSize:graph_x
	    }
    },
    grid: {
        top: "20%",
        left: '2%',
        right: '5%',
        bottom: '7%',
        containLabel: true
    },
    yAxis:  {
        type: 'value',

        axisLine:{
            lineStyle:{
                color:'#fff'
            }
        },
        axisLabel: {
            textStyle: {
                fontSize: graph_x
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
        data: [/*'蓝田县','周至县','鄠邑区','长安区','临潼区','临潼区','灞桥区','高陵区','国际港务区'*/],
        axisLabel:{
        	interval:0,
        	rotate:-45,
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
            barWidth: bar_width,
            data: [/*320, 302, 301, 334, 390, 330, 320,100,120*/],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },
        {
            name: '已达标',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,
            data: [/*120, 132, 101, 134, 90, 230, 210,100,210*/],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },

    ]
};
if (option && typeof option === "object") {
    myChart5_22.setOption(option, true);
}
myChart5_22.on('click', function (params) {
	$("#huwuxiang0").text('');
	$('#wxtable').html('')
	$('#huwuxiang').html('');
	$("#cunwuxiang").text(params.value);
        if(params.componentType == "xAxis"){

        for (var i=0;i<linNames_wuxiang3.length;i++) {
			   if(params.value==linNames_wuxiang3[i]){
			   	 //alert('111')
			   	 kl = zhenbianma[i];
			   	}
		    }

            $("#content-5-2-right0").css({'opacity':'1','top':'0'});
        }else{

        }
var dom5_23= document.getElementById("echarts-5-23");
var myChart5_23 = echarts.init(dom5_23);
 $.ajax({
            url:url+ 'map/five/index/count',
            data:{"year":y,'type':j,'disctId':kl},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                   linNames_wuxiang4=[]
	 	   	   	    myChart5_23.setOption({
	   	                xAxis: {
	                        data:linNames_wuxiang4
	                    }
	   		        }); 
                    showcunWuxiang(myChart5_23,data);

                }

            }
    	})
	function showcunWuxiang(myChart5_23,data){

	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang4[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             cunbianma[i]=data.data[i].AAR008;
            myChart5_23.setOption({
                xAxis: {
                        data: linNames_wuxiang4
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

});
/****************************echarts-5-23*************************************/
var dom5_23= document.getElementById("echarts-5-23");
var myChart5_23 = echarts.init(dom5_23);
var app = {};
option = null;

option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:户',
        textStyle:{    //图例文字的样式
	        color:'#fff',
	        fontWeight: 'normal',
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
        x : '310',
        textStyle:{    //图例文字的样式
	        color:'#fff'
	    }
    },
    grid: {
        top: "20%",
        left: '2%',
        right: '5%',
        bottom: '7%',
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
        data: [/*'蓝田县','周至县','鄠邑区','长安区','临潼区','临潼区','灞桥区','高陵区','国际港务区'*/],
        axisLabel:{
        	interval:0,
        	rotate:-45,
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
            barWidth: bar_width,
            data: [/*320, 302, 301, 334, 390, 330, 320,100,120*/],
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
            barWidth: bar_width,
            data: [/*120, 132, 101, 134, 90, 230, 210,100,210*/],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },
    ]
};
if (option && typeof option === "object") {
    myChart5_23.setOption(option, true);
}
myChart5_23.on('click', function (params) {
	$('#wxtable').html('')
	$('#huwuxiang').html('');
	$('#huwuxiang0').html(params.value)
        if(params.componentType == "xAxis"){

        	for (var i=0;i<linNames_wuxiang4.length;i++) {
			   if(params.value==linNames_wuxiang4[i]){
			   	 //alert('111')
			   	 ks = cunbianma[i];
			   	}
		    }
        	//console.log(params);
            $("#content-5-2-right").css('display','block');
        }else{

        }

var wxtable=document.getElementById('wxtable')
var huming;
 $.ajax({
            url:url+ 'map/five/index/house',
            data:{"year":y,'type':j,'disctId':ks},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showhuWuxiang(wxtable,data);
                }
            }
    })
});

     function showhuWuxiang(wxtable,data){

	      var str = `

	       <tr style="background: linear-gradient(#0D4770, #000103);">
                <th> 户主  </th>
                <th> 性别  </th>
                <th> 年龄  </th>
                <th> 家庭人数  </th>
                <th> 达标情况</th>
            </tr> `;
	          $('#wxtable').html(str);

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
	           $('#wxtable').html(function (i, value) {
	                return value + str1;

	            });

		   }
		   for(let k=0; k<=$('#wxtable >tr').length; k++){
		   		if($('#wxtable >tr').eq(k).find('td:nth-child(5)').text()==0){
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').css('color','#DD4F43');
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').text('未达标');
		         	$('#wxtable >tr').eq(k).find("td:nth-child(5)").click(function(){	
		         		huming=$('#wxtable >tr').eq(k).find('td:nth-child(1)').text()
						$('#huwuxiang').html('');
					   	var num = $(this).parent().attr("sleep");
					   			km = hubianma[num];

					   	var wxreason=document.getElementById('content-5-2-left')
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

					      $("#content-5-2-left").css("display","block");
					   });
		         }else{
		         	//$('#wxtable >tr').eq(k).find('td:nth-child(5)').onclick=null;
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
		         	$('#wxtable >tr').eq(k).find('td:nth-child(5)').text('已达标');
                    $('#wxtable >tr').eq(k).find("td:nth-child(5)").click(function(){
                    	huming=$('#wxtable >tr').eq(k).find('td:nth-child(1)').text()
						$('#huwuxiang').html('');
                        var num = $(this).parent().attr("sleep");
                        km = hubianma[num];

                        var wxreason=document.getElementById('content-5-2-left')
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

                        $("#content-5-2-left").css("display","block");
                    });
                }

				function showreason(wxreason,data){
					$("#content-5-2-left>.c-title").text(huming+'指标达标情况');
					 var str = `
					   <div class="t-list" style="font-size: 20px;text-align: left;text-indent:40px;padding:5px 12px;overflow: hidden;box-sizing:border-box;color:black;">
					        ${data.data}
					    </div>`;
				        $('#huwuxiang').html(str);
				}
			}
		}

//全市贫困户五项退出指标达标情况统计  标题点击




















})