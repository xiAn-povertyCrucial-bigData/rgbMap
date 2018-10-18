//全市的贫困县村户信息
$(function(){
var dom3 = document.getElementById("echarts-3");
var myChart3 = echarts.init(dom3);
var colorL=['#DD4F43','#FFCE43','#1FA463'];
    var element=['已达标','兜底保障','未达标'];
    var Element=element;
    option = {
        tooltip : {
            trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : ''        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
//  legend: {
//      x:"right",
//      y:"-5%",
//      data:Element,
//      itemGap: 6 ,
//      itemWidth : 25,
//      itemHeight : 15 ,
//      selectedMode: false,
//      formatter: function(v) {
//         return v ;
//     },
//     textStyle:{
//      fontSize:graph_x,
//      color: '#fff'
//  	}
//  },
    grid: {
        left: '3%',
        right: '12%',
        bottom: '-5%',
        top : '-22%',
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
                fontSize:graph_x
            }
        },
        data:['贫困村'],
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
            data:0
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
/*全市贫困状态概况---贫困村点击事件*/
    myChart3.on("click",function(){
        $(".tank-2").css("display","block");
        $("#zhezhao").css("display","block");
        //渲染数据
        let nameList=$("#nameList");
        $.ajax({
            url:url+"/map/house/vill/detail",
            type:"post",
            data:{"distictName":610100000000},
            dataType:"json",
            success:function(data){
                if(data.code===2000){
                    showList(nameList, data.data);
                    for(let i=0;i<data.data.length;i++){
                        if($("#nameList li .statuss").eq(i).text()=="否"){
                            $("#nameList li .statuss").eq(i).text("未达标").css("color","#DD4F43");
                        }else if($("#nameList li .statuss").eq(i).text()=="是"){
                            $("#nameList li .statuss").eq(i).text("已达标").css("color","#1FA463");
                        }
                    }
                }
            }
        })
    })
    function showList(obj, data) {
        obj.empty();
        for (let i = 0; i < data.length; i++) {
            let str = `
                     <li style="display: flex;justify-content: space-between;line-height: 42px;font-size: 16px;cursor:pointer;" id="${data[i].disctId}">
							<div style="width:60%;text-align: left;padding-left:70px;">${data[i].address}</div>
							<div style="width:40%;text-align: center;" class="statuss">${data[i].isReach}</div>
					</li>
                  `;
            obj.html(function (i, value) {
                return value + str;
            })
        }
    }
/*点击查看指标原因*/
    $(document).on("click","#nameList li",function(){
        $(this).css("background-color","#50505287");
        $(this).siblings('li').css('background-color','#333132');
    	$("#xianger2").html('');
        let reasonArr=[];
        $(".tank-1").css("display","none");
        $(".tank-2").css("display","none");
        $(".tank-3").css({"display":"block"});
        $(".zhezhao").css("display","block");
        let kc=$(this).attr("id");
        $.ajax({
            url:url+ 'villSeven/villIndexs',
            data:{'code':kc},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    // Allhuqixiang(zhibiao,data);
                    allXianReason2(data);
                    reasonArr.push(data.data.aac331Reason,data.data.aad328Reason,data.data.aac313Reason,data.data.aad371Reason,data.data.aae113Reason,data.data.aac312Reason,data.data.aad391Reason);
                    // for(let i=0;i<$("#t-list-seven3 .itme-des").length;i++){
                        $("#t-list-seven3 .itme-des").click(function(){
                            let index=$(this).index();
                            console.log(index);
                            $("#xianger2").text(reasonArr[index]);
                        })
                    // }

                }
            }
        });
        function allXianReason2(data){
            console.log(data)
            $("#vill").text(data.data.vill);
            $('#cun-scorez2').html(data.data.account);
            $('#defenz01s').html(data.data.aac331)
            $('#defenz02s').html(data.data.aad328)
            $('#defenz03s').html(data.data.aac313)
            $('#defenz04s').html(data.data.aad371)
            $('#defenz05s').html(data.data.aae113)
            $('#defenz06s').html(data.data.aac312)
            $('#defenz07s').html(data.data.aad391)

            if( data.data.aac331==0){
                $('#color711s').addClass('red').removeClass('green');
            }else{
                $('#color711s').addClass('green').removeClass('red');
            }
            if( data.data.aad328==0){
                $('#color712s').addClass('red').removeClass('green');
            }else{
                $('#color712s').addClass('green').removeClass('red');
            }
            if( data.data.aac313==0){
                $('#color713s').addClass('red').removeClass('green');
            }else{
                $('#color713s').addClass('green').removeClass('red');
            }
            if( data.data.aad371==0){
                $('#color714s').addClass('red').removeClass('green');
            }else{
                $('#color714s').addClass('green').removeClass('red');
            }
            if( data.data.aae113==0){
                $('#color715s').addClass('red').removeClass('green');
            }else{
                $('#color715s').addClass('green').removeClass('red');
            }
            if( data.data.aac312==0){
                $('#color716s').addClass('red').removeClass('green');
            }else{
                $('#color716s').addClass('green').removeClass('red');
            }
            if( data.data.aad391==0){
                $('#color717s').addClass('red').removeClass('green');
            }else{
                $('#color717s').addClass('green').removeClass('red');
            }

        }
        /*查看具体原因*/

    })

    //点击关闭
    $(".tank-2 .close").click(function(){
        $(".tank-2").css("display","none");
        $("#zhezhao").css("display","none");
    })
    $(".tank-3 .close").click(function(){
        $(".tank-3").css("display","none");
        $("#zhezhao").css("display","none");
    })

/*/!*列表滚动*!/
$(function(){
    function autoScroll(obj){
        $(obj).find("ul").animate({
            marginTop : "-39px"
        },500,function(){
            $(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
        })
    }
    setInterval('autoScroll(".maquee")',3000);
})*/

$.ajax({
        url:url+ 'villSeven/city',
        data:{},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showHu(myChart3,data);
            }
        }
	})
	function showHu(myChart3,data){
	    var linNums1 = [];
	    var linNums3 = [];
		for (let i=0;i<data.data.length;i++) {
             linNums1[i]=data.data[0].standardNO;
             linNums3[i]=data.data[0].standardOK;
             myChart3.setOption({
                series: [
			    {
			        name: '未达标',
			        type: 'bar',
			        stack: '总量',
			        data:linNums1
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
		                        	for (let i=0;i<data.data.length;i++) {
	                            		return parseInt(data.data[0].standardNO)+parseInt(data.data[0].standardOK)+'个';
		                        	}
		                        }
		                    }
		                }
		            },
			        data: linNums3
			    }
        	]
			})
		}

	}
