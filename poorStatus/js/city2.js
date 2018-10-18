//全市贫困村达标情况及数量分布统计ajax
$(document).ready(function(){
var dom4= document.getElementById("echarts-4");
var myChart4 = echarts.init(dom4);
var dom2_1= document.getElementById("echarts-2-1");
var myChart2_1 = echarts.init(dom2_1);
var app = {};
option = null;
var xianbianhao=[];
var linNames_xian=[];
var zhenbianhao=[];
var linNames_zhen=[];
var kx=null;
var kz=null;
var kc=null;
var zb;
var cunbianhao=[];
option = {
    color: ['#DD4F43','#1FA463'],
    title: {
        text: '单位:个',
        x: '0',
        y: '0',
        textStyle: {
            fontWeight: 'normal',
            fontSize: graph_x,
            color: "#fff",
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
        left: '5%',
        right: '5%',
        bottom: '18%',
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
        data: [],
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
if (option && typeof option === "object") {
    myChart4.setOption(option, true);
}

$.ajax({
    url: url + "villSeven/city",
    data:{},
    method: "post",
    dataType: "json",
    success: function(data){
        if (data.code == 2000){
           // console.log("ok0000");
            showShiCun(myChart4,data);
        }

    }
})
	function showShiCun(myChart4,data){
	    //var linNames_xian = [];
	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data[1].length;i++) {
			 linNames_xian[i]=data.data[1][i].disctName;
             linNums1[i]=data.data[1][i].standardNO;
             linNums2[i]=data.data[1][i].standardOK;
             xianbianhao[i]=data.data[1][i].disctId;
             //console.log(linNames_xian[i])
            myChart4.setOption({
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
/****************************echarts-2_1*************************************/
myChart4.on('click', function (params) {

    if(params.componentType == "xAxis"){
    	$('#zhezhao').show();
        	//县编码传递
        	for (var i=0;i<linNames_xian.length;i++) {
			   if(params.value==linNames_xian[i]){
			   	 kx = xianbianhao[i];
			   	}
		    }
        	//console.log(params);

	    $(".content-2-1").css({"opacity":1,"top":"10%"});
	    $(".content-2-1 #content-2-1-left").css('display','none');
		$(".content-2-1 #right-top").css('display','block');
		$(".content-2-1 #right-bottom").css('display','none');
    }else{
    }
//echarts-2-1
option = {
    color: ['#dc1a1a','#a9cd14'],
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
        data: ['未达标村', '已达标村'],
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
        	rotate:-70,
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
            name: '未达标村',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,

            data: [],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 0, 0]
                        }
                    }
        },
        {
            name: '已达标村',
            type: 'bar',
            stack: '总量',
            barWidth: bar_width,
            data: [],
            itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 5, 5]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 5, 5]
                        }
                    }
        },

    ]
};

     //gezhen贫困村达标情况及数量分布统计
    $('#xianming').html(params.value)
    $.ajax({
	    url: url + "villSeven/cntyIndex",
	    data:{"code":kx},
	    method: "post",
	    dataType: "json",
	    success: function(data){
	        if (data.code == 2000){
				linNames_zhen=[]
 	   	   	    myChart2_1.setOption({
   	                xAxis: {
                        data:linNames_zhen
                    }
   		        });
	            showXianCun(myChart2_1,data);

	        }
	    }
	})
	function showXianCun(myChart2_1,data){

	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_zhen[i]=data.data[i].disctName;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             zhenbianhao[i]=data.data[i].disctId;
            myChart2_1.setOption({
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

if (option && typeof option === "object") {
    myChart2_1.setOption(option,true);
}
myChart2_1.on("click",function(params){
    $('#tablecun').html('');
    $('#cunming').html('');
    $('#reason1').html('');
    if(params.componentType == "xAxis"){
    	//镇编码传递
    	for (var i=0;i<linNames_zhen.length;i++) {
		   if(params.value==linNames_zhen[i]){
		   	 //alert('111')
		   	 kz = zhenbianhao[i];
		   	}
	    }
    	$("#right-bottom").css("display","block");

    }else{
       // alert("单击了"+params.name+"柱状图");
    }

    var tablecun=document.getElementById('tablecun')
    $('#zhenming').html(params.value)
 $.ajax({
            url:url+ 'villSeven/townIndex',
            data:{'code':kz},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                   // console.log("ok");
                    $('#tablecun').empty();
                    Allcun(tablecun,data);
                }
            }
    })
 function 	Allcun(tablecun,data){
      var str = `
       <tr style="background: linear-gradient(#0D4770, #000103);">
            <th> 村名  </th>
            <th> 是否达标  </th>

        </tr> `;
          $('#tablecun').html(str);

	for(let i = 0; i < data.data.length; i++ ){
		cunbianhao[i]=data.data[i].disctId;
	    var str1=`
	      <tr sleep=${i}>
              <td>${data.data[i].vill}</td>
              <td>${data.data[i].isReach}</td>
          </tr>`;
           $('#tablecun').html(function (i, value) {
                return value + str1;
            });

	   }
	//cun达标情况点击 --村七项
	for(let k=0; k<=$('#tablecun >tr').length; k++){
		if($('#tablecun >tr').eq(k).find('td:nth-child(2)').text()=='否'){
   			 $('#tablecun >tr').eq(k).find('td:nth-child(2)').text('未达标');
			 $('#tablecun >tr').eq(k).find('td:nth-child(2)').css('color','#DD4F43');
			 $('#tablecun >tr').eq(k).find("td:nth-child(2)").click(function(){
			 $('#reason1').html('')
			 $("#content-2-1-left").css({'display':'block','opacity':'1' });
			 var num = $(this).parent().attr("sleep");
		   	 kc = cunbianhao[num];
		     var zhibiao=document.getElementById('content-2-1-left') ;
		     $('#cunming').html($('#tablecun >tr').eq(k).find('td:nth-child(1)').text())
			 $.ajax({
	            url:url+ 'villSeven/villIndexs',
	            data:{'code':kc,'zcode':kz},
	            method: "post",
	            dataType: "json",
	            success: function(data){
	                if (data.code == 2000){
	                    Allhuqixiang(zhibiao,data);
	                }
	            }
	    	});

	    	function 	Allhuqixiang(zhibiao,data){
	    		var account=data.data.account;
	    		$('#cun-score').html(account);
	    		$('#defen04').html(data.data.aad371)
	    		$('#defen01').html(data.data.aac331)
	    		$('#defen05').html(data.data.aae113)
	    		$('#defen07').html(data.data.aad391)
	    		$('#defen03').html(data.data.aac313)
	    		$('#defen06').html(data.data.aac312)
	    		$('#defen02').html(data.data.aad328)
			    if( data.data.aad371==0){
			    	$('#colorh04').addClass('red').removeClass('green');

			    }else{
			    	$('#colorh04').addClass('green').removeClass('red');
			    }
			    if( data.data.aac331==0){
			    	$('#colorh01').addClass('red').removeClass('green');
			    }else{
			    	$('#colorh01').addClass('green').removeClass('red');
			    }
			    if( data.data.aae113==0){
			    	$('#colorh05').addClass('red').removeClass('green');
			    }else{
			    	$('#colorh05').addClass('green').removeClass('red');
			    }
			    if( data.data.aad391==0){
			    	$('#colorh07').addClass('red').removeClass('green');
			    }else{
			    	$('#colorh07').addClass('green').removeClass('red');
			    }
			    if( data.data.aac313==0){
			    	$('#colorh03').addClass('red').removeClass('green');
			    }else{
			    	$('#colorh03').addClass('green').removeClass('red');
		        }
			    if( data.data.aac312==0){
			    	$('#colorh06').addClass('red').removeClass('green');
			    }else{
			    	$('#colorh06').addClass('green').removeClass('red');
		        }
			    if( data.data.aad328==0){
			    	$('#colorh02').addClass('red').removeClass('green');
			    }else{
			    	$('#colorh02').addClass('green').removeClass('red');
		        }
			}

		});
	   }else{
            $('#tablecun >tr').eq(k).find('td:nth-child(2)').text('已达标');
            $('#tablecun >tr').eq(k).find('td:nth-child(2)').css('color','limegreen');
            $('#tablecun >tr').eq(k).find("td:nth-child(2)").click(function(){
            	$('#reason1').html('');
                $("#content-2-1-left").css({'display':'block','opacity':'1' });
                var num = $(this).parent().attr("sleep");
                kc = cunbianhao[num];
                var zhibiao=document.getElementById('content-2-1-left') ;
                $('#cunming').html($('#tablecun >tr').eq(k).find('td:nth-child(1)').text())
                $.ajax({
                    url:url+ 'villSeven/villIndexs',
                    data:{'code':kc,'zcode':kz},
                    method: "post",
                    dataType: "json",
                    success: function(data){
                        if (data.code == 2000){
                            Allhuqixiang(zhibiao,data);
                        }
                    }
                });
                function 	Allhuqixiang(zhibiao,data){
                    var account=data.data.account;
                    $('#cun-score').html(account);
                    $('#defen04').html(data.data.aad371)
                    $('#defen01').html(data.data.aac331)
                    $('#defen05').html(data.data.aae113)
                    $('#defen07').html(data.data.aad391)
                    $('#defen03').html(data.data.aac313)
                    $('#defen06').html(data.data.aac312)
                    $('#defen02').html(data.data.aad328)
                    if( data.data.aad371==0){
                        $('#colorh04').addClass('red').removeClass('green');

                    }else{
                        $('#colorh04').addClass('green').removeClass('red');
                    }
                    if( data.data.aac331==0){
                        $('#colorh01').addClass('red').removeClass('green');
                    }else{
                        $('#colorh01').addClass('green').removeClass('red');
                    }
                    if( data.data.aae113==0){
                        $('#colorh05').addClass('red').removeClass('green');
                    }else{
                        $('#colorh05').addClass('green').removeClass('red');
                    }
                    if( data.data.aad391==0){
                        $('#colorh07').addClass('red').removeClass('green');
                    }else{
                        $('#colorh07').addClass('green').removeClass('red');
                    }
                    if( data.data.aac313==0){
                        $('#colorh03').addClass('red').removeClass('green');
                    }else{
                        $('#colorh03').addClass('green').removeClass('red');
                    }
                    if( data.data.aac312==0){
                        $('#colorh06').addClass('red').removeClass('green');
                    }else{
                        $('#colorh06').addClass('green').removeClass('red');
                    }
                    if( data.data.aad328==0){
                        $('#colorh02').addClass('red').removeClass('green');
                    }else{
                        $('#colorh02').addClass('green').removeClass('red');
                    }
                }
            })
	    }
    }
 }

})

//cun七项为达标原因
 var content2span=$(" #content-2-1-left .t-list .itme-des >a");
	    /*for (var i=0;i<content2span.length;i++) {
			 $(".content-2-1 .t-list .itme-des>a").eq(i).attr("sleep",i+1);
		};*/
				$("#content-2-1-left .t-list .itme-des a ").on('click',function(){
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

				if(1){
					var reason1=document.getElementById('reason1')
					$.ajax({
				            url:url+ 'villSeven/aIndexReason',
				            data:{"code":kc,'index':zb,'zcode':kz},
				            method: "post",
				            dataType: "json",
				            success: function(data){
				                if (data.code == 2000){
				                    console.log(zb)
				                    showqsreason(reason1,data);
				                }
				            }
					})
					function showqsreason(reason1,data){
							var str = `
						   <p style='font-size:16px;text-align: left;letter-spacing:1px;'>
						       <span style='font-weight:bold;'>指标达标情况:</span>${data.data}
						    </p>`;
					        $('#reason1').html(str);
					}
				};



})

})