$(document).ready(function(){

    var p_qv = $("#p_qv");
    var shuxing = $("#shuxing");
    var niandu = $("#niandu");
    var daolu = $("#daolu");
 	let token=$.cookie("token"); 
 	var jb=[];
 	var i=0;
 	var p_shi=$("#p_shi");  //xianshi
    var p_qv=$("#p_qv");  //县区
    $("body").on("blur","#table1 input",function(){
		
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
    $("body").on("focus","#table1 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
 
 
//加载西安市
init_Shi();
    function init_Shi(){
        var p_shi=$("#p_shi");
        $.ajax({
            url: url + "district/city",
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
                    showShiInfo(p_shi,data);
                    init_County()
                }
            }
        })
    }
    function showShiInfo(obj,data){
        obj.empty();
        var str = `<option value="">全部</option>`;
        var string = "";
        let arr=[];
        for(let i = 0; i < data.data.length; i++){
            str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
            let obj={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
            arr.push(obj);
        }
        obj.html(str);
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);
        if(aa.aar008=="610100000000"){
	        datas={'aar040':201808}
	        console.log(datas)
	    }else if(aa.aar008=="619900000000"){
	    	datas={'aar040':201808,"aae001":619900000000}
	        console.log(datas)
	    }else{
	        datas={'aar040':201808,"aae001":$('#p_qv').val()}
	        console.log(datas)
	    }
        if(aa.aar008==619900000000){
        	$("#p_shi").empty().append("<option value='619900000000'>西咸新区</option>").attr("disabled","disabled");
        }
    }
$("#p_shi").change(function(){
    var opt=$("#p_shi");
    var opt1 = $("#p_qv");
         $.ajax({
            url: url + "district/county", 
            data:{"aar001":opt.val()},
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
                     init_County();
                }
            }
    })
});
//加载区县
    function init_County(){
    	var p_shi=$("#p_shi");
        var p_qv=$("#p_qv");
        $.ajax({
            url: url + "district/county",
            data:{"aar001":p_shi.val()},
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
                    showCountyInfo(p_qv,data);
                }
            }
        })
    }
    function showCountyInfo(obj,data){
        obj.empty();
        var str = `<option value="">县（区）</option>`;
        var string = "";
        let arr=[];
        for(let i = 0; i < data.data.length; i++){
            str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
            let obj={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
            arr.push(obj);
        }
        obj.html(str);
        let tokenCon=$.cookie("loginMessage");
        let aa=JSON.parse(tokenCon);
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                $("#p_qv").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            }
        }
		if(aa.aar008=="610100000000"){
	        datas={'aar040':201808}
	        console.log(datas)
	    }else if(aa.aar008=="619900000000"){
	    	datas={'aar040':201808,"aae001":619900000000}
	        console.log(datas)
	    }else{
	        datas={'aar040':201808,"aae001":$('#p_qv').val()}
	        console.log(datas)
	    }

    } 
 
 
