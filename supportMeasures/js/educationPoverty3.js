$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*市教育扶贫实施情况统计*/
    let villagName=villageName;
    let villagCode=villageCode;
    console.log(villagName)
    console.log(villagCode)
    //var disctId = '甘家坪村';
    //var disctId1 = 610124007005;
    var countyName =villagName;
    $(".fpVill").html(villagName).css("fontWeight","bold");
    $("#villagName").text(villagName)
    $("#villagName2").text(villagName)
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    $("#villageN").html(villagName);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '36%'];
        let yHeight='28%';
       // let name1=villagName+"教育扶贫实施情况统计";
        $.ajax({
            url:url+"/edu/vill/query",
            method:"get",
            dataType:"json",
            data:{'villageNo':villagCode},
            success:function (result) {
                console.log(result)
                let data=result.data[0];
                let datas=[];
                let i=0;
                let arr=['未落实','已落实'];
                let datatable =[data.noNumber,data.reachNumber];
                $("#people").html(data.dropNumber+"人");
                for (var key in data)
                {
                    let temp = {"value":datatable[i],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }
                var dataC=datas;
                let count=data.noNumber+data.reachNumber;
              option = {
                    color:  ['#DD4F43','#1FA463'],
                  title: {
                      text: '总数: '+count+'人',
                      x: 'left',
                      y: '4%',
                      textStyle: {
                          fontWeight: 'normal',
                          color: '#fff',
                          fontSize: graph_x
                      }
                  },
                  tooltip: {
                      show: true,
                      trigger: 'item',
                      position:"right",
                      formatter: "{b}:{c}人({d}%)"
                  },
                    legend: {
                        //orient: 'vertical',
                        selectedMode:false,
                        x: 'right',
                        y:"4%",
                        data: ['未落实','已落实'],
                        textStyle:{
                            fontSize:14,
                            color:"#fff"
                        }
                    },
                    series: [{
                        name: '实施状态',
                        type: 'pie',
                        radius: [0, '41%'],
                        center:["50%","50%"],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: '{b}:{c}人',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: graph_x
                                }
                            }
                        },
                        data:dataC
                    }]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            }
        })
    }
    /*全市各区村教育扶贫实施情况*/
    var poveries = $("#poveries")
    industryPoverty2();
    function industryPoverty2(){
         var str = '';
        $.ajax({
            url:url+"/edu/vill/query",
            method:"get",
            dataType:"json",
            data:{'villageNo':villagCode},
            success:function (result) {
               if(result.code==2000){
                   var data = result.data[1];
               }
               for(let i = 0; i < data.noStudent.length; i++){
                 str +=`  	<li>
                        <div style="color:#fff">${data.noStudent[i].NAME}</div>
                        <div>${data.noStudent[i].AAB009}</div>
                    </li>
                    `;
               }
              for(let i = 0; i < data.reachStudent.length; i++){
                   str += `	<li>
                        <div style="color:#fff">${data.reachStudent[i].NAME}</div>
                        <div>${data.reachStudent[i].AAB009}</div>
                    </li>`;
               }
               poveries.html(str);
            }

     })
     }

    /*************************************右上 在校生分阶段情况*******************************************/
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    industryPoverty3();
    function industryPoverty3(){
        let datass;
        let datass2=[];
        let school = [];
        var paramsNum;
        $.ajax({
            url:url+"/edu/vill/query",
            method:"get",
            dataType:"json",
            data:{"villageNo":villagCode},
            success:function (result) {
                // console.log(result)
                let data=result.data[2];
                var pieRadius=['45%', '62%'];
                var yHeight='38%';
                let temp = {"number": 0, "name": "学前"};
                let tem2 = {"number": 1, "name": "小学"};
                let tem3 = {"number": 2, "name": "初中"};
                let tem4 = {"number": 3, "name": "高中"};
                let tem5 = {"number": 4, "name": "中职"};
                let tem6 = {"number": 5, "name": "高职"};
                let tem7 = {"number": 6, "name": "大专及以上"};
                datass2.push(temp,tem2,tem3,tem4,tem5,tem6,tem7);
                school = [data.XQ,data.XX,data.CZ,data.GZ,data.ZZ,data.GZZ,data.QT];
                option = {
                    color: ['#4ddead'],
//                  title: {
//                      text: '在校生分阶段情况',
//                      left: 10,
//                      top:5,
//                      textStyle: {
//                          color: '#fff',
//                          fontSize: 16,
//                      },
//                  },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		                }
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: ['学前','小学','初中','高中','中职','高职','大专及以上'],
                            axisLabel:{
                            interval:0,
                            rotate:-60,
                            textStyle:{
                                fontSize:graph_x
                            }
                        },
                            axisLine:{
                                lineStyle:{
                                    color:'#fff'
                                }
                            }
                        }
                    ],
                    grid: {
                        top: "15%",
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：人',
                            nameTextStyle:{
                                fontSize:14
                            },
                            axisLabel: {
                                formatter: '{value} '
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#fff'
                                }
                            },
                            boundaryGap: false,
                            splitLine:{
                            show:false
                            },
                        },
                    ],
                    series: [
                        {
                            name:'受益户数',
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: school,
                            itemStyle: {
                                        //a柱形图圆角，鼠标移上去效果
                                        emphasis: {
                                            barBorderRadius: [0, 0, 0, 0]
                                        },

                                        normal: {
                                            //柱形图圆角，初始化效果
                                            barBorderRadius:[0, 0, 0, 0]
                                        }
                                    }
                        },

                    ]
                };
            if (option && typeof option === "object") {
                myChart3.setOption(option, true);
            }
                }
            })

       /* myChart3.on("click", eConsole3);
        function eConsole3(param) {
            var  cityName="西安市";
            var  countyName;
            var  townName;
            var villageName;
            var n1 = [];
            var n2 = [];
            var n11 = [];
            var n21 = [];
            var n111 = [];
            var n211 = [];
            $(".pop-up20").css({"opacity":"1","top":"50%"});
            //集中安置 县区
            for(let j=0;j<datass2.length;j++){
                // console.log(params.value+'-----'+datass[j].name);
                if(param.value==datass2[j].name){
                    // console.log(datass[j].number)
                    paramsNum=datass2[j].number;
                }
            }
            $.ajax({
                url:url+'/edu/grade/query',
                method:"get",
                dataType:"json",
                data:{'number':villagCode,'falg':paramsNum},
                success:function (result) {
                    if(result.code==2000){
                        console.log(result.data);
                        for(let i = 0; i < result.data.length; i++ ){
                            n1[i] = result.data[i].AAA011;
                            n2[i] = result.data[i].AAR009;
                        }
                        show20(myChart6,result,cityName);
                    }
                }
            })
            if(param.componentType == "xAxis"){
                $("#project").text(param.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up").css({"opacity":"1","top":"50%"});
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
            /!*点击县到镇*!/
            /!* myChart6.on("click",function(params){
                 var kk;
                 //alert(params.value)
                 for(let i = 0; i < n2.length;i++ ){
                     if(params.value == n2[i]){
                         kk=i;
                         countyName = params.value;
                     }
                 }
                 //console.log(params)
                 $.ajax({
                     url:url+'/edu/grade/query',
                     method:"get",
                     dataType:"json",
                     data:{'number':n1[kk],'falg':params.value},
                     success:function (result) {
                         if(result.code==2000){
                             for(let i = 0; i < result.data.length; i++ ){
                                 n11[i] = result.data[i].AAA011;
                                 n21[i] = result.data[i].AAR009;
                             }
                             show20(myChart12,result,countyName);
                             //alert("2123")
                         }
                     }
                 })
                 if(params.componentType == "xAxis"){
                     $("#countyName9").text(params.value);
                     $(".pop-up20").css({"opacity":0,"top":"-100%"});
                     $(".pop-up21").css({"opacity":"1","top":"50%"});
                 }else{
                     // alert("单击了"+params.name+"柱状图");
                 }
             })*!/
            /!*!/!*点击镇到村*!/
            myChart12.on("click",function(params){
                var kk;
                for(let i = 0; i < n21.length;i++ ){
                    if(params.value == n21[i]){
                        townName = params.value;
                        kk=i;
                    }
                }
                $.ajax({
                    url:url+'/edu/grade/query',
                    method:"get",
                    dataType:"json",
                    data:{'number':n11[kk],'falg':params.value},
                    success:function (result) {
                        if(result.code==2000){
                            for(let i = 0; i < result.data.length; i++ ){
                                n111[i] = result.data[i].AAA011;
                                n211[i] = result.data[i].AAR009;
                            }
                            show20(myChart13,result,townName);
                            //alert("2123")
                        }
                    }
                })
                //console.log(params)
                if(params.componentType == "xAxis"){
                    $("#countyName10").text(params.value);
                    $(".pop-up21").css({"opacity":0,"top":"-100%"});
                    $(".pop-up22").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /!*点击村到户*!/
            myChart13.on("click",function(params){
                var kk;
                var zhangfei = $("#zhangfei")
                for(let i = 0; i < n211.length;i++ ){
                    if(params.value == n211[i]){
                        kk=i;
                        villageName = params.value;
                    }
                }
                $.ajax({
                    url:url+'/edu/ongo/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':n111[kk],'placement':'1'},
                    success:function (result) {
                        if(result.code==2000){
                            show22table(xiaomin,result,villageName);
                            //alert("2123")
                        }
                    }
                })
                console.log(params)
                if(params.componentType == "xAxis"){
                    $("#villageName6").text(params.value);
                    $(".pop-up22").css({"opacity":0,"top":"-100%"});
                    $(".pop-up23").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })*!/
        }*/
    }


     var dom6 = document.getElementById("module-6");
     var myChart6 = echarts.init(dom6);
     var dom12 = document.getElementById("module-12");
     var myChart12 = echarts.init(dom12);
     var dom13 = document.getElementById("module-13");
     var myChart13 = echarts.init(dom13);
