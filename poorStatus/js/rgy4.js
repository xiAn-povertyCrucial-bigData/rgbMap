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

var y=201808;
var linNames_jie=[];
var jiebianma=[];
var linNamescun=[];
var cunbianma=[];
var hubianma=[];
var j;
var gwqzhenbianma=[];
var linNames_zhen = [];
var linNames_cun = [];
var gwqcunbianma=[];
var gwqhubianma=[];
var myChart1 = echarts.init(document.getElementById('echarts-1'));
$.ajax({
        url:url+ 'map/house/poor/count',
        data:{'year':y,'disctId':codeinging},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                console.log("ok0000");
                showgwqHu(myChart1,data);
            }

        }
	})
	function showgwqHu(myChart1,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		//for (let i=0;i<data.data.length;i++) {
             linNums1=data.data.standardNO;
             linNums2=data.data.doudi;
             linNums3=data.data.standardOK;

            myChart1.setOption({
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
//国际港务区贫困户数量分布统计
var dom2= document.getElementById("echarts-2");
var myChart2 = echarts.init(dom2);
$.ajax({
            url: url+'map/house/count',
            data:{"year":y,'disctId':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showjdhu(myChart2,data);

                }

            }
    	})
	function showjdhu(myChart2,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_jie[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK;
             jiebianma[i]=data.data[i].AAR008;

            myChart2.setOption({
                xAxis: {
                        data: linNames_jie
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
                        name: ['兜底保障'],
                        data: linNums2
          			},
          			{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标'],
                        data: linNums3
          			}

                	]

			})
		}

	}
myChart2.on('click',function (params) {

    if (params.componentType == "xAxis") {
    	 $('#zhezhao').show();
         $('.contentss2').show()
        $('#tit3').html(params.value)
    //zhen编码传递
	for (var i=0;i<linNames_jie.length;i++) {
	   if(params.value==linNames_jie[i]){
	   	 kj = jiebianma[i];
	   	}
    }
        document.getElementById("p-lists5").style.display = "block";
        document.getElementById("p-lists5").style.visibility = "hidden";
        document.getElementById("p-lists6").style.display = "block";
        document.getElementById("p-lists7").style.display = "block";
        document.getElementById("p-lists7").style.visibility = "hidden";

    }

//cun
var dom10 = document.getElementById("echarts-10");
var myChart10 = echarts.init(dom10);
$.ajax({
            url:url+ 'map/house/count',
            data:{"year":y,'disctId':kj},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNamescun=[]
	 	   	   	    myChart10.setOption({
	   	                xAxis: {
	                        data:linNamescun
	                    }
	   		        });
                    showcun(myChart10,data);
                }

            }
    	})
	function showcun(myChart10,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
	    $("#quxian").text(params.value);
		for (let i=0;i<data.data.length;i++) {
             linNamescun[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK;
             cunbianma[i]=data.data[i].AAR008;
             //console.log(linNums2[i]);
            myChart10.setOption({
                xAxis: {
                        data: linNamescun
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
                        name: ['兜底保障'],
                        data: linNums2
          			},
          			{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标'],
                        data: linNums3
          			}
                	]
			})
		}
	}

 });
