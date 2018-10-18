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



/**************************周至县贫困村户信息（左上角）**************************************/
var domc = document.getElementById("echarts-c");
var myChartc = echarts.init(domc);
var colorL=['#DD4F43','#FFCE43','#1FA463'];
    var element=['未达标','已达标'];
    var Element=element;
    option = {
        tooltip : {
            trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : ''        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:Element,
        x:'right',
        itemGap: 6 ,
        itemWidth : 25,
        itemHeight : 15 ,
        selectedMode: false,
        formatter: function(v) {
           return v ;
        },
        textStyle:{
            fontSize:12,
            color: '#fff'
    	}
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '-25%',
        top : '20%',
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
                fontSize:16
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
    /*/!*全市贫困状态概况---贫困村点击事件*!/
    myChartc.on("click",function(){
        $(".tank-2").css("display","block");
        $("#zhezhao").css("display","block");
        //渲染数据
        let nameList=$("#nameList");
        $.ajax({
            url:url+"/map/house/poorvillage/name",
            type:"post",
            data:{"distictName":610100000000},
            dataType:"json",
            success:function(data){
                if(data.code===2000){
                    showList(nameList, data.data);
                }
            }
        })
    })
    function showList(obj, data) {
        obj.empty();
        for (let i = 0; i < data.length; i++) {
            let str = `
                     <li style="display: flex;justify-content: space-between;line-height: 42px;font-size: 16px;">
							<div style="width:50%;">${data[i]}</div>
							<div style="width:50%;">未达标</div>
					</li>
                  `;
            obj.html(function (i, value) {
                return value + str;
            })
        }
    }
    //点击关闭
    $(".tank-2 .close").click(function(){
        $(".tank-2").css("display","none");
        $("#zhezhao").css("display","none");
    })*/


//cun数量
$.ajax({
        url:url+ 'villSeven/cntyReachNum',
        data:{'code':codeinging},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                //console.log("ok0022200");
                showHu(myChartc,data);
                //alert("123")
            }

        }
	})
	function showHu(myChartc,data){
	    var linNums11 = null;
	    var linNums13 = null;
		//for (let i=0;i<data.data.length;i++) {
             linNums11=data.data.standardNO;
             linNums13=data.data.standardOK;
             $('#xiancunshu').html(data.data.standardNO+data.data.standardOK)
             myChartc.setOption({
                series: [
			    {
			        name: '未达标',
			        type: 'bar',
			        stack: '总量',
			        data:[linNums11]
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
	                            	return parseInt(data.data.standardNO)+parseInt(data.data.standardOK)+'个';
		                        }
		                    }
		                }
		            },
			        data: [linNums13]
			    }
        ]
			})
		//}
	}
myChartc.setOption(option);

