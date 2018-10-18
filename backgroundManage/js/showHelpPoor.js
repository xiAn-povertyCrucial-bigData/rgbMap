$(document).ready(function(){
	let token=$.cookie("token");
	var totle;
	var datas={}
   // var url="http://192.168.1.153:8080/"
    var formInfos = $('#formSubmit2');
    var page = $(".allPage");
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    if(aa.aar008=="610100000000"){
        datas={"page_index": 1,"page_size": 12,"aar040": 201808}
        console.log(datas)
    }else if(aa.aar008=="619900000000"){
    	datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aaa001":619900000000}
        console.log(datas)
    }else if(aa.aar008.substring(6)=='000000'){
        datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":aa.aar008}
        console.log(datas)
    }else{
        datas={"page_index": 1,"page_size": 12,"aar040": 201808,"aar002":aa.aar008}
        console.log(datas)
    }
    $.ajax({
        url: url + "table/pkh/query",
        data:datas,
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              ShowLoading();
        },
        method: "get",
        dataType: "json",
        json: "callback",
        jsonpCallback: 'jsonpCallback',
        success: function(data){
            if (data.code == 2000){
                showAllPoorInfo(0, formInfos,data);
                showPage($(".searchPage"),data.data.total);
                totle=data.data.navigatePages;
                console.log(totle)
                init_Shi();
                //init_County();
                page.html(Math.ceil(data.data.total/12));
                $('#total').html("总户数："+data.data.total + "&nbsp;&nbsp;&nbsp;总人数："+ data.data.navigatePages);
            }else if(data.code==1005){
                 alert(data.message)
             }else if(data.code==1009){
                 alert(data.message)
             }else if(data.code==4000){
                 alert(data.message)
             }
        },
        complete:function(){
            HideLoading();
        }
})

//加载西安市
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
                    //init_County()
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

        if(aa.aar008==619900000000){
        	$("#p_shi").empty().append("<option value='619900000000'>西咸新区</option>").attr("disabled","disabled");
        }
    }
$("#p_shi").change(function(){
    var opt=$("#p_shi");
    var opt1 = $("#p_qv");
         $.ajax({
            url: url + "district/yanliang",
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

//初始化县区
function init_County(){
	var opt=$("#p_shi");
    var county = $("#p_qv");
            $.ajax({
            url: url + "district/yanliang",
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
                    showCountyInfo( county,data);
                }
            }
    })
}

//县区的渲染
function showCountyInfo(obj,data){
     obj.empty();
     var opt = $("#p_cun");
     var opt1 = $("#p_x");
     let arr=[];
     var str1 = `<option value="">乡（镇）</option>`;
     var str2 = `<option value="">村</option>`
     opt1.html(str1);
     opt.html(str2);
     var str = `<option value="">县（区）</option>`;
     var string = "";
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
        // console.log(arr[i].number+"---"+aa.aaa113);
        if(arr[i].number==aa.aar008 ||arr[i].number==aa.aaa113){
            $("#p_qv").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            $("#p_shi").attr("disabled","disabled");
            var opt=$("#p_qv");
            var opt1 = $("#p_x");
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
                        page.html(data.data.total);
                    }
                }
            })

        }
    }
}

//乡镇的初始化
$("#p_qv").change(function(){
    var opt=$("#p_qv");
    var opt1 = $("#p_x");
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
            }
    })
});

