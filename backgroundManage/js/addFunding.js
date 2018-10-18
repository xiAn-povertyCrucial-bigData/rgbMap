$(document).ready(function(){
// var url ="http://192.168.1.135:8080/"
//行政区 和年份     
let token=$.cookie("token");
//加载西安市
init_Shi();
    function init_Shi(){
        var p_shi=$("#p_shi");
        $.ajax({
            url: url + "district/city",
            data:{},
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
                    showShiInfo(p_shi,data);
                    init_County()
                }
            }
        })
    }
    function showShiInfo(obj,data){
        obj.empty();
        var str = `<option value="">全部</option>`;
        var string = "";
        let arr=[];
        for(let i = 0; i < data.data.length; i++){
            str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
            let obj={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
            arr.push(obj);
        }
        obj.html(str);
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);
        if(aa.aar008=="610100000000"){
	        datas={'aar040':201808}
	        console.log(datas)
	    }else if(aa.aar008=="619900000000"){
	    	datas={'aar040':201808,"aae001":619900000000}
	        console.log(datas)
	    }else{
	        datas={'aar040':201808,"aae001":$('#p_qv').val()}
	        console.log(datas)
	    }
        if(aa.aar008==619900000000){
        	$("#p_shi").empty().append("<option value='619900000000'>西咸新区</option>").attr("disabled","disabled");
        }
    }
$("#p_shi").change(function(){
    var opt=$("#p_shi");
    var opt1 = $("#p_qv");
         $.ajax({
            url: url + "district/county", 
            data:{"aar001":opt.val()},
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
                     init_County();
                }
            }
    })
});
function init_County(){
    var p_shi=$("#p_shi");
    var p_qv=$("#p_qv");
            $.ajax({
            url: url + "district/county", 
            data:{"aar001":p_shi.val()},
            method: "get",
            beforeSend:function(request){
		          request.setRequestHeader("Authorization",token);
		          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	        },
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                    showCountyInfo( p_qv,data);
                }
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
     }
}


$("#p_x").change(function(){
    var town = $("#p_x").val();
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
                }
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
    })
    $(".number,.jingdu").focus(function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
    $(".jingdu").blur(function(){
        var value = $(this).val();
        var n = /^([-+]?\d{0,11})(\.\d{0,7})?$/;
        var re = new RegExp(n);
        if (re.test(value))
        {
            return true;
        }
        else
        {
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
    })
  //  $("#p_cun").blur(function(){
        if($(this).val()==''||$(this).val()==null){
            $(this).css("color","red");
        }else{
                $(this).css("color","#333");
        }
   // })
   //村编号 和年份
    var formInfos = $('#baseInfo');
    var  pop = $("#population");
    var  work = $("#work10");
    var income = $("#income");

    $("body").on("click","#submit",function(){
       var flag = 0;
        if($("#p_cun").val()==''||$("#p_cun").val()==null){
            $(".must").css("color","red");
            flag = 1;
        }else{
                $(".must").css("color","#333");
        }
       if($("#year").val()==''||$("#year").val()==null){
            $(".must1").css("color","red");
            flag = 1;
        }else{
                $(".must1").css("color","#333");
        }
       data1= {"aar040": $("#year").val(),"aar008":$("#p_cun").val()};
       $.ajax({
            url:url+"pkc/query/vill/exist",
            method:"post",
            dataType:"json",
            async:false, 
            data:data1,
            beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	        },
            success:function(data){
            if(data.code==2000){
                var input1 = $("input");
                var select1 = $("select");
                var k1 = [];
                var k11 = [];
                input1.each(function(i,value){
                    k1[i] = $(this).val();
                })
                select1.each(function(i,value){
                    k11[i] = $(this).val();
                })
                var data = {"aar040":$("#year").val(),"aar008": $("#p_cun").val(),"aar011":k1[0],
                "aar012":k1[1],"aad038":k1[2],"aad037":k1[3],"aad026":k1[4],"aar101":k1[5],
                "aar102":k1[6],"aar103":k1[7],"aad005":k1[8],"aaf031":k11[5],"aad035":k11[6],"aad036":k11[7],
                "aad004":k11[8],"ada007":k11[9],"aad010":k1[9],"aad008":k1[10],"aad012":k1[11],
                "ada003":k1[12],"ada004":k1[13],"aad009":k1[14],"aad010":k1[15],"ada005":k1[16],
                "ada006":k1[17],"aad007":k1[18],"aad011":k1[19],"ada001":k1[20],"ada002":k1[21],
                "aad006":k1[22],"ada024":k1[23],"aad014":k1[24],"aad015":k1[25],"aad016":k1[26],
                "aad017":k1[27],"aad322":k1[28],"aad324":k1[29],"aad321":k1[30],"ada008":k1[31],
                "ada009":k1[32],"aad358":k1[33],"aad355":k1[34],"aad357":k1[35],"aad356":k1[36],
                "ada010":k1[37],"ada011":k1[38],"aad371":k1[39],"aad372":k1[40],"ada012":k1[41],
                "ada013":k1[42],"aad381":k1[43],"aad383":k1[44],"aad382":k1[45],"aad384":k1[46],             
                "aad391":k1[47],"aad392":k1[48],"aad393":k1[49],"aad394":k1[50],"ada014":k1[51],
                "ada015":k1[52],"aad401":k1[53],"aad402":k1[54],"aad411":k1[55],"aad413":k1[56],
                "aad415":k1[57],"aad412":k1[58],"aad414":k1[59],"aad311":k1[60],"aad313":k1[61],
                "aad314":k1[62],"aad312":k1[63],"ada024":k1[64],"aad328":k11[10],"aad323":k11[11],
                "aad301":k1[65],"aad302":k1[66],"aad019":k1[67],"aad023":k1[68],"aad025":k1[69],
                "aad027":k1[70],"aad021":k1[71],"aad022":k1[72],"aad024":k1[73],"ada016":k1[74],
                "ada017":k1[75],"ada018":k1[76],"ada019":k1[77],"ada020":k1[78],"ada021":k1[79],
                "ada022":k1[80],"ada023":k1[81]}

                $.ajax({
                    url:url+"pkc/insert/villInfo",
                    method:"post",
                    dataType:"json",
                    async:false, 
                    data:data,
                    beforeSend:function(request){
			              request.setRequestHeader("Authorization",token);
			              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
			        },
                    success:function(data){
                    if(data.code==2000){
                        flag = 1;
                    }
                    }
                })

                if(flag==1){
                    alert("添加成功")
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
                    }
                })
        //添加
     
   })


})
