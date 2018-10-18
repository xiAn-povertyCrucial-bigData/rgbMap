$(document).ready(function(){


		var codeinging=null;
        var countryName=null;
        /********************************************************请求参数截取************************************************************/
        function getUrlParam(name) {
            var url=window.location.search;
            url=decodeURI(url);
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = url.substr(1).match(reg); //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
        }
        //接收URL中的参数name
        countryName = getUrlParam('name');


			$.ajax({
		        url:url+ 'init/disct/name',
		        data:{'name':countryName},
		        method: "get",
		        dataType: "json",
		        success: function(data){
		            codeinging=data.data;

		            aa(codeinging)
		        }
		  	});


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


function aa(){

	console.log(codeinging);
	$('#poor-county').text(countryName);

//周至县贫困户五项退出指标达标情况统计
var dom6= document.getElementById("echarts-6");
var myChart6 = echarts.init(dom6);
var linNames_wuxiang2 = [];
var linNames_wuxiang3 = [];
var linNames_wuxiang4 = [];
var xianbianma = [];
var zhenbianma = [];
var cunbianma = [];
var hubianma = [];
var hubianma1 = [];
var j;
var app = {};
option = null;
var y=201808;
/****************************周至县贫困户五项退出指标达标情况统计（右下）*************************************/

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
        bottom: '11%',
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
        data: [/*'人均纯收入','安全住房','义务教育辍学学生','新农合和大病保险','安全饮水'*/],
        axisLabel:{
        	interval:0,
        	rotate:-40,
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
            barWidth: 10,
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
            barWidth: 10,
            data: [/*120, 132, 101, 134, 90*/],
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
            url: url+'map/house/type',
            data:{"year":y,'disctId':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showShiWuxiang(myChart6,data);

                }

            }
    	})
	function showShiWuxiang(myChart6,data){
	    var linNames_wuxiang1 = [];
	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang1[data.data[i].type-1]=data.data[i].indexName;
             linNums1[data.data[i].type-1]=data.data[i].STANDARDNO;
             linNums2[data.data[i].type-1]=data.data[i].STANDARDOK;
             type[data.data[i].type-1]=data.data[i].type;
             //console.log(linNums2[i]);
             //console.log(type[i])
            myChart6.setOption({
                xAxis: {
                        data: linNames_wuxiang1
                       },
                yAxis:  {
			        type: 'value'

				},
                series: [
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['未达标'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标'],
                        data: linNums2
          			}

                	]

			})
		}

	}
//区贫困户五项

if (option && typeof option === "object") {
    myChart6.setOption(option, true);
}

myChart6.on('click', function (params) {

        if(params.componentType == "xAxis"){
        	$('#zhezhao').show();
            $('.contentsss2').show()
            $("#hwxm").html(params.value);
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
            //  $(".content-5-2").css({'opacity':'1','top':'10%'});

        }else{

        }
   var dom12= document.getElementById("echarts-12");
   var myChart12 = echarts.init(dom12);
   $.ajax({
            url: url+'map/five/index/count',
            data:{"year":y,'type':j,'disctId':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNames_wuxiang2=[]
	 	   	   	    myChart12.setOption({
	   	                xAxis: {
	                        data:linNames_wuxiang2
	                    }
	   		        });
                    showXianWuxiang(myChart12,data);

                }

            }
    	})
	function showXianWuxiang(myChart12,data){
	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang2[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             xianbianma[i]=data.data[i].AAR008;
                myChart12.setOption({
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
                    bottom: '15%',
                    containLabel: true
                },
                xAxis: {
                        data: linNames_wuxiang2
                       },
                yAxis:  {
			        type: 'value'

				},
                series: [
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['未达标'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标'],
                        data: linNums2
          			}
                	]
			})
		}

	}
});

