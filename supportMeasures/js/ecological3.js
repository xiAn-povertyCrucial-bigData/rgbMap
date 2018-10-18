 $(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*市生态扶贫达标情况统计*/
    let countyName=countryName;
    let villagName=villageName;
    $("#villName").text(villagName);
    $(".fpCounty").html(villageName);
   // $("#villName2").text(villagName);
   // console.log(villagName)
    let villagCode=villageCode;
    var disctId = villagCode;
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
       // let name1=villagName+"生态扶贫达标情况统计";
        $.ajax({
            url:url+"/ecology/aLayer",
            method:"get",
            dataType:"json",
            data:{"villNo":disctId},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['未达标','不享受','已达标'];
                let datatable =[data.noReach-data.noEcology,data.noEcology,data.isReach];
                for (var key in data)
                {
                    let temp = {"value":datatable[i],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }
                var dataC=datas;
                let count=data.noReach+data.isReach;
              option = {
                    color:  ['#DD4F43','#41b97e','#1FA463'],
                      title: {
                          text: '总数: '+count+'户',
                          x: 'left',
                          y: '4%',
                          textStyle: {
                              fontWeight: 'normal',
                              color: '#fff',
                              fontSize: graph_x
                          }
                      },
                    legend: {
                        selectedMode:false,
                        x: 'right',
                        y:"4%",
                        data: ['未达标','不享受','已达标'],
                        textStyle:{
                            fontSize:graph_x,
                            color:"#fff"
                        }
                    },
                  grid: {
                      top: "4%",
                      left: '2%',
                      right: '5%',
                      bottom: '15%',
                      containLabel: true
                  },
                    series: [{
                        name: '达标状态',
                        type: 'pie',
                        radius: pieRadius,
                        center:["50%","50%"],
                        label: {
                            formatter: '{b}:{c}户',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: graph_x
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

    industryPoverty2();
    function industryPoverty2(){
      $.ajax({
            url:url+"/ecology/reachName",
            method:"get",
            dataType:"json",
            data:{"villNo":disctId},
            success:function (result) {
                if(result.code==2000){
                    var str = '';
                    var data = result.data;
                    for(let i = 0; i < data.isName.length; i++){
                         str += `
                         	<li>
                                <div style='width:50%;'>${data.isName[i]}</div>
                                <div style='color:#1FA463;width:50%;'>已达标</div>
                            </li>
                         `
                    }
                    for (let i = 0; i < data.noEcology.length; i++) {
                        str += `
                            <li>
                                <div style='width:50%;'>${data.noEcology[i]}</div>
                                <div style='color:#41b97e;width:50%;'>不享受</div>
                            </li>

                     `;
                    }
                    for(let i = 0; i < data.noName.length; i++){
                         str += `
                            <li>
                                <div style='width:50%;'>${data.noName[i]}</div>
                                <div style='color:#DD4F43;width:50%;'>未达标</div>
                            </li>
                         `
                    }
                    $("#villNa").html(str)
                }
            }
      })
    }

    /*************************************右上 在校生分阶段情况*******************************************/
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    // var dom4 = document.getElementById("module-4");
    // var myChart4 = echarts.init(dom4);
    industryPoverty3();
    function industryPoverty3(){
        let datass;
        let datass2;
        // let school = [];
        // var paramsNum;
        let name3=countyName+"生态扶贫项目收益情况";
        $.ajax({
            url:url+"/ecology/aSubItes",
            method:"get",
            dataType:"json",
            data:{"villNo":disctId},
            success:function (result) {
                data = result.data;
                let datas=[];    //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                let datas6=[];  //数据5
                let arr=['未达标','已达标'];
                /*遍历保存市的区县名称和区县编号*/
                option = {
                    color: ['#4ddead', '#3c7eb5'],
//                  title: {
//                      text: '五保户分类统计',
//                      left:15,
//                      top:10,
//                      textStyle: {
//                          color: '#fff',
//                          fontSize: 16,
//                      },
//                  },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        x:'right',
                        top:"4%",
                        data:['户数','人数'],
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: ["退耕还林","生态林补偿"],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#fff'
                                }
                            },
                            axisLabel: {
                                interval:0,
                                rotate:0,
                                fontSize:graph_x
                            }
                        }
                    ],
                    grid: {
                        top: "25%",
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '户数',
                            minInterval : 1,
                            nameTextStyle:{
                                fontSize:14
                            },
                            axisLabel: {
                                formatter: '{value}',
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
                        {
                            type: 'value',
                            name: '人数',
                            minInterval : 1,
                            axisLabel: {
                                formatter: '{value}'
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
                            name:'户数',
                            nameTextStyle:{
                                fontSize:14
                            },
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:[data.REFOREST,data.ECOFOREST]
                        },
                        {
                            name:'人数',
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            yAxisIndex: 1,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:[data.REFORESTNUM,data.ECOFORESTNUM]
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart3.setOption(option, true);
                }
            }
        })

        myChart3.on("click",function(params){
            // console.log(params)
            $("#villageName2").text(villagName)
            if(params.componentType == "xAxis"){
                $("#projects2").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up10").css({"opacity":"1","top":"50%"});
                if(params.value=="退耕还林"){
                    let nameList2=$("#nameList2")
                    $.ajax({
                        url:url+"/ecology/ecoForestName",
                        method:"post",
                        dataType:"json",
                        data:{"villNo":disctId},
                        success:function (result) {
                            let data=result.data;
                            $("#peopleNum3").text(data.length+"人");
                            showList(nameList2,data);
                        }
                    })
                }else if(params.value="生态林补偿"){
                    let nameList2=$("#nameList2")
                    $.ajax({
                        url:url+"/ecology/reForestName",
                        method:"post",
                        dataType:"json",
                        data:{"villNo":disctId},
                        success:function (result) {
                            let data=result.data;
                            $("#peopleNum3").text(data.length+"人");
                            showList(nameList2,data);
                        }
                    })
                }
                function showList(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:100%;">${data[i]}</div>
                     </li>
                  `;
                        obj.html(function (i,value) {
                            return value+str;
                        })
                    }
                }
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
    }

  /***************************************************生态扶贫分阶段达标情况***********************************************/
  var dom4 = document.getElementById("module-4");
  var myChart4 = echarts.init(dom4);
  //let name4=villagName+"生态补偿发放情况";
    industryPoverty4();
    function industryPoverty4(){
        $.ajax({
            url:url+"/ecology/aRangerForsetNum",
            method:"get",
            dataType:"json",
            data:{"villNo":disctId},
            success:function (result) {
                // console.log(result)
                var pieRadius=['45%', '62%'];
                var yHeight='38%';

              option = {
                    color: ['#4ddead'],
                    // title: {
                    //     text: name4,
                    //     left: 10,
                    //     top:5,
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 16,
                    //     },
                    // },
                    tooltip: {
                        trigger: 'axis'
                    },

                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: ['护林员安置','生态补偿发放人数'],
                            axisLabel:{
                                textStyle:{
                                    fontSize:graph_x
                                },
                                formatter:function(value){
                                    return value.split("").join("\n")
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
                      bottom: '30%',
                      containLabel: true
                  },
                    yAxis: [
                        {
                            type: 'value',
                            minInterval : 1,
                            nameTextStyle:{
                                fontSize:14
                            },
                            name: '单位：人',
                            axisLabel: {
                                formatter: '{value} '
                            },
                            axisLine:{
                                lineStyle:{
                                    color:'#fff'
                                }
                            },
                            boundaryGap: true,
                            splitLine:{
                            show:false
                            },
                        },
                    ],
                    series: [
                        {
                            name:'人数',
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:result.data,
                            itemStyle: {
                                        //a柱形图圆角，鼠标移上去效果
                                        emphasis: {
                                            barBorderRadius:[0, 0, 0, 0]
                                        },

                                        normal: {
                                            //柱形图圆角，初始化效果
                                            barBorderRadius:[0, 0, 0, 0]
                                        }
                            }
                        }
                    ]
                };
               if (option && typeof option === "object") {
                    myChart4.setOption(option, true);
                }
            }
        })
        myChart4.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#houseName3").text(villagName);
                if(params.value=="护林员安置"){
                    $("#projects").text(params.value);
                    $(".container>.box").css({"opacity":"1","top":"0"});
                    $(".pop-up16").css({"opacity":"1","top":"50%"});
                    let nameList3=$("#nameList3")
                    $.ajax({
                        url:url+"/ecology/rangerName",
                        method:"post",
                        dataType:"json",
                        data:{"villNo":disctId},
                        success:function (result) {
                            let data=result.data;
                            $("#peopleNum4").text(data.length+"人");
                            showList(nameList3,data);
                        }
                    })
                }else if(params.value=="生态补偿发放人数"){
                    $("#projects").text(params.value);
                    $(".container>.box").css({"opacity":"1","top":"0"});
                    $(".pop-up16").css({"opacity":"1","top":"50%"});
                    let nameList3=$("#nameList3");
                    $.ajax({
                        url:url+"/ecology/ecoForestName",
                        method:"post",
                        dataType:"json",
                        data:{"villNo":disctId},
                        success:function (result) {
                            let data=result.data;
                            $("#peopleNum4").text(data.length+"人");
                            showList(nameList3,data);
                        }
                    })
                }
                function showList(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:100%;">${data[i]}</div>
                     </li>
                  `;
                        obj.html(function (i,value) {
                            return value+str;
                        })
                    }
                }

                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })

    }
    industryPoverty5();
    function industryPoverty5(){
        var pieRadius=['45%', '62%'];
        var yHeight='38%';
        var dom5 = document.getElementById("module-5");
        var myChart5 = echarts.init(dom5);
        $.ajax({
            url:url+"/ecology/aEcoProfit",
            method:"get",
            dataType:"json",
            data:{"villNo":disctId},
            success:function (result) {
                 data = result.data;
            option = {
                color: ['#4ddead'],
                // title: {
                //     text: '全市生态补偿发放情况',
                //     left: 10,
                //     top:5,
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: 16,
                //     },
                // },
                tooltip: {
                    trigger: 'axis'
                },

                xAxis: [
                    {
                        triggerEvent:true,
                        type: 'category',
                        data: ['生态补偿发放金额'],
                        axisLabel:{
                            textStyle:{
                                fontSize:graph_x
                            },
                            formatter:function(value){
                                return value.split("").join("\n")
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
                    bottom: '30%',
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '单位：元',
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
                        boundaryGap: true,
                        splitLine:{
                            show:false
                        },
                    },
                ],
                series: [
                    {
                        name:'人数',
                        type:'bar',
                        barWidth : 15,//柱图宽度
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data:[data.PROFIT],
                        itemStyle: {
                            //a柱形图圆角，鼠标移上去效果
                            emphasis: {
                                barBorderRadius:[0, 0, 0, 0]
                            },

                            normal: {
                                //柱形图圆角，初始化效果
                                barBorderRadius:[0, 0, 0, 0]
                            }
                        }
                    }
                ]
            };
            if (option && typeof option === "object") {
                myChart5.setOption(option, true);
            }
            }
        })
        myChart5.on("click",function(params){
            $("#villageName4").text(villagName)
            if(params.componentType == "xAxis"){
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up19").css({"opacity":"1","top":"50%"});
                let nameList=$("#nameList")
                $.ajax({
                    url:url+"/ecology/ecoPorfitName",
                    method:"post",
                    dataType:"json",
                    data:{"villNo":disctId},
                    success:function (result) {
                        let data=result.data;
                        showList(nameList,data);
                    }
                })
                function showList(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                       let str=`
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:25%;">${data[i].AAB002}</div>
							<div style="width:25%;">${data[i].AREA}</div>
							<div style="width:25%;">${data[i].PROFIT}</div>
							<div style="width:25%;">${data[i].RANGER}</div>
                     </li>
                  `;
                        obj.html(function (i,value) {
                            return value+str;
                        })
                    }
                }
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
    }
})