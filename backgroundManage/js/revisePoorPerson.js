$(document).ready(function(){
    // var url="http://192.168.1.135:8080/";
    	let token=$.cookie("token");   	
    	let tokenCon=$.cookie("loginMessage");
    	let aa=JSON.parse(tokenCon);
    	console.log(aa.aar008)
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
    	var address=theRequest.address.trim();
        var year1=null;
        var  red1;
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
      	// $("#year").html(year.substring(-1,4)+'年');
        //村编号 和年份
         $(function(){
              var basicInfo = $('#basicInfo')
              $.ajax({
                    url: url + "pkh/detail/update/base",
                    data:{"aac001": theRequest.value,"aar040": year},
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
                            showAllPoorInfo( basicInfo,data);
                            homeInfo();
                            getIncomeInfo();
                            getLifeProductInfo();
                            getLastWorkInfo();
                            getHelpInfo();
                            getMoveInfo();
                        }else if(data.code == 1009){
                        	alert(data.message)
                        }else if(data.code == 1005){
                        	alert(data.message)
                        }else if(data.code == 4000){
                        	alert(data.message)
                        }
                    }
            })
  })

//初始化基础信息
  function showAllPoorInfo(obj,data){
      //var str11 = data.data.admArea;
      var str11 = address;
      $("#city").text(str11);
      $("#city").css("background-color","#f7f7f7");
      var inputs1 = $("#basicInfo tr td input");
      var selects1 = $("#basicInfo tr td select");
      var baseInfo = [data.data.AAC029,data.data.AAC001,data.data.AAB018,data.data.AAC031,
      				 data.data.AAR012,data.data.AAQ002,data.data.AAC004,data.data.AAC017]
      var baseInfo1 = [data.data.AAR010,data.data.AAC006,data.data.AAC012,data.data.AAC007,
      	data.data.AAC008.split(",")[0],data.data.AAC009,data.data.AAC005,data.data.AAR100];
      //姓名
     inputs1.each(function(i,value){
          $(this).val(baseInfo[i]);
     })
     selects1.each(function(i,value){
         $(this).val(baseInfo1[i]);
     })
  }
