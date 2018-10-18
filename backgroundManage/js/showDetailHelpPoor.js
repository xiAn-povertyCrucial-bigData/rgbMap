$(document).ready(function(){
	let token=$.cookie("token");
	var die=[];
   //var  url = "http://192.168.1.135:8080/"
        var theRequest = new Object();
        var url1=window.location.search; //获取url中"?"符后的字串
        if(url1.indexOf("?")!=-1) {
            var str = url1.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
        var  code = theRequest.value.trim();
    	var year = $.trim(theRequest.time);
    	function ShowLoading() {
		    $(".spinner").show();
		}
		function HideLoading() {
		    $(".spinner").hide();
		}
		//var address=theRequest.address.trim();
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
	$('#year dl dt').each(function() {
		if($(this).attr("sleep") == year) {
			$(this).addClass("active").siblings().removeClass("active");
		}
	})
    //村编号 和年份
    var basicInfo = $('#basicInfo');
    var banqian = $('#banqian');
    var homeInfo = $('#homeBaseInfo');
    var homeIncome = $('#homeIncome');
    var lifeProduct = $('#lifeProduct');
    var lastWork = $('#lastWork');
    var helper = $('#helper');
    $(function(){             
          $.ajax({
                url: url + "table/pkh/detail/query/base",
                data:{"aac001":code,"aar040":year},
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		              ShowLoading();
		        },
                method: "post",
                dataType: "json",
                json: "callback",
                jsonpCallback: 'jsonpCallback',
                success: function(data){
                    if (data.code == 2000){                        
                        showAllPoorInfo(basicInfo,data);
                        getMoveInfo(banqian,year);
                        showhomeInfo(homeInfo,year);
                        getIncomeInfo(homeIncome,year);
                        getLifeProductInfo(lifeProduct,year);
                        getLastWorkInfo(lastWork,year);
                        getHelpInfo(helper,year);
                    }else if(data.code==1005){
                    	var str = `
				               <caption>基础信息</caption>
				          <tr>
				              <td style='background: #F7F7F7;'>行政区划</td>
				              <td></td>
				              <td style='background: #F7F7F7;'>户主姓名</td>
				              <td></td>
				          </tr>
				          <tr>              
				              <td style='background: #F7F7F7;'>户编号</td>
				              <td></td>
				              <td style='background: #F7F7F7;'>户主证件类型</td>
				              <td></td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>户主证件号码</td>
				              <td></td>
				              <td style='background: #F7F7F7;'>联系电话</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>开户银行</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>银行卡号</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>脱贫状态</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>贫困户属性</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>家庭人口数</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>主要致贫原因</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>其他致贫原因</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>返贫原因</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>识别标准</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>是否军烈属</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>户状态历史</td>
				              <td colspan="3"></td>
				          </tr>				
				         `;
				          basicInfo.html(str);
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
                url: url + "table/pkh/detail/query/base",
                data:{"aac001":code,"aar040":year},
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		              ShowLoading();
		        },
                method: "post",
                dataType: "json",
                json: "callback",
                jsonpCallback: 'jsonpCallback',
                success: function(data){
                    if (data.code == 2000){
                        getMoveInfo(banqian,year);
                        showAllPoorInfo(basicInfo,data);
                        showhomeInfo(homeInfo,year);
                        getIncomeInfo(homeIncome,year);
                        getLifeProductInfo(lifeProduct,year);
                        getLastWorkInfo(lastWork,year);
                        getHelpInfo(helper,year);
                    }else if(data.code==1005){
                    	var str = `
				               <caption>基础信息</caption>
				          <tr>
				              <td style='background: #F7F7F7;'>行政区划</td>
				              <td></td>
				              <td style='background: #F7F7F7;'>户主姓名</td>
				              <td></td>
				          </tr>
				          <tr>              
				              <td style='background: #F7F7F7;'>户编号</td>
				              <td></td>
				              <td style='background: #F7F7F7;'>户主证件类型</td>
				              <td></td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>户主证件号码</td>
				              <td></td>
				              <td style='background: #F7F7F7;'>联系电话</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>开户银行</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>银行卡号</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>脱贫状态</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>贫困户属性</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>家庭人口数</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>主要致贫原因</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>其他致贫原因</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>返贫原因</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>识别标准</td>
				              <td></</td>
				              <td style='background: #F7F7F7;'>是否军烈属</td>
				              <td></</td>
				          </tr>
				          <tr>
				              <td style='background: #F7F7F7;'>户状态历史</td>
				              <td colspan="3"></td>
				          </tr>				
				         `;
				          basicInfo.html(str);
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
//初始化基础信息
  function showAllPoorInfo(obj,data){
      obj.empty();
      var str = `
               <caption>基础信息</caption>
          <tr>
              <td style='background: #F7F7F7;'>行政区划</td>
              <td>${data.data.ADDRESS}</td>
              <td style='background: #F7F7F7;'>户主姓名</td>
              <td>${data.data.AAC029}</td>
          </tr>
          <tr>              
              <td style='background: #F7F7F7;'>户编号</td>
              <td>${data.data.AAC001}</td>
              <td style='background: #F7F7F7;'>户主证件类型</td>
              <td>${data.data.AAB018}</td>
          </tr>
          <tr>
              <td style='background: #F7F7F7;'>户主证件号码</td>
              <td>${data.data.AAC031}</td>
              <td style='background: #F7F7F7;'>联系电话</td>
              <td>${data.data.AAR012}</</td>
          </tr>
          <tr>
              <td style='background: #F7F7F7;'>开户银行</td>
              <td>${data.data.AAQ002}</</td>
              <td style='background: #F7F7F7;'>银行卡号</td>
              <td>${data.data.AAC004}</</td>
          </tr>
          <tr>
              <td style='background: #F7F7F7;'>脱贫状态</td>
              <td>${data.data.AAR010}</</td>
              <td style='background: #F7F7F7;'>贫困户属性</td>
              <td>${data.data.AAC006}</</td>
          </tr>
          <tr>
              <td style='background: #F7F7F7;'>家庭人口数</td>
              <td>${data.data.AAC017}</</td>
              <td style='background: #F7F7F7;'>主要致贫原因</td>
              <td>${data.data.AAC007}</</td>
          </tr>
          <tr>
              <td style='background: #F7F7F7;'>其他致贫原因</td>
              <td>${data.data.AAC008}</</td>
              <td style='background: #F7F7F7;'>返贫原因</td>
              <td>${data.data.AAC009}</</td>
          </tr>
          <tr>
              <td style='background: #F7F7F7;'>识别标准</td>
              <td>${data.data.AAC005}</</td>
              <td style='background: #F7F7F7;'>是否军烈属</td>
              <td>${data.data.AAC012}</</td>
          </tr>
          <tr>
              <td style='background: #F7F7F7;'>户状态历史</td>
              <td colspan="3">${data.data.homeTypeHistory}</td>
          </tr>

         `;
          obj.html(str);
            $("td").each(function(){
			    if( $(this).text() == 'null'||$(this).text() == 'undefined'){
			         $(this).text('');
			    }
		    })
  }

//家庭成员 信息
    function showhomeInfo(homeInfo,year){       
        $.ajax({
            url: url + "table/pkh/detail/query/family",
            data:{"aac001":code,"aar040":year},
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
                }else if(data.code==1005){
                    	str =`<tr>
			                <th>序号</th>
			                <th>姓名</th>
			                <th>性别</th>
			                <th>证件类型</th>
			                <th>证件号码</th>
			                <th>年龄</th>
			                <th>与户主关系</th>
			                <th>民族</th>
			                <th>文化程度</th>
			                <th>在校生状况</th>
			                <th>健康状况</th>
			                <th>劳动能力</th>
			                <th>政治面貌</th>
			                <th>是否现役军人</th>
			                <th>是否参加大病保险</th>
			                <th>是否享受低保</th>
			                <th>是否享受五保</th>
			                <th>疾病名称</th>
			                <th>疾病等级</th>
			            </tr>`;
			        homeInfo.html(str)
                }else if(data.code==1009){
                	alert(data.message)
                }else if(data.code==4000){
					alert(data.message)
				}
            }
    })
  }
//家庭成员
  function showHomeInfo(obj,data){
       obj.empty();
       var str =`<tr>
                <th>序号</th>
                <th>姓名</th>
                <th>性别</th>
                <th>证件类型</th>
                <th>证件号码</th>
                <th>年龄</th>
                <th>联系电话</th>
                <th>与户主关系</th>
                <th>民族</th>
                <th>文化程度</th>
                <th>在校生状况</th>
                <th>健康状况</th>
                <th>劳动能力</th>
                <th>政治面貌</th>
                <th>是否现役军人</th>
                <th>是否参加大病保险</th>
                <th>是否享受低保</th>
                <th>是否享受五保</th>
                <th>疾病名称</th>
                <th>疾病等级</th>
            </tr>`;
       for(let i = 0; i < data.data.length; i++){
            str += `
            <tr>
                <td>${i+1}</td>
                <td sleep1='${data.data[i].AAB015}'>${data.data[i].AAB002}</td>
                <td>${data.data[i].AAB003}</td>
                <td>${data.data[i].AAB018}</td>
                <td>${data.data[i].AAB004}</td>
                <td>${data.data[i].AAB005}岁</td>
                <td>${data.data[i].AAB031}</td>
                <td>${data.data[i].AAB006}</td>
                <td>${data.data[i].AAB007}</td>
                <td>${data.data[i].AAB008}</td>
                <td>${data.data[i].AAB009}</td>
                <td>${data.data[i].AAB017}</td>
                <td>${data.data[i].AAB010}</td>
                <td>${data.data[i].AAK033}</td>
                <td>${data.data[i].AAB019}</td>
                <td>${data.data[i].AAB022}</td>
                <td>${data.data[i].AAB030}</td>
                <td>${data.data[i].ABB003}</td>
                <td>${data.data[i].ABB001}</td>
                <td>${data.data[i].ABB002}</td>
            </tr> `;
       }
         obj.html(str);
        $('#homeBaseInfo tr td').each(function(){
		    if( $(this).text() == 'null'||$(this).text() == 'undefined'){
		         $(this).text('');
		    }
	    })
        for(var i=1;i<$('#homeBaseInfo tr').length;i++){
        	die.push($('#homeBaseInfo tr').eq(i).children('td:nth-child(2)').attr('sleep1'));   
        	//console.log(die)
        	//console.log(die[i-1])
		    if(die[i-1]=='1'||die[i-1]=='4'){
		    	$('#homeBaseInfo tr').eq(i).children('td:nth-child(2)').css('color','black')
		    } else{
		    	$('#homeBaseInfo tr').eq(i).children('td:nth-child(2)').css('color','#ff6c00')
		    }
       }        
  }

//收入
    function getIncomeInfo(homeIncome,year){        
        $.ajax({
            url: url + "table/pkh/detail/query/income",
            data:{"aac001":code,"aar040":year},
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
                }else if(data.code==1005){
                    var str=`
			      		<tr>                
			                <td style='background: #F7F7F7;'>年收入(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>年纯收入(元)</td>
			                <td></td>
			            </tr> 
			      		<tr>                
			                <td style='background: #F7F7F7;'>年人均纯收入(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>工资性收入(元)</td>
			                <td></td>
			            </tr>
			            <tr>                
			                <td style='background: #F7F7F7;'>生产经营性收入(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>生产经营性支出(元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>财产性收入(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>计划生育金(元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>一年期以上低保金(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>一年期以下低保金(元)</td>
			                <td></td>               
			            </tr>
			            <tr>
			            	<td style='background: #F7F7F7;'>五保金(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>养老保险金(元)</td>
			                <td></td>                
			            </tr>
			            <tr>
			            	<td style='background: #F7F7F7;'>生态补偿金(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>其他稳定长期的转移性收入(元)</td>
			                <td></td>                
			            </tr>                       
			            <tr>
			            	<td style='background: #F7F7F7;'>转移性收入(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>离退休金(元)</td>
			                <td></td>               
			            </tr>
			            <tr>
			            	<td style='background: #F7F7F7;'>赡养金(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>高龄补贴(元)</td>
			                <td></td>                
			            </tr>
			            <tr>
			            	<td style='background: #F7F7F7;'>长期抚恤金(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>残疾补贴(元)</td>
			                <td></td>                
			            </tr>
			            <tr>            	
			                <td style='background: #F7F7F7;'>稳定性的补贴(元)</td>
			                <td></td>
			                <td style='background: #F7F7F7;'>三年以上的资产性收入(元)</td>
			                <td></td>
			            </tr>
			            <tr>
			                <td style='background: #F7F7F7;'>贫困户家中现役军人（士官或军官）的工资(元)</td>
			                <td></td>
			            </tr>
			      `;
			      homeIncome.html(str);	
                }else if(data.code==1009){
                	alert(data.message)
                }else if(data.code==4000){
					alert(data.message)
				}
            }
    })
  }
   function  showIncomeInfo(obj,data){
      obj.empty();
      //data.data.AAC085   data.data.AAC081   data.data.AAC079
      //let zhuanyishouru=parseInt(data.data.ACA001)+parseInt(data.data.ACA002)+data.data.AAC077+parseInt(data.data.ACA009)+data.data.AAC086+parseInt(data.data.ACA003)+parseInt(data.data.ACA004)+parseInt(data.data.ACA005)+parseInt(data.data.ACA006)+parseInt(data.data.ACA007)+parseInt(data.data.ACA008)+data.data.AAC076+data.data.AAC083;
      //let nianshouru=data.data.AAC073+data.data.AAC071+data.data.AAC072+zhuanyishouru-data.data.AAC074;      
      //let nianchunshouru=nianshouru-parseInt(data.data.ACA009)
      var str=`
      		<tr>
                <td style='background: #F7F7F7;'>年收入(元)</td>
                <td>${data.data.AAC081}</td>
                <td style='background: #F7F7F7;'>年纯收入(元)</td>
                <td>${data.data.AAC079}</td>
            </tr>
      		<tr>
                <td style='background: #F7F7F7;'>年人均纯收入(元)</td>
                <td>${data.data.AAC082}</td>
                <td style='background: #F7F7F7;'>工资性收入(元)</td>
                <td>${data.data.AAC073}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>生产经营性收入(元)</td>
                <td>${data.data.AAC071}</td>
                <td style='background: #F7F7F7;'>生产经营性支出(元)</td>
                <td>${data.data.AAC074}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>财产性收入(元)</td>
                <td>${data.data.AAC072}</td>
                <td style='background: #F7F7F7;'>计划生育金(元)</td>
                <td>${data.data.AAC076}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>低保金(元)</td>
                <td>${data.data.AAC077}</td>
				<td style='background: #F7F7F7;'>五保金(元)</td>
                <td>${data.data.AAC086}</td>
            </tr>
            <tr>
            	
                <td style='background: #F7F7F7;'>养老保险金(元)</td>
                <td>${data.data.AAC087}</td>
                <td style='background: #F7F7F7;'>生态补偿金(元)</td>
                <td>${data.data.AAC078}</td>
            </tr>
            <tr>
            	
                <td style='background: #F7F7F7;'>其他稳定长期的转移性收入(元)</td>
                <td>${data.data.AAC083}</td>
                <td style='background: #F7F7F7;'>转移性收入(元)</td>
                <td>${data.data.AAC085}</td>
            </tr>
            <tr>
            	
                <td style='background: #F7F7F7;'>离退休金(元)</td>
                <td>${data.data.ACA001}</td>
                <td style='background: #F7F7F7;'>赡养金(元)</td>
                <td>${data.data.ACA002}</td>
            </tr>
            <tr>
            	
                <td style='background: #F7F7F7;'>高龄补贴(元)</td>
                <td>${data.data.ACA003}</td>
                <td style='background: #F7F7F7;'>长期抚恤金(元)</td>
                <td>${data.data.ACA004}</td>
            </tr>
            <tr>
            	
                <td style='background: #F7F7F7;'>残疾补贴(元)</td>
                <td>${data.data.ACA005}</td>
                <td style='background: #F7F7F7;'>稳定性的补贴(元)</td>
                <td>${data.data.ACA007}</td>
            </tr>
            <tr>
                
                <td style='background: #F7F7F7;'>三年以上的资产性收入(元)</td>
                <td>${data.data.ACA008}</td>
                <td style='background: #F7F7F7;'>贫困户家中现役军人（士官或军官）的工资(元)</td>
                <td>${data.data.ACA006}</td>
            </tr>
      `;
      obj.html(str);
        $("td").each(function(){
		    if( $(this).text() == 'null'||$(this).text() == 'undefined'){
		         $(this).text('');
		    }
	    })
  }

////生产生活信息请求
function getLifeProductInfo(lifeProduct,year) {              
        $.ajax({
            url: url + "table/pkh/detail/query/life",
            data:{"aac001":code,"aar040":year},
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
                    showLifeProductInfo( lifeProduct,data);                  
                }else if(data.code==1005){
                    	var str=`
				          <tr>
				                <td style='background: #F7F7F7;'>耕地面积(亩)</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>有效灌溉面积（亩）</td>
				                <td></td>
				            <tr>
				                <td style='background: #F7F7F7;'>林地面积（亩）</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>退耕还林面积（亩）</td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>林果面积（亩）</td>
				                 <td></td>
				                <td style='background: #F7F7F7;'>牧草地面积（亩）</td>
				               <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>水面面积（亩）</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>住房面积（平方）</td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>饮水是否困难</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>饮水是否安全</td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>是否通生产用电</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>是否通生活用电</td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>是否通广播电视</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>是否加入农民专业合作社</td>
				                <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>与村主干路距离（公里）</td>
				                 <td></td>
				                <td style='background: #F7F7F7;'>入户路类型</td>
				                 <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>危房户</td>
				                 <td></td>
				                <td style='background: #F7F7F7;'>危房级别</td>
				                 <td></td>
				            </tr>
				            <tr>
				                <td style='background: #F7F7F7;'>有无卫生厕所</td>
				                <td></td>
				                <td style='background: #F7F7F7;'>主要燃料类型</td>
				               <td></td>
				            </tr>
				      `;
				      lifeProduct.html(str);
                }else if(data.code==1009){
                	alert(data.message)
                }else if(data.code==4000){
					alert(data.message)
				}
            }
    })
}

//生产生活信息
  function  showLifeProductInfo(obj,data){
      obj.empty();
      var str=`
          <tr>
                <td style='background: #F7F7F7;'>耕地面积(亩)</td>
                <td>${data.data.AAC301}</td>
                <td style='background: #F7F7F7;'>有效灌溉面积（亩）</td>
                <td>${data.data.AAC302}</td>
            <tr>
                <td style='background: #F7F7F7;'>林地面积（亩）</td>
                <td>${data.data.AAC303}</td>
                <td style='background: #F7F7F7;'>退耕还林面积（亩）</td>
                <td>${data.data.AAC304}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>林果面积（亩）</td>
                 <td>${data.data.AAC305}</td>
                <td style='background: #F7F7F7;'>牧草地面积（亩）</td>
               <td>${data.data.AAC306}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>水面面积（亩）</td>
                <td>${data.data.AAC307}</td>
                <td style='background: #F7F7F7;'>住房面积（平方）</td>
                <td>${data.data.AAC317}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>饮水是否困难</td>
                <td>${data.data.AAC311}</td>
                <td style='background: #F7F7F7;'>饮水是否安全</td>
                <td>${data.data.AAC312}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>是否通生产用电</td>
                <td>${data.data.AAC308}</td>
                <td style='background: #F7F7F7;'>是否通生活用电</td>
                <td>${data.data.AAC313}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>是否通广播电视</td>
                <td>${data.data.AAC314}</td>
                <td style='background: #F7F7F7;'>是否加入农民专业合作社</td>
                <td>${data.data.AAC084}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>与村主干路距离（公里）</td>
                 <td>${data.data.AAC315}</td>
                <td style='background: #F7F7F7;'>入户路类型</td>
                 <td>${data.data.AAC316}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>危房户</td>
                 <td>${data.data.AAC318}</td>
                <td style='background: #F7F7F7;'>危房级别</td>
                 <td>${data.data.AAC322}</td>
            </tr>
            <tr>
                <td style='background: #F7F7F7;'>有无卫生厕所</td>
                <td>${data.data.AAC319}</td>
                <td style='background: #F7F7F7;'>主要燃料类型</td>
               <td>${data.data.AAC320}</td>
            </tr>
      `;
      obj.html(str);
      $("td").each(function(){
		    if( $(this).text() == 'null'||$(this).text() == 'undefined'){
		         $(this).text('');
		    }
	    })
  }

//上午务工信息请求
function getLastWorkInfo(lastWork,year) {              
        $.ajax({
            url: url + "table/pkh/detail/query/lnwginfo",
            data:{"aac001":code,"aar040":year},
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
                    showLastWorkInfo(lastWork,data);
                }else if(data.code==1005){
                    var str=` 
		            <tr>
		                <td>序号</td>
		                <td>姓名 </td>
		                <td>务工状况 </td>
		                <td>所在省: </td>
		                <td>所在市: </td>
		                <td>所在县:</td>
		                <td>所在乡:</td>
		                <td>上年务工时间（月）:</td>
		                <td>务工企业名称</td>
		            </tr>
		            `;	
		            lastWork.html(str)
                }else if(data.code==1009){
                	alert(data.message)
                }else if(data.code==4000){
					alert(data.message)
				}
            }
    })
}

//上年务工信息
  function  showLastWorkInfo(obj,data){
      obj.empty();
      var str=` 
            <tr>
                <td>序号</td>
                <td>姓名 </td>
                <td>务工状况 </td>
                <td>所在省: </td>
                <td>所在市: </td>
                <td>所在县:</td>
                <td>所在乡:</td>
                <td>上年务工时间（月）:</td>
                <td>务工企业名称</td>
            </tr>
            `;
      for(let i = 0; i < data.data.length; i++){
       str +=`
            <tr>
             <td>${i+1}</td>
             <td>${data.data[i].AAB002}</td>
             <td>${data.data[i].AAB011}</td>
             <td>${data.data[i].AAB025}</td>
             <td>${data.data[i].AAB026}</td>
             <td>${data.data[i].AAB027}</td>
             <td>${data.data[i].AAB028}</td>
             <td >${data.data[i].AAB012}</td>
             <td >${data.data[i].AAB029}</td>
            </tr>
      `;
      }
      obj.html(str);
      $("td").each(function(){
		    if( $(this).text() == 'null'||$(this).text() == 'undefined'){
		         $(this).text('');
		    }
	    })
  }

//搬迁
  function getMoveInfo(banqian,year) {
              
        $.ajax({
            url: url + "table/pkh/detail/query/relocate",
            data:{"aac001":code,"aar040":year},
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
                }else if(data.code==1005){
                    	var str=` 
			            <tr>
			                <td>是否搬迁户 </td>
			                <td>搬迁方式 </td>
			                <td>安置方式 </td>
			                <td>安置地点</td>
			                <td>搬迁可能存在的困难</td>
			            </tr>
			            `;
			            banqian.html(str)
                }else if(data.code==1009){
                	alert(data.message)
                }else if(data.code==4000){
					alert(data.message)
				}
            }
    })
  }

