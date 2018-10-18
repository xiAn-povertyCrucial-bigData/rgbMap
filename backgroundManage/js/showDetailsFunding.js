$(document).ready(function(){
    // var url = "http://192.168.1.135:8080/"
    let token=$.cookie("token");
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
//    $('#year').html(year1+'年');
	function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
	$('#year dl dt').each(function() {
		if($(this).attr("sleep") == year) {
			$(this).addClass("active").siblings().removeClass("active");
		}
	})
    var formInfos = $('#baseInfo');
    var  pop = $("#population");
    var  work = $("#work10");
    var income = $("#income");
    var yulu= $('#yulu');
    var xindai= $('#xindai');
    var banqian= $('#banqian');
    var team = $('#team');
    var bangfu= $('#bangfu');
    var tudiInfo = $('#tudiInfo');
    $(function(){
        $.ajax({
            url: url + "pkc/detail/query/jbinfo",
            data:{"aad001": code,"aar040":year},
            beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	              ShowLoading();
	        },
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showBaseInfo( formInfos,data);
                    getPopuInfo(pop,year);
                    getBangfu(bangfu,year);
                    getBanqian(banqian,year);
                    getYulu(yulu,year);
                    //getHuanjing(huanjing,year);
                    getIncome(income,year);
                    getWork10(work,year);
                    getTudiInfo(tudiInfo,year);
                    getTeam(team,year);
                    getXindai(xindai,year);                                    
                }else if(data.code == 1005){
					var str=`
					<caption>基础信息</caption>
					<tr>
		                <td style='background: #F7F7F7;'>行政区划</td>
		                <td colspan="9"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>村负责人</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>村办公电话</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>职务</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>村官人数</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>中共党员人数</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>牲畜存栏数（头）</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>经度</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>纬度</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>发展方向</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>地形地貌</td>
		                <td colspan="3"></td>    
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>村属性</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>计划脱贫退出年份（年）</td>
		                <td colspan="3"></td>
		            </tr>`
					formInfos.html(str);
					getPopuInfo(pop,year);
                    getBangfu(bangfu,year);
                    getBanqian(banqian,year);
                    getYulu(yulu,year);
                    getIncome(income,year);
                    getWork10(work,year);
                    getTudiInfo(tudiInfo,year);
                    getTeam(team,year);
                    getXindai(xindai,year); 
				}else if(data.code==1009){
					alert(data.message)
				}else if(data.code==4000){
					alert(data.message)
				} 
            },
            complete:function(){
			     HideLoading();
			}
    	})
    })
    
    $('#year dl dt').click(function(){
    	$(this).addClass('active');
    	$(this).siblings().removeClass('active');
    	year=$('#year dl dt.active').attr('sleep');
    	console.log(year);
    	$.ajax({
            url: url + "pkc/detail/query/jbinfo",
            data:{"aad001": code,"aar040":year},
            beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	              ShowLoading();
	        },
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showBaseInfo( formInfos,data);
                    getPopuInfo(pop,year);
                    getBangfu(bangfu,year);
                    getBanqian(banqian,year);
                    getYulu(yulu,year);
                    //getHuanjing(huanjing,year);
                    getIncome(income,year);
                    getWork10(work,year);
                    getTudiInfo(tudiInfo,year);
                    getTeam(team,year);
                    getXindai(xindai,year);                                    
                }else if(data.code == 1005){
					var str=`
					<caption>基础信息</caption>
					<tr>
		                <td style='background: #F7F7F7;'>行政区划</td>
		                <td colspan="9"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>村负责人</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>村办公电话</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>职务</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>村官人数</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>中共党员人数</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>牲畜存栏数（头）</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>经度</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>纬度</td>
		                <td colspan="3"></td>
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>发展方向</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>地形地貌</td>
		                <td colspan="3"></td>    
		            </tr>
		            <tr>
		                <td style='background: #F7F7F7;'>村属性</td>
		                <td colspan="3"></td>
		                <td colspan="2" style='background: #F7F7F7;'>计划脱贫退出年份（年）</td>
		                <td colspan="3"></td>
		            </tr>`
					formInfos.html(str);
					getPopuInfo(pop,year);
                    getBangfu(bangfu,year);
                    getBanqian(banqian,year);
                    getYulu(yulu,year);
                    //getHuanjing(huanjing,year);
                    getIncome(income,year);
                    getWork10(work,year);
                    getTudiInfo(tudiInfo,year);
                    getTeam(team,year);
                    getXindai(xindai,year); 
				}else if(data.code==1009){
					alert(data.message)
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
        var str =`
        	<caption>基础信息</caption>
            <tr>
                <td style='background: #F7F7F7;'>行政区划</td>
                <td colspan="9">陕西省-${data.data.CITY}-${data.data.AREA}-${data.data.TOWN}-${data.data.VILLAGE}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>村负责人</td>
                <td colspan="3">${data.data.AAR011}</td>
                <td colspan="2" style='background: #F7F7F7;'>村办公电话</td>
                <td colspan="3">${data.data.AAR012}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>职务</td>
                <td colspan="3">${data.data.AAF031}</td>
                <td colspan="2" style='background: #F7F7F7;'>村官人数</td>
                <td colspan="3">${data.data.AAD038}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>中共党员人数</td>
                <td colspan="3">${data.data.AAD037}</td>
                <td colspan="2" style='background: #F7F7F7;'>牲畜存栏数（头）</td>
                <td colspan="3">${data.data.AAD026}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>经度</td>
                <td colspan="3">${data.data.AAR101}</td>
                <td colspan="2" style='background: #F7F7F7;'>纬度</td>
                <td colspan="3">${data.data.AAR102}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>发展方向</td>
                <td colspan="3">${data.data.AAD035}</td>
                <td colspan="2" style='background: #F7F7F7;'>地形地貌</td>
                <td colspan="3">${data.data.AAD036}</td>    
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>村属性</td>
                <td colspan="3">${data.data.AAD004}</td>
                <td colspan="2" style='background: #F7F7F7;'>计划脱贫退出年份（年）</td>
                <td colspan="3">${data.data.ADA007}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>高程</td>
                <td colspan="3">${data.data.AAR103}</td>
            </tr>
        `;
        obj.html(str);
    }

    //人口信息
    function getPopuInfo(popuInfo,year){
        $(function(){
            $.ajax({
                url: url + "pkc/detail/query/rkinfo",
                data:{"aad001": code,"aar040":year},
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
                method: "post",
                dataType: "json",
                success: function(data){
                    if (data.code == 2000){
                        showPopuInfo( popuInfo,data);              
                    }else if(data.code == 1005){
						var str=`
						<tr>
		                    <td style='background: #F7F7F7;'>总户数（户）</td>
		                    <td> </td>
		                    <td style='background: #F7F7F7;'>总人口数（人）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>低保户数（户）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>低保人口数（人）</td>
		                    <td></td>                   
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>低保贫困户数（户）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>低保贫困人口数（人）</td>
		                    <td></td>                   
		                </tr>
		                <tr>                    
		                    <td style='background: #F7F7F7;'>五保户数（户）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>五保人口数（人）</td>
		                    <td></td>
		                </tr>
		                <tr>                    
		                    <td style='background: #F7F7F7;'>五保贫困户数（户）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>五保贫困人口数（人）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                	<td style='background: #F7F7F7;'>贫困户数（户）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>贫困人口数（人）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                	<td style='background: #F7F7F7;'>一般贫困户数（户）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>一般贫困人口数（人）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>自然村（村民小组）数（个）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>残疾贫困人口数（人）</td>
		                    <td></td>
		                </tr>           
		                <tr>
		                    <td style='background: #F7F7F7;'>少数民族人口数（人）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>妇女人口数（个）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>残疾人人口数（人）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>劳动力人数（人）</td>
		                    <td></td>
		                </tr>`
						popuInfo.html(str)
					}else if(data.code==1009){
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
                    <td style='background: #F7F7F7;'>总户数（户）</td>
                    <td>${data.data.AAD005} </td>
                    <td style='background: #F7F7F7;'>总人口数（人）</td>
                    <td>${data.data.AAD010}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>低保户数（户）</td>
                    <td>${data.data.AAD008}</td>
                    <td style='background: #F7F7F7;'>低保人口数（人）</td>
                    <td>${data.data.AAD012}</td>                   
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>低保贫困户数（户）</td>
                    <td>${data.data.ADA003}</td>
                    <td style='background: #F7F7F7;'>低保贫困人口数（人）</td>
                    <td>${data.data.ADA004}</td>                   
                </tr>
                <tr>                    
                    <td style='background: #F7F7F7;'>五保户数（户）</td>
                    <td>${data.data.AAD009}</td>
                    <td style='background: #F7F7F7;'>五保人口数（人）</td>
                    <td>${data.data.AAD010}</td>
                </tr>
                <tr>                    
                    <td style='background: #F7F7F7;'>五保贫困户数（户）</td>
                    <td>${data.data.ADA005}</td>
                    <td style='background: #F7F7F7;'>五保贫困人口数（人）</td>
                    <td>${data.data.ADA006}</td>
                </tr>
                <tr>
                	<td style='background: #F7F7F7;'>贫困户数（户）</td>
                    <td>${data.data.AAD007}</td>
                    <td style='background: #F7F7F7;'>贫困人口数（人）</td>
                    <td>${data.data.AAD011}</td>
                </tr>
                <tr>
                	<td style='background: #F7F7F7;'>一般贫困户数（户）</td>
                    <td>${data.data.ADA001}</td>
                    <td style='background: #F7F7F7;'>一般贫困人口数（人）</td>
                    <td>${data.data.ADA002}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>自然村（村民小组）数（个）</td>
                    <td>${data.data.AAD006}</td>
                    <td style='background: #F7F7F7;'>残疾贫困人口数（人）</td>
                    <td>${data.data.ADA024}</td>
                </tr>           
                <tr>
                    <td style='background: #F7F7F7;'>少数民族人口数（人）</td>
                    <td>${data.data.AAD014}</td>
                    <td style='background: #F7F7F7;'>妇女人口数（个）</td>
                    <td>${data.data.AAD015}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>残疾人人口数（人）</td>
                    <td>${data.data.AAD016}</td>
                    <td style='background: #F7F7F7;'>劳动力人数（人）</td>
                    <td>${data.data.AAD017}</td>
                </tr>
                `;
                obj.html(str);
    }

    //十项重点
    function getWork10(work10,year){
            $.ajax({
                url: url + "pkc/detail/query/teninfo",
                data:{"aad001": code,"aar040":year},
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
                    }else if(data.code == 1005){
						var str=`
						<tr>
	                    <td rowspan="3" class="form-04-td" style='text-align: center;'>村级道路通畅</td>
	                    <td colspan="2" style='background: #F7F7F7;'>到乡镇是否通沥青（水泥）路</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>是否通客运班车（水泥）路</td>
	                    <td></td>               
	                </tr>           
	                <tr>
	                    <td colspan="2" style='background: #F7F7F7;'>自然村到行政村未通沥青(水泥)路村数（个）</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>自然村到行政村未通沥青(水泥)路里程（公里）</td>
	                    <td></td>
	                </tr>
	                <tr><td colspan="2" style='background: #F7F7F7;'>行政村到乡镇未通沥青(水泥)路里程（公里）</td>
	                    <td ></td></tr>
	                <tr>
	                    <td style='text-align: center;'>饮水情况</td>
	                    <td colspan="2" style='background: #F7F7F7;'>未实现饮水安全户数（户)</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>饮水困难户数（户）</td>
	                    <td></td>               
	                </tr>                        
	                <tr>
	                    <td rowspan="2" style='text-align: center;'>农村电力保障</td>
	                    <td colspan="2" style='background: #F7F7F7;'>已通生产用电自然村(20户以上)数</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>未通生活用电的自然村数（个）</td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td colspan="2" style='background: #F7F7F7;'>未通生产用电的自然村数（人）</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>未通生活用电的户数（户）</td>
	                    <td></td>
	                </tr>                
	                <tr>
	                    <td style='text-align: center;'>危房改造</td>
	                    <td colspan="2" style='background: #F7F7F7;'>危房户数（户）</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>危房户涉及到的贫困人数（人）</td>
	                    <td></td>            
	                </tr>      
	                <tr>
	                    <td rowspan="2" style='text-align: center;'>特色产业增收</td>
	                    <td colspan="2" style='background: #F7F7F7;'> 农民专业合作社个数</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>加入特色产业专业合作社的贫困户数（户）</td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td colspan="2" style='background: #F7F7F7;'>互助资金协会数量（个）</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>互助资金规模量（万元）</td>
	                    <td></td>
	                </tr>                
	                <tr>
	                    <td rowspan="2" style='text-align: center;'>乡村旅游</td>
	                    <td colspan="2" style='background: #F7F7F7;'>开展乡村旅游的户数</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>乡村旅游从业人员数</td>
	                    <td></td>                
	                </tr>
	                <tr>
	                    <td colspan="2" style='background: #F7F7F7;'>经营农家乐的户数</td>
	                    <td></td>
	                    <td colspan="2" style='background: #F7F7F7;'>经营农家乐户年均收入</td>
	                    <td></td>
	                </tr>                
	                <tr>
	                    <td rowspan="2" style='text-align: center;'>卫生和计划生育</td>
	                    <td style='background: #F7F7F7;'>卫生室个数(个)</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>公共卫生厕所个数（个）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>执业（助理）医师数（人）</td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td style='background: #F7F7F7;'>垃圾集中堆放点个数（个）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>行政村卫生室面积（平方米）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>是否有诊断室治疗室公共卫生室和药房</td>
	                    <td></td>
	                </tr>               
	                <tr>
	                    <td style='text-align: center;'>文化建设</td>
	                    <td style='background: #F7F7F7;'>行政村文化（图书）室个数 （个）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>通广播电视户数（户）</td>
	                    <td></td>
	                    
	                </tr>               
	                <tr>
	                    <td rowspan="2" style='text-align: center;'>贫困村信息化</td>
	                    <td style='background: #F7F7F7;'>通宽带户数（户）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>能用手机上网的户数（户）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>已通电自然村(20户以上)中通宽带的村数（个)</td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td style='background: #F7F7F7;'>通宽带的村小学个数（个）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>行政村信息员（人）</td>
	                    <td></td>
	                </tr>
	                <tr>
	                    <td rowspan="2" style='text-align: center;'>社会保障信息</td>
	                    <td style='background: #F7F7F7;'>参加新型农村合作医疗人数</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>参加城乡居民基本养老保险人数</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>参加城镇职工基本养老保险人数</td>
	                    <td></td>
	                </tr>  
	                <tr>                    
	                    <td style='background: #F7F7F7;'>获得医疗救助人次（人）</td>
	                    <td></td>
	                    <td style='background: #F7F7F7;'>养老保险制度覆盖范围人口数（人）</td>
	                    <td></td>
	                </tr> `
						work10.html(str)
					}else if(data.code==1009){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					} 
                }            
        })
    }

    function showWorkInfo(obj,data){
        obj.empty();
        str = `
        		<tr>
                    <td rowspan="3" class="form-04-td" style='text-align: center;'>村级道路通畅</td>
                    <td colspan="2" style='background: #F7F7F7;'>到乡镇是否通沥青（水泥）路</td>
                    <td>${data.data.AAD328}</td>
                    <td colspan="2" style='background: #F7F7F7;'>是否通客运班车（水泥）路</td>
                    <td>${data.data.AAD323}</td>               
                </tr>           
                <tr>
                    <td colspan="2" style='background: #F7F7F7;'>自然村到行政村未通沥青(水泥)路村数（个）</td>
                    <td>${data.data.AAD322}</td>
                    <td colspan="2" style='background: #F7F7F7;'>自然村到行政村未通沥青(水泥)路里程（公里）</td>
                    <td>${data.data.AAD324}</td>
                </tr>
                <tr><td colspan="2" style='background: #F7F7F7;'>行政村到乡镇未通沥青(水泥)路里程（公里）</td>
                    <td >${data.data.AAD321}</td></tr>
                <tr>
                    <td style='text-align: center;'>饮水情况</td>
                    <td colspan="2" style='background: #F7F7F7;'>未实现饮水安全户数（户)</td>
                    <td>${data.data.ADA008}</td>
                    <td colspan="2" style='background: #F7F7F7;'>饮水困难户数（户）</td>
                    <td>${data.data.ADA009}</td>               
                </tr>                        
                <tr>
                    <td rowspan="2" style='text-align: center;'>农村电力保障</td>
                    <td colspan="2" style='background: #F7F7F7;'>已通生产用电自然村(20户以上)数</td>
                    <td>${data.data.AAD358}</td>
                    <td colspan="2" style='background: #F7F7F7;'>未通生活用电的自然村数（个）</td>
                    <td>${data.data.AAD355}</td>
                </tr>
                <tr>
                    <td colspan="2" style='background: #F7F7F7;'>未通生产用电的自然村数（人）</td>
                    <td>${data.data.AAD357}</td>
                    <td colspan="2" style='background: #F7F7F7;'>未通生活用电的户数（户）</td>
                    <td>${data.data.AAD356}</td>
                </tr>                
                <tr>
                    <td style='text-align: center;'>危房改造</td>
                    <td colspan="2" style='background: #F7F7F7;'>危房户数（户）</td>
                    <td>${data.data.ADA010}</td>
                    <td colspan="2" style='background: #F7F7F7;'>危房户涉及到的贫困人数（人）</td>
                    <td>${data.data.ADA011}</td>            
                </tr>      
                <tr>
                    <td rowspan="2" style='text-align: center;'>特色产业增收</td>
                    <td colspan="2" style='background: #F7F7F7;'> 农民专业合作社个数</td>
                    <td>${data.data.AAD371}</td>
                    <td colspan="2" style='background: #F7F7F7;'>加入特色产业专业合作社的贫困户数（户）</td>
                    <td>${data.data.AAD372}</td>
                </tr>
                <tr>
                    <td colspan="2" style='background: #F7F7F7;'>互助资金协会数量（个）</td>
                    <td>${data.data.ADA012}</td>
                    <td colspan="2" style='background: #F7F7F7;'>互助资金规模量（万元）</td>
                    <td>${data.data.ADA013}</td>
                </tr>                
                <tr>
                    <td rowspan="2" style='text-align: center;'>乡村旅游</td>
                    <td colspan="2" style='background: #F7F7F7;'>开展乡村旅游的户数</td>
                    <td>${data.data.AAD381}</td>
                    <td colspan="2" style='background: #F7F7F7;'>乡村旅游从业人员数</td>
                    <td>${data.data.AAD383}</td>                
                </tr>
                <tr>
                    <td colspan="2" style='background: #F7F7F7;'>经营农家乐的户数</td>
                    <td>${data.data.AAD382}</td>
                    <td colspan="2" style='background: #F7F7F7;'>经营农家乐户年均收入</td>
                    <td>${data.data.AAD384}</td>
                </tr>                
                <tr>
                    <td rowspan="2" style='text-align: center;'>卫生和计划生育</td>
                    <td style='background: #F7F7F7;'>卫生室个数(个)</td>
                    <td>${data.data.AAD391}</td>
                    <td style='background: #F7F7F7;'>公共卫生厕所个数（个）</td>
                    <td>${data.data.AAD392}</td>
                    <td style='background: #F7F7F7;'>执业（助理）医师数（人）</td>
                    <td>${data.data.AAD393}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>垃圾集中堆放点个数（个）</td>
                    <td>${data.data.AAD394}</td>
                    <td style='background: #F7F7F7;'>行政村卫生室面积（平方米）</td>
                    <td>${data.data.ADA014}</td>
                    <td style='background: #F7F7F7;'>是否有诊断室治疗室公共卫生室和药房</td>
                    <td>${data.data.ADA015}</td>
                </tr>               
                <tr>
                    <td style='text-align: center;'>文化建设</td>
                    <td style='background: #F7F7F7;'>行政村文化（图书）室个数 （个）</td>
                    <td>${data.data.AAD401}</td>
                    <td style='background: #F7F7F7;'>通广播电视户数（户）</td>
                    <td>${data.data.AAD402}</td>
                    
                </tr>               
                <tr>
                    <td rowspan="2" style='text-align: center;'>贫困村信息化</td>
                    <td style='background: #F7F7F7;'>通宽带户数（户）</td>
                    <td>${data.data.AAD411}</td>
                    <td style='background: #F7F7F7;'>能用手机上网的户数（户）</td>
                    <td>${data.data.AAD413}</td>
                    <td style='background: #F7F7F7;'>已通电自然村(20户以上)中通宽带的村数（个)</td>
                    <td>${data.data.AAD415}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>通宽带的村小学个数（个）</td>
                    <td>${data.data.AAD412}</td>
                    <td style='background: #F7F7F7;'>行政村信息员（人）</td>
                    <td>${data.data.AAD414}</td>
                </tr>
                <tr>
                    <td rowspan="2" style='text-align: center;'>社会保障信息</td>
                    <td style='background: #F7F7F7;'>参加新型农村合作医疗人数</td>
                    <td>${data.data.AAD311}</td>
                    <td style='background: #F7F7F7;'>参加城乡居民基本养老保险人数</td>
                    <td>${data.data.AAD313}</td>
                    <td style='background: #F7F7F7;'>参加城镇职工基本养老保险人数</td>
                    <td>${data.data.AAD314}</td>
                </tr>  
                <tr>                    
                    <td style='background: #F7F7F7;'>获得医疗救助人次（人）</td>
                    <td>${data.data.AAD312}</td>
                    <td style='background: #F7F7F7;'>养老保险制度覆盖范围人口数（人）</td>
                    <td>${data.data.ADA024}</td>
                </tr>               
        `;
        obj.html(str);
    }

    //获取收入信息
    function  getIncome(income,year){
            $.ajax({
                url: url + "pkc/detail/query/shouruinfo",
                data:{"aad001": code,"aar040":year},
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
                        showIncomeInfo( income,data);              
                    }else if(data.code == 1005){
						var str=`
						<tr>
				            <td style='background: #F7F7F7;'>农民人均纯收入（元）</td>
				            <td></td>
				            <td style='background: #F7F7F7;'>村级集体经济收入（万元）</td>
				            <td></td>
				        </tr>`
						income.html(str)
					}else if(data.code==1009){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					} 
                }    
        })
    }

    function showIncomeInfo(obj,data){
    obj.empty();
    var str =`
        <tr>
            <td style='background: #F7F7F7;'>农民人均纯收入（元）</td>
            <td>${data.data.AAD301}</td>
            <td style='background: #F7F7F7;'>村级集体经济收入（万元）</td>
            <td>${data.data.AAD302}</td>
        </tr>
                                
	    `;
	    obj.html(str);
    }
    //土地信息
    function getTudiInfo(tudiInfo,year){
            
            $.ajax({
                url: url + "pkc/detail/query/tdinfo",
                data:{"aad001": code,"aar040":year},
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
                    }else if(data.code == 1005){
						var str=`
						<tr>
		                    <td style='background: #F7F7F7;'>耕地面积（亩）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>林果面积（亩）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>水域面积（亩）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>有效灌溉面积（亩）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>林地面积（亩）</td>
		                    <td></td>
		                    <td style='background: #F7F7F7;'>退耕还林面积（亩）</td>
		                    <td></td>
		                </tr>
		                <tr>
		                    <td style='background: #F7F7F7;'>牧草地面积（亩）</td>
		                    <td></td>
		                </tr>`
						tudiInfo.html(str)
					}else if(data.code==1009){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					} 
                }
    	})
    }
    function showTudiInfo(obj,data){
     obj.empty();
    var str=
		    `
		        <tr>
                    <td style='background: #F7F7F7;'>耕地面积（亩）</td>
                    <td>${data.data.AAD019}</td>
                    <td style='background: #F7F7F7;'>林果面积（亩）</td>
                    <td>${data.data.AAD023}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>水域面积（亩）</td>
                    <td>${data.data.AAD025}</td>
                    <td style='background: #F7F7F7;'>有效灌溉面积（亩）</td>
                    <td>${data.data.AAD027}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>林地面积（亩）</td>
                    <td>${data.data.AAD021}</td>
                    <td style='background: #F7F7F7;'>退耕还林面积（亩）</td>
                    <td>${data.data.AAD022}</td>
                </tr>
                <tr>
                    <td style='background: #F7F7F7;'>牧草地面积（亩）</td>
                    <td>${data.data.AAD024}</td>
                </tr>
    `;
    	obj.html(str);
    }

	//雨露计划
       function getYulu(yulu,year){
           
           $(function(){
               $.ajax({
                   url: url + "pkc/detail/query/rain",
                   data:{"aad001": code,"aar040":year},
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
                           showyuluInfo(yulu,data);              
                       }else if(data.code == 1005){
							var str=`
							<tr>
				                <td style='background: #F7F7F7;'>应届初中毕业未升入普通高中的新成长劳动力数（人）</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>应届高中毕业未升入大学,专科学校的新成长劳动力数（人）</td>
				                <td></td>
				            </tr>
				            <tr>                
				                <td style='background: #F7F7F7;'>当年已经参加雨露计划人数（人）</td>
				                <td></td>
				            </tr>  `
							yulu.html(str)
						}else if(data.code==1009){
							alert(data.message)
						}else if(data.code==4000){
							alert(data.message)
						} 
                   }            
           	})
       	})
      }

       function showyuluInfo(obj,data){
       obj.empty();
       var str =
       `
           <tr>
                <td style='background: #F7F7F7;'>应届初中毕业未升入普通高中的新成长劳动力数（人）</td>
                <td>${data.data.ADA016}</td>
                <td style='background: #F7F7F7;'>应届高中毕业未升入大学,专科学校的新成长劳动力数（人）</td>
                <td>${data.data.ADA017}</td>
            </tr>
            <tr>                
                <td style='background: #F7F7F7;'>当年已经参加雨露计划人数（人）</td>
                <td>${data.data.ADA018}</td>
            </tr>                            
       `;
       obj.html(str);
       }
	
       //小额信贷
       function getXindai(xindai,year){
           
           $(function(){
               $.ajax({
                   url: url + "pkc/detail/query/credit",
                   data:{"aad001": code,"aar040":year},
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
                       }else if(data.code == 1005){
							var str=`
							<tr>
				           	   <td>批复的扶贫小额信贷户数（户）</td>
				               <td></td>
				               <td>当年贷款户数（户）</td>
				               <td></td>
				           </tr>
				           <tr>
				               <td>逾期未还款户数（户）</td>
				               <td></td>               
				           </tr>`
							xindai.html(str)
						}else if(data.code==1009){
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
           	   <td>批复的扶贫小额信贷户数（户）</td>
               <td>${data.data.ADA019}</td>
               <td>当年贷款户数（户）</td>
               <td>${data.data.ADA020}</td>
           </tr>
           <tr>
               <td>逾期未还款户数（户）</td>
               <td>${data.data.ADA021}</td>               
           </tr>                  
       `;
       obj.html(str);
       }


       //搬迁
       function getBanqian(banqian,year){          
           $(function(){
               $.ajax({
                   url: url + "pkc/detail/query/relocation",
                   data:{"aad001": code,"aar040":year},
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
                       }else if(data.code == 1005){
							var str=`
							 <tr>
				               <td>纳入易地扶贫搬迁规划户数（户）</td>
				               <td></td>
				               <td>已搬迁户数（户）</td>
				               <td></td>
				           </tr>  `
							banqian.html(str)
						}else if(data.code==1009){
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
               <td>纳入易地扶贫搬迁规划户数（户）</td>
               <td>${data.data.ADA022}</td>
               <td>已搬迁户数（户）</td>
               <td>${data.data.ADA023}</td>
           </tr>                  
       `;
       obj.html(str);
       }


    //帮扶单位
    function  getBangfu(bangfu,year){    
            $.ajax({
                url: url + "pkc/detail/query/bangfuinfo",
                data:{"aad001": code,"aar040":year},
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
                        showBangfuInfo(bangfu,data);              
                    }else if(data.code == 1005){
						var str=`
						<tr>
			                <td>序号</td>
			                <td>帮扶单位名称</td>
			                <td>帮扶单位类型</td>
			                <td>隶属关系</td>
			                <td>联系电话</td>
			                <td>联系人</td>
			                <td>联系人电话</td>
			            </tr>`
						bangfu.html(str)
					}else if(data.code==1009){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					} 
                }            
    	})
    }

    function showBangfuInfo(obj,data){
        obj.empty();
        var str =`   
           <tr>
                <td>序号</td>
                <td>帮扶单位名称</td>
                <td>帮扶单位类型</td>
                <td>隶属关系</td>
                <td>联系电话</td>
                <td>联系人</td>
                <td>联系人电话</td>
            </tr>           
            `;
       for(let i = 0; i < data.data.length; i++){
        str+=    `
               <tr>
               <td>${i+1}</td>
                <td>${data.data[i].AAP001}</td>
                <td>${data.data[i].AAP051}</td>
                <td>${data.data[i].AAP004}</td>
                <td>${data.data[i].AAP005}</td>
                <td>${data.data[i].AAR011}</td>
                <td>${data.data[i].AAR012}</td>
            </tr>                      
        `; 
    }
        obj.html(str);
        $("td").each(function(){		    
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		}) 
    } 

    //驻村工作队
    function getTeam(team,year){
        
            $.ajax({
                url: url + "pkc/detail/query/zcgzdinfo",
                data:{"aad001": code,"aar040":year},
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
                        showTeamInfo(0,team,data);              
                    }else if(data.code == 1005){
						var str=`
						<tr>
			                <td>序号</td>
			                <td>队员姓名 </td>               
			                <td>派出单位 </td>
			                <td>派出单位职务</td>
			                <td>联系电话</td>      
			                <td>第一书记标志 </td>
			                <td>队长标志 </td>
			                <td>包村干部标志</td>   
			                <td>副队长标志</td>          
			                <td>队员标志</td>   
			                <td>开始时间</td>   
			                <td>结束时间</td>   
			                <td>性别</td>         
			                <td>证件号码</td>    
			                <td>学历</td>
			                <td>政治面貌</td>
			                <td>技术特长</td>
			                </tr>`
						team.html(str)
					}else if(data.code==1009){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					} 
                }
    	})
    }
    function showTeamInfo(index,obj,data){
        obj.empty();
        var str= `   <tr>
                <td>序号</td>
                <td>队员姓名 </td>               
                <td>派出单位 </td>
                <td>派出单位职务</td>
                <td>联系电话</td>      
                <td>第一书记标志 </td>
                <td>队长标志 </td>
                <td>包村干部标志</td>   
                <td>副队长标志</td>          
                <td>队员标志</td>   
                <td>开始时间</td>   
                <td>结束时间</td>   
                <td>性别</td>         
                <td>证件号码</td>    
                <td>学历</td>
                <td>政治面貌</td>
                <td>技术特长</td>
                </tr>
                `;
    for(let i = 0; i < data.data.length; i++){
          str += 
          `
          <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data[i].AAB002}</td>
              <td>${data.data[i].AAP001}</td>
              <td>${data.data[i].AAK888}</td>
              <td>${data.data[i].AAR012}</td>
              <td>${data.data[i].AAK032}</td>
              <td>${data.data[i].AAK031}</td>
              <td>${data.data[i].AAK777}</td>
              <td>${data.data[i].AAK666}</td>
              <td>${data.data[i].AAK039}</td>
              <td>${data.data[i].AAR020}</td>
              <td>${data.data[i].AAR021}</td>
              <td>${data.data[i].AAB003}</td>             
        	  <td>${data.data[i].AAB004}</td>   
              <td>${data.data[i].AAK036}</td>   
              <td>${data.data[i].AAK033}</td> 
              <td>${data.data[i].AAK037}</td>                                  
          </tr>`
    }
        obj.html(str);
//      for(let i=0;i<$("#team tr td").length;i++){
//          if($("#team tr td").eq(i).text()=="null" || $("#team tr td").eq(i).text()=="undefined" || $("#team tr td").eq(i).text()==undefined){
//              $("#team tr td").eq(i).text("");
//          }
//      }

    }
//人居环境
//  function  getHuanjing(huanjing,year){
//      var huanjing = $('#huanjing');
//          $.ajax({
//              url: url + "pkc/detail/query/renjuinfo",
//              data:{"aad001": code,"aar040":year},
//              beforeSend:function(request){
//		              request.setRequestHeader("Authorization",token);
//		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
//		        },
//              method: "post",
//              dataType: "json",
//              json: "callback",
//              jsonpCallback: 'jsonpCallback',
//              success: function(data){
//                  if (data.code == 2000){
//                      console.log("ok");
//                      showHuanjingInfo(huanjing,data);              
//                  }
//              }
//  	})
//  }

    function showHuanjingInfo(obj,data){
        obj.empty();
        var str=
        `
            <tr>
                    <td style='background: #F7F7F7;'>是否有公共卫生厕所</td>
                    <td></td>
                    <td style='background: #F7F7F7;'>是否有垃圾集中收集点 </td>
                    <td></td>
                </tr> 
                <tr>
                    <td style='background: #F7F7F7;'>是否有污水处理设施 </td>
                    <td></td>
                    <td style='background: #F7F7F7;'>是否有集中沼气池 </td>
                    <td></td>
                </tr> 
                <tr>
                    <td style='background: #F7F7F7;'>是否有两旁绿化 </td>
                    <td></td>
                    <td style='background: #F7F7F7;'>是否有旅游村停车场 </td>
                    <td></td>
                </tr> 
                <tr>
                    <td style='background: #F7F7F7;'>是否有路灯 </td>
                    <td></td>               
                </tr>            
        `;
        obj.html(str);
    }
})