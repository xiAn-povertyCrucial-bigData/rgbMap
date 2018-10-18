$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    let countyName=countryName;
    $(".fpVill").html(countyName);
    $("#countyName").text(countyName);  //地图上面的标题

    let dom = document.getElementById("module-1");
    let myChart = echarts.init(dom);
    let dom2 = document.getElementById("module-2");
    let myChart2 = echarts.init(dom2);
    let dom3= document.getElementById("module-3");
    let myChart3 = echarts.init(dom3);
    let dom4 = document.getElementById("module-4");
    let myChart4 = echarts.init(dom4);
    var dom5 = document.getElementById("module-5");
    var myChart5 = echarts.init(dom5);
    let dom12= document.getElementById("module-12");
    let myChart12 = echarts.init(dom12);
    $.ajax({
        url:url+"/init/disct/name",
        method:"post",
        dataType:"json",
        async: false,
        data:{"name":countyName},
        success:function (result) {
            let data=result.data;
            console.log(data);
            industryPoverty(data);
            industryPoverty2(data);
            industryPoverty3(data);
            industryPoverty4(data);
            industryPoverty5(data);
        }
    })
    /*各区县产业扶贫实施情况统计*/
    function industryPoverty(countyNum){
        let pieRadius=['0', '31%'];
        let yHeight='28%';
        let statisticalName=countyName+"产业扶贫实施情况统计";
        $.ajax({
            url:url+"/projway/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['产业未实施','产业正实施','产业已实施','产业就业均已实施']
                let temp = {"value":data.NOT_IMPLEMENTED,"name":arr[0]};
                let temp1 = {"value":data.IS_IMPLEMENTED,"name":arr[1]};
                let temp2 = {"value":data.IS_IMPLEMENTED+data.IMPLEMENTED-data.PROJ_EMPLOY,"name":arr[2]};
                let temp3 = {"value":data.PROJ_EMPLOY,"name":arr[3]};
               let count=data.NOT_IMPLEMENTED*1+data.IS_IMPLEMENTED*1+data.IMPLEMENTED*1;
               datas.push(temp);
                //datas.push(temp1);
                datas.push(temp2);
                datas.push(temp3);
                option = {
                    color:  ['#DD4F43','#1FA463','#1FA463'],
                    title: {
                        text: '总数: '+count+'户',
                        x: 'center',
                        bottom: '15%',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#fff',
                            fontSize: '14'
                        }
                    },
                    legend: {
                        data: arr,
                        x: 'right',
                        y:"4%",
                        selectedMode:false,
                        textStyle:{    //图例文字的样式
                            color:'#fff',
                            fontSize:graph_x
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"right",
                        formatter: "{b}:{c}户({d}%)"
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        center: ['50%', '50%'],
                        color:  ['#DD4F43','#1FA463','#1FA463'],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: "{b}:\n{c}户",
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: graph_x
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                            }
                        },
                        data: datas
                    }]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            }
        })
    }
    /*区县下各镇产业扶贫实施情况*/
    function industryPoverty2(data) {
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        //let implementationName = countyName + "各镇（街）产业扶贫实施情况";
        $.ajax({
            url: url+"/projway/countlist",
            method: "post",
            dataType: "json",
            data: {"year": year, "disctId": data},
            success: function (result) {
                // console.log(result)
                let data = result.data;
                let datas = [];
                let datas2 = [];
                let datas3 = [];
                let datas4 = [];
                let datas7 = [];
                let arr = ['未实施','已实施']
                for (let i = 0; i < data.length; i++) {
                    datas.push(data[i]['AAR009']);
                }
                /*遍历存区县下所有的镇名称和镇编号*/
                for (let i in data) {
                    let temp2 = {"name": data[i]['AAR009'], "number": data[i]['AAR008']};
                    i++;
                    datas7.push(temp2);
                }
                datass2 = datas7;
                console.log(datass2)
                for (let i = 0; i < data.length; i++) {
                    datas2.push(data[i]['NOT_IMPLEMENTED']);
                    datas3.push(data[i]['IS_IMPLEMENTED']);
                    datas4.push(data[i]['IMPLEMENTED']+data[i]['IS_IMPLEMENTED']);
                }
                option = {
                    color: ['#DD4F43', '#1FA463'],
//                  title: {
//                      text: implementationName,
//                      left: 15,
//                      top: 10,
//                      textStyle: {
//                          fontWeight: '800',
//                          color: '#ffffff',
//                          fontSize: 16
//                      }
//                  },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: arr,
                        x: 'right',
                        y: "4%",
                        textStyle: {    //图例文字的样式
                            color: '#fff'
                        }
                    },
                    grid: {
                        top: "15%",
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                        name: '单位：户',
                        minInterval:1,
                        nameTextStyle:{
                            fontSize:14
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine:{
                            show: true,
                            lineStyle:{
                                color:color,
                                width:1,
                                type:"dashed",
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: datas,
                        axisLabel: {
                            triggerEvent: true,
                            interval: 0,
                            rotate: -80,
                            textStyle: {
                                fontSize: graph_x
                            },
                        },
                        triggerEvent: true,
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine:{
                            show: true,
                            lineStyle:{
                                color:color,
                                width:1,
                                type:"dashed",
                            }
                        }
                    },
                    series: [
                        {
                            name: '未实施',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data: datas2,
                            itemStyle: {
                                //柱形图圆角，鼠标移上去效果
                                emphasis: {
                                    barBorderRadius: [0, 0, 0, 0]
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius: [0, 0, 0, 0]
                                }
                            }
                        },
//                      {
//                          name: '正实施',
//                          type: 'bar',
//                          stack: '总量',
//                          barWidth: 10,
//                          data: datas3,
//                          itemStyle: {
//                              //柱形图圆角，鼠标移上去效果
//                              emphasis: {
//                                  barBorderRadius: [0, 0, 0, 0]
//                              },
//                              normal: {
//                                  //柱形图圆角，初始化效果
//                                  barBorderRadius: [0, 0, 0, 0]
//                              }
//                          }
//                      },
                        {
                            name: '已实施',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,

                            data: datas4,
                            itemStyle: {
                                //柱形图圆角，鼠标移上去效果
                                emphasis: {
                                    barBorderRadius: [0, 0, 0, 0]
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius: [0, 0, 0, 0]
                                }
                            }
                        },

                    ]
                };
                if (option && typeof option === "object") {
                    myChart2.setOption(option, true);
                }
            }
        })
        /*点击镇（街）*/
        let dom11 = document.getElementById("module-11");
		let myChart11 = echarts.init(dom11);
        myChart2.on("click", function (params) {
         if (params.componentType == "xAxis") {
             $("#villageName").text(params.value);
             $(".container>.box").css({"opacity":"1","top":"0"});
             $(".pop-up5").css({"opacity": 0, "top": "-100%"});
             $(".pop-up6").css({"opacity": "1", "top": "50%"});
             /*点击柱状图找对应的镇编号传给后台*/
             var paramsNum2;
             for (let j = 0; j < datass2.length; j++) {
                 if (params.value == datass2[j].name) {
                     paramsNum2 = datass2[j].number;
                 }
             }
             $.ajax({
                 url: url+"/projway/countlist",
                 method: "post",
                 dataType: "json",
                 data: {"year": year, "disctId": paramsNum2},
                 success: function (result) {
                     let data = result.data;
                     let datas = [];
                     let datas2 = [];
                     let datas3 = [];
                     let datas4 = [];
                     let datas8 = [];
                     let arr = ['未实施', '已实施']
                     for (let i = 0; i < data.length; i++) {
                         datas.push(data[i]['AAR009']);
                     }
                     /*遍历存镇下所有的村名称和村编号*/
                     for (let i in data) {
                         let temp3 = {"name": data[i]['AAR009'], "number": data[i]['AAR008']};
                         i++;
                         datas8.push(temp3);
                     }
                     datass3 = datas8;
                     for (let i = 0; i < data.length; i++) {
                         datas2.push(data[i]['NOT_IMPLEMENTED']);
                         datas3.push(data[i]['IS_IMPLEMENTED']);
                         datas4.push(data[i]['IMPLEMENTED']+data[i]['IS_IMPLEMENTED']);
                     }
                     option = {
                         color: ['#DD4F43', '#1FA463'],
                         tooltip: {
                             trigger: 'axis',
                             axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                 type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                             }
                         },
                         legend: {
                             data: ['未实施','已实施'],
                             x: 'right',
                             y: "4%",
                             textStyle: {    //图例文字的样式
                                 color: '#fff'
                             }
                         },
                         grid: {
                             top: "15%",
                             left: '5%',
                             right: '5%',
                             bottom: '15%',
                             containLabel: true
                         },
                         yAxis: {
                             type: 'value',
                             name: '单位：户',
                             minInterval:1,
                             axisLine: {
                                 lineStyle: {
                                     color: '#fff'
                                 }
                             },
                             splitLine:{
                                 show: true,
                                 lineStyle:{
                                     color:color,
                                     width:1,
                                     type:"dashed",
                                 }
                             }
                         },
                         xAxis: {
                             type: 'category',
                             data: datas,
                             axisLabel: {
                                 triggerEvent: true,
                                 interval: 0,
                                 rotate: -60,
                                 textStyle: {
                                     fontSize: graph_x
                                 },
                             },
                             triggerEvent: true,
                             axisLine: {
                                 lineStyle: {
                                     color: '#fff'
                                 }
                             },
                             splitLine:{
                                 show: true,
                                 lineStyle:{
                                     color:color,
                                     width:1,
                                     type:"dashed",
                                 }
                             }
                         },
                         series: [
                             {
                                 name: '未实施',
                                 type: 'bar',
                                 stack: '总量',
                                 barWidth: 10,
                                 data: datas2,
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
//                           {
//                               name: '正实施',
//                               type: 'bar',
//                               stack: '总量',
//                               barWidth: 10,
//                               data: datas3,
//                               itemStyle: {
//                                   //柱形图圆角，鼠标移上去效果
//                                   emphasis: {
//                                       barBorderRadius: [0, 0, 0, 0]
//                                   },
//                                   normal: {
//                                       //柱形图圆角，初始化效果
//                                       barBorderRadius: [0, 0, 0, 0]
//                                   }
//                               }
//                           },
                             {
                                 name: '已实施',
                                 type: 'bar',
                                 stack: '总量',
                                 barWidth: 10,
                                 data: datas4,
                                 itemStyle: {
                                     //柱形图圆角，鼠标移上去效果
                                     emphasis: {
                                         barBorderRadius:[0, 0, 0, 0]
                                     },

                                     normal: {
                                         //柱形图圆角，初始化效果
                                         barBorderRadius: [0, 0, 0, 0]
                                     }
                                 }
                             },

                         ]
                     };
                     if (option && typeof option === "object") {
                         myChart11.setOption(option, true);
                     }
                 }
             })
         }
     })
        /*点击村*/
        myChart11.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#houseName").text(params.value);
                $(".pop-up6").css({"opacity":0,"top":"-100%"});
                $(".pop-up7").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                var paramsNum3;
                for(let j=0;j<datass3.length;j++){
                    if(params.value==datass3[j].name){
                        paramsNum3=datass3[j].number;
                    }
                }
                let nameList=$("#nameList");
                $.ajax({
                    url:url+"/projway/namelist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"disctId":paramsNum3},
                    success:function (result) {
                        let data = result.data;
                        showList(nameList,data);
                        console.log(data.length);
                        console.log($(".status").length);
                        for(let i=0;i<$(".status").length;i++){
                            if($(".status").eq(i).text()==0){
                                $(".status").eq(i).text("未实施").css("color","#DD4F43");
                            }else if($(".status").eq(i).text()==2||$(".status").eq(i).text()==1){
                                $(".status").eq(i).text("已实施").css("color","#1FA463");
                            }
                        }
                    }
                })
                function showList(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
							<div>${data[i]['AAC029']}</div>
							<div class="status">${data[i]['STATUS']}</div>
                        </li>
                     `;
                        obj.html(function (i,value) {
                            return value+str;
                        })
                    }
                }
            }
        })
    }
    /*全市产业扶贫子项目数量统计*/
    function industryPoverty3(data){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        let projectName = countyName + "各个子项目实施完成情况统计";
        $.ajax({
            url:url+"/projway/product/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":data},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                // console.log(data)
                let datas=[];
                let datas2=[];
                let datas3=[];
                let datas4=[];
                let datas5=[];
                let datas7=[];
                for(let i=0;i<data.length;i++){
                    datas.push(data[i]['AAR009']);
                }
                /*遍历存区县下所有的镇名称和镇编号*/
                for (let i in data)
                {
                    let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas7.push(temp3);
                }
                datass=datas7;
                /*遍历主导产业所有的名称和编号*/
                for (let i in data)
                {
                    let temp2 = {"number":data[i]['type'],"name":data[i]['typename']};
                    i++;
                    datas5.push(temp2);
                }
                datass2=datas5;
                console.log(datass2)
                for(let i=0;i<data.length;i++){
                    datas2.push(data[i]['NUM']);
                    datas3.push(data[i]['typename']);
                    datas4.push(data[i]['type']);
                }
                option = {
                    color: ['#4ddead'],
//                  title: {
//                      text: projectName,
//                      left: 10,
//                      top:5,
//                      textStyle: {
//                          color: '#fff',
//                          fontSize: 16,
//                      },
//                  },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: datas3,
                            axisLabel:{
                                interval:0,
                                rotate:-40,
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
                        bottom: '25%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：户',
                            minInterval:1,
                            nameTextStyle:{
                                fontSize:14
                            },
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
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:datas2,
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
                        },

                    ]
                };
                if (option && typeof option === "object") {
                    myChart3.setOption(option, true);
                }
            }
        })
        /*产业名称*/
         myChart3.on("click",function(params){
         if(params.componentType == "xAxis"){
             // console.log(params.value);
             $("#project2").text(params.value);
             $(".container>.box").css({"opacity":"1","top":"0"});
             $(".pop-up8").css({"opacity":"1","top":"50%"});
             /*点击柱状图找对应的产业编号传给后台*/
             // console.log(datass2.length)
             for(let j=0;j<datass2.length;j++){
                 // console.log(params.value+'-----'+datass[j].name);
                 if(params.value==datass2[j].name){
                     // console.log(datass[j].number)
                     paramsNum=datass2[j].number;
                 }
             }
             // console.log(paramsNum);
             $.ajax({
                 url:url+"/projway/product/type",
                 method:"post",
                 dataType:"json",
                 data:{"year":year,"type":paramsNum,"disctId":data},
                 success:function (result) {
                     // console.log(result)
                     let data=result.data;
                     // console.log(data)
                     let datas=[];
                     let datas2=[];
                     let datas3=[];
                     let datas4=[];
                     let datas7=[];
                     for(let i=0;i<data.length;i++){
                         datas.push(data[i]['AAR009']);
                     }
                     /*遍历存区县下所有的镇名称和镇编号*/
                     for (let i in data)
                     {
                         let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                         i++;
                         datas7.push(temp3);
                     }
                     datass=datas7;
                     console.log(datass)
                     for(let i=0;i<data.length;i++){
                         datas2.push(data[i]['NUM']);
                         datas3.push(data[i]['IS_IMPLEMENTED']);
                         datas4.push(data[i]['IMPLEMENTED']);
                     }
                     option = {
                         color: ['#4ddead'],
                         /*title: {
                             text: '各个子项目实施完成情况统计',
                             left: 10,
                             top:5,
                             textStyle: {
                                 color: '#fff',
                                 fontSize: 16,
                             },
                         },*/
                         tooltip: {
                             trigger: 'axis',
                             axisPointer: {
                                 type: 'shadow'
                             },
                         },
                         xAxis: [
                             {
                                 triggerEvent:true,
                                 type: 'category',
                                 data: datas,
                                 axisLabel:{
                                     interval:0,
                                     rotate:-40,
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
                                 name: '单位：户',
                                 minInterval:1,
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
                                 name:'受益户数',
                                 type:'bar',
                                 barWidth : 15,//柱图宽度
                                 label: {
                                     normal: {
                                         show: true,
                                         position: 'top'
                                     }
                                 },
                                 data:datas2,
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
                         myChart12.setOption(option, true);
                     }
                 }
             })
         }
     })
        /*点击区县*/
        /*myChart6.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#project").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up").css({"opacity":0,"top":"-100%"});
                $(".pop-up8").css({"opacity":"1","top":"50%"});
                let dom12= document.getElementById("module-12");
                let myChart12 = echarts.init(dom12);
                /!*点击柱状图找对应的产业编号传给后台*!/
                /!*let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }*!/
                console.log(paramsNum);
                /!*点击柱状图找对应的区县编号传给后台*!/
                let paramsName;
                // console.log(datass2.length)
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);
                $.ajax({
                    url:"http://192.168.1.195:9999/poverty-web-1.0-SNAPSHOT/projway/product/type",
                    method:"post",
                    dataType:"json",
                    data:{"year":201712,"type":paramsNum,"disctId":paramsName},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        // console.log(data)
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        /!*遍历存区县下所有的镇名称和镇编号*!/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        console.log(datass)
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NUM']);
                            datas3.push(data[i]['AAR009']);
                        }
                        option = {
                            color: ['#4ddead'],
                            // title: {
                            //     text: '各个子项目实施完成情况统计',
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
                                    data: datas3,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-30,
                                        textStyle:{
                                            fontSize:10
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
                                top: "10%",
                                left: '2%',
                                right: '5%',
                                bottom: '10%',
                                containLabel: true
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '单位：户',
                                    min: 0,
                                    max: 600,
                                    interval: 120,
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
                                    }
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
                                    data:datas2,
                                    itemStyle: {
                                        //a柱形图圆角，鼠标移上去效果
                                        emphasis: {
                                            barBorderRadius: [3, 3, 0, 0]
                                        },

                                        normal: {
                                            //柱形图圆角，初始化效果
                                            barBorderRadius:[3, 3, 0, 0]
                                        }
                                    }
                                },

                            ]
                        };
                        if (option && typeof option === "object") {
                            myChart12.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })*/
        /*点击镇（街）*/
        myChart12.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                $("#street").text(params.value);
                $("#project3").text($("#project2").text());
                $(".pop-up8").css({"opacity":0,"top":"-100%"});
                $(".pop-up9").css({"opacity":"1","top":"50%"});
                let dom13= document.getElementById("module-13");
                let myChart13 = echarts.init(dom13);
                /*点击柱状图找对应的产业编号传给后台*/
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                console.log(paramsNum)
                /*点击柱状图找对应的镇（街）编号传给后台*/
                let paramsName;
                // console.log(datass2.length)
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);
                $.ajax({
                    url:url+"/projway/product/type",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":paramsName},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        // console.log(data)
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NUM']);
                            datas3.push(data[i]['AAR009']);
                        }
                        option = {
                            color: ['#4ddead'],
                            // title: {
                            //     text: '各个子项目实施完成情况统计',
                            //     left: 10,
                            //     top:5,
                            //     textStyle: {
                            //         color: '#fff',
                            //         fontSize: 16,
                            //     },
                            // },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                },
                            },
                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas3,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-30,
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
                                    name: '单位：户',
                                    minInterval:1,
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
                                    }
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
                                    data:datas2,
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
                            myChart13.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
        /*点击村*/
        myChart13.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#villageName2").text(params.value);
                $("#project4").text($("#project3").text());
                $(".pop-up9").css({"opacity":0,"top":"-100%"});
                $(".pop-up10").css({"opacity":"1","top":"50%"});
                // console.log(datass3)
                /*点击柱状图找对应的村编号传给后台*/
                let paramsName;
                // console.log(datass2.length)
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);
                // console.log(paramsNum3);
                let nameList2=$("#nameList2")
                $.ajax({
                    url:url+"/projway/product/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":paramsName},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums3").text(data.length)
                        showList2(nameList2,data);
                    }
                })
                function showList2(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:100%;">${data[i]['HOLDER_NAME']}</div>
                        </li>
                     `;
                        obj.html(function (i,value) {
                            return value+str;
                        })
                    }
                }
            }
        })

    }
    /*全市产业扶贫发展方式分类统计*/
    function industryPoverty4(data){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        let methodsName = countyName + "产业扶贫发展方式分类统计";
        var paramsNum;
        $.ajax({
            url:url+"/projway/develop/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":data},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                // console.log(data)
                let datas=[];
                let datas2=[];
                let datas3=[];
                let datas4=[];
                let datas5=[];
                for(let i=0;i<data.length;i++){
                    datas.push(data[i]['typename']);
                    datas2.push(data[i]['NUM']);
                    datas3.push(data[i]['IS_IMPLEMENTED']);
                    datas4.push(data[i]['IMPLEMENTED']);
                }
                /*遍历主导产业所有的名称和编号*/
                for (let i in data)
                {
                    let temp2 = {"number":data[i]['type'],"name":data[i]['typename']};
                    i++;
                    datas5.push(temp2);
                }
                datass2=datas5;
                // console.log(datass2)
                option = {
                    color: ['#4ddead'],
//                  title: {
//                      text: methodsName,
//                      left: 10,
//                      top:5,
//                      textStyle: {
//                          color: '#fff',
//                          fontSize: 16,
//                      },
//                  },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: datas,
                            axisLabel:{
                                interval:0,
                                rotate:-30,
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
                        bottom: '25%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：户',
                            minInterval:1,
                            nameTextStyle:{
                                fontSize:14
                            },
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
                            name:'受益户数',
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data:datas2,
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
                        },

                    ]
                };
                if (option && typeof option === "object") {
                    myChart4.setOption(option, true);
                }
            }
        })
        /*点击产业发展方式名称*/
     myChart4.on("click",function(params){
         // console.log(params)
         if(params.componentType == "xAxis"){
             // console.log(params.value);
             $("#method").text(params.value);
             $(".container>.box").css({"opacity":"1","top":"0"});
             $(".pop-up11").css({"opacity":"1","top":"50%"});
             let dom14= document.getElementById("module-14");
             let myChart14 = echarts.init(dom14);
             /*点击柱状图找对应的产业编号传给后台*/

             // console.log(datass2.length)
             for(let j=0;j<datass2.length;j++){
                 // console.log(params.value+'-----'+datass[j].name);
                 if(params.value==datass2[j].name){
                     // console.log(datass[j].number)
                     paramsNum=datass2[j].number;
                 }
             }
             // console.log(paramsNum);
             $.ajax({
                 url:url+"/projway/develop/type",
                 method:"post",
                 dataType:"json",
                 data:{"year":year,"type":paramsNum,"disctId":data},
                 success:function (result) {
                     // console.log(result)
                     let data=result.data;
                     // console.log(data)
                     let datas=[];
                     let datas2=[];
                     let datas3=[];
                     let datas4=[];
                     let datas7=[];
                     for(let i=0;i<data.length;i++){
                         datas.push(data[i]['AAR009']);
                     }
                     /*遍历存区县下所有的镇名称和镇编号*/
                     for (let i in data)
                     {
                         let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                         i++;
                         datas7.push(temp3);
                     }
                     datass=datas7;
                     console.log(datass)
                     for(let i=0;i<data.length;i++){
                         datas2.push(data[i]['NUM']);
                         datas3.push(data[i]['IS_IMPLEMENTED']);
                         datas4.push(data[i]['IMPLEMENTED']);
                     }
                     option = {
                         color: ['#4ddead'],
                         /*title: {
                             text: '各个子项目实施完成情况统计',
                             left: 10,
                             top:5,
                             textStyle: {
                                 color: '#fff',
                                 fontSize: 16,
                             },
                         },*/
                         tooltip: {
                             trigger: 'axis',
                             axisPointer: {
                                 type: 'shadow'
                             },
                         },
                         xAxis: [
                             {
                                 triggerEvent:true,
                                 type: 'category',
                                 data: datas,
                                 axisLabel:{
                                     interval:0,
                                     rotate:-30,
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
                                 name: '单位：户',
                                 minInterval:1,
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
                                 name:'受益户数',
                                 type:'bar',
                                 barWidth : 15,//柱图宽度
                                 label: {
                                     normal: {
                                         show: true,
                                         position: 'top'
                                     }
                                 },
                                 data:datas2,
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
                         myChart14.setOption(option, true);
                     }
                 }
             })
         }
     })
        /*点击镇（街）*/
        myChart14.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                $("#street2").text(params.value);
                $("#method3").text($("#method").text());
                $(".pop-up11").css({"opacity":0,"top":"-100%"});
                $(".pop-up12").css({"opacity":"1","top":"50%"});
                let dom15= document.getElementById("module-15");
                let myChart15 = echarts.init(dom15);
                /*点击柱状图找对应的镇（街）编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                $.ajax({
                    url:url+"/projway/develop/type",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":paramsName},
                    success:function (result) {
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NUM']);
                            datas3.push(data[i]['AAR009']);
                        }
                        option = {
                            color: ['#4ddead'],
                            // title: {
                            //     text: '各个子项目实施完成情况统计',
                            //     left: 10,
                            //     top:5,
                            //     textStyle: {
                            //         color: '#fff',
                            //         fontSize: 16,
                            //     },
                            // },
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow'
                                },
                            },
                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas3,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-30,
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
                                    name: '单位：户',
                                    minInterval:1,
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
                                    }
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
                                    data:datas2,
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
                                },

                            ]
                        };
                        if (option && typeof option === "object") {
                            myChart15.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击村*/
        myChart15.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#villageName3").text(params.value);
                $("#project5").text($("#method3").text());
                $(".pop-up12").css({"opacity":0,"top":"-100%"});
                $(".pop-up13").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);
                let nameList3=$("#nameList3")
                $.ajax({
                    url:url+"/projway/develop/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":paramsName},
                    success:function (result) {
                        // console.log(result)
                        let data = result.data;
                        // console.log(data)
                        $("#peopleNums").text(data.length)
                        showList3(nameList3,data);
                    }
                })
                function showList3(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:100%;">${data[i]['HOLDER_NAME']}</div>
                        </li>
                     `;
                                    obj.html(function (i,value) {
                            return value+str;
                        })
                    }
                }
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })

    }
    /*全市产业技术培训情况*/
    function industryPoverty5(data){
        var pieRadius=['35%', '45%'];
        var yHeight='38%';
        //let trainName = countyName + "产业技术培训情况";
        $.ajax({
            url:url+"/projway/skill/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":data},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr = ['未培训', '已培训'];
                let temp = {"value":data.NOTSKILL,"name":arr[0]};
                let temp1 = {"value":data.SKILL,"name":arr[1]};
                let count=data.NOTSKILL*1+data.SKILL*1;
                datas.push(temp);
                datas.push(temp1);
                option = {
                    color:  ['#DD4F43','#1FA463'],
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
                        data: arr,
                        x: 'right',
                        y:"4%",
                        selectedMode:false,
                        textStyle:{    //图例文字的样式
                            color:'#fff',
                            fontSize:graph_x
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"center",
                        formatter: "{b}:{c}户({d}%)"
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        center: ['50%', '50%'],
                        color:  ['#DD4F43','#1FA463'],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: "{b}:{c}户",
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: graph_x
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                            }
                        },
                        data: datas
                    }]
                };
                if (option && typeof option === "object") {
                    myChart5.setOption(option, true);
                }
            }
        })
        /*全市培训情况*/
        myChart5.on("click",function(params){
            if(1){
                $("#method").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up4").css({"opacity":"1","top":"50%"});
                let dom18= document.getElementById("module-18");
                let myChart18 = echarts.init(dom18);
                $.ajax({
                    url:url+"/projway/skill/countList",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"disctId":data},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        // console.log(data)
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NUM']);
                            datas3.push(data[i]['NOTSKILL']);
                            datas4.push(data[i]['SKILL']);
                        }
                        option = {
                            color: ['#DD4F43','#1FA463'],
                            tooltip: {
                                trigger: 'axis'
                            },
                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-30,
                                        textStyle:{
                                            fontSize:graph_x
                                        }
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color:'#fff'
                                        }
                                    },
                                    splitLine:{
                                        show: true,
                                        lineStyle:{
                                            color:color,
                                            width:1,
                                            type:"dashed",
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
                                    name: '单位：户',
                                    minInterval:1,
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
                                        show: true,
                                        lineStyle:{
                                            color:color,
                                            width:1,
                                            type:"dashed",
                                        }
                                    }
                                },
                            ],
                            series: [
                                {
                                    name: '未培训',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas3,
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
                                    name: '已培训',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas4,
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
                            myChart18.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击镇（街）*/
        myChart18.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                $("#countyName8").text(params.value);
                $(".pop-up4").css({"opacity":0,"top":"-100%"});
                $(".pop-up18").css({"opacity":"1","top":"50%"});
                let dom19= document.getElementById("module-19");
                let myChart19 = echarts.init(dom19);
                /*点击柱状图找对应的镇（街）编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                $.ajax({
                    url:url+"/projway/skill/countList",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"disctId":paramsName},
                    success:function (result) {
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['AAR009']);
                            datas3.push(data[i]['NOTSKILL']);
                            datas4.push(data[i]['SKILL']);
                        }
                        option = {
                            color: ['#DD4F43','#1FA463'],
                            // title: {
                            //     text: '各个子项目实施完成情况统计',
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
                                    data: datas2,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-40,
                                        textStyle:{
                                            fontSize:graph_x
                                        }
                                    },
                                    axisLine:{
                                        lineStyle:{
                                            color:'#fff'
                                        }
                                    },
                                    splitLine:{
                                        show: true,
                                        lineStyle:{
                                            color:color,
                                            width:1,
                                            type:"dashed",
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
                                    name: '单位：户',
                                    minInterval:1,
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
                                        show: true,
                                        lineStyle:{
                                            color:color,
                                            width:1,
                                            type:"dashed",
                                        }
                                    }
                                },
                            ],
                            series: [
                                {
                                    name: '未培训',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas3,
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
                                    name: '已培训',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas4,
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
                            myChart19.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击村*/
        myChart19.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#villageName4").text(params.value);
                $(".pop-up18").css({"opacity":0,"top":"-100%"});
                $(".pop-up19").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);
                let nameList4=$("#nameList4")
                $.ajax({
                    url:url+"/projway/skill/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"disctId":paramsName},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums2").text(data.length);
                        showList4(nameList4,data);
                        for(let i=0;i<$(".status2").length;i++){
                            if($(".status2").eq(i).text()==0){
                                $(".status2").eq(i).text("未培训").css("color","#DD4F43");
                            }else if($(".status2").eq(i).text()==1){
                                $(".status2").eq(i).text("已培训").css("color","#1FA463");
                            }
                        }
                    }
                })
                function showList4(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data[i]['HOLDER_NAME']}</div>
							<div style="width:50%;" class="status2">${data[i]['STATUS']}</div>
                        </li>
                     `;
                        obj.html(function (i,value) {
                            return value+str;
                        })
                    }
                }
            }
        })
    }
})