//   myChart3.on("click", eConsole3);
//   function eConsole3(param) {
//       alert(param.value);
//          var  cityName="西安市";
//          var  countyName;
//          var  townName;
//          var villageName;
//          var n1 = [];
//          var n2 = [];
//          var n11 = [];
//          var n21 = [];
//          var n111 = [];
//          var n211 = [];
//          $(".pop-up20").css({"opacity":"1","top":"50%"});
//      //集中安置 村区
//          $.ajax({
//              url:url+'/edu/grade/query',
//              method:"get",
//              dataType:"json",
//              data:{'number':disctId1,'falg':param.value},
//              success:function (result) {
//                  if(result.code==2000){
//                      for(let i = 0; i < result.data.length; i++ ){
//                          n1[i] = result.data[i].AAA011;
//                          n2[i] = result.data[i].AAR009;
//                      }
//                      show20(myChart6,result,cityName);
//                  }
//              }
//          })
//      if(params.componentType == "xAxis"){
//          $("#project").text(params.value);
//          $(".container>.box").css({"opacity":"1","top":"0"});
//          $(".pop-up").css({"opacity":"1","top":"50%"});
//          // alert("单击了"+params.value+"x轴标签");
//      }else{
//          // alert("单击了"+params.name+"柱状图");
//      }
//          /*点击村到镇*/
//          myChart6.on("click",function(params){
//             var kk;
//              //alert(params.value)
//              for(let i = 0; i < n2.length;i++ ){
//                  if(params.value == n2[i]){
//                      kk=i;
//                      countyName = params.value;
//                  }
//              }
//              //console.log(params)
//           $.ajax({
//              url:url+'/edu/grade/query',
//              method:"get",
//              dataType:"json",
//              data:{'number':n1[kk],'falg':params.value},
//              success:function (result) {
//                  if(result.code==2000){
//                       for(let i = 0; i < result.data.length; i++ ){
//                          n11[i] = result.data[i].AAA011;
//                          n21[i] = result.data[i].AAR009;
//                      }
//                      show20(myChart12,result,countyName);
//                      //alert("2123")
//                  }
//              }
//          })
//              if(params.componentType == "xAxis"){
//                  $("#countyName9").text(params.value);
//                  $(".pop-up20").css({"opacity":0,"top":"-100%"});
//                  $(".pop-up21").css({"opacity":"1","top":"50%"});
//              }else{
//                  // alert("单击了"+params.name+"柱状图");
//              }
//          })
//          /*点击镇到村*/
//          myChart12.on("click",function(params){
//              var kk;
//                 for(let i = 0; i < n21.length;i++ ){
//                  if(params.value == n21[i]){
//                      townName = params.value;
//                      kk=i;
//                  }
//              }
//              $.ajax({
//                  url:url+'/edu/grade/query',
//                  method:"get",
//                  dataType:"json",
//                  data:{'number':n11[kk],'falg':params.value},
//                  success:function (result) {
//                      if(result.code==2000){
//                          for(let i = 0; i < result.data.length; i++ ){
//                              n111[i] = result.data[i].AAA011;
//                              n211[i] = result.data[i].AAR009;
//                          }
//                          show20(myChart13,result,townName);
//                          //alert("2123")
//                      }
//              }
//          })
//              //console.log(params)
//              if(params.componentType == "xAxis"){
//                  $("#countyName10").text(params.value);
//                  $(".pop-up21").css({"opacity":0,"top":"-100%"});
//                  $(".pop-up22").css({"opacity":"1","top":"50%"});
//                  // alert("单击了"+params.value+"x轴标签");
//              }else{
//                  // alert("单击了"+params.name+"柱状图");
//              }
//          })
            /*点击村到户*/
