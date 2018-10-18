$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    let countyName=countryName;
    let villagName=villageName;
    let villagCode=villageCode;
    $("#villageName").text(villagName);
    /*市产业扶贫完成情况统计*/
    var villaN = villagName;
    $("#villageN").html(villaN);
    var  table = $("#module-2");
    var  table2 = $("#module-3");
    var  table3 = $("#module-4");
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/tblbase/detail",
            method:"get",
            dataType:"json",
            data:{"year":year,"villageName":villaN},
            success:function (result) {
               if(result.code==2000){
                   if(result.data.AAD331==0){
                       $(".standard1").css("background","#DD4F43");
                   }else{
                       $(".standard1").css("background","#1FA463");
                   }
                   let length=result.data.villageDetail.length;
                   let aa=0;
                   for(let i=0;i<length;i++){
                       aa+=1*(result.data.villageDetail[i]['AAC308']);
                   }
                   console.log(aa,length)
                   if(aa==length){
                       $(".standard2").css("background","#1FA463");
                   }else{
                       $(".standard2").css("background","#DD4F43");
                   }


                   if(result.data.AAD328==0){
                       $(".standard3").css("background","#DD4F43");
                   }else{
                       $(".standard3").css("background","#1FA463");
                   }

               var str =`
               <table cellspacing="0">
								<thead>
									<tr>
										<th>未实现饮水安全户数</th>
										<th>饮水困难户数</th>
									</tr>
								</thead>
								<tbody id="">
									<tr>
										<td id="con1">${result.data.AAD331}</td>
										<td id="con2">${result.data.AAD332}</td>
									</tr>
								</tbody>
							</table>
                            `;
               table.html(str);
               var str2="";
               for(let i=0;i<result.data.villageDetail.length;i++){
                   str2 += `		
                    <tr style="height:40px;">
                        <td style="height:40px;">${result.data.villageDetail[i]['AAD042']}</td>
                        <td style="height:40px;" class="con3">${result.data.villageDetail[i]['AAC308']}</td>
                        <td style="height:40px;" class="con3">${result.data.villageDetail[i]['AAC313']}</td>
                    </tr>
               `
               }
               table2.html(str2);
               for(let j=0;j<$("#module-3 .con3").length;j++){
                   console.log($("#module-3 .con3").eq(j).text());
                   if($("#module-3 .con3").eq(j).text()==0){
                       $("#module-3 .con3").eq(j).text("否");
                   }else if($("#module-3 .con3").eq(j).text()=="1"){
                       $("#module-3 .con3").eq(j).text("是");
                   }else if($("#module-3 .con3").eq(j).text()=="null"){
                       $("#module-3 .con3").eq(j).text("");
                   }
               }
               var str3 = `
               <table cellspacing="0">
								<thead>
									<tr>
										<th>到乡镇距离(公里)</th>
										<th>到乡镇是否通沥青水泥路</th>
									</tr>
								</thead>
								<tbody id="">
									<tr>
										<td id="con5">${result.data.AAD327}</td>
										<td id="con6">${result.data.AAD328}</td>
									</tr>
								</tbody>
							</table>
               `;
               table3.html(str3);
               if($("#con5").text()=="null"){
                   $("#con5").text("");
               }
               if($("#con6").text()=="0"){
                   $("#con6").text("否");
               }else if($("#con6").text()=="1"){
                   $("#con6").text("是");
               }
            }
         }
        })
    }
   
})