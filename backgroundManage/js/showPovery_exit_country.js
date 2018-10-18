$(document).ready(function(){
let token=$.cookie("token");
  //var url="http://192.168.1.135:8080/"
  //全部县
   var allLifecounty=$("#allLifecounty");
   //达标县
   var isReachcounty=$("#isReachcounty");
   //未达标县
   var noReachcounty=$("#noReachcounty");
   var formInfos = $('#table')
   var page = $(".allPage");
   var p_year = 201808;
   $.ajax({
          url: url + "tpjg/xzbquery", 
          data:{"aar040": 201808,"aar001":610124000000},
          beforeSend:function(request){
                        request.setRequestHeader("Authorization",token);
                        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                    },
          method: "get",
          dataType: "json",
          success: function(data){
              if (data.code == 2000){
                 // console.log("ok");
                  showAllPoorInfo( 0,formInfos,data);
                      allLifecounty.html(data.NUMMAP.HOLDER_NUM);
                      isReachcounty.html(data.NUMMAP.OKHOLDER_NUM);
                      noReachcounty.html(data.NUMMAP.NOHOLDER_NUM)
	               //   showPage($(".searchPage"),data.data.total);
	                //  init_County();
	               //   page.html(Math.ceil(data.data.total/12));
	                //  $("#total").html("总数："+data.data.total);
              }else if(data.code==1005){
								alert(data.message)
							}else if(data.code==1009){
								alert(data.message)
							}else if(data.code==4000){
								alert(data.message)
							}              
         }     

})


function init_County(){
  var county = $("#country");
  county.val("周至县");
}

function showAllPoorInfo(index,obj,data){
    obj.empty();
    var str = `
     <tr>
          <td>序号</td>
          <td>贫困县</td>
          <td>贫困发生率（30分）</td>
          <td>人均可支配收入（20分）</td>
          <td>通沥青（水泥）路（10分）</td>
          <td>农村自来水普及率（10分）</td>
          <td>电力入户率（10分）</td>
          <td>安全住房（10分）</td>
          <td>农村医疗保险（10分）</td>
          <td>综合得分</td>
          <td>是否达标</td>
        </tr>`
        obj.html(str);

  var str1=`  
   <tr>
            <td>1</td>
            <td><a href="showDetailsPoveryCountries.html?value=${610124000000}&time=${201808}" style='color:#09c;background:none;'>周至县</a></td>
            <td>${data.data.aar014}</th>
            <td>${data.data.aae044}</th>  
            <td>${data.data.aae304}</td>
            <td>${data.data.aae314}</td>
            <td>${data.data.aae323}</td>
            <td>${data.data.aae331}</td>
            <td>${data.data.aae378}</td>
            <td>${data.data.score}</td>
            <td>${data.data.isReach}</td>
        </tr>`;
         obj.html(function (i, value) {
              return value + str1;
          });
}

$(".btn_orange1").on("click",function(){
      var country=$("#country").val();  //区
      var data= { "aar040":p_year,"aar001":country};
      // console.log(data_);
      $.ajax({
              url:url + "tpjg/xzbquery",
              type:"get",
              data:data,
              beforeSend:function(request){
                        request.setRequestHeader("Authorization",token);
                        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                    },
              dataType:"json",
              success:function (data) {
              if (data.code == 2000){
                          console.log("ok");
                          showAllPoorInfo(0, formInfos,data);
                          showPage($(".searchPage"),data.data.total);
                          page.html(Math.ceil(data.data.total/12));
                              $("#total").html("总数："+data.data.total);
                      }else if(data.code == 1009){
						var str=`<tr>
				            <td>序号</td>
				            <td>贫困县</td>
				            <td>贫困发生率（30分）</td>
				            <td>人均可支配收入（20分）</td>
				            <td>通沥青（水泥）路（10分）</td>
				            <td>农村自来水普及率（10分）</td>
				            <td>电力入户率（10分）</td>
				            <td>安全住房（10分）</td>
				            <td>农村医疗保险（10分）</td>
				            <td>综合得分</td>
				            <td>是否达标</td>
				          </tr>
						<tr><td colspan='11' style="font-size:30px;color:#767272;">查无数据</td></tr>`
						formInfos.html(str)
						$("#total").empty();
					    $(".allPage").empty();
					}else if(data.code==1005){
						alert(data.message)
					}else if(data.code==4000){
						alert(data.message)
					}
        },
        error:function () {
        }
    })
});


/*导出*/
$("body").on("click","#dataImport",function(){
$.ajax({
      url: url + "tpjg/export/exist/xzbquery",  
      data:{},
      beforeSend:function(request){
          request.setRequestHeader("Authorization",token);
          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
      },
      method: "get",
      dataType: "json",           
      success: function(data){
      if (data.code == 2000){
      var country=$("#country").val();  //区
      var data= { "aar040":p_year,"aar001":610124000000};

          /*主体内容渲染*/
       //   let formList=$("#formSubmit2");
         // let urls=url+"povStatExcel/export/perbasicstat";
          // console.log(urls,datas)
		/*去空*/
          function qukong(obj){
              for(var key in obj){
                  if(obj[key]==null || obj[key]=='' || obj[key]=="null"){
                      console.log(obj[key]);
                      delete obj[key];
                  }
              }
              return obj;
          }
          var newmap=qukong(data);
          console.log(newmap);
          /*拼接*/
          let strs="";
          function pinjie(obj){
              for(let key in obj){
                  strs+=key+"="+obj[key]+"&";
							}
							return strs;
						}
						let a=pinjie(newmap)
						let b=a.substring(0,a.length-1);
						console.log(b);
						let cc=url+"tpjg/export/xzbquery?"+b;
						console.log(cc);
				          window.location.href=cc;	
          
        		}else if(data.code==1005){
							alert(data.message)
						}else if(data.code==1009){
							alert(data.message)
						}else if(data.code==4000){
							alert(data.message)
						}               
        }        
    })      
  })

})