//搬迁
  function  showMoveInfo(obj,data){
      obj.empty();
      var str=` 
            <tr>
                <td>是否搬迁户 </td>
                <td>搬迁方式 </td>
                <td>安置方式 </td>
                <td>安置地点</td>
                <td>搬迁可能存在的困难</td>
            </tr>
            `;
       str +=`
            <tr>
             <td>${data.data.ACR077}</td>
             <td>${data.data.ACR075}</td>
             <td>${data.data.ACR078}</td>
             <td>${data.data.ACR079}</td>
             <td>${data.data.ACR081}</td>
            </tr>
      `;
      obj.html(str);
      $("td").each(function(){
        if( $(this).text() == 'null'||$(this).text() == 'undefined'){
             $(this).text('');
        }
      })
  }

//帮扶对接
function getHelpInfo(helper,year) {              
        $.ajax({
            url: url + "table/pkh/detail/query/help",
            data:{"aac001":code,"aar040":year},
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
                    showHelpInfo(helper,data);
                }else if(data.code==1005){
                    var	str = `<tr>
		                <td>序号</td>
		                <td>姓名</td>
		                <td>性别</td>
		                <td>派出单位</td>
		                <td>派出单位职务</td>
		                <td>联系电话</td>
		                <td>学历</td>               
		                <td>政治面貌</td>               
		                <td>证件号码</td>
		                <td>技术特长</td>
		                <td>开始时间</td>
		                <td>终止时间</td>
		            </tr>`
                    helper.html(str)
                }else if(data.code==1009){
                	alert(data.message)
                }else if(data.code==4000){
					alert(data.message)
				}
            }
    })
}

