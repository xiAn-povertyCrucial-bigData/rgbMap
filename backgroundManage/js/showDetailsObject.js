$(document).ready(function(){
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
       var  value2 = theRequest.value2;
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

        //村编号 和年份
         $(function(){
              var base = $('#base')
                $.ajax({
                    url: url + "zrc/detail/query/sta",
                    data:{"aad041": theRequest.value,"aar040": theRequest.time},
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
                           //console.log("ok1");
                            showBaseInfo( base,data);
                            getLifeInfo();
                         
                         //   showPage($(".searchPage"),data.data.total);
                        }
                        // console.log('111');
                    }
                
            })
              //  homeInfo();
  })

//初始化基础信息
  function showBaseInfo(obj,data){
      obj.empty();
      var str = `
     <caption>基础信息</caption>
          <tr>
              <td>自然村名称</td>
              <td colspan="3">${value2}</td>
              <td colspan="2">贫困户数</td>
              <td colspan="3">${data.data.AAD007}</td>
          </tr>
          <tr>
              <td>低保户数</td>
              <td colspan="3">${data.data.AAD008}</td>
              <td colspan="2">五保户数</td>
              <td colspan="3">${data.data.AAD009}</td>
          </tr>
          <tr>
              <td>自然村总户数</td>
              <td colspan="3">${data.data.AAD044}</td>
              <td colspan="2">自然村人口数</td>
              <td colspan="3">${data.data.AAD010}</td>
          </tr>
           <tr>
              <td>贫困人口数</td>
              <td colspan="3">${data.data.AAD011}</td>
              <td colspan="2">低保人口数</td>
              <td colspan="3">${data.data.AAD012}</td>
          </tr>
           <tr>
              <td>五保人口数</td>
              <td colspan="3">${data.data.AAD013}</td>
              <td colspan="2">少数民族人口数（人）：</td>
              <td colspan="3">${data.data.AAD014}</td>
          </tr>
           <tr>
              <td> 妇女人口数</td>
              <td colspan="3">${data.data.AAD015}</td>
              <td colspan="2">残疾人口数</td>
              <td colspan="3">${data.data.AAD016}</td>
          </tr>
           <tr>
              <td>劳动力人口数</td>
              <td colspan="3">${data.data.AAD017}</td>
              <td colspan="2">外出务工人口数</td>
              <td colspan="3">${data.data.AAD018}</td>
          </tr>
           
         `;
          obj.html(str);
  }
  
//生产生活条件 信息
    function getLifeInfo(){
        var life= $('#life');
        $.ajax({
            url: url + "zrc/detail/query/file",
            data:{"aad041": theRequest.value,"aar040": theRequest.time},
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
                    //onsole.log("ok1");
                    showLifeInfo(life,data);
                    //   showPage($(".searchPage"),data.data.total);
                }
                // console.log('111');
            }
        
    })
  }

  function showLifeInfo(obj,data){
       obj.empty();
       var k0='',k1='',k2='',k3='';
       if(data.data.AAC038=='1'){
              k0="是";
       }else if(data.data.AAC038=='0'){
           k0="否";
       }

        if(data.data.AAC313=='1'){
              k1="是";
       }else if(data.data.AAC313=='0'){
           k1="否";
       }

        if(data.data.AAD326=='1'){
              k2="是";
       }else if(data.data.AAD326=='0'){
           k2="否";
       }

        if(data.data.AAD416=='1'){
              k3="是";
       }else if(data.data.AAD416=='0'){
           k3="否";
       }
       var str =` 
       <caption>生产生活条件</caption>
          
          <tr>
              <td>到行政村距离（公里）：</td>
              <td>${data.data.AAD325}</td>
              <td>是否通生活用电：</td>
              <td>${k1}</td>
          </tr>
          <tr>
              <td>到行政村是否通沥青（水泥）路：</td>
              <td>${k2}</td>
              <td>是否通宽带：</td>
              <td>${k3}</td>
          </tr>
          <tr>
              <td>是否通生产用电:</td>
              <td>${k0}</td>
          </tr>            
          `;
     
         obj.html(str);
  }


// //家庭收入信息请求
//     function getIncomeInfo(){
//         var homeIncome = $('#homeIncome');
//         $.ajax({
//             url: url + "pkh/detail/jtsrinfo",
//             data:{"aac001": theRequest.value,"aar040": theRequest.time},
//             method: "post",
//             dataType: "json",
//             json: "callback",
//             jsonpCallback: 'jsonpCallback',
//             success: function(data){
//                 if (data.code == 2000){
//                     //onsole.log("ok1");
//                     showIncomeInfo(homeIncome,data);
//                     //   showPage($(".searchPage"),data.data.total);
//                 }
//                 // console.log('111');
//             }
        
