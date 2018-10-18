$(document).ready(function(){
    addressInit('p_qv','p_xiang');// 监管规则高级查询下拉框选择联动
    var formInfos = $('#formSubmit2');
    var page = $(".allPage");
//  var token=$.cookie("token");
//  console.log(token)
    $(function(){
        $.ajax({
            url: url + "select/allPoverty", 
            data:{"year":201808,"pageNum":1},//{"page_index":1,"page_size": 12,"aar040": 20171212}
            method: "get",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                  console.log("ok");
                    showAllPoorInfo(0,formInfos,data,201808);
                    showPage15($(".searchPage"),data.data.PageTotal);
                    //init_County();
                    $('#total').html("总数："+data.data.PageTotal);
                    page.html(Math.ceil(data.data.PageTotal/12));
                }
                // console.log('111');
            }
        })
    })

    var select1=201808;
    $(".select1 dt dl").click(function(){
        select1=$(this).attr("sleep");
    })
    console.log(select1)
    $(".btn_orange1").on("click",function(){//查询事件
        var p_qv=$("#p_qv").val();  //监管分类
        var p_xiang=$("#p_xiang").val();  //监管规则
        var data1= {"one": p_qv,"two": p_xiang,"year":select1,"pageNum":1};
        console.log(data1)
        $.ajax({
                url:url + "select/select",
                type:"get",
                data:data1,
                dataType: "json",
                beforeSend:function(request){
                    request.setRequestHeader("Authorization",token);
                    request.setRequestHeader("X-Requested-With","XMLHttpRequest");
                },
                json: "callback",
                success:function (data) {
                  if (data.code == 2000){
                      console.log('点击'+data);
                      showPage2($(".searchPage"),data.data.PageTotal);
                      page.html(Math.ceil(data.data.PageTotal/12));
                      $('#total').html("总数："+data.data.PageTotal);
                      showAllPoorInfo(0,$('#formSubmit2'),data,select1);
                      
                      function showAllPoorInfo(index,obj,data,year){
					      obj.empty();
					      var data=data.data.AllPoverty;
					      //console.log('点击传递'+data);
					      //year=parseInt(year/100);
					      var str = `
					       <tr>
					             <th>序号</th>
					              <th>户主姓名</th>
					              <th>贫困户属性</th>
					              <th>主要致贫原因</th>
					              <th>成员人数(人)</th>
					              <th>贫困户所在地</th>
					              <th>操作</th>
					          </tr>`
					          obj.html(str);
					       for(var i=0; i<data.length; i++){
					        
					          var str1=`  
					            <tr>
					                <td>${index*12+i+1}</td>
					                <td>${data[i].aac029}</td>
					                <td>${data[i].aac006}</td>
					                <td>${data[i].aac007}</td>
					                <td>${data[i].aac017}</td>
					                <td>${data[i].aad001}</td>
					                <td>
					                    <a href="showDetailsPoor1.html?value=${data[i].aac001}&time=${year}">户详情</a>
					                </td>
					            </tr>`;
					            obj.html(function (i, value) {
					                return value + str1;
					            });
					       }
						}
                      
                  }else{
                      alert('查无数据！');
                  }
                },
                error:function () {
                  alert('数据加载失败！')
                }
        })
    });
    function showPage15(obj,data){
        $("#Pagination").pagination(data,{
            callback:PageCallback15,         //pageCallback() 为翻页调用函数
            items_per_page:12,                //每页显示条目数
            num_display_entries: 4,                //连续分页显示分页条目数
            num_edge_entries: 1          //两侧显示的首尾分页的条目数
        });
    }
    function showPage2(obj,data){
        $("#Pagination").pagination(data,{
            callback:PageCallback2,         //pageCallback() 为翻页调用函数
            items_per_page:12,                //每页显示条目数
            num_display_entries: 4,                //连续分页显示分页条目数
            num_edge_entries: 1          //两侧显示的首尾分页的条目数
        });
    }
    function PageCallback15(page_index,jq){
        page_init15(page_index);      //第一页为0
    }
    function PageCallback2(page_index,jq){
        page_init2(page_index);      //第一页为0
    }
    function page_init15(index) {
        var p_qv=$("#p_qv").val();  //监管分类
        var p_xiang=$("#p_xiang").val();  //监管规则
        var select1=201808;
        $(".select1 dt dl").click(function(){
            select1=$(this).attr("sleep");
            // select1=parseInt($(this).html());
            //console.log(select1);
        })
        console.log(index);
        let table=$("#table");
        $.ajax({
            url:url + "select/allPoverty",
            type:"get",
            data:{"year":201808,"pageNum": index+1,pageSize:12},
            dataType:"json",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            success:function (data) {
                if (data.code == 2000){
                    $('#allTotal').html("总数："+data.data.PageTotal);
                    $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                    // showTable(table,data.data)
                    showAllPoorInfo(index,$('#formSubmit2'),data,select1)
                }
            },
            error:function () {
            }
        })
    }
    function page_init2(index) {
        var p_qv=$("#p_qv").val();  //监管分类
        var p_xiang=$("#p_xiang").val();  //监管规则
        var data1= {"one": p_qv,"two": p_xiang,"year":select1,"pageNum":index+1};
        $(".select1 dt dl").click(function(){
            select1=$(this).attr("sleep");
            // select1=parseInt($(this).html());
            //console.log(select1);
        })
        console.log(index);
        let table=$("#table");
        $.ajax({
            url:url + "select/select",
            type:"get",
            data:data1,
            dataType:"json",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            success:function (data) {
                if (data.code == 2000){
                    $('#allTotal').html("总数："+data.data.PageTotal);
                    $(".page-sum").html("共"+Math.ceil(data.data.PageTotal/12)+"页");
                    // showTable(table,data.data)
                    showAllPoorInfo(index,$('#formSubmit2'),data,select1)
                }
            },
            error:function () {
            }
        })
    }
})