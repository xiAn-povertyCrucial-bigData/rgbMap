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

/**************************贫困村户信息（左上角）**************************************/
var Element1=element1;
var myChart1 = echarts.init(document.getElementById('echarts-1'));
$.ajax({
        url:url+ 'villSeven/cntyReachNum',
        data:{'code':codeinging},
        method: "post",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showHu(myChart1,data);
            }
        }
	})
	function showHu(myChart1,data){
	    var linNums11 = null;
	    var linNums13 = null;
            linNums11=data.data.standardNO;
            linNums13=data.data.standardOK;
             myChart1.setOption({
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
	}

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
                    showChanganquWuxiang(myChart2,data);
                }
            }
    	})

function showChanganquWuxiang(obj,data){
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
                    rotate:-60,
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
           grid:{
               top:"15%",
               bottom:"18%"
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
            $('#shuliang').show()
            $('#cunname').html(params.value)
            //zhen编码传递
            for (var i=0;i<linNums2.length;i++) {
            if(params.value==linNums2[i]){
                kj = linnums4[i];
                }
            }
        }

         var tables1=document.getElementById('tables1a')
		 $.ajax({
		            url:url+ 'villSeven/townIndex',
		            data:{'code':kj},
		            method: "get",
		            dataType: "json",
		            success: function(data){
		                if (data.code == 2000){
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
  $("body").on("click","#tables1a tr",function(){
  	$('#ger11').html('');
  	$("#p-list1").css("display","block")
  	$("#p-list1").css("visibility","visible")
  	/*$("#p-list2").css("visibility","visible")
  	$("#p-list2").css("display","block")*/
    $('#cunming01').html($(this).find('td:nth-child(1)').text())
       disctId = $(this).attr("sleep");
      $.ajax({
          url: url+"villSeven/villIndexs",
          data:{'code':disctId},
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

  	var account=data.data.account;
	$('#cun-score01').html(account);
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

  }

  $("body ").on('click','#p-list1 .p-item1',function(){
    if(1){
        //alert("eqwe");
        var index = $("#p-list1 .p-item1").index(this);
        var ger11=document.getElementById('ger11') ;
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
                        showreason11(ger11,data);
                    }
                }
    })
    function showreason11(ger11,data){
            var str = `
            <p style="font-size: 17px;text-align:left;text-indent:30px;">
                ${data.data}
            </p>`;
            $('#ger11').html(str);
    }
};
})


 }

})