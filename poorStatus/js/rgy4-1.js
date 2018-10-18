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
		            aa(codeinging);
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

/******************************贫困户五项退出指标统计 点击标题 县镇村下钻***************************************/
var y=201808;
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
var doms= document.getElementById("content5-1-shi");
var myCharts = echarts.init(doms);
$("body").on("click","#c-title1",function(){
	$('#zhezhao').show();
   	str = `
    <h3 class="c-title">各镇街贫困户五项退出指标达标情况统计<span id="content-5shi-close" class="content-5shi-close" style="float:right;color: white;padding-right: 10px;">X</span></h3>`;
  $.ajax({
            url: url+'map/five',
            data:{'year':y,'disctId':codeinging},
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
     str += `<div class="content5-1-shi">
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
var doms1 = document.getElementById("content5-1-zhen");
var myCharts1 = echarts.init(doms1);
var cunnames;
$("body").on("click",".content5-1-shi span",function(){
	cunnames=$(this).text();
     str1="";
     $(".content-5-1").css({"opacity":1,'top':'50%'});
     $("#content5-1-zhen").css({"opacity":1,'top':'2%'});
     //$("#content5-1-shi").empty();
     $("#content5-1-shi").css({"opacity":0,'top':'-200%'});
     var codeType =  $(this).attr("sleep");
   	str1 = `
    <h3 class="c-title"><span id='cunnames'></span>各村贫困户五项退出指标达标情况统计<span id="content-5zhen-close" class="content-5zhen-close" style="float:right;color: white;padding-right: 10px;">X</span>
    	<a class="content-5zhen-return" ></a>
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
})

function showChangeWuxiang1(objs,data1){
    doms1.innerHTML="";
    for(let i =0; i < data1.data.length; i++){
        var k1 = data1.data[i][0].AAR008;
        var k2 = data1.data[i][0].AAR009;

                str1 += `<div class="content5-1-zhen">
					<span style="" sleep="${k1}">${k2}</span>
					<div class="echarts">
						<div id="echarts-hz${i+11}"></div>
					</div>
				</div>`;

    }
       doms1.innerHTML=str1;
       for(let i =0; i < data1.data.length; i++){
       	    $('#cunnames').html(cunnames)
            n=i+11;
            var bool=true;
		    var ss = "echarts-hz"+n;
		    var do1= document.getElementById(ss);
		    var mycharts = echarts.init(do1);
		    showdetail1(mycharts,data1.data[i]);
       }
}

/*****************************周至县贫困户五项退出指标各街道镇情况统计合计********************************************/

function showdetail1(mycharts1,data){
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
            mycharts1.setOption(option, true);
        }
    }

$("body").on("click",'.content5-1-zhen span',function(){
	$('#cunnamess').text($(this).text());
	$("#scroll-y table").html('');
	$('#huming').html('');
	$('#cunreason').html('');
     var sleep = $(this).attr("sleep");
  	 $(".content-5-1").css({"opacity":1,'top':'50%'});
     $("#content5-1-zhen").css({"opacity":0,'top':'-200%'});
     //$("#content5-1-zhen").empty();
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
                if(data.data[i].ISSTANDARDOK==1){
                    str2+=`<td style="color:limegreen">已达标</td>`
                }else if(data.data[i].ISSTANDARDOK==0){
                    str2+=`<td style="color:red">未达标</td>`
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
	$('#cunreason').html('');
    //if($(this).children("td:nth-child(5)").text()=="未达标"){
    	$('#huming').text($(this).children("td:nth-child(1)").text())
        $("#content-5-1-left").css("display","block");
        var obj = $("#content-5-1-left");
        var name = $(this).children("td:nth-child(1)").text();
        var num = $(this).attr("sleep");
        km = hubianma[num];
            $.ajax({
                url: url+'map/five/house/five',
                data:{'aac001':km,"year":y},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                    //  console.log(data.data);
                        showreason1(obj,data,name);

                    }

                }
            })
    //}
})
function showreason1(obj,data,name){
    $("#content-5-1-left-name").empty;
    $("#content-5-1-left-name").html(name+'户五项退出指标详情');
 if( data.data.STUDENT!=0){
      $("#color3 ").addClass('red').removeClass("green");
      $('#hudefen03').html(0);
    }else{
      $("#color3 ").addClass('green').removeClass('red');
      $('#hudefen03').html(20);
    }
    if( data.data.INSURANCE!=0){
       $("#color4").addClass('red').removeClass('green');
       $('#hudefen04').html(0);
    }else{
       $("#color4").addClass('green').removeClass('red');
       $('#hudefen04').html(20);
    }
    if( data.data.INCOME!=0){
       $("#color1").addClass('red').removeClass('green');
       $('#hudefen01').html(0);
    }else{
       $("#color1").addClass('green').removeClass('red');
       $('#hudefen01').html(20);
    }
    if( data.data.WATER!=0){
        $("#color5").addClass('red').removeClass('green');
        $('#hudefen05').html(0);
    }else{
        $("#color5").addClass('green').removeClass('red');
        $('#hudefen05').html(20);
    }
    if( data.data.HOUSE!=0){
        $("#color2").addClass('red').removeClass('green');
        $('#hudefen02').html(0);
    }else{
        $("#color2").addClass('green').removeClass('red');
        $('#hudefen02').html(20);
    }
    $('#hu-score0').html(parseInt($('#hudefen01').text())+parseInt($('#hudefen02').text())+parseInt($('#hudefen03').text())+parseInt($('#hudefen04').text())+parseInt($('#hudefen05').text()))
}

 var reasonspan1=  $("#content-5-1-left .t-list .itme-des .t-item ");

 for (var i=0;i<reasonspan1.length;i++) {
			 $("#content-5-1-left .t-list .itme-des .t-item ").eq(i).attr("sleep",i+1);

		};
$("#content-5-1-left .t-list .itme-des .t-item ").on('click',function(){
    //if($(this).hasClass('red')){
        var cunreason=document.getElementById('cunreason')
        $.ajax({
                url:url+ 'map/five/index/reason',
                data:{"year":y,'type':$(this).attr('sleep'),'aac001':km},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        //console.log("ok");
                        showreason11(cunreason,data);
                    }
                }
	    })
	    function showreason11(cunreason,data){
	            var str = `
	            <p style='font-size:17px'>
	                ${data.data}
	            </p>`;
	            $('#cunreason').html(str);
	    }
	//};
})

$("body").on("click",".content-5zhen-return",function(){
	$(".content-5-1").css({"opacity":1,'top':'50%'});
    $("#content5-1-zhen").css({"opacity":1,'top':'-200%'});
    $("#content5-1-shi").css({"opacity":1,'top':'2%'});
})
$("body").on("click",".content-5cun-return",function(){

	 $(".content-5-1").css({"opacity":1,'top':'50%'});
     $("#content5-1-zhen").css({"opacity":1,'top':'2%'});
     $("#content-5-1-right").css("display","none");
     $("#content-5-1-left").css("display","none");
})


}


})