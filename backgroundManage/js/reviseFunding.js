$(document).ready(function(){
         // var url ="http://192.168.1.135:8080/"
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
        var code = theRequest.value;
        var year = theRequest.time;
        var year1=null;
        let tokenCon=$.cookie("loginMessage");
    	let aa=JSON.parse(tokenCon);
    	console.log(aa.aar008)
	
	switch (year){
		case '201808':
			year1=2018;
			break;		
		case '201712':
			year1=2017;
			break;
		case '2017':
			year1=2016;
			break;
		case '2016':
			year1=2015;
			break; 
		case '2015':
			year1=2014;
			break;         		
		default:
			break;
	}
	
    $('#year').html(year1+'年');
    //$("#year").html(theRequest.time.substring(-1,4)+'年');
    //村编号 和年份
    var formInfos = $('#baseInfo');
    var  pop = $("#population");
    var  work = $("#work10");
    var income = $("#income");
    var yulu= $('#yulu');
    var xindai= $('#xindai');
    var banqian= $('#banqian');
    //var team = $('#team');
    //var bangfu= $('#bangfu');
    var tudiInfo = $('#tudiInfo');
        $.ajax({
            url: url + "pkc/detail/update/jbinfo",
            data:{"aad001": code,"aar040":year},
            beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
            method: "post",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                    showBaseInfo(formInfos,data);                     
                    getPopuInfo(pop,year);
                    //getBangfu(bangfu,year);
                    getBanqian(banqian,year);
                    getYulu(yulu,year);
                    getIncome(income,year);
                    getWork10(work,year);
                    getTudiInfo(tudiInfo,year);
                    //getTeam(team,year);
                    getXindai(xindai,year);    
                }else if(data.code==1005){
					alert(data.message);
					//window.location.href='../html/addFunding.html'
				}else if(data.code==1009){
					alert(data.message)
				}else if(data.code==4000){
					alert(data.message)
				}  
            }
    })
    //查看基本信息
    function  showBaseInfo(obj,data){
            $("#citys").html(data.data.CITY+"-"+data.data.AREA+'-'+data.data.TOWN);
            var input1 = $("#baseInfo tr td input");
            var select1 = $("#baseInfo tr td select");
            var base = [];
            var base1 = [];
            var base = [data.data.AAR011,data.data.AAR012,data.data.AAD038,data.data.AAD037,data.data.AAD026,data.data.AAR101,data.data.AAR102,data.data.AAR103]
            var base1 =[ data.data.AAF031,data.data.AAD035,data.data.AAD036,data.data.AAD004,data.data.ADA007];
            input1.each(function(i,value){
                  $(this).val(base[i]);
                })
            select1.each(function(i,value){
               $(this).val(base1[i]);
                })  
    }
	//获取人口信息
    function  getPopuInfo(pop){
            $.ajax({
                url: url + "pkc/detail/update/rkinfo",
                data:{"aad001": code,"aar040":year},
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
                        showpopInfo( pop,data);              
                    }
                }    
        })
    }

    function showpopInfo(obj,data){   
    		var inputs3 = $("#population tr td input");
            var  life1 = [];
            var life1 =  [data.data.AAD005,data.data.AAD010,data.data.AAD008,
            data.data.AAD012,data.data.ADA003,data.data.ADA004,data.data.AAD009,
            data.data.AAD010,data.data.ADA005,data.data.ADA006,data.data.AAD007,
            data.data.AAD011,data.data.ADA001,data.data.ADA002,data.data.AAD006,
            data.data.ADA024,data.data.AAD014,data.data.AAD015,data.data.AAD016,data.data.AAD017]
            inputs3.each(function(i,value){
               $(this).val(life1[i]);
            })
    
    }
    //十项重点
    function getWork10(work10){
            $.ajax({
                url: url + "pkc/detail/update/teninfo",
                data:{"aad001": code,"aar040":year},
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
                        console.log("ok");
                        showWorkInfo( work10,data);              
                    }
                }
            
        })
    }

    function showWorkInfo(obj,data){
        var datas = [data.data.AAD322,data.data.AAD324,data.data.AAD321,data.data.ADA008,
        data.data.ADA009, data.data.AAD358,data.data.AAD355,data.data.AAD357,data.data.AAD356,
        data.data.ADA010,data.data.ADA011,data.data.AAD371,data.data.AAD372,data.data.ADA012,
        data.data.ADA013,data.data.AAD381,data.data.AAD383,data.data.AAD382,data.data.AAD384,
        data.data.AAD391,data.data.AAD392,data.data.AAD393,data.data.AAD394,data.data.ADA014,
        data.data.ADA015,data.data.AAD401,data.data.AAD402,data.data.AAD411,data.data.AAD413,
        data.data.AAD415,data.data.AAD412,data.data.AAD414,data.data.AAD311,data.data.AAD313,
        data.data.AAD314,data.data.AAD312,data.data.ADA024]
        var datas1 = [data.data.AAD328,data.data.AAD323];
        var input1 = $("#work10 tr td input");
        var select1 = $("#work10 tr td select");
        input1.each(function(i,value){
         $(this).val(datas[i]);
        })
        select1.each(function(i,value){
          $(this).val(datas1[i]);
        })   
     
    }

    //获取收入信息
    function  getIncome(income){
            $.ajax({
                url: url + "pkc/detail/update/shouruinfo",
                data:{"aad001": code,"aar040":year},
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
                        console.log("ok");
                        showIncomeInfo( income,data);              
                    }
                }    
        })
    }

    function showIncomeInfo(obj,data){   
    		var inputs3 = $("#income tr td input");
            var  life1 = [];
            var life1 =  [data.data.AAD301,data.data.AAD302]
            inputs3.each(function(i,value){
               $(this).val(life1[i]);
            })
    
    }

    //土地信息

    function getTudiInfo(){
            var tudiInfo = $('#tudiInfo');
            $.ajax({
                url: url + "pkc/detail/update/tdinfo",
                data:{"aad001": code,"aar040":year},
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
                        showTudiInfo( tudiInfo,data);              
                    }
                }
    })
    }
    function showTudiInfo(obj,data){
            var inputs3 = $("#tudiInfo tr td input");
            var  life1 = [];
            var life1 =  [data.data.AAD019,data.data.AAD023,data.data.AAD025,data.data.AAD027,data.data.AAD021,data.data.AAD022,data.data.AAD024]
            inputs3.each(function(i,value){
                       $(this).val(life1[i]);
                    })
    }
