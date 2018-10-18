$(function(){
	
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
	console.log(theRequest.value);
	 
 //帮扶单位详情

 	var table1=$('#basicInfo');
	
 	$.ajax({
 		
            url:url + "fpzt/bfdw/detail",
            type:"get",
            data:{"aap110":theRequest.value},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              },
            dataType:"json",
            success:function (data) {
            if (data.code == 2000){
                   
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
          <caption style="margin-bottom: 30px;">帮扶单位详细信息</caption>
          <tr>
              <td>单位名称</td>
              <td colspan="3">${data.data.aap001}</td>
          </tr>
          <tr>
          	  <td>帮扶单位类型</td>
              <td>${data.data.aap051}</td>             
              <td>联系电话</td>
              <td>${data.data.aap005}</td>
          </tr>
          <tr>
              <td>联系人姓名</td>
              <td>${data.data.aar011}</td>
              <td>联系地址</td>
              <td>${data.data.aar013}</td>
          </tr>
          <tr>
              <td>邮政编码</td>
              <td>${data.data.aar014}</td>
              <td>电子邮箱</td>
              <td>${data.data.aar015}</td>
          </tr>
        `;
          $('#basicInfo').html(str);
          
          
          $("td").each(function(){		    
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		})
          

 }
	
	
	
	
})