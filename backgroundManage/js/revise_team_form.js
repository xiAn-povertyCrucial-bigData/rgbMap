$(function(){
	let token=$.cookie("token");
	var val1=null;
	var theRequest = new Object();
    var url1=window.location.search; //获取url中"?"符后的字串
        if(url1.indexOf("?")!=-1) {
            var str = url1.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }	
	//console.log(theRequest.value);
	 
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
                   //console.log("ok");
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
              <td colspan="3"><input type="text" placeholder="请输入单位名称" class="xinxi"/></td>
          </tr>
          <tr>
          	  <td>帮扶单位类型</td>
              <td>
              		<select name="" id="leixing" class="xinxi">                                               
                        <option value="10">国家机关</option>
                        <option value="20">社会团体</option>
                        <option value="30">高等院校</option>                      
                        <option value="40">国有企业</option>                      
                        <option value="50">东部对口帮扶省市</option>                      
                        <option value="60">定点机构</option>   
                        <option value="70">事业单位</option>    
                        <option value="80">村民自治组织</option>   
                    </select>
              </td>
              
              <td>联系电话</td>
              <td><input type="text" placeholder="只能输入数字" class="xinxi"  onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"/></td>
          </tr>
          <tr>
              <td>联系人姓名</td>
              <td><input type="text" placeholder="" class="xinxi"/></td>
              <td>联系地址</td>
              <td><input type="text" placeholder="" class="xinxi"/></td>
          </tr>
          <tr>
              <td>邮政编码</td>
              <td><input type="text" placeholder="只能输入数字" class="xinxi"  onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"/></td>
              <td>电子邮箱</td>
              <td><input type="email" name='user_email' placeholder="请输入正确邮箱格式" class="xinxi" id='email'/></td>
          </tr>
        `;
        	        	
        	switch (data.data.aap051){
        		case '国家机关':
        			val1=10;
        			break;
        		case '社会团体':
        			val1=20;
        			break;
        		case '高等院校':
        			val1=30;
        			break;
        		case '国有企业':
        			val1=40;
        			break;
        		case '东部对口帮扶省市':
        			val1=50;
        			break;
        		case '定点机构':
        			val1=60;
        			break;
        		case '事业单位':
        			val1=70;
        			break;
        		case '村民自治组织':
        			val1=80;
        			break;
        		
        		default:
        			break;
        	}
        	
            $('#basicInfo').html(str);
            $('.xinxi').eq(0).val(data.data.aap001)
			$('.xinxi').eq(1).val(val1)
			$('.xinxi').eq(2).val(data.data.aap005)
			$('.xinxi').eq(3).val(data.data.aar011)
			$('.xinxi').eq(4).val(data.data.aar013)
			$('.xinxi').eq(5).val(data.data.aar014)
			$('.xinxi').eq(6).val(data.data.aar015)

          $("td").each(function(){		    
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		})

		//验证邮箱
	var email=document.getElementById("email").value;	
	var reg=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/gi;		   
	$('#email').blur(function(){
		if(!reg.test(email)){
	        console.log("电子邮件格式错误");
	        
	        $('#email').focus();
	        return false;
		}else{
			$('#email').val($('#email').val());
		}
	})
	    
	
 }
//修改帮扶单位
	var k = [];
 	var i = 0;

 $("#add").click(function(){
 	      
    	$(".xinxi").each(function(){

		  i++;
		  k.push($(this).val())
		  
		})

	

	//console.log(k)
    $.ajax({
        url:url+"fpzt/modUnit",       
        data:{'aap110':theRequest.value,'aap051':k[1],'aap001':k[0],'aap005':k[2],
        'aar011':k[3],'aar013':k[4],'aar014':k[5],'aar015':k[6]},
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
	
	
	
})