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


var app = {};
option = null;
var zb;
linNames_xian=[];
var xianbianma=[];
var zhibiaobianma=[];
linNames_zhen=[];
var zhenbianma=[];
var cunbianma=[];
    /****************周至县贫困村七项退出指标统计 （右中）**********************/
     var dom5 = document.getElementById("echarts-5");
    var myChart5 = echarts.init(dom5);
    var linNums1 = [];
    var linNums2 = [];
    var linNums3 = [];
    var linnums4 = [];
     $.ajax({
            url: url+'villSeven/aCntySevenIndexs',
            data:{'code':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showShiqixiang(myChart5,data);

                }

            }
    	})
	function showShiqixiang(myChart5,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var type = [];
		//for (let i=0;i<data.data.length;i++) {
             linNums1=[data.data.aae113No,data.data.aac331No,data.data.aad328No,data.data.aac312No,data.data.aac313No,data.data.aad391No,data.data.aad371No];
             linNums2=[data.data.aae113Is,data.data.aac331Is,data.data.aad328Is,data.data.aac312Is,data.data.aac313Is,data.data.aad391Is,data.data.aad371Is];
             //console.log(linNums2[i]);
            myChart5.setOption({
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
		//}

	}
myChart5.on('click',function (params) {

        if(params.componentType =="xAxis"){
        	$('#zhezhao').show();
            $('.contentsss1').show()
            switch(params.value){
		    case '贫困发生率':
		      zb='aac331';
		      break;
		    case '通沥青(水泥)路':
		      zb='aad328';
		      break;
		    case '电力入户率':
		      zb='aac313';
		      break;
		    case '集体经济':
		      zb='aad371';
		      break;
		    case '人均可支配收入':
		      zb='aae113';
		      break;
		    case '安全饮水':
		      zb='aac312';
		      break;
		    case '标准卫生室':
		      zb='aad391';
		      break;
		  }
        }

    $("#xianqixiang").text(params.value);
    $.ajax({
            url: url+'villSeven/townAIndex',
            data:{'index':zb,'code':codeinging},
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    linNames_xian=[]
	 	   	   	    myChart101.setOption({
	   	                xAxis: {
	                        data:linNames_xian
	                    }
	   		        });
                    showXianqiuxiang(myChart101,data);

                }

            }
    	})
	function showXianqiuxiang(myChart101,data){
	    var linNums1 = [];
	    var linNums2 = [];
		for (let i=0;i<data.data.length;i++) {
			 linNames_xian[i]=data.data[i].disctName;
             linNums1[i]=data.data[i].standardNO;
             linNums2[i]=data.data[i].standardOK;
             xianbianma[i]=data.data[i].disctId;
             zhibiaobianma[i]=data.data[i].index;
            myChart101.setOption({
                xAxis: {
                        data: linNames_xian
                       },
                yAxis:  {
			        type: 'value'

				},
                series: [
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['未达标村'],
                        data: linNums1
          			} ,
                	{   type: 'bar',
			            stack: '总量',
			            barWidth: 10,
                        name: ['已达标村'],
                        data: linNums2
          			}

                	]
			})

		}

	}

});

myChart101.on('click',function (params) {
	$('#tablesq').html('');
	$('#reasoncun').html('');
	$('#p-item1-es').html('');
    if(params.componentType =="xAxis"){
    	for (var i=0;i<linNames_xian.length;i++) {
		   if(params.value==linNames_xian[i]){
		   	 kx = xianbianma[i];
		   	}
	    }
        document.getElementById("p-list12").style.visibility = "visible";
    }
    $('#zhenming').html(params.value)
    var qxtable=document.getElementById('tablesq')
	 $.ajax({
	            url:url+ 'villSeven/villAIndex',
	            data:{'index':zb,'code':kx},
	            method: "post",
	            dataType: "json",
	            success: function(data){
	                if (data.code == 2000){
	                    showhuqixiang(qxtable,data);
	                }
	            }
	  });

     function showhuqixiang(qxtable,data){
	      var str = `
	       <tr style="background: linear-gradient(#0D4770, #000103);">
                <th> 村名  </th>
                <th> 达标情况  </th>
            </tr> `;
	          $('#tablesq').html(str);

		for(let i = 0; i < data.data.length; i++ ){
			cunbianma[i]=data.data[i].disctId;
		    var str1=`
		      <tr sleep=${i}>
	              <td>${data.data[i].vill}</td>
	              <td>${data.data[i].isReach}</td>
	          </tr>
	          `;
	           $('#tablesq').html(function (i, value) {
	                return value + str1;
	           });
		   }
		   for(let k=0; k<=$('#tablesq >tr').length; k++){
		   		if($('#tablesq >tr').eq(k).find('td:nth-child(2)').text()=='否'){
		         	$('#tablesq >tr').eq(k).find('td:nth-child(2)').css('color','#DD4F43');
		         	$('#tablesq >tr').eq(k).find('td:nth-child(2)').text('未达标');
		         	$('#tablesq >tr').eq(k).find("td:nth-child(2)").click(function(){
		         		$('#p-item1-es').html('');
					   	var num = $(this).parent().attr("sleep");
					   			kc = cunbianma[num];
					   	var qxreason=document.getElementById('#p-item1-es')
						 $.ajax({
						            url:url+ 'villSeven/aIndexReason',
						            data:{"code":kc,'index':zb,'zcode':kx},
						            method: "post",
						            dataType: "json",
						            success: function(data){
						                if (data.code == 2000){
						                    showqxreason(qxreason,data);
						                }
						            }
						    })

					      $("#p-list10").css("visibility","visible");
					   });
		        }else{
		         	$('#tablesq >tr').eq(k).find('td:nth-child(2)').css('color','limegreen');
		         	$('#tablesq >tr').eq(k).find('td:nth-child(2)').text('已达标');
                    $('#tablesq >tr').eq(k).find("td:nth-child(2)").click(function(){
                    	$('#p-item1-es').html('');
                        var num = $(this).parent().attr("sleep");
                        kc = cunbianma[num];
                        var qxreason=document.getElementById('#p-item1-es')
                        $.ajax({
                            url:url+ 'villSeven/aIndexReason',
                            data:{"code":kc,'index':zb,'zcode':kx},
                            method: "post",
                            dataType: "json",
                            success: function(data){
                                if (data.code == 2000){
                                    showqxreason(qxreason,data);
                                }
                            }
                        })
                        $("#p-list10").css("visibility","visible");

                    });
                }

				function showqxreason(qxreason,data){
					$("#reasoncun").text($('#tablesq >tr').eq(k).find('td:nth-child(1)').text()+$("#xianqixiang").text()+'未达标原因');
					 var str = `
					   <p style='font-size:18px;text-align: left;text-indent:40px;padding:3px 4px;'>
					        ${data.data}
					    </p>`;
				        $('#p-item1-es').html(str);
				}
			}
		}



});




}



})