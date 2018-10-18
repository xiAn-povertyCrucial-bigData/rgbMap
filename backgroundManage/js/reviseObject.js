$(document).ready(function(){
	let token=$.cookie("token");
        var  infos = [];
        var reviseInfos = [];
        var reviseInfos1 = [];
        var inputs = $("input");
        var selects = $("select");
        var theRequest = new Object();
        var url1=window.location.search; //获取url中"?"符后的字串
        if(url1.indexOf("?")!=-1) {
            var str = url1.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
	    var code = theRequest.value;
	    var year = theRequest.time; 
	    var year1=null;	
		switch (year){
			case '201808':
				year1=2018;
				break;		
			case '201712':
				year1=2017;
				break;
			case '2017':
				year1=2016;
				break;
			case '2016':
				year1=2015;
				break; 
			case '2015':
				year1=2014;
				break;         		
			default:
				break;
		}	
	    $('#year').html(year1+'年'); 
		var base = $('#base')
		var life= $('#life');
	        //村编号 和年份   
	    
            $.ajax({
                url: url + "/zrc/detail/query/basic",
                data:{"aad041": theRequest.value,"aar040": theRequest.time},
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                method: "post",
                dataType: "json",
                json: "callback",
                jsonpCallback: 'jsonpCallback',
                success: function(data){
                    if (data.code == 2000){
                        showBaseInfo(data);
                        getPopInfo();
                        getLifeInfo();
                        
                    }else if(data.code==1005){
						alert(data.message)
				    }else if(data.code==1009){
						alert(data.message)
				    }else if(data.code==4000){
						alert(data.message)
				    }
                }
            
        })

function  showBaseInfo(data){
    infos[0] = data.data.H+'-'+data.data.D+'-'+data.data.E;//行政区划
    infos[1] = data.data.AAD042;//自然村名称
    infos[2] = data.data.AAD043;//组号
    infos[3] = data.data.AAR011; //村负责人
    infos[4] = data.data.AAR012;//村办公电话
}

  
//人口 信息
    function getPopInfo(){
        
        $.ajax({
            url: url + "zrc/detail/query/sta",
            data:{"aad041": theRequest.value,"aar040": theRequest.time},
            beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showPopulationInfo(data);
                }
            }
        
    })
  }

    function showPopulationInfo(data){ 
    	infos[5] = data.data.AAD044;//总户数
        infos[6] = data.data.AAD007;//贫困户数
        infos[7] = data.data.AAD008;//低保户数
        infos[8] = data.data.AAD009;//五保户数
        infos[9] = data.data.AAD010;//总人口
        infos[10] = data.data.AAD015;//妇女人数
        infos[11] = data.data.AAD014;//少数人数人口数
        infos[12] = data.data.AAD016;//残疾人口数
        infos[13] = data.data.AAD013;//五保户人口
        infos[14] = data.data.AAD017;//劳动人口数
        infos[15] = data.data.AAD011;//贫困人数
        infos[16] = data.data.AAD018;//外出务工人口数
        infos[17] = data.data.AAD012;//低保户人口
        inputs.each(function(i,value){
	        $(this).val(infos[i]);
	    })
    }   

       function getLifeInfo(){
        $.ajax({
            url: url + "zrc/detail/query/file",
            data:{"aad041": theRequest.value,"aar040": theRequest.time},
            beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showLifeInfo(data);
                }
            }
        
    })
  }

  function showLifeInfo(data){ 
        var infos1 = [];
        $('#life input').val(data.data.AAD325);//到行政村距离
        infos1[0] = data.data.AAC313;//是否通电
        infos1[1] = data.data.AAD326;//沥青路
        infos1[2] = data.data.AAD416;//宽带
        infos1[3] = data.data.AAC308;//生产用电
        selects.each(function(i,value){
            $(this).val(infos1[i]);
       })  
} 
    var nums = [];
    nums = $(".number");
    $(".number").blur(function(){
        if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
      //  alert($(this).val())
    })
   $(".number").focus(function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })

 $("body").on("click","#submit",function(){
        var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
        var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
        var inputs = $("input");
        inputs.each(function(i,value){
            if(i==4){
                 if ($(this).val().substring(0, 1) == 1) {  
                        if (!isMobile.exec($(this).val()) && $(this).val().length != 11) {  
                            //错误提示信息
                          $(this).css("color","red"); 
                        }  
                    }  
                    //如果为0开头则验证固定电话号码  
                    else if ($(this).val().substring(0, 1) == 0) {  
                        if (!isPhone.test($(this).val())) {  
                        //错误提示信息  
                              $(this).css("color","red"); 
                        }  
                    }  
            }
            if(i>=5&&i<18&&isNaN($(this).val())){
            $(this).css("color","red");
           }
        
        reviseInfos[i] = $(this).val();
    })
    selects.each(function(i,value){
        reviseInfos1[i] = $(this).val();
    })

    
   var data={"aad041": theRequest.value,"aar040": theRequest.time,"aad007":reviseInfos[6],
		   "aad008":reviseInfos[7],"aad009":reviseInfos[8],"aad044":reviseInfos[5],
		   "aad010":reviseInfos[9],"aad011":reviseInfos[15],"aad012":reviseInfos[17],
		   "aad013":reviseInfos[13],"aad014":reviseInfos[11],"aad015":reviseInfos[10],
		   "aad016":reviseInfos[12],"aad017":reviseInfos[14],"aad018":reviseInfos[16],
		   "aad325":reviseInfos[18],"aad326":reviseInfos1[1],"aac308":reviseInfos1[3],
		   "aac313":reviseInfos1[0],"aad416":reviseInfos1[2],"aar011":reviseInfos[3],
		   "aar012":reviseInfos[4]}
    $.ajax({
        url:url+"zrc/update/natvill",
        data:data,
        beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
        method: "post",
        dataType:"json",
        success: function(data){
          if (data.code == 2000){
              alert("修改成功");
          }else if(data.code==1005){
			alert(data.message)
		  }else if(data.code==1009){
			alert(data.message)
		  }else if(data.code==4000){
			alert(data.message)
		  }else{
              alert("修改失败")
          }
        }

    })
    })
})
