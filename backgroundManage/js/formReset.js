/*重置条件*/
$(document).ready(function(){
    $("#reset").click(function(){
        $("#country").val("");
        $("#township").val("");
        $("#village").val("");
        $("#povertyName").val("");
        $("#idNumber").val("");
        $(".shuxing dt").removeClass("active");
        $(".shuxing dt").eq(1).addClass("active");
        $(".tuopin dt").removeClass("active");
        $(".tuopin dt").eq(1).addClass("active");
        $(".reason dt").removeClass("active");
        $(".reason dt").eq(1).addClass("active");
    })
})