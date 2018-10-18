$(function(){
	
	let token=$.cookie("token");
	var theRequest = new Object();
    var url1=window.location.search; //获取url中"?"符后的字串
    console.log(url1);
        if(url1.indexOf("?")!=-1) {
            var str = url1.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }
 //帮扶单位详情
 	var table1=$('#basicInfo');
 	$.ajax({
            url:url + "/fpzt/modDetail/detail",
            type:"get",
            data:{"aak110":theRequest.aak110,"aac001":theRequest.aac001,"aac080":theRequest.aac080},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            dataType:"json",
            success:function (data) {
            if (data.code == 2000){
                       console.log("ok");
                        showxiangqing(table1,data); 
                    }else if(data.code==1005){
			alert(data.message)
		}else if(data.code==1009){
			alert(data.message)
		}else if(data.code==4000){
			alert(data.message)
		}
            },
            error:function () {}
    })
	function showxiangqing(table1,data){
 	    table1.empty();
      var str = `
          <caption style="margin-bottom: 30px;">帮扶责任人详细信息</caption>
          <tr>
              <td>帮扶责任人姓名</td>
              <td>${data.data.aab002}</td>                  
              <td>帮扶责任人性别</td>
              <td>${data.data.aab003}</td>
          </tr>
          <tr>
          	  <td>派出单位</td>
              <td>${data.data.aap001}</td>
              <td>派出单位职务</td>
              <td>${data.data.aak888}</td>   
          </tr>
          <tr>
              <td>证件号码</td>
              <td>${data.data.aab004}</td>  
              <td>联系电话</td>
              <td>${data.data.aar012}</td>
          </tr>
          <tr>
              <td>政治面貌</td>
              <td>${data.data.aak033}</td>  
              <td>学历</td>
              <td>${data.data.aak036}</td>
          </tr>
          <tr>
              <td>技术特长</td>
              <td>${data.data.aak037}</td>  
              <td>帮扶贫困户户主姓名</td>
              <td>${data.data.aac029}</td>
          </tr>
          <tr>
              <td>开始时间</td>
              <td>${data.data.aar020}</td>  
              <td>结束时间</td>
              <td>${data.data.aar021}</td>
          </tr>      
        `;
          $('#basicInfo').html(str);
			  $("td").each(function(){		    
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		})
    }
});