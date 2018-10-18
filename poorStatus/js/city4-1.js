$(document).ready(function(){

/******************************贫困cun qi项退出指标统计 点击标题 县镇村下钻***************************************/
var linNames_wuxiang2 = [];
var linNames_wuxiang3 = [];
var linNames_wuxiang4 = [];
var xianbianma = [];
var zhenbianma = [];
var cunbianma = [];
var hubianma = [];
var hubianma1 = [];
var j;
var zb;
var km='';
var app = {};
option = null;
option1 = null;
var str = '';
var str1 = '';
var doms= document.getElementById("content4-1-shi");
var myCharts = echarts.init(doms);
$("body").on("click",".content-4s .c-title",function(){
	$('#zhezhao').show();
	$("#content-4-1-left").css("display","none");
   	str = `
    <h3 class="c-title">全市各区县贫困村七项退出指标达标情况统计<span id="content-4shi-close" class="content-4shi-close" style="float:right;color: white;padding-right: 10px;">X</span>
    </h3>`;
$.ajax({
            url: url+'villSeven/cntySevenIndexs',
            //data:{'disctId':610100000000},
            data:{},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                   showChangeWuxiang(myCharts,data);
                }
            }
    	})
    	$(".content-4-1").css({"opacity":1,'top':'11%'});
		$("#content4-1-shi").css({"opacity":1,'top':'0%'});
})

function showChangeWuxiang(objs,data){
    doms.innerHTML="";
    for(let i =0; i < data.data.length; i++){
     str += `<div class="content4-1-shi">
					<span style="" sleep="${data.data[i].disctId}">${data.data[i].disctName}</span>
					<div class="echarts">
						<div id="echarts-cs${i+1}"></div>
					</div>
				</div>`
    }
     doms.innerHTML=str;
     for(let i =0; i < data.data.length; i++){
         getjie(data.data[i].disctId,i+1);
     }
}
/*****************************周至县贫困户五项退出指标各街道镇情况统计合计********************************************/
function getjie(data,n){
    var ss = "echarts-cs"+n;
    var do1= document.getElementById(ss);
    // var doms= document.getElementById("content4-1-shi");
     var mycharts = echarts.init(do1);
    $.ajax({
            url: url+'villSeven/aCntySevenIndexs',
            data:{"code":data},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showdetail(mycharts,data);
                }else if(data.code == 1005){
                    $("#"+ss).parent().parent().remove();
                }
            }
    	})
}

function showdetail(mycharts,data){
        option = null;
        var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
        linNums1=[data.data.aae113No,data.data.aac331No,data.data.aad328No,data.data.aac312No,data.data.aac313No,data.data.aad391No,data.data.aad371No];
        linNums2=[data.data.aae113Is,data.data.aac331Is,data.data.aad328Is,data.data.aac312Is,data.data.aac313Is,data.data.aad391Is,data.data.aad371Is];
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
		        type: 'category',
		        triggerEvent:true,
		        data: ['人均可支配收入','贫困发生率','通沥青(水泥)路','安全饮水','电力入户率','标准卫生室','集体经济'],
		        axisLabel:{
		        	interval:0,
		        	rotate:-54,
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

		            data: linNums1,
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
		            data: linNums2,
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

//////////////zhen
var doms1 = document.getElementById("content4-1-zhen");
var qxm;
var str1;
//var myCharts1 = echarts.init(doms1);
$("body").on("click",".content4-1-shi span",function(){
	 qxm=$(this).html();
     str1="";
     $("#content4-1-zhen").css({'opacity':'1','top':'1%'});
     //$("#content4-1-shi").empty();
     $("#content4-1-shi").css({'opacity':'0','top':'-200%'});
     var codeType =$(this).attr("sleep");
   	str1 = `
    <h3 class="c-title"><span id='qxm'></span>各镇街贫困村七项退出指标达标情况统计<span id="content-4zhen-close" class="content-4zhen-close" style="float:right;color: white;padding-right: 10px;">X</span>
    	<a class="content-4zhen-return" ></a>
    </h3>`;

	$.ajax({
            url: url+'villSeven/townSevenIndexs',
            data:{'code':codeType},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showChangeWuxiang1(doms1,data,str1);
                }
            }
    	})
	})

