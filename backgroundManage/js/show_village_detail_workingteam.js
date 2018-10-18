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
	//console.log(theRequest.value)
 	var table=$('#basicInfo');
 	$.ajax({		
            url:url + "fpzt/zcgzd/detail",
            type:"get",
            data:{"aak011":theRequest.value},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              },
            dataType:"json",
            success:function (data) {
            if (data.code == 2000){
                    showxiangqing(0,table,data); 
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
	function showxiangqing(index,table,data){
      table.empty();
      var str = `
          <caption style="margin-bottom: 30px;">行政区划:<span id="quhua">${theRequest.value1}</span></caption>
          <tr>
                <td>序号</td>
                <td>姓名</td>
                <td>派出单位</td>
                <td>派出单位职务</td>
                <td>联系电话</td>
                <td>第一书记标志</td>
                <td>队长标志</td>
                <td>包村干部标志</td>
                <td>副队长标志</td>
                <td>队员标志</td>
                <td>性别</td>
                <td>证件号码</td>
                <td>学历</td>
                <td>政治面貌</td>                
                <td>技术特长</td>
                <td>开始时间</td>
                <td>结束时间</td>

		<td>操 作</td>
            </tr>
        `;        

		for(let i = 0; i < data.data.length; i++ ){
	     str +=`  
	     <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data[i].AAB002}</td>
              <td>${data.data[i].AAP001}</td>
              <td>${data.data[i].AAK888}</td>
              <td>${data.data[i].AAR012}</td>`
              if (data.data[i].AAK032=='0') {
    		  	str+=`	<td>否</td>`
    		  } else if(data.data[i].AAK032=='1'){
    		  	str+=`	<td>是</td>`
    		  }else{
    		  	str+=`	<td></td>`
    		  }
              if (data.data[i].AAK031=='0') {
    		  	str+=`	<td>否</td>`
    		  } else if(data.data[i].AAK031=='1'){
    		  	str+=`	<td>是</td>`
    		  }else{
    		  	str+=`	<td></td>`
    		  }
              if (data.data[i].AAK777=='0') {
    		  	str+=`	<td>否</td>`
    		  } else if(data.data[i].AAK777=='1'){
    		  	str+=`	<td>是</td>`
    		  }else{
    		  	str+=`	<td></td>`
    		  }
              if (data.data[i].AAK666=='0') {
    		  	str+=`	<td>否</td>`
    		  } else if(data.data[i].AAK666=='1'){
    		  	str+=`	<td>是</td>`
    		  }else{
    		  	str+=`	<td></td>`
    		  }
              if (data.data[i].AAK039=='0') {
    		  	str+=`	<td>否</td>`
    		  } else if(data.data[i].AAK039=='1'){
    		  	str+=`	<td>是</td>`
    		  }else{
    		  	str+=`	<td></td>`
    		  }
				if (data.data[i].AAB003=='1') {
		    	
			  		str+=`	<td>男</td>`
		    	
			  	} else if(data.data[i].AAB003=='2'){
		    	
			  		str+=`	<td>女</td>`
		    
				  }else if(data.data[i].AAB003=='9'){
		    		 
		 			str+=`	<td>未知</td>`
		    	
			 	 }else{
		    		
		  			str+=`	<td></td>`
		   
		 		  }
          
        str+=`<td>${data.data[i].AAB004}</td>   
              <td>${data.data[i].AAK036}</td>   
              <td>${data.data[i].AAK033}</td>               
              <td>${data.data[i].AAK037}</td> 
              <td>${data.data[i].AAR020}</td> 
              <td>${data.data[i].AAR021}</td> 
              <td>
                   <a href="revise_village_working_team.html?value=${data.data[i].AAK110}&value1=${data.data[i].AAD001}&AAD090=${data.data[i].AAD090}" class='xiugai'>修改</a>
                   <a href="#"  aad090='${data.data[i].AAD090}' class='shanchu'>删除</a>
              </td>
          </tr>`;
          
          //console.log(data.data[i].AAD090)
	    }
		$('#basicInfo').html(str);
		  	$("td").each(function(){		    
			    if( $(this).text() == 'null'){
			         $(this).text('');
			    }
			})
 	}	
	//删除驻村工作队		
	var tt;
	$('body').on('click','.shanchu',function(){	
		var aad090=$(this).attr("aad090");		
	    tt=$(this);
		var sub;
		sub={"aad001":aad090,'aak011':111};
		del();
		function del(){
			if( confirm("确认删除吗?")){				
				tt.parent('td').parent('tr').remove();

		   	$.ajax({
	            url:url+"fpzt/zcgzd/delete",
	            method: "get",
		        dataType: "json",
		        json: "callback",
		        jsonpCallback: 'jsonpCallback',            
	            data:sub,
	            beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	          	},           
	            success:function(data){
			    if (data.code == 2000){
			            alert ("删除成功");		            
		            }else if(data.code==1005){
				alert(data.message)
			    }else if(data.code==1009){
				alert(data.message)
			    }else if(data.code==4000){
				alert(data.message)
			    }else{
		            	alert("删除失败");
		            }	
	            }
	        })
	   	}else
				return false;			
		}
	})

})