//成员生存状态
var isLive = [];
var die=[];
var nameList = [];
var namecode = [];
//家庭成员 信息
    function homeInfo(){
        var homeInfo = $('#homeBaseInfo');
        $.ajax({
            url: url + "pkh/detail/update/family",
            data:{"aac001": theRequest.value,"aar040": year},
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
                    showHomeInfo(homeInfo,data);
                    //   showPage($(".searchPage"),data.data.total);
                }
            }
    })
}
//家庭成员
  function showHomeInfo(obj,data){
     obj.empty();
     
   var str=`
   		<tr>                
            <th style='width:70px;'>序号</th>
            <th style='width:100px;'>姓名 <span class="mustp1">（*必选项）</span></th>
            <th style='width:160px;'>家庭成员编号 <span class="mustp7">（*必选项）</span></th>
            <th>生存状态 <span class="mustp6">（*必选项）</span></th>
            <th>性别 <span class="mustp2">（*必选项）</span></th>               
            <th>证件类型 <span class="mustp3">（*必选项）</span></th>
            <th style='width:160px;'>证件号码 <span class="mustp4">（*必选项）</span></th>           
            <th>联系电话</th>           
            <th>与户主关系 <span class="mustp5">（*必选项）</span></th>
            <th>民族</th>
            <th>文化程度</th>
            <th>在校生状况</th>
            <th>健康状况</th>
            <th>劳动技能</th>
            <th>政治面貌</th>
            <th>是否现役军人</th>
            <th>是否参加大病保险</th>
            <th>是否享受低保</th>
            <th>是否享受五保</th>
            <th>疾病名称</th>
            <th>疾病等级</th>
        </tr>`;
       for(let i = 0; i < data.data.length; i++){
       	red1=data.data.length;
            str+=`
            <tr>
                <td><input class="input1" type="text" placeholder="请输入" style="border: none;text-align:center;width:70px;" disabled='disabled'/></td>
                <td><input class="input2 mustp11" type="text" placeholder="请输入" style="border: none;text-align:center;width:100px;"/></td>
                <td><input class="input02 mustp17" type="text" placeholder="请输入" style="border: none;text-align:center;" disabled='disabled'/></td>
                <td>  <select name="" class="select14 mustp16">
                        <option value="">--请选择--</option>
                        <option value="1">正常</option>
                        <option value="2">死亡</option>
                        <option value="3">转出</option>
                        <option value="4">转入</option>
                        <option value="5">减少</option>
                        <option value="9">删除</option>
                        <option value="10">户清退时清退人员</option>
                        <option value="11">人员清退</option>
                        <option value="12">人员清退(新识别人员调整)</option>
                        <option value="13">户清退时人员清退(新识别人员调整)</option>
                    </select>
                </td>
                <td>
                    <select class="select01 mustp12">
                        <option value="">请选择</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                        <option value="9">未知</option>
                    </select>
                </td>
                <td>
                    <select class="select02 mustp13">
                        <option value="">请选择</option>
                        <option value="01"> 居民身份证</option>
                        <option value="09">残疾人证</option>
                        <option value="03">中国人民解放军军官证</option>
                    </select>
                </td>
                <td><input class="input3 mustp14" type="text" placeholder="请输入" style="border: none;text-align:center;width:160px;"/></td>
                <td><input class="input4" type="text" placeholder="请输入" style="border: none;text-align:center;width:160px;"/></td>
                
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
                        <option value="03">丧失劳动力</option>
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
                <td><input class="input5" type="text" placeholder="请输入" style="border: none;text-align:center;"/></td>
                <td>
                    <select class="select03">
                        <option value="">请选择</option>
                        <option value="1">一级</option>
                        <option value="2">二级</option>     
                    </select>
                </td>
            </tr>`
  }
  obj.html(str);
  
       for(let i = 0; i < data.data.length; i++){
       	   isLive[i] = data.data[i].AAB015;
	 	   //nameList[i] = data.data[i].AAB002;	 	   
	 	   namecode[i] = data.data[i].AAB001;
           $(".input1").eq(i).val(i+1);//序号
           $(".input2").eq(i).val(data.data[i].AAB002);//姓名
           $(".input02").eq(i).val(data.data[i].AAB001);//户编号
           $(".input3").eq(i).val(data.data[i].AAB004);//身份证 号码      
           //$(".input4").eq(i).val(data.data[i].AAB005);//年龄
           $(".input4").eq(i).val(data.data[i].AAB031);//电话号码
           $(".input5").eq(i).val(data.data[i].ABB001);//疾病名称           
           $(".select01").eq(i).val(data.data[i].AAB003);//姓别
           $(".select02").eq(i).val(data.data[i].AAB018);//证件类型
           $(".select2").eq(i).val(data.data[i].AAB006);//与户主关系
           $(".select3").eq(i).val(data.data[i].AAB007);//民族
           $(".select4").eq(i).val(data.data[i].AAB008);//文化程度
           $(".select5").eq(i).val(data.data[i].AAB009);//在校生状况
           $(".select6").eq(i).val(data.data[i].AAB017);//健康
           $(".select7").eq(i).val(data.data[i].AAB010);//劳动力
           $(".select10").eq(i).val(data.data[i].AAK033);//政治面貌
           $(".select11").eq(i).val(data.data[i].AAB019);//军人
           $(".select12").eq(i).val(data.data[i].AAB022);//医保
           $(".select13").eq(i).val(data.data[i].AAB030);//低保
           $(".select013").eq(i).val(data.data[i].ABB003);//五保
           $(".select14").eq(i).val(data.data[i].AAB015);//生存状态
           $(".select03").eq(i).val(data.data[i].ABB002);//疾病等级
        }
       console.log(isLive)
        for(var i=1;i<$('#homeBaseInfo tr').length;i++){
        	//die.push($('#homeBaseInfo tr').eq(i).children('td:nth-child(3)').attr('isLive'));
        	
		    if(isLive[i-1]=='1'||die[i-1]=='4'){
		    	console.log(111)
		    	$('#homeBaseInfo tr').eq(i).children('td:nth-child(2)').children('input').css('color','black')
		    } else{
		    	console.log(222)
		    	$('#homeBaseInfo tr').eq(i).children('td:nth-child(2)').children('input').css('color','#ff6c00')
		    }
        }
  }
//收入
    function getIncomeInfo(){
        var homeIncome = $('#homeIncome');
        $.ajax({
            url: url + "pkh/detail/update/income",
            data:{"aac001": theRequest.value,"aar040": year},
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
                    showIncomeInfo(homeIncome,data);
                }
            }
    })
  }
   function  showIncomeInfo(obj,data){
     var inputs2 = $("#homeIncome tr td input");
     var incomeInfo =  [data.data.AAC081,data.data.AAC079,data.data.AAC082,data.data.AAC073,
     data.data.AAC071,data.data.AAC074,data.data.AAC072,data.data.AAC076,data.data.AAC077,
     data.data.AAC086,data.data.AAC087,data.data.AAC078,data.data.AAC083,
     data.data.AAC085,data.data.ACA001,data.data.ACA002,data.data.ACA003,data.data.ACA004,
     data.data.ACA005,data.data.ACA006,data.data.ACA007,data.data.ACA008]
    inputs2.each(function(i,value){
            $(this).val(incomeInfo[i]);
       })
  }

