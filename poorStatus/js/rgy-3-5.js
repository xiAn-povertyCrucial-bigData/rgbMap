//贫困村县镇村级下钻

$(function(){

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


//////////////zhen
var doms1 = document.getElementById("content6-1-zhen");
//var myCharts1 = echarts.init(doms1);
$("body").on("click"," #c-title2s",function(){
	$('#zhezhao').show();
     str1="";
     $("#content6-1-zhen").css({'opacity':'1','top':'0%'});

     var codeType =  $(this).attr("sleep");
     //alert(codeType)
   	str1 = `
    <h3 class="c-title">各镇街贫困村七项退出指标达标情况统计<span id="content-6zhen-close" class="content-6zhen-close" style="float:right;color: white;padding-right: 10px;">X</span>

    </h3>`;
$.ajax({
            url: url+'villSeven/townSevenIndexs',
            data:{'code':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                //console.log(data)
                    showChangeWuxiang1(doms1,data);

                }

            }
    	})
})

function showChangeWuxiang1(objs,data1){
    objs.innerHTML="";
	var k1=[];
	var k2=[];
	var  kk ;
    for(let i =0; i < data1.data.length; i++){
         k1[i] = data1.data[i].disctId;
         k2[i] = data1.data[i].disctName;
               str1 += `<div class="content6-1-zhen">
					<span style="" sleep="${k1[i]}">${k2[i]}</span>
					<div class="echarts">
						<div id="echarts${i+11}"></div>
					</div>

				</div>`;


    }
     objs.innerHTML=str1;

     	option = null;
        var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data1.data.length;i++) {
			let s = i+11;
		    kk= "echarts"+s;
			var   dom = document.getElementById(kk);
		    kk = echarts.init(dom);
			linNums1[i]=[data1.data[i].aae113No,data1.data[i].aac331No,data1.data[i].aad328No,data1.data[i].aac312No,data1.data[i].aac313No,data1.data[i].aad391No,data1.data[i].aad371No];
	        linNums2[i]=[data1.data[i].aae113Is,data1.data[i].aac331Is,data1.data[i].aad328Is,data1.data[i].aac312Is,data1.data[i].aac313Is,data1.data[i].aad391Is,data1.data[i].aad371Is];
	 	option = {
		    color: ['#DD4F43','#1FA463'],
		     title: {
	        text: '单位:个',
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
		        data: ['人均可支配收入','贫困发生率','通沥青(水泥)路','安全饮水','电力入户率','标准卫生室','集体经济'],
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

		            data: linNums1[i],
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
		            data: linNums2[i],
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
            kk.setOption(option, true);
        }
    }


}


//////////////cun
var sleep;
$("body").on("click",'.content6-1-zhen span',function(){
	$('#cunname1').html($(this).text())
	$("#scroll-yy table").html('');
     sleep = $(this).attr("sleep");
     $("#content6-1-zhen").css({'opacity':'0','top':'-200%'})
     //$("#content6-1-zhen").empty();
     $("#content-6-1-right").css("display","block");
     var obj = $("#content-6-1-right");
       $.ajax({
            url: url+'villSeven/townIndex',
            data:{'code':sleep},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                  //  console.log(data.data);
                    showWu(obj,data);

                }

            }
    	})
})

var hubianhao = [];
function  showWu(obj,data){
    hubianma=[];
   var table = $("#scroll-yy table");
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

$("body").on("click",'#scroll-yy table tr',function(){
	$('#cunreason1').html('');
    //if(1){
        $("#content-6-1-left").css("display","block");
        var obj = $("#content-6-1-left");
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
    //$("#content-6-1-left-name").empty;
    $("#cunming").html(name);

	$('#cun-score').text(data.data.account);
	$('#defen1').html(data.data.aac331)
	$('#defen2').html(data.data.aad328)
	$('#defen3').html(data.data.aac313)
	$('#defen4').html(data.data.aad371)
	$('#defen5').html(data.data.aae113)
	$('#defen6').html(data.data.aac312)
	$('#defen7').html(data.data.aad391)

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

   var reasonspan1=$("#content-6-1-left .t-list .itme-des .t-item ");

   for (var i=0;i<reasonspan1.length;i++) {
			 $("#content-6-1-left .t-list .itme-des .t-item ").eq(i).attr("sleep",i+1);

		};
	$("#content-6-1-left .t-list .itme-des .t-item ").on('click',function(){

	var qxzb=$(this).children('div').find('p:nth-child(2)').text();
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

    //if(1){
        var ger1=document.getElementById('cunreason1')
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
	            <p style='font-size:18px;text-align:left;text-indent:30px;padding:3px;'>
	                ${data.data}
	            </p>`;
	            $('#cunreason1').html(str);
	    }
	//};
})

//////////////

$(".content-6-1close").click(function(){
	$('#zhezhao').hide();
	$(".content-6-1").css({'position':'absolute','opacity':'0','top':'-200%'});
	$("#content-6-1-left").css('display','none');
	$("#content-6-1-right").css('display','none');

	$("#content6-1-zhen").css({'opacity':'0','top':'-200%'});
})

$("body").on("click",".content-6zhen-close",function(){
	$('#zhezhao').hide();
	$(".content-6-1").css({'position':'absolute','opacity':'0','top':'-200%'});
	$("#content6-1-zhen").css({'opacity':'0','top':'-200%'});
})

$("body").on("click",".content-6cun-return",function(){

	$("#content6-1-zhen").css({"opacity":1,'top':'0%'});
	$("#content-6-1-right").css("display","none");
	 $("#content-6-1-left").css("display","none");
})

for(var i=0; i<=$("#content6-1-zhen>.content6-1-zhen>span").length; i++){
	   $("#content6-1-zhen>.content6-1-zhen>span").eq(i).click(function(){
	    $("#content-6-1-right").css("display","block");
		$("#content6-1-zhen").css({'opacity':'0','top':'-200%'});
	   });
}
for(var i=0; i<=$("#content-6-1-right>div table tr").length; i++){
	   $("#content-6-1-right>div table tr").eq(i).find("td:nth-child(2)").click(function(){
	   $("#content-6-1-left").css("display","block");
	   });
}



};

});