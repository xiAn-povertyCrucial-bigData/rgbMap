$(document).ready(function(){
    let token=$.cookie("token");
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
    })
})
