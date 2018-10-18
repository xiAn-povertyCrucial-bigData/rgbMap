/*
$(function () {
    $("#save").click(function(){
        // alert('保存成功！');
        $("#save").text('已保存');
        $("#save").removeClass("icon-check-square-o");
    })
    $("#formSubmit").submit(function () {
        if(confirm("确定提交？")){
            form=$("#formSubmit").serializeArray();
            var sign=form[0].value;
            console.log(form);
            var urls=new Array();
            urls[0]="http://192.168.10.15:8080/infoEntry/industrySupport";
            urls[1]="http://192.168.10.15:8080/infoEntry/workingCondition";
            urls[2]="http://192.168.10.15:8080/infoEntry/ecologicalCompensation";
            urls[3]="http://192.168.10.15:8080/infoEntry/houseReconstruction";
            urls[4]="http://192.168.10.15:8080/infoEntry/medicalAssistance";
            urls[5]="http://192.168.10.15:8080/infoEntry/educationSupport";
            urls[6]="http://192.168.10.15:8080/infoEntry/outToEnsure";
            //console.log(urls[0].substring(urls[0].lastIndexOf("/")+1));
            for(var i=0;i<urls.length;i++){
                var subStr=urls[i].substring(urls[i].lastIndexOf("/")+1);
                if(sign==subStr){
                    if(form[4].value==""||form[5].value==""){
                        alert("姓名或者身份证号不能为空");
                        return;
                    }
                    $.ajax({
                        type:"post",
                        url:urls[i],
                        data:form,
                        traditional:true,
                        async:"false",
                        dataType:"jsonp",
                        success:function(result){
                            alert("提交成功");
                        }
                    })
                }else{
                    continue;
                }
            }
        }else{
            return;
        }
    });
    $(".helpMeasureContent li").click(function(){
        $(this).siblings().removeClass("helpMeasureTag");
        //点击对象的父级（li）的兄弟级（li）的子集（a）移除类
        $(this).addClass("helpMeasureTag");
        //给点击对象添加类
    });

});
function helpMeasure(a){
    if(a==001){
        $('#help1').show();
        $('#help1').siblings().hide();
    }else if(a==002){
        $('#help2').show();
        $('#help2').siblings().hide();
    }else if(a==003){
        $('#help3').show();
        $('#help3').siblings().hide();
    }else if(a==004){
        $('#help4').show();
        $('#help4').siblings().hide();
    }else if(a==005){
        $('#help5').show();
        $('#help5').siblings().hide();
    }else if(a==006){
        $('#help6').show();
        $('#help6').siblings().hide();
    }else if(a==007){
        $('#help7').show();
        $('#help7').siblings().hide();
    }else if(a==008){
        $('#help8').show();
        $('#help8').siblings().hide();
    }else if(a==009){
        $('#help9').show();
        $('#help9').siblings().hide();
    }else if(a==100){
        $('#help10').show();
        $('#help10').siblings().hide();
    }

}*/
