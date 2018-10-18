$(function () {
    let token=$.cookie("token");
    var city = $("#county");
    var area = $("#township");
    var town =$("#village");
    var start = $("#start");
    var end = $("#end");
    var str = `<option value="">县（区）</option>`;
    city.html(str);
    var str1 = `<option value="">乡（镇）</option>`;
    area.html(str1);
    var str2 = `<option value="">村</option>`;
    town.html(str2);
    //加载县
    init_County();
    function init_County(){
        // alert("县进来了");
        //var county = $("#county");
        $.ajax({
            url: url + "district/county",
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
                    showCountyInfo( city,data);
                }

            }
        })
    }
    function showCountyInfo(obj,data){
        obj.empty();
        var str = `<option value="">县（区）</option>`;
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
        for(let i=0;i<arr.length;i++){
            console.log(arr[i].number+"---"+aa.aar008);
            if(arr[i].number==aa.aar008 ||arr[i].number==aa.aaa113){
                console.log(arr[i].name);
                console.log($("#county option"))
                // $("#county").empty();
                $("#county").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
                var opt=$("#county");
                var opt1 = $("#township");
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
                            page.html(data.data.total);
                        }
                    }

                })
            }
        }
    }
    $("#county").change(function(){
        var opt=$("#county");
        var opt1 = $("#township");
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
                    page.html(data.data.total);
                }
            }

        })
    });
    function showTownInfo(obj,data){
        obj.empty();
        let arr=[];
        var str = `<option value="">乡（镇）</option>`;
        for(let i = 0; i < data.data.length; i++){
            str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
            obj.html(str);
            let obj2={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
            arr.push(obj2);
            obj.html(str);
        }
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);
        if(aa.aar008.substring(6)!="000000"){
            for(let i=0;i<arr.length;i++){
                console.log(arr[i].number+"---"+aa.aaa113);
                if(arr[i].number!==aa.aaa113){
                    $("#township").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
                    var opt=$("#township");
                    var opt1 = $("#village");
                    $.ajax({
                        url: url + "district/village",
                        data:{"town":opt.val()},
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
                                var town = $("#township").val();
                                var vill = $("#village");
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
                                        }
                                    }
                                })
                                showVillageInfo(opt1,data);
                                page.html(data.data.total);
                            }
                        }

                    })
                }
            }
        }
    }
    $("#township").change(function(){
        var town = $("#township").val();
        var vill = $("#village");
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
    //var  red1 = 1;
    $('#button_add').click(function(){
        //red1++;
        var  str =`<tr>
                <td class="delete" style="corsor:pointer;"><button>删除</button></td>
                 <td><input type="text" placeholder="请输入" class="input2"/> </td>
                <td><input type="text" placeholder="请输入" class="input3"/> </td>
                <td><input type="text" placeholder="请输入" class="input4"/> </td>               
                <td><input type="text" placeholder="请输入" class="input5"/> </td>   
                <td>
                	<select class="select1">
                        <option value="">请选择</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </td>
                <td>
                	<select class="select2">
                        <option value="">请选择</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </td>
                <td>
                    <select class="select9">
                        <option value="">请选择</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </td>
                <td>
                	<select class="select3">
                        <option value="">请选择</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </td>
                <td>
                	<select class="select4">
                        <option value="">请选择</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </td>            
                <td>
                	<select class="select5">
                           <option value="">请选择</option>
                           <option value="1">男</option>
                           <option value="2">女</option>
			   <option value="9">未说明性别</option>
                        </select>
                </td>  
                <td><input type="text" placeholder="请输入" class="input6"/> </td>  
                <td>
                	<select name="" class="select6">
                       <option value="">--请选择--</option>                       
	                    <option value="10">研究生及以上</option>
	                    <option value="11">博士研究生</option>                        
	                    <option value="14">硕士研究生</option>                        
	                    <option value="20">大学本科</option>                        
	                    <option value="30">大学专科</option>                        
	                    <option value="40">中专技校</option>                        
	                    <option value="41">中等专科</option>                        
	                    <option value="44">职业高中</option>                        
	                    <option value="47">技工学校</option>                        
	                    <option value="60">普通高中</option>                        
	                    <option value="70">初中</option>                        
	                    <option value="80">小学</option>                        
	                    <option value="90">其他</option> 
                    </select>
                </td>  
                <td>
                	<select name="" class="select7">
                        <option value="">--请选择--</option>
                        <option value="01">中共党员</option>
                        <option value="02">中共预备党员</option>
                        <option value="03">共青团员</option>
                        <option value="04">民革会员</option>
                        <option value="05">民盟盟员</option>
                        <option value="06">民建会员</option>
                        <option value="07">民进会员</option>
                        <option value="08">农工党党员</option>
                        <option value="09">致公党党员</option>
                        <option value="10">九三学社社员</option>
                        <option value="11">台盟盟员</option>
                        <option value="12">无党派民主人士</option>
                        <option value="13">群众</option>
                    </select>
                </td>  
                <td>
                	<select name="" class="select8">
	                	<option value="">--请选择--</option>                       
	                    <option value="01">种植</option>
	                    <option value="02">养殖</option>
	                    <option value="03">林果</option>
	                    <option value="04">服务</option> 
                    </select>
                </td>  
                <td>
                	<input type="date" id="start"/>
                </td>
                <td>
                	<input type="date" id="end"/>
                </td>
            </tr>`;
        $(".table").append(str);
    })
    /*删除该行*/
    $(document).on("click",".delete",function(){
        confirm("确认删除！");
        $(this).parent().remove();
    })
    $('#add').click(function(){
    	var start2 = start.val().replace(/-/g,"");
	    var end2 = end.val().replace(/-/g,"");
	    if(start2 >= end2){
	       end2="";
	       end.val("");
	    }
        var sub = [];
        for(let i = 0; i < $(".input2").length; i++){
            sub[i]={"aad001":$("#village").val(),"aab002":$(".input2").eq(i).val(),
                "aap001":$(".input3").eq(i).val(),"aak888":$(".input4").eq(i).val(), "aar012":$(".input5").eq(i).val(),
                "aak032":$(".select1").eq(i).val(),"aak031":$(".select2").eq(i).val(),"aak777":$(".select9").eq(i).val(),
                "aak666":$(".select3").eq(i).val(),"aak039":$(".select4").eq(i).val(),"aab003":$(".select5").eq(i).val(),
                "aab004":$(".input6").eq(i).val(),"aak036":$(".select6").eq(i).val(),"aak033":$(".select7").eq(i).val(),
                "aak037":$(".select8").eq(i).val(),'aar020':start2,'aar021':end2
                }
        };
        var f = 1;
        $(".required").each(function(i,value){
            if($(".required").eq(i).val()==''||$(".required").eq(i).val()==null){
                $(".required").css("color","red");
                f = 0;
                return;
            }else{
                $(".required").css("color","#333");
                f = 1;
            }
        })
        if(f==1){
            $.ajax({
                url:url+"/fpzt/addZC",
                method:"post",
                dataType:"json",
                async:false,
                data:JSON.stringify({"ak11Models":sub}),
                beforeSend:function(request){
                    request.setRequestHeader("Authorization",token);
                    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
                contentType:"application/json",
                success:function(data){
                    if (data.code == 2000){
                        alert ("添加成功");
                        location.href="addvillage_worker.html";
                    }else if(data.code==1005){
			alert(data.message)
		    }else if(data.code==1009){
			alert(data.message)
		    }else if(data.code==4000){
			alert(data.message)
		    }else{
                        alert("添加失败");
                    }
                }
            })
        }
    })
})


