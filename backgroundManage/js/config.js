var config={
        "url":"http://113.141.72.212:9292/poverty-web-1.0-SNAPSHOT/",
	    //"url":"http://192.168.1.195:9999/poverty-web-1.0-SNAPSHOT/",
	    //"url":"http://192.168.1.153:8080",

}
/*验证token*/
/*let token=$.cookie("token");
let url=config.url;
$.ajax({
    url:url+"/user/check/token",
    data:{"token":token},
    method:"post",
    async:false,
    beforeSend:function(request){
        request.setRequestHeader("Authorization",token);
        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
    dataType:"json",
    success:function(data){
        if(data.code===2000){

        }else if(data.code===3000){
            show_msg("未登录","login.html")
            // location.href="login.html";
        }
    }
})*/