//乡镇的渲染
function showTownInfo(obj,data){
     obj.empty();
     let arr=[];
     let p_qv=$("#p_qv").val();  //区
     let p_xiang=$("#p_x").val();  //乡
     var str = `<option value="">乡（镇）</option>`;
     for(let i = 0; i < data.data.length; i++){
         str += `
         <option value="${data.data[i].AAR001}">${data.data[i].AAR009}</option>
     `;
     let obj2={"number":data.data[i].AAR001,"name":data.data[i].AAR009};
     arr.push(obj2);
      obj.html(str);
     }
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    // console.log(aa.aar008.substring(6));
    if(aa.aar008.substring(6)!="000000"){
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                // $("#county").empty();
                $("#p_x").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
            }
        }
        let p_qv=$("#p_qv").val();  //区
        //let p_xiang=$("#p_x").val();  //乡
        var town = $("#p_x").val();
        var vill = $("#p_cun");
        $.ajax({
            url: url + "table/pkh/query",
            data:{"page_index": 1,"page_size": 12,"aar040": 201808,"aar001":p_qv,"aar002":town},
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "post",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                    showAllPoorInfo(0, formInfos,data);
                    showPage($(".searchPage"),data.data.total);
                    totle=data.data.navigatePages;
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html('总贫困数：'+data.data.total);
                }else if(data.code==1005){
                    alert(data.message)
                }else if(data.code==1009){
                    alert(data.message)
                }else if(data.code==4000){
                    alert(data.message)
                }
            }
        })
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
                }
            }
        })
    }
}

