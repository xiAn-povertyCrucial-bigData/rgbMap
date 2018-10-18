$(document).ready(function(){
	let token=$.cookie("token");
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
    var bb="";
    //加载县
    init_County();
    function init_County(){
        //var county = $("#county");
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
         console.log(arr)
         let tokenCon=$.cookie("loginMessage");
         let aa=JSON.parse(tokenCon);
         for(let i=0;i<arr.length;i++){
             console.log(arr[i].number+"---"+aa.aar008);
             if(arr[i].number==aa.aar008 ||arr[i].number==aa.aaa113){
                 console.log(arr[i].name);
                 console.log($("#county option"))
                 // $("#county").empty();
                 $("#county").empty().append("<option value='"+arr[i].number+"'>"+arr[i].name+"</option>").attr("disabled","disabled");
                 var opt=$("#county");
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
                             page.html(data.data.total);
                         }
                     }

                 })
             }
         }
    }
    $("#county").change(function(){
        var opt=$("#county");
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
                        page.html(data.data.total);
                    }
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
                 console.log(arr[i].number+"---"+aa.aaa113);
                 if(arr[i].number!==aa.aaa113){
                     $("#township").empty().append("<option value='"+aa.aar008+"'>"+aa.userCode+"</option>").attr("disabled","disabled");
                     var opt=$("#township");
                     var opt1 = $("#village");
                     $.ajax({
                         url: url + "district/village",
                         data:{"town":opt.val()},
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
                                         }
                                     }
                                 })
                                 showVillageInfo(opt1,data);
                                 page.html(data.data.total);
                             }
                         }

                     })
                 }
             }
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
                    }
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
    $("#village").change(function(){
        var vill = $("#village").val();
        var xingming = $("#xinxi10");
             $.ajax({
                url: url + "/fpzt/findPoor",
                data:{"aad001": vill},
                method: "get",
                dataType: "json",
                beforeSend:function(request){
                          request.setRequestHeader("Authorization",token);
                          request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                    },
                success: function(data){
                    if (data.code == 2000){
                        showhuzhu(xingming,data);
                    }
                }
        })
    });
    function showhuzhu(obj,data){
           obj.empty();
         var str = `<option value="">--请选择--</option>`;
         for(let i = 0; i < data.data.length; i++){
             str += `
             <option value="${data.data[i].AAC001}">${data.data[i].AAC029}</option>
         `;
          obj.html(str);
         }
    }
    /*搜索户主姓名*/
    searchEvent(url+'/fpzt/findPoor',$('.submit'),$('.searchBox'),$('#ZZsearchInfo'));//搜索调用
    function searchEvent(ourl,obj1,obj2,obj3){//区县级村搜索,村列表填充
        obj1.on("click",function(e){
            var vill = $("#village").val();
            var text=$('.keywords').val();
            obj3.html("");
            obj2.show();
           /* $(document).on("click", function(){
                obj2.hide();
            });*/
            e.stopPropagation();
            $.ajax({
                url:ourl+'?aac029='+text+'&aad001='+vill,
                type:"get",
                dataType:"json",
                data:{},
                success:function (result) {
                    var data=result.data;//
                    console.log(data);
                    for (var i=0;i<data.length;i++) {
                        obj3.append(`<tr class=objName hrefs=${data[i].AAC001}><td style='cursor:pointer'>${data[i].AAC029}</td></tr>`);
                    }
                    $("#ZZsearchInfo .objName").hover(function(){
                        let index=$(this).index();
                        $(this).css({"background":"#ccc","color":"#fff"});
                        /*点击户主姓名*/
                        $(this).on("click",function(){
                            obj2.hide();
                            let aa=$(this).text();
                            $(".keywords").val(aa);
                            bb=$(this).attr("hrefs");
                        })
                    },function(){
                        $(this).css({"background":"#fff","color":"#000"});
                    })
                }
            })
        })
        obj2.on("click", function(e){
            e.stopPropagation();
        });
    }
    /*点击添加*/
    $("#add").click(function(){
        addzeren();
        function addzeren(){
            if($("#startTime").val()==""||$("#endTime").val()==""){
                $("#startTime").val("");
                $("#endTime").val("");
            }
            if($("#startTime").val() >= $("#endTime").val()){
                $("#startTime").val("");
                $("#endTime").val("");
                // show_msg("起始时间不能大于结束时间");
            }
            /*验证表单*/
            $.validator.setDefaults({
                submitHandler: function() {
                    alert("确认添加");
                }
            });
            /*户主姓名自定义校验*/
            jQuery.validator.addMethod("isName", function(value, element) {
                return this.optional(element) || /^[\u4E00-\u9FA5]{1,6}$/.test(value);
            }, "请输入正确的户主姓名");
            /*身份证号自定义校验*/
            jQuery.validator.addMethod("isIdCardNo", function(value, element) {
                //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;
                return this.optional(element) || isIdCardNo(value);
            }, "请输入正确的身份证号码");
            jQuery.validator.addMethod("isMobile", function(value, element) {
                var length = value.length;
                var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})|(16[0-9]{9})|(19[0-9]{9})$/;
                return this.optional(element) || (length == 11 && mobile.test(value));
            }, "请正确填写手机号码");
            //身份证验证
            function isIdCardNo(num){
                //if (isNaN(num)) {alert("输入的不是数字！"); return false;}
                var len = num.length, re;
                if (len == 15)
                    re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
                else if (len == 18)
                    re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
                else if (len == 20)
                  re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)(\d{2})$/);
                else if (len == 22)
                  re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d{3})(\w)(\d{1})$/);
                else {
                    //alert("输入的数字位数不对。");
                    return false;
                }
                var a = num.match(re);
                if (a != null)
                {
                    if (len==15)
                    {
                        var D = new Date("19"+a[3]+"/"+a[4]+"/"+a[5]);
                        var B = D.getYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
                    }
                    else
                    {
                        var D = new Date(a[3]+"/"+a[4]+"/"+a[5]);
                        var B = D.getFullYear()==a[3]&&(D.getMonth()+1)==a[4]&&D.getDate()==a[5];
                    }
                    if (!B) {
                        //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。");
                        return false;
                    }
                }
                if(!re.test(num)){
                    //alert("身份证最后一位只能是数字和字母。");
                    return false;
                }
                return true;
            }

            $("#formSubmit").validate({
                rules: {
                    name: {
                        required: true,
                        minlength: 2,
                        isName: true
                    },
                    idNumber: {
                        required: false,
                        minlength: 18,
                        isIdCardNo: true
                    },
                    phone:{
                        required:true,
                        minlength:11,
                        isMobile:true
                    }
                },
                submitHandler: function () {
                    let aab002=$("#xinxi1").val().trim();
                    let aab003=$("#xinxi2").val().trim();
                    let aap001=$("#xinxi3").val().trim();
                    let aak888=$("#xinxi4").val().trim();
                    let aab004=$("#xinxi5").val().trim();
                    let aar012=$("#xinxi6").val().trim();
                    let aak033=$("#xinxi7").val().trim();
                    let aak036=$("#xinxi8").val().trim();
                    let aak037=$("#xinxi9").val().trim();
                    let aac001=$("#xinxi10").val().trim();
                    let aar020=$("#startTime").val().trim();
                    let aar021=$("#endTime").val().trim();
                    $.ajax({
                        url: url + "fpzt/addPeople",
                        data: {
                            'aab002': aab002,
                            'aab003': aab003,
                            'aap001': aap001,
                            'aak888': aak888,
                            'aab004': aab004,
                            'aar012': aar012,
                            'aak033': aak033,
                            'aak036': aak036,
                            'aak037': aak037,
                            'aac001': aac001,
                            'aar020': aar020.toString().replace("-", "").replace("-", ""),
                            'aar021': aar021.toString().replace("-", "").replace("-", "")
                        },
                        beforeSend: function (request) {
                            request.setRequestHeader("Authorization", token);
                            request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        },
                        type: "get",
                        dataType: "json",
                        success: function (data) {
                            if (data.code == 2000) {
                                show_msg('添加成功',"addMember.html");
                            }else if(data.code==1005){
							 	alert(data.message)
					   		}else if(data.code==1009){
								alert(data.message)
					   		}else if(data.code==4000){
								alert(data.message)
            		    	} 
//          		    else {
//                              show_err_msg("添加失败");
//                          }
                        }
                    })
                },
                messages: {
                    name: {
                        required: "请输入姓名",
                        minlength: "请输入最少两位字符",
                        color:"red"
                    },
                    idNumber: {
                        required: "请输入身份证号码",
                        minlength: "请输入18/20/22位字符",
                    },
                    phone:{
                        required:"请输入手机号",
                        minlength: "请输入11位字符",
                    }
                }
            })
        }
    })
})