//     })
//   }
//    function  showIncomeInfo(obj,data){
//       obj.empty();
//       var str=`
//             <tr>
//                 <td>工资性收入</td>
//                 <td>${data.data.AAC073}</td>
//                 <td>生产经营性收入</td>
//                 <td>${data.data.AAC071}</td>
//             </tr>
//             <tr>
//                 <td>财产性收入</td>
//                 <td>${data.data.AAC072}</td>
//                 <td>计划生育金</td>
//                 <td>${data.data.AAC076}</td>
//             </tr>
//             <tr>
//                 <td>低保金</td>
//                 <td>${data.data.AAC077}</td>
//                 <td>五保金</td>
//                 <td>${data.data.AAC086}</td>
//             </tr>
//             <tr>
//                 <td>养老保险金</td>
//                 <td>${data.data.AAC087}</td>
//                 <td>生态补偿金</td>
//                 <td>${data.data.AAC073}</td>
//             </tr>
//             <tr>
//                 <td>其他转移性收入</td>
//                 <td>0.0</td>
//                 <td>转移性收入</td>
//                 <td>0.0</td>
//             </tr>
//             <tr>
//                 <td>生产性支出</td>
//                 <td>0.0</td>
//                 <td>年收入</td>
//                 <td>0.0</td>
//             </tr>
//             <tr>
//                 <td>纯收入</td>
//                 <td>0.0</td>
//                 <td>人均纯收入</td>
//                 <td>0.0</td>
//             </tr>           
//       `;
//       obj.html(str);

//   }



// ////生产生活信息请求
//   function getLifeProductInfo() {
//               var lifeProduct = $('#lifeProduct')
//                 $.ajax({
//                     url: url + "pkh/detail/life",
//                     data:{"aac001": theRequest.value,"aar040": theRequest.time},
//                     method: "post",
//                     dataType: "json",
//                     json: "callback",
//                     jsonpCallback: 'jsonpCallback',
//                     success: function(data){
//                         if (data.code == 2000){
//                             console.log("ok");
//                             showLifeProductInfo( lifeProduct,data);
//                            // showPage($(".searchPage"),data.data.total);
//                         }
//                         // console.log('111');
//                     }
                
//             })
//   }

// //生产生活信息
//   function  showLifeProductInfo(obj,data){
//       obj.empty();
//       var str=`
//           <tr>
//                 <td>耕地面积(亩)</td>
//                 <td>${data.data.AAC301}</td>
//                 <td>有效灌溉面积（亩）</td>
//                 <td>${data.data.AAC302}</td>
//             <tr>
//                 <td>林地面积（亩）</td>
//                 <td>${data.data.AAC303}</td>
//                 <td>退耕还林面积（亩）</td>
//                 <td>${data.data.AAC304}</td>
//                      </tr>
//             <tr>
//                 <td>林果面积（亩）</td>
//                  <td>${data.data.AAC305}</td>
//                 <td>牧草地面积（亩）</td>
//                <td>${data.data.AAC306}</td>
//                  </tr>
//             <tr>
//                 <td>水面面积（亩）</td>
//                 <td>${data.data.AAC307}</td>
//                 <td>住房面积（亩）</td>
//                 <td>${data.data.AAC317}</td>
//             </tr>
    
//             <tr>
//                 <td>饮水是否困难♦</td>
//                 <td>${data.data.AAC311}</td>
//                 <td>饮水是否安全♦</td>
//                 <td>${data.data.AAC312}</td>
//             </tr>
//             <tr>
//                 <td>是否通生产用电</td>
//                 <td>${data.data.AAC308}</td>
//                 <td>是否通生活用电</td>
//                 <td>${data.data.AAC313}</td>
//             </tr>
//             <tr>
//                 <td>是否通广播电视</td>
//                 <td>${data.data.AAC314}</td>
//                 <td>是否加入农民专业合作社</td>
//                 <td>${data.data.AAC084}</td>

//             </tr>
//             <tr>
//                 <td>与村主干路距离（公里）</td>
//                  <td>${data.data.AAC315}</td>
//                 <td>入户路类型</td>
//                  <td>${data.data.AAC316}</td>
           
//             </tr>
//             <tr>
//                 <td>危房户♦</td>
//                  <td>${data.data.AAC318}</td>
//                 <td>危房级别</td>
//                  <td>${data.data.AAC322}</td>
//             </tr>
//             <tr>
//                 <td>有无卫生厕所</td>
//                 <td>${data.data.AAC319}</td>
//                 <td>主要燃料类型</td>
//                <td>${data.data.AAC320}</td>
//             </tr>
//       `;
//       obj.html(str);

//   }

  

})