////生产生活信息请求
  function getLifeProductInfo() {
              var lifeProduct = $('#lifeProduct')
                $.ajax({
                    url: url + "pkh/detail/update/life",
                    data:{"aac001": theRequest.value,"aar040": year},
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
                            console.log("ok");
                            showLifeProductInfo( lifeProduct,data);
                           // showPage($(".searchPage"),data.data.total);
                        }
                    }
            })
  }

//生产生活信息
    function  showLifeProductInfo(obj,data){
        var inputs3 = $("#lifeProduct tr td input");
        var selects3 = $("#lifeProduct tr td select");
        var lifeInfo =  [data.data.AAC301,data.data.AAC302,data.data.AAC303,data.data.AAC304,
        data.data.AAC305,data.data.AAC306,data.data.AAC307,data.data.AAC315,data.data.AAC317]
        var lifeInfoSelect = [data.data.AAC308,data.data.AAC314,data.data.AAC084,
	        data.data.AAC316,data.data.AAC313,data.data.AAC311,data.data.AAC312,
	        data.data.AAC318,data.data.AAC322,data.data.AAC320,data.data.AAC319];
        inputs3.each(function(i,value){
            $(this).val(lifeInfo[i]);
        })
        selects3.each(function(i,value){
            $(this).val(lifeInfoSelect[i]);
        })
    }

//上午务工信息请求
  function getLastWorkInfo() {
              var lastWork = $('#lastWork')
                $.ajax({
                    url: url + "pkh/detail/update/lnwginfo",
                    data:{"aac001": theRequest.value,"aar040": year},
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
                            console.log("ok");
                            showLastWorkInfo(lastWork,data);
                           // showPage($(".searchPage"),data.data.total);
                        }
                    }
            })
  }

//上年务工信息
var bianhao=[];
  function  showLastWorkInfo(obj,data){
      obj.empty();
      var str=` 
               <tr>
                <td style='width:70px;'>序号</td>
                <td style='width:100px;'>姓名 </td>
                <td style='width:150px;'>务工状况 </td>
                <td style='width:120px;'>所在省: </td>
                <td style='width:120px;'>所在市: </td>
                <td style='width:120px;'>所在县:</td>
                <td style='width:120px;'>所在乡:</td>
                <td>上年务工时间（月）:</td>
                <td style='width:150px;'>务工企业名称</td>
            </tr>
            `;
      for(let i = 0; i < data.data.length; i++){
       str +=`
	<tr>
                <td><input class="input11" type="text" placeholder="请输入" style="border: none;text-align:center;width:70px;"/></td>
        		<td><input class="input12" type="text" placeholder="请输入" style="border: none;text-align:center;width:100px;"/></td>
        		<td>
                    <select class="input012">
                        <option value="">--请选择--</option>
                        <option value="01">乡(镇)内务工</option>
                        <option value="02">乡(镇)外县内务工</option>
                        <option value="03">县外省内务工</option>
                        <option value="04">县外省内务工</option>
                        <option value="99">其他</option>
                    </select>
                </td>
        		<td><input class="input13" type="text" placeholder="请输入" style="border: none;text-align:center;width:150px;"/></td>
        		<td><input class="input14" type="text" placeholder="请输入" style="border: none;text-align:center;width:150px;"/></td>
        		<td><input class="input15" type="text" placeholder="请输入" style="border: none;text-align:center;width:150px;"/></td>
        		<td><input class="input16"  type="text" placeholder="请输入" style="border: none;text-align:center;width:150px;"/></td>
        		<td>
                    <select class="input17">
                        <option value="0">--请选择--</option>
                        <option value="1">1个月</option>
                        <option value="2">2个月</option>
                        <option value="3">3个月</option>
                        <option value="4">4个月</option>
                        <option value="5">5个月</option>
                        <option value="6">6个月</option>
                        <option value="7">7个月</option>
                        <option value="8">8个月</option>
                        <option value="9">9个月</option>
                        <option value="10">10个月</option>
                        <option value="11">11个月</option>
                        <option value="12">12个月</option>
                    </select>
                </td>
        		<td><input class="input18" type="text" placeholder="请输入" style="border: none;text-align:center;width:150px;"/></td>
        	</tr>

      `;
    }

      obj.html(str);
        for(let i = 0; i < data.data.length; i++){
           bianhao[i]=data.data[i].AAB001;           
           $(".input11").eq(i).val(i+1);//序号
           $(".input12").eq(i).val(data.data[i].AAB002);//姓名
           $(".input012").eq(i).val(data.data[i].AAB011);//务工状况
           $(".input13").eq(i).val(data.data[i].AAB025);//省
           $(".input14").eq(i).val(data.data[i].AAB026);//市
           $(".input15").eq(i).val(data.data[i].AAB027);//县
           $(".input16").eq(i).val(data.data[i].AAB028);//乡
           $(".input17").eq(i).val(data.data[i].AAB012);
           $(".input18").eq(i).val(data.data[i].AAB029);
       }
  }