myChart3.setOption(option);


var dom31 = document.getElementById("echarts-31");
var myChart31 = echarts.init(dom31);
var colorL=['#DD4F43','#FFCE43','#1FA463'];
    // var element=['未达标', '兜底保障','已达标'];
    var Element=element;
    option = {
        tooltip : {
            trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : ''        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    /*legend: {
        data:Element,
        align:'left',
        itemGap: 6 ,
        itemWidth : 25,
        itemHeight : 15 ,
        align: 'left',
        selectedMode: true,
        formatter: function(v) {
           return v ;
       },
       textStyle:{
        fontSize:12,
        color: '#fff'
    	}
    },*/
    grid: {
        left: '3%',
        right: '5%',
        bottom: '30%',
        top : '-5%',
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
                fontSize:graph_x
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

$.ajax({
        url:url+ 'map/house/poor/count',
        data:{'year':201808,'disctId':610100000000},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showHu1(myChart31,data);
            }
        }
	})
	function showHu1(myChart31,data){
	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		//for (let i=0;i<data.data.length;i++) {
            linNums1=data.data.standardNO;
            linNums2=data.data.doudi;
            linNums3=data.data.standardOK;
            myChart31.setOption({
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
	                            	return parseInt(data.data.standardNO)+parseInt(data.data.doudi)+parseInt(data.data.standardOK)+'户';
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
myChart31.setOption(option);

$(document).ready(function(){
/*********************  zhouzhixian*****************************/
$("body").on("click",".c-red",function(){
	$('#xianger').html('')
      $.ajax({
          url: url+"cntySeven/target",
          data:{'aar001':610124000000,'aar040':201808},
          method: "get",
          dataType: "json",
          success: function(data){
                if (data.code == 2000){
                    allXianReason(data);
                }
            }
      })
  })
  function allXianReason(data){
				$('#cun-scorez').html(data.data.score);
				$('#defenz01').html(data.data.aar014)
				$('#defenz02').html(data.data.aae304)
				$('#defenz03').html(data.data.aae323)
				$('#defenz04').html(data.data.aae378)
				$('#defenz05').html(data.data.aae044)
				$('#defenz06').html(data.data.aae314)
				$('#defenz07').html(data.data.aae331)

                  if( data.data.aar014==0){
				    	$('#color711').addClass('red').removeClass('green');
				    }else{
				    	$('#color711').addClass('green').removeClass('red');
				    }
				    if( data.data.aae304==0){
				    	$('#color712').addClass('red').removeClass('green');
				    }else{
				    	$('#color712').addClass('green').removeClass('red');
				    }
				    if( data.data.aae323==0){
				    	$('#color713').addClass('red').removeClass('green');
				    }else{
				    	$('#color713').addClass('green').removeClass('red');
				    }
				    if( data.data.aae378==0){
				    	$('#color714').addClass('red').removeClass('green');
				    }else{
				    	$('#color714').addClass('green').removeClass('red');
				    }
				    if( data.data.aae044==0){
				    	$('#color715').addClass('red').removeClass('green');
				    }else{
				    	$('#color715').addClass('green').removeClass('red');
			        }
                    if( data.data.aae314==0){
				    	$('#color716').addClass('red').removeClass('green');
				    }else{
				    	$('#color716').addClass('green').removeClass('red');
				    }
				    if( data.data.aae331==0){
				    	$('#color717').addClass('red').removeClass('green');
				    }else{
				    	$('#color717').addClass('green').removeClass('red');
			        }
               $(".tank-1").show()

  }

  $("body ").on('click','#t-list-seven .itme-des .t-item',function(){
  	var ss;
  	console.log($(this).parent())
    $(this).parent().addClass("active").siblings().removeClass("active");
    if($(this)){
        var index = $("#t-list-seven .itme-des .t-item").index(this);
        var ger2=document.getElementById('xianger') ;
        switch(index){
            case 0:
             ss = 'aar014';
            break;
            case 1:
             ss = 'aae304';
            break;
            case 2:
             ss = 'aae323';
            break;
            case 3:
             ss = 'aae378';
            break;
            case 4:
             ss = 'aae044';
            break;
            case 5:
             ss = 'aae314';
            break;
            case 6:
             ss = 'aae331';
            break;
            default:
           break;
        }
        $.ajax({
                url:url+ 'cntySeven/indexReason',
                data:{'index':ss},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        //console.log("ok");
                        showreason11(data);
                    }
                }
    })
    function showreason11(data){
            var str = `
            <p style="font-size: 15px;text-align: left;padding:10px 0 0 10px;letter-spacing:2px;">
                <span style='font-weight:bold;'>指标达标情况:</span>${data.data}
            </p>`;
            $('#xianger').html(str);
    }
};
})
})

$('body').on('click','.zhouzhi_return',function(){
	$(".tank-2").css("display","block");
    $(".tank-3").css({"display":"none"});
    $(".zhezhao").css("display","block");
})


})