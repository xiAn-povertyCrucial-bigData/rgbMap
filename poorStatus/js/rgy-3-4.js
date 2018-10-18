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
		console.log(countryName);


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

//全市贫困户五项退出指标达标情况统计
var y=201808;
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
var km='';
var app = {};
option = null;
option1 = null;
var str = '';
var str1 = '';
var doms= document.getElementById("content4-1-shi");
var myCharts = echarts.init(doms);
$("body").on("click","#c-title2",function(){
	$('#zhezhao').show();
   	str = `
    <h3 class="c-title">各街道贫困户五项退出指标达标情况统计<span id="content-4shi-close" class="content-4shi-close" style="float:right;color: white;padding-right: 10px;">X</span>

    </h3>`;
  $.ajax({
            url: url+'map/five',
            data:{'disctId':codeinging,'year':y},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showChangeWuxiang(myCharts,data);
                }
            }
    	})
})

function showChangeWuxiang(objs,data){
    doms.innerHTML="";
    for(let i =0; i < data.data.length; i++){
     str += `<div class="content4-1-shi">
					<span style="" sleep="${data.data[i][0].AAR008}">${data.data[i][0].AAR009}</span>
					<div class="echarts">
						<div id="echarts-hs${i+1}"></div>
					</div>
				</div>`
    }
     doms.innerHTML=str;
     for(let i =0; i < data.data.length; i++){
 		n=i+1;
 		var ss = "echarts-hs"+n;
    	var do1= document.getElementById(ss);
        var mycharts = echarts.init(do1);
        showdetail(mycharts,data.data[i]);
     }
}
/*****************************贫困户五项退出指标各街道镇情况统计合计********************************************/

function showdetail(mycharts,data){
        option = null;
        var linNames_wuxiang1 = [];
	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=1;i<data.length;i++) {
			 linNames_wuxiang1[data[i].type-1]=data[i].indexName;
             linNums1[data[i].type-1]=data[i].STANDARDNO;
             linNums2[data[i].type-1]=data[i].STANDARDOK;
             type[data[i].type-1]=data[i].type;
		}
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
                top: "15%",
                left: '2%',
                right: '5%',
                bottom: '35%',
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
                triggerEvent:true,
                type: 'category',
                data:linNames_wuxiang1 ,
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
                    barWidth: 10,
                    data:  linNums1,
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
                    data:  linNums2,
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
            mycharts.setOption(option, true);
        }
    }
var doms1 = document.getElementById("content4-1-zhen");
var myCharts1 = echarts.init(doms1);
var zhennames;
$("body").on("click",".content4-1-shi span",function(){
	zhennames=$(this).text()
     str1="";
     $("#content4-1-zhen").css("display","block");
     //$("#content4-1-shi").empty();
     $("#content4-1-shi").css("display","none");
     var codeType =  $(this).attr("sleep");
   	str1 = `
    <h3 class="c-title"><span id='zhennames'></span>贫困户五项退出指标达标情况统计<span id="content-4zhen-close" class="content-4zhen-close" style="float:right;color: white;padding-right: 10px;">X</span>
    	<a class="content-4zhen-return" ></a>
    </h3>`;
    $.ajax({
            url: url+'map/five',
            data:{'disctId':codeType,'year':y},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showChangeWuxiang1(myCharts1,data);
                }
            }
    	})
    $('#cunnames').html($(this).text())
})

function showChangeWuxiang1(objs,data1){
    doms1.innerHTML="";
    for(let i =0; i < data1.data.length; i++){
        var k1 = data1.data[i][0].AAR008;
        var k2 = data1.data[i][0].AAR009;

               str1 += `<div class="content4-1-zhen">
					<span style="" sleep="${k1}">${k2}</span>
					<div class="echarts">
						<div id="echarts-hz${i+11}"></div>
					</div>
				</div>`;

    }
       doms1.innerHTML=str1;
     for(let i =0; i < data1.data.length; i++){
     	  $('#zhennames').html(zhennames)
          n=i+11;
          var bool=true;
	      var ss = "echarts-hz"+n;
	      var do1= document.getElementById(ss);
	      var mycharts = echarts.init(do1);
	      showdetail1(mycharts,data1.data[i]);
     }
}
/*****************************贫困户五项退出指标各街道镇情况统计合计********************************************/

function showdetail1(mycharts1,data){
        var linNames_wuxiang1 = [];
	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=1;i<data.length;i++) {
			//console.log(data[i].indexName),
			 linNames_wuxiang1[data[i].type-1]=data[i].indexName;
             linNums1[data[i].type-1]=data[i].STANDARDNO;
             linNums2[data[i].type-1]=data[i].STANDARDOK;
             type[data[i].type-1]=data[i].type;
		}

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
                top: "15%",
                left: '2%',
                right: '5%',
                bottom: '35%',
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
                triggerEvent:true,
                type: 'category',
                data:linNames_wuxiang1 ,
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
                    barWidth: 10,
                    data:  linNums1,
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
                    data:  linNums2,
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
            mycharts1.setOption(option, true);
        }
    }

