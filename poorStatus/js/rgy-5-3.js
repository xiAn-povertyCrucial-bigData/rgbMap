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
	
	
/*********************  七项退出指标达标情况右上*****************************/
// $("body").on("click","#tux",function(){
  $.ajax({
      url: url+"cntySeven/target",
      data:{'aar001':codeinging,'aar040':201808},
      method: "get",
      dataType: "json",
      success: function(data){
            if (data.code == 2000){
                // console.log("ok");
                allXianReason(data);
            }
        }
  })
  // })
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
        $("#right-s2").css("visibility","visible")
      // $("#right-s2").css("display","block")
      // alert($("#right-s1 .p-p1").length);
      $("#right-s1 p").click(function(){
          $(".reason2").css("display","block");
          if($(this).index()==0){
              $("#reason2").text(data.data.aar014Reason)
          }else if($(this).index()==1){
            $("#reason2").text(data.data.aae323Reason);
          }else if($(this).index()==2){
              $("#reason2").text(data.data.aae314Reason);
          }else if($(this).index()==3){
              $("#reason2").text(data.data.aae331Reason);
          }else if($(this).index()==4){
              $("#reason2").text(data.data.aae304Reason);
          }else if($(this).index()==5){
              $("#reason2").text(data.data.aae378Reason);
          }else if($(this).index()==6){
              $("#reason2").text(data.data.aae044Reason);
          }
      })
    $("#close2").click(function(){
        $(".reason2").hide();
    })

  }

  $("body ").on('click','#right-s2 .p-item1',function(){			
    if($(this).hasClass('red')){
        //alert("eqwe");
        var index = $("#right-s2 .p-item1").index(this);
        var ger2=document.getElementById('ger2') ;
        switch(index){
            case 0:
            var ss = 'aar014';
            break;
            case 1:
            var ss = 'aae304';
            break;
            case 2:
            var ss = 'aae323';
            break;
            case 3:
            var ss = 'aae378';
            break;
            case 4:
            var ss = 'aae044';
            break;
            case 5:
            var ss = 'aae314';
            break;
            case 6:
            var ss = 'aae331';
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
                        showreason11(ger2,data);
                    }            
                }       
    })
    function showreason11(ger,data){					
            var str = `
            <p>
                ${data.data}
            </p>`;
            $('#ger2').html(str);				 
    }										
};
})
  
  
  
  
}
  
  
  
  
})