//帮扶结对
  function  showHelpInfo(obj,data){
      obj.empty();
      var str=``;
      str = `<tr>
                <td>序号</td>
                <td>姓名</td>
                <td>性别</td>
                <td>派出单位</td>
                <td>派出单位职务</td>
                <td>联系电话</td>
                <td>学历</td>               
                <td>政治面貌</td>               
                <td>证件号码</td>
                <td>技术特长</td>
                <td>开始时间</td>
                <td>终止时间</td>
            </tr>`
      for(let i = 0; i < data.data.length; i++) {
          str +=`<tr>
	             <td>${i+1}</td>
	             <td>${data.data[i].AAB002}</td>
	             <td>${data.data[i].AAB003}</td>
	             <td>${data.data[i].AAP001}</td>
	             <td>${data.data[i].AAK888}</td>
	             <td>${data.data[i].AAR012}</td>
	             <td>${data.data[i].AAK036}</td>
	             <td>${data.data[i].AAK033}</td>
	             <td>${data.data[i].AAB004}</td>
	             <td >${data.data[i].AAK037}</td>
	             <td >${data.data[i].AAR020}</td>
	             <td >${data.data[i].AAR021}</td>
            </tr>         
      `;
    }
      obj.html(str);
      $("td").each(function(){
		    if( $(this).text() == 'null'||$(this).text() == 'undefined'){
		         $(this).text('');
		    }
	    })
  }

