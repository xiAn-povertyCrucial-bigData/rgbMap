///////////////////////////////////////////////////
$(document).ready(function(){
	/*****/
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

var dom3 = document.getElementById("echarts-3");
var myChart3 = echarts.init(dom3);
var y=201808;
var linNames_jie=[];
var jiebianma=[];
var linNamescun=[];
var cunbianma=[];
var hubianma=[];
var kh='';
var kj='';
var app = {};
option = null;

/****************************周至县贫困户数量分布统计（左下）*************************************/

option = {
    color: ['#DD4F43','#FFCE43','#1FA463'],
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
        data: ['未达标户','兜底保障户', '已达标户'],
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
        data: [/*'人均纯收入','安全住房','义务教育辍学学生','新农合和大病保险','安全饮水'*/],
        axisLabel:{
        	interval:0,
        	rotate:-75,
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
            name: '兜底保障户',
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
            name: '已达标户',
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
            url: url+'map/house/count',
            data:{"year":y,'disctId':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showjdhu(myChart3,data);

                }

            }
    	})
	function showjdhu(myChart3,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_jie[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK;
             jiebianma[i]=data.data[i].AAR008;

            myChart3.setOption({
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
                        name: ['未达标户'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['兜底保障户'],
                        data: linNums2
          			},
          			{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标户'],
                        data: linNums3
          			}

                	]

			})
		}

	}
//区贫困户五项

if (option && typeof option === "object") {
    myChart3.setOption(option, true);
}

myChart3.on('click', function (params) {

        if(params.componentType == "xAxis"){
        	$('#zhezhao').show();
            $('.contentsss4').show()
            $('#zhenjie').html(params.value)
        	  //zhen编码传递
	    	for (var i=0;i<linNames_jie.length;i++) {
			   if(params.value==linNames_jie[i]){
			   	 kj = jiebianma[i];
			   	}
		    }
            //  $(".content-5-2").css({'opacity':'1','top':'10%'});
        }else{

        }
   var dom10= document.getElementById("echarts-10");
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
                        name: ['未达标户'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['兜底保障户'],
                        data: linNums2
          			},
          			{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标户'],
                        data: linNums3
          			}
                	]
			})
		}
	}
});

myChart10.on('click', function (params) {
	$('#tables3').html('');
	$('#ger').html('');
	$('#huming').html('');
	$('#cunname').html(params.value)
    var kk;
    if(params.componentType == "xAxis"){
    	for (var i=0;i<linNamescun.length;i++) {
			   if(params.value==linNamescun[i]){
			   	 kc = cunbianma[i];
			   	}
		    }
	}

  var table3 = document.getElementById("tables3");
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
                var num = $(this).parent().attr("sleep");
                kh = hubianma[num];
                console.log(kh)
                var zhibiao3=document.getElementById('p-lists5') ;
                $('#huming').text($(this).parent().children("td:nth-child(1)").text())
                $.ajax({
                    url:url+ 'map/five/house/five',
                    data:{"year":y,'aac001':kh,'disctId':kc},
                    method: "post",
                    dataType: "json",
                    success: function(data){
                        if (data.code == 2000){
                            console.log("ok");
                            AllhuWuxiang(zhibiao3,data);

                        }
                    }
                })
                function 	AllhuWuxiang(zhibiao3,data){
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
					var num = $(this).parent().attr("sleep");
					kh = hubianma[num];
					console.log(kh)
					var zhibiao3=document.getElementById('p-lists5') ;
					$('#huming').text($(this).parent().children("td:nth-child(1)").text())
					$.ajax({
						url:url+ 'map/five/house/five',
						data:{"year":y,'aac001':kh,'disctId':kc},
						method: "post",
						dataType: "json",
						success: function(data){
							if (data.code == 2000){
								AllhuWuxiang(zhibiao3,data);
							}
						}
					})
					function 	AllhuWuxiang(zhibiao3,data){
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
				$('#tables3 >tr').eq(k).find('td:nth-child(5)').css('color','#DD4F43');
				$('#tables3 >tr').eq(k).find('td:nth-child(5)').text('未达标');
				//达标情况点击 --户五项
				$('#tables3 >tr').eq(k).find("td:nth-child(5)").click(function(){
						$('#ger').html('');
						var num = $(this).parent().attr("sleep");
						kh = hubianma[num];
						console.log(kh)
						 var zhibiao3=document.getElementById('p-lists5') ;
				 $('#huming').text($(this).parent().children("td:nth-child(1)").text())
				 $.ajax({
					url:url+ 'map/five/house/five',
					data:{"year":y,'aac001':kh,'disctId':kc},
					method: "post",
					dataType: "json",
					success: function(data){
						if (data.code == 2000){
							console.log("ok");
							AllhuWuxiang(zhibiao3,data);

						}
					}
				})
				function 	AllhuWuxiang(zhibiao3,data){
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
                                //console.log("ok");
                                showreason11(ger,data);
                            }
                        }
			})
			function showreason11(ger,data){
					var str = `

				   <p style="font-size: 18px;text-align: left;text-indent:40px;padding:4px 4px;">
				        ${data.data}
				    </p>`;
			        $('#ger').html(str);
			}
		};
		})
	};
})

}

})