//村的初始化
$("#p_x").change(function(){
    var town = $("#p_x").val();
    var vill = $("#p_cun");
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
            }
    })
});
//村的渲染
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

  function showAllPoorInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
              <th>序号</th>
              <th>户主姓名</th>
              <th>行政区划</th>
              <th>户主证件号码</th>
              <th>脱贫状态</th>
              <th>贫困户属性</th>
              <th>家庭成员人数</th>
              <th>首次识别时间</th>
              <th>操作</th>
          </tr>`
          obj.html(str);

   for(let i = 0; i < data.data.list.length; i++ ){
    var str1=`
     <tr>
          <td>${index*12+i+1}</td>
          <td>${data.data.list[i].AAC029}</td>
          <td>${data.data.list[i].ADDRESS}</td>
          <td>${data.data.list[i].AAC031}</td>
          <td>${data.data.list[i].AAR010}</td>
          <td>${data.data.list[i].AAC006}</td>
          <td>${data.data.list[i].AAC017}</td>
		  <td>${data.data.list[i].AAR041}</td>
          <td>
              <a href="showDetailHelpPoor.html?value=${data.data.list[i].AAC001}&time=${$('#p_year').val()}&address=${data.data.list[i].ADDRESS}">详情</a>
              <a href="reviseHelpPoor.html?value=${data.data.list[i].AAC001}&time=${$('#p_year').val()}&address=${data.data.list[i].ADDRESS}">修改</a>

          </td>
      </tr>`;
       obj.html(function (i, value) {
            return value + str1;
        });
    }
  }

 //分页
 var indexs;
 var p_status=[];
 var p_shuxing=[];
 function page_init(index) {
      indexs = index + 1;
      $("#formSubmit2").empty();
 var p_name=$("#p_name").val();
 if(p_name==""||p_name==null){
     p_name=null;
 }
/*for(let i = 0; i < $(".active").length; i++){
	p_status[i]=$(".active").eq(i).attr('sleep');
}*/
      p_status=[];p_shuxing=[];
      let propertys=$(".shuxing dl dt.active");
      let statuss=$(".tuopin dl dt.active");
      getValue(propertys,p_shuxing);
      getValue(statuss,p_status);
      function getValue(obj,arr){
          // let arr=[];
          for(let i=0;i<obj.length;i++){
              arr.push(obj.eq(i).attr("sleep"));
          }
          return arr;
      }
    var p_year=$("#p_year").val();
    var p_number=$("#p_number").val();
    // var p_shuxing=$("#p_shuxing").val();
    //var p_status=$(".active").attr("sleep");  //状态
    var p_biaozhun=$("#p_biaozhun").val(); //标准
    var p_xiang=$("#p_x").val();  //乡
    var p_cun =$("#p_cun").val();
    var p_qv=$("#p_qv").val();  //区

        var p = [];
        var c = [];
        var a = [];
        p = $(".p");
        c = $(".c");
        a = $(".a");

        var p1 = [];
        var c1 = [];
        var a1 = [];
        p1 = $(".p1");
        c1 = $(".c1");
        a1 = $(".a1");
        var data = [];
        var data1 = [];
      for(let i = 0; i < $(".p").length; i++){ //指标一选择查询
          if(a[0].hasAttribute("sleep") && a.attr("sleep")!="请选择") {
              data[i] = {"type": p.eq(i).attr("sleep"), "operation": c.eq(i).text(), "value": a.eq(i).attr("sleep")}
          }else if(a.attr("sleep")=="请选择"){
              data[i]={"type":p.eq(i).attr("sleep"),"operation":c.eq(i).text(),"value":a.eq(i).text()}
          }
      }
      for(let i = 0; i < $(".p1").length; i++){ //指标二选择查询
          console.log(a1.attr("sleep"))
          if(a1[0].hasAttribute("sleep") && a1.attr("sleep")!="undefined") {
              data1[i] = {"type": p1.eq(i).attr("sleep1"), "operation": c1.eq(i).text(), "value": a1.eq(i).attr("sleep")}
          }else if(a1.attr("sleep")=="undefined"){
              data1[i] = {"type": p1.eq(i).attr("sleep1"), "operation": c1.eq(i).text(), "value": a1.eq(i).text()}
          }
      }
   /*var attribute = [];
   if(p_shuxing!=""){
    attribute[0] = p_shuxing;
   }*/
   if($("#home").css("display")=="block"){
     var data_ = {"pageNum": index+1,"pageSize": 12,"name":p_name,'aaa001':$('#p_shi').val(),
        "year":p_year,"cardNumber":p_number,"attribute":p_shuxing,"status":p_status,
        "norm":p_biaozhun,"q":p_qv,"x":p_xiang,"c":p_cun,"condition":data1};
        console.log(JSON.stringify(data_))
   }else{
      var data_ = {"pageNum": index+1,"pageSize": 12,"name":p_name,'aaa001':$('#p_shi').val(),
        "year":p_year,"cardNumber":p_number,"attribute":p_shuxing,"status":p_status,
        "norm":p_biaozhun,"q":p_qv,"x":p_xiang,"c":p_cun,"condition":data};
       // console.log(JSON.stringify(data_))
   }
    $.ajax({
        url:url + "table/pkh/condition/query",
        type:"post",
        data:JSON.stringify(data_),
        beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              ShowLoading();
        },
        dataType:"json",
        contentType:"application/json",
        success:function (data) {
        if (data.code == 2000){
                    showAllPoorInfo( index,formInfos,data);
                }
        },
        complete:function(){
            HideLoading();
        },
        error:function () {
        }
    })
}

function showPage(obj,data){
$("#Pagination").pagination(data,{
        callback:PageCallback,         //pageCallback() 为翻页调用函数
        items_per_page:12,                //每页显示条目数
        num_display_entries: 4,                //连续分页显示分页条目数
        num_edge_entries: 1          //两侧显示的首尾分页的条目数
   });
}

//ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
    page_init(page_index);      //第一页为0
}

// 实现到人指标 高级查询下拉框选择联动
        addressInit('cmbProvince', 'cmbCity', 'cmbArea');
		$("#cmbArea").change(function(){
        //  if(("#cmbArea").val()!='undefined'){
			   $("#input").val($("#cmbArea").find("option:selected").text());
        //  }else{
        //     $("#input").val($("#cmbArea").val());
        //  }
		})
		var n1 = 0;
        var flags=true;
		$("#add").on("click",function(){
            var province = $("#cmbProvince");
			var city = $("#cmbCity");
			var area = $("#cmbArea");
            var input = $("#input");
            var flag = 1;
            if(province.find("option:selected").text()!="全部"){
                    $("#show").show();
                   for(let k1 = 0; k1 <=n1; k1++){
                      // alert($("#show tbody tr:eq("+k1+") td:nth-child(2)").text())
                      if(province.find("option:selected").text()==$("#show tbody tr:eq("+k1+") td:nth-child(2)").text()&&city.find("option:selected").text()==$("#show tbody tr:eq("+k1+") td:nth-child(3)").text()
                      &&input.val()==$("#show tbody tr:eq("+k1+") td:nth-child(4)").text()){
                            flag = 0;
                            return ;
                      }
                  }
                  if(flag==1){
                        var i = 1;
                       // var $td = $("#show tr:last").clone();       //增加一行,克隆第一个对象
                        var $td = `<tr>
								        <td class="td"></td>
										<td class="p"></td>
										<td class="c"></td>
										<td class="a"></td>
								   </tr>
								   `;       //增加一行,克隆第一个对象
                        if(flags){
                            $("#show").append($td).children().children().last().remove();
                            flags=false;
                        }else{
                            $("#show").append($td);
                        }
                        $(".td").each(function(){
                        var str =`<input class="radio" name="list" type="radio"/>`;
                            $(this).html(str+i++);                  //增加一行后重新更新序号1,2,3......
                            }
                        )
                        n1++;

                        if(i<17&&area.val()!='undefined'&&area.val()!=''&&area.val()!=null){
                                $("#show tbody tr:eq("+n1+") td:eq(1) ").text(province.find("option:selected").text());
                                $("#show tbody tr:eq("+n1+") td:eq(1) ").attr("sleep",province.val());
                                $("#show tbody tr:eq("+n1+") td:eq(2) ").text(city.val());
                                $("#show tbody tr:eq("+n1+") td:eq(3) ").text(area.find("option:selected").text());
                                $("#show tbody tr:eq("+n1+") td:eq(3) ").attr("sleep",area.val());
                        }else{
                            $("#show tbody tr:eq("+n1+") td:eq(1) ").text(province.find("option:selected").text());
                            $("#show tbody tr:eq("+n1+") td:eq(1) ").attr("sleep",province.val());
                            $("#show tbody tr:eq("+n1+") td:eq(2) ").text(city.val());
                            $("#show tbody tr:eq("+n1+") td:eq(3) ").text(input.val());
                            $("#show tbody tr:eq("+n1+") td:eq(3) ").attr("sleep",input.val());
                        }

                }
            }
		})
		$("#empty").on("click",function(){
		    $("#show tr:last").siblings().remove();
			 var str1 =`  <tr>
			   <th>序号</th>
			   <th>指标类型</th>
			   <th>操作符</th>
			   <th>指标值</th>
		   </tr>

		   `;
		   $("#show tr:last").remove();
		   $("#show tbody").html(str1);
		   n1 =0;
		})
		$("#delete").on("click",function(){
			$(':radio[name="list"]:checked').parent().parent().remove();
			 --n1;
			var i = 1;
			$(".td").each(function(){
		    	var str =`<input class="radio" name="list" type="radio"/>`;
				$(this).html(str+i++);
			})
		})
// 实现到户 高级查询下拉框选择联动
        addressInit1('cmbProvince1', 'cmbCity1', 'cmbArea1');
		$("#cmbArea1").change(function(){
			   $("#input1").val($("#cmbArea1").find("option:selected").text());
        })
        var n = 0;
		var flags2=true;
		$("body").on("click","#add1",function(){
		    var province1 = $("#cmbProvince1");
            //  alert(province1.val())
			var city1 = $("#cmbCity1");
			var area1 = $("#cmbArea1");
            var input1 = $("#input1");
            var flag  = 1;
            if(province1.find("option:selected").text()!="全部"){
                    $("#show1").show();
                   for(let k = 0; k <=n; k++){
                      if(province1.find("option:selected").text()==$("#show1 tbody tr:eq("+k+") td:nth-child(2)").text()&&city1.val()==$("#show1 tbody tr:eq("+k+") td:nth-child(3)").text()
                      &&input1.val()==$("#show1 tbody tr:eq("+k+") td:nth-child(4)").text()){
                            flag = 0;
                            return ;
                      }
                   }
                   if(flag==1){
                            var j = 1;
                            var $td = `<tr>
									        <td class="td1"></td>
											<td class="p1"></td>
											<td class="c1"></td>
											<td class="a1"></td>
									   </tr>`;       //增加一行,克隆第一个对象
                        	//$("#show tr:last").prev().hide();
                            //$("#show tr:last").siblings().show();
                           if(flags2){
                               $("#show1").append($td).children().children().last().remove();
                               flags2=false;
                           }else{
                               $("#show1").append($td);
                           }
                            $(".td1").each(function(){
                            var str =`<input class="radio" name="list" type="radio"/>`;
                                $(this).html(str+j++);                  //增加一行后重新更新序号1,2,3......
                                }
                            )
                            n++;
                            if(j<17&&flag==1){
                                    $("#show1 tbody tr:eq("+n+") td:eq(1)").text(province1.find("option:selected").text());
                                    $("#show1 tbody tr:eq("+n+") td:eq(1) ").attr("sleep1",province1.val());
                                    $("#show1 tbody tr:eq("+n+") td:eq(2)").text(city1.val());
                                    $("#show tbody tr:eq("+n+") td:eq(3) ").text(area1.find("option:selected").text());
                                    $("#show1 tbody tr:eq("+n+") td:eq(3) ").attr("sleep",area1.val());
                                    $("#show1 tbody tr:eq("+n+") td:eq(3)").text(input1.val());
                                }else{
                                $("#show1 tbody tr:eq("+n+") td:eq(1) ").text(province1.find("option:selected").text());
                                $("#show1 tbody tr:eq("+n+") td:eq(1) ").attr("sleep",province1.val());
                                $("#show1 tbody tr:eq("+n+") td:eq(2) ").text(city1.val());
                                $("#show1 tbody tr:eq("+n+") td:eq(3) ").text(input1.val());
                                $("#show1 tbody tr:eq("+n+") td:eq(3) ").attr("sleep",input1.val());
                            }
                // $("#show tr:last").find(":input").val('');   //将尾行元素克隆来的保存的值清空
             }
            }
		})
		$("#empty1").on("click",function(){
		    $("#show1 tr:last").siblings().remove();
			 var str1 =`  <tr>
			   <th>序号</th>
			   <th>指标类型</th>
			   <th>操作符</th>
			   <th>指标值</th>
		   </tr>
		   `;
		   $("#show1 tr:last").remove();
		   $("#show1 tbody").html(str1);
           // $("#show tr:last").hide();
		   n = 0;
		})
		$("#delete1").on("click",function(){
			$(':radio[name="list"]:checked').parent().parent().remove();
			 --n;
			var j = 1;
			$(".td1").each(function(){
		    var str =`<input class="radio" name="list" type="radio"/>`;
			$(this).html(str+j++);
			}
			)
		})

/************查询***************/
var p_status=[];
var p_shuxing=[];
$(".btn_orange1").on("click",function(){
    p_status=[];
    p_shuxing=[]
    $("#formSubmit2").empty();
 var p_name=$("#p_name").val();
 if(p_name==""||p_name==null){
     p_name=null;
 }
    let propertys=$(".shuxing dl dt.active");
    let statuss=$(".tuopin dl dt.active");
    getValue(propertys,p_shuxing);
    getValue(statuss,p_status);
    function getValue(obj,arr){
        // let arr=[];
        for(let i=0;i<obj.length;i++){
            arr.push(obj.eq(i).attr("sleep"));
        }
        return arr;
    }
    console.log(p_status)
/*for(let i = 0; i < $(".tuopin dl dt.active").length; i++){
	p_status[i]=$(".active").eq(i).attr('sleep');
}
for(let i = 0; i < $(".shuxing dl dt.active").length; i++){
    p_shuxing[i]=$(".active").eq(i).attr('sleep');
}*/
    var p_year=$("#p_year").val();
    var p_number=$("#p_number").val();
    // var p_shuxing=$("#p_shuxing").val();
    //var p_status=$(".active").attr("sleep");  //状态
    var p_biaozhun=$("#p_biaozhun").val(); //标准
    var p_xiang=$("#p_x").val();  //乡
    var p_cun =$("#p_cun").val();
    var p_qv=$("#p_qv").val();  //区
//  if(p_qv==""){
//      p_qv="610100000000";
//  }

        var p = [];
        var c = [];
        var a = [];
        p = $(".p");
        c = $(".c");
        a = $(".a");

        var p1 = [];
        var c1 = [];
        var a1 = [];
        p1 = $(".p1");
        c1 = $(".c1");
        a1 = $(".a1");
        var data = [];
        var data1 = [];
        for(let i = 0; i < $(".p").length; i++){ //指标一选择查询
            if(a[0].hasAttribute("sleep") && a.attr("sleep")!="请选择") {
                data[i] = {"type": p.eq(i).attr("sleep"), "operation": c.eq(i).text(), "value": a.eq(i).attr("sleep")}
            }else if(a.attr("sleep")=="请选择"){
                data[i]={"type":p.eq(i).attr("sleep"),"operation":c.eq(i).text(),"value":a.eq(i).text()}
            }
        }
        for(let i = 0; i < $(".p1").length; i++){ //指标二选择查询
            if(a1[0].hasAttribute("sleep") && a1.eq(i).attr("sleep")!="undefined" && a1.eq(i).attr("sleep")!=undefined) {
                data1[i] = {"type": p1.eq(i).attr("sleep1"), "operation": c1.eq(i).text(), "value": a1.eq(i).attr("sleep")}
            }else if(a1.eq(i).attr("sleep")=="undefined" || a1.eq(i).attr("sleep")==undefined){
                data1[i] = {"type": p1.eq(i).attr("sleep1"), "operation": c1.eq(i).text(), "value": a1.eq(i).text()}
            }
        }

   if($("#home").css("display")=="block"){
     var data_ = {"pageNum": 1,"pageSize": 12,"name":p_name,'aaa001':$('#p_shi').val(),
        "year":p_year,"cardNumber":p_number,"attribute":p_shuxing,"status":p_status,
        "norm":p_biaozhun,"q":p_qv,"x":p_xiang,"c":p_cun,"condition":data1};
   }else{
      var data_ = {"pageNum": 1,"pageSize": 12,"name":p_name,'aaa001':$('#p_shi').val(),
        "year":p_year,"cardNumber":p_number,"attribute":p_shuxing,"status":p_status,
        "norm":p_biaozhun,"q":p_qv,"x":p_xiang,"c":p_cun,"condition":data};
   }
    $.ajax({
            url:url + "table/pkh/condition/query",
            type:"post",
            data:JSON.stringify(data_),
            beforeSend:function(request){
	              request.setRequestHeader("Authorization",token);
	              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	              ShowLoading();
	        },
            dataType:"json",
            contentType:"application/json",
            success:function (data) {
            if (data.code == 2000){
                        showAllPoorInfo( 0,formInfos,data);
                        showPage($(".searchPage"),data.data.total);
                        page.html(Math.ceil(data.data.total/12));
                        totle=data.data.navigatePages;
                        $("#total").html("总户数："+data.data.total  + "&nbsp;&nbsp;&nbsp;总人数："+ data.data.navigatePages);
                    }else if(data.code == 1005){
						var str=`<tr>
				              <th>序号</th>
				              <th>户编号</th>
				              <th>户主姓名</th>
				              <th>户主证件号码</th>
				              <th>脱贫状态</th>
				              <th>贫困户属性</th>
				              <th>家庭成员人数</th>
				              <th>首次识别时间</th>
				              <th>操作</th>
				          </tr>
						<tr><td colspan='9' style="font-size:30px;color:#767272;">查无数据</td></tr>`
						formInfos.html(str)
						$("#total").empty();
					    $(".allPage").empty();
					}else if(data.code == 1009){
                        alert(data.message);
                        $("#total").empty();
					    $(".allPage").empty();
                    }else if(data.code == 4000){
                        alert(data.message);
                        $("#total").empty();
					    $(".allPage").empty();
                    }
            },
            complete:function(){
                HideLoading();
            },
            error:function () {
            }
        })
    });


/*导出*/
$("body").on("click","#dataImport",function(){
	p_status=[];
    p_shuxing=[];
    //$("#formSubmit2").empty();
	var p_name=$("#p_name").val();
	 if(p_name==""||p_name==null){
	     p_name=null;
	 }
    let propertys=$(".shuxing dl dt.active");
    let statuss=$(".tuopin dl dt.active");
    getValue(propertys,p_shuxing);
    getValue(statuss,p_status);
    function getValue(obj,arr){
        for(let i=0;i<obj.length;i++){
            arr.push(obj.eq(i).attr("sleep"));
        }
        return arr;
    }

    var p_year=$("#p_year").val();
    var p_number=$("#p_number").val();
    var p_biaozhun=$("#p_biaozhun").val(); //标准
    var p_xiang=$("#p_x").val();  //乡
    var p_cun =$("#p_cun").val();
    var p_qv=$("#p_qv").val();  //区

        var p = [];
        var c = [];
        var a = [];
        p = $(".p");
        c = $(".c");
        a = $(".a");

        var p1 = [];
        var c1 = [];
        var a1 = [];
        p1 = $(".p1");
        c1 = $(".c1");
        a1 = $(".a1");
        var data = [];
        var data1 = [];
        for(let i = 0; i < $(".p").length; i++){ //指标一选择查询
            if(a[0].hasAttribute("sleep") && a.attr("sleep")!="请选择") {
                data[i] = {"type": p.eq(i).attr("sleep"), "operation": c.eq(i).text(), "value": a.eq(i).attr("sleep")}
            }else if(a.attr("sleep")=="请选择"){
                data[i]={"type":p.eq(i).attr("sleep"),"operation":c.eq(i).text(),"value":a.eq(i).text()}
            }
        }
        for(let i = 0; i < $(".p1").length; i++){ //指标二选择查询
            if(a1[0].hasAttribute("sleep") && a1.eq(i).attr("sleep")!="undefined" && a1.eq(i).attr("sleep")!=undefined) {
                data1[i] = {"type": p1.eq(i).attr("sleep1"), "operation": c1.eq(i).text(), "value": a1.eq(i).attr("sleep")}
            }else if(a1.eq(i).attr("sleep")=="undefined" || a1.eq(i).attr("sleep")==undefined){
                data1[i] = {"type": p1.eq(i).attr("sleep1"), "operation": c1.eq(i).text(), "value": a1.eq(i).text()}
            }
        }

   if($("#home").css("display")=="block"){
     var data_ = {"pageNum": 1,"pageSize": totle,"name":p_name,
        "year":p_year,"cardNumber":p_number,"attribute":p_shuxing,"status":p_status,
        "norm":p_biaozhun,"q":p_qv,"x":p_xiang,"c":p_cun,"condition":data1};
   }else{
      var data_ = {"pageNum": 1,"pageSize": totle,"name":p_name,
        "year":p_year,"cardNumber":p_number,"attribute":p_shuxing,"status":p_status,
        "norm":p_biaozhun,"q":p_qv,"x":p_xiang,"c":p_cun,"condition":data};
   }
	$.ajax({
        url: url + "table/pkh/export/exist/query",
        data:JSON.stringify(data_),
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            ShowLoading();
        },
        method: "post",
        dataType: "json",
        contentType:"application/json",
        success: function(data){
        if (data.code == 2000){
			/*去空*/
			var data={};
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
			let aa=pinjie(newmap)
			let b=aa.substring(0,aa.length-1);
			let cc=url+"table/pkh/export/query?"+b;
			console.log(cc);
            window.location.href=cc;
      		}
        },
        complete:function(){
            HideLoading();
        }
    })
    })

	$(".btn_blue1").click(function(){
//      $("#p_qv").val("");
//      $("#p_x").val("");
//      $("#p_cun").val("");
        $("#p_year").val("201808");
        $("#p_name").val("");
        $("#p_number").val("");
        $("#p_biaozhun").val("");
        $(".shuxing dt").removeClass("active");
        $(".shuxing dt").eq(1).addClass("active");
        $(".tuopin dt").removeClass("active");
        $(".tuopin dt").eq(1).addClass("active");
    })
	function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
})