//搬迁
  function getMoveInfo() {
              var banqian = $('#banqian')
                $.ajax({
                    url: url + "pkh/detail/update/relocate",
                    data:{"aac001": theRequest.value,"aar040": year},
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
                            showMoveInfo(banqian,data);
                           // showPage($(".searchPage"),data.data.total);
                        }
                    }
            })
  }

//搬迁
  //搬迁data=null时
  var relateData;
  function  showMoveInfo(obj,data){
    relateData = data.data;
    if(data.data==null){   
    	var str=``;
         str+=`<tr>
                <th class="form-table">是否搬迁户</th>
                <th>
                    <select id="relo">
                        <option value="">--请选择--</option>
                        <option value="1">是</option>
                        <option value="0">否</option>
                    </select>
                </th>
                <th class="form-table">搬迁方式</th>
                <th>
                	<select >
                        <option value="">--请选择--</option>
                        <option value="1">行政村整体搬迁</option>
                        <option value="2">自然村(村民小组)整体搬迁</option>
                        <option value="3">建档立卡贫困户个别搬迁</option>
                    </select>
                </th>
                <th class="form-table">安置方式</th>
                <th>
                	<select >
                        <option value="">--请选择--</option>
                        <option value="1">集中安置</option>
                        <option value="2">分散安置</option>
                    </select>
                </th>
            </tr>
            <tr>
            	<th class="form-table">安置地点</th>
                <th>
                	<select >
                        <option value="">--请选择--</option>
                        <option value="1">县城安置</option>
                        <option value="2">乡镇安置</option>
                        <option value="3">村内安置</option>
                        <option value="4">村外安置</option>
                        <option value="5">县外安置</option>
                    </select>
                </th>
                <th class="form-table">搬迁可能存在的困难</th>
                <th>
                	<select >
                        <option value="">--请选择--</option>
                        <option value="1">缺乏资金</option>
                        <option value="2">搬迁后找不到工作</option>
                        <option value="3">搬迁后生活没着落</option>
                        <option value="4">其他</option>
                    </select>
                </th>`
                $('#banqian').html(str)
    }else{
    var banqianSelect = $("#banqian tr th select");
    //alert(data.data.ACR077);
    var lifeInfoSelect =  [data.data.ACR077,data.data.ACR075,data.data.ACR078,data.data.ACR079,data.data.ACR081];
        banqianSelect.each(function(i,value){
            $(this).val(lifeInfoSelect[i]);
        })
    }
  }

//帮扶对接
  function getHelpInfo() {
              var helper = $('#helper')
                $.ajax({
                    url: url + "pkh/detail/update/help",
                    data:{"aac001": theRequest.value,"aar040": year},
                    beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                    method: "post",
                    dataType: "json",
                    success: function(data){
                        if (data.code == 2000){
                            showHelpInfo(helper,data);
                        }
                    }
            })
  }