//          myChart13.on("click",function(params){
//                var kk;
//                var zhangfei = $("#zhangfei")
//                 for(let i = 0; i < n211.length;i++ ){
//                  if(params.value == n211[i]){
//                      kk=i;
//                      villageName = params.value;
//                  }
//              }
//              $.ajax({
//                  url:url+'/edu/ongo/query',
//                  method:"post",
//                  dataType:"json",
//                  data:{'cityNo':n111[kk],'placement':'1'},
//                  success:function (result) {
//                      if(result.code==2000){
//                          show22table(xiaomin,result,villageName);
//                          //alert("2123")
//                      }
//              }
//          })
//              console.log(params)
//              if(params.componentType == "xAxis"){
//                  $("#villageName6").text(params.value);
//                  $(".pop-up22").css({"opacity":0,"top":"-100%"});
//                  $(".pop-up23").css({"opacity":"1","top":"50%"});
//                  // alert("单击了"+params.value+"x轴标签");
//              }else{
//                  // alert("单击了"+params.name+"柱状图");
//              }
//          })






/****************************集中安置正在实施的村（20）、镇（21）、村（22）*********************************/
function show20(obj,data,name){
obj.innerHTML="";
var n2 = [];
var n3 = [];
var n4 = [];
var n5 = [];
let arr=["未完成","已完成"]
for(let i = 0; i < data.data.length; i++){
   n2[i] = data.data[i].AAR009;
   n3[i] = data.data[i].reach;
   n4[i] = data.data[i].no;
   n5[i] = data.data[i].ongoing;
}
    option = {
            color:  ['#DD4F43','#1FA463'],
            /*title: {
                text: name+'易地搬迁实施情况',
                left: 15,
                top:10,
                textStyle: {
                    fontWeight: '800',
                    color: '#ffffff',
                    fontSize: 16
                }
            },*/
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: arr,
                x: 'right',
                y:"4%",
                textStyle:{    //图例文字的样式
                    color:'#fff'
                }
            },
            grid: {
                top: "15%",
                left: '5%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            yAxis:  {
                type: 'value',
                name: '单位：人',
                nameTextStyle:{
                    fontSize:14
                },
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                },
                splitLine:{
                    show:false
                }
            },
            xAxis: {
                type: 'category',
                data: n2,
                axisLabel:{
                    triggerEvent:true,
                    interval:0,
                    rotate:-60,
                    textStyle:{
                        fontSize:graph_x
                    },
                },
                triggerEvent:true,
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                }
            },
            series: [
                {
                    name: '未落实',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n4,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
                },
                {
                    name: '正实施',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n5,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
                },
                {
                    name: '已落实',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,

                    data: n2,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
                },

            ]
        };
