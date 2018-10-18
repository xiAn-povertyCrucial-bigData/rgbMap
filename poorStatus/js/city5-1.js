$(document).ready(function(){

/******************************全市贫困户五项退出指标统计 点击标题 县镇村下钻***************************************/
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
$("body").on("click",".content-5 .c-title",function(){
	$('#zhezhao').show();
   	str = `
    <h3 class="c-title">全市各区县贫困户五项退出指标达标情况统计<span id="content-5shi-close" class="content-5shi-close" style="float:right;color: white;padding-right: 10px;">X</span>

    </h3>`;
  $.ajax({
            url: url+'map/five',
            data:{'year':y,'disctId':610100000000},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showChangeWuxiang(myCharts,data);
                }
            }
    	})
    $(".content-5-1").css({"opacity":1,'top':'11%'});
	$("#content5-1-shi").css({"opacity":1,'top':'0%'});
})

function showChangeWuxiang(objs,data){
    doms.innerHTML="";
    for(let i =0; i < data.data.length; i++){
     str += `<div class="content5-1-shi">
				<span sleep="${data.data[i][0].AAR008}">${data.data[i][0].AAR009}</span>
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
/*****************************全市贫困户五项退出指标各区县情况统计合计********************************************/
function showdetail(mycharts,data){
        option = null;
        var linNames_wuxiang1 = [];
	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
			for (let j=1;j<data.length;j++) {
				 linNames_wuxiang1[data[j].type-1]=data[j].indexName;
		         linNums1[data[j].type-1]=data[j].STANDARDNO;
		         linNums2[data[j].type-1]=data[j].STANDARDOK;
		         type[data[j].type-1]=data[j].type;
			}
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
            mycharts.setOption(option, true);
        }
   }
//////////////////////镇
var doms1 = document.getElementById("content5-1-zhen");
var myCharts1 = echarts.init(doms1);
var xianmingwx
$("body").on("click",".content5-1-shi span",function(){
	 xianmingwx=$(this).html()
     str1="";
     $("#content5-1-zhen").css({"opacity":1,'top':'0%'});
     //$("#content5-1-shi").empty();
     $("#content5-1-shi").css({"opacity":0,'top':'-130%'});
     var codeType =  $(this).attr("sleep");
   	str1 = `
    <h3 class="c-title"><span id="xianmingwx"></span>各镇街贫困户五项退出指标达标情况统计<span id="content-5zhen-close" class="content-5zhen-close" style="float:right;color: white;padding-right: 10px;">X</span>
    <a class="content-5zhen-return" id='content-5zhen-return'></a>
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
						<span sleep="${k1}">${k2}</span>
						<div class="echarts">
							<div id="echarts-hz${i+11}"></div>
						</div>
					</div>`;
    }

     doms1.innerHTML=str1;
     for(let i =0; i < data1.data.length; i++){
        $('#xianmingwx').html(xianmingwx)
        n=i+11;
		var ss = "echarts-hz"+n;
		var do1= document.getElementById(ss);
	    var mycharts = echarts.init(do1);
    	showdetail(mycharts,data1.data[i]);
     }
}
/*****************************周至县贫困户五项退出指标各街道镇情况统计合计********************************************/
function showdetail1(mycharts,data){
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
//////////////////村
var doms01 = document.getElementById("content5-1-cun");
var myCharts01 = echarts.init(doms01);
var zhenmingwx
$("body").on("click",".content5-1-zhen span",function(){
	 zhenmingwx=$(this).html()
     str1="";
     $("#content5-1-cun").css({"opacity":1,'top':'0%'});
     //$("#content5-1-zhen").empty();
     $("#content5-1-zhen").css({"opacity":0,'top':'-130%'});
     var codeType =  $(this).attr("sleep");
   	str1 = `
    <h3 class="c-title"><span id="zhenmingwx"></span>各村贫困户五项退出指标达标情况统计<span id="content-5cun-close" class="content-5cun-close" style="float:right;color: white;padding-right: 10px;">X</span>
    <a class="content-5cun-return" id='content-5cun-return'></a>
    </h3>`;

    $.ajax({
        url: url+'map/five',
        data:{'disctId':codeType,'year':y},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showChangeWuxiang01(myCharts01,data);
            }
        }
	})
})

function showChangeWuxiang01(objs,data1){
    doms01.innerHTML="";
    for(let i =0; i < data1.data.length; i++){
        var k1 = data1.data[i][0].AAR008;
        var k2 = data1.data[i][0].AAR009;
        str1 += `<div class="content5-1-cun">
			<span sleep="${k1}">${k2}</span>
			<div class="echarts">
				<div id="echarts-hc${i+111}"></div>
			</div>
		</div>`;
    }
     doms01.innerHTML=str1;
     for(let i =0; i < data1.data.length; i++){
            n=i+111;
            $('#zhenmingwx').html(zhenmingwx)
		    var bool=true;
		    var ss = "echarts-hc"+n;
		    var do1= document.getElementById(ss);
		    var mycharts = echarts.init(do1);
		    showdetai01(mycharts,data1.data[i]);
     }
}
/*****************************周至县贫困户五项退出指标各街道镇情况统计合计********************************************/
function showdetai01(mycharts,data){
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
                    barWidth: 10,
                    data:  linNums1,
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
            mycharts.setOption(option, true);
        }
    }


$("body").on("click",'.content5-1-cun span',function(){
	$('#cunname').html($(this).text())
	$("#scroll-y table").html('');
	$('#huming0').html('');
	$('#huwxreason').html('');
    sleep = $(this).attr("sleep");
    $(".content-5-1").css({"opacity":1,'top':'11%'});
    $("#content5-1-cun").css({"opacity":0,'top':'-130%'});
     $("#content-5-1-right").css("display","block");
     var obj = $("#content-5-1-right");
       $.ajax({
            url: url+'map/house/info/yx',
            data:{'disctId':sleep,"year":y},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    //$("#scroll-y table").html('')
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
                    str2+=`<td style="color:#DD4F43">未达标</td>`
                }else if(data.data[i].ISSTANDARDOK==2){
                    str2+=`<td style="color:yellow">兜底保障</td>`
                }
                  str2+=`  </tr>` ;

   }
   table.html(str2);
   for(var i=0;i<$('#content-5-1-right >div> table tbody tr').length;i++){
   		if($('#content-5-1-right >div> table tbody tr').eq(i).children("td:nth-child(5)").text()=='兜底保障'){
            $('#content-5-1-right >div> table tbody tr').eq(i).css('display','none')
        }
   }

}

$("body").on("click",'#content-5-1-right >div> table tr',function(){
    //if($(this).children("td:nth-child(5)").text()=="未达标"){
		$('#huwxreason').html('');
        $("#content-5-1-left").css("display","block");
        var obj = $("#content-5-1-left");
        var name = $(this).children("td:nth-child(1)").text();
        var num = $(this).attr("sleep");
        km = hubianma[num];
        $('#huming0').text($(this).children("td:nth-child(1)").text())
            $.ajax({
                url: url+'map/five/house/five',
                data:{'aac001':km,"year":y,'disctId':sleep},
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
    //$("#content-5-1-left-name").empty;
    $("#content-5-1-left-name").html(name+'户五项退出指标详情 得分'+"<span id='hu-score0'></span>"+'分');
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

 var reasonspan1=  $("#content-5-1-left .t-list .itme-des .t-item  ");

 for (var i=0;i<reasonspan1.length;i++) {
			 $("#content-5-1-left .t-list .itme-des .t-item  ").eq(i).attr("sleep",i+1);

		};
$("#content-5-1-left .t-list .itme-des .t-item  ").on('click',function(){
    //if($(this).hasClass('red')){
        var ger1=document.getElementById('huwxreason')
        $.ajax({
                url:url+ 'map/five/index/reason',
                data:{"year":y,'type':$(this).attr('sleep'),'aac001':km,'disctId':sleep},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        //console.log("ok");
                        showreason11(ger1,data);
                    }
                }
    	})
	    function showreason11(ger,data){
	            var str = `
	            <p style='font-size:18px'>
	                ${data.data}
	            </p>`;
	            $('#huwxreason').html(str);
	    }
	//};
})

$(".content-5-1close").click(function(){
	$('#zhezhao').hide();
	$(".content-5-1").css({'position':'absolute','opacity':'0','top':'-130%'});
	$("#content-5-1-left").css('display','none');
	$("#content-5-1-right").css('display','none');
	$("#content5-1-shi").css({'opacity':'0','top':'-130%'});
	$("#content5-1-zhen").css({'opacity':'0','top':'-130%'});
})
 $("body").on("click","#content-5shi-close",function(){
 	$('#zhezhao').hide();
 	$(".content-5-1").css({'position':'absolute','opacity':'0','top':'-130%'});
    $("#content5-1-shi").css({'opacity':'0','top':'-130%'});
})
 $("body").on("click","#content-5zhen-close",function(){
 	$('#zhezhao').hide();
 	$(".content-5-1").css({'position':'absolute','opacity':'0','top':'-130%'});
    $("#content5-1-zhen").css({'opacity':'0','top':'-130%'});
})
 $("body").on("click","#content-5cun-close",function(){
 	$('#zhezhao').hide();
 	$(".content-5-1").css({'position':'absolute','opacity':'0','top':'-130%'});
    $("#content5-1-cun").css({'opacity':'0','top':'-130%'});
})

$("body").on("click","#content-5zhen-return",function(){

	$(".content-5-1").css({"opacity":1,'top':'11%'});
	$("#content5-1-zhen").css({'opacity':'0','top':'-130%'});
	$("#content5-1-shi").css({"opacity":1,'top':'0%'});
})
$("body").on("click","#content-5cun-return",function(){

	$(".content-5-1").css({"opacity":1,'top':'11%'});
	$("#content5-1-cun").css({'opacity':'0','top':'-130%'});
	$("#content5-1-zhen").css({"opacity":1,'top':'0%'});
})
$("body").on("click","#content-5hu-return",function(){

	$(".content-5-1").css({"opacity":1,'top':'11%'});
	$("#content5-1-cun").css({"opacity":1,'top':'0%'});
	$("#content-5-1-right").css("display","none");
	 $("#content-5-1-left").css("display","none");
})
for(var i=0; i<=$(".content-5-1>#content5-1-shi>.content5-1-shi span").length; i++){
	   $(".content-5-1>#content5-1-shi>.content5-1-shi span").eq(i).click(function(){
	     $("#content5-1-zhen").css({'opacity':'1','top':'0%'})
		 $("#content5-1-shi").css({'opacity':'0','top':'-130%'});
	   });
}
for(var i=0; i<=$("#content5-1-zhen>.content5-1-zhen>span").length; i++){
	   $("#content5-1-zhen>.content5-1-zhen>span").eq(i).click(function(){
	    $("#content-5-1-right").css("display","block");
		$("#content5-1-zhen").css({'opacity':'0','top':'-130%'});
	   });
}
for(var i=0; i<=$("#content5-1-cun>.content5-1-cun>span").length; i++){
	   $("#content5-1-cun>.content5-1-cun>span").eq(i).click(function(){
	    $("#content-5-1-right").css("display","block");
		$("#content5-1-cun").css({'opacity':'0','top':'-130%'});
	   });
}
for(var i=0; i<=$("#content-5-1-right>div table tr").length; i++){
	   $("#content-5-1-right>div table tr").eq(i).find("td:nth-child(2)").click(function(){
	   $("#content-5-1-left").css("display","block");
	   });
}

})