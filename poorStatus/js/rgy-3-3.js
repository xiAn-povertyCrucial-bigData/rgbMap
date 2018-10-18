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


var y=201808;
var linNames_jie=[];
var jiebianma=[];
var linNamescun=[];
var cunbianma=[];
var hubianma=[];
var kh='';
var kj='';
var myChart4 = echarts.init(document.getElementById('echarts-4'));
$.ajax({
        url:url+ 'map/house/village',
        data:{'year':y,'disctId':codeinging},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showgwqHu(myChart4,data);
            }
        }
	})
	function showgwqHu(myChart4,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		//for (let i=0;i<data.data.length;i++) {
             linNums1=data.data.standardNO;
             linNums2=data.data.doudi;
             linNums3=data.data.standardOK;
        //}

            myChart4.setOption({
                series: [
			    {
			        name: '未达标户',
			        type: 'bar',
			        stack: '总量',
			        data: [linNums1]
			    },
			    {
			        name: '兜底保障户',
			        type: 'bar',
			        stack: '总量',
			        data: [linNums2]
			    },
			    {
			        name: '已达标户',
			        type: 'bar',
			        stack: '总量',
			       	itemStyle : {
		                normal: {
		                    label:{
		                    	color:'#fff',
		                        show:true,
		                        position:'right',
		                        formatter: function(params) {//格式化柱状图显示label
		                        	//for (let i=0;i<data.data.length;i++) {
	                            		return parseInt(data.data.standardNO)+parseInt(data.data.doudi)+parseInt(data.data.standardOK)+'户';
		                        	//}
		                        }
		                    }
		                }
		            },
			        data: [linNums3]
			    }
        	]
		})
	}
//长安区贫困户达标情况以及数量分布统计
var dom5 = document.getElementById("echarts-5");
var myChart5 = echarts.init(dom5);
$.ajax({
        url: url+'map/house/count',
        data:{"year":y,'disctId':codeinging},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showjdhu(myChart5,data);
            }
        }
	})
	function showjdhu(myChart5,data){
	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_jie[i]=data.data[i].AAR009;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].doudi;
             linNums3[i]=data.data[i].standardOK;
             jiebianma[i]=data.data[i].AAR008;
            myChart5.setOption({
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
myChart5.on('click',function (params) {

    if (params.componentType == "xAxis") {
    	$('#zhezhao').show();
        $('.contents1').show()
        $('#jiecun').text(params.value)
    //zhen编码传递
	for (var i=0;i<linNames_jie.length;i++) {
	   if(params.value==linNames_jie[i]){
	   	    kj = jiebianma[i];
	   	}
    }
        document.getElementById("p-list5").style.display = "block";
        document.getElementById("p-list5").style.visibility = "hidden";
        document.getElementById("p-list4").style.display = "block";
        document.getElementById("p-list3").style.display = "block";
        document.getElementById("p-list3").style.visibility = "hidden";
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
//hu
myChart10.on('click',function (params) {
    $('#cunname2').text(params.value);
    $('#tables3').html('');
    $('#huming').html('');
    $('#ger').html('');
        if(params.componentType =="xAxis") {
        	for (var i=0;i<linNamescun.length;i++) {
			   if(params.value==linNamescun[i]){
			   	 //alert('111')
			   	 kc = cunbianma[i];
			   	}
		    }
            document.getElementById("p-list5").style.visibility = "visible";
        }

        var tables3=document.getElementById('tables3')
		 $.ajax({
		            url:url+ 'map/house/info',
		            data:{"year":y,'disctId':kc},
		            method: "post",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
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
					var num = $(this).parent().attr("sleep");
					kh = hubianma[num];
					var zhibiao3=document.getElementById('p-list3') ;
					$('#huming').text($('#tables3 >tr').eq(k).find('td:nth-child(1)').text())
					$.ajax({
						url:url+ 'map/five/house/five',
						data:{"year":y,'aac001':kh},
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
					$("#p-list3").css("visibility","visible");
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
                var zhibiao3=document.getElementById('p-list3') ;
                $('#huming').text($('#tables3 >tr').eq(k).find('td:nth-child(1)').text())
                $.ajax({
                    url:url+ 'map/five/house/five',
                    data:{"year":y,'aac001':kh},
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
                $("#p-list3").css("visibility","visible");
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
		        	var zhibiao3=document.getElementById('p-list3') ;
			  		$('#huming').text($('#tables3 >tr').eq(k).find('td:nth-child(1)').text())
			 $.ajax({
	            url:url+ 'map/five/house/five',
	            data:{"year":y,'aac001':kh},
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
			    $("#p-list3").css("visibility","visible");
				});

	       }
		}
	var reasonspan1=$(" #p-list3 .p-item2");

	    for (var i=0;i<reasonspan1.length;i++) {
			 $(" #p-list3 .p-item2").eq(i).attr("sleep",i+1);

		};
		$(" #p-list3 .p-item2").on('click',function(){
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

				   <p style='font-size:20px;text-align:left;text-indent:40px;padding:4px 3px;'>
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