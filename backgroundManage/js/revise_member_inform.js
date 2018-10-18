$(function(){
	
	let token=$.cookie("token");
	var val1=null;
	var val2=null;
	var val3=null;
	var theRequest = new Object();
    var url1=window.location.search; //获取url中"?"符后的字串
        if(url1.indexOf("?")!=-1) {
            var str = url1.substr(1);
            strs = str.split("&");
            for (var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
            }
        }	
	console.log(theRequest.value)
	
	
	 
 //帮扶责任人详情
 	var table1=$('#basicInfo');
				
 	$.ajax({
            url:url + "fpzt/bfzrr/detail",
            type:"get",
            data:{"aak110":theRequest.value},
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
              <td>姓名</td>
              <td><input type="text" placeholder="" class="xinxi" style='border:none'/></td>
              <td>性别</td>
              <td>
              		<select name="" id="xingbie" class="xinxi">   
              			<option value="">请选择</option>
                        <option value="1">男</option>
                        <option value="2">女</option>
                        <option value="9">未说明性别</option>                                                
                    </select>
              </td>
          </tr>
          <tr>
          	  <td>证件号码</td>
              <td><input type="text" placeholder="只能输入数字" class="xinxi" style='border:none' onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"/></td>
              <td>单位名称</td>
              <td><input type="text" placeholder="" class="xinxi" style='border:none'/></td>   
              
          </tr>
          <tr>
              <td>学历</td>
              <td>
              		<select name="" id="xueli" class="xinxi">  
              		    <option value="">请选择</option>
                        <option value="10">研究生及以上</option>
                        <option value="11">博士研究生</option>
                        <option value="14">硕士研究生</option>                      
                        <option value="20">大学本科</option>                      
                        <option value="30">大学专科</option>                      
                        <option value="40">中专技校</option>   
                        <option value="41">中等专科</option>    
                        <option value="44">职业高中</option>   
                        <option value="47">技工学校</option>   
                        <option value="60">普通高中</option>   
                        <option value="70">初中</option>   
                        <option value="80">小学</option>   
                        <option value="90">其他</option>   
                    </select>
              </td>
              <td>技术特长</td>
              <td>
              		<select name="" id="jishu" class="xinxi">   
              		    <option value="">请选择</option>
                        <option value="01">种植</option>
                        <option value="02">养殖</option>
                        <option value="03">林果</option>                      
                        <option value="04">服务</option>                                             
                    </select>
              </td>
          </tr>
          <tr>
          	  
              <td>联系电话</td>
              <td><input type="text" placeholder="只能输入数字" class="xinxi" style='border:none' onkeyup="(this.v=function(){this.value=this.value.replace(/[^0-9-]+/,'');}).call(this)" onblur="this.v();"/></td>  
              <td>联系地址</td>
              <td><input type="text" placeholder="" class="xinxi" style='border:none'/></td>
          </tr>      
        `;
        
        	switch (data.data.aab003){
        		case '男':
        			val1=1;
        			break;
        		case '女':
        			val1=2;
        			break;
        		case '未说明':
        			val1=9;
        			break;  
        		
        		default:
        			break;
        	}

        	switch (data.data.aak036){
        		case '研究生及以上':
        			val2=10;
        			break;
        		case '博士研究生':
        			val2=11;
        			break;
        		case '硕士研究生':
        			val2=14;
        			break;
        		case '大学本科':
        			val2=20;
        			break;
        		case '大学专科':
        			val2=30;
        			break;
        		case '中专技校':
        			val2=40;
        			break;
        		case '中等专科':
        			val2=41;
        			break;
        		case '职业高中':
        			val2=44;
        			break;
        		case '技工学校':
        			val2=47;
        			break;
        		case '普通高中':
        			val2=60;
        			break;
        		case '初中':
        			val2=70;
        			break;
        		case '小学':
        			val2=80;
        			break;
        		case '其他':
        			val2=90;
        			break;
        		default:
        			break;
        	}
        	switch (data.data.aak037){
        		case '种植':
        			val3='01';
        			break;
        		case '养殖':
        			val3='02';
        			break;
        		case '林果':
        			val3='03';
        			break;
        		case '服务':
        			val3='04';
        			break;        		
        		default:
        			break;
        	}
        	
        
            $('#basicInfo').html(str);         	
            $('.xinxi').eq(0).val(data.data.aab002)
			$('.xinxi').eq(1).val(val1)
			$('.xinxi').eq(2).val(data.data.aab004)
			$('.xinxi').eq(3).val(data.data.aap001)
			$('.xinxi').eq(4).val(val2)
			$('.xinxi').eq(5).val(val3)
			$('.xinxi').eq(6).val(data.data.aar012)
			$('.xinxi').eq(7).val(data.data.aar013)
          
          $("td").each(function(){		    
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		})

 }
	
//修改帮扶责任人
	var k = [];
 	var i = 0;

 $("#add").click(function(){
 	      
    	$(".xinxi").each(function(){

		  i++;
		  k.push($(this).val())
		  
		})
	console.log(k)
    $.ajax({
        url:url+"fpzt/modPeople",       
        data:{'aak110':theRequest.value,'aab002':k[0],'aab003':k[1],'aab004':k[2],
        'aap001':k[3],'aak036':k[4],'aak037':k[5],'aar012':k[6],'aar013':k[7]},
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