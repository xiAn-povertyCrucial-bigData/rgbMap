$(function(){
	
let token=$.cookie("token");	 
 //帮扶单位添加
 var k = [];
 var i = 0;
 
var city = $("#county");
var area = $("#township");
var town =$("#village");   
var str = `<option value="">县（区）</option>`;
city.html(str);
var str1 = `<option value="">乡（镇）</option>`;
area.html(str1);
var str2 = `<option value="">村</option>`;
town.html(str2);

//加载县

        $.ajax({
            url: url + "district/county", 
            data:{},
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
                 
                    showCountyInfo(city,data);
                 
                }           
            }       
    	})

function showCountyInfo(obj,data){
     obj.empty();
     var str = `<option value="">县（区）</option>`;
     var string = "";
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
     }
     obj.html(str);
}

$("#county").change(function(){
    var opt = $("#county");
    var opt1 = $("#township");
      
         $.ajax({
            url: url + "district/town", 
            data:{"county":opt.val()},
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
                    showTownInfo(opt1,data);
                    
                }
                // console.log('111');
            }
        
    })
});

function showTownInfo(obj,data){
        obj.empty();
     var str = `<option value="">乡（镇）</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
     // console.log(obj.val());
     }
}


$("#township").change(function(){
    var town = $("#township").val();
  
    var vill = $("#village");
         $.ajax({
            url: url + "district/village", 
            data:{"town": town},
            method: "get",
            dataType: "json",
            beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
            success: function(data){
                if (data.code == 2000){
                
                    showVillageInfo(vill,data);
                   // showPage($(".searchPage"),data.data.total);
                   // init_County();
                }
                // console.log('111');
            }
        
    })
});
function showVillageInfo(obj,data){
       obj.empty();
     var str = `<option value="">村</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
      obj.html(str);
    
     }
}


 $("#add").click(function(){
 	      
    	$(".xinxi").each(function(){
		  //k[i] = $(this).eq(i).val();
		  i++;
		  k.push($(this).val())
		  
		})
    $.ajax({
        url:url+"fpzt/addUnit",        
        data:{'AAP001':k[0],'AAR013':k[1],'AAP004':k[3],'AAP051':k[2],'AAR011':k[4],
        'AAR012':k[5],'AAR020':k[7],'AAR021':k[8],'AAD001':k[6],'AAR100':k[9]},
        beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              },
        type:"get", 
        dataType:"json",
        success: function(data){
            if (data.code == 2000){
            alert ("添加成功");
            }else if(data.code==1005){
		alert(data.message)
	    }else if(data.code==1009){
		alert(data.message)
	    }else if(data.code==4000){
		alert(data.message)
            }else{
            	alert("添加失败");
            }
        }
    
    })
    
})	
	
	
	
})