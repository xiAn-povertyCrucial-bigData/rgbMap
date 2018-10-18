$(document).ready(function(){
  //初始页面
  let token=$.cookie("token");
  var url1="pkctj/deve/query";
  var url2="pkcEx/excel/deve/check"
    var country = $("#country");
    var table1 = $("#one");
	var table2 = $("#two");
	var table3 = $("#three");
	var table4 = $("#four");
	var table5 = $("#five");
	var table6 = $("#six");
	var table7 = $("#seven");
	var table8 = $("#eight");
	var table9 = $("#nine");
	var table10 = $("#ten");
	var table11 = $("#eleven");
	var table12 = $("#twelve");
	var table13 = $("#thirteen");
	var table14 = $("#fourteen");
	var table15 = $("#fifteen");
	var table16 = $("#sixteen");
	var table17 = $("#seventeen");
	var table18 = $("#eighteen");
    var table19 = $("#nineteen");
	var table20 = $("#twenty");
	var page = $(".allP age");
	var codeType= 610100000000 ;
	function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
	$.ajax({
		url: url + "pkctj/deve/query",
		data: { "page_index":1,"page_size": 20,'aar040':201808,'aar008':codeType},
		beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
		method: "get",
		dataType: "json",
		success: function(data){
				if(data.code == 2000){
					showDevelopment(0,table1,data);
					showPage($(".searchPage"),data.data.total);
					page.html('共'+Math.ceil(data.data.total/20)+'页');
					$("#total").html("总数:"+data.data.total);
				}else if(data.code==1005){
					alert(data.message)
				}else if(data.code==1009){
					alert(data.message)
				}else if(data.code==4000){
					alert(data.message)
				}
		}
    })

  function   showDevelopment(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>
					<td colspan="2">中心村数</td>						
					<td colspan="2">一般村镇</td>						
					<td colspan="2">过渡村镇</td>						
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
		            <td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
				  <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
				</tr></table>`

        obj.html(str);
  }

//各项指标表格的点击切换
   $("#one1,#two1,#three1,#four1,#five1,#six1,#seven1,#eight1,#nine1,#ten1,#eleven1,#twelve1,#thirteen1,#fourteen1,#fifteen1,#sixteen1,#seventeen1,#eighteen1,#nineteen1,#twenty1").on("click",function(){
	   var sleep = $(this).attr("sleep");//获取所属表格的id
	  // alert(sleep);
	   var obj = $("#"+sleep);
	   obj.show().siblings().hide();
	   var k = [];
	   var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
	   	switch (sleep)
					{
						case 'one':
						url1= "pkctj/deve/query";  
						break;
						case 'two':
						url1="pkctj/stand/query"; 
						break;
						case 'three':
						url1="pkctj/land/query"; 
						break;
						case 'four':
						url1="pkctj/off/query"; 
						break;
						case 'five':
						url1="pkctj/ground/query";  
						break;
						case 'six':
				    	url1="pkctj/pop/query"; 
						break;
						case 'seven':
						url1="pkctj/inco/query"; 
						break;
						case 'eight':
						url1="pkctj/coll/query";  
						break;
						case 'nine':
						url1="pkctj/pove/query";  
						break;
						case 'ten':
						url1="pkctj/insu/query"; 
						break;
						case 'eleven':
						url1="pkctj/road/query"; 
						break;
						case 'twelve':
						url1="pkctj/drink/query"; 
						break;
						case 'thirteen':
						url1="pkctj/power/query"; 
						break;
						 case 'fourteen':
						url1="pkctj/house/query"; 
						break;
						case 'fifteen':
						url1="pkctj/happ/query"; 
						break;
						case 'sixteen':
						url1="pkctj/ind/query"; 
						break;
						case 'seventeen':
						url1="pkctj/tour/query"; 
						break;
						case 'eighteen':
						url1="pkctj/plan/query"; 
						break;
						case 'nineteen':
						url1="pkctj/cul/query"; 
						break;
						case 'twenty':
						url1="pkctj/info/query"; 
						break;
						default:
					    	return;
					}
      $.ajax({
            url: url + url1,
            data: { "page_index":1,"page_size": 20,'aar040':k[0],'aad100':k[1],'aar008':codeType},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "get",
            dataType: "json",	
            success: function(data){
                 if(data.code == 2000){
					//var day=new Date().getDay();
					switch (sleep)
					{
						case 'one':
						show1(0,obj,data);  
						break;
						case 'two':
						show2(0,obj,data); 
						break;
						case 'three':
						show3(0,obj,data); 
						break;
						case 'four':
						show4(0,obj,data); 
						break;
						case 'five':
						show5(0,obj,data); 
						break;
						case 'six':
						show6(0,obj,data); 
						break;
						case 'seven':
						show7(0,obj,data); 
						break;
						case 'eight':
						show8(0,obj,data);  
						break;
						case 'nine':
						show9(0,obj,data); 
						break;
						case 'ten':
						show10(0,obj,data); 
						break;
						case 'eleven':
						show11(0,obj,data); 
						break;
						case 'twelve':
						show12(0,obj,data); 
						break;
						case 'thirteen':
						show13(0,obj,data); 
						break;
						case 'fourteen':
						show14(0,obj,data); 
						break;
						case 'fifteen':
						show15(0,obj,data); 
						break;
						case 'sixteen':
						show16(0,obj,data); 
						break;
						case 'seventeen':
						show17(0,obj,data); 
						break;
						case 'eighteen':
						show18(0,obj,data); 
						break;
						case 'nineteen':
						show19(0,obj,data); 
						break;
						case 'twenty':
						show20(0,obj,data); 
						break;
					    default:
					    	return;
					}
                     showPage($(".searchPage"),data.data.total);
                     page.html('共'+Math.ceil(data.data.total/20)+'页');
                     $("#total").html("总数:"+data.data.total);
                 }
            }
      })
   })
   
  function   show1(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>
					<td colspan="2">中心村数</td>						
					<td colspan="2">一般村镇</td>						
					<td colspan="2">过渡村镇</td>						
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType='${data.data.list[i].Z}'>${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
		      <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
				</tr>`
        obj.html(str);
  }



 function   show2(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>
					<td colspan="2" valign="middle">贫困村数</td>
					<td colspan="2">经济薄弱村数</td>						
					<td colspan="2">十二五贫困村</td>						
					<td colspan="2">十三五贫困村</td>						
				</tr>								
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].I}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
		      <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].I}</td>
				</tr>`
        obj.html(str);
  }

   function   show3(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>
					<td colspan="2">山区村镇</td>						
					<td colspan="2">丘陵村镇</td>						
					<td colspan="2">平坝村镇</td>					
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
				</tr>`
        obj.html(str);
  }
   function   show4(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
				  <td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>
					<td rowspan="2" valign="middle">大学生村官数量</td>						
					<td rowspan="2" valign="middle">中共党员数量</td>						
					<td colspan="2">有村官的贫困村</td>	
					<td colspan="2">有党员的贫困村</td>						
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
				</tr>`
        obj.html(str);
  }

   function   show5(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>					
					<td colspan="2">耕地面积（亩）</td>	
					<td colspan="2">有效灌溉面积（亩）</td>	
					<td colspan="2">林地面积（亩）</td>	
					<td colspan="2">退耕还林面积（亩）</td>
					<td colspan="2">林果面积（亩）</td>	
					<td colspan="2">牧草地面积（亩）</td>	
					<td colspan="2">水域面积（亩）</td>						
				</tr>					
				<tr >						
					<td>面积</td>
					<td>占比</td>
					<td>面积</td>
					<td>占比</td>
					<td>面积</td>
					<td>占比</td>
					<td>面积</td>
					<td>占比</td>
					<td>面积</td>
					<td>占比</td>
					<td>面积</td>
					<td>占比</td>
					<td>面积</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].K}</td>
					<td>${data.data.list[i].L}</td>
					<td>${data.data.list[i].M}</td>
					<td>${data.data.list[i].N}</td>
					<td>${data.data.list[i].O}</td>
					<td>${data.data.list[i].P}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
		      <td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].J}</td>
					<td>${data.data.list[n].K}</td>
					<td>${data.data.list[n].L}</td>
					<td>${data.data.list[n].M}</td>
					<td>${data.data.list[n].N}</td>
					<td>${data.data.list[n].O}</td>
					<td>${data.data.list[n].P}</td>
				</tr>`
        obj.html(str);
  }
  
   function   show6(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
  		<tr>
					<td>序号</td>
					<td >地区</td>
					<td >总贫困村数</td>					
					<td>自然村数</td>	
					<td>总户数</td>	
					<td>总人数</td>	
					<td>贫困户数</td>
					<td>贫困人口数</td>	
					<td>贫困村贫困发生率</td>	
					<td>五保户数</td>	
					<td>五保人口数</td>	
					<td>低保户数</td>	
					<td>低保人口数</td>	
					<td>少数民族人口数</td>
					<td>妇女人口数</td>		
					<td>残疾人口数</td>	
					<td>劳动力人数</td>
					<td>外出务工人数</td>							
				</tr>		
				<tr></tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].K}</td>
					<td>${data.data.list[i].L}</td>
					<td>${data.data.list[i].M}</td>
					<td>${data.data.list[i].N}</td>
					<td>${data.data.list[i].O}</td>
					<td>${data.data.list[i].P}</td>
					<td>${data.data.list[i].Q}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].J}</td>
					<td>${data.data.list[n].K}</td>
					<td>${data.data.list[n].L}</td>
					<td>${data.data.list[n].M}</td>
					<td>${data.data.list[n].N}</td>
					<td>${data.data.list[n].O}</td>
					<td>${data.data.list[n].P}</td>
					<td>${data.data.list[n].Q}</td>
				</tr>`
        obj.html(str);
  }

   function   show7(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>					
					<td colspan="2">1000元（不含）以下贫困村</td>	
					<td colspan="2">1000（含）-2000元（不含）贫困村</td>	
					<td colspan="2">2000（含）-3000元（不含）贫困村</td>	
					<td colspan="2">3000（含）-4000元（不含）贫困村</td>
					<td colspan="2">4000（含）-5000元（不含）贫困村</td>	
					<td colspan="2">5000元（含）以上贫困村</td>					
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].K}</td>
					<td>${data.data.list[i].L}</td>
					<td>${data.data.list[i].M}</td>
					<td>${data.data.list[i].N}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].J}</td>
					<td>${data.data.list[n].K}</td>
					<td>${data.data.list[n].L}</td>
					<td>${data.data.list[n].M}</td>
					<td>${data.data.list[n].N}</td>
				</tr>`
        obj.html(str);
  }

   function   show8(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总贫困村数</td>					
					<td rowspan="2" valign="middle">村均集体收入（万元）</td>	
					<td rowspan="2" valign="middle">无集体收入贫困村数（万元）</td>	
					<td colspan="2">0-50万元贫困村</td>	
					<td colspan="2">50-100万元贫困村</td>
					<td colspan="2">100-200万元贫困村</td>	
					<td colspan="2">200-300万元贫困村</td>	
					<td colspan="2">300万元以上贫困村</td>						
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].K}</td>
					<td>${data.data.list[i].L}</td>
					<td>${data.data.list[i].M}</td>
					<td>${data.data.list[i].N}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].J}</td>
					<td>${data.data.list[n].K}</td>
					<td>${data.data.list[n].L}</td>
					<td>${data.data.list[n].M}</td>
					<td>${data.data.list[n].N}</td>
				</tr>`
        obj.html(str);
  }

   function   show9(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总户数</td>
					<td rowspan="2" valign="middle">总人数</td>					
					<td colspan="2">贫困村户数</td>	
					<td colspan="2">贫困村人数</td>	
					<td colspan="2">非贫困村户数</td>	
					<td colspan="2">非贫困村人数</td>							
				</tr>					
				<tr >						
					<td>户数</td>
					<td>占比</td>
					<td>人数</td>
					<td>占比</td>
					<td>户数</td>
					<td>占比</td>
					<td>人数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].K}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].J}</td>
					<td>${data.data.list[n].K}</td>
				</tr>`
        obj.html(str);
  }

   function   show10(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
				  <td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总人数</td>					
					<td colspan="2">参加新型农村合作医疗人数（人）</td>	
					<td colspan="2">参加城镇职工基本养老保险人数（人）</td>	
					<td colspan="2">参加城乡居民基本养老保险人数（人）</td>					
				</tr>					
				<tr >						
					<td>人数</td>
					<td>占比</td>
					<td>人数</td>
					<td>占比</td>
					<td>人数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
				  <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
				</tr>`
        obj.html(str);
  }

   function   show11(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">贫困村总数</td>					
					<td colspan="2">到乡镇未通沥青（水泥）村数</td>	
					<td colspan="2">贫困村未通客运班车数</td>						
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
			    <td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
				</tr>`
        obj.html(str);
  }

   function   show12(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总户数</td>					
					<td colspan="2">未实现饮水安全户数（户）</td>	
					<td colspan="2">饮水安全户数（户）</td>						
				</tr>					
				<tr >						
					<td>户数</td>
					<td>占比</td>
					<td>户数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
				</tr>`
        obj.html(str);
  }

   function   show13(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">贫困村总数</td>		
					<td rowspan="2" valign="middle">总户数</td>			
					<td colspan="2">未通生活用电的自然村数（个）</td>	
					<td colspan="2">未通生产用电的自然村数（个）</td>							
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td  codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
		      <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
				</tr>`
        obj.html(str);
  }

   function   show14(index,obj,data){
     obj.empty();
     var n=0;
	 var nub="cksj";
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总户数</td>					
					<td colspan="2">危房户数</td>						
				</tr>					
				<tr >						
					<td>户数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>	
				</tr>`
        obj.html(str);
  }

 function   show15(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">总人数</td>					
					<td colspan="2">贫困村人数</td>						
				</tr>					
				<tr >						
					<td>人数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
				</tr>`
        obj.html(str);
  }


 function   show16(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
		      <td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">贫困村总数</td>	
					<td rowspan="2" valign="middle">总户数</td>
					<td rowspan="2" valign="middle">农村专业合作社个数（个）</td>				
					<td colspan="2">无农民专业合作社贫困村数量</td>	
					<td colspan="2">有1个农民专业合作社贫困村数量</td>
					<td colspan="2">有2个-5个专业合作社贫困村数量</td>
					<td colspan="2">有5个以上专业合作社贫困村数量</td>
					<td colspan="2">参加农民专业合作社贫困户数（户）</td>					
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].K}</td>
					<td>${data.data.list[i].L}</td>
					<td>${data.data.list[i].M}</td>
					<td>${data.data.list[i].N}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
	        <td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].J}</td>
					<td>${data.data.list[n].K}</td>
					<td>${data.data.list[n].L}</td>
					<td>${data.data.list[n].M}</td>
					<td>${data.data.list[n].N}</td>
				</tr>`
        obj.html(str);
  }


   function   show17(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td  valign="middle">序号</td>
					<td  valign="middle">地区</td>
					<td  valign="middle">开展乡村旅游的贫困村数（有1户以上）</td>	
					<td  valign="middle">开展乡村旅游的户数（户）</td>
					<td  valign="middle">农家乐经营户数（户）</td>				
					<td  valign="middle">乡村旅游从业人员数（人）</td>
					<td  valign="middle">农家乐经营户户均年收入（元）</td>						
				</tr>		<tr></tr>			
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
		      <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
				</tr>`
        obj.html(str);
  }

   function   show18(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">贫困村总数</td>	
					<td rowspan="2" valign="middle">卫生室个数（个）</td>
					<td rowspan="2" valign="middle">公共卫生厕所个数（个）</td>				
					<td rowspan="2" valign="middle">垃圾集中堆放点个数	</td>
					<td colspan="2">无卫生室贫困村个数</td>	
					<td colspan="2">无公共卫生厕所贫困村个数（个）</td>
					<td colspan="2">无垃圾集中堆放点贫困村个数（个）</td>
					<td rowspan="2">执页（助理）医师数（人）</td>									
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
			    <td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
					<td>${data.data.list[i].J}</td>
					<td>${data.data.list[i].K}</td>
					<td>${data.data.list[i].L}</td>					
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
					<td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
					<td>${data.data.list[n].J}</td>
					<td>${data.data.list[n].K}</td>
					<td>${data.data.list[n].L}</td>
					
				</tr>`
        obj.html(str);
  }

   function   show19(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">贫困村总数</td>	
					<td rowspan="2" valign="middle">文化（图书）室个数（个）</td>
					<td rowspan="2" valign="middle">村均文化（图书）室个数（个）</td>				
					<td colspan="2">有文化（图书）室贫困村个数（个）</td>						
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
				  <td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
				  <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
				</tr>`
        obj.html(str);
  }

   function   show20(index,obj,data){
     obj.empty();
     var n=0;
     var str =`
     <table border="" cellspacing="" cellpadding="">		   
	    		<tr rowspan="2">
					<td rowspan="2" valign="middle">序号</td>
					<td rowspan="2" valign="middle">地区</td>
					<td rowspan="2" valign="middle">贫困村总数</td>	
					<td rowspan="2" valign="middle">自然村数</td>
					<td rowspan="2" valign="middle">总户数</td>				
					<td colspan="2">通宽带户数（户）</td>	
					<td rowspan="2" valign="middle">通宽带的村小学个数（个）</td>	
					<td rowspan="2" valign="middle">能用手机上网的户数（户）</td>
					<td rowspan="2" valign="middle">信息员数</td>						
				</tr>					
				<tr >						
					<td>村数</td>
					<td>占比</td>
				</tr>
                    `;
        for(let i = 0;i < data.data.list.length-1;i++){
			str +=`<tr>
					<td>${index*20+i+1}</td>
					<td codeType="${data.data.list[i].Z}">${data.data.list[i].A}</td>
					<td>${data.data.list[i].B}</td>
					<td>${data.data.list[i].C}</td>
					<td>${data.data.list[i].D}</td>
					<td>${data.data.list[i].E}</td>
					<td>${data.data.list[i].F}</td>
					<td>${data.data.list[i].G}</td>
					<td>${data.data.list[i].H}</td>
					<td>${data.data.list[i].I}</td>
				</tr>
                `;
                n++;
        }
        str +=`<tr>
					<td>${n+1}</td>
					<td><input type='button' disabled='disabled' value='汇总' style='text-align: center;background: white;border: none;'></td>
			    <td>${data.data.list[n].B}</td>
					<td>${data.data.list[n].C}</td>
					<td>${data.data.list[n].D}</td>
					<td>${data.data.list[n].E}</td>
					<td>${data.data.list[n].F}</td>
					<td>${data.data.list[n].G}</td>
					<td>${data.data.list[n].H}</td>
					<td>${data.data.list[n].I}</td>
				</tr>`
        obj.html(str);
  }

  $("body").on("click","#btn_orange1",function(){
      var sleep = $('.active').attr("sleep");
	  var obj = $('#'+sleep);
	  var k = [];
	  var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
   	})
	   $.ajax({
            url: url + url1,
            data: { "page_index":1,"page_size": 20,'aar040':k[0],'aad100':k[1],'aar008':codeType},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                  ShowLoading();
            },
            method: "get",
            dataType: "json",
            success: function(data){
				if(data.code==2000){
	        	  switch (sleep)
					{
						case 'one':
						show1(0,obj,data);  
						break;
						case 'two':
						show2(0,obj,data); 
						break;
						case 'three':
						show3(0,obj,data); 
						break;
						case 'four':
						show4(0,obj,data); 
						break;
						case 'five':
						show5(0,obj,data); 
						break;
						case 'six':
						show6(0,obj,data); 
						break;
						case 'seven':
						show7(0,obj,data); 
						break;
						case 'eight':
						show8(0,obj,data);  
						break;
						case 'nine':
						show9(0,obj,data); 
						break;
						case 'ten':
						show10(0,obj,data); 
						break;
						case 'eleven':
						show11(0,obj,data); 
						break;
						case 'twelve':
						show12(0,obj,data); 
						break;
						case 'thirteen':
						show13(0,obj,data); 
						break;
						case 'fourteen':
						show14(0,obj,data); 
						break;
						case 'fifteen':
						show15(0,obj,data); 
						break;
						case 'sixteen':
						show16(0,obj,data); 
						break;
						case 'seventeen':
						show17(0,obj,data); 
						break;
						case 'eighteen':
						show18(0,obj,data); 
						break;
						case 'nineteen':
						show19(0,obj,data); 
						break;
						case 'twenty':
						show20(0,obj,data); 
						break;
						default:
					    	return;
				 	}
					 showPage($(".searchPage"),data.data.total);
                     page.html('共'+Math.ceil(data.data.total/20)+'页');
                     $("#total").html("总数:"+data.data.total);
				}else if(data.code == 1009){
					var str=`<div align="center" style="margin-top:40px;font-size:32px;color:#767272;">查无数据</div>`
					obj.html(str)
					$("#total").empty();
				   $(".allPage").empty();
						}else if(data.code==1005){
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

  //点击地区实现下钻功能
    $("body").on('click','#content  div table tr:nth-child(n+3) td:nth-child(2)',function(){

      var k = [];
	    var i = 0;
    	$(".active1").each(function(){
			  k[i] = $(this).attr("sleep");
			  i++;
			})
		var  sleep = $(".active").attr('sleep'); 
		var  obj = $("#"+sleep);
	  obj.show().siblings().hide();
		codeType = $(this).attr("codeType");
		console.log(codeType)
			switch (sleep)
					{
						case 'one':
						url1= "pkctj/deve/query";  
						break;
						case 'two':
						url1="pkctj/stand/query"; 
						break;
						case 'three':
						url1="pkctj/land/query"; 
						break;
						case 'four':
						url1="pkctj/off/query"; 
						break;
						case 'five':
						url1="pkctj/ground/query";  
						break;
						case 'six':
				    	url1="pkctj/pop/query"; 
						break;
						case 'seven':
						url1="pkctj/inco/query"; 
						break;
						case 'eight':
						url1="pkctj/coll/query";  
						break;
						case 'nine':
						url1="pkctj/pove/query";  
						break;
						case 'ten':
						url1="pkctj/insu/query"; 
						break;
						case 'eleven':
						url1="pkctj/road/query"; 
						break;
						case 'twelve':
						url1="pkctj/drink/query"; 
						break;
						case 'thirteen':
						url1="pkctj/power/query"; 
						break;
						 case 'fourteen':
						url1="pkctj/house/query"; 
						break;
						case 'fifteen':
						url1="pkctj/happ/query"; 
						break;
						case 'sixteen':
						url1="pkctj/ind/query"; 
						break;
						case 'seventeen':
						url1="pkctj/tour/query"; 
						break;
						case 'eighteen':
						url1="pkctj/plan/query"; 
						break;
						case 'nineteen':
						url1="pkctj/cul/query"; 
						break;
						case 'twenty':
						url1="pkctj/info/query"; 
						break;
						default:
					    	return;
					}
      $.ajax({
            url: url + url1,
            data: { "page_index":1,"page_size": 20,'aar040':k[0],'aad100':k[1],'aar008':codeType},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "get",
            dataType: "json",	
            success: function(data){
                 if(data.code == 2000){
					//var day=new Date().getDay();
					switch (sleep)
					{
						case 'one':
						show1(0,obj,data);  
						break;
						case 'two':
						show2(0,obj,data); 
						break;
						case 'three':
						show3(0,obj,data); 
						break;
						case 'four':
						show4(0,obj,data); 
						break;
						case 'five':
						show5(0,obj,data); 
						break;
						case 'six':
						show6(0,obj,data); 
						break;
						case 'seven':
						show7(0,obj,data); 
						break;
						case 'eight':
						show8(0,obj,data);  
						break;
						case 'nine':
						show9(0,obj,data); 
						break;
						case 'ten':
						show10(0,obj,data); 
						break;
						case 'eleven':
						show11(0,obj,data); 
						break;
						case 'twelve':
						show12(0,obj,data); 
						break;
						case 'thirteen':
						show13(0,obj,data); 
						break;
						case 'fourteen':
						show14(0,obj,data); 
						break;
						case 'fifteen':
						show15(0,obj,data); 
						break;
						case 'sixteen':
						show16(0,obj,data); 
						break;
						case 'seventeen':
						show17(0,obj,data); 
						break;
						case 'eighteen':
						show18(0,obj,data); 
						break;
						case 'nineteen':
						show19(0,obj,data); 
						break;
						case 'twenty':
						show20(0,obj,data); 
						break;
					    default:
					    return;
					}
                     showPage($(".searchPage"),data.data.total);
                     page.html('共'+Math.ceil(data.data.total/20)+'页');
                     $("#total").html("总数:"+data.data.total);
                 }
            }
      })
      
      if(codeType.substring(9) == '000'){
			if(codeType.substring(6)=='000000'){
				if(codeType.substring(4)=='00000000'){								  
				}else{									
					  $("#selectCity").css('display','block');
					  $("#countyName").html('>'+$(this).html());
					  $("#countyName").attr("sleep",codeType);
					  $("#countyName").css("color","#FFAC37").siblings("span").css("color","#555");
				}
			}else{					 				
					 $("#selectCity").css('display','block');
					 $("#townName").html('>'+$(this).html());
					 $("#townName").attr("sleep",codeType);
					 $("#townName").css("color","#FFAC37").siblings("span").css("color","#555");
			}
		}else{		
//					 $('#content  div table tr:nth-child(n+3) td:nth-child(2)').click(function(event){
//					 		event.preventDefault();
//					 })
					 $("#selectCity").css('display','block');
					 $("#villageName").html('>'+$(this).html());
					 $("#villageName").attr("sleep",codeType);
					 $("#villageName").css("color","#FFAC37").siblings("span").css("color","#555");
		}	

})  
   
/*导出*/

$("body").on("click","#dataImport",function(){

	/**********************************/
	   var sleep1 = $(".active").attr("sleep");//获取所属表格的id 	
	   $('#dataImport').removeClass();
	   $('#dataImport').addClass(sleep1);	  
	   $('#dataImport').addClass('button');	  
	   $('#dataImport').addClass('border-main');	  
	     
  	switch (sleep1)
					{
						case 'one':
						url1="pkcEx/deve/query";  
						url2="pkcEx/excel/deve/check";
						break;
						case 'two':
						url1="pkcEx/stand/query"; 
						url2="pkcEx/excel/stand/check"; 
						break;
						case 'three':
						url1="pkcEx/land/query"; 
						url2="pkcEx/excel/land/check"; 
						break;
						case 'four':
						url1="pkcEx/off/query"; 
						url2="pkcEx/excel/off/check"; 
						break;
						case 'five':
						url1="pkcEx/ground/query";  
						url2="pkcEx/excel/ground/check";  
						break;
						case 'six':
				    	url1="pkcEx/pop/query"; 
				    	url2="pkcEx/excel/pop/check"; 
						break;
						case 'seven':
						url1="pkcEx/inco/query"; 
						url2="pkcEx/excel/inco/check"; 
						break;
						case 'eight':
						url1="pkcEx/coll/query";  
						url2="pkcEx/excel/coll/check";  
						break;
						case 'nine':
						url1="pkcEx/pove/query";  
						url2="pkcEx/excel/pove/check";  
						break;
						case 'ten':
						url1="pkcEx/insu/query"; 
						url2="pkcEx/excel/insu/check"; 
						break;
						case 'eleven':
						url1="pkcEx/road/query"; 
						url2="pkcEx/excel/road/check"; 
						break;
						case 'twelve':
						url1="pkcEx/drink/query"; 
						url2="pkcEx/excel/drink/check"; 
						break;
						case 'thirteen':
						url1="pkcEx/power/query"; 
						url2="pkcEx/excel/power/check"; 
						break;
						 case 'fourteen':
						url1="pkcEx/house/query"; 
						url2="pkcEx/excel/house/check"; 
						break;
						case 'fifteen':
						url1="pkcEx/happ/query"; 
						url2="pkcEx/excel/happ/check"; 
						break;
						case 'sixteen':
						url1="pkcEx/ind/query"; 
						url2="pkcEx/excel/ind/check"; 
						break;
						case 'seventeen':
						url1="pkcEx/tour/query"; 
						url2="pkcEx/excel/tour/check"; 
						break;
						case 'eighteen':
						url1="pkcEx/plan/query"; 
						url2="pkcEx/excel/plan/check"; 
						break;
						case 'nineteen':
						url1="pkcEx/cul/query"; 
						url2="pkcEx/excel/cul/check"; 
						break;
						case 'twenty':
						url1="pkcEx/info/query"; 
						url2="pkcEx/excel/info/check"; 
						break;
						default:
					    	return;
					}
		console.log(sleep1)
		console.log(url1)
		console.log(url2)
	$.ajax({
    url: url + url2,  
    data:{},
    beforeSend:function(request){
        request.setRequestHeader("Authorization",token);
        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
    method: "get",
    dataType: "json",           
    success: function(data){
    if (data.code == 2000){
					
			/************************/	
      var k = [];
	    var i = 0;
    	$(".active1").each(function(){
			  k[i] = $(this).attr("sleep");
			  i++;
	   	})

				data = { "page_index":indexs,"page_size": 20,'aar040':k[0],'aad100':k[1],'aar008':codeType}

            /*主体内容渲染*/
     
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
						let cc=url+url1+"?"+b;
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

});
/*导出结束*/
  
  //上浮
  $("body").on("click","#selectCity span",function(){
		var code = $(this).attr("sleep");
		var codeType = $(this).attr("codeType");
		$(this).nextAll().empty();
		$(this).css("color",":#FFAC37").siblings("span").css("color","#555");
	
	   var k = [];
	    var i = 0;
    	$(".active1").each(function(){
		  k[i] = $(this).attr("sleep");
		  i++;
		})
		var  sleep = $(".active").attr('sleep'); 
		var  obj = $("#"+sleep);
	  obj.show().siblings().hide();
	
			switch (sleep)
					{
						case 'one':
						url1= "pkctj/deve/query";  
						break;
						case 'two':
						url1="pkctj/stand/query"; 
						break;
						case 'three':
						url1="pkctj/land/query"; 
						break;
						case 'four':
						url1="pkctj/off/query"; 
						break;
						case 'five':
						url1="pkctj/ground/query";  
						break;
						case 'six':
				    	url1="pkctj/pop/query"; 
						break;
						case 'seven':
						url1="pkctj/inco/query"; 
						break;
						case 'eight':
						url1="pkctj/coll/query";  
						break;
						case 'nine':
						url1="pkctj/pove/query";  
						break;
						case 'ten':
						url1="pkctj/insu/query"; 
						break;
						case 'eleven':
						url1="pkctj/road/query"; 
						break;
						case 'twelve':
						url1="pkctj/drink/query"; 
						break;
						case 'thirteen':
						url1="pkctj/power/query"; 
						break;
						 case 'fourteen':
						url1="pkctj/house/query"; 
						break;
						case 'fifteen':
						url1="pkctj/happ/query"; 
						break;
						case 'sixteen':
						url1="pkctj/ind/query"; 
						break;
						case 'seventeen':
						url1="pkctj/tour/query"; 
						break;
						case 'eighteen':
						url1="pkctj/plan/query"; 
						break;
						case 'nineteen':
						url1="pkctj/cul/query"; 
						break;
						case 'twenty':
						url1="pkctj/info/query"; 
						break;
						default:
					    	return;
					}
      $.ajax({
            url: url + url1,
            data: { "page_index":1,"page_size": 20,'aar040':k[0],'aad100':k[1],'aar008':code},
            beforeSend:function(request){
                  request.setRequestHeader("Authorization",token);
                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "get",
            dataType: "json",	
            success: function(data){
                 if(data.code == 2000){
					//var day=new Date().getDay();
					switch (sleep)
					{
						case 'one':
						show1(0,obj,data);  
						break;
						case 'two':
						show2(0,obj,data); 
						break;
						case 'three':
						show3(0,obj,data); 
						break;
						case 'four':
						show4(0,obj,data); 
						break;
						case 'five':
						show5(0,obj,data); 
						break;
						case 'six':
						show6(0,obj,data); 
						break;
						case 'seven':
						show7(0,obj,data); 
						break;
						case 'eight':
						show8(0,obj,data);  
						break;
						case 'nine':
						show9(0,obj,data); 
						break;
						case 'ten':
						show10(0,obj,data); 
						break;
						case 'eleven':
						show11(0,obj,data); 
						break;
						case 'twelve':
						show12(0,obj,data); 
						break;
						case 'thirteen':
						show13(0,obj,data); 
						break;
						case 'fourteen':
						show14(0,obj,data); 
						break;
						case 'fifteen':
						show15(0,obj,data); 
						break;
						case 'sixteen':
						show16(0,obj,data); 
						break;
						case 'seventeen':
						show17(0,obj,data); 
						break;
						case 'eighteen':
						show18(0,obj,data); 
						break;
						case 'nineteen':
						show19(0,obj,data); 
						break;
						case 'twenty':
						show20(0,obj,data); 
						break;
					    default:
					    return;
					}
                     showPage($(".searchPage"),data.data.total);
                     page.html('共'+Math.ceil(data.data.total/20)+'页');
                     $("#total").html("总数:"+data.data.total);
                 }
            }
      })
})   
    
//脚页
let indexs=1;
function page_init(index) {
	  indexs=index+1;
    var sleep = $('.active').attr("sleep");
	  var obj = $('#'+sleep);
	  var k = [];
	  var i = 0;
    	$(".active1").each(function(){
			  k[i] = $(this).attr("sleep");
			  i++;
	   	})
    	
        $.ajax({
                url:url + url1,
                type:"get",
                data:{"page_index": index+1,"page_size": 20,"aar040":k[0],'aad100':k[1],'aar008':codeType},
                beforeSend:function(request){
		                  request.setRequestHeader("Authorization",token);
		                  request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		            },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                            showDevelopment( index,table1,data); 
                        }
                },
                error:function () {
                }
            })
        }
function showPage(obj,data){
 $("#Pagination").pagination(data,{
	     callback:PageCallback,         //pageCallback() 为翻页调用函数
	     items_per_page:20,                //每页显示条目数
	     num_display_entries: 4,                //连续分页显示分页条目数
	     num_edge_entries: 1          //两侧显示的首尾分页的条目数
	});

}

//ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
    page_init(page_index);      //第一页为0
}

  $("body").on("click","#btn_blue1",function(){
	$("#search").empty();
	var str = ` <ul class="select"> 
						  <label  class="label1"> 年份</label>
		                 <dt >
		                    <dl  sleep="2014">2014年</dl>
		                    <dl sleep="2015">2015年</dl>
		                    <dl sleep="2016">2016年</dl>
		                    <dl  class="active1" sleep="2017">2017年</dl>
							<dl sleep="2018">2018年</dl>
		                    <dl sleep="2019">2019年</dl>
		                    <dl sleep="2020">2020年</dl>
		                </dt>
					  </ul>
		      <ul class="select"> 
						  <label  class="label1"> 是否出列</label>
		                 <dt >
		                    <dl  sleep="" class="active1">全部</dl>
		                    <dl sleep="1">是</dl>
		                    <dl sleep="0">否</dl>
		                </dt>
					  </ul>
		           
				<div>
			        <input type="button" id="btn_orange1" class="btn_orange1" style="float: right;" name="" value="查询">
			        <input type="button" id="btn_blue1" class="btn_blue1" style="float: right;" name="" value="重置条件">
			 	</div>        `;
		 $("#search").html(str);
  })
})