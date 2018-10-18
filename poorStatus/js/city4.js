$(function(){

/****************************echarts-6*************************************/
var dom6= document.getElementById("echarts-6");
var myChart6 = echarts.init(dom6);
var app = {};
option = null;
var zb;
linNames_xian=[];
var xianbianma=[];
var zhibiaobianma=[];
linNames_zhen=[];
var zhenbianma=[];
var cunbianma=[];
option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:个',
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
        top: "18%",
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
        data: ['人均可支配收入','贫困发生率','通沥青(水泥)路','安全饮水','电力入户率','标准卫生室','集体经济'],
        axisLabel:{
        	interval:0,
        	rotate:-50,
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
            data: [],
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
            data: [],
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

 $.ajax({
            url: url+'villSeven/city',
            data:{},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){

                    showShiqixiang(myChart6,data);

                }

            }
    	})
	function showShiqixiang(myChart6,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data.data.length;i++) {
             linNums1[i]=[data.data[2].aae113No,data.data[2].aac331No,data.data[2].aad328No,data.data[2].aac312No,data.data[2].aac313No,data.data[2].aad391No,data.data[2].aad371No];
             linNums2[i]=[data.data[2].aae113Is,data.data[2].aac331Is,data.data[2].aad328Is,data.data[2].aac312Is,data.data[2].aac313Is,data.data[2].aad391Is,data.data[2].aad371Is];
             //console.log(linNums2[i]);
            myChart6.setOption({
                yAxis:  {
			        type: 'value'

				},
                series: [
                	{   type: 'bar',
			            stack: '总量',

                        name: ['未达标'],
                        data: linNums1[i]
          			} ,
                	{   type: 'bar',
			            stack: '总量',

                        name: ['已达标'],
                        data: linNums2[i]
          			}

                	]

			})
		}

	}