if (option && typeof option === "object") {
    obj.setOption(option, true);
}
}

function show22table(){
        for(let i=0;i<data.reach.length;i++){
         str +=`
            <li style="display: flex;justify-content: space-between;">
                <div>${data.reach[i]}</div>
                <div class="status" style="color:#1FA463">已落实</div>
            </li>
            `;}
}



  /***************************************************教育扶贫分阶段实施情况***********************************************/
    var dom4 = document.getElementById("module-4");
    var myChart4 = echarts.init(dom4);
    industryPoverty4();
    function industryPoverty4(){
        let school0;
        let school1;
      //  alert("dasd")
        $.ajax({
            url:url+"/edu/vill/query",
            method:"get",
            dataType:"json",
            data:{"villageNo":villagCode},
            success:function (result) {
                // console.log(result)
                let data=result.data[3];
                var pieRadius=['45%', '62%'];
                var yHeight='38%';
                 school0 = [data.no.XQ,data.no.XX,data.no.CZ,data.no.GZ,data.no.ZZ,data.no.GZZ,data.no.QT];
                 school1 = [data.reach.XQ,data.reach.XX,data.reach.CZ,data.reach.GZ,data.reach.ZZ,data.reach.GZZ,data.reach.QT];
               option = {
                    color:  ['#DD4F43','#1FA463'],
//                  title: {
//                      text: '教育扶贫分阶段实施情况',
//                      left: 15,
//                      top:10,
//                      textStyle: {
//                          fontWeight: '800',
//                          color: '#ffffff',
//                          fontSize: 16
//                      }
//                  },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['未落实','已落实'],
                        x: 'right',
                        y:"4%",
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    grid: {
                        top: "15%",
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
                        containLabel: true
                    },
                    yAxis:  {
                        type: 'value',
                        name: '单位：人',
                        nameTextStyle:{
                            fontSize:14
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#fff'
                            }
                        },
			            splitLine:{
			                show:true ,
			                lineStyle:{
			                    color:color,
			                    width:num,
			                    type:'dashed'
			                }
			            }
                    },
                    xAxis: {
                        type: 'category',
                        data: ['学前','小学','初中','高中','中职','高职','大专及以上'],
                        axisLabel:{
                            triggerEvent:true,
                            interval:0,
                            rotate:-60,
                            textStyle:{
                                fontSize:graph_x
                            },
                        },
                        triggerEvent:true,
                        axisLine:{
                            lineStyle:{
                                color:'#fff'
                            }
                        },
		            splitLine:{
		                show:true ,
		                lineStyle:{
		                    color:color,
		                    width:num,
		                    type:'dashed'
		                }
		            }
                    },
                    series: [
                        {
                            name: '未落实',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data:school0,
                            itemStyle: {
                                //柱形图圆角，鼠标移上去效果
                                emphasis: {
                                    barBorderRadius: [0, 0, 0, 0]
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[0, 0, 0, 0]
                                }
                            }
                        },
                        {
                            name: '已落实',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data: school1,
                            itemStyle: {
                                //柱形图圆角，鼠标移上去效果
                                emphasis: {
                                    barBorderRadius:[0, 0, 0, 0]
                                },
                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[0, 0, 0, 0]
                                }
                            }
                        },

                    ]
                };
               if (option && typeof option === "object") {
                    myChart4.setOption(option, true);
                }
            }
        })
    }
