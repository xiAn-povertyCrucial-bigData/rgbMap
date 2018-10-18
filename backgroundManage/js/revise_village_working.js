$(function(){

	let token=$.cookie("token");
	var AAD090=null;
	var theRequest = new Object();
    var url1=window.location.search; //获取url中"?"符后的字串
        if(url1.indexOf("?")!=-1) {
            var str = url1.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
	console.log(theRequest.value)
	console.log(theRequest.value1)
	console.log(theRequest.AAD090)
	var start = $("#start");
    var end = $("#end");
 //驻村工作队详情
 	var table1=$('#basicInfo');

 	$.ajax({
            url:url + "fpzt/zcgzd/update/detail",
            type:"get",
            data:{"aad090":theRequest.AAD090},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            dataType:"json",
            success:function (data) {
            if (data.code == 2000){

                        showxiangqing(table1,data);
                    }else if(data.code==1005){
			alert(data.message)
		}else if(data.code==1009){
			alert(data.message)
		}else if(data.code==4000){
			alert(data.message)
		}
            },
            error:function () {}
        })

	function showxiangqing(obj,data){
			AAD090=data.data.AAD090;
           $(".input2").val(data.data.AAB002);
           $(".input3").val(data.data.AAP001);
           $(".input4").val(data.data.AAK888);
           $(".input5").val(data.data.AAR012);
           $(".select1").val(data.data.AAK032);
           $(".select2").val(data.data.AAK031);
           $(".select3").val(data.data.AAK777);
           $(".select4").val(data.data.AAK666);
           $(".select5").val(data.data.AAK039);
           $(".select6").val(data.data.AAB003);
           $(".input6").val(data.data.AAB004);
           $(".select7").val(data.data.AAK036);
           $(".select8").val(data.data.AAK033);
           $(".select9").val(data.data.AAK037);
           $("#start").attr('value',data.data.AAR020);
           $("#end").attr('value',data.data.AAR021);

  }


//修改驻村工作队
$('#add').click(function(){
	var start2 = start.val().replace(/-/g,"");
    var end2 = end.val().replace(/-/g,"");
    if(start2 >= end2){
       end2="";
       end.val("");
    }
	var f = 1;
 	$(".required").each(function(i,value){
        if($(".required").eq(i).val()==''||$(".required").eq(i).val()==null){
        	//alert('姓名和手机号码不能为空')
            $(".must").css("color","red");
            f = 0;
        }else{
            $(".must").css("color","#333");
            f = 1;
        }
    })
	if($("#required1").val().length!=11||!(/^1[3|4|5|7|8|9][0-9]\d{4,8}$/.test($(".required").eq(1).val()))){
    	alert('请填写正确手机号码')
    	$("#required1").css("color","red");
        f = 0;
    }
	var sub;
        sub={"aak110":theRequest.value,"aad001":theRequest.value1,'aad090':AAD090,"aab002":$(".input2").val(),"aap001":$(".input3").val(),
        "aak888":$(".input4").val(), "aar012":$(".input5").val(),"aak032":$(".select1").val(),"aak031":$(".select2").val(),
        "aak777":$(".select3").val(),"aak666":$(".select4").val(),"aak039":$(".select5").val(), "aab003":$(".select6").val(),
        "aab004":$(".input6").val(),"aak036":$(".select7").val(),"aak033":$(".select8").val(),"aak037":$(".select9").val(),
        'aar020':start2,'aar021':end2
        }
	if(f==1){
	var flag = 0;
   	$.ajax({
            url:url+"fpzt/zcgzd/update",
            method: "get",
	        dataType: "json",
	        json: "callback",
	        jsonpCallback: 'jsonpCallback',
            data:sub,
            beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
          	},

            success:function(data){
	            if (data.code == 2000){
	            	alert("修改成功");
	           	window.history.go(-1);
	            }else if(data.code==1005){
			alert(data.message)
		    }else if(data.code==1009){
			alert(data.message)
		    }else if(data.code==4000){
			alert(data.message)
		    }else{
	            	alert("修改失败");
	            }
            }
        })

   	}
})


})