//hu
myChart10.on('click',function (params) {
	$('#tables3').html('');
	$('#ger').html('');
    $('#zhenming').html(params.value)
            if(params.componentType =="xAxis") {
            	for (var i=0;i<linNamescun.length;i++) {
				   if(params.value==linNamescun[i]){
				   	 //alert('111')
				   	 kc = cunbianma[i];
				   	}
			    }
                document.getElementById("p-lists7").style.visibility = "visible";
//
            }

        var tables3=document.getElementById('tables3')
		 $.ajax({
		            url:url+ 'map/house/info',
		            data:{"year":y,'disctId':kc},
		            method: "post",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
		                    console.log("ok");
		                    Allhu(tables3,data);
		                }
		            }
		    })
		 function 	Allhu(tables3,data){
			   //$("#cun3-1").text(params.value);
		      var str = `
		       <tr style="background: linear-gradient(#0D4770, #000103);">
		            <th> 户主  </th>
		            <th> 性别  </th>
		            <th> 年龄  </th>
		            <th> 家庭人数  </th>
		            <th> 达标情况</th>
		        </tr> `;
		          $('#tables3').html(str);

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
		           $('#tables3').html(function (i, value) {
		                return value + str1;
		            });

			   }
	//户达标情况点击 --户五项
  for(let k=0; k<=$('#tables3 >tr').length; k++){
   		if($('#tables3 >tr').eq(k).find('td:nth-child(5)').text()==1){
   			$('#tables3 >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
	        $('#tables3 >tr').eq(k).find('td:nth-child(5)').text('已达标');
            //达标情况点击 --户五项
            $('#tables3 >tr').eq(k).find("td:nth-child(5)").click(function(){
            	$('#ger').html('');
                $('#huming0').html($('#tables3 >tr').eq(k).find('td:nth-child(1)').text())
                var num = $(this).parent().attr("sleep");
                kh = hubianma[num];
                //console.log(kh)
                var zhibiao5=document.getElementById('p-lists5') ;

                $.ajax({
                    url:url+ 'map/five/house/five',
                    data:{"year":y,'aac001':kh},
                    method: "post",
                    dataType: "json",
                    success: function(data){
                        if (data.code == 2000){
                            console.log("ok");
                            AllhuWuxiang(zhibiao5,data);

                        }
                    }
                })
                function 	AllhuWuxiang(zhibiao5,data){
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
                $("#p-lists5").css("visibility","visible");
            });
        }else if($('#tables3 >tr').eq(k).find('td:nth-child(5)').text()==2){
	        $('#tables3 >tr').eq(k).find('td:nth-child(5)').css('color','yellow');
	        $('#tables3 >tr').eq(k).find('td:nth-child(5)').text('兜底保障户');
            //达标情况点击 --户五项
            $('#tables3 >tr').eq(k).find("td:nth-child(5)").click(function(){
            	$('#ger').html('');
                $('#huming0').html($('#tables3 >tr').eq(k).find('td:nth-child(1)').text())
                var num = $(this).parent().attr("sleep");
                kh = hubianma[num];
                //console.log(kh)
                var zhibiao5=document.getElementById('p-lists5') ;

                $.ajax({
                    url:url+ 'map/five/house/five',
                    data:{"year":y,'aac001':kh},
                    method: "post",
                    dataType: "json",
                    success: function(data){
                        if (data.code == 2000){
                            console.log("ok");
                            AllhuWuxiang(zhibiao5,data);

                        }
                    }
                })
                function 	AllhuWuxiang(zhibiao5,data){
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
                $("#p-lists5").css("visibility","visible");
            });
        }else{
	        $('#tables3 >tr').eq(k).find('td:nth-child(5)').css('color','red');
         	$('#tables3 >tr').eq(k).find('td:nth-child(5)').text('未达标');
         	//达标情况点击 --户五项
         	$('#tables3 >tr').eq(k).find("td:nth-child(5)").click(function(){
         		$('#ger').html('');
         		$('#huming0').html($('#tables3 >tr').eq(k).find('td:nth-child(1)').text())
         			var num = $(this).parent().attr("sleep");
			   			kh = hubianma[num];
			   			//console.log(kh)
			 var zhibiao5=document.getElementById('p-lists5') ;

			 $.ajax({
	            url:url+ 'map/five/house/five',
			    data:{"year":y,'aac001':kh},
	            method: "post",
	            dataType: "json",
	            success: function(data){
	                if (data.code == 2000){
	                    console.log("ok");
	                    AllhuWuxiang(zhibiao5,data);

	                }
	            }
	    	})
			function 	AllhuWuxiang(zhibiao5,data){
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
			    $("#p-lists5").css("visibility","visible");
				});

	       }
		}
	var reasonspan1=$(" #p-lists5 .p-item2");

	    for (var i=0;i<reasonspan1.length;i++) {
			$(" #p-lists5 .p-item2").eq(i).attr("sleep",i+1);
		};
		$(" #p-lists5 .p-item2").on('click',function(){
		if(1){
			var ger=document.getElementById('ger')
			$.ajax({
		            url:url+ 'map/five/index/reason',
		            data:{"year":y,'type':$(this).attr('sleep'),'aac001':kh},
		            method: "post",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
		                    showreason11(ger,data);
		                }
		            }
			})
			function showreason11(ger,data){
					var str = `

				   <p style="font-size: 18px;text-align: left;text-indent:20px;padding:3px 3px;">
				        ${data.data}
				    </p>`;
			        $('#ger').html(str);
			}
		};
		})




	};
})