if (option && typeof option === "object") {
    myChart6.setOption(option, true);
}
myChart6.on("click",function(params){

    if(params.componentType == "xAxis"){
    	$('#zhezhao').show();
    	switch(params.value){
	    case '贫困发生率':
	      zb='aac331';
	      break;
	    case '通沥青(水泥)路':
	      zb='aad328';
	      break;
	    case '电力入户率':
	      zb='aac313';
	      break;
	    case '集体经济':
	      zb='aad371';
	      break;
	    case '人均可支配收入':
	      zb='aae113';
	      break;
	    case '安全饮水':
	      zb='aac312';
	      break;
	    case '标准卫生室':
	      zb='aad391';
	      break;
	  }

    	$(".content-4-2").css({'opacity':'1','top':'50%'});

    	$(".content-4-2").parent('div').attr({'background':'#7C7C7C','opacity':'0.5'})
   		$("#content-4-2-left").css('display','none');
		$("#content-4-2-right").css('display','none');
		$("#content-4-2-mid #mid-top").css('display','block');
		$("#content-4-2-mid #mid-bottom").css({'position':'relative','opacity':'0','top':'-100%'});
    }else{

    }

    $("#xianqixiang").text(params.value);
    $.ajax({
            url: url+'villSeven/cntyAIndex',
            data:{'index':zb},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNames_xian=[]
	 	   	   	    myChart4_21.setOption({
	   	                xAxis: {
	                        data:linNames_xian
	                    }
	   		        });
                    showXianqiuxiang(myChart4_21,data);

                }

            }
    	})
	function showXianqiuxiang(myChart4_21,data){

	    var linNums1 = [];
	    var linNums2 = [];

		for (let i=0;i<data.data.length;i++) {
			 linNames_xian[i]=data.data[i].disctName;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             xianbianma[i]=data.data[i].disctId;
             zhibiaobianma[i]=data.data[i].index;
             //console.log(linNums2[i]);
            myChart4_21.setOption({
                xAxis: {
                        data: linNames_xian
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

})
var dom4_21= document.getElementById("echarts-4-21");
var myChart4_21 = echarts.init(dom4_21);
var app = {};
option = null;

option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:个',
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
        bottom: '8%',
        containLabel: true
    },
    yAxis:  {
        type: 'value',
        axisLine:{
                lineStyle:{
                    color:'#fff'
                }
            } ,
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
        	rotate:-30,
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

            data: [],
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
            data: [],
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
    myChart4_21.setOption(option, true);
}
myChart4_21.on('click', function (params) {
	$('#qxtable').html('');
	$('#zhenming2').html('');
	$('#content-4-2-left>.t-list').html('');
        if(params.componentType == "xAxis"){
        	for (var i=0;i<linNames_xian.length;i++) {
			   if(params.value==linNames_xian[i]){
			   	 kx = xianbianma[i];
			   	}
		    }
        	console.log(kx)

            $("#content-4-2-mid #mid-bottom").css({"opacity":1,"top":"100%"});

        }else{
        }
     //$('#echarts-4-22').html('');
     $("#zhenqixiang").text(params.value+$("#xianqixiang").text());
    $.ajax({
            url: url+'villSeven/townAIndex',
            data:{'code':kx,'index':zb},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNames_zhen=[]
	 	   	   	    myChart4_22.setOption({
	   	                xAxis: {
	                        data:linNames_zhen
	                    }
	   		        });
                    showzhenqiuxiang(myChart4_22,data);

                }

            }
    	})
	function showzhenqiuxiang(myChart4_22,data){
	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_zhen[i]=data.data[i].disctName;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             zhenbianma[i]=data.data[i].disctId;
             //console.log(linNums2[i]);
            myChart4_22.setOption({
                xAxis: {
                        data: linNames_zhen
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

/****************************echarts-4-22*************************************/
var dom4_22= document.getElementById("echarts-4-22");
var myChart4_22 = echarts.init(dom4_22);
var app = {};
option = null;

option = {
    color: ['#DD4F43', '#1FA463'],
    title: {
        text: '单位:个',
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
        data: [],
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

            data: [],
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
            data: [],
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
    myChart4_22.setOption(option, true);
}
var cunming;
myChart4_22.on('click', function (params) {
	$('#qxtable').html('');
	$('#content-4-2-left>.t-list').html('');
	for (var i=0;i<linNames_zhen.length;i++) {
	   if(params.value==linNames_zhen[i]){
	   	 kz= zhenbianma[i];
	   	}
    }
        if(params.componentType == "xAxis"){

            $("#content-4-2-right").css('display','block');
        }else{

        }
    $('#zhenming2').html(params.value+$("#xianqixiang").text())
    var qxtable=document.getElementById('qxtable')
	 $.ajax({
	            url:url+ 'villSeven/villAIndex',
	            data:{'index':zb,'code':kz},
	            method: "post",
	            dataType: "json",
	            success: function(data){
	                if (data.code == 2000){

	                    showhuqixiang(qxtable,data);
	                }
	            }
	  });

     function showhuqixiang(qxtable,data){
	      var str = `
	       <tr style="background: linear-gradient(#0D4770, #000103);">
                <th> 村名  </th>
                <th> 达标情况  </th>
            </tr> `;
	          $('#qxtable').html(str);

		for(let i = 0; i < data.data.length; i++ ){
			cunbianma[i]=data.data[i].disctId;
		    var str1=`
		      <tr sleep=${i}>
	              <td>${data.data[i].vill}</td>
	              <td>${data.data[i].isReach}</td>
	          </tr>`;
	           $('#qxtable').html(function (i, value) {
	                return value + str1;

	            });

		   }
		   for(let k=0; k<=$('#qxtable >tr').length; k++){
		   		if($('#qxtable >tr').eq(k).find('td:nth-child(2)').text()=='否'){
		         	$('#qxtable >tr').eq(k).find('td:nth-child(2)').css('color','#DD4F43');
		         	$('#qxtable >tr').eq(k).find('td:nth-child(2)').text('未达标');
		         	$('#qxtable >tr').eq(k).find("td:nth-child(2)").click(function(){	
		         		cunming=$('#qxtable >tr').eq(k).find('td:nth-child(1)').text();
		         		$('#content-4-2-left>.t-list').html('');
					   	var num = $(this).parent().attr("sleep");
					   			kc = cunbianma[num];

					   	var qxreason=document.getElementById('#content-4-2-left')

						 $.ajax({
						            url:url+ 'villSeven/aIndexReason',
						            data:{"code":kc,'index':zb,'zcode':kz},
						            method: "post",
						            dataType: "json",
						            success: function(data){
						                if (data.code == 2000){
						                    //console.log("ok");
						                    showqxreason(qxreason,data);
						                }
						            }
						    })

					      $("#content-4-2-left").css("display","block");
					   });
		        }else{
		         	$('#qxtable >tr').eq(k).find('td:nth-child(2)').css('color','limegreen');
		         	$('#qxtable >tr').eq(k).find('td:nth-child(2)').text('已达标');
                    $('#qxtable >tr').eq(k).find("td:nth-child(2)").click(function(){
                    	cunming=$('#qxtable >tr').eq(k).find('td:nth-child(1)').text();
                    	$('#content-4-2-left>.t-list').html('');
                        var num = $(this).parent().attr("sleep");
                        kc = cunbianma[num];

                        var qxreason=document.getElementById('#content-4-2-left')

                        $.ajax({
                            url:url+ 'villSeven/aIndexReason',
                            data:{"code":kc,'index':zb,'zcode':kz},
                            method: "post",
                            dataType: "json",
                            success: function(data){
                                if (data.code == 2000){
                                    //console.log("ok");
                                    showqxreason(qxreason,data);
                                }
                            }
                        })

                        $("#content-4-2-left").css("display","block");
                    });
		         }

				function showqxreason(qxreason,data){
					$("#content-4-2-left>.c-title").text(cunming+$("#xianqixiang").text()+'指标达标情况');
					 var str = `
					   <div class="t-list" style='font-size:20px;overflow: hidden;text-align: left;text-indent:40px;padding:4px 3px;color:black;'>
					        ${data.data}
					    </div>`;
				        $('#content-4-2-left>.t-list').html(str);
				}
			}
		}

});


})