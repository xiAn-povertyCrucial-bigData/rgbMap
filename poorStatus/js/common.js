$(document).ready(function(){
    var token=$.cookie("token");
    // var token=localStorage.getItem("token")
    let url='http://113.141.72.212:9292/poverty-web-1.0-SNAPSHOT/';
    $.ajax({
        url:url+"user/check/token",
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
               show_msg("未登录","../index/login.html")
            }
        }
    })
})
