$(document).ready(function(){
	var p_year=$("#p_year");
    var p_shuxing=$("#p_shuxing");//县属性
    var p_zhaimao=$("#p_zhaimao"); //是否摘帽
    var p_shi=$("#p_shi");  //xianshi
    var p_qv=$("#p_qv");  //县区
    var formInfos = $('#formSubmit2')
    var page = $('.allPage');
    let token=$.cookie("token");
    var datas={};
   //var options=$("#p_year option:selected")
    p_year.val(201808)
    let tokenCon=$.cookie("loginMessage");
    let aa=JSON.parse(tokenCon);
    if(aa.aar008=="610100000000"){
        datas={'aar040':201808}
        console.log(datas)
    }else if(aa.aar008=="619900000000"){
    	datas={'aar040':201808,"aae001":619900000000}
        console.log(datas)
    }else{
        datas={'aar040':201808,"aae001":aa.aar008}
        console.log(datas)
    }
    $.ajax({
        url: url + "fpdx/poorCounty/query",
        data:datas,
        beforeSend:function(request){
	          request.setRequestHeader("Authorization",token);
	          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	          ShowLoading();
        },
        method: "get",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
                showAllFundingInfo(0, formInfos,data);
                init_Shi()
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


  function showAllFundingInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
              <th>序号</th>            
              <th>行政县名称</th>
              <th>贫困县编号</th>
              <th>县属性</th>
              <th>是否摘帽</th>
			  <th style="width: 200px">操作</th>
          </tr>`;
          obj.html(str);

   for(let i = 0; i < data.data.length; i++ ){
   	
    var str1=`  
     	<tr>
	          <td>${index*12+i+1}</td>
	          
	          <td>${data.data[i].AAR009}</td>
	          <td>${data.data[i].AAE001}</td>
	          <td>${data.data[i].AAE002}</td>`
    		  if (data.data[i].AAE100=='0') {
    		  	str1+=`	<td>否</td>`
    		  } else{
    		  	str1+=`	<td>是</td>`
    		  }
	          
	        str1+=`<td>
	              <a href="showDetailsPoveryCountries.html?value=${data.data[i].AAE001}&time=${data.data[i].AAR040}">详情</a>
	              <a href="revisePoveryCountries.html?value=${data.data[i].AAE001}&time=${data.data[i].AAR040}">修改</a>
	              
	          </td>
        </tr>`;
           obj.html(function (i, value) {
                return value + str1;
            });
        $("td").each(function(){		    
		    if( $(this).text() == 'null'){
		         $(this).text('');
		    }
		})  
		
    }
  }

  $(".btn_orange1").on("click",function(){
  	
        var p_name=$("#p_name").val();
        if(p_name==""||p_name==null){
            p_name=null;
        }       
   		var p_year=$("#p_year");
	    var p_shuxing=$("#p_shuxing");//县属性
	    var p_zhaimao=$("#p_zhaimao"); //是否摘帽
	    var p_qv=$("#p_qv");  //县区
	    
        $.ajax({
                url:url + "fpdx/poorCounty/query",
                type:"get",
                data:{'aar040':p_year.val(),'aaa011':p_shi.val(),"aae001":p_qv.val(),"aae002": p_shuxing.val(),"aae100": p_zhaimao.val()},
                beforeSend:function(request){
			          request.setRequestHeader("Authorization",token);
			          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
			          ShowLoading();
		        },
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                        showAllFundingInfo(0,formInfos,data);
                        $("#total").text("贫困县(涉贫县)总数："+data.data.length)
                        //showPage($(".searchPage"),data.data.data.total);
                        //page.html(Math.ceil(data.data.data.total/12));
                        }else if(data.message == '查无信息'){
							var str=`<tr>
					              <th>序号</th>            
					              <th>行政县名称</th>
					              <th>贫困县编号</th>
					              <th>县属性</th>
					              <th>是否摘帽</th>
								  <th style="width: 200px">操作</th>
					          </tr>
							<tr><td colspan='6' style="font-size:30px;color:#767272;">查无数据</td></tr>`
							formInfos.html(str)
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

//导出
$("body").on("click",".marginR",function(){
	$.ajax({
        url: url + "fpdx/excel/poorCountyExport/check",  
        data:{},
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        method: "get",
        dataType: "json",           
        success: function(data){
        if (data.code == 2000){
			var p_year=$("#p_year");
			data = {'aar040':p_year.val()}
	
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
				let cc=url+"fpdx/poorCountyExport/query?"+b;
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
})

// 实现到人指标 高级查询下拉框选择联动
        addressInit('cmbProvince', 'cmbCity', 'cmbArea');    
		$("#cmbArea").change(function(){
			   $("#input").val($("#cmbArea").val());  
			})
			var n = 0; 
		$("#add").on("click",function(){
                var province = $("#cmbProvince");
                var city = $("#cmbCity");
                var area = $("#cmbArea");
                var input = $("#input");
               if(province.val()!="全部"){
                    $("#show").show();
                    var i = 1;
                    var $td = $("#show tr:last").clone();       //增加一行,克隆第一个对象
                // $("#show tr:last").prev().hide();
                    //$("#show tr:last").siblings().show();
                    $("#show").append($td);
                    $(".td").each(function(){    
                    var str =`<input class="radio" name="list" type="radio"/>`;
                        $(this).html(str+i++);                  //增加一行后重新更新序号1,2,3......
                        }
                    )
                    n++;
                    if(i<17){
                            $("#show tbody tr:eq("+n+") td:eq(1) input").val(province.val());
                            $("#show tbody tr:eq("+n+") td:eq(2) input").val(city.val());
                            $("#show tbody tr:eq("+n+") td:eq(3) input").val(input.val());
                        }else{
                        alert("筛选条件过多，请分开查询");
                    }
            }
		  // $("#show tr:last").find(":input").val('');   //将尾行元素克隆来的保存的值清空
		})
		$("#empty").on("click",function(){
		    $("#show tr:last").siblings().remove();
			 var str1 =`  <tr>
			   <th>序号</th>
			   <th>指标类型</th>
			   <th>操作符</th>
			   <th>指标值</th>
		   </tr>
		   <tr>
		        <td class="td"></td>
				<td class="p"><input type="" name=""></td>
				<td class="c"><input type="" name=""></td>
				<td class="a"><input type="" name=""></td>
		   </tr>`;
		   $("#show tr:last").remove();
		   $("#show tbody").html(str1);
           // $("#show tr:last").hide();
		   n =0;   
		}) 
		$("#delete").on("click",function(){
			$(':radio[name="list"]:checked').parent().parent().remove();
			 --n;
			var i = 1; 
			$(".td").each(function(){    
		    var str =`<input class="radio" name="list" type="radio"/>`;
			$(this).html(str+i++);   		
			}
			)
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
//      for(let i=0;i<arr.length;i++){
//          if(arr[i].number==aa.aar008){
//              $("#p_shi").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>");
//          }
//      }
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

        $.ajax({
            url: url + "fpdx/poorCounty/query",
            data:datas,
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    $("#total").text("贫困县(涉贫县)总数："+data.data.length)
                    //showAllFundingInfo(0, formInfos,data);
                    init_County()
                }else if(data.code==1005){
                    alert(data.message)
                }else if(data.code==1009){
                    alert(data.message)
                }else if(data.code==4000){
                    alert(data.message)
                }

            }
        })
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
            //console.log(arr[i].number+"---"+aa.aaa113);
            if(arr[i].number==aa.aar008){
                $("#p_qv").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
                $("#p_shi").attr("disabled","disabled");
            }
        }
//      if(aa.aar008.substring(8)=="00000000"){
//           datas={'aar040':201808,"aae001":p_shi.val()}
//      }else{
//           datas={'aar040':201808,"aae001":p_qv.val()}
//      }
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
        $.ajax({
            url: url + "fpdx/poorCounty/query",
            data:datas,
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    $("#total").text("贫困县(涉贫县)总数："+data.data.length)
                    //showAllFundingInfo(0, formInfos,data);
                }else if(data.code==1005){
                    alert(data.message)
                }else if(data.code==1009){
                    alert(data.message)
                }else if(data.code==4000){
                    alert(data.message)
                }

            }
        })
    }
    
    function ShowLoading() {
	    $(".spinner").show();
	}
	function HideLoading() {
	    $(".spinner").hide();
	}
    
})