function showChangeWuxiang1(objs,data1,str1){

  //  objs.innerHTML="";
	var k1=[];
	var k2=[];
	var str2;
	var  kk ;
    for(let i =0; i < data1.data.length; i++){
         k1[i] = data1.data[i].disctId;
         k2[i] = data1.data[i].disctName;
               str1 += `<div class="content4-1-zhen">
					<span style="" sleep="${k1[i]}">${k2[i]}</span>
					<div class="echarts">
						<div id="echarts-cz${i+11}"></div>
					</div>
				</div>`;

    }
    objs.innerHTML=str1;
     	option = null;
     	$('#qxm').html(qxm);
        var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data1.data.length;i++) {
			let s = i+11;
		    kk= "echarts-cz"+s;
			var  dom = document.getElementById(kk);
		    kk = echarts.init(dom);
			linNums1[i]=[data1.data[i].aae113No,data1.data[i].aac331No,data1.data[i].aad328No,data1.data[i].aac312No,data1.data[i].aac313No,data1.data[i].aad391No,data1.data[i].aad371No];
	        linNums2[i]=[data1.data[i].aae113Is,data1.data[i].aac331Is,data1.data[i].aad328Is,data1.data[i].aac312Is,data1.data[i].aac313Is,data1.data[i].aad391Is,data1.data[i].aad371Is];
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
		        type: 'category',
		        triggerEvent:true,
		        data: ['人均可支配收入','贫困发生率','通沥青(水泥)路','安全饮水','电力入户率','标准卫生室','集体经济'],
		        axisLabel:{
		        	interval:0,
		        	rotate:-54,
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

		            data: linNums1[i],
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
		            data: linNums2[i],
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
            kk.setOption(option, true);
        }
    }

}