//贫困户五项退出指标统计
/****************************echarts-3*************************************/
var dom3 = document.getElementById("echarts-3");
var myChart3 = echarts.init(dom3);
var app = {};
option = null;

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
        data: ['未达标','已达标'],
        x : 'right',
        textStyle:{    //图例文字的样式
	        color:'#fff'
	    }
    },
    grid: {
        top: "20%",
        left: '0%',
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
        triggerEvent:true,
        type: 'category',
        data: [],
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
            name: '未达标',
            type: 'bar',
            stack: '总量',
            barWidth: 10,
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
            barWidth: 10,
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
    myChart3.setOption(option, true);
}
	$.ajax({
            url: url+'map/house/type',
            data:{"year":y,'disctId':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showgwqwx(myChart3,data);
                }

            }
    	})
	function showgwqwx(myChart3,data){
	    var linNames_wuxiang1 = [];
	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_wuxiang1[i]=data.data[i].indexName;
             linNums1[i]=data.data[i].STANDARDNO;
             linNums2[i]=data.data[i].STANDARDOK;
             type[i]=data.data[i].type;
             //console.log(type[data.data[i].type-1])
            myChart3.setOption({
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

myChart3.on('click',function (params) {

	if(params.componentType == "xAxis"){
		$('#zhezhao').show();
        $('.contentss1').show()
        $('#huwx').html(params.value)
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
                document.getElementById("p-lists4").style.display = "block";
                document.getElementById("p-lists3").style.display = "block";
                document.getElementById("p-lists2").style.display = "block";
                document.getElementById("p-lists1").style.display = "block";
                document.getElementById("p-lists3").style.visibility = "hidden";
                document.getElementById("p-lists4").style.visibility = "hidden";
                document.getElementById("p-lists1").style.visibility = "hidden";
            }else{
            }
//国际港务区各街道五项指标
var dom12 = document.getElementById("echarts-12");
var myChart12 = echarts.init(dom12);
	$.ajax({
            url: url+'map/five/index/count',
            data:{"year":y,'disctId':codeinging,'type':j},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                	linNames_zhen=[]
	 	   	   	    myChart12.setOption({
	   	                xAxis: {
	                        data:linNames_zhen
	                    }
	   		        });
                    showzhenwx(myChart12,data);
                }
            }
    	})
	function showzhenwx(myChart12,data){
	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_zhen[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             gwqzhenbianma[i]=data.data[i].AAR008;

            myChart12.setOption({
                xAxis: {
                        data: linNames_zhen
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

myChart12.on('click',function (params) {
	$('#tablesa1').html('');
	$('#p-item1-es').html('');
	$('#rjtit').text('达标情况')
	$('#yuanyin').html('');
    $('#cunming').html(params.value)
            if(params.componentType =="xAxis") {
			for (var i=0;i<linNames_zhen.length;i++) {
			   if(params.value==linNames_zhen[i]){
			   	 gwqz = gwqzhenbianma[i];
			   	}
		    }
                document.getElementById("p-lists3").style.visibility = "visible";
            }

    var dom13 = document.getElementById("echarts-13");
	var myChart13 = echarts.init(dom13);
    $.ajax({
            url: url+'map/five/index/count',
            data:{"year":y,'disctId':gwqz,'type':j},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNames_cun=[]
	 	   	   	    myChart13.setOption({
	   	                xAxis: {
	                        data:linNames_cun
	                    }
	   		        });
                    showzhenwx(myChart13,data);
                }

            }
    	})
	function showzhenwx(myChart13,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_cun[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             gwqcunbianma[i]=data.data[i].AAR008;

            myChart13.setOption({
                xAxis: {
                        data: linNames_cun
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
myChart13.on('click',function (params) {
	$('#rjtit').text(params.value+'达标情况')
	$('#tablesa1').html('');
	$('#p-item1-es').html('');
	$('#yuanyin').html('');
            if(params.componentType =="xAxis") {

            for (var i=0;i<linNames_cun.length;i++) {
			   if(params.value==linNames_cun[i]){
			   	 gwqc = gwqcunbianma[i];
			   	}
		    }
                document.getElementById("p-lists4").style.visibility = "visible";
            }

 var tablesa1=document.getElementById('tablesa1')
 $.ajax({
            url:url+ 'map/five/index/house',
            data:{"year":y,'type':j,'disctId':gwqc},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showhuWuxiang(tablesa1,data);
                }
            }
    })
});

     function showhuWuxiang(tablesa1,data){
	      var str = `
	       <tr style="background: linear-gradient(#0D4770, #000103);">
                <th> 户主  </th>
                <th> 性别  </th>
                <th> 年龄  </th>
                <th> 家庭人数  </th>
                <th> 达标情况</th>
            </tr> `;
	          $('#tablesa1').html(str);

		for(let i = 0; i < data.data.length; i++ ){
			gwqhubianma[i]=data.data[i].AAC001;
		    var str1=`
		      <tr sleep=${i}>
	              <td>${data.data[i].AAC029}</td>
	              <td>${data.data[i].SEX}</td>
	              <td>${data.data[i].AGE}</td>
				  <td>${data.data[i].AAC017}</td>
	              <td>${data.data[i].ISSTANDARD}</td>
	          </tr>`;
	           $('#tablesa1').html(function (i, value) {
	                return value + str1;
	           });
		   }
		   for(let k=0; k<=$('#tablesa1 >tr').length; k++){
		   		if($('#tablesa1 >tr').eq(k).find('td:nth-child(5)').text()==1){
		   			$('#tablesa1 >tr').eq(k).find('td:nth-child(5)').css('color','limegreen');
		         	$('#tablesa1 >tr').eq(k).find('td:nth-child(5)').text('已达标');
                    $('#tablesa1 >tr').eq(k).find("td:nth-child(5)").click(function(){
						$('#yuanyin').html('');
                        var num = $(this).parent().attr("sleep");
                        gwqh = gwqhubianma[num];
						$('#yuanyin').html($('#tablesa1 >tr').eq(k).find("td:nth-child(1)").text())
                        var listreason=document.getElementById('p-item1-es')
                        $.ajax({
                            url:url+ 'map/five/index/reason',
                            data:{"year":y,'type':j,'aac001':gwqh},
                            method: "post",
                            dataType: "json",
                            success: function(data){
                                if (data.code == 2000){
                                    //console.log("ok");
                                    showlistreason(listreason,data);
                                }
                            }
                        })

                        document.getElementById("p-lists1").style.visibility = "visible";
                        document.getElementById("p-lists2").style.visibility = "visible";
                        document.getElementById("p-lists3").style.visibility = "visible";
                    });
		        }else{
		         	$('#tablesa1 >tr').eq(k).find('td:nth-child(5)').css('color','red');
		         	$('#tablesa1 >tr').eq(k).find('td:nth-child(5)').text('未达标');
		         	$('#tablesa1 >tr').eq(k).find("td:nth-child(5)").click(function(){
		         		$('#yuanyin').html('');
					   	var num = $(this).parent().attr("sleep");
					   			gwqh = gwqhubianma[num];
						$('#yuanyin').html($('#tablesa1 >tr').eq(k).find("td:nth-child(1)").text())
					   	var listreason=document.getElementById('p-item1-es')
						 $.ajax({
						            url:url+ 'map/five/index/reason',
						            data:{"year":y,'type':j,'aac001':gwqh},
						            method: "post",
						            dataType: "json",
						            success: function(data){
						                if (data.code == 2000){
						                    //console.log("ok");
						                    showlistreason(listreason,data);
						                }
						            }
						    })

					    document.getElementById("p-lists1").style.visibility = "visible";
			            document.getElementById("p-lists2").style.visibility = "visible";
			            document.getElementById("p-lists3").style.visibility = "visible";
					   });
		        }

				function showlistreason(listreason,data){

					 var str = `
					   <div class="t-list" style="font-size: 18px;text-align: left;text-indent:20px;padding:3px 3px;color:black;background:#e2e58b;">
					        ${data.data}
					    </div>`;
				        $('#p-item1-es').html(str);
				}
			}
		}



}




})