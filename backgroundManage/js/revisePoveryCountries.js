$(function(){
	let token=$.cookie("token");
	var val1=null;
	var val2=null;
	var shuxing = $("#shuxing");
    var niandu = $("#niandu");
	var theRequest = new Object();
    var url1=window.location.search; //获取url中"?"符后的字串
        if(url1.indexOf("?")!=-1) {
            var str = url1.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }

	var  code = theRequest.value;
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
 //详情初始化渲染
 	var table1=$('#table1');
 	var table2=$('#table2')
 	var table3=$('#table3')
 	var table4=$('#table4')
 	var table5=$('#table5')
 	var table6=$('#table6')
 	var table7=$('#table7')
 	var table8=$('#table8')

	$.ajax({
        url: url + "fpdx/cnty/query",
        data:{"aae001": code,"aar040":year},
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
                showBaseInfo(table1,data);
                getPopuInfo(table2,data);
                getBanqian(table8,data);
                getWork10(table3,data);
                getTudiInfo(table5,data);
                getXindai(table7,data);
                getRainPlan(table6,data);
                getcaizheng(table4,data);

            }else if(data.code==1005){
				alert(data.message)
		    }else if(data.code==1009){
				alert(data.message)
		    }else if(data.code==4000){
				alert(data.message)
		    }
        }
   })

	function showBaseInfo(table1,data){
      table1.empty();
      var str = `
          <caption style="border-bottom: solid 1px #dbdbdb;">基础信息</caption>
          <tr>
              <td class="form-table">行政区划</td>
              <td colspan="" scope="col" style='background:#eee;'>
              		 <input type="text" placeholder="请输入"  style="border: none;" disabled/>
              </td>
              <td class="form-table">县属性</td>
              <td colspan="" scope="col">
              		<select id="shuxing">
                          <option value="">--请选择--</option>
                          <option value="01">国家重点县</option>
                          <option value="02">片区规划县</option>
                          <option value="03">省级重点县</option>
                          <option value="04">非贫困县</option>
                          <option value="99">其他</option>
                    </select>
              </td>
          </tr>
          <tr>
              <td class="form-table">乡（镇）数（个）</td>
              <td style=''><input type="text"  style="border: none;" placeholder="请输入" /></td>
              <td class="form-table">行政村数（个）</td>
              <td style=''><input type="text" placeholder="请输入"  style="border: none;" /></td>
          </tr>
          <tr>
              <td class="form-table">贫困村数（个）</td>
              <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
              <td class="form-table">自然村数（个）</td>
              <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
          </tr>
          <tr>
              <td class="form-table">是否摘帽</td>
              <td colspan="3">
              		<select  id="niandu">
                          <option value="">--请选择--</option>
                          <option value="1">是</option>
                          <option value="0">否</option>
                    </select>
              </td>
          </tr>
        `;
          switch (data.data[0].AAE002){
        		case '国家重点县':
        			val1='01';
        			break;
        		case '片区规划县':
        			val1='02';
        			break;
        		case '省级重点县':
        			val1='03';
        			break;
        		case '非贫困县':
        			val1='04';
        			break;
        		case '其他':
        			val1='99';
        			break;
        		default:
        			break;
        	}

          $('#table1').html(str);

          $("td").each(function(){
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		})

		$('#table1 input').eq(0).val('陕西省-西安市-'+data.data[0].AAR009)
		$('#shuxing').val(val1)
		$('#table1 input').eq(1).val(data.data[0].AAE003)
		$('#table1 input').eq(2).val(data.data[0].AAE006)
		$('#table1 input').eq(3).val(data.data[0].AAE007)
		$('#table1 input').eq(4).val(data.data[0].AAE008)
		$('#niandu').val(data.data[0].AAE100)

 }
	//修改县基本信息
 var jb=[];
 var i=0;
 $("body").on("blur","#table1 input",function(){

		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
     $("body").on("focus","#table1 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
 $("#add1").click(function(){
 	var shuxing = $("#shuxing");
	var niandu = $("#niandu");
	$("#table1 input").each(function(){
	  i++;
	  jb.push($(this).val())
	})

    $.ajax({
        url:url+"uppdatefpdx/modCnty/query",
        data:{'aae001':code,'aar040':year,'aae002':shuxing.val(),'aac016':niandu.val(),
        'aae003':jb[1],'aae006':jb[2],'aae007':jb[3],'aae008':jb[4]},
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        type:"get",
        dataType:"json",
        success: function(data){
            if (data.code == 2000){
            	alert ("修改成功");
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

})


    //人口信息
    function getPopuInfo(table2,data){
        $(function(){
            $.ajax({
                url: url + "fpdx/peopleInfo/query",
                data:{"aae001": code,"aar040":year},
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
                        showPopuInfo( table2,data);
                    }
                }

        })
    })
}

    function showPopuInfo(obj,data){
        obj.empty();
         var str =`
        <tr>
                <td class="form-table">年末总户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">年末总人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">低保户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">低保人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">低保贫困户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">低保贫困人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">五保户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">五保人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">五保贫困户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">五保贫困人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">贫困户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">贫困人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">一般贫困户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">一般贫困人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">乡村户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">乡村人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">妇女人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">少数民族人口（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">参加大病保险人数（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>

                `;
            obj.html(str);
            $('#table2 input').eq(0).val(data.data[0].AAE010)
			$('#table2 input').eq(1).val(data.data[0].AAE014)
			$('#table2 input').eq(2).val(data.data[0].AAE012)
			$('#table2 input').eq(3).val(data.data[0].AAE017)
			$('#table2 input').eq(4).val(data.data[0].AEA003)
			$('#table2 input').eq(5).val(data.data[0].AEA004)
			$('#table2 input').eq(6).val(data.data[0].AAE013)
			$('#table2 input').eq(7).val(data.data[0].AAE018)
			$('#table2 input').eq(8).val(data.data[0].AEA005)
			$('#table2 input').eq(9).val(data.data[0].AEA006)
			$('#table2 input').eq(10).val(data.data[0].AAE021)
			$('#table2 input').eq(11).val(data.data[0].AAE022)
			$('#table2 input').eq(12).val(data.data[0].AEA001)
			$('#table2 input').eq(13).val(data.data[0].AEA002)
			$('#table2 input').eq(14).val(data.data[0].AAE011)
			$('#table2 input').eq(15).val(data.data[0].AAE015)
			$('#table2 input').eq(16).val(data.data[0].AAE019)
			$('#table2 input').eq(17).val(data.data[0].AAE016)
			$('#table2 input').eq(18).val(data.data[0].AAE051)
    }

//修改人口信息
 var ren = [];
 var i = 0;
 $("body").on("blur","#table2 input",function(){
 	if(isNaN($(this).val())||parseFloat($(this).val())<0){
        $(this).val("(*请输入有效值)")
        $(this).css("color","red");
    }
})
     $("body").on("focus","#table2 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
 $("#add2").click(function(){
	$("#table2 input").each(function(){
	  i++;
	  ren.push($(this).val())
	})

    $.ajax({
        url:url+"uppdatefpdx/modPeopleInfo/query",
        data:{'aae001':code,"aar040":year,'aae010':ren[0],'aae014':ren[1],'aae012':ren[2],
        'aae017':ren[3],'aea003':ren[4],'aea004':ren[5],'aae013':ren[6],'aae018':ren[7],
        'aea005':ren[8],'aea006':ren[9],'aae021':ren[10],'aae022':ren[11],'aea001':ren[12],
        'aea002':ren[13],'aae011':ren[14],'aae015':ren[15],'aae019':ren[16],'aae016':ren[17],'aae051':ren[18]},
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        type:"get",
        dataType:"json",
        success: function(data){
            if (data.code == 2000){
            	alert ("修改成功");
            }else{
            	alert("修改失败");
            }
        }
    })
})

    //十项重点
    function getWork10(table3,data){
        $(function(){
            $.ajax({
                url: url + "fpdx/tenKey/query",
                data:{"aae001": code,"aar040":year},
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
                        showWorkInfo( table3,data);
                    }
                }
        	})
    	})
    }

    function showWorkInfo(obj,data){
        obj.empty();
        str = `
        <tr>
                <td rowspan="3" class="form-04-td form-table" style='text-align: center;'>村级道路通畅</td>
                <td class="form-table">是否通二级及以上高等级公路</td>
                <td><input type="text" placeholder="请输入是或否" style="border: none;" class='btns'/>
                </td>
                <td class="form-table">二级及以上高等级公路里程（公里）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">通（沥青/水泥）公路行政村数（个）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">高速公路里程（公里）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">通客运班车行政村数（个）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">交通部门资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">中央资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">省级资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">县资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="3" class="form-table" style='text-align: center;'>饮水安全</td>
                <td class="form-table">已实现安全饮水人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">饮用自来水户数（户）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">水利部门资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">已解决安全饮水农村学校数（个）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">已解决安全饮水农村学校率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">（石砌/水泥砌）水渠长度（公里）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">中央资金投入（万元）</td>
                <td><input type="text" placeholder="请输入"  style="border: none;"/></td>
                <td class="form-table">省级资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">市县资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="3" class="form-table" style='text-align: center;'>农村电力保障</td>
                <td class="form-table">通电行政村数（个）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">通生产用电行政村数（个）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">通电户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">无电人口数（人）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">能源部门资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">中央资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">省级资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">市县资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="2" class="form-table" style='text-align: center;'>危房改造</td>
                <td class="form-table">危房户数（户）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">住建部门资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">中央资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">省级资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">市县资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="6" class="form-table" style='text-align: center;'>特色产业增收</td>
                <td class="form-table">农民专业合作组织数(个)</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">有农民专业合作组织的行政村数(个)</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">有互助资金组织的行政村数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">参加贫困村互助资金组织户数(户)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">互助资金借款户数(户)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">贫困户借款户数(户)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">互助资金累计借款人次(人次)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">互助资金累计发放借款(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">贫困户借款(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">互助资金累计还款(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">贫困户还款(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">农业、林业部门资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">农林部门中央资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">农林部门省级资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">农林部门市县资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">农村青年创业小额贷款(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">妇女小额担保贷款(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">残疾人康复扶贫贷款(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="2" class="form-table" style='text-align: center;'>乡村旅游</td>
                <td class="form-table">开展乡村旅游的贫困村数(个)</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">乡村旅游游客接待量(万人次)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">乡村旅游从业人员数(人)</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">乡村旅游总收入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="3" class="form-table" style='text-align: center;'>教育</td>
                <td class="form-table">学前三年教育毛入园率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">高中阶段教育毛入学率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">九年义务教育阶段巩固率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">教育部门资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">教育部门中央资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">教育部门省级资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">教育部门市县资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="6" class="form-table" style='text-align: center;'>卫生和计划生育</td>
                <td class="form-table">有卫生院的乡镇数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">有卫生室行政村数(个)</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">人口自然增长率(‰)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table" class="form-table">妇女总和生育率(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">参加新型农村合作医疗人数(人)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">参加城镇职工基本医疗保险人数(人)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">参加城镇居民基本医疗保险人数(人)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">出生人口政策符合率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">县域外转诊率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">每千人口医疗卫生机构床位数(张)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">每千人口卫生计生技术人员数(人)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">每千人口执业（助理）医师数(人)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">每千人口注册护士数(人)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">卫计部门资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">卫计部门中央资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">卫计部门省级资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">卫计部门市县资金投入(万元)</td>
                <td ><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="4" class="form-table" style='text-align: center;'>文化建设</td>
                <td class="form-table">县级公共图书馆数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">县级文化馆数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">有综合文化站乡镇数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">有文化/图书室行政村数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">通广播电视行政村数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">通广播电视自然村数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">文化部门资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">文化部门中央资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">文化部门省级资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">文化部门市县资金投入(万元)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td rowspan="2" class="form-table" style='text-align: center;'>贫困村信息化</td>
                <td class="form-table">通宽带网络行政村数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">通宽带网络自然村（20户以上）数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">未通宽带的义务教育学校、普通高中、职业院校数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">手机能上网行政村数(个)</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
        `;
        obj.html(str);

        var shixiang=[data.data[0].AAE301,data.data[0].AAE302,data.data[0].AAE304,data.data[0].AAE303,
        data.data[0].AAE305,data.data[0].AAE306,data.data[0].AAE307,data.data[0].AAE308,data.data[0].AAE309,
        data.data[0].AAE311,data.data[0].AAE314,data.data[0].AAE316,data.data[0].AAE312,data.data[0].AAE313,
        data.data[0].AAE315,data.data[0].AAE317,data.data[0].AAE318,data.data[0].AAE319,data.data[0].AAE321,
        data.data[0].AAE322,data.data[0].AAE323,data.data[0].AAE324,data.data[0].AAE325,data.data[0].AAE326,
        data.data[0].AAE327,data.data[0].AAE328,data.data[0].AAE331,data.data[0].AAE332,data.data[0].AAE323,
        data.data[0].AAE334,data.data[0].AAE335,data.data[0].AAE341,data.data[0].AAE342,data.data[0].AAE343,
        data.data[0].AAE344,data.data[0].AAE345,data.data[0].AAE346,data.data[0].AAE347,data.data[0].AAE348,
        data.data[0].AAE349,data.data[0].AAE350,data.data[0].AAE351,data.data[0].AAE352,data.data[0].AAE353,
        data.data[0].AAE354,data.data[0].AAE355,data.data[0].AAE356,data.data[0].AAE357,data.data[0].AAE358,
        data.data[0].AAE361,data.data[0].AAE362,data.data[0].AAE363,data.data[0].AAE364,data.data[0].AAE366,
        data.data[0].AAE367,data.data[0].AAE368,data.data[0].AAE369,data.data[0].AAE370,data.data[0].AAE371,
        data.data[0].AAE372,data.data[0].AAE374,data.data[0].AAE375,data.data[0].AAE376,data.data[0].AAE377,
        data.data[0].AAE378,data.data[0].AAE379,data.data[0].AAE380,data.data[0].AAE381,data.data[0].AAE382,
        data.data[0].AAE383,data.data[0].AAE384,data.data[0].AAE385,data.data[0].AAE386,data.data[0].AAE387,
        data.data[0].AAE388,data.data[0].AAE389,data.data[0].AAE390,data.data[0].AAE392,data.data[0].AAE393,
        data.data[0].AAE394,data.data[0].AAE395,data.data[0].AAE396,data.data[0].AAE397,data.data[0].AAE398,
        data.data[0].AAE399,data.data[0].AAE400,data.data[0].AAE401,data.data[0].AAE403,data.data[0].AAE404,
        data.data[0].AAE405,data.data[0].AAE406]
        var table3_input=$("#table3 input")

       for (var i = 0; i < $("#table3 input").length; i++) {
    		table3_input[i].value = shixiang[i];
    	}

		 var table3_input=$("#table3 input")
		 table3_input[0].onblur=function(){
			if (table3_input[0].value=='是'||table3_input[0].value=='否'||table3_input[0].value=='') {
				table3_input[0].value=table3_input[0].value;
			}else{
				table3_input[0].focus();
			}
		}
    }
//十项重点修改
var shi = [];
var i = 0;
   $("body").on("blur","#table3 input:not(.btns)",function(){

		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
     $("body").on("focus","#table3 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })

$("#add3").click(function(){

	$(" #table3 input").each(function(){
	  i++;
	  shi.push($(this).val())

	})

$.ajax({
    url:url+"uppdatefpdx/modTenKey/query",
    data:{'aae001':code,"aar040":year,'aae301':shi[0],'aae302':shi[1],'aae304':shi[2],'aae303':shi[3],
    'aae305':shi[4],'aae306':shi[5],'aae307':shi[6],'aae308':shi[7],'aae309':shi[8],'aae311':shi[9],
    'aae312':shi[10],'aae313':shi[11],'aae314':shi[12],'aae315':shi[13],'aae316':shi[14],
    'aae317':shi[15],'aae318':shi[16],'aae319':shi[17],'aae321':shi[18],'aae322':shi[19],
    'aae323':shi[20],'aae324':shi[21],'aae325':shi[22],'aae326':shi[23],'aae327':shi[24],
    'aae328':shi[25],'aae331':shi[26],'aae332':shi[27],'aae333':shi[28],'aae334':shi[29],
    'aae335':shi[30],'aae341':shi[31],'aae342':shi[32],'aae343':shi[33],'aae344':shi[34],
    'aae345':shi[35],'aae346':shi[36],'aae347':shi[37],'aae348':shi[38],'aae349':shi[39],
    'aae350':shi[40],'aae351':shi[41],'aae352':shi[42],'aae353':shi[43],'aae354':shi[44],
    'aae355':shi[45],'aae356':shi[46],'aae357':shi[47],'aae358':shi[48],'aae361':shi[49],
    'aae362':shi[50],'aae363':shi[51],'aae364':shi[52],'aae366':shi[53],'aae367':shi[54],
    'aae368':shi[55],'aae369':shi[56],'aae370':shi[57],'aae371':shi[58],'aae372':shi[59],
    'aae374':shi[60],'aae375':shi[61],'aae376':shi[62],'aae377':shi[63],'aae378':shi[64],
    'aae379':shi[65],'aae380':shi[66],'aae381':shi[67],'aae382':shi[68],'aae383':shi[69],
    'aae384':shi[70],'aae385':shi[71],'aae386':shi[72],'aae387':shi[73],'aae388':shi[74],
    'aae389':shi[75],'aae390':shi[76],'aae392':shi[77],'aae393':shi[78],'aae394':shi[79],
    'aae395':shi[80],'aae396':shi[81],'aae397':shi[82],'aae398':shi[83],'aae399':shi[84],
    'aae400':shi[85],'aae401':shi[86],'aae403':shi[87],'aae404':shi[88],'aae405':shi[89],'aae406':shi[90]},
    beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
    type:"get",
    dataType:"json",
    success: function(data){
        if (data.code == 2000){
        	alert ("修改成功");
        }else{
        	alert("修改失败");
        }
    }

})

})

    //雨露计划
    function  getRainPlan(table6,data){

        $(function(){
            $.ajax({
                url: url + "fpdx/rainPlan/query",
                data:{"aae001": code,"aar040":year},
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
                        showRainPlanInfo( table6,data);
                    }else if(data.code == 1009){
						var str=`
						<tr><td style="font-size:28px;color:#767272;text-align: center;">查无数据</td></tr>`
						table6.html(str)
					}
                }
        	})
    	})
    }

    function showRainPlanInfo(obj,data){
    obj.empty();
    var str =`
        <tr>
                <td class="form-table">雨露计划培训人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
                <td class="form-table">新成长劳动力（两后生）职业教育培训人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
            </tr>
            <tr>
                <td class="form-table">中高等职业教育（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu' id='yulu'/></td>
                <td class="form-table">劳动预备制培训（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
            </tr>
            <tr>
                <td class="form-table">劳动力转移就业培训人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
                <td class="form-table">农村适用技能培训人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
            </tr>
            <tr>
                <td class="form-table">贫困村致富带头人培训人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
                <td class="form-table">雨露计划资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
            </tr>
            <tr>
                <td class="form-table">中央财政专项资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
                <td class="form-table">省级及以下专项资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" class='yu'/></td>
            </tr>
    `;
		    obj.html(str);
		    $('#table6 input').eq(0).val(data.data[0].AAE411)
			$('#table6 input').eq(1).val(data.data[0].AAE412)
			$('#table6 input').eq(2).val(data.data[0].AAE413)
			$('#table6 input').eq(3).val(data.data[0].AAE414)
			$('#table6 input').eq(4).val(data.data[0].AAE415)
			$('#table6 input').eq(5).val(data.data[0].AAE416)
			$('#table6 input').eq(6).val(data.data[0].AAE417)
			$('#table6 input').eq(7).val(data.data[0].AAE418)
			$('#table6 input').eq(8).val(data.data[0].AAE419)
			$('#table6 input').eq(9).val(data.data[0].AAE420)
    }

//修改雨露计划

	var yu = [];
 	var i = 0;

    $("body").on("blur","#table6 input",function(){

		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
     $("body").on("focus","#table6 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })

 $("#add6").click(function(){

    	$(" #table6 input").each(function(){
		  i++;
		  yu.push($(this).val())
		})

    $.ajax({
        url:url+"uppdatefpdx/modPlan/query",
        data:{'aae001':code,"aar040":year,'aae411':yu[0],'aae412':yu[1],'aae413':yu[2],'aae414':yu[3],'aae415':yu[4],
        'aae416':yu[5],'aae417':yu[6],'aae418':yu[7],'aae419':yu[8],'aae420':yu[9]},
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        type:"get",
        dataType:"json",
        success: function(data){
            if (data.code == 2000){
            	alert ("修改成功");
            }else{
           	    alert("修改失败");
            }
        }

    })

})

    //土地信息

    function getTudiInfo(table5,data){

        $(function(){
            $.ajax({
                url: url + "fpdx/landInfo/query",
                data:{"aae001": code,"aar040":year},
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
                        showTudiInfo( table5,data);
                    }
                }
        	})
    	})
    }
    function showTudiInfo(obj,data){
    obj.empty();
    var str=
    `
         <tr>
                <td class="form-table">行政区域土地面积（平方公里）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">国有林场数</td>
                <td><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">国有贫困林场数</td>
                <td><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">耕地面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">基本农田面积（公顷）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">有效灌溉面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">林地面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">退耕还林面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">林果面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">牧草地面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">水域面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">荒漠化面积（公顷）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">石漠化面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
                <td class="form-table">森林覆盖率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
            <tr>
                <td class="form-table">退耕还草面积（公顷）</td>
                <td style=''><input type="text" placeholder="请输入" style="border: none;" /></td>
            </tr>
    `;
		    obj.html(str);
		    $('#table5 input').eq(0).val(data.data[0].AAE023)
			$('#table5 input').eq(1).val(data.data[0].AAE004)
			$('#table5 input').eq(2).val(data.data[0].AAE005)
			$('#table5 input').eq(3).val(data.data[0].AAE024)
			$('#table5 input').eq(4).val(data.data[0].AAE025)
			$('#table5 input').eq(5).val(data.data[0].AAE026)
			$('#table5 input').eq(6).val(data.data[0].AAE027)
			$('#table5 input').eq(7).val(data.data[0].AAE028)
			$('#table5 input').eq(8).val(data.data[0].AAE029)
			$('#table5 input').eq(9).val(data.data[0].AAE047)
			$('#table5 input').eq(10).val(data.data[0].AAE031)
			$('#table5 input').eq(11).val(data.data[0].AAE032)
			$('#table5 input').eq(12).val(data.data[0].AAE033)
			$('#table5 input').eq(13).val(data.data[0].AAE034)
			$('#table5 input').eq(14).val(data.data[0].AAE035)
    }

 //修改土地信息
 $("body").on("blur","#table5 input",function(){

		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
    $("body").on("focus","#table5 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
 var tu = [];
 var i = 0;
 $("#add5").click(function(){

    	$("#table5 input").each(function(){
		  i++;
		  tu.push($(this).val())

		})

    $.ajax({
        url:url+"uppdatefpdx/modLandInfo/query",
        data:{'aae001':code,"aar040":year,'aae023':tu[0],'aae004':tu[1],'aae005':tu[2],
        'aae024':tu[3],'aae025':tu[4],'aae026':tu[5],'aae027':tu[6],'aae028':tu[7],
        'aae029':tu[8],'aae047':tu[9],'aae031':tu[10],'aae032':tu[11],'aae033':tu[12],
        'aae034':tu[13],'aae035':tu[14]},
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        type:"get",
        dataType:"json",
        success: function(data){
            if (data.code == 2000){
            	alert ("修改成功");
            }else{
            	alert("修改失败");
            }
        }
    })
})

    //小额信贷
    function getXindai(table7,data){

        $(function(){
            $.ajax({
                url: url + "fpdx/smallCredit/query",
                data:{"aae001": code,"aar040":year},
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
                        showXindaiInfo( table7,data);
                    }else if(data.code == 1009){
						var str=`
						<tr><td style="font-size:28px;color:#767272;text-align: center;">查无数据</td></tr>`
						table7.html(str)
					}
                }
            })
    	})
    }

    function showXindaiInfo(obj,data){
        obj.empty();
        var str =
        `
            <tr>
                <td class="form-table">扶贫小额信贷覆盖贫困村数（个）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">扶贫小额信贷贷款户数（户）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">扶贫小额信贷发放总额（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">发展种植业、林果业（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">发展养殖业（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">发展加工业（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">发展服务业、运输业（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">其他（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">支付扶贫小额信贷贴息资金（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">地方贴息资金（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">扶贫小额信贷当年到期贷款额（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">扶贫小额信贷当年到期贷款回收额（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">扶贫小额信贷贷款余额（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
        `;
	        obj.html(str);
	        $('#table7 input').eq(0).val(data.data[0].AAE422)
			$('#table7 input').eq(1).val(data.data[0].AAE423)
			$('#table7 input').eq(2).val(data.data[0].AAE424)
			$('#table7 input').eq(3).val(data.data[0].AAE425)
			$('#table7 input').eq(4).val(data.data[0].AAE426)
			$('#table7 input').eq(5).val(data.data[0].AAE427)
			$('#table7 input').eq(6).val(data.data[0].AAE428)
			$('#table7 input').eq(7).val(data.data[0].AAE429)
			$('#table7 input').eq(8).val(data.data[0].AAE430)
			$('#table7 input').eq(9).val(data.data[0].AAE431)
			$('#table7 input').eq(10).val(data.data[0].AAE432)
			$('#table7 input').eq(11).val(data.data[0].AAE433)
			$('#table7 input').eq(12).val(data.data[0].AAE434)

        }
//修改信贷信息
var xd = [];
var i = 0;
$("body").on("blur","#table7 input",function(){
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
   $("body").on("focus","#table7 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
 $("#add7").click(function(){

    	$("#table7 input").each(function(){
		  i++;
		  xd.push($(this).val())
		})

    $.ajax({
        url:url+"uppdatefpdx/modCredit/query",
        data:{'aae001':code,"aar040":year,'aae422':xd[0],'aae423':xd[1],'aae424':xd[2],'aae425':xd[3],
        'aae426':xd[4],'aae427':xd[5],'aae428':xd[6],'aae429':xd[7],
		'aae430':xd[8],'aae431':xd[9],'aae432':xd[10],'aae433':xd[11],'aae434':xd[12]},
		beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        type:"get",
        dataType:"json",
        success: function(data){
            if (data.code == 2000){
           		 alert ("修改成功");
            }else{
            	 alert("修改失败");
            }
        }
    })
})
        //搬迁
        function getBanqian(table8,data){
            $(function(){
                $.ajax({
                    url: url + "fpdx/reloc/query",
                    data:{"aae001": code,"aar040":year},
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
                            showBanqianInfo(table8,data);
                        }else if(data.code == 1009){
							var str=`
							<tr><td style="font-size:28px;color:#767272;text-align: center;">查无数据</td></tr>`
							table8.html(str)
						}
                    }
            })
        })
    }

    function showBanqianInfo(obj,data){
        obj.empty();
        var str =
        `
            <tr>
                <td class="form-table">纳入易地扶贫搬迁规划户数（户）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">纳入易地扶贫搬迁规划人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">完成易地扶贫搬迁户数（户）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">完成易地扶贫搬迁人数（人）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">易地扶贫搬迁资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">中央预算内补助投资（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">中央财政专项资金投入</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">省级专项资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">市县专项资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">其他资金投入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
        `;
            obj.html(str);
            $('#table8 input').eq(0).val(data.data[0].AAE436)
			$('#table8 input').eq(1).val(data.data[0].AAE437)
			$('#table8 input').eq(2).val(data.data[0].AAE438)
			$('#table8 input').eq(3).val(data.data[0].AAE439)
			$('#table8 input').eq(4).val(data.data[0].AAE440)
			$('#table8 input').eq(5).val(data.data[0].AAE441)
			$('#table8 input').eq(6).val(data.data[0].AAE442)
			$('#table8 input').eq(7).val(data.data[0].AAE443)
			$('#table8 input').eq(8).val(data.data[0].AAE444)
			$('#table8 input').eq(9).val(data.data[0].AAE445)

    }
 //易地搬迁修改

	var bq = [];
 	var i = 0;
	$("body").on("blur","#table8 input",function(){

		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
    $("body").on("focus","#table8 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })

 $("#add8").click(function(){

    	$("#table8 input").each(function(){
		  i++;
		  bq.push($(this).val())
		})

    $.ajax({
        url:url+"uppdatefpdx/modMove/query",
        data:{'aae001':code,"aar040":year,'aae436':bq[0],'aae437':bq[1],'aae438':bq[2],'aae439':bq[3],'aae440':bq[4],
        'aae441':bq[5],'aae442':bq[6],'aae443':bq[7],'aae444':bq[8],'aae445':bq[9]},
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        type:"get",
        dataType:"json",
        success: function(data){
            if (data.code == 2000){
            	alert ("修改成功");
            }else{
            	alert("修改失败");
            }
        }
    })

})

//财政
   function  getcaizheng(table4,data){
       $.ajax({
        url: url + "fpdx/localInfo/query",
        data:{"aae001": code,"aar040":year},
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
               showCaizhengInfo(table4,data);
            }
        }
   })
   }
      function showCaizhengInfo(obj,data){
        obj.empty();
        var str =
        `
           <tr>
                <td class="form-table">地区生产总值（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">第一产业（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">第二产业（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">第三产业（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">地区生产总值增长率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">地方公共财政预算收入（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">地方公共财政预算支出（万元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">地方公共财政扶贫预算支出</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
            <tr>
                <td class="form-table">农村居民人均纯收入（元）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
                <td class="form-table">农村居民人均纯收入增长率（%）</td>
                <td><input type="text" placeholder="请输入" style="border: none;"/></td>
            </tr>
        `;
	        obj.html(str);
	        $('#table4 input').eq(0).val(data.data[0].AAE036)
			$('#table4 input').eq(1).val(data.data[0].AAE037)
			$('#table4 input').eq(2).val(data.data[0].AAE038)
			$('#table4 input').eq(3).val(data.data[0].AAE039)
			$('#table4 input').eq(4).val(data.data[0].AAE048)
			$('#table4 input').eq(5).val(data.data[0].AAE041)
			$('#table4 input').eq(6).val(data.data[0].AAE042)
			$('#table4 input').eq(7).val(data.data[0].AAE043)
			$('#table4 input').eq(8).val(data.data[0].AAE044)
			$('#table4 input').eq(9).val(data.data[0].AAE045)
    }

      //修改财政信息
      var cz = [];
	  var i = 0;

	$("body").on("blur","#table4 input",function(){
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
    $("body").on("focus","#table4 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })

	 $("#add4").click(function(){

	    	$("#table4 input").each(function(){
			  i++;
			  cz.push($(this).val())
			})

	    $.ajax({
	        url:url+"uppdatefpdx/modLocalInfo/query",
	        data:{'aae001':code,"aar040":year,'aae036':cz[0],'aae037':cz[1],'aae038':cz[2],'aae039':cz[3],'aae048':cz[4],
	        'aae041':cz[5],'aae042':cz[6],'aae043':cz[7],'aae044':cz[8],'aae045':cz[9]},
	        beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	        },
	        type:"get",
	        dataType:"json",
	        success: function(data){
	            if (data.code == 2000){
	            	alert ("修改成功");
	            }else{
	            	alert("修改失败");
	            }
	        }

	    })

	})

//加载县区
//function init_County(){
//  var p_qv=$("#p_qv");
//          $.ajax({
//          url: url + "district/county",
//          data:{},
//          method: "get",
//          dataType: "json",
//          json: "callback",
//          jsonpCallback: 'jsonpCallback',
//          success: function(data){
//              if (data.code == 2000){
//
//                  showCountyInfo(p_qv,data);
//
//              }
//
//          }
//
//  })
//}
//
//
//function showCountyInfo(obj,data){
//   obj.empty();
//   var str = `<option value="">县（区）</option>`;
//   var string = "";
//   for(let i = 0; i < data.data.length; i++){
//       str += `
//       <option value="${data.data[i].AAR001}" id='p_qv1'>${data.data[i].AAR009}</option>
//   `;
//   }
//   obj.html(str);
//}


})