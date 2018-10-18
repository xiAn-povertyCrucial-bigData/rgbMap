$(document).ready(function(){
    var theRequest = new Object();
    var url1=window.location.search; //获取url中"?"符后的字串
    let token=$.cookie("token"); 
    if(url1.indexOf("?")!=-1) {
        var str = url1.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    var  code = theRequest.value;
    var year = theRequest.time;
	function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
//	var year1=null;	
//	switch (year){
//		case '201808':
//			year1=2018;
//			break;		
//		case '201712':
//			year1=2017;
//			break;
//		case '2017':
//			year1=2016;
//			break;
//		case '2016':
//			year1=2015;
//			break; 
//		case '2015':
//			year1=2014;
//			break;         		
//		default:
//			break;
//	}
	
	$('#year dl dt').each(function() {
		if($(this).attr("sleep") == year) {
			$(this).addClass("active").siblings().removeClass("active");
		}
	})
    var work10 = $("#work10");
    var formInfos = $('#baseInfo');
    var population = $("#population");
    var rainPlan = $("#rainPlan");
    var money = $("#money");       
    
    $.ajax({
        url: url + "fpdx/cnty/query",
        data:{"aae001": code,"aar040":year},
        beforeSend:function(request){
	          request.setRequestHeader("Authorization",token);
	          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	          ShowLoading();
        },
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        success: function(data){
            if (data.code == 2000){                
                showBaseInfo(formInfos,data);
                getPopuInfo(population,year);
                getBanqian(banqian,year);
                getWork10(work10,year);
                getTudiInfo(tudiInfo,year);
                getXindai(xindai,year);
                getRainPlan(rainPlan,year);
                getcaizheng(money,year);               
            }else if(data.code==1005){
				alert(data.message)
			}else if(data.code==1009){
				var str =`
		        <caption>基础信息</caption>
		            <tr>
		                <td style='background: #F7F7F7;'>行政区划</td>
		                <td colspan="9"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>县属性</td>
		                <td ></td>
		                <td style='background: #F7F7F7;'>乡镇数（个）</td>
		                <td ></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>行政村数（个）</td>
		                <td ></td>
		                <td style='background: #F7F7F7;'>贫困村数（个）</td>
		                <td ></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>自然村数（个）</td>
		                <td ></td>
		                <td style='background: #F7F7F7;'>是否摘帽</td>
		                <td class='zm'></td>
		            </tr>            
		        `;		   		    
        		formInfos.html(str);
			}else if(data.code==4000){
				alert(data.message)
			}        
	    },
	    complete:function(){
		     HideLoading();
		}
    })
	
	$('#year dl dt').click(function(){
    	$(this).addClass('active');
    	$(this).siblings().removeClass('active');
    	year=$('#year dl dt.active').attr('sleep');
    	console.log(year);
    	$.ajax({
        url: url + "fpdx/cnty/query",
        data:{"aae001": code,"aar040":year},
        beforeSend:function(request){
	          request.setRequestHeader("Authorization",token);
	          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	          ShowLoading()
        },
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        success: function(data){
            if (data.code == 2000){   
                showBaseInfo(formInfos,data);
                getPopuInfo(population,year);
                getBanqian(banqian,year);
                getWork10(work10,year);
                getTudiInfo(tudiInfo,year);
                getXindai(xindai,year);
                getRainPlan(rainPlan,year);
                getcaizheng(money,year);      
            }else if(data.code==1005){
				alert(data.message)
			}else if(data.code==1009){
				var str =`
		        <caption>基础信息</caption>
		            <tr>
		                <td style='background: #F7F7F7;'>行政区划</td>
		                <td colspan="9"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>县属性</td>
		                <td ></td>
		                <td style='background: #F7F7F7;'>乡镇数（个）</td>
		                <td ></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>行政村数（个）</td>
		                <td ></td>
		                <td style='background: #F7F7F7;'>贫困村数（个）</td>
		                <td ></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>自然村数（个）</td>
		                <td ></td>
		                <td style='background: #F7F7F7;'>是否摘帽</td>
		                <td class='zm'></td>
		            </tr>            
		        `;		   		    
        		formInfos.html(str);
			}else if(data.code==4000){
				alert(data.message)
			}        
        },
	    complete:function(){
		     HideLoading();
		}
	})
})


    //查看基本信息
    function  showBaseInfo(obj,data){
        obj.empty();
   //for(let i = 0;i < data.data.list.length;i++){
       var str =`
        <caption>基础信息</caption>
            <tr>
                <td style='background: #F7F7F7;'>行政区划</td>
                <td colspan="9">陕西省-西安市-${data.data[0].AAR009}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>县属性</td>
                <td >${data.data[0].AAE002}</td>
                <td style='background: #F7F7F7;'>乡镇数（个）</td>
                <td >${data.data[0].AAE003}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>行政村数（个）</td>
                <td >${data.data[0].AAE006}</td>
                <td style='background: #F7F7F7;'>贫困村数（个）</td>
                <td >${data.data[0].AAE007}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>自然村数（个）</td>
                <td >${data.data[0].AAE008}</td>
                <td style='background: #F7F7F7;'>是否摘帽</td>
                <td class='zm'>${data.data[0].AAE100}</td>
            </tr>            
        `;
      // }
		   		    
        obj.html(str);
        $(".zm").each(function(){		    
		    if( $(this).text() == '0'){
		         $(this).text('否');
		    }else{
		    	$(this).text('是');
		    }
		})         
    }

    //人口信息
    function getPopuInfo(population,year){
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
                        showPopuInfo( population,data);              
                    }else if(data.code == 1009){
						var str=`
						<tr>
				            <td style='background: #F7F7F7;'>年末总户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>年末总人口（人）</td>
				            <td></td>                   
				        </tr>
				        <tr>
				            <td style='background: #F7F7F7;'>低保户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>低保人口（人）</td>
				            <td></td>            
				        </tr>
				        <tr>
				            <td style='background: #F7F7F7;'>低保贫困户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>低保贫困人口（人）</td>
				            <td></td>            
				        </tr>
				        <tr>
				        	<td style='background: #F7F7F7;'>五保户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>五保人口（人）</td>
				            <td></td>
				        </tr>
				        <tr>
				        	<td style='background: #F7F7F7;'>五保贫困户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>五保贫困人口（人）</td>
				            <td></td>
				        </tr>
				        <tr>
				            <td style='background: #F7F7F7;'>贫困户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>贫困人口（人）</td>
				            <td></td>
				        </tr>
				        <tr>
				            <td style='background: #F7F7F7;'>一般贫困户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>一般贫困人口（人）</td>
				            <td></td>
				        </tr>
				         <tr>
				            <td style='background: #F7F7F7;'>乡村户数（户）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>乡村人口（人）</td>
				            <td></td>
				        </tr>
				        <tr>
				        	<td style='background: #F7F7F7;'>妇女人口（人）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>少数民族人口（人）</td>
				            <td></td>            
				        </tr>
				        <tr>            
				            <td style='background: #F7F7F7;'>参加大病保险人数（人）</td>
				            <td></td>
				        </tr>
				        `;
						population.html(str)
					}else if(data.code==1005){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					}
                }            
        })
    })
}
    function showPopuInfo(obj,data){
        obj.empty();
         var str =`
        <tr>
            <td style='background: #F7F7F7;'>年末总户数（户）</td>
            <td>${data.data[0].AAE010} </td>
            <td style='background: #F7F7F7;'>年末总人口（人）</td>
            <td>${data.data[0].AAE014}</td>                   
        </tr>
        <tr>
            <td style='background: #F7F7F7;'>低保户数（户）</td>
            <td>${data.data[0].AAE012}</td>
            <td style='background: #F7F7F7;'>低保人口（人）</td>
            <td>${data.data[0].AAE017}</td>            
        </tr>
        <tr>
            <td style='background: #F7F7F7;'>低保贫困户数（户）</td>
            <td>${data.data[0].AEA003}</td>
            <td style='background: #F7F7F7;'>低保贫困人口（人）</td>
            <td>${data.data[0].AEA004}</td>            
        </tr>
        <tr>
        	<td style='background: #F7F7F7;'>五保户数（户）</td>
            <td>${data.data[0].AAE013}</td>
            <td style='background: #F7F7F7;'>五保人口（人）</td>
            <td>${data.data[0].AAE018}</td>
        </tr>
        <tr>
        	<td style='background: #F7F7F7;'>五保贫困户数（户）</td>
            <td>${data.data[0].AEA005}</td>
            <td style='background: #F7F7F7;'>五保贫困人口（人）</td>
            <td>${data.data[0].AEA006}</td>
        </tr>
        <tr>
            <td style='background: #F7F7F7;'>贫困户数（户）</td>
            <td>${data.data[0].AAE021}</td>
            <td style='background: #F7F7F7;'>贫困人口（人）</td>
            <td>${data.data[0].AAE022}</td>
        </tr>
        <tr>
            <td style='background: #F7F7F7;'>一般贫困户数（户）</td>
            <td>${data.data[0].AEA001}</td>
            <td style='background: #F7F7F7;'>一般贫困人口（人）</td>
            <td>${data.data[0].AEA002}</td>
        </tr>
         <tr>
            <td style='background: #F7F7F7;'>乡村户数（户）</td>
            <td>${data.data[0].AAE011} </td>
            <td style='background: #F7F7F7;'>乡村人口（人）</td>
            <td>${data.data[0].AAE015}</td>
        </tr>
        <tr>
        	<td style='background: #F7F7F7;'>妇女人口（人）</td>
            <td>${data.data[0].AAE019}</td>
            <td style='background: #F7F7F7;'>少数民族人口（人）</td>
            <td>${data.data[0].AAE016}</td>            
        </tr>
        <tr>            
            <td style='background: #F7F7F7;'>参加大病保险人数（人）</td>
            <td>${data.data[0].AAE051}</td>
        </tr>
        `;
        obj.html(str);
    }

    //十项重点
    function getWork10(work10,year){
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
                        showWorkInfo( work10,data);              
                    }else if(data.code == 1009){
						str = `
			        	<tr>	
			                <td rowspan="3" class="form-04-td" style='text-align: center;'>村级道路通畅</td>
			                <td style='background: #F7F7F7;'>是否通二级及以上高等级公路</td>
			                <td></td>  
			                <td style='background: #F7F7F7;'>二级及以上高等级公路里程（公里）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>高速公路里程（公里）</td>
			                <td></td>               
			            </tr>           
			            <tr>
			                <td style='background: #F7F7F7;'>通（沥青/水泥）公路行政村数（个）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>通客运班车行政村数（个）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>交通部门资金投入（万元）</td>
			                <td></td>
			            </tr>
			            <tr> 
			                <td style='background: #F7F7F7;'>中央资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>省级资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>县资金投入（万元）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td rowspan="3" style='text-align:center;'>饮水安全</td>
			                <td style='background: #F7F7F7;'>已实现安全饮水人数（人）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>已解决安全饮水农村学校数（个）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>已解决安全饮水农村学校率（%）</td>
			                <td></td>          
			            </tr>                    
			            <tr>   
			                <td style='background: #F7F7F7;'>饮用自来水户数（户）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>（石砌/水泥砌）水渠长度（公里）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>水利部门资金投入（万元）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>水利中央资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>水利省级资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>水利市县资金投入（万元）</td>
			                <td></td>
			            </tr>            
			            <tr>
			                <td rowspan="3" style='text-align:center;'>农村电力保障</td>
			                <td style='background: #F7F7F7;'>通电行政村数（个）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>通生产用电行政村数（个）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>通电户数（户）</td>
			                <td></td>         
			            </tr>      
			            <tr>
			                <td style='background: #F7F7F7;'>无电人口数（人）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>能源部门资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>能源中央资金投入（万元）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>能源省级资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>能源市县资金投入（万元）</td>
			                <td></td>
			            </tr>            
			            <tr>
			                <td rowspan="2" style='text-align:center;'>危房改造</td>
			                <td style='background: #F7F7F7;'>危房户数（户）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>住建部门资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>中央资金投入（万元）</td>
			                <td></td>               
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>省级资金投入（万元）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>市县资金投入（万元）</td>
			                <td></td>
			            </tr>           
			            <tr>
			                <td rowspan="6" style='text-align:center;'>特色产业增收</td>
			                <td style='background: #F7F7F7;'>农民专业合作组织数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>有农民专业合作组织的行政村数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>有互助资金组织的行政村数(个)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>参加贫困村互助资金组织户数(户)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>互助资金借款户数(户)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>贫困户借款户数(户)</td>
			                <td></td>
			            </tr>            
			            <tr>
			                <td style='background: #F7F7F7;'>互助资金累计借款人次(人次)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>互助资金累计发放借款(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>贫困户借款(万元)</td>
			                <td></td>                
			            </tr>                
			            <tr>
			                <td style='background: #F7F7F7;'>互助资金累计还款(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>贫困户还款(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>农业、林业部门资金投入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>农林部门中央资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>农林部门省级资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>农林部门市县资金投入(万元)</td>
			                <td></td>
			            </tr>
			             <tr>
			                <td style='background: #F7F7F7;'>农村青年创业小额贷款(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>妇女小额担保贷款(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>残疾人康复扶贫贷款(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td rowspan="2" style='text-align:center;'>乡村旅游</td>
			                <td style='background: #F7F7F7;'>开展乡村旅游的贫困村数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>乡村旅游游客接待量(万人次)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>乡村旅游从业人员数(人)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>乡村旅游总收入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td rowspan="3" style='text-align:center;'>教育</td>
			                <td style='background: #F7F7F7;'>学前三年教育毛入园率（%）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>高中阶段教育毛入学率（%）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>九年义务教育阶段巩固率（%）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>教育部门资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>教育部门中央资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>教育部门省级资金投入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>教育部门市县资金投入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td rowspan="6" style='text-align:center;'>卫生和计划生育</td>
			                <td style='background: #F7F7F7;'>有卫生院的乡镇数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>有卫生室行政村数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>人口自然增长率(‰)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>妇女总和生育率(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>参加新型农村合作医疗人数(人)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>参加城镇职工基本医疗保险人数(人)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>参加城镇居民基本医疗保险人数(人)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>出生人口政策符合率（%）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>县域外转诊率（%）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>每千人口医疗卫生机构床位数(张)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>每千人口卫生计生技术人员数(人)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>每千人口执业（助理）医师数(人)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>每千人口注册护士数(人)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>卫计部门资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>卫计部门中央资金投入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>卫计部门省级资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>卫计部门市县资金投入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td rowspan="4" style='text-align:center;'>文化建设</td>
			                <td style='background: #F7F7F7;'>县级公共图书馆数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>县级文化馆数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>有综合文化站乡镇数(个)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>有文化/图书室行政村数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>通广播电视行政村数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>通广播电视自然村数(个)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>文化部门资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>文化部门中央资金投入(万元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>文化部门省级资金投入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>文化部门市县资金投入(万元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td rowspan="2" style='text-align:center;'>贫困村信息化</td>
			                <td style='background: #F7F7F7;'>通宽带网络行政村数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>通宽带网络自然村（20户以上）数(个)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>未通宽带的义务教育学校、普通高中、职业院校数(个)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>手机能上网行政村数(个)</td>
			                <td></td>
			            </tr>`
						work10.html(str)
					}else if(data.code==1005){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					}
                }            
        })
    })
    }

    function showWorkInfo(obj,data){
        obj.empty();
        str = `
        	<tr>	
                <td rowspan="3" class="form-04-td" style='text-align: center;'>村级道路通畅</td>
                <td style='background: #F7F7F7;'>是否通二级及以上高等级公路</td>
                <td>${data.data[0].AAE301}</td>  
                <td style='background: #F7F7F7;'>二级及以上高等级公路里程（公里）</td>
                <td>${data.data[0].AAE302}</td>
                <td style='background: #F7F7F7;'>高速公路里程（公里）</td>
                <td>${data.data[0].AAE303}</td>               
            </tr>           
            <tr>
                <td style='background: #F7F7F7;'>通（沥青/水泥）公路行政村数（个）</td>
                <td>${data.data[0].AAE304}</td>
                <td style='background: #F7F7F7;'>通客运班车行政村数（个）</td>
                <td>${data.data[0].AAE305}</td>
                <td style='background: #F7F7F7;'>交通部门资金投入（万元）</td>
                <td>${data.data[0].AAE306}</td>
            </tr>
            <tr> 
                <td style='background: #F7F7F7;'>中央资金投入（万元）</td>
                <td>${data.data[0].AAE307}</td>
                <td style='background: #F7F7F7;'>省级资金投入（万元）</td>
                <td>${data.data[0].AAE308}</td>
                <td style='background: #F7F7F7;'>县资金投入（万元）</td>
                <td>${data.data[0].AAE309}</td>
            </tr>
            <tr>
                <td rowspan="3" style='text-align:center;'>饮水安全</td>
                <td style='background: #F7F7F7;'>已实现安全饮水人数（人）</td>
                <td>${data.data[0].AAE311}</td>
                <td style='background: #F7F7F7;'>已解决安全饮水农村学校数（个）</td>
                <td>${data.data[0].AAE312}</td>
                <td style='background: #F7F7F7;'>已解决安全饮水农村学校率（%）</td>
                <td>${data.data[0].AAE313}</td>          
            </tr>                    
            <tr>   
                <td style='background: #F7F7F7;'>饮用自来水户数（户）</td>
                <td>${data.data[0].AAE314}</td>
                <td style='background: #F7F7F7;'>（石砌/水泥砌）水渠长度（公里）</td>
                <td>${data.data[0].AAE315}</td>
                <td style='background: #F7F7F7;'>水利部门资金投入（万元）</td>
                <td>${data.data[0].AAE316}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>水利中央资金投入（万元）</td>
                <td>${data.data[0].AAE317}</td>
                <td style='background: #F7F7F7;'>水利省级资金投入（万元）</td>
                <td>${data.data[0].AAE318}</td>
                <td style='background: #F7F7F7;'>水利市县资金投入（万元）</td>
                <td>${data.data[0].AAE319}</td>
            </tr>            
            <tr>
                <td rowspan="3" style='text-align:center;'>农村电力保障</td>
                <td style='background: #F7F7F7;'>通电行政村数（个）</td>
                <td>${data.data[0].AAE321}</td>
                <td style='background: #F7F7F7;'>通生产用电行政村数（个）</td>
                <td>${data.data[0].AAE322}</td>
                <td style='background: #F7F7F7;'>通电户数（户）</td>
                <td>${data.data[0].AAE323}</td>         
            </tr>      
            <tr>
                <td style='background: #F7F7F7;'>无电人口数（人）</td>
                <td>${data.data[0].AAE324}</td>
                <td style='background: #F7F7F7;'>能源部门资金投入（万元）</td>
                <td>${data.data[0].AAE325}</td>
                <td style='background: #F7F7F7;'>能源中央资金投入（万元）</td>
                <td>${data.data[0].AAE326}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>能源省级资金投入（万元）</td>
                <td>${data.data[0].AAE327}</td>
                <td style='background: #F7F7F7;'>能源市县资金投入（万元）</td>
                <td>${data.data[0].AAE328}</td>
            </tr>            
            <tr>
                <td rowspan="2" style='text-align:center;'>危房改造</td>
                <td style='background: #F7F7F7;'>危房户数（户）</td>
                <td>${data.data[0].AAE331}</td>
                <td style='background: #F7F7F7;'>住建部门资金投入（万元）</td>
                <td>${data.data[0].AAE332}</td>
                <td style='background: #F7F7F7;'>中央资金投入（万元）</td>
                <td>${data.data[0].AAE333}</td>               
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>省级资金投入（万元）</td>
                <td>${data.data[0].AAE334}</td>
                <td style='background: #F7F7F7;'>市县资金投入（万元）</td>
                <td>${data.data[0].AAE335}</td>
            </tr>           
            <tr>
                <td rowspan="6" style='text-align:center;'>特色产业增收</td>
                <td style='background: #F7F7F7;'>农民专业合作组织数(个)</td>
                <td>${data.data[0].AAE341}</td>
                <td style='background: #F7F7F7;'>有农民专业合作组织的行政村数(个)</td>
                <td>${data.data[0].AAE342}</td>
                <td style='background: #F7F7F7;'>有互助资金组织的行政村数(个)</td>
                <td>${data.data[0].AAE343}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>参加贫困村互助资金组织户数(户)</td>
                <td>${data.data[0].AAE344}</td>
                <td style='background: #F7F7F7;'>互助资金借款户数(户)</td>
                <td>${data.data[0].AAE345}</td>
                <td style='background: #F7F7F7;'>贫困户借款户数(户)</td>
                <td>${data.data[0].AAE346}</td>
            </tr>            
            <tr>
                <td style='background: #F7F7F7;'>互助资金累计借款人次(人次)</td>
                <td>${data.data[0].AAE347}</td>
                <td style='background: #F7F7F7;'>互助资金累计发放借款(万元)</td>
                <td>${data.data[0].AAE348}</td>
                <td style='background: #F7F7F7;'>贫困户借款(万元)</td>
                <td>${data.data[0].AAE349}</td>                
            </tr>                
            <tr>
                <td style='background: #F7F7F7;'>互助资金累计还款(万元)</td>
                <td>${data.data[0].AAE350}</td>
                <td style='background: #F7F7F7;'>贫困户还款(万元)</td>
                <td>${data.data[0].AAE351}</td>
                <td style='background: #F7F7F7;'>农业、林业部门资金投入(万元)</td>
                <td>${data.data[0].AAE352}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>农林部门中央资金投入(万元)</td>
                <td>${data.data[0].AAE353}</td>
                <td style='background: #F7F7F7;'>农林部门省级资金投入(万元)</td>
                <td>${data.data[0].AAE354}</td>
                <td style='background: #F7F7F7;'>农林部门市县资金投入(万元)</td>
                <td>${data.data[0].AAE355}</td>
            </tr>
             <tr>
                <td style='background: #F7F7F7;'>农村青年创业小额贷款(万元)</td>
                <td>${data.data[0].AAE356}</td>
                <td style='background: #F7F7F7;'>妇女小额担保贷款(万元)</td>
                <td>${data.data[0].AAE357}</td>
                <td style='background: #F7F7F7;'>残疾人康复扶贫贷款(万元)</td>
                <td>${data.data[0].AAE358}</td>
            </tr>
            <tr>
                <td rowspan="2" style='text-align:center;'>乡村旅游</td>
                <td style='background: #F7F7F7;'>开展乡村旅游的贫困村数(个)</td>
                <td>${data.data[0].AAE361}</td>
                <td style='background: #F7F7F7;'>乡村旅游游客接待量(万人次)</td>
                <td>${data.data[0].AAE362}</td>
                <td style='background: #F7F7F7;'>乡村旅游从业人员数(人)</td>
                <td>${data.data[0].AAE363}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>乡村旅游总收入(万元)</td>
                <td>${data.data[0].AAE364}</td>
            </tr>
            <tr>
                <td rowspan="3" style='text-align:center;'>教育</td>
                <td style='background: #F7F7F7;'>学前三年教育毛入园率（%）</td>
                <td>${data.data[0].AAE366}</td>
                <td style='background: #F7F7F7;'>高中阶段教育毛入学率（%）</td>
                <td>${data.data[0].AAE367}</td>
                <td style='background: #F7F7F7;'>九年义务教育阶段巩固率（%）</td>
                <td>${data.data[0].AAE368}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>教育部门资金投入(万元)</td>
                <td>${data.data[0].AAE369}</td>
                <td style='background: #F7F7F7;'>教育部门中央资金投入(万元)</td>
                <td>${data.data[0].AAE370}</td>
                <td style='background: #F7F7F7;'>教育部门省级资金投入(万元)</td>
                <td>${data.data[0].AAE371}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>教育部门市县资金投入(万元)</td>
                <td>${data.data[0].AAE372}</td>
            </tr>
            <tr>
                <td rowspan="6" style='text-align:center;'>卫生和计划生育</td>
                <td style='background: #F7F7F7;'>有卫生院的乡镇数(个)</td>
                <td>${data.data[0].AAE374}</td>
                <td style='background: #F7F7F7;'>有卫生室行政村数(个)</td>
                <td>${data.data[0].AAE375}</td>
                <td style='background: #F7F7F7;'>人口自然增长率(‰)</td>
                <td>${data.data[0].AAE376}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>妇女总和生育率(个)</td>
                <td>${data.data[0].AAE377}</td>
                <td style='background: #F7F7F7;'>参加新型农村合作医疗人数(人)</td>
                <td>${data.data[0].AAE378}</td>
                <td style='background: #F7F7F7;'>参加城镇职工基本医疗保险人数(人)</td>
                <td>${data.data[0].AAE379}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>参加城镇居民基本医疗保险人数(人)</td>
                <td>${data.data[0].AAE380}</td>
                <td style='background: #F7F7F7;'>出生人口政策符合率（%）</td>
                <td>${data.data[0].AAE381}</td>
                <td style='background: #F7F7F7;'>县域外转诊率（%）</td>
                <td>${data.data[0].AAE382}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>每千人口医疗卫生机构床位数(张)</td>
                <td>${data.data[0].AAE383}</td>
                <td style='background: #F7F7F7;'>每千人口卫生计生技术人员数(人)</td>
                <td>${data.data[0].AAE384}</td>
                <td style='background: #F7F7F7;'>每千人口执业（助理）医师数(人)</td>
                <td>${data.data[0].AAE385}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>每千人口注册护士数(人)</td>
                <td>${data.data[0].AAE386}</td>
                <td style='background: #F7F7F7;'>卫计部门资金投入(万元)</td>
                <td>${data.data[0].AAE387}</td>
                <td style='background: #F7F7F7;'>卫计部门中央资金投入(万元)</td>
                <td>${data.data[0].AAE388}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>卫计部门省级资金投入(万元)</td>
                <td>${data.data[0].AAE389}</td>
                <td style='background: #F7F7F7;'>卫计部门市县资金投入(万元)</td>
                <td>${data.data[0].AAE390}</td>
            </tr>
            <tr>
                <td rowspan="4" style='text-align:center;'>文化建设</td>
                <td style='background: #F7F7F7;'>县级公共图书馆数(个)</td>
                <td>${data.data[0].AAE392}</td>
                <td style='background: #F7F7F7;'>县级文化馆数(个)</td>
                <td>${data.data[0].AAE393}</td>
                <td style='background: #F7F7F7;'>有综合文化站乡镇数(个)</td>
                <td>${data.data[0].AAE394}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>有文化/图书室行政村数(个)</td>
                <td>${data.data[0].AAE395}</td>
                <td style='background: #F7F7F7;'>通广播电视行政村数(个)</td>
                <td>${data.data[0].AAE396}</td>
                <td style='background: #F7F7F7;'>通广播电视自然村数(个)</td>
                <td>${data.data[0].AAE397}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>文化部门资金投入(万元)</td>
                <td>${data.data[0].AAE398}</td>
                <td style='background: #F7F7F7;'>文化部门中央资金投入(万元)</td>
                <td>${data.data[0].AAE399}</td>
                <td style='background: #F7F7F7;'>文化部门省级资金投入(万元)</td>
                <td>${data.data[0].AAE400}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>文化部门市县资金投入(万元)</td>
                <td>${data.data[0].AAE401}</td>
            </tr>
            <tr>
                <td rowspan="2" style='text-align:center;'>贫困村信息化</td>
                <td style='background: #F7F7F7;'>通宽带网络行政村数(个)</td>
                <td>${data.data[0].AAE403}</td>
                <td style='background: #F7F7F7;'>通宽带网络自然村（20户以上）数(个)</td>
                <td>${data.data[0].AAE404}</td>
                <td style='background: #F7F7F7;'>未通宽带的义务教育学校、普通高中、职业院校数(个)</td>
                <td>${data.data[0].AAE405}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>手机能上网行政村数(个)</td>
                <td>${data.data[0].AAE406}</td>
            </tr>
        `;
        obj.html(str);
    }

    //雨露计划
    function  getRainPlan(plan,year){        
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
                        showRainPlanInfo( plan,data);              
                    }else if(data.code == 1009){
						var str=`
						<tr>
			                <td style='background: #F7F7F7;'>雨露计划培训人数（人）
			                </td>
			                <td></td>
			                <td style='background: #F7F7F7;'>新成长劳动力（两后生）职业教育培训人数（人）
			                </td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>中高等职业教育（人）
			                </td>
			                <td></td>
			                <td style='background: #F7F7F7;'>劳动预备制培训（人）
			                </td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>劳动力转移就业培训人数（人）
			                </td>
			                <td></td>
			                <td style='background: #F7F7F7;'>农村适用技能培训人数（人）
			                </td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>贫困村致富带头人培训人数（人）
			                </td>
			                <td></td>
			                <td style='background: #F7F7F7;'>雨露计划资金投入（万元）
			                </td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>中央财政专项资金投入（万元）
			                </td>
			                <td></td>
			                <td style='background: #F7F7F7;'>省级及以下专项资金投入（万元）
			                </td>
			                <td></td>
			            </tr> `
						plan.html(str)
					}else if(data.code==1005){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					}
                }
            
        })
    })
    }

    function showRainPlanInfo(obj,data){
    obj.empty();
    var str =`
        	<tr>
                <td style='background: #F7F7F7;'>雨露计划培训人数（人）
                </td>
                <td>${data.data[0].AAE411}</td>
                <td style='background: #F7F7F7;'>新成长劳动力（两后生）职业教育培训人数（人）
                </td>
                <td>${data.data[0].AAE412}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>中高等职业教育（人）
                </td>
                <td>${data.data[0].AAE413}</td>
                <td style='background: #F7F7F7;'>劳动预备制培训（人）
                </td>
                <td>${data.data[0].AAE414}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>劳动力转移就业培训人数（人）
                </td>
                <td>${data.data[0].AAE415}</td>
                <td style='background: #F7F7F7;'>农村适用技能培训人数（人）
                </td>
                <td>${data.data[0].AAE416}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>贫困村致富带头人培训人数（人）
                </td>
                <td>${data.data[0].AAE417}</td>
                <td style='background: #F7F7F7;'>雨露计划资金投入（万元）
                </td>
                <td>${data.data[0].AAE418}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>中央财政专项资金投入（万元）
                </td>
                <td>${data.data[0].AAE419}</td>
                <td style='background: #F7F7F7;'>省级及以下专项资金投入（万元）
                </td>
                <td>${data.data[0].AAE420}</td>
            </tr>                 
    `;
    obj.html(str);
    }

    //土地信息

    function getTudiInfo(tudiInfo,year){
            var tudiInfo = $('#tudiInfo');
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
                        showTudiInfo( tudiInfo,data);              
                    }else if(data.code == 1009){
						var str=`
						<tr>
			                <td style='background: #F7F7F7;'>行政区域土地面积（平方公里）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>国有林场数</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>国有贫困林场数</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>耕地面积（公顷）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>基本农田面积（公顷）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>有效灌溉面积（公顷）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>林地面积（公顷）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>退耕还林面积（公顷）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>林果面积（公顷）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>牧草地面积（公顷）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>水域面积（公顷）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>荒漠化面积（公顷）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>石漠化面积（公顷）</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>森林覆盖率（%）</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>退耕还草面积（公顷）</td>
			                <td></td>
			            </tr>`
						tudiInfo.html(str)
					}else if(data.code==1005){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
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
                <td style='background: #F7F7F7;'>行政区域土地面积（平方公里）</td>
                <td>${data.data[0].AAE023}</td>
                <td style='background: #F7F7F7;'>国有林场数</td>
                <td>${data.data[0].AAE004}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>国有贫困林场数</td>
                <td>${data.data[0].AAE005}</td>
                <td style='background: #F7F7F7;'>耕地面积（公顷）</td>
                <td>${data.data[0].AAE024}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>基本农田面积（公顷）</td>
                <td>${data.data[0].AAE025}</td>
                <td style='background: #F7F7F7;'>有效灌溉面积（公顷）</td>
                <td>${data.data[0].AAE026}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>林地面积（公顷）</td>
                <td>${data.data[0].AAE027}</td>
                <td style='background: #F7F7F7;'>退耕还林面积（公顷）</td>
                <td>${data.data[0].AAE028}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>林果面积（公顷）</td>
                <td>${data.data[0].AAE029}</td>
                <td style='background: #F7F7F7;'>牧草地面积（公顷）</td>
                <td>${data.data[0].AAE047}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>水域面积（公顷）</td>
                <td>${data.data[0].AAE031}</td>
                <td style='background: #F7F7F7;'>荒漠化面积（公顷）</td>
                <td>${data.data[0].AAE032}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>石漠化面积（公顷）</td>
                <td>${data.data[0].AAE033}</td>
                <td style='background: #F7F7F7;'>森林覆盖率（%）</td>
                <td>${data.data[0].AAE034}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>退耕还草面积（公顷）</td>
                <td>${data.data[0].AAE035}</td>
            </tr>
    `;
    obj.html(str);
    }

    //小额信贷
    function getXindai(xindai,year){
        var xindai= $('#xindai');
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
                        showXindaiInfo( xindai,data);              
                    }else if(data.code == 1009){
						var str=`
						 <tr>
		                    <td style='background: #F7F7F7;'>扶贫小额信贷覆盖贫困村数（个）
		                    </td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>扶贫小额信贷贷款户数（户）
		                    </td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>扶贫小额信贷发放总额（万元）
		                    </td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>发展种植业、林果业（万元）
		                    </td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>发展养殖业（万元）
		                    </td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>发展加工业（万元）
		                    </td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>发展服务业、运输业（万元）
		                    </td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>其他（万元）
		                    </td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>支付扶贫小额信贷贴息资金（万元）
		                    </td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>地方贴息资金（万元）
		                    </td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>扶贫小额信贷当年到期贷款额（万元）
		                    </td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>扶贫小额信贷当年到期贷款回收额（万元）
		                    </td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>扶贫小额信贷贷款余额（万元）
		                    </td>
		                    <td></td>
		                </tr>  `
						xindai.html(str)
					}else if(data.code==1005){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
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
                    <td style='background: #F7F7F7;'>扶贫小额信贷覆盖贫困村数（个）
                    </td>
                    <td> ${data.data[0].AAE422}</td>
                    <td style='background: #F7F7F7;'>扶贫小额信贷贷款户数（户）
                    </td>
                    <td>${data.data[0].AAE423}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>扶贫小额信贷发放总额（万元）
                    </td>
                    <td>${data.data[0].AAE424}</td>
                    <td style='background: #F7F7F7;'>发展种植业、林果业（万元）
                    </td>
                    <td>${data.data[0].AAE425}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>发展养殖业（万元）
                    </td>
                    <td>${data.data[0].AAE426}</td>
                    <td style='background: #F7F7F7;'>发展加工业（万元）
                    </td>
                    <td>${data.data[0].AAE427}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>发展服务业、运输业（万元）
                    </td>
                    <td>${data.data[0].AAE428}</td>
                    <td style='background: #F7F7F7;'>其他（万元）
                    </td>
                    <td>${data.data[0].AAE429}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>支付扶贫小额信贷贴息资金（万元）
                    </td>
                    <td>${data.data[0].AAE430}</td>
                    <td style='background: #F7F7F7;'>地方贴息资金（万元）
                    </td>
                    <td>${data.data[0].AAE431}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>扶贫小额信贷当年到期贷款额（万元）
                    </td>
                    <td>${data.data[0].AAE432}</td>
                    <td style='background: #F7F7F7;'>扶贫小额信贷当年到期贷款回收额（万元）
                    </td>
                    <td>${data.data[0].AAE433}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>扶贫小额信贷贷款余额（万元）
                    </td>
                    <td>${data.data[0].AAE434}</td>
                </tr>        
        `;
        obj.html(str);
        }


        //搬迁
        function getBanqian(banqian,year){
            var banqian= $('#banqian');
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
                            showBanqianInfo(banqian,data);              
                        }else if(data.code == 1009){
							var str=`
							<tr>
				                <td style='background: #F7F7F7;'>纳入易地扶贫搬迁规划户数（户）
				                </td>
				                <td></td>
				                <td style='background: #F7F7F7;'>纳入易地扶贫搬迁规划人数（人）
				                </td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>完成易地扶贫搬迁户数（户）
				                </td>
				                <td></td>
				                <td style='background: #F7F7F7;'>完成易地扶贫搬迁人数（人）
				                </td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>易地扶贫搬迁资金投入（万元）
				                </td>
				                <td></td>
				                <td style='background: #F7F7F7;'>中央预算内补助投资（万元）
				                </td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>中央财政专项资金投入
				                </td>
				                <td></td>
				                <td style='background: #F7F7F7;'>省级专项资金投入（万元）
				                </td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>市县专项资金投入（万元）
				                </td>
				                <td></td>
				                <td style='background: #F7F7F7;'>其他资金投入（万元）
				                </td>
				                <td></td>
				            </tr>  `
							banqian.html(str)
						}else if(data.code==1005){
							alert(data.message)
						}else if(data.code==4000){
							alert(data.message)
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
                <td style='background: #F7F7F7;'>纳入易地扶贫搬迁规划户数（户）
                </td>
                <td>${data.data[0].AAE436}</td>
                <td style='background: #F7F7F7;'>纳入易地扶贫搬迁规划人数（人）
                </td>
                <td>${data.data[0].AAE437}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>完成易地扶贫搬迁户数（户）
                </td>
                <td>${data.data[0].AAE438}</td>
                <td style='background: #F7F7F7;'>完成易地扶贫搬迁人数（人）
                </td>
                <td>${data.data[0].AAE439}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>易地扶贫搬迁资金投入（万元）
                </td>
                <td>${data.data[0].AAE440}</td>
                <td style='background: #F7F7F7;'>中央预算内补助投资（万元）
                </td>
                <td>${data.data[0].AAE441}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>中央财政专项资金投入
                </td>
                <td>${data.data[0].AAE442}</td>
                <td style='background: #F7F7F7;'>省级专项资金投入（万元）
                </td>
                <td>${data.data[0].AAE443}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>市县专项资金投入（万元）
                </td>
                <td>${data.data[0].AAE444}</td>
                <td style='background: #F7F7F7;'>其他资金投入（万元）
                </td>
                <td>${data.data[0].AAE445}</td>
            </tr>                
        `;
        obj.html(str);
    }
//财政
   function  getcaizheng(money,year){
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
               showCaizhengInfo(money,data);                
            }else if(data.code == 1009){
				var str=`
				<tr>
	                <td style='background: #F7F7F7;'>地区生产总值（万元）</td>
	                <td></td>
	                <td style='background: #F7F7F7;'>第一产业（万元）</td>
	                <td></td>
	            </tr>
	            <tr>
	                <td style='background: #F7F7F7;'>第二产业（万元）</td>
	                <td></td>
	                <td style='background: #F7F7F7;'>第三产业（万元）</td>
	                <td></td>
	            </tr>
	            <tr>
	                <td style='background: #F7F7F7;'>地区生产总值增长率（%）</td>
	                <td></td>
	                <td style='background: #F7F7F7;'>地方公共财政预算收入（万元）</td>
	                <td></td>
	            </tr>
	            <tr>
	                <td style='background: #F7F7F7;'>地方公共财政预算支出（万元）</td>
	                <td></td>
	                <td style='background: #F7F7F7;'>地方公共财政扶贫预算支出（万元）</td>
	                <td></td>
	            </tr>
	            <tr>
	                <td style='background: #F7F7F7;'>农村居民人均纯收入（元）</td>
	                <td></td>
	                <td style='background: #F7F7F7;'>农村居民人均纯收入增长率（%）</td>
	                <td></td>
	            </tr> `
				money.html(str)
			}else if(data.code==1005){
				alert(data.message)
			}else if(data.code==4000){
				alert(data.message)
			}
        }

   })
   }
      function showCaizhengInfo(obj,data){
        obj.empty();
        var str =
        `
           <tr>
                <td style='background: #F7F7F7;'>地区生产总值（万元）</td>
                <td>${data.data[0].AAE036}</td>
                <td style='background: #F7F7F7;'>第一产业（万元）</td>
                <td>${data.data[0].AAE037}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>第二产业（万元）</td>
                <td>${data.data[0].AAE038}</td>
                <td style='background: #F7F7F7;'>第三产业（万元）</td>
                <td>${data.data[0].AAE039}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>地区生产总值增长率（%）</td>
                <td>${data.data[0].AAE048}</td>
                <td style='background: #F7F7F7;'>地方公共财政预算收入（万元）</td>
                <td>${data.data[0].AAE041}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>地方公共财政预算支出（万元）</td>
                <td>${data.data[0].AAE042}</td>
                <td style='background: #F7F7F7;'>地方公共财政扶贫预算支出（万元）</td>
                <td>${data.data[0].AAE043}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>农村居民人均纯收入（元）</td>
                <td>${data.data[0].AAE044}</td>
                <td style='background: #F7F7F7;'>农村居民人均纯收入增长率（%）</td>
                <td>${data.data[0].AAE045}</td>
            </tr>              
        `;
        obj.html(str);
    }
   

    // //帮扶单位
    // function  getBangfu(){
    // var bangfu= $('#bangfu');
    //     $(function(){
    //         $.ajax({
    //             url: url + "pkc/detail/bangfuinfo",
    //             data:{"aac001": code,"aar040":year},
    //             method: "post",
    //             dataType: "json",
    //             json: "callback",
    //             jsonpCallback: 'jsonpCallback',
    //             success: function(data){
    //                 if (data.code == 2000){
    //                     console.log("ok");
    //                     showBangfuInfo(banqian,data);              
    //                 }
    //             }
            
    //     })
    // })
    // }

    // function showBangfuInfo(obj,data){
    //     obj.empty();
    //     var str =`   
    //        <tr>
    //            <td>序号</td>
    //             <td>帮扶单位名称
    //             </td>
    //             <td>帮扶单位类型
    //             </td>
    //             <td>隶属关系
    //             </td>
    //             <td>联系电话
    //             </td>
    //             <td>联系人
    //             </td>
    //             <td>联系人
    //             </td>
    //         </tr>           
    //         `;
    //    for(let i = 0; i < data.data.list.length; i++){
    //     str+=    `
    //            <tr>
    //            <td>${i}</td>
    //             <td>${data.data.list[i].AAP001}
    //             </td>
    //             <td>${data.data.list[i].AAP051}
    //             </td>
    //             <td>${data.data.list[i].AAP004}
    //             </td>
    //             <td>${data.data.list[i].AAP005}
    //             </td>
    //             <td>${data.data.list[i].AAR011}
    //             </td>
    //             <td>${data.data.list[i].AAR012}
    //             </td>
    //         </tr>                      
    //     `; 
    // }
    //     obj.html(str);
    // } 


    // //驻村工作队
    // function getTeam(){
    //     var team = $('#team');
    //     $(function(){
    //         $.ajax({
    //             url: url + "pkc/detail/zcgzdinfo",
    //             data:{"aac001": code,"aar040":year},
    //             method: "post",
    //             dataType: "json",
    //             json: "callback",
    //             jsonpCallback: 'jsonpCallback',
    //             success: function(data){
    //                 if (data.code == 2000){
    //                     console.log("ok");
    //                     showTeamInfo(banqian,data);              
    //                 }
    //             }
            
    //     })
    // })
    // }
    // function showTeam(obj,data){
    //     obj.empty();
    //     var str= `   <tr>
    //             <td>序号</td>
    //             <td>队员姓名
    //             </td>               
    //             <td>单位名称
    //             </td>

    //             <td>是否第一书记
    //             </td>

    //             <td>是否驻村队长
    //             </td>
    //             <td>技术特长</td>
        
    //             <td>职务级别</td>
    
            
    //             <td>政治面貌</td>
    
    //             <td>隶属关系</td>
    
            
    //             <td>联系人电话</td>
        
    //             <td>联系地址</td>
    //             </tr>
    //             `;
    //     for(let i = 0; i < data.data.list.length; i++){
    //       str += 
    //       `
    //       <tr>
    //              <td>${i}</td>
    //             <td>${data.data.list[i].AAB002}
    //             </td>               
    //             <td>${data.data.list[i].AAP001}
    //             </td>

    //             <td>${data.data.list[i].AAK032}
    //             </td>

    //             <td>${data.data.list[i].AAK031}
    //             </td>
    //             <td>${data.data.list[i].AAK037}</td>
        
    //             <td>${data.data.list[i].AAF031}</td>
    
            
    //             <td>${data.data.list[i].AAK033}</td>
    
    //             <td>${data.data.list[i].AAP004}</td>
    
            
    //             <td>${data.data.list[i].AAR012}</td>
        
    //             <td>${data.data.list[i].AAR013}</td>
    //             </tr>
    //     `;
    // }
    //     obj.html(str);
    // // }

    // function  getHuanjing(){
    //     var huanjing = $('#huanjing');
    //     $(function(){
    //         $.ajax({
    //             url: url + "pkc/detail/renjuinfo",
    //             data:{"aac001": code,"aar040":year},
    //             method: "post",
    //             dataType: "json",
    //             json: "callback",
    //             jsonpCallback: 'jsonpCallback',
    //             success: function(data){
    //                 if (data.code == 2000){
    //                     console.log("ok");
    //                     showHuanjingInfo(banqian,data);              
    //                 }
    //             }
            
    //     })
    // })
    // }

    // function showHuanjing(obj,data){
    //     obj.empty();
    //     var str=
    //     `
    //         <tr>
    //                 <td>是否有公共卫生厕所
    //                 </td>
    //                 <td></td>
    //                 <td>是否有垃圾集中收集点
    //                 </td>
    //                 <td></td>
    //             </tr> 
    //             <tr>
    //                 <td>是否有污水处理设施
    //                 </td>
    //                 <td></td>
    //                 <td>是否有集中沼气池
    //                 </td>
    //                 <td></td>
    //             </tr> 
    //             <tr>
    //                 <td>是否有两旁绿化
    //                 </td>
    //                 <td></td>
    //                 <td>是否有旅游村停车场
    //                 </td>
    //                 <td></td>
    //             </tr> 
    //             <tr>
    //                 <td>是否有路灯
    //                 </td>
    //                 <td></td>               
    //             </tr>            
    //     `;
    //     obj.html(str);
    // }
})