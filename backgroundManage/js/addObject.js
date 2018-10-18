$(document).ready(function(){
      //  var url="http://192.168.1.135:8080/"
      let token=$.cookie("token");
        var  infos = [];
        var addInfos = [];
        var addInfos1 = [];
        var inputs = $("input");
        var selects = $("select");
    //    $("#year").html(theRequest.time.substring(-1,4)+"年");

init_County();
function init_County(){
    var county = $("#p_qv");
            $.ajax({
            url: url + "district/county", 
            beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
            method: "get",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                   // console.log("ok");
                    showCountyInfo( county,data);
                }
                // console.log('111');
            }
        
    })
}


function  showCountyInfo(obj,data){
     obj.empty();
     var opt = $("#p_cun");
     var opt1 = $("#p_xiang");
     var str1 = `<option value="">乡（镇）</option>`;
     var str2 = `<option value="">村</option>`
     opt1.html(str1);
     opt.html(str2);
     var str = `<option value="">县（区）</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
    }
    obj.html(str);
}

$("#p_qv").change(function(){
    var opt=$("#p_qv");
    var opt1 = $("#p_x");
        //console.log("111111111111");
         $.ajax({
            url: url + "district/town", 
            data:{"county":opt.val()},
            beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
            method: "get",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                    showTownInfo(opt1,data);
                   //  page.html(data.data.total);
                }
                // console.log('111');
            }
        
    })
});

function showTownInfo(obj,data){
        obj.empty();
     var str = `<option value="">乡（镇）</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
     // console.log(obj.val());
     }
}


$("#p_x").change(function(){
    var town = $("#p_x").val();
   // console.log(town);
    var vill = $("#p_cun");
         $.ajax({
            url: url + "district/village", 
            data:{"town": town},
            method: "get",
            dataType: "json",
            beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
            success: function(data){
                if (data.code == 2000){
                
                    showVillageInfo(vill,data);
                   // showPage($(".searchPage"),data.data.total);
                   // init_County();
                }
                // console.log('111');
            }
        
    })
});
function showVillageInfo(obj,data){
       obj.empty();
     var str = `<option value="">村</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
    
     }
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
$("#villName").blur(function(){
       $.ajax({
        url:url+"zrc/query/name/exist",
        data:{"aad042":$("#villName").val()},
        beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
        method: "post",
        dataType:"json",
        success: function(data){
            if(data.code==2000){
                    $("body").on("click","#submit",function(){
                            var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
                            var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;
                            var inputs = $("input");
                            inputs.each(function(i,value){
                                if(i==2){
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
                            
                            addInfos[i] = $(this).val();
                        })
                        selects.each(function(i,value){
                            addInfos1[i] = $(this).val();
                        })

                        
                    var data={"aar008": addInfos1[2],"aar040": addInfos1[3],"aad042":addInfos[0],"aad007":addInfos[4],"aad008":addInfos[5],"aad009":addInfos[6],"aad044":addInfos[3],"aad010":addInfos[7],"aad011":addInfos[13],"aad012":addInfos[15],"aad013":addInfos[11],"aad014":addInfos[9],"aad015":addInfos[8],"aad016":addInfos[10],"aad017":addInfos[12],"aad018":addInfos[14],"aad325":addInfos[16],"aad326":addInfos1[5],"aac308":addInfos1[7],"aac313":addInfos1[4],"aad416":addInfos1[6],"aar011":addInfos[1],"aar012":addInfos[2]}
                        $.ajax({
                            url:url+"zrc/insert/natvill",
                            data:data,
                            beforeSend:function(request){
			                          request.setRequestHeader("Authorization",token);
			                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
			                      },
                            method: "post",
                            dataType:"json",
                            success: function(data){
                            if (data.code == 2000){
                                alert("添加成功");
                            }else if(data.code==1005){
				alert(data.message)
	    		    }else if(data.code==1009){
				alert(data.message)
	   		    }else if(data.code==4000){
				alert(data.message)
            		    }else{
                                alert("添加失败")
                            }
                            }

                        })
                    })
                 }
        }
})
})

 
})