$("body").on("click",'.content4-1-zhen span',function(){
	$('#cunnames1').html($(this).text())
	$("#scroll-y table").html('');
     var sleep = $(this).attr("sleep");
     $("#showhide").css("display","block")
     $("#content4-1-zhen").css("display","none")
     //$("#content4-1-zhen").empty();
     $("#content-5-1-right").css("display","block");
     var obj = $("#content-5-1-right");
       $.ajax({
            url: url+'map/house/info/yx',
            data:{'disctId':sleep,"year":y},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showWu(obj,data);
                }
            }
    	})
})

var hubianhao = [];
function  showWu(obj,data){
    hubianma=[];
   var table = $("#scroll-y table");
   var   str2 = `<tr">
			            <th>户主</th>
                        <th id="sexs">性别</th>
                        <th>年龄</th>
                        <th>家庭人数</th>
                        <th>达标情况</th>
			     </tr>`;
   for (let i=0;i<data.data.length;i++) {
     hubianma[i] = data.data[i].AAC001;
              str2+= `
                    <tr sleep="${i}">
                        <td>${data.data[i].AAC029}</td>
                        <td>${data.data[i].SEX}</td>
                        <td>${data.data[i].AGE}</td>
                        <td>${data.data[i].AAC017}</td>`
                        // <td>${data.data[i].ISSTANDARD}</td>
                if(data.data[i].ISSTANDARDOK==0){
                    str2+=`<td style="color:limegreen">已达标</td>`
                }else if(data.data[i].ISSTANDARDOK==1){
                    str2+=`<td style="color:#DD4F43">未达标</td>`
                }else if(data.data[i].ISSTANDARDOK==2){
                    str2+=`<td style="color:yellow">兜底保障</td>`
                }
                  str2+=`  </tr>` ;
	   }
	   table.html(str2);
	   for(var i=0;i<$('#scroll-y table tr').length;i++){
	   		if($('#scroll-y table tr').eq(i).children("td:nth-child(5)").text()=='兜底保障'){
	            $('#scroll-y table tr').eq(i).css('display','none')
	        }
   		}
}

$("body").on("click",'#scroll-y table tr',function(){
	$('#ger1').html('');
     //if($(this).children("td:nth-child(5)").text()=="未达标"){
        $("#content-5-1-left").css("display","block");
        var obj = $("#content-5-1-left")
        var num = $(this).attr("sleep");
        var name = $(this).children("td:nth-child(1)").text();
        km = hubianma[num];
            $.ajax({
                url: url+'map/five/house/five',
                data:{'aac001':km,"year":y},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        showreason1(obj,data,name);
                    }
                }
            })
     //}
})
function showreason1(obj,data,name){
    $("#content-5-1-left-name").children("span:nth-child(1)").empty();
    $("#content-5-1-left-name").children("span:nth-child(1)").html(name+' 五项退出指标详情'+" <span id='hu-score0'></span>"+'分');
 if( data.data.STUDENT!=0){
      $("#content-5-1-left .t-list .p-item2 ").eq(2).addClass('red').removeClass("green");
      $('#hudefen03').html(0);
    }else{
      $("#content-5-1-left .t-list .p-item2 ").eq(2).addClass('green').removeClass('red');
      $('#hudefen03').html(20);
    }
    if( data.data.INSURANCE!=0){
       $("#content-5-1-left .t-list .p-item2 ").eq(3).addClass('red').removeClass('green');
       $('#hudefen04').html(0);
    }else{
       $("#content-5-1-left .t-list .p-item2 ").eq(3).addClass('green').removeClass('red');
       $('#hudefen04').html(20);
    }
    if( data.data.INCOME!=0){
       $("#content-5-1-left .t-list .p-item2 ").eq(0).addClass('red').removeClass('green');
       $('#hudefen01').html(0);
    }else{
       $("#content-5-1-left .t-list .p-item2 ").eq(0).addClass('green').removeClass('red');
        $('#hudefen01').html(20);
    }
    if( data.data.WATER!=0){
        $("#content-5-1-left .t-list .p-item2 ").eq(4).addClass('red').removeClass('green');
        $('#hudefen05').html(0);
    }else{
        $("#content-5-1-left .t-list .p-item2 ").eq(4).addClass('green').removeClass('red');
        $('#hudefen05').html(20);
    }
    if( data.data.HOUSE!=0){
        $("#content-5-1-left .t-list .p-item2 ").eq(1).addClass('red').removeClass('green');
        $('#hudefen02').html(0);
    }else{
        $("#content-5-1-left .t-list .p-item2 ").eq(1).addClass('green').removeClass('red');
        $('#hudefen02').html(20);
    }
    $('#hu-score0').html(parseInt($('#hudefen01').text())+parseInt($('#hudefen02').text())+parseInt($('#hudefen03').text())+parseInt($('#hudefen04').text())+parseInt($('#hudefen05').text()))
}

 var reasonspan1=  $("#content-5-1-left .t-list .p-item2 ");

 for (var i=0;i<reasonspan1.length;i++) {
			 $("#content-5-1-left .t-list .p-item2 ").eq(i).attr("sleep",i+1);

		};
