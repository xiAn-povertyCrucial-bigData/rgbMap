$(document).ready(function(){
	let token=$.cookie("token");
   //var url="http://192.168.1.135:8080/";
 //村编号 和年份
//加载西安市
$('#year').val('201808')
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
                    //init_County()
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
            url: url + "district/yanliang", 
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
    var p_shi = $("#p_shi");
    var county = $("#p_qv");
            $.ajax({
            url: url + "district/yanliang", 
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
                    showCountyInfo( county,data);
                }
            }        
    })
}


function  showCountyInfo(obj,data){
     obj.empty();
     var opt = $("#p_cun");
     var opt1 = $("#p_x");
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
 var  red1 = 1;
 $("body").on("click","#red",function(){
    red1++;
   var  str =`     
                 <tr>
                <td><input class="input1 number" type="text" placeholder="${red1}" disabled style="border: none;width:70px;"/></td>
                <td><input class="input2 mustp11" type="text" placeholder="请输入" style="border: none;width:100px;"/></td>
                 <td>
                <select  class="select110 mustp12" style="margin-left:6px;">
                  <option value="">--请选择--</option>
                  <option value="01"> 居民身份证</option>
                  <option value="02">残疾人证</option>
                  <option value="03">中国人民解放军军官证</option>
                  </select></td>
                <td><input class="input3 mustp13 number" type="text" placeholder="请输入" style="border: none;width:160px;"/></td>
                <td>
                    <select class="select1 mustp14">
                        <option value="">请选择</option>
                        <option value="01">男</option>
                        <option value="02">女</option>
                    </select>
                </td>
                <td><input class="input03 mustp013 number" type="text" placeholder="请输入" style="border: none;width:100px;"/></td>
                <td>
            	<select class="select2 mustp15">
							<option value="">请选择</option>
							<option value="01">本人或户主</option>
							<option value="02">配偶</option>
							<option value="03">之子</option>
							<option value="04">之女</option>
							<option value="05">之儿媳</option>
							<option value="06">之女婿</option>
							<option value="07">之孙子</option>
							<option value="08">之孙女</option>
							<option value="09">之外孙子</option>
							<option value="10">之外孙女</option>
							<option value="11">之父</option>
							<option value="12">之母</option>
							<option value="13">之岳父</option>
							<option value="14">之岳母</option>
							<option value="15">之公公</option>
							<option value="16">之婆婆</option>
							<option value="17">之祖父</option>
							<option value="18">之祖母</option>
							<option value="19">之外祖父</option>
							<option value="20">之外祖母</option>
							<option value="99">其他</option>
						</select>
                </td>
                 
                <td>
						<select class="select3" value="01">
							<option value="">请选择</option>
							<option value="01">汉族</option>
							<option value="02">满族</option>
							<option value="03">回族</option>
							<option value="04">蒙古族</option>
							<option value="05">藏族</option>
							<option value="06">维吾尔族</option>
							<option value="07">苗族</option>
							<option value="08">彝族</option>
							<option value="09">壮族</option>
							<option value="10">布依族</option>
							<option value="11">朝鲜族</option>
							<option value="12">侗族</option>
							<option value="13">瑶族</option>
							<option value="14">白族</option>
							<option value="15">土家族</option>
							<option value="16">哈尼族</option>
							<option value="17">哈萨克族</option>
							<option value="18">傣族</option>
							<option value="19">黎族</option>
							<option value="20">傈僳族</option>
							<option value="21">佤族</option>
							<option value="22">畲族</option>
							<option value="23">高山族</option>
							<option value="24">拉祜族</option>
							<option value="25">水族</option>
							<option value="26">东乡族</option>
							<option value="27">纳西族</option>
							<option value="28">景颇族</option>
							<option value="29">柯尔克孜族</option>
							<option value="30">土族</option>
							<option value="31">达斡尔族</option>
							<option value="32">仫佬族</option>
							<option value="33">羌族</option>
							<option value="34">布朗族</option>
							<option value="35">撒拉族</option>
							<option value="36">毛南族</option>
							<option value="37">仡佬族</option>
							<option value="38">锡伯族</option>
							<option value="39">阿昌族</option>
							<option value="40">普米族</option>
							<option value="41">塔吉克族</option>
							<option value="42">怒族</option>
							<option value="43">乌孜别克族</option>
							<option value="44">俄罗斯族</option>
							<option value="45">鄂温克族</option>
							<option value="46">德昂族</option>
							<option value="47">保安族</option>
							<option value="48">裕固族</option>
							<option value="49">京族</option>
							<option value="50">塔塔儿族</option>
							<option value="51">独龙族</option>
							<option value="52">鄂伦春族</option>
							<option value="53">赫哲族</option>
							<option value="54">门巴族</option>
							<option value="55">珞巴族</option>
							<option value="56">基诺族</option>
							<option value="99">其他</option>
						</select>
                </td>
                <td>
                    <select name="" class="select4">
                        <option value="">--请选择--</option>
                        <option value="01">文盲</option>
                        <option value="02">小学</option>
                        <option value="03">初中</option>
                        <option value="04">高中</option>
                        <option value="05">大专及以上</option>
                        <option value="06">学龄前儿童</option>
                    </select>
                </td>
                <td>
                    <select name="" class="select5">
                        <option value="">--请选择--</option>
                        <option value="01">非在校生</option>
                        <option value="02">学前教育</option>
                        <option value="03">小学</option>
                        <option value="04">七年级</option>
                        <option value="05">八年级</option>
                        <option value="06">九年级</option>
                        <option value="07">高中一年级</option>
                        <option value="08">高中二年级</option>
                        <option value="09">高中三年级</option>
                        <option value="10">中职一年级</option>
                        <option value="11">中职二年级</option>
                        <option value="12">中职三年级</option>
                        <option value="13">高职一年级</option>
                        <option value="14">高职二年级</option>
                        <option value="15">高职三年级</option>
                        <option value="16">大专及以上</option>
                    </select>
                </td>
                <td>
                      <select name="" class="select6">
                        <option value="">--请选择--</option>
                        <option value="01">健康</option>
                        <option value="02">长期慢性病</option>
                        <option value="03">患有大病</option>
                        <option value="04">残疾</option>
                    </select>
                </td>
                <td>
                       <select name="" class="select7">
                        <option value="">--请选择--</option>
                        <option value="01">普通劳动力</option>
                        <option value="02">技能劳动力</option>
                        <option value="03">散失劳动力</option>
                        <option value="04">无劳动力</option>
                    </select>
                </td>               
                <td> 
                     <select name="" class="select10">
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
                    <select class="select11">
                        <option value="">--请选择--</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <td>
                    <select class="select12">
                        <option value="">--请选择--</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <td>
                  <select class="select13">
                        <option value="">--请选择--</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <td>
                  <select class="select013">
                        <option value="">--请选择--</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>    
                <td><input class="input05"  type="text" placeholder="请输入" style="border: none;"/></td>
                <td>
                  <select class="select05">
                        <option value="">--请选择--</option>
                        <option value="1">一级</option>
                        <option value="2">二级</option>
                    </select>
                </td>  
                <td><input class="input5"  type="text" placeholder="请输入" style="border: none;width:100px;"/></td>
                <td><input class="input6"  type="text" placeholder="请输入" style="border: none;width:100px;"/></td>
                <td><input class="input7"  type="text" placeholder="请输入" style="border: none;width:100px;"/></td>
                <td><input class="input8" type="text" placeholder="请输入" style="border: none;width:100px;"/></td>
                <td><input class="input9"  type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>`;

            $("#homeBaseInfo").append(str);
})
/****************input输入数字的判断********************* */
    var nums = [];
    nums = $(".number");
    $("body").on("blur",".number",function(){
        if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
    })
    $("body").on("focus",".number",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
    var income0=$('#homeIncome tr td input');
    var income00=[];
    var income1;
    var income2;
    var income3;
    income0.each(function(i,value){
        $(this).blur(function(){
			var peoplenumber=$('#family').val();
			income3=parseFloat($('#homeIncome tr td input').eq(4).val())+parseFloat($('#homeIncome tr td input').eq(5).val())
			+parseFloat($('#homeIncome tr td input').eq(6).val())+parseFloat($('#homeIncome tr td input').eq(7).val())
			+parseFloat($('#homeIncome tr td input').eq(8).val())+parseFloat($('#homeIncome tr td input').eq(10).val())
			+parseFloat($('#homeIncome tr td input').eq(11).val())+parseFloat($('#homeIncome tr td input').eq(12).val())
			+parseFloat($('#homeIncome tr td input').eq(13).val())+parseFloat($('#homeIncome tr td input').eq(14).val())
			+parseFloat($('#homeIncome tr td input').eq(15).val())+parseFloat($('#homeIncome tr td input').eq(16).val())
			+parseFloat($('#homeIncome tr td input').eq(17).val())+parseFloat($('#homeIncome tr td input').eq(9).val())
        	income1=parseFloat($('#homeIncome tr td input').eq(0).val())+parseFloat($('#homeIncome tr td input').eq(1).val())+parseFloat($('#homeIncome tr td input').eq(3).val())+income3-parseFloat($('#homeIncome tr td input').eq(2).val())
        	income2=income1;        	
        	$('.income1').text(income1);
        	$('.income2').text(income2);
        	$('.income3').text(income3);
        	$('.income4').text(income2/peoplenumber);
        });
    });
    $("body").on("blur","#name1",function(){
        $('#name2').val($('#name1').val())
    })
    $("body").on("blur","#type1",function(){
        $('#type2').val($('#type1').val())
    })
    $("body").on("blur","#number1",function(){
        $('#number2').val($('#number1').val())
    })
    $("body").on("blur","#idCode",function(){
        $('#idCode2').val($('#idCode').val())
    })
    
$("body").on("click","#submit",function(){
    var f = 1;
  //家庭成员的必选项判断判断
    //var mustps =[];
    var musts = [];
    var musts1 = [];
    var mustps1;
    var mustps11 = [];
    var mustps2;
    var mustps12 = [];
    var mustps3;
    var mustps13 = [];
    var mustps4;
    var mustps14 = [];
    var mustps5;
    var mustps15 = [];
    var mustps6;
    var mustps16 = [];
    musts = $(".must");
    musts1 = $(".must1");
    mustps1 = $(".mustp1");
    mustps11 = $(".mustp11");
    mustps2 = $(".mustp2");
    mustps12 = $(".mustp12");
    mustps3 = $(".mustp3");
    mustps13 = $(".mustp13");
    mustps4 = $(".mustp4");
    mustps14 = $(".mustp14");
    mustps5 = $(".mustp5");
    mustps15 = $(".mustp15");
    //mustps6 = $(".mustp6");
    //mustps16 = $(".mustp16");
    var f = 1;
   checkPeople(mustps1,mustps11);
   checkPeople(mustps2,mustps12);
   checkPeople(mustps3,mustps13);
   checkPeople(mustps4,mustps14);
   checkPeople(mustps5,mustps15);
   //checkPeople(mustps6,mustps16);
    function  checkPeople(mustps,mustps1){
          mustps1.each(function(i,value){
            if(mustps1.eq(i).val()==''||mustps1.eq(i).val()==null){
                mustps.css("color","red");
                f = 0;
            }else{
                mustps.css("color","#333");
                f = 1;
            }
            })
    }
    //其他必选项的判断    
    musts.each(function(i,value){
	    if(musts1.eq(i).val()==''||musts1.eq(i).val()==null){
	        $(this).css("color","red");
	          f = 0;
	    }else{
	            $(this).css("color","#333");
	            f = 1;
	    }
	})
    if($('#family').val()!=$(".input1").length){
    	alert('家庭人口数应与家庭成员数相等');
    	f=0;
    }else{
    	f=1;
    }
    if(f==1){
        var flag = 0;
        addBasic();
        function addBasic(){
           $.ajax({
            url:url+"table/pkh/query/holder/exist",
            method:"post",
            dataType:"json",
            data:{"aac031":$("#idCode").val(),"aar040":$("#year").val()},
            beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  },
            async:false, 
            success:function(data){
                if(data.code==2000){

            
            //基础信息的添加
            var input1 = $("#basicInfo tr td input");
            var select1 = $("#basicInfo tr td select");
            var k1 = [];
            var k11 = [];
            input1.each(function(i,value){
                    k1[i] = $(this).val();
                })
            select1.each(function(i,value){
                    k11[i] = $(this).val();
                })
            //生产生活
            var inputs3 = $("#lifeProduct tr td input");
            var selects3 = $("#lifeProduct tr td select");
            var life1 = [];
            var life2 = [];
            inputs3.each(function(i,value){
                life1[i] = $(this).val();
            })
            selects3.each(function(i,value){
            	life2[i] = $(this).val();
            })
            //收入
            var inputs2 = $("#homeIncome tr td input");
            var income = [];
            inputs2.each(function(i,value){
            	income[i] = $(this).val();
            })       
            //易地搬迁
            var relocateInputs = [];
            var inputs4 = $("#banqian tr th select");
            inputs4.each(function(i,value){
                relocateInputs[i]=  $(this).val();
            })
            
            
            var  data={"acr075":relocateInputs[1],"acr078":relocateInputs[2],
            "acr079":relocateInputs[3],"acr081":relocateInputs[4],"acr077":relocateInputs[0],
            "aac081":$('.income1').text(),"aac079":$('.income2').text(),"aac082":$('.income4').text(),"aac073":income[0],
            "aac071":income[1],"aac074":income[2],"aac072":income[3],"aac076":income[4],
            "aac077":income[5],"aac086":income[6],"aac087":income[7],
            "aac078":income[8],"aac083":income[9],"aac085":$('.income3').text(),"aca001":income[10],
            "aca002":income[11],"aca003":income[12],"aca004":income[13],"aca005":income[14],
            "aca006":income[15],"aca007":income[16],"aca008":income[17],
            "aac301":life1[0],"aac302":life1[1],"aac303":life1[2],"aac304":life1[3],"aac305":life1[4],
            "aac306":life1[5],"aac307":life1[6],"aac315":life1[7],"aac317":life1[8],"aac308":life2[0],
            "aac314":life2[1],"aac084":life2[2],"aac316":life2[3],"aac313":life2[4],"aac311":life2[5],
            "aac312":life2[6],"aac318":life2[7],"aac322":life2[8],"aac320":life2[9],"aac319":life2[10],                    
            "aac029":k1[0],"aac031":k1[1],"aar012":k1[2],"aaq002":k1[3],"aac004":k1[4],"aac017":k1[5],
            "aar008":k11[3],"aar040":k11[4],"aaq002":k11[5],"aar010":k11[7],"aac006":k11[6],"aac012":k11[8],
            "aac007":k11[9],"aac008":k11[10],"aac009":k11[11],"aac005":k11[12]}
       
            $.ajax({
                url:url+"table/pkh/insert/holder",
                method:"post",
                dataType:"json",
                data:data,
                beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
                async:false, 
                traditional:true,
                success:function(data){
                   if(data.code==2000){
                     addFamily()
                    }
                }
            })
   
            //家庭成员的添加
            function addFamily(){
                var sub = [];
	            for(let i = 0; i < $(".input1").length; i++){
	                sub[i]={"aac031":$("#idCode").val(),"aar040": $("#year").val(),"aab002":$(".input2").eq(i).val(),
	                "aab004":$(".input3").eq(i).val(),"aab031":$(".input03").eq(i).val(),"aab003":$(".select1").eq(i).val(),
	                "aab006":$(".select2").eq(i).val(), "aab007":$(".select3").eq(i).val(),"aab008":$(".select4").eq(i).val(),
	                "aab009":$(".select5").eq(i).val(),"aab017":$(".select6").eq(i).val(),"aab010":$(".select7").eq(i).val(),
	                "aak033":$(".select10").eq(i).val(),"aab019":$(".select11").eq(i).val(),"aab022":$(".select12").eq(i).val(),
	                "aab030":$(".select13").eq(i).val(),"abb003":$(".select013").eq(i).val(),"abb001":$(".input05").eq(i).val(),
	                "abb002":$(".select05").eq(i).val(),"aab025":$(".input5").eq(i).val(),"aab026":$(".input6").eq(i).val(),
	                "aab027":$(".input7").eq(i).val(),"aab028":$(".input8").eq(i).val(),"aab029":$(".input9").eq(i).val(),
	                "aab018":$(".select110").val()}
	            }
                $.ajax({
                    url:url+"table/pkh/insert/family",
                    method:"post",
                    dataType:"json",
                    async:false,
                    data:JSON.stringify({"peopleList":sub}),
                    beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  	},
                    contentType:"application/json",
                    success:function(data){
	                    if(data.code==2000){
	                        flag = 1;
	                    }
						else if(data.code==1005){
							alert(data.message);
							flag=0;
			    		}else if(data.code==1009){
							alert(data.message)
							flag=0;
			    		}else if(data.code==4000){
							alert(data.message);
							flag=0;
			        	}			    	
			    		
                	}
            	})                
                
	        }
	    }else if(data.code==1005){
			alert(data.message);
		}else if(data.code==1009){
			alert(data.message)
		}else if(data.code==4000){
			alert(data.message);
		}
    }
})

		        if(flag==1){
		            alert("添加成功")
		        }else{
		            alert("添加失败")
		        }
 			}
		}
  	})

})