var domh = document.getElementById("echarts-h");
var myCharth = echarts.init(domh);
var colorL=['#DD4F43','#FFCE43','#1FA463'];
    var element=['未达标', '兜底保障','已达标'];
    var Element=element;
    option = {
        tooltip : {
            trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : ''        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data:Element,
        x:'right',
        y:"25%",
        itemGap: 6 ,
        itemWidth : 25,
        itemHeight : 15 ,
        selectedMode: false,
        formatter: function(v) {
           return v ;
       },
       textStyle:{
        fontSize:12,
        color: '#fff'
    	}
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '-25%',
        top : '20%',
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
                fontSize:16
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

//户数量
$.ajax({
        url:url+ 'map/house/poor/count',
        data:{'year':201808,'disctId':codeinging},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showHu1(myCharth,data);
            }

        }
	})
	function showHu1(myCharth,data){

	    var linNums1 = [];
	    var linNums2 = [];
	    var linNums3 = [];
		//for (let i=0;i<data.data.length;i++) {
             linNums1=data.data.standardNO;
             linNums2=data.data.doudi;
             linNums3=data.data.standardOK;
             //$('#xianhushu').html(parseInt(data.data.standardNO)+parseInt(data.data.standardOK)+parseInt(data.data.doudi))
            myCharth.setOption({
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
myCharth.setOption(option);


/**************************贫困村数量分布统计（左中）*************************************/
    var dom2 = document.getElementById("echarts-2");
    var myChart2 = echarts.init(dom2);
    var linNums1 = [];
    var linNums2 = [];
    var linNums3 = [];
    var linnums4 = [];
    var kj;
     $.ajax({
            url: url+'villSeven/cntyIndex',
            data:{'code':codeinging},
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                  //  console.log("ok");
                    showzhouzhixianWuxiang(myChart2,data);
                }

            }
    	})

function showzhouzhixianWuxiang(obj,data){
    for (let i=0;i<data.data.length;i++) {
            linNums1[i]=data.data[i].standardNO;
            linNums2[i]=data.data[i].disctName;
            linNums3[i]=data.data[i].standardOK;
            linnums4[i]=data.data[i].disctId;
        }
       obj.setOption({
          xAxis: {
                type: 'category',
                triggerEvent:true,
                data: linNums2,
                axisLabel:{
                    interval:0,
                    rotate:-55,
                    textStyle:{
                        fontSize:graph_x
                    }
                },
                axisLine:{
                        lineStyle:{
                            color:'#fff'
                        }
                    }
            },
            series: [
            {
                name: '未达标',
                type: 'bar',
                barWidth:10,
                stack: '总量',
                data: linNums1
            },
            {
                name: '已达标',
                type: 'bar',
                stack: '总量',
                barWidth:10,
                data: linNums3
            }
        ]
			})
 }
 myChart2.on('click',function (params) {

        if (params.componentType == "xAxis") {
        $('#zhezhao').show();
        $('.contentsss3').show();
        $('#xianjie').html(params.value)
            //zhen编码传递
            for (var i=0;i<linNums2.length;i++) {

            if(params.value==linNums2[i]){
                kj = linnums4[i];
                }
            }
        }
         var tables1=document.getElementById('tables1')
		 $.ajax({
		            url:url+ 'villSeven/townIndex',
		            data:{'code':kj},
		            method: "get",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
		                   // console.log("ok");
		                    allCun(tables1,data);
		                }
		            }
		    })
  })
  function allCun(obj,data){
      obj.innerHTML = '';
      var str = `<tr>
	                <th class="thsa1">村名</th>
	                <th class="thsa2">达标情况</th>
	            </tr>
	            `;

    for(let i = 0; i < data.data.length; i++ ){
        if(data.data[i].isReach=="是"){
            var codeType = "达标";
        }else if(data.data[i].isReach=="否"){
            var codeType = "未达标";
        }
       str +=` <tr sleep="${data.data[i].disctId}">
                            <td>${data.data[i].vill}</td>`;
                if(codeType=="达标"){
                    str += ` <td style="color:limegreen;">${codeType}</td>`
                }else{
                     str += ` <td style="color:#DD4F43;">${codeType}</td>`
                }
    }
    obj.innerHTML = str;
  }

 var disctId='';
  $("body").on("click","#p-list9 >table >tbody> tr",function(){
  	$('#ger3').html('');
       disctId = $(this).attr("sleep");
       $('#cunming01').html($(this).children("td:nth-child(1)").text())

      $.ajax({
          url: url+"villSeven/villIndexs",
          data:{'code':disctId,'zcode':kj},
          method: "get",
          dataType: "json",
          success: function(data){
                if (data.code == 2000){
                    // console.log("ok");
                    allCunReason(data);
                }
            }
      })
  })
  function allCunReason(data){

  				$('#cun-score01').html(data.data.account);
	    		$('#defen04').html(data.data.aad371)
	    		$('#defen01').html(data.data.aac331)
	    		$('#defen05').html(data.data.aae113)
	    		$('#defen07').html(data.data.aad391)
	    		$('#defen03').html(data.data.aac313)
	    		$('#defen06').html(data.data.aac312)
	    		$('#defen02').html(data.data.aad328)
                  if( data.data.aac331==0){
				    	$('#color71').addClass('red').removeClass('green');
				    }else{
				    	$('#color71').addClass('green').removeClass('red');
				    }
				    if( data.data.aad328==0){
				    	$('#color72').addClass('red').removeClass('green');
				    }else{
				    	$('#color72').addClass('green').removeClass('red');
				    }
				    if( data.data.aac313==0){
				    	$('#color73').addClass('red').removeClass('green');
				    }else{
				    	$('#color73').addClass('green').removeClass('red');
				    }
				    if( data.data.aad391==0){
				    	$('#color74').addClass('red').removeClass('green');
				    }else{
				    	$('#color74').addClass('green').removeClass('red');
				    }
				    if( data.data.aae113==0){
				    	$('#color75').addClass('red').removeClass('green');
				    }else{
				    	$('#color75').addClass('green').removeClass('red');
			        }
                    if( data.data.aac312==0){
				    	$('#color76').addClass('red').removeClass('green');
				    }else{
				    	$('#color76').addClass('green').removeClass('red');
				    }
				    if( data.data.aad371==0){
				    	$('#color77').addClass('red').removeClass('green');
				    }else{
				    	$('#color77').addClass('green').removeClass('red');
			        }
                $("#p-list8").css("visibility","visible")
                $("#p-list8").css("display","block")

  }

  $("body ").on('click','#p-list8 .p-item1',function(){
    if(1){
        var index = $("#p-list8 .p-item1").index(this);
        var ger3=document.getElementById('ger3') ;
        switch(index){
            case 0:
            var ss = 'aac331';
            break;
            case 1:
            var ss = 'aad328';
            break;
            case 2:
            var ss = 'aac313';
            break;
            case 3:
            var ss = 'aad391';
            break;
            case 4:
            var ss = 'aae113';
            break;
            case 5:
            var ss = 'aac312';
            break;
            case 6:
            var ss = 'aad371';
            break;
            default:
           break;
        }
        $.ajax({
                url:url+ 'villSeven/aIndexReason',
                data:{'index':ss,"code":disctId,'zcode':kj},
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        showreason11(ger3,data);
                    }
                }
    })
    function showreason11(ger3,data){
            var str = `
            <p style="font-size: 18px;text-align: left;text-indent:40px;padding:3px 4px;">
                ${data.data}
            </p>`;
            $('#ger3').html(str);
    }
};
})

}

})