$("#content-5-1-left .t-list .p-item2 ").on('click',function(){
    //if($(this).hasClass('red')){
        var ger1=document.getElementById('ger1')
        $.ajax({
                url:url+ 'map/five/index/reason',
                data:{"year":y,'type':$(this).attr('sleep'),'aac001':km},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        showreason11(ger1,data);
                    }
                }
	    })
	    function showreason11(ger,data){
	            var str = `
	            <p style='font-size:18px;text-align:center;'>
	                ${data.data}
	            </p>`;
	            $('#ger1').html(str);
	    }
	//};
})

/****************************echarts-6贫困户五项退出指标达标情况统计*************************************/

option = {
    color: ['#DD4F43','#1FA463'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
	title: {
	        text: '单位:户',
	        textStyle:{    //图例文字的样式
		        color:'#fff',
		        fontSize:graph_unit
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
        bottom: '30%',
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
//长安区贫困户五项 单项指标点击

if (option && typeof option === "object") {
    myChart6.setOption(option, true);
}

myChart6.on('click', function (params) {

        if(params.componentType == "xAxis"){
        	$('#zhezhao').show();
            $('.contents5').show();
            $('#qixiang1').text(params.value);
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
	    $("#xianwuxiang").text(params.value);
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang2[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             xianbianma[i]=data.data[i].AAR008;
             //console.log(linNums2[i]);
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
                    bottom: '25%',
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
    var kk;
    $('#cunname3').text(params.value);
    $('#rjtit').html('');
    $('#tablesw').html('');
    $('#yuanyin').html('');
    $('#p-list13').html('');
        if(params.componentType == "xAxis"){
        	for (var i=0;i<linNames_wuxiang2.length;i++) {
			   if(params.value==linNames_wuxiang2[i]){
			   	 kk = xianbianma[i];
			   	}
		    }
		}
            // $("#content-5-2-mid #mid-bottom").css({'opacity':'1','top':'100%'});

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
            myChart13.setOption({
                   legend: {
                    data: ['未达标', '已达标'],
                    x : 'right',
                    textStyle:{    //图例文字的样式
                        color:'#fff'
                    }
                },
                    grid: {
                    top: "15%",
                    left: '0%',
                    right: '7%',
                    bottom: '25%',
                    containLabel: true
                },
                xAxis: {
                        data: linNames_wuxiang3 ,
                         axisLabel:{
                            interval:0,
                            rotate:-50,
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
    $('#tablesw').html('');
    $('#yuanyin').html('');
    $('#p-list13').html('');
	var kk1;
	$('#rjtit').html(params.value)
        if(params.componentType == "xAxis"){
       		for (var i=0;i<linNames_wuxiang3.length;i++) {
			   if(params.value==linNames_wuxiang3[i]){
			   	 kk1 = zhenbianma[i];
			   	}
			}
		 }

  var table = document.getElementById("tablesw");
   $.ajax({
            url:url+ 'map/five/index/house',
            data:{"year":y,'type':j,'disctId':kk1},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
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

           $("body").on('click',"#tablesw tr",function(){
		    $('#p-list13').html('');
           	yuanyin=$(this).children("td:first-child").text()

               if(1){
                   	var num = $(this).attr("sleep");
					   			km = hubianma[num];
					   	var wxreason=document.getElementById('p-list13')
						 $.ajax({
						            url:url+ 'map/five/index/reason',
						            data:{"year":y,'type':j,'aac001':km},
						            method: "post",
						            dataType: "json",
						            success: function(data){
						                if (data.code == 2000){
						                    showreason(wxreason,data);
						                }
						            }
						    })

					      $("#p-list13").css("visibility","visible");
               }else{
               }
          })
				function showreason(wxreason,data){

					 var str = `
					 	<h3><span id='yuanyin'></span>达标情况</h3>
					   <div class="t-list" style="font-size: 18px;text-align: left;text-indent:30px;padding:3px;background:#e2e58b;color:black;">
					        ${data.data}
					    </div>`;
				        $('#p-list13').html(str);
				        $('#yuanyin').html(yuanyin)
				}
	}
});


 $("body").on("click",".content-4zhen-return",function(){
	$("#content4-1-zhen").css("display","none");
    $("#content4-1-shi").css("display","block");
})
$("body").on("click",".content-5cun-return",function(){
	 $("#content4-1-zhen").css("display","block")
	 document.getElementById("showhide").style.display = "none";
     $("#content-5-1-right").css("display","none");
     $("#content-5-1-left").css("display","none");
})


 }


})