//////////////cun
var sleep;
$("body").on("click",'.content4-1-zhen span',function(){
	$('#cm').html('');
	$('#ger1').html('');
     sleep = $(this).attr("sleep");
     var zjm=$(this).text();
     $("#content4-1-zhen").css({'opacity':'0','top':'-200%'})
     //$("#content4-1-zhen").empty();
     $("#content-4-1-right").css("display","block");
     var obj = $("#content-4-1-right");
     $('#zjm').text(zjm);
       $.ajax({
            url: url+'villSeven/townIndex',
            data:{'code':sleep},
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
		            <th>村名</th>
                    <th>贫困村标志</th>
		         </tr>`;
   for (let i=0;i<data.data.length;i++) {
     hubianma[i] = data.data[i].disctId;
              str2+= `
                    <tr sleep="${i}">
                        <td>${data.data[i].vill}</td> `
                if(data.data[i].isReach=='是'){
                    str2+=`<td style="color:limegreen">已达标</td>`
                }else if(data.data[i].isReach=='否'){
                    str2+=`<td style="color:#DD4F43">未达标</td>`
                }
                  str2+=`  </tr>` ;
   }
   table.html(str2);
}

$("body").on("click",'#scroll-y table tr',function(){
	$('#ger1').html('');
	$('#cm').text($(this).children("td:nth-child(1)").text());
    //if($(this).children("td:nth-child(2)").text()=="未达标"){
        $("#content-4-1-left").css("display","block");
        var obj = $("#content-4-1-left");
        var name = $(this).children("td:nth-child(1)").text();
        var num = $(this).attr("sleep");
        km = hubianma[num];
            $.ajax({
                url: url+'villSeven/villIndexs',
                data:{'code':km},
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
    //$("#content-4-1-left-name").empty;
    $("#content-4-1-left-name").html(name+'七项退出指标详情');
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
      $("#color01 ").addClass('red').removeClass("green");
    }else{
      $("#color01 ").addClass('green').removeClass('red');
    }
    if( data.data.aad328==0){
       $("#color02").addClass('red').removeClass('green');
    }else{
       $("#color02").addClass('green').removeClass('red');
    }
    if( data.data.aac313==0){
       $("#color03").addClass('red').removeClass('green');
    }else{
       $("#color03").addClass('green').removeClass('red');
    }
    if( data.data.aad371==0){
        $("#color04").addClass('red').removeClass('green');
    }else{
        $("#color04").addClass('green').removeClass('red');
    }
    if( data.data.aae113==0){
        $("#color05").addClass('red').removeClass('green');
    }else{
        $("#color05").addClass('green').removeClass('red');
    }
    if( data.data.aac312==0){
        $("#color06").addClass('red').removeClass('green');
    }else{
        $("#color06").addClass('green').removeClass('red');
    }
    if( data.data.aad391==0){
        $("#color07").addClass('red').removeClass('green');
    }else{
        $("#color07").addClass('green').removeClass('red');
    }
}

   var reasonspan1=$("#content-4-1-left .t-list .itme-des .t-item ");

   for (var i=0;i<reasonspan1.length;i++) {
			 $("#content-4-1-left .t-list .itme-des .t-item ").eq(i).attr("sleep",i+1);

		};
	$("#content-4-1-left .t-list .itme-des .t-item ").on('click',function(){

	var qxzb=$(this).children('div').find('p:nth-child(2)').text();
				 //alert(qxzb)
				  switch(qxzb){
				    case '贫困发生率低于3%':
				      zb='aac331';
				      break;
				    case '行政村通沥青(水泥)路':
				      zb='aad328';
				      break;
				    case '电力入户率达到100%':
				      zb='aac313';
				      break;
				    case '有集体经济或合作组织、互助资金组织':
				      zb='aad371';
				      break;
				    case '退出村中脱贫户家庭年人均纯收入占全县农村居民年人均纯收入比重高于上年水平':
				      zb='aae113';
				      break;
				    case '有安全饮水':
				      zb='aac312';
				      break;
				    case '有标准化村卫生室':
				      zb='aad391';
				      break;
				  }

    //if($(this).hasClass('red')){
        var ger1=document.getElementById('ger1')
        $.ajax({
                url:url+ 'villSeven/aIndexReason',
                data:{'index':zb,'code':km,'zcode':sleep},
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
            <h3>指标达标情况</h3>
            <p style="font-size:14px">
                ${data.data}
            </p>`;
            $('#ger1').html(str);
    }
    //};
})
//////////////

$(".content-4 .c-title").click(function(){
	$('#zhezhao').show();
	$(".content-4-1").css({"opacity":1,'top':'11%'});
	$("#content4-1-shi").css({"opacity":1,'top':'1%'});
})
$(".content-4-1close").click(function(){
	$('#zhezhao').hide();
	$(".content-4-1").css({'position':'absolute','opacity':'0','top':'-200%'});
	$("#content-4-1-left").css('display','none');
	$("#content-4-1-right").css('display','none');
	$("#content4-1-shi").css({'opacity':'0','top':'-200%'});
	$("#content4-1-zhen").css({'opacity':'0','top':'-200%'});
})

$("#content4-1-shi").on('click', '.content-4shi-close',function(){
  	$('#zhezhao').hide();
	$(".content-4-1").css({'position':'absolute','opacity':'0','top':'-200%'});
	$("#content4-1-shi").css({'opacity':'0','top':'-200%'});
});
$("body").on("click",".content-4zhen-close",function(){
	$('#zhezhao').hide();
	$(".content-4-1").css({'position':'absolute','opacity':'0','top':'-200%'});
	$("#content4-1-zhen").css({'opacity':'0','top':'-200%'});
})
$("body").on("click",".content-4zhen-return",function(){

	$("#content4-1-zhen").css({'opacity':'0','top':'-200%'});
	$("#content4-1-shi").css({"opacity":1,'top':'1%'});
})
$("body").on("click",".content-4cun-return",function(){

	$("#content4-1-zhen").css({"opacity":1,'top':'1%'});
	$("#content-4-1-right").css("display","none");
	 $("#content-4-1-left").css("display","none");
})

for(var i=0; i<=$(".content-4-1>#content4-1-shi>.content4-1-shi span").length; i++){
	   $(".content-4-1>#content4-1-shi>.content4-1-shi span").eq(i).click(function(){
	     $("#content4-1-zhen").css({'opacity':'1','top':'1%'})
		 $("#content4-1-shi").css({'opacity':'0','top':'-200%'});
	   });
}
for(var i=0; i<=$("#content4-1-zhen>.content4-1-zhen>span").length; i++){
	   $("#content4-1-zhen>.content4-1-zhen>span").eq(i).click(function(){
	    $("#content-4-1-right").css("display","block");
		$("#content4-1-zhen").css({'opacity':'0','top':'-200%'});
	   });
}
for(var i=0; i<=$("#content-4-1-right>div table tr").length; i++){
	   $("#content-4-1-right>div table tr").eq(i).find("td:nth-child(2)").click(function(){
	   $("#content-4-1-left").css("display","block");
	   });
}

})