//雨露计划
function getYulu(){
            
            $.ajax({
                url: url + "pkc/detail/update/rain",
                data:{"aad001": code,"aar040":year},
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
                        showyuluInfo( yulu,data);              
                    }
                }
    })
    }
    function showyuluInfo(obj,data){
            var inputs3 = $("#yulu tr td input");
            var  life1 = [];
            var life1 =  [data.data.ADA016,data.data.ADA017,data.data.ADA018]
            inputs3.each(function(i,value){
                       $(this).val(life1[i]);
                    })
    }
//信贷信息
function getXindai(){
            
            $.ajax({
                url: url + "pkc/detail/update/credit",
                data:{"aad001": code,"aar040":year},
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
                        showyuluInfo(xindai,data);              
                    }
                }
    })
    }
    function showyuluInfo(obj,data){
            var inputs3 = $("#xindai tr td input");
            var  life1 = [];
            var life1 =  [data.data.ADA019,data.data.ADA020,data.data.ADA021]
            inputs3.each(function(i,value){
                       $(this).val(life1[i]);
                    })
    }
//搬迁
function getBanqian(){
            
            $.ajax({
                url: url + "pkc/detail/update/relocation",
                data:{"aad001": code,"aar040":year},
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
                        showbanqianInfo(banqian,data);              
                    }
                }
    })
    }
    function showbanqianInfo(obj,data){
            var inputs3 = $("#banqian tr td input");
            var  life1 = [];
            var life1 =  [data.data.ADA022,data.data.ADA023]
            inputs3.each(function(i,value){
                       $(this).val(life1[i]);
                    })
    }
    
    
  var nums = [];
    nums = $(".number");
    $(".number").blur(function(){
        if(isNaN($(this).val())||parseFloat($(this).val())<0){
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
      //  alert($(this).val())
    })
    $(".number,.jingdu").focus(function(){
        if($(this).val()=="(*请输入有效值)"){
            $(this).val("");
            $(this).css("color","#333333")
        }
    })
    $(".jingdu").blur(function(){
        var value = $(this).val();
        var n = /^([-+]?\d{0,11})(\.\d{0,7})?$/;
        var re = new RegExp(n);
        if (re.test(value))
        {
            return true;
        }
        else
        {
            $(this).val("(*请输入有效值)")
            $(this).css("color","red");
        }
    })
    $("body").on("click","#submit",function(){
       var flag = 1;
        //基础信息的修改
        reviseBasic();
        revisePop();
        reviseTen();
        reviseIncome()
        reviseLand();
        reviseYulu();        
        reviseXindai();       
        reviseRelocate();
        function reviseBasic(){
            var input1 = $("#baseInfo tr td input");
            var select1 = $("#baseInfo tr td select");
            var k1 = [];
            var k11 = [];
            input1.each(function(i,value){
                    k1[i] = $(this).val();
                })
            select1.each(function(i,value){
                    k11[i] = $(this).val();
                })
            var data = {"aad001": theRequest.value,"aar040": theRequest.time,"aar011":k1[0],
            "aar012":k1[1],"aad038":k1[2],"aad037":k1[3],"aad026":k1[4],"aar101":k1[5],"aar102":k1[6],
            "aar103":k1[7],"aaf031":k11[0],"aad035":k11[1],"aad036":k11[2],"aad004":k11[3],"ada007":k11[4]}
            $.ajax({
                url:url+"pkc/update/jbinfo",
                method:"post",
                dataType:"json",
                data:data,
                async:false, 
                beforeSend:function(request){
                    request.setRequestHeader("Authorization",token);
                    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
        //人口信息修改
        function revisePop(){
            var input1 = $("#population tr td input");
            var k1 = [];
            input1.each(function(i,value){
                    k1[i] = $(this).val();
               })
            var data = {"aad001": theRequest.value,"aar040": theRequest.time,"aad005":k1[0],
            "aad010":k1[1],"aad008":k1[2],"aad012":k1[3],"ada003":k1[4],"ada004":k1[5],
            "aad009":k1[6],"aad010":k1[7],"ada005":k1[8],"ada006":k1[9],"aad007":k1[10],
            "aad011":k1[11],"ada001":k1[12],"ada002":k1[13],"aad006":k1[14],"ada024":k1[15],
            "aad014":k1[16],"aad015":k1[17],"aad016":k1[18],"aad017":k1[19]}
            $.ajax({
                url:url+"pkc/update/rkinfo",
                method:"post",
                dataType:"json",
                data:data,
                async:false, 
                beforeSend:function(request){
                    request.setRequestHeader("Authorization",token);
                    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
        //十项的修改
        function reviseTen(){
           var input1 = $("#work10 tr td input");
            var select1 = $("#work10 tr td select");
            var k1 = [];
            var k11 = [];
            input1.each(function(i,value){
                    k1[i] = $(this).val();
                })
            select1.each(function(i,value){
                    k11[i] = $(this).val();
                })
            var data = {"aad001": theRequest.value,"aar040": theRequest.time,"aad322":k1[0],
            "aad324":k1[1],"aad321":k1[2],"ada008":k1[3],"ada009":k1[4],"aad358":k1[5],
            "aad355":k1[6],"aad357":k1[7],"aad356":k1[8],"ada010":k1[9],"ada011":k1[10],
            "aad371":k1[11],"aad372":k1[12],"ada012":k1[13],"ada013":k1[14],"aad381":k1[15],
            "aad383":k1[16],"aad382":k1[17],"aad384":k1[18],"aad391":k1[19],"aad392":k1[20],
            "aad393":k1[21],"aad394":k1[22],"ada014":k1[23],"ada015":k1[24],"aad401":k1[25],
            "aad402":k1[26],"aad411":k1[27],"aad413":k1[28],"aad415":k1[29],"aad412":k1[30],
            "aad414":k1[31],"aad311":k1[32],"aad313":k1[33],"aad314":k1[34],"aad312":k1[35],
            "ada024":k1[36],"aad328":k11[0],"aad323":k11[1]}	     
            $.ajax({
                url:url+"pkc/update/teninfo",
                method:"post",
                dataType:"json",
                async:false,
                data:data,
                beforeSend:function(request){
			          request.setRequestHeader("Authorization",token);
			          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
    
        //收入信息
        function reviseIncome(){
       		var inputs3 = $("#income tr td input");
            var  life1 = [];
            inputs3.each(function(i,value){
                life1[i] = $(this).val();
            })
            var data =  {"aad001": theRequest.value,"aar040": theRequest.time,"aad301":life1[0],"aad302":life1[1]}
            $.ajax({
                url:url+"pkc/update/shouruinfo",
                method:"post",
                dataType:"json",
                async:false, 
                data:data,
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
        //土地信息
        function reviseLand(){
            var inputs3 = $("#tudiInfo tr td input");
            var  life1 = [];
            inputs3.each(function(i,value){
                life1[i] = $(this).val();
            })
            var data =  {"aad001": theRequest.value,"aar040": theRequest.time,"aad019":life1[0],
            "aad023":life1[1],"aad025":life1[2],"aad027":life1[3],"aad021":life1[4],
            "aad022":life1[5],"aad024":life1[6]}

            $.ajax({
                url:url+"pkc/update/tdinfo",
                method:"post",
                dataType:"json",
                async:false, 
                data:data,
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
        //雨露计划修改
        function reviseYulu(){
            var inputs3 = $("#yulu tr td input");
            var  life1 = [];
            inputs3.each(function(i,value){
                life1[i] = $(this).val();
            })
            var data =  {"aad001": theRequest.value,"aar040": theRequest.time,
            "ada016":life1[0],"ada017":life1[1],"ada018":life1[2]}
            $.ajax({
                url:url+"pkc/update/rain",
                method:"post",
                dataType:"json",
                async:false, 
                data:data,
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
        //小额信贷修改
		function reviseXindai(){
            var inputs3 = $("#xindai tr td input");
            var  life1 = [];
            inputs3.each(function(i,value){
                life1[i] = $(this).val();
            })
            var data =  {"aad001": theRequest.value,"aar040": theRequest.time,
            "ada019":life1[0],"ada020":life1[1],"ada021":life1[2]}
            $.ajax({
                url:url+"pkc/update/credit",
                method:"post",
                dataType:"json",
                async:false, 
                data:data,
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
        //异地搬迁修改
		function reviseRelocate(){
            var inputs3 = $("#banqian tr td input");
            var  life1 = [];
            inputs3.each(function(i,value){
                life1[i] = $(this).val();
            })
            var data =  {"aad001": theRequest.value,"aar040": theRequest.time,
            "ada022":life1[0],"ada023":life1[1]}
            $.ajax({
                url:url+"pkc/update/relocation",
                method:"post",
                dataType:"json",
                async:false, 
                data:data,
                beforeSend:function(request){
		              request.setRequestHeader("Authorization",token);
		              request.setRequestHeader("X-Requested-With","XMLHttpRequest");
		        },
                success:function(data){
                if(data.message=="服务端发生错误"){
				    flag = 0;
				}
                }
            })
        }
        //帮扶对接
		//if(aa.aar008.substring(6)=="000000"&flag==1){
		if(flag==1){
			alert('修改成功');
			return;
		}else{
			alert('修改失败');
			return;
		}
		
//      if(flag==1){
//		    alert("信息审核提交成功");
//		}else if(flag == 0){
//		    alert("提交的数据中不能含有空格");
//		}else{
//		    alert("信息审核提交失败");
//		}
   })

})