//     /*******************************************分散安置 **************************************************/
//      var dog23 = document.getElementById("module-23"); //未落实 村
//      var myChart23 = echarts.init(dog23);
//      var dog24 = document.getElementById("module-24");//未落实 镇
//      var myChart24 = echarts.init(dog24);
//      var dog25 = document.getElementById("module-25"); // 未落实 村
//      var myChart25 = echarts.init(dog25);
//      var dog26 = document.getElementById("module-26");  //已落实村
//      var myChart26 = echarts.init(dog26);
//      var dog27 = document.getElementById("module-27");  //已落实 镇
//      var myChart27 = echarts.init(dog27);
//      var dog28 = document.getElementById("module-28");  //已落实 村
//      var myChart28 = echarts.init(dog28);
//      var dog29 = document.getElementById("module-29"); //正实施
//      var myChart29 = echarts.init(dog29);
//      var dom30 = document.getElementById("module-30"); //正
//      var myChart30 = echarts.init(dom30);
//      var dom31 = document.getElementById("module-31"); //正
//      var myChart31 = echarts.init(dom31);
//      var  hongda = $("#hongda");//未落实 户
//      var zhengqiang = $("#zhengqiang");//完成
    myChart4.on("click", eConsole4);
    function eConsole4(param) {

// /**************8*****分散安置正在实施********************/
//         }else if(param.dataIndex==1){
            var n1 = [];
            var n2 = [];
            var n11 = [];
            var n21 = [];
            var n111 = [];
            var n211 = [];
            var city = "西安市";
            var county;
            var town;
            var village;
            $(".pop-up32").css({"opacity":"1","top":"50%"});
        //集中安置 村区
            $.ajax({
                url:url+'/edu/ongo/query',
                method:"post",
                dataType:"json",
                data:{'cityNo':villagCode,'placement':'0'},
                success:function (result) {
                    if(result.code==2000){
                        for(let i = 0; i < result.data.length; i++ ){
                            n1[i] = result.data[i].AAA011;
                            n2[i] = result.data[i].AAR009;
                        }
                        show30(myChart29,result,city);
                    }
                }
            })
            /*点击村到镇*/
            myChart29.on("click",function(params){
               var gg;
                //alert(params.value)
                for(let i = 0; i < n2.length;i++ ){
                    if(params.value == n2[i]){
                        gg=i;
                        county = params.value;
                    }
                }
                //console.log(params)
             $.ajax({
                url:url+'/edu/ongo/query',
                method:"post",
                dataType:"json",
                data:{'cityNo':n1[gg],'placement':'0'},
                success:function (result) {
                    if(result.code==2000){
                         for(let i = 0; i < result.data.length; i++ ){
                            n11[i] = result.data[i].AAA011;
                            n21[i] = result.data[i].AAR009;
                        }
                        show30(myChart30,result,county);
                        //alert("2123")
                    }
                }
            })
                if(params.componentType == "xAxis"){
                    $("#countyName15").text(params.value);
                    $(".pop-up32").css({"opacity":0,"top":"-100%"});
                    $(".pop-up33").css({"opacity":"1","top":"50%"});
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击镇到村*/
            myChart30.on("click",function(params){
                var gg;
                   for(let i = 0; i < n21.length;i++ ){
                    if(params.value == n21[i]){
                        gg=i;
                        town = params.value;
                    }
                }
                $.ajax({
                    url:url+'/edu/ongo/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':n11[gg],'placement':'0'},
                    success:function (result) {
                        if(result.code==2000){
                            for(let i = 0; i < result.data.length; i++ ){
                                n111[i] = result.data[i].AAA011;
                                n211[i] = result.data[i].AAR009;
                            }
                            show30(myChart31,result,town);
                            //alert("2123")
                        }
                }
            })
                //console.log(params)
                if(params.componentType == "xAxis"){
                    $("#countyName16").text(params.value);
                    $(".pop-up33").css({"opacity":0,"top":"-100%"});
                    $(".pop-up34").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击村到户*/
            myChart31.on("click",function(params){
                  var gg;
                  var lele = $("#lele")
                   for(let i = 0; i < n211.length;i++ ){
                    if(params.value == n211[i]){
                        gg=i;
                        village = params.value;
                    }
                }
                $.ajax({
                    url:url+'/edu/ongo/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':n111[gg],'placement':'0'},
                    success:function (result) {
                        if(data.code=2000){
                            show30table(lele,result,village);
                            //alert("2123")
                        }
                }
            })
                console.log(params)
                if(params.componentType == "xAxis"){
                    $("#villageName7").text(params.value);
                    $(".pop-up34").css({"opacity":0,"top":"-100%"});
                    $(".pop-up35").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
    }


/****************************分散安置正在实施的村（29）、镇（30）、村（31）的渲染*********************************/
function show30(obj,data,name){
  //  alert("dasd");
obj.innerHTML="";
var n2 = [];
var n3 = [];
var n4 = [];
var n5 = [];

for(let i = 0; i < data.data.length; i++){
   n2[i] = data.data[i].AAR009;
   n3[i] = data.data[i].reach;
   n4[i] = data.data[i].no;
   n5[i] = data.data[i].ongoing;
}
    option = {
            color:  ['#DD4F43','#1FA463'],
            title: {
                text: name+'易地搬迁实施情况',
                left: 15,
                top:10,
                textStyle: {
                    fontWeight: '800',
                    color: '#ffffff',
                    fontSize: 16
                }
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: arr,
                x: 'right',
                y:"4%",
                textStyle:{    //图例文字的样式
                    color:'#fff'
                }
            },
            grid: {
                top: "23%",
                left: '2%',
                right: '5%',
                bottom: '5%',
                containLabel: true
            },
            yAxis:  {
                type: 'value',
                name: '单位：人',
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                },
	            splitLine:{
	                show:true ,
	                lineStyle:{
	                    color:color,
	                    width:num,
	                    type:'dashed'
	                }
	            }
            },
            xAxis: {
                type: 'category',
                data: n2,
                axisLabel:{
                    triggerEvent:true,
                    interval:0,
                    rotate:-30,
                    textStyle:{
                        fontSize:graph_x
                    },
                },
                triggerEvent:true,
                axisLine:{
                    lineStyle:{
                        color:'#fff'
                    }
                },
	            splitLine:{
	                show:true ,
	                lineStyle:{
	                    color:color,
	                    width:num,
	                    type:'dashed'
	                }
	            }
            },
            series: [
                {
                    name: '未落实',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n4,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
                },
                {
                    name: '正实施',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n5,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
                },
                {
                    name: '已落实',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,

                    data: n2,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius:[0, 0, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
                },

            ]
        };
if (option && typeof option === "object") {
    obj.setOption(option, true);
}
}
function show30table(obj,data){
    alert("dasd")
    obj.empty();
    var str = "";
    for(let i = 0; i < data.data.length; i+3){
        str +=`
      <li>
            <div>${data.data[i]}</div>
            <div>${data.data[i+1]}</div>
            <div>${data.data[i+2]}</div>
        </li>
        `;
    }
    obj.html(str);
}
})