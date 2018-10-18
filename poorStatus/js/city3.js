//全市ge区县贫困户达标情况及数量分布统计
/****************************echarts-5*************************************/
$(function(){
var y=201808;
var dom5 = document.getElementById("echarts-5");
var myChart5 = echarts.init(dom5);
var app = {};
option = null;
var xianbianma=[];
var linNamesxian = [];
var zhenbianma=[];
var linNameszhen = [];
var cunbianma=[];
var linNamescun = [];
var hubianma=[];
//var kc;
option = {
    color: ['#DD4F43','#FFCE43','#1FA463'],
    title: {
        text: '单位:户',
        textStyle:{    //图例文字的样式
	        color:'#fff',
	        fontWeight: 'normal',
	        fontSize:graph_x,
	    }

    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['未达标户', '兜底保障户','已达标户'],
        x : 'right',
        textStyle:{    //图例文字的样式
	        color:'#fff',
            fontSize:graph_x
	    },
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
        data: [/*'蓝田县','周至县','鄠邑区','长安区','临潼区','临潼区','灞桥区','高陵区','国际港务区'*/],
        axisLabel:{
        	interval:0,
        	rotate:-45,
        	textStyle:{
                fontSize:graph_x,
            },
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
            name: '未达标户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*32, 30, 30, 33, 39, 33, 32,10,12*/],
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
            name: '兜底保障户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*30, 32, 31, 34, 30, 30, 30,10,10*/],
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
            name: '已达标户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*20, 32, 01, 34, 90, 30, 10,8,10*/],
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

//全市贫困户达标情况及数量分布统计ajax
$.ajax({
            url:url+ 'map/house/count',
            data:{'year':y,'disctId':'610100000000'},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){

                    showXianHu(myChart5,data);
                }

            }
    	})
	function showXianHu(myChart5,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNamesxian[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK;
             xianbianma[i]=data.data[i].AAR008;
             //console.log(linNamesxian[i]);
            myChart5.setOption({
                xAxis: {
                        data: linNamesxian
                       },
                yAxis:  {
			        type: 'value'

				},
                series: [
                	{   type: 'bar',
			            stack: '总量',

                        name: ['未达标户'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',

                        name: ['兜底保障户'],
                        data: linNums2
          			},
          			{   type: 'bar',
			            stack: '总量',

                        name: ['已达标户'],
                        data: linNums3
          			}

                	]

			})
		}

	}

if (option && typeof option === "object") {
    myChart5.setOption(option, true);
}
myChart5.on("click",function(params){

    $("#quxian").text(params.value);
    if(params.componentType == "xAxis"){
    	$('#zhezhao').show();
    	//县编码传递
    	for (var i=0;i<linNamesxian.length;i++) {
		   if(params.value==linNamesxian[i]){
		   	 kx = xianbianma[i];
		   	}
	    }
    	$(".content-3-1 ").css({"opacity":1,"top":"50%"});
   		$("#content-3-1-left").css('display','none');
		$(".content-3-1 #mid-top").css('display','block');
		$(".content-3-1 #mid-bottom").css({'position':'relative','opacity':'0','top':'-100%'});
		$("#content-3-1-right").css('display','none');
    }else{
       // alert("单击了"+params.name+"柱状图");
    }
   //区县下各街道贫困户达标情况及数量分布统计
   var dom3_1 = document.getElementById("echarts-3-1");
   var myChart3_1 = echarts.init(dom3_1);
   $.ajax({
            url:url+ 'map/house/count',
            data:{"year":y,'disctId':kx},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                	linNameszhen=[]
	 	   	   	    myChart3_1.setOption({
	   	                xAxis: {
	                        data:linNameszhen
	                    }
	   		        });
                    showZhenHu(myChart3_1,data);
                }

            }
    	})
	function showZhenHu(myChart3_1,data){
	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
	    $("#quxian").text(params.value);
		for (let i=0;i<data.data.length;i++) {
             linNameszhen[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK;
             zhenbianma[i]=data.data[i].AAR008;
            myChart3_1.setOption({
                xAxis: {
                        data: linNameszhen
                       },
                yAxis:  {
			        type: 'value'
				},
                series: [
                	{   type: 'bar',
			            stack: '总量',

                        name: ['未达标户'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',

                        name: ['兜底保障户'],
                        data: linNums2
          			},
          			{   type: 'bar',
			            stack: '总量',

                        name: ['已达标户'],
                        data: linNums3
          			}
                	]
			})
		}
	}

})

/****************************echarts-3-1*************************************/
var dom3_1 = document.getElementById("echarts-3-1");
var myChart3_1 = echarts.init(dom3_1);
var app = {};
option = null;

option = {
    color: ['#DD4F43', '#FFCE43', '#1FA463'],
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
        data: ['未达标户', '兜底保障户','已达标户'],
        x : '80',
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
        data: [/*'xx街道','xx街道','xx街道','xx街道','xx街道','xx街道','xx街道','xx街道','xx街道'*/],
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
            name: '未达标户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*20, 32, 01, 34, 90, 30, 10,8,10*/],
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
            name: '兜底保障户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*30, 32, 31, 34, 30, 30, 30,10,10*/],
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
            name: '已达标户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*20, 32, 01, 34, 90, 30, 10,8,10*/],
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
    myChart3_1.setOption(option, true);
}
myChart3_1.on("click",function(params){
	$('#hutable').html('');
	$("#cun3-1").text('达标情况及数量分布统计');
	$('#huming').html('');
	$('#hureason').html('');
    $("#zhen").text(params.value);
    if(params.componentType == "xAxis"){
    	//zhen编码
    	for (var i=0;i<linNameszhen.length;i++) {
		   if(params.value==linNameszhen[i]){
		   	 kz = zhenbianma[i];
		   	}
	    }
    	$(".content-3-1 #mid-bottom").css({"opacity":1,'top':'0%'});
    }else{
        alert("单击了"+params.name+"柱状图");
    }
//街道下各cun贫困户达标情况及数量分布统计
var dom3_2 = document.getElementById("echarts-3-2");
var myChart3_2 = echarts.init(dom3_2);
    $.ajax({
            url:url+ 'map/house/count',
            data:{"year":y,'disctId':kz},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                	linNamescun=[]
	 	   	   	    myChart3_2.setOption({
	   	                xAxis: {
	                        data:linNamescun
	                    }
	   		        });
                    showCunHu(myChart3_2,data);
                }
            }
    	})
	function showCunHu(myChart3_2,data){
	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		for (let i=0;i<data.data.length;i++) {
             linNamescun[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK;
             cunbianma[i]=data.data[i].AAR008;
            myChart3_2.setOption({
                xAxis: {
                        data: linNamescun
                       },
                yAxis:  {
			        type: 'value'
				},
                series: [
                	{   type: 'bar',
			            stack: '总量',
                        name: ['未达标户'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',
                        name: ['兜底保障户'],
                        data: linNums2
          			},
          			{   type: 'bar',
			            stack: '总量',
                        name: ['已达标户'],
                        data: linNums3
          			}
                	]
			})
		}
	}
})
/****************************echarts-3-2*************************************/
var dom3_2 = document.getElementById("echarts-3-2");
var myChart3_2 = echarts.init(dom3_2);
var app = {};
option = null;
option = {
    color: ['#DD4F43', '#FFCE43', '#1FA463'],
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
        data: ['未达标户', '兜底保障户','已达标户'],
        x : '80',
        textStyle:{    //图例文字的样式
	        color:'#fff'
	    }
    },
    grid: {
        top: "20%",
        left: '2%',
        right: '5%',
        bottom: '4%',
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
        data: [/*'xx村','xx村','xx村','xx村','xx村','xx村','xx村','xx村','xx村'*/],
        axisLabel:{
        	interval:0,
        	rotate:-60,
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
            name: '未达标户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*20, 32, 01, 34, 90, 30, 10,8,10*/],
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
            name: '兜底保障户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*30, 32, 31, 34, 30, 30, 30,10,10*/],
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
            name: '已达标户',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [/*20, 32, 01, 34, 90, 30, 10,8,10*/],
            itemStyle: {
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },

                        normal: {
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
        },

    ]
};
if (option && typeof option === "object") {
    myChart3_2.setOption(option, true);
}
myChart3_2.on("click",function(params){
	$('#hutable').html('');
	$('#huming').html('');
	$('#hureason').html('');
    for (var i=0;i<linNamescun.length;i++) {
		   if(params.value==linNamescun[i]){
		   	 //alert(params.value)
		   	 kc = cunbianma[i];

		   	}
	    }
    if(params.componentType == "xAxis"){
    	$("#content-3-1-right").css("display",'block');

    }else{
        //alert("单击了"+params.name+"柱状图");
    }
 var hutable=document.getElementById('hutable')
 $.ajax({
            url:url+ 'map/house/info',
            data:{"year":y,'disctId':kc},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    
                    Allhu(hutable,data);
                }
            }
    })
 function 	Allhu(hutable,data){
	   $("#cun3-1").text(params.value+'达标情况及数量分布统计');
      var str = `

       <tr style="background: linear-gradient(#0D4770, #000103);">
            <th> 户主  </th>
            <th> 性别  </th>
            <th> 年龄  </th>
            <th> 家庭人数  </th>
            <th> 达标情况</th>
        </tr> `;
          $('#hutable').html(str);

	for(let i = 0; i < data.data.length; i++ ){
		hubianma[i]=data.data[i].AAC001;
	    var str1=`
	      <tr sleep=${i}>
              <td>${data.data[i].AAC029}</td>
              <td>${data.data[i].SEX}</td>
              <td>${data.data[i].AGE}</td>
			  <td>${data.data[i].AAC017}</td>
              <td>${data.data[i].ISSTANDARDOK}</td>
          </tr>`;
           $('#hutable').html(function (i, value) {
                return value + str1;
            });

	   }

//户达标情况点击 --户五项
  for(let k=0; k<=$('#hutable >tr').length; k++){
   		if($('#hutable >tr').eq(k).find('td:nth-child(5)').text()==1){
                $('#hutable >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
                $('#hutable >tr').eq(k).find('td:nth-child(5)').text('已达标');
                //达标情况点击 --户五项
                $('#hutable >tr').eq(k).find("td:nth-child(5)").click(function(){
                	$('#hureason').html('');
                    var num = $(this).parent().attr("sleep");
                    kh = hubianma[num];
                    var zhibiao=document.getElementById('content-3-1-left') ;
                    $('#huming').text($('#hutable >tr').eq(k).find('td:nth-child(1)').text())
                    $.ajax({
                        url:url+ 'map/five/house/five',
                        data:{"year":y,'aac001':kh,'disctId':kc},
                        method: "post",
                        dataType: "json",
                        success: function(data){
                            if (data.code == 2000){
                                console.log("ok");
                                AllhuWuxiang(zhibiao,data);

                            }
                        }
                    })
                    function 	AllhuWuxiang(zhibiao,data){

                        if( data.data.STUDENT==1){
                            $('#colorh3').addClass('red');
                            $('#colorh3').removeClass('green');
                            $('#hudefen3').html(0);
                        }else{
                            $('#colorh3').addClass('green');
                            $('#colorh3').removeClass('red');
                            $('#hudefen3').html(20);
                        }
                        if( data.data.INSURANCE==1){
                            $('#colorh4').addClass('red');
                            $('#colorh4').removeClass('green');
                            $('#hudefen4').html(0);
                        }else{
                            $('#colorh4').addClass('green');
                            $('#colorh4').removeClass('red');
                            $('#hudefen4').html(20);
                        }
                        if( data.data.INCOME==1){
                            $('#colorh1').addClass('red');
                            $('#colorh1').removeClass('green');
                            $('#hudefen1').html(0);
                        }else{
                            $('#colorh1').addClass('green');
                            $('#colorh1').removeClass('red');
                            $('#hudefen1').html(20);
                        }
                        if( data.data.WATER==1){
                            $('#colorh5').addClass('red');
                            $('#colorh5').removeClass('green');
                            $('#hudefen5').html(0);
                        }else{
                            $('#colorh5').addClass('green');
                            $('#colorh5').removeClass('red');
                            $('#hudefen5').html(20);
                        }
                        if( data.data.HOUSE==1){
                            $('#colorh2').addClass('red');
                            $('#colorh2').removeClass('green');
                            $('#hudefen2').html(0);
                        }else{
                            $('#colorh2').addClass('green');
                            $('#colorh2').removeClass('red');
                            $('#hudefen2').html(20);
                        }
                        $('#hu-score').html(parseInt($('#hudefen1').text())+parseInt($('#hudefen2').text())+parseInt($('#hudefen3').text())+parseInt($('#hudefen4').text())+parseInt($('#hudefen5').text()))
                    }
                    $("#content-3-1-left").css({'display':'block','opacity':'1' });
                });
	        }else if($('#hutable >tr').eq(k).find('td:nth-child(5)').text()==2){
	        	$('#hutable >tr').eq(k).find('td:nth-child(5)').css('color','yellow');
	            $('#hutable >tr').eq(k).find('td:nth-child(5)').text('兜底保障户');
                //达标情况点击 --户五项
                $('#hutable >tr').eq(k).find("td:nth-child(5)").click(function(){
                	$('#hureason').html('');
                    var num = $(this).parent().attr("sleep");
                    kh = hubianma[num];
                    var zhibiao=document.getElementById('content-3-1-left') ;
                    $('#huming').text($('#hutable >tr').eq(k).find('td:nth-child(1)').text())                    
                    $.ajax({
                        url:url+ 'map/five/house/five',                        
                        data:{"year":y,'aac001':kh,'disctId':kc},
                        method: "post",
                        dataType: "json",
                        success: function(data){
                            if (data.code == 2000){
                                console.log("ok");                                
                                AllhuWuxiang(zhibiao,data);

                            }
                        }
                    })
                    function 	AllhuWuxiang(zhibiao,data){

                        if( data.data.STUDENT==1){
                            $('#colorh3').addClass('red');
                            $('#colorh3').removeClass('green');
                            $('#hudefen3').html(0);
                        }else{
                            $('#colorh3').addClass('green');
                            $('#colorh3').removeClass('red');
                            $('#hudefen3').html(20);
                        }
                        if( data.data.INSURANCE==1){
                            $('#colorh4').addClass('red');
                            $('#colorh4').removeClass('green');
                            $('#hudefen4').html(0);
                        }else{
                            $('#colorh4').addClass('green');
                            $('#colorh4').removeClass('red');
                            $('#hudefen4').html(20);
                        }
                        if( data.data.INCOME==1){
                            $('#colorh1').addClass('red');
                            $('#colorh1').removeClass('green');
                            $('#hudefen1').html(0);
                        }else{
                            $('#colorh1').addClass('green');
                            $('#colorh1').removeClass('red');
                            $('#hudefen1').html(20);
                        }
                        if( data.data.WATER==1){
                            $('#colorh5').addClass('red');
                            $('#colorh5').removeClass('green');
                            $('#hudefen5').html(0);
                        }else{
                            $('#colorh5').addClass('green');
                            $('#colorh5').removeClass('red');
                            $('#hudefen5').html(20);
                        }
                        if( data.data.HOUSE==1){
                            $('#colorh2').addClass('red');
                            $('#colorh2').removeClass('green');
                            $('#hudefen2').html(0);
                        }else{
                            $('#colorh2').addClass('green');
                            $('#colorh2').removeClass('red');
                            $('#hudefen2').html(20);
                        }
                        $('#hu-score').html(parseInt($('#hudefen1').text())+parseInt($('#hudefen2').text())+parseInt($('#hudefen3').text())+parseInt($('#hudefen4').text())+parseInt($('#hudefen5').text()))
                    }
                    $("#content-3-1-left").css({'display':'block','opacity':'1' });
                });
	        }else{
                $('#hutable >tr').eq(k).find('td:nth-child(5)').css('color','#DD4F43');
                $('#hutable >tr').eq(k).find('td:nth-child(5)').text('未达标');
                //达标情况点击 --户五项
                $('#hutable >tr').eq(k).find("td:nth-child(5)").click(function(){
                	$('#hureason').html('');
                    var num = $(this).parent().attr("sleep");
                        kh = hubianma[num];
                 var zhibiao=document.getElementById('content-3-1-left') ;
                 $('#huming').text($('#hutable >tr').eq(k).find('td:nth-child(1)').text())
                 $.ajax({
                    url:url+ 'map/five/house/five',
                    data:{"year":y,'aac001':kh,'disctId':kc},
                    method: "post",
                    dataType: "json",
                    success: function(data){
                        if (data.code == 2000){
                            console.log("ok");
                            AllhuWuxiang(zhibiao,data);

                        }
                    }
                })
                function 	AllhuWuxiang(zhibiao,data){

                        if( data.data.STUDENT==1){
                            $('#colorh3').addClass('red');
                            $('#colorh3').removeClass('green');
                            $('#hudefen3').html(0);
                        }else{
                            $('#colorh3').addClass('green');
                            $('#colorh3').removeClass('red');
                            $('#hudefen3').html(20);
                        }
                        if( data.data.INSURANCE==1){
                            $('#colorh4').addClass('red');
                            $('#colorh4').removeClass('green');
                            $('#hudefen4').html(0);
                        }else{
                            $('#colorh4').addClass('green');
                            $('#colorh4').removeClass('red');
                            $('#hudefen4').html(20);
                        }
                        if( data.data.INCOME==1){
                            $('#colorh1').addClass('red');
                            $('#colorh1').removeClass('green');
                            $('#hudefen1').html(0);
                        }else{
                            $('#colorh1').addClass('green');
                            $('#colorh1').removeClass('red');
                            $('#hudefen1').html(20);
                        }
                        if( data.data.WATER==1){
                            $('#colorh5').addClass('red');
                            $('#colorh5').removeClass('green');
                            $('#hudefen5').html(0);
                        }else{
                            $('#colorh5').addClass('green');
                            $('#colorh5').removeClass('red');
                            $('#hudefen5').html(20);
                        }
                        if( data.data.HOUSE==1){
                            $('#colorh2').addClass('red');
                            $('#colorh2').removeClass('green');
                            $('#hudefen2').html(0);
                        }else{
                            $('#colorh2').addClass('green');
                            $('#colorh2').removeClass('red');
                            $('#hudefen2').html(20);
                        }
                        $('#hu-score').html(parseInt($('#hudefen1').text())+parseInt($('#hudefen2').text())+parseInt($('#hudefen3').text())+parseInt($('#hudefen4').text())+parseInt($('#hudefen5').text()))
                }
                    $("#content-3-1-left").css({'display':'block','opacity':'1' });
                    });
	        }

		}

 	}
//户五项为达标原因
 var content3span=$(".content-3-1 #content-3-1-left .t-list .itme-des >a");

	    for (var i=0;i<content3span.length;i++) {
			 $(".content-3-1 .t-list .itme-des>a").eq(i).attr("sleep",i+1);
		};
				$("#content-3-1-left .t-list .itme-des a ").on('click',function(){
					//console.log('111')
				if(1){
					var hureason=document.getElementById('hureason')
					$.ajax({
				            url:url+ 'map/five/index/reason',
				            data:{"year":y,'type':$(this).attr('sleep'),'aac001':kh},
				            method: "post",
				            dataType: "json",
				            success: function(data){
				                if (data.code == 2000){
				                    //console.log("ok");
				                    showqsreason(hureason,data);
				                }
				            }
					})
					function showqsreason(hureason,data){
							var str = `
						 	<h3>指标达标情况</h3>
						   <p style="text-align: left;text-indent:40px;font-size:22px;letter-spacing:2px;">
						        ${data.data}
						    </p>`;
					        $('#hureason').html(str);
					}
				};
				})




})

















});