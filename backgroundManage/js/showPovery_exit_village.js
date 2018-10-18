  $(document).ready(function(){
  	//var  url="http://192.168.1.135:8080/"
  	   let token=$.cookie("token");
  	   var totle;
       var formInfos = $('#table')
       var page = $(".allPage");
       var city = $("#country");
       var town = $("#town");
       var area = $("#village");
       var p_shi = $("#p_shi");
       var str = `<option value="">县（区）</option>`;
       city.html(str);
       var str1 = `<option value="">乡（镇）</option>`;
       town.html(str1);
       var str2 = `<option value="">村</option>`;
       area.html(str2);
       let tokenCon=$.cookie("loginMessage");
	    let aa=JSON.parse(tokenCon);
	    if(aa.aar008=="610100000000"){
	        datas={"page_index": 1,"page_size": 10,"aar040": 201808}
	    }else if(aa.aar008=="619900000000"){
	    		datas={"page_index": 1,"page_size": 10,"aar040": 201808,"aaa001":619900000000}
	    }else if(aa.aar008.substring(6)=='000000'){
	        datas={"page_index": 1,"page_size": 10,"aar040": 201808,"aar001":aa.aar008}
	    }else{
	        datas={"page_index": 1,"page_size": 10,"aar040": 201808,"aar001":aa.aar008}
	    }
       $.ajax({
              url: url + "tpjg/czbquery",
              //data:{"page_index":1,"page_size": 10,"aar040": 201808},
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
                      showAllPoorInfo( 0,formInfos,data);
                      init_Shi();
                      if(data.data.length>0){
								          showPage($(".searchPage"),data.data[data.data.length-1].total);
								          page.html("共"+Math.ceil(data.data[data.data.length-1].total/10)+"页");
								          $("#total").html("总数："+data.data[data.data.length-1].total);
								          totle=data.data[data.data.length-1].total;
								    	}
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

        if(aa.aar008==619900000000){
        	$("#p_shi").empty().append("<option value='619900000000'>西咸新区</option>").attr("disabled","disabled");
        }
    }
	$("#p_shi").change(function(){
	    var opt=$("#p_shi");
	    //var opt1 = $("#p_qv");
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
     function init_County(){
      var opt=$("#p_shi");
      var county = $("#country");
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
                   showCountyInfo( county,data);
                }
              }

            })
    }


    function  showCountyInfo(obj,data){
     let arr=[];
     obj.empty();
     var str = `<option value="">县（区）</option>`;
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
            $("#country").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
            $("#p_shi").attr("disabled","disabled");
            var opt=$("#country");
            var opt1 = $("#town");
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

   $("body").on("change","#country",function(){
    var opt=$("#country");
    var opt1 = $("#town");
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
    let arr=[];
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
    if(aa.aar008.substring(6)!="000000"){
        for(let i=0;i<arr.length;i++){
            if(arr[i].number==aa.aar008){
                $("#town").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
            }
        }
        let p_qv=$("#country").val();  //区
        //let p_xiang=$("#p_x").val();  //乡
        var town = $("#town").val();
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
                    //showVillageInfo(vill,data);
                }
            }
        })
    }
 }

    function showAllPoorInfo(index,obj,data){
        obj.empty();
        var str = `
         <tr>
              <td>序号</td>
              <td>贫困村名称</td>
              <td>贫困村所在地</td>
              <td>贫困发生率（30分）</td>
              <td>人均可支配收入（20分）</td>
              <td>有集体经济或合作组织（10分）</td>
              <td>行政村通沥青（水泥）路（10分）</td>
              <td>自来水普及率（10分）</td>
              <td>电力入户率100%（10分）</td>
              <td>是否有标准化村卫生室(10)</td>
              <td>指标得分</td>
              <td>是否达标</td>
            </tr>`
            obj.html(str);

     for(let i = 0; i < data.data.length-1; i++ ){
      var str1=`
       <tr>
                <td>${index*10+1+i}</td>
                <td><a href="showDetailsFunding.html?value=${data.data[i].villcode}&time=${201808}" style='color:#09c;background:none;cus;cursor: pointer;width:100px;'>${data.data[i].villName}</a></td>
                <td>${data.data[i].address}</th>
                <td>${data.data[i].aac331}</td>
                <td>${data.data[i].aae113}</td>
                <td>${data.data[i].aad371}</td>
                <td>${data.data[i].aad328}</td>
                <td>${data.data[i].aac312}</td>
                <td>${data.data[i].aac313}</td>
                <td>${data.data[i].aad391}</td>
                <td>${data.data[i].account}</td>
                <td>${data.data[i].isReach}</td>
            </tr>`;
             obj.html(function (i, value) {
                  return value + str1;
              });
     	}
    	if(data.data.length>0){
          var str = data.data[data.data.length-1].allVill;
          var str1 = data.data[data.data.length-1].noVill;
          var str2 = data.data[data.data.length-1].isVill;
          isReach = parseFloat(Number(str2)/Number(str)*100).toFixed(2);
          noReach = parseFloat(Number(str1)/Number(str)*100).toFixed(2);
          $("#allVillage").html(str);
          $("#isReachVillage").html(str2);
          $("#noReachVillage").html(str1);
          $("#isReachP").html(isReach+"%");
          $("#noReachP").html(noReach+"%");
          //showPage($(".searchPage"),data.data[data.data.length-1].total);
          //page.html("共"+Math.ceil(data.data[data.data.length-1].total/10)+"页");
          //$("#total").html("总数："+data.data[data.data.length-1].total);
          //totle=data.data[data.data.length-1].total;

    	}
    }


    var  indexs = 1;

    function page_init(index) {
    	    indexs = index + 1;
          var income = $("#income");
          var isReach = $("#isReach");
          var water = $("#water");
          var soreSection = $("#soreSection");
          var care = $("#care");
          var line = $("#line");
          var poor = $("#poor");
          var electri = $("#electri");
          var organization = $("#organization");
          var town = $("#town");  //乡
          var country=$("#country");  //区
          var aar001;
            if( town.val()!=""){
  			  			 aar001=$('#town').val()
            }else if(town.val()==''&&country.val()!=''){
                 aar001=$('#country').val()
  		      }
          $.ajax({
                  url:url + "tpjg/czbquery",
                  type:"post",
                  data:{"page_index": index+1,"page_size": 10,'aar040':201808,'aaa001':$('#p_shi').val(),'aar001':aar001,'isReach':isReach.val(),'scoreSection':soreSection.val(),'one':poor.val(),'two':income.val(),
                   'three':organization.val(), 'four':line.val(),'five':water.val(),'six':electri.val(),'seven':care.val()},
                  beforeSend:function(request){
                      request.setRequestHeader("Authorization",token);
                      request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                      ShowLoading();
                  },
                  dataType:"json",
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
               items_per_page:10,                //每页显示条目数
               num_display_entries: 4,                //连续分页显示分页条目数
               num_edge_entries: 1          //两侧显示的首尾分页的条目数
          });


  }

      //ajax分页请求,page_index :页码
  function PageCallback(page_index,jq){
   //   console.log('das');
      page_init(page_index);      //第一页为0
  }

   $(".btn_orange1").on("click",function(){
          //  var p_name=$("#p_name").val();
          //  if(p_name==""||p_name==null){
          //      p_name=null;
          //  }
          var income = $("#income");
          var isReach = $("#isReach");
          var water = $("#water");
          var soreSection = $("#soreSection");
          var care = $("#care");
          var line = $("#line");
          var poor = $("#poor");
          var electri = $("#electri");
          var organization = $("#organization");
          var town = $("#town");  //乡
          var country=$("#country");
          var aar001;
          if(country.val()=="610112000000"||country.val()=="610104000000"||country.val()=="610113000000"||country.val()=="610103000000"||country.val()=="610102000000"){
      			var str=`<div align="center" style="margin-top:40px;margin-bottom:60px;font-size:32px;color:#767272;">查无数据</div>`
                  $("#total").empty();
                  $(".allPage").empty();
                  showPage($(".searchPage"),0);
                  formInfos.css("width","100%");
                  formInfos.html(str);
                  $("#allVillage").html("--");
                  $("#isReachVillage").html("--");
                  $("#noReachVillage").html("--");
                  $("#isReachP").html("--");
                  $("#noReachP").html("--");
              } else{
                  if( town.val()!=""){
			  			  			 aar001=$('#town').val()
			            }else if(town.val()==''&&country.val()!=''){
			                 aar001=$('#country').val()
			  		      }

                      $.ajax({
                          url:url + "tpjg/czbquery",
                          type:"post",
                          data:{"page_index":1,"page_size": 10,'aar040':201808,'aaa001':$('#p_shi').val(),'aar001':aar001,'isReach':isReach.val(),'scoreSection':soreSection.val(),'one':poor.val(),'two':income.val(),
                   				'three':organization.val(), 'four':line.val(),'five':water.val(),'six':electri.val(),'seven':care.val()},
                          beforeSend:function(request){
	                          request.setRequestHeader("Authorization",token);
	                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
	                      		ShowLoading();
                          },
                          dataType:"json",
                          success:function (data) {
                          if (data.code == 2000){
                              showAllPoorInfo(0, formInfos,data);
                              formInfos.css("width","1600px");
                             if(data.data.length>0){
											          showPage($(".searchPage"),data.data[data.data.length-1].total);
											          page.html("共"+Math.ceil(data.data[data.data.length-1].total/10)+"页");
											          $("#total").html("总数："+data.data[data.data.length-1].total);
											          //totle=data.data[data.data.length-1].total;
											    	}
                          }else if(data.code == 1005){
  										var str=`<tr>
  							             <td>序号</td>
  							            <td>贫困村名称</td>
  							            <td>贫困村所在地</td>
  							            <td>贫困发生率（30分）</td>
  							            <td>人均可支配收入（20分）</td>
  							            <td>有集体经济或合作组织（10分）</td>
  							            <td>行政村通沥青（水泥）路（10分）</td>
  							            <td>自来水普及率（10分）</td>
  							            <td>电力入户率100%（10分）</td>
  							            <td>是否有标准化村卫生室(10)</td>
  							            <td>指标得分</td>
  							            <td>是否达标</td>
  							          </tr>
  										<tr><td colspan='12' style="font-size:30px;color:#767272;">查无数据</td></tr>`
  										formInfos.html(str)
  										$("#total").empty();
  									    $(".allPage").empty();
  									}else if(data.code==1009){
							  			alert(data.message)
							  		}else if(data.code==4000){
							  			alert(data.message)
							  		}
                  },
                  complete:function(){
									     HideLoading();
									},
                  error:function () {
                  }
              })
          }
      });
  /*导出*/
 var data_={};
  $("body").on("click","#dataImport",function(){
  	$.ajax({
          url: url + "tpjg/export/exist/czbquery",
          data:{},
          beforeSend:function(request){
              request.setRequestHeader("Authorization",token);
              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
              ShowLoading();
          },
          method: "get",
          dataType: "json",
          success: function(data){
          if (data.code == 2000){
      	  var income = $("#income");
          var isReach = $("#inReach");
          var water = $("#water");
          var soreSection = $("#soreSection");
          var care = $("#care");
          var line = $("#line");
          var poor = $("#poor");
          var electri = $("#electri");
          var organization = $("#organization");
          var town = $("#town");  //乡
          var country=$("#country");
          if(country.val()=="610112000000"||country.val()=="610104000000"||country.val()=="610113000000"||country.val()=="610103000000"||country.val()=="610102000000"){
             alert("数据为空,无法导出");
              } else{
                  if( town.val()!=""){
                       data_= {"page_index": 1,"page_size": totle,'isReach':isReach.val(),'aar040':201808,'aaa001':$('#p_shi').val(),'aar001':town.val(),'isReach':isReach.val(),'scoreSection':soreSection.val(),'one':poor.val(),'two':income.val(),
                          'three':organization.val(), 'four':line.val(),'five':water.val(),'six':electri.val(),'seven':care.val()};
                  }else if(town.val()==''&&country.val()!=''){
                       data_= {"page_index": 1,"page_size": totle,'isReach':isReach.val(),'aar040':201808,'aaa001':$('#p_shi').val(),'aar001':country.val(),'isReach':isReach.val(),'scoreSection':soreSection.val(),'one':poor.val(),'two':income.val(),
                      'three':organization.val(), 'four':line.val(),'five':water.val(),'six':electri.val(),'seven':care.val()};                  		
                  }else if(town.val()==''&&country.val()==''){
                  		data_= {"page_index": 1,"page_size": totle,'isReach':isReach.val(),'aar040':201808,'aaa001':$('#p_shi').val(),'isReach':isReach.val(),'scoreSection':soreSection.val(),'one':poor.val(),'two':income.val(),
                      'three':organization.val(), 'four':line.val(),'five':water.val(),'six':electri.val(),'seven':care.val()};                  		
                  }

              function qukong(obj){
                  for(var key in obj){
                      if(obj[key]==null || obj[key]=='' || obj[key]=="null"){
                          console.log(obj[key]);
                          delete obj[key];
                      }
                  }
                  return obj;
              }
              var newmap=qukong(data_);
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
		  			let cc=url+"tpjg/export/czbquery?"+b;
		  			console.log(cc);
              window.location.href=cc;
          }

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

  })

function ShowLoading() {
    $(".spinner").show();
}
function HideLoading() {
    $(".spinner").hide();
}
$(".btn_blue1").click(function(){
    $("#country").val("");
    $("#town").val("");
    $("#care").val("");
    $("#organization").val("");
    $("#income").val("");
    $("#line").val("");
    $("#poor").val("");
    $("#water").val("");
    $("#electri").val("");
    $("#soreSection").val("");
    $("#isReach").val("");

})

})

