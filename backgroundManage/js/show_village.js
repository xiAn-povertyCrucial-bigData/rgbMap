$(document).ready(function(){
    var table = $("#table");
    var shuji = $("#shuji");
    var company = $("#company");
    var city = $("#county");
    var area = $("#township");
    var town =$("#village");
    var group =$("#group");
    var duizhang = $("#duizhang");
    var page = $(".allPage");
    $(function(){
        $.ajax({
            url: url + "fpzt/zcgzd/query",
            data:{"page_index": 1,"page_size": 12},
            method: "get",
            dataType: "json",
            success: function(data){
                if (data.code == 2000){
                  //  console.log("ok");
                    showAllInfo(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
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

  function  showlod(){
      var info = infomation;
    //   var empty = 
  }

  function showAllInfo(index,obj,data){
      obj.empty();
      var str = `
       <tr>
            <th>序号</th>
            <th>贫困村名称</th>
            <th>贫困村所在地</th>
            <th>村属性</th>
            <th>村负责人</th>
            <th>村办公电话</th>
            <th>是否已筛选</th>
            <th>操作</th>
        </tr>
        `;

   for(let i = 0; i < data.data.list.length; i++ ){
     str +=`  
     <tr>
              <td>${index*12+i+1}</td>
              <td>${data.data.list[i].AAR009_s}</td>
              <td>${data.data.list[i].AAR009_x}${data.data.list[i].AAR009_s}${data.data.list[i].AAR009_z}</td>
              <td>${data.data.list[i].AAB004}</td>
              <td>${data.data.list[i].AAR011}</td>
              <td>${data.data.list[i].AAR013}</td>
              <td>${data.data.list[i].AAR012}</td>
              <td>
                  <a href="showDetailsObject.html?value=${data.data.list[i].AAD041}&time=${$('#p_year').val()}">详情</a>
              </td>
          </tr>`;
   }
        obj.html(str);
  }

  function page_init(index) {
        $.ajax({
                url:url + "fpzt/bfzrr/query",
                type:"get",
                data:{"page_index": index+1,"page_size": 12,"aab004":id1.val(),
               "aap001":company.val(),"aar009_x":city.val(),"aar009_z":area.val(),"aar009_c":town.val(),"aad042":group.val(),"aar020":start.val(),"aar021":end.val()},
                dataType:"json",
                success:function (data) {
                if (data.code == 2000){
                          //  console.log("ok");
                            showAllInfo( index,table,data); 
                        }
                },
                error:function () {
                }
            })
        }


function showPage(obj,data){
 $("#Pagination").pagination(data,{
             callback:PageCallback,         //pageCallback() 为翻页调用函数
             items_per_page:12,                //每页显示条目数
             num_display_entries: 4,                //连续分页显示分页条目数
             num_edge_entries: 1          //两侧显示的首尾分页的条目数
        });


}

    //ajax分页请求,page_index :页码
function PageCallback(page_index,jq){
 //   console.log('das');
    page_init(page_index);      //第一页为0
}


$("body").on("click","#btn_orange",function(){
        // var city = $("#city");
        // console.log(city);
        console.log("das111");
       $(function(){
        $.ajax({
            url: url + "fpzt/bfzrr/query",
            data:{"page_index": 1,"page_size": 12,"aab004":id1.val(),
               "aap001":company.val(),"aar009_x":city.val(),"aar009_z":area.val(),"aar009_c":town.val(),"aad042":group.val(),"aar020":start.val(),"aar021":end.val()},
            method: "get",
            dataType: "json",
            json: "callback",
            jsonpCallback: 'jsonpCallback',
            success: function(data){
                if (data.code == 2000){
                    console.log("ok");
                    showAllInfo(0,table,data);
                    showPage($(".searchPage"),data.data.total);
                   // init_County();
                    page.html(Math.ceil(data.data.total/12));
                    $("#total").html("总数："+data.data.total);
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
 })
})