getFour();
  //四书四照
  function getFour() {
              var four = $('#four')
                $.ajax({
                    url: url + "table/pkh/detail/query/fourbook",
                    data:{"aac001":code,"aar040":year},
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
                            showFour(four,data);
                        }else if(data.code==1005){
                    	var	str = `
						      <tr>
						            <td colspan="4" class="form-04-td" id="title2">四书信息</td>
						            </tr>
						            <tr>
						                <th>家庭情况真实性承诺书</th>
						                <th>自主创业意愿书</th>
						                <th>自愿就业承诺书</th>
						                <th>干部帮扶责任书</th>
						                <th></th>
						            </tr>
						            <tr>
						                <td><img src="" alt=""></td>
						                <td><img src="" alt=""></td>
						                <td><img src="" alt=""></td>
						                <td><img src="" alt=""></td>
						                <td></td>
						            </tr>
						            <tr>
						                <td colspan="4" class="form-04-td" id="title3">四照信息</td>
						            </tr>
						            <tr>
						                <th>大门口（工作人员与户主合影）</th>
						                <th>灶台（工作人员与户主合影）</th>
						                <th>厅堂（工作人员与户主合影）</th>
						                <th>卧室（工作人员与户主合影）</th>
						                <th>大门口（家庭合影）</th>
						            </tr>
						            <tr>
						                <td><img src="" alt=""></td>
						                <td><img src="" alt=""></td>
						                <td><img src="" alt=""></td>
						                <td><img src="" alt=""></td>
						                <td><img src="" alt=""></td>
						            </tr>           `
						  	four.html(str);
	                    }else if(data.code==1009){
	                    	alert(data.message)
	                    }else if(data.code==4000){
							alert(data.message)
						}
                    }
            })
  }

  function showFour(obj,data){
      obj.empty();
      var k = [];
      for(let i = 0; i < data.data.length; i++){
          k[i]=data.data[i].PHOTO_URL;
      }
      str = `
      <tr>
            <td colspan="4" class="form-04-td" id="title2">四书信息</td>
            </tr>
            <tr>
                <th>家庭情况真实性承诺书</th>
                <th>自主创业意愿书</th>
                <th>自愿就业承诺书</th>
                <th>干部帮扶责任书</th>
                <th></th>
            </tr>
            <tr>
                <td><img src="${k[0]}" alt=""></td>
                <td><img src="${k[1]}" alt=""></td>
                <td><img src="${k[2]}" alt=""></td>
                <td><img src="${k[3]}" alt=""></td>
                <td></td>
            </tr>
            <tr>
                <td colspan="4" class="form-04-td" id="title3">四照信息</td>
            </tr>
            <tr>
                <th>大门口（工作人员与户主合影）</th>
                <th>灶台（工作人员与户主合影）</th>
                <th>厅堂（工作人员与户主合影）</th>
                <th>卧室（工作人员与户主合影）</th>
                <th>大门口（家庭合影）</th>
            </tr>
            <tr>
                <td><img src="${k[4]}" alt=""></td>
                <td><img src="${k[5]}" alt=""></td>
                <td><img src="${k[6]}" alt=""></td>
                <td><img src="${k[7]}" alt=""></td>
                <td><img src="${k[8]}" alt=""></td>
            </tr>           `
  	obj.html(str);
  }

})