myChart12.on('click', function (params) {
	$('#rjtit').html('');
	$('#hh').html('');
	$('#tablesa1').html('');
	$('.p-item1-es').html('');
	$('#zhenqixiang').html(params.value+$("#hwxm").html())
    var kk;
    if(params.componentType == "xAxis"){
  		for (var i=0;i<linNames_wuxiang2.length;i++) {
		   if(params.value==linNames_wuxiang2[i]){
		   	 kk = xianbianma[i];
		   	}
	    }
	}

  var dom13 = document.getElementById("echarts-13");
  var myChart13 = echarts.init(dom13);
   $.ajax({
            url:url+ 'map/five/index/count',
            data:{"year":y,'type':j,'disctId':kk},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNames_wuxiang3=[]
	 	   	   	    myChart13.setOption({
	   	                xAxis: {
	                        data:linNames_wuxiang3
	                    }
	   		        });
                    showZhenWuxiang(myChart13,data);
                }
            }
    	})
	function showZhenWuxiang(myChart13,data){

	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang3[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             zhenbianma[i]=data.data[i].AAR008;
             //console.log(linNums2[i]);
             myChart13.setOption({
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
                xAxis: {
                        data: linNames_wuxiang3 ,
                         axisLabel:{
                            interval:0,
                            rotate:-60,
                            textStyle:{
                                fontSize:graph_x
                            }
                         },
                       },
                yAxis:  {
			        type: 'value'

				},
                series: [
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['未达标'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标'],
                        data: linNums2
          			}

                	]

			})

		}

	}

});
myChart13.on('click', function (params) {
	$('#hh').html('');
	$('#tablesa1').html('');
	$('.p-item1-es').html('');
	$('#rjtit').text(params.value+'达标情况')
        if(params.componentType == "xAxis"){


        	for (var i=0;i<linNames_wuxiang3.length;i++) {

			   if(params.value==linNames_wuxiang3[i]){
			   	 kk = zhenbianma[i];
			   	}
		    }

		}

  var table = document.getElementById("tablesa1");
   $.ajax({
            url:url+ 'map/five/index/house',
            data:{"year":y,'type':j,'disctId':kk},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showZhenWuxiang(table,data);

                }

            }
    	})
	function showZhenWuxiang(obj,data){
        var hubianma = [];
        obj.innerHTML="";
	    var str = `
         <tr id="tht">
                        <th>户主</th>
                        <th id="sexs">性别</th>
                        <th>年龄</th>
                        <th>家庭人数</th>
                        <th>达标情况</th>
                    </tr>
       ` ;
		for (let i=0;i<data.data.length;i++) {
            hubianma[i] = data.data[i].AAC001;
               str+= `
                    <tr sleep="${i}">
                        <td>${data.data[i].AAC029}</td>
                        <td>${data.data[i].SEX}</td>
                        <td>${data.data[i].AGE}</td>
                        <td>${data.data[i].AAC017}</td>`
                        // <td>${data.data[i].ISSTANDARD}</td>
                if(data.data[i].ISSTANDARD==1){
                    str+=`<td style="color:limegreen">已达标</td>`
                }else{
                    str+=`<td style="color:#DD4F43">未达标</td>`
                }
                  str+=`  </tr>` ;
		}
           obj.innerHTML=str;

           $("body").on('click',"#tablesa1 tr",function(){
			   $('.p-item1-es').html('');
               name1=$(this).children("td:first-child").text();
               if(1){
                   	var num = $(this).attr("sleep");
					   			km = hubianma[num];

					   	var wxreason=document.getElementById('p-lists1')
                          // alert(num)
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

					      $("#p-lists1").css("visibility","visible");

               }else{

               }
           })

			function showreason(wxreason,data){
				 var str = `
				   <div class="t-list" style="font-size: 18px;padding:5px 6px;text-align: left;text-indent:40px;box-sizing:border-box;background: #e2e58b;color:black;">
				        ${data.data}
				    </div>`;
				    $('#hh').html(name1);
			        $('.p-item1-es').html(str);
			}

	}

  });


}


})