//帮扶结对
  function  showHelpInfo(obj,data){
      obj.empty();
      var str=``;
      str = `<tr>
                <td class="form-table">姓名</td>
                <td class="form-table">性别</td>
                <td class="form-table">政治面貌</td>
                <td class="form-table">学历</td>
                <td class="form-table">联系电话</td>
                <td class="form-table">证件号码</td>
                <td class="form-table">单位名称</td>
                <td class="form-table">单位地址</td>
                <td class="form-table">是否驻村队员</td>
                <td class="form-table">开始时间</td>
                <td class="form-table">终止时间</td>
                <td class="form-table">技术特长</td>
                <td class="form-table">职务级别</td>
                <td class="form-table">单位隶属关系</td>
            </tr>`

      for(let i = 0; i < data.data.length; i++) {
         str+= `  <tr>
                <td><input class="input21" type="text" placeholder="请输入" style="border: none;"/></td>
                <td>
                      <select class="input22">
                        <option value="">请选择</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                        <option value="9"></option>
                    </select>
                </td>
                <td>
                      <select name="" class="input23">
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
                     <select name="" class="input24">
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
                <td><input class="input25" type="text" placeholder="请输入" style="border: none;"/></td>
                <td><input class="input26" type="text" placeholder="请输入" style="border: none;"/></td>
                <td><input class="input27"  type="text" placeholder="请输入" style="border: none;"/></td>
                <td><input class="input28" type="text" placeholder="请输入" style="border: none;"/></td>
                <td>
                     <select class="input29">
                        <option value="">--请选择--</option>
                        <option value="0">否</option>
                        <option value="1">是</option>
                    </select>
                </td>
                <td><input  class="input31" type="date" placeholder="请输入" style="border: none;"/></td>
                <td><input  class="input32" type="date" placeholder="请输入" style="border: none;"/></td>
                <td>
                 <select  class="input33">
							<option value="">请选择</option>
							<option value="01">种植</option>
							<option value="02">养殖</option>
							<option value="03">林果</option>
							<option value="04">服务</option>
						</select>
                </td>
                <td>
                    <select  class="input34">
							<option value="">请选择</option>
							<option value="101">国家级正职</option>
							<option value="102">国家级副职</option>
							<option value="111">省部级正职</option>
							<option value="112">省部级副职</option>
							<option value="121">厅局级正职</option>
							<option value="122">厅局级副职</option>
							<option value="131">县处级正职</option>
							<option value="132">县处级副职</option>
							<option value="141">乡科级正职</option>
							<option value="142">乡科级副职</option>
							<option value="150">科员级</option>
							<option value="160">办事员级</option>
							<option value="199">未定职</option>
						</select>
                </td>
                <td>
                    <select  class="input35">
                        <option value="">--请选择--</option>
                        <option value="10">中央</option>
                        <option value="20">省</option>
                        <option value="40">市、地区</option>
                        <option value="50">县（区）</option>
                        <option value="51">区</option>
                        <option value="52">县</option>
                        <option value="60">街道、镇、乡</option>
                        <option value="61">街道</option>
                        <option value="62">镇</option>
                        <option value="63">乡</option>
                        <option value="70">居民、村民委员会</option>
                        <option value="71">居民委员会</option>
                        <option value="72">村民委员会</option>
                        <option value="80">军队</option>
                        <option value="90">其他</option>
                        <option value="99">村两委</option>
                    </select>
                    </td>
            </tr>
      `
    }
       obj.html(str);
      for(let i = 0; i < data.data.length; i++) {
           $(".input21").eq(i).val(data.data[i].AAB002);//姓名
           $(".input22").eq(i).val(data.data[i].AAB003);//性别
           $(".input23").eq(i).val(data.data[i].AAK033);//政治面貌
           $(".input24").eq(i).val(data.data[i].AAK036);//学历
           $(".input25").eq(i).val(data.data[i].AAR012);//联系电话
           $(".input26").eq(i).val(data.data[i].AAB004);//证件号码
           $(".input27").eq(i).val(data.data[i].AAP001);//单位名称
           $(".input28").eq(i).val(data.data[i].AAR013);//单位地址
           $(".input29").eq(i).val(data.data[i].AAK039);//驻村队员
           $(".input31").eq(i).val(data.data[i].AAR020);//开始时间
           $(".input32").eq(i).val(data.data[i].AAR021);//结束时间
           $(".input33").eq(i).val(data.data[i].AAK037);//技术特长
           $(".input34").eq(i).val(data.data[i].AAF031);//职务
           $(".input35").eq(i).val(data.data[i].AAP004);//单位隶属
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
   $(".number").focus(function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
    var income0=$('#homeIncome tr td input');
    var income1;
    var income2;
    var income3;
    income0.each(function(i,value){
        $(this).blur(function(){
        	var peoplenumber=$('#number1').val();
			income3=parseFloat($('#homeIncome tr td input').eq(7).val())+parseFloat($('#homeIncome tr td input').eq(9).val())
			+parseFloat($('#homeIncome tr td input').eq(12).val())+parseFloat($('#homeIncome tr td input').eq(14).val())
			+parseFloat($('#homeIncome tr td input').eq(10).val())+parseFloat($('#homeIncome tr td input').eq(11).val())
			+parseFloat($('#homeIncome tr td input').eq(8).val())+parseFloat($('#homeIncome tr td input').eq(15).val())
			+parseFloat($('#homeIncome tr td input').eq(16).val())+parseFloat($('#homeIncome tr td input').eq(17).val())
			+parseFloat($('#homeIncome tr td input').eq(18).val())+parseFloat($('#homeIncome tr td input').eq(19).val())
			+parseFloat($('#homeIncome tr td input').eq(20).val())+parseFloat($('#homeIncome tr td input').eq(21).val())
			
        	income1=parseFloat($('#homeIncome tr td input').eq(3).val())+parseFloat($('#homeIncome tr td input').eq(4).val())
        	+parseFloat($('#homeIncome tr td input').eq(6).val())+income3-parseFloat($('#homeIncome tr td input').eq(5).val())
        	income2=income1;
        	
        	$('#homeIncome tr td input').eq(0).val(income1);
        	$('#homeIncome tr td input').eq(1).val(income2);
        	$('#homeIncome tr td input').eq(2).val(income2/peoplenumber);
        	$('#homeIncome tr td input').eq(13).val(income3);
        });
    })

//新增人口

 $("body").on("click","#red",function(){ 	
 	red1=($('#homeBaseInfo tr').length-1)+1;
    //red1++;
    //$('#number1').val(red1);
    $('#number1').val(red1);
   var  str =`     
              <tr>
                <td><input class="input1 number" type="text" placeholder="${red1}" disabled="disabled" style="border: none;width:70px;background:#6096e6"/><input type='button' value='删除' class='btn_delete'></td>
                <td><input class="input2 mustp11" type="text" placeholder="请输入" style="border: none;text-align:center;width:100px;"/></td>
                <td><input class="input02 mustp17" type="text" placeholder="请输入" style="border: none;text-align:center;"/></td>
                <td>  <select name="" class="select14 mustp16 survival">
                        <option value="">--请选择--</option>
                        <option value="1">正常</option>
                        <option value="2">死亡</option>
                        <option value="3">转出</option>
                        <option value="4">转入</option>
                        <option value="5">减少</option>
                        <option value="9">删除</option>
                        <option value="10">户清退时清退人员</option>
                        <option value="11">人员清退</option>
                        <option value="12">人员清退(新识别人员调整)</option>
                        <option value="13">户清退时人员清退(新识别人员调整)</option>
                    </select>
                </td>
                <td>
                    <select class="select01 mustp12">
                        <option value="">请选择</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                        <option value="9">未知</option>
                    </select>
                </td>
                <td>
                    <select class="select02 mustp13">
                        <option value="">请选择</option>
                        <option value="01"> 居民身份证</option>
                        <option value="09">残疾人证</option>
                        <option value="03">中国人民解放军军官证</option>
                    </select>
                </td>
                <td><input class="input3 mustp14" type="text" placeholder="请输入" style="border: none;text-align:center;width:160px;"/></td>
                <td><input class="input4" type="text" placeholder="请输入" style="border: none;text-align:center;width:160px;"/></td>
                
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
                        <option value="03">丧失劳动力</option>
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
                <td><input class="input5" type="text" placeholder="请输入" style="border: none;text-align:center;"/></td>
                <td>
                    <select class="select03">
                        <option value="">请选择</option>
                        <option value="1">一级</option>
                        <option value="2">二级</option>     
                    </select>
                </td>
            </tr>`;

            $("#homeBaseInfo").append(str);
            $('.survival').val('1')
})

	$('body').on('click','.btn_delete',function(){
		$(this).parent('td').parent('tr').remove();
		//$('#number1').val(red1);
		$('#number1').val($('#homeBaseInfo tr').length-1);
		
	})
	
    $("body").on("click","#submit",function(){
	    var flag = 1;
	    
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
	    mustps6 = $(".mustp6");
	    mustps16 = $(".mustp16");
	    mustps7 = $(".mustp7");
	    mustps17 = $(".mustp17");
	    
	    checkPeople(mustps1,mustps11);
	    checkPeople(mustps2,mustps12);
	    checkPeople(mustps3,mustps13);
	    checkPeople(mustps4,mustps14);
	    checkPeople(mustps5,mustps15);
	    checkPeople(mustps6,mustps16);
	    checkPeople(mustps7,mustps17);
	   
	    function  checkPeople(mustps,mustps1){
	        mustps1.each(function(i,value){
	            if(mustps1.eq(i).val()==''||mustps1.eq(i).val()==null){
	                mustps.css("color","red");
	                flag = 0;
	            }else{
	                mustps.css("color","#333");
	                flag = 1;
	            }
	        })
	    }
        //基础信息的修改
        reviseBasic();
        reviseFamily();
        reviseWork();
        reviseLife();
        reviseIncome()
        //reviseHelp();
        reviseRelocate();
//     if(relateData!=null){
//         reviseRelocate();
//     }
        function reviseBasic(){
            var input1 = $("#basicInfo tr td input");
            var select1 = $("#basicInfo tr td select");
            var k1 = [];
            var k11 = [];
            input1.each(function(i,value){
                    k1[i] = $(this).val()==null?"":$(this).val();
                })
            select1.each(function(i,value){
                    k11[i] = $(this).val()==null?"":$(this).val();
                })
                var data = {"aac001": theRequest.value,"aar040": year,
                    "aar012":k1[4],"aaq002":k1[5],"aac004":k1[6],"aac017":k1[7],
                    "aar010":k11[0],"aac006":k11[1],"aac012":k11[2],"aac007":k11[3],
                    "aac008":k11[4],"aac009":k11[5],"aac005":k11[6],"aar100":k11[7]}

            $.ajax({
                url:url+"pkh/update/basic",
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
                    if(data.message=="服务端发生错误"){
                        flag = 0;
                    }
                }
            })
        }
        //家庭成员的修改
        
        function reviseFamily(){
            var sub = [];
         for(let i = 0; i < $(".input1").length; i++){
            sub[i]={"aac001": theRequest.value,"aar040": year,'aab001':namecode[i],
                "aab015":$(".select14").eq(i).val(),"aab001":$(".input02").eq(i).val(),"aab002":$(".input2").eq(i).val(),
                "aab004":$(".input3").eq(i).val(),"aab031":$(".input4").eq(i).val(),
                "aab003":$(".select01").eq(i).val(),"aab006":$(".select2").eq(i).val(),
            	"aab018":$(".select02").eq(i).val(),"aab007":$(".select3").eq(i).val(),
            	"aab008":$(".select4").eq(i).val(),"aab009":$(".select5").eq(i).val(),
            	"aab017":$(".select6").eq(i).val(),"aab010":$(".select7").eq(i).val(),
            	"aak033":$(".select10").eq(i).val(), "aab019":$(".select11").eq(i).val(),
            	"aab022":$(".select12").eq(i).val(),"abb003":$(".select013").eq(i).val(),
            	"aab030":$(".select13").eq(i).val(),"abb001":$(".input5").eq(i).val(),
            	"abb002":$(".select03").eq(i).val() }
        }

            $.ajax({
                url:url+"pkh/update/famliy",
                method:"post",
                dataType:"json",
                async:false,
                data:JSON.stringify({"holderFamilyEntityList":sub}),
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                contentType:"application/json",
                success:function(data){
                    if(data.code!="2000"){
                    	alert(data.message)
                        flag = 0;
                    }
                }
            })
        }

        // data:JSON.stringify({"":,list:[])
        //上年务工所在地
        function reviseWork(){
             var sub = [];
          
            for(let i = 0; i < $(".input11").length; i++){
            sub[i]={"aac001": theRequest.value,"aar040": year,'aab001':bianhao[i],
                "aab002":$(".input12").eq(i).val(),"aab011":$(".input012").eq(i).val(),
                "aab025":$(".input13").eq(i).val(),"aab026":$(".input14").eq(i).val(),
                "aab027":$(".input15").eq(i).val(),"aab028":$(".input16").eq(i).val(),
                "aab012":$(".input17").eq(i).val(),"aab029":$(".input18").eq(i).val()}
            }
            $.ajax({
                url:url+"pkh/update/work",
                method:"post",
                dataType:"json",
                async:false,
                data:JSON.stringify({"holderFamilyWorkEntityList":sub}),
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                contentType:"application/json",
                success:function(data){
                    if(data.message=="服务端发生错误"){
                        flag = 0;
                    }
                }
            })
        }
        //生产生活
        function reviseLife(){
            var inputs3 = $("#lifeProduct tr td input");
            var selects3 = $("#lifeProduct tr td select");
            var  life1 = [];
            var life2 = [];
            inputs3.each(function(i,value){
                life1[i] = $(this).val()==null?"":$(this).val();
            })
            selects3.each(function(i,value){
               life2[i] = $(this).val()==null?"":$(this).val();
            })
            var data =  {"aac001": theRequest.value,"aar040": year,
            "aac301":life1[0],"aac302":life1[1],
            "aac303":life1[2],"aac304":life1[3],"aac305":life1[4],"aac306":life1[5],"aac307":life1[6],
            "aac315":life1[7],"aac317":life1[8],"aac308":life2[0],"aac314":life2[1],"aac084":life2[2],
            "aac316":life2[3],"aac313":life2[4],"aac311":life2[5],"aac312":life2[6],"aac318":life2[7],
            "aac322":life2[8],"aac320":life2[9],"aac319":life2[10]}

            $.ajax({
                url:url+"pkh/update/life",
                method:"post",
                dataType:"json",
                async:false,
                data:data,
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                success:function(data){
                    if(data.message=="服务端发生错误"){
                        flag = 0;
                    }
                }
            })
        }
        //上年度收入
       
        function reviseIncome(){
            var inputs2 = $("#homeIncome tr td input");
            var income = [];
            inputs2.each(function(i,value){
               income[i] = $(this).val()==null?"":$(this).val();
            })
            var data = {"aac001": theRequest.value,"aar040": year,'aac081':income[0],'aac079':income[1],
            "aac082":income[2],"aac073":income[3],"aac071":income[4],"aac074":income[5],
            "aac072":income[6],"aac076":income[7],"aac077":income[8],
            "aac086":income[9],"aac087":income[10],"aac078":income[11],"aac083":income[12],'aac085':income[13],
            "aca001":income[14],"aca002":income[15],"aca003":income[16],"aca004":income[17],
            "aca005":income[18],"aca006":income[19],"aca007":income[20],"aca008":income[21]}

            $.ajax({
                url:url+"pkh/update/income",
                method:"post",
                dataType:"json",
                async:false,
                data:data,
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                success:function(data){
                    if(data.message=="服务端发生错误"){
                        flag = 0;
                    }
                }
            })
        }
        //异地搬迁
        function reviseRelocate(){
            var relocateInputs = [];
            var select4 = $("#banqian tr th select");
            select4.each(function(i,value){
                relocateInputs[i]=  $(this).val()==null?"":$(this).val();
            })
            var  data={"aac001": theRequest.value,"aar040": year,
                "acr075":relocateInputs[1],"acr078":relocateInputs[2],
                "acr079":relocateInputs[3],"acr081":relocateInputs[4],
                "acr077":relocateInputs[0]}
                $.ajax({
                    url:url+"pkh/update/relocate",
                    method:"post",
                    dataType:"json",
                    async:false,
                    data:data,
                    beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      },
                    success:function(data){
                        if(data.message=="服务端发生错误"){
                            flag = 0;
                        }
                    }
                })
        }
        //帮扶对接
//      function reviseHelp(){
//          var sub = [];
//          for(let i = 0; i < $(".input21").length; i++) {
//            sub[i]={"aac001": theRequest.value,"aar040": year,"aab002":$(".input21").eq(i).val(),"aab003":$(".input22").eq(i).val(),"aak033":$(".input23").eq(i).val(),"aak036":$(".input24").eq(i).val(),"aar012":$(".input25").eq(i).val(),"aab004":$(".input26").eq(i).val(),
//            "aap001":$(".input27").eq(i).val(),"aar013":$(".input28").eq(i).val(),"aak039":$(".input29").eq(i).val(),"aar020":$(".input31").eq(i).val(),"aar021":$(".input32").eq(i).val(),"aak037":$(".input33").eq(i).val(),"aaf031":$(".input34").eq(i).val(),"aap004":$(".input35").eq(i).val()};
//          }
//          $.ajax({
//              url:url+"pkh/update/helper",
//              method:"post",
//              dataType:"json",
//              async:false,
//              data:JSON.stringify({"holderHelperEntityList":sub}),
//              beforeSend:function(request){
//                        request.setRequestHeader("Authorization",token);
//                        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
//                    },
//              contentType:"application/json",
//              success:function(data){
//              if(data.code!=2000){
//                  flag = 0;
//              }
//              }
//          })
//      }
		//if(aa.aar008.substring(6)=="000000"&flag==1){
		if(flag==1){
			alert('修改成功');
			return;
		}else{
			alert('修改失败');
			return;
		};
		
//      if(flag==1){
//          alert("信息提交审核成功");
//      }else if(flag == 0){
//          alert("提交的数据中不能含有空格");
//      }else{
//          alert("信息提交审核失败");
//      }
   })

})