$("#add1").click(function(){
	$("#table1 input").each(function(){
	  i++;
	  jb.push($(this).val())	
	  console.log(jb)
	})
    $.ajax({
        url:url+"addfpdx/addCnty/query",       
        data:{'aae001':p_qv.val(),'aae002':shuxing.val(),'aac016':niandu .val(),
        'aae003':jb[0],'aae006':jb[1],'aae007':jb[2],'aae008':jb[3]},
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
//人口信息
var ren = [];
var i = 0;
$("body").on("blur","#table2 input",function(){		
	if(isNaN($(this).val())||parseFloat($(this).val())<0){
        $(this).val("(*请输入有效值)")
        $(this).css("color","red");
    }
})
$("body").on("focus","#table2 input",function(){
    if($(this).val()=="(*请输入有效值)"){
        $(this).val("");
        $(this).css("color","#333333")
    }
})
$("#add2").click(function(){	      
	$("#table2 input").each(function(){
	  i++;
	  ren.push($(this).val())		  
	})
	
    $.ajax({
        url:url+"addfpdx/addPeople/query",       
        data:{'aae001':p_qv.val(),'aae010':ren[0],'aae014':ren[1],'aae012':ren[2],
        'aae017':ren[3],'aea003':ren[4],'aea004':ren[5],'aae013':ren[6],'aae018':ren[7],
        'aea005':ren[8],'aea006':ren[9],'aae021':ren[10],'aae022':ren[11],'aea001':ren[12],
        'aea002':ren[13],'aae011':ren[14],'aae015':ren[15],'aae019':ren[16],'aae016':ren[17],'aae051':ren[18]},
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

//十项重点添加	
var shi = [];
var i = 0;	
 $("body").on("blur","#table3 input",function(){		
	if(isNaN($(this).val())||parseFloat($(this).val())<0){
        $(this).val("(*请输入有效值)")
        $(this).css("color","red");
        //$(this).focus();
    }
})
$("body").on("focus","#table3 input",function(){
    if($(this).val()=="(*请输入有效值)"){
        $(this).val("");
        $(this).css("color","#333333")
    }
})
$("#add3").click(function(){
 	
	$(" #table3 input").each(function(){					
	  i++;
	  shi.push($(this).val())	 	  
	})

$.ajax({
    url:url+"addfpdx/addTen/query",       
    data:{'aae001':p_qv.val(),'aae301':daolu.val(),'aae302':shi[0],'aae304':shi[1],'aae303':shi[2],
    'aae305':shi[3],'aae306':shi[4],'aae307':shi[5],'aae308':shi[6],'aae309':shi[7],'aae311':shi[8],
    'aae312':shi[9],'aae313':shi[10],'aae314':shi[11],'aae315':shi[12],'aae316':shi[13],
    'aae317':shi[14],'aae318':shi[15],'aae319':shi[16],'aae321':shi[17],'aae322':shi[18],
    'aae323':shi[19],'aae324':shi[20],'aae325':shi[21],'aae326':shi[22],'aae327':shi[23],
    'aae328':shi[24],'aae331':shi[25],'aae332':shi[26],'aae333':shi[27],'aae334':shi[28],
    'aae335':shi[29],'aae341':shi[30],'aae342':shi[31],'aae343':shi[32],'aae344':shi[33],
    'aae345':shi[34],'aae346':shi[35],'aae347':shi[36],'aae348':shi[37],'aae349':shi[38],
    'aae350':shi[39],'aae351':shi[40],'aae352':shi[41],'aae353':shi[42],'aae354':shi[43],
    'aae355':shi[44],'aae356':shi[45],'aae357':shi[46],'aae358':shi[47],'aae361':shi[48],
    'aae362':shi[49],'aae363':shi[50],'aae364':shi[51],'aae366':shi[52],'aae367':shi[53],
    'aae368':shi[54],'aae369':shi[55],'aae370':shi[56],'aae371':shi[57],'aae372':shi[58],
    'aae374':shi[59],'aae375':shi[60],'aae376':shi[61],'aae377':shi[62],'aae378':shi[63],
    'aae379':shi[64],'aae380':shi[65],'aae381':shi[66],'aae382':shi[67],'aae383':shi[68],
    'aae384':shi[69],'aae385':shi[70],'aae386':shi[71],'aae387':shi[72],'aae388':shi[73],
    'aae389':shi[74],'aae390':shi[75],'aae392':shi[76],'aae393':shi[77],'aae394':shi[78],
    'aae395':shi[79],'aae396':shi[80],'aae397':shi[81],'aae398':shi[82],'aae399':shi[83],
    'aae400':shi[84],'aae401':shi[85],'aae403':shi[86],'aae404':shi[87],'aae405':shi[88],'aae406':shi[89]},
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
 
//添加财政信息
var cz = [];
var i = 0;
 $("body").on("blur","#table4 input",function(){
		
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
    $("body").on("focus","#table4 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })		
	$("#add4").click(function(){
	 	      
	    	$("#table4 input").each(function(){			 
			  i++;
			  cz.push($(this).val())			  
			})
		
	    $.ajax({
	        url:url+"addfpdx/addLocalInfo/query",       
	        data:{'aae001':p_qv.val(),'aae036':cz[0],'aae037':cz[1],'aae038':cz[2],'aae039':cz[3],'aae048':cz[4],
	        'aae041':cz[5],'aae042':cz[6],'aae043':cz[7],'aae044':cz[8],'aae045':cz[9]},
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
 
//添加土地信息
var tu = [];
var i = 0;
$("body").on("blur","#table5 input",function(){
		
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
            //$(this).focus();
        }
	})
    $("body").on("focus","#table5 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
$("#add5").click(function(){
 	      
    	$("#table5 input").each(function(){
		  i++;
		  tu.push($(this).val())		  
		})
	
    $.ajax({
        url:url+"addfpdx/addLandInfo/query",       
        data:{'aae001':p_qv.val(),'aae023':tu[0],'aae004':tu[1],'aae005':tu[2],'aae024':tu[3],
        'aae025':tu[4],'aae026':tu[5],'aae027':tu[6],'aae028':tu[7],'aae029':tu[8],'aae047':tu[9],
        'aae031':tu[10],'aae032':tu[11],'aae033':tu[12],'aae034':tu[13],'aae035':tu[14]},
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
 
//添加雨露计划信息
	var yu = [];
 	var i = 0;	
 	 $("body").on("blur","#table6 input",function(){
		
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
    $("body").on("focus","#table6 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
    $("#add6").click(function(){
 	      
    	$(" #table6 input").each(function(){
		  i++;
		  yu.push($(this).val())		  
		})
    $.ajax({
        url:url+"addfpdx/addPlan/query",       
        data:{'aae001':p_qv.val(),'aae411':yu[0],'aae412':yu[1],'aae413':yu[2],'aae414':yu[3],'aae415':yu[4],
        'aae416':yu[5],'aae417':yu[6],'aae418':yu[7],'aae419':yu[8],'aae420':yu[9]},
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
 
//添加信贷信息
var xd = [];
var i = 0;
 $("body").on("blur","#table7 input",function(){
		
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
	})
    $("body").on("focus","#table7 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })	
$("#add7").click(function(){	      
    	$("#table7 input").each(function(){	
		  i++;
		  xd.push($(this).val())		  
		})
	
    $.ajax({
        url:url+"addfpdx/addCreadit/query",       
        data:{'aae001':p_qv.val(),'aae422':xd[0],'aae423':xd[1],'aae424':xd[2],'aae425':xd[3],
        'aae426':xd[4],'aae427':xd[5],'aae428':xd[6],'aae429':xd[7],       
		'aae430':xd[8],'aae431':xd[9],'aae432':xd[10],'aae433':xd[11],'aae434':xd[12]},
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
 
//易地搬迁信息添加
 
	var bq = [];
 	var i = 0;
 $("body").on("blur","#table8 input",function(){
		
		if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
            //$(this).focus();
        }
	})
    $("body").on("focus","#table8 input",function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
$("#add8").click(function(){ 	      
    	$("#table8 input").each(function(){	
		  i++;
		  bq.push($(this).val())		  
		})

    $.ajax({
        url:url+"addfpdx/addReloc/query",       
        data:{'aae001':p_qv.val(),'aae436':bq[0],'aae437':bq[1],'aae438':bq[2],'aae439':bq[3],'aae440':bq[4],
        'aae441':bq[5],'aae442':bq[6],'aae443':bq[7],'aae444':bq[8],'aae445':bq[9]}, 
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