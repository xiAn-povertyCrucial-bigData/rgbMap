$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    let countyName=countryName;
    var countyNum = '';
    $("#countyName").text(countyName);  //地图上面的标题
    $.ajax({
        url:url+"/init/disct/name",
        method:"post",
        async: false,
        dataType:"json",
        data:{"name":countyName},
        success:function (result) {
            countyNum=result.data;
        }
    })
    /*全市就业扶贫实施情况统计*/
    let dom = document.getElementById("module-1");
    let myChart = echarts.init(dom);
    let dom10 = document.getElementById("module-10");
    let myChart10 = echarts.init(dom10);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '41%'];
        let yHeight='28%';
       // let statisticalName=countyName+"就业扶贫实施情况统计";
        $.ajax({
            url:url+"/employment/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['就业未实施','就业正实施','就业已实施',"产业就业均已实施"];
                let temp={"value":data['NOT_IMPLEMENTED'],"name":arr[0]};
                let temp1={"value":data['IS_IMPLEMENTED'],"name":arr[1]};
                let temp2={"value":data['IS_IMPLEMENTED']+data['IMPLEMENTED']-data['PROJ_EMPLOY'],"name":arr[2]};
                let temp3={"value":data['PROJ_EMPLOY'],"name":arr[3]};
                let count=data['NOT_IMPLEMENTED']+data['IMPLEMENTED']+data['IS_IMPLEMENTED']
                datas.push(temp);
                //datas.push(temp1);
                datas.push(temp2);
                datas.push(temp3);
                console.log(datas);
                /*for (var key in data)
                {
                    let temp = {"value":data[key],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }*/
                option = {
                    color:  ['#DD4F43','#1FA463','#1FA463'],
                    title: {
                        text: '总数: '+count+'户',
                        x: 'center',
                        bottom: '15%',
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
    /*全市各区县就业扶贫实施情况*/
    industryPoverty2();
    function industryPoverty2(){
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
       // let implementationName = countyName + "各镇（街）就业扶贫实施情况";
        $.ajax({
            url:url+"/employment/countList",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let arr=['未实施','已实施']
                /*遍历保存市的区县名称和区县编号*/
                for (let i in data)
                {
                    let temp = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas6.push(temp);
                }
                datass=datas6;
                for(let i=0;i<data.length;i++){
                    datas2.push(data[i]['NOT_IMPLEMENTED']);
                    datas3.push(data[i]['IS_IMPLEMENTED']);
                    datas4.push(data[i]['IMPLEMENTED']+data[i]['IS_IMPLEMENTED']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                    color:  ['#DD4F43','#1FA463'],
//                  title: {
//                      text: implementationName,
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
                        name: '单位：户',
                        minInterval:1,
                        nameTextStyle:{
                            fontSize:14
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
                    },
                    xAxis: {
                        type: 'category',
                        data: datas,
                        axisLabel:{
                            triggerEvent:true,
                            interval:0,
                            rotate:-80,
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
                                    barBorderRadius:[0, 0, 0, 0]
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius:[0, 0, 0, 0]
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
//                                  barBorderRadius:[0, 0, 0, 0]
//                              },
//
//                              normal: {
//                                  //柱形图圆角，初始化效果
//                                  barBorderRadius:[0, 0, 0, 0]
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
                    myChart10.setOption(option, true);
                }
            }
        })
        /*点击区县*/
        myChart10.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#countyName1").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up5").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
                var paramsNum;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsNum=datass[j].number;
                    }
                }
                $.ajax({
                    url:url+"/employment/countList",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"disctId":paramsNum},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        let arr=['未实施','已实施']
                        for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data)
                        {
                            let temp2 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp2);
                        }
                        datass2=datas7;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NOT_IMPLEMENTED']);
                            datas3.push(data[i]['IS_IMPLEMENTED']);
                            datas4.push(data[i]['IMPLEMENTED']+data[i]['IS_IMPLEMENTED']);
                        }
                        option = {
                            color:  ['#DD4F43','#1FA463'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data:arr,
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
                                name: '单位：户',
                                minInterval:1,
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
                            },
                            xAxis: {
                                type: 'category',
                                data: datas,
                                axisLabel:{
                                    triggerEvent:true,
                                    interval:0,
                                    rotate:-80,
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
                                            barBorderRadius:[0, 0, 0, 0]
                                        },

                                        normal: {
                                            //柱形图圆角，初始化效果
                                            barBorderRadius:[0, 0, 0, 0]
                                        }
                                    }
                                },
//                              {
//                                  name: '正实施',
//                                  type: 'bar',
//                                  stack: '总量',
//                                  barWidth: 10,
//                                  data: datas3,
//                                  itemStyle: {
//                                      //柱形图圆角，鼠标移上去效果
//                                      emphasis: {
//                                          barBorderRadius:[0, 0, 0, 0]
//                                      },
//
//                                      normal: {
//                                          //柱形图圆角，初始化效果
//                                          barBorderRadius:[0, 0, 0, 0]
//                                      }
//                                  }
//                              },
                                {
                                    name: '已实施',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,

                                    data: datas4,
                                    itemStyle: {
                                        //柱形图圆角，鼠标移上去效果
                                        emphasis: {
                                            barBorderRadius: [0,0,0,0]
                                        },

                                        normal: {
                                            //柱形图圆角，初始化效果
                                            barBorderRadius:[0,0,0,0]
                                        }
                                    }
                                },

                            ]
                        };
                        if (option && typeof option === "object") {
                            myChart111.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击村*/
        let dom111 = document.getElementById("module-111");
        let myChart111 = echarts.init(dom111);
        myChart111.on("click", function (params) {
            if (params.componentType == "xAxis") {
                $("#houseName").text(params.value);
                $(".pop-up5").css({"opacity": 0, "top": "-100%"});
                $(".pop-up7").css({"opacity": "1", "top": "50%"});
                /*点击柱状图找对应的村编号传给后台*/
                var paramsNum3;
                for (let j = 0; j < datass2.length; j++) {
                    if (params.value == datass2[j].name) {
                        paramsNum3 = datass2[j].number;
                    }
                }
                let nameList = $("#nameList");
                $.ajax({
                    url: url + "/employment/countName",
                    method: "post",
                    dataType: "json",
                    data: {"year": year, "disctId": paramsNum3},
                    success: function (result) {
                        let data = result.data;
                        console.log(data)
                        let object = data.filter((item) => {
                            return item.STATUS !== 3
                        });
                        console.log(object)
                        showList(nameList, object);
                        console.log(data.length);
                        console.log($(".status").length);
                        for (let i = 0; i < $(".status").length; i++) {
                            if ($(".status").eq(i).text() == 0) {
                                $(".status").eq(i).text("未实施").css("color", "#DD4F43");
                            } else if ($(".status").eq(i).text() == 2||$(".status").eq(i).text() == 1) {
                                $(".status").eq(i).text("已实施").css("color", "#1FA463");
                            }
                        }
                    }
                })

                function showList(obj, data) {
                    obj.empty();
                    for (let i = 0; i < data.length; i++) {
                        let str = `
                        <li style="display: flex;justify-content: space-between;">
							<div>${data[i]['AAC029']}</div>
							<div class="status">${data[i]['STATUS']}</div>
                        </li>
                     `;
                        obj.html(function (i, value) {
                            return value + str;
                        })
                    }
                }
            }
        })
    }
    /*全市就业方式分类统计*/
    let dom3 = document.getElementById("module-3");
    let myChart3 = echarts.init(dom3);
    let dom12 = document.getElementById("module-12");
    let myChart12 = echarts.init(dom12);
    industryPoverty3();
    function industryPoverty3(){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        let projectName = countyName + "就业方式分类统计";
        $.ajax({
            url:url+"/employment/type/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                // console.log(data)
                let datas=["劳动力转移","公益性岗位","自主创业"];
                let datas2=[];
                let datas3=[];
                let datas4=[];
                let datas5=[];
                datas2.push(data["EMP_NUM"]);
                datas2.push(data["RES_NUM"]);
                datas2.push(data["START_NUM"]);
                console.log(datas2)
                /*遍历主导产业所有的名称和编号*/
                let temp3 = {"name":"劳动力转移","number":1};
                let temp4 = {"name":"公益性岗位","number":2};
                let temp5 = {"name":"自主创业","number":3};
                datas5.push(temp3);
                datas5.push(temp4);
                datas5.push(temp5);
                datass=datas5;
                console.log(datass)
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
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: datas,
                            axisLabel:{
                                interval:0,
                                rotate:0,
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
                        bottom: '20%',
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
                    myChart3.setOption(option, true);
                }
            }
        })
        /*产业名称*/
        myChart3.on("click",function(params){

            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#countyName2").text(countyName);
                $("#project2").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                // $(".pop-up").css({"opacity":0,"top":"-100%"});
                $(".pop-up8").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的产业编号传给后台*/
                let paramsNum;
                console.log(datass.length)
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass[j].number;
                    }
                }
                console.log(paramsNum);
                /*点击柱状图找对应的区县编号传给后台*/
                /*let paramsName;
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass2[j].number;
                    }
                }
                console.log(paramsName);*/
                $.ajax({
                    url:url+"/employment/type/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":countyNum},
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
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
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
                            myChart12.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
        // /*点击区县*/
        // myChart6.on("click",function(params){
        //     // console.log(params)
        //     if(params.componentType == "xAxis"){
        //         // console.log(params.value);
        //         $("#project").text(params.value);
        //         $(".container>.box").css({"opacity":"1","top":"0"});
        //         $(".pop-up").css({"opacity":0,"top":"-100%"});
        //         $(".pop-up8").css({"opacity":"1","top":"50%"});
        //         let dom12= document.getElementById("module-12");
        //         let myChart12 = echarts.init(dom12);
        //         /*点击柱状图找对应的产业编号传给后台*/
        //         /*let paramsNum;
        //         // console.log(datass2.length)
        //         for(let j=0;j<datass2.length;j++){
        //             // console.log(params.value+'-----'+datass[j].name);
        //             if(params.value==datass2[j].name){
        //                 // console.log(datass[j].number)
        //                 paramsNum=datass2[j].number;
        //             }
        //         }*/
        //         console.log(paramsNum);
        //         /*点击柱状图找对应的区县编号传给后台*/
        //         let paramsName;
        //         // console.log(datass2.length)
        //         for(let j=0;j<datass.length;j++){
        //             // console.log(params.value+'-----'+datass[j].name);
        //             if(params.value==datass[j].name){
        //                 // console.log(datass[j].number)
        //                 paramsName=datass[j].number;
        //             }
        //         }
        //         console.log(paramsName);
        //         $.ajax({
        //             url:url+"/projway/product/type",
        //             method:"post",
        //             dataType:"json",
        //             data:{"year":201712,"type":paramsNum,"disctId":paramsName},
        //             success:function (result) {
        //                 // console.log(result)
        //                 let data=result.data;
        //                 // console.log(data)
        //                 let datas=[];
        //                 let datas2=[];
        //                 let datas3=[];
        //                 let datas4=[];
        //                 let datas7=[];
        //                 /*遍历存区县下所有的镇名称和镇编号*/
        //                 for (let i in data)
        //                 {
        //                     let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
        //                     i++;
        //                     datas7.push(temp3);
        //                 }
        //                 datass=datas7;
        //                 console.log(datass)
        //                 for(let i=0;i<data.length;i++){
        //                     datas2.push(data[i]['NUM']);
        //                     datas3.push(data[i]['AAR009']);
        //                 }
        //                 option = {
        //                     color: ['#4ddead'],
        //                     // title: {
        //                     //     text: '各个子项目实施完成情况统计',
        //                     //     left: 10,
        //                     //     top:5,
        //                     //     textStyle: {
        //                     //         color: '#fff',
        //                     //         fontSize: 16,
        //                     //     },
        //                     // },
        //                     tooltip: {
        //                         trigger: 'axis'
        //                     },
        //                     xAxis: [
        //                         {
        //                             triggerEvent:true,
        //                             type: 'category',
        //                             data: datas3,
        //                             axisLabel:{
        //                                 interval:0,
        //                                 rotate:-30,
        //                                 textStyle:{
        //                                     fontSize:graph_x
        //                                 }
        //                             },
        //                             axisLine:{
        //                                 lineStyle:{
        //                                     color:'#fff'
        //                                 }
        //                             }
        //                         }
        //                     ],
        //                     grid: {
        //                         top: "10%",
        //                         left: '2%',
        //                         right: '5%',
        //                         bottom: '10%',
        //                         containLabel: true
        //                     },
        //                     yAxis: [
        //                         {
        //                             type: 'value',
        //                             name: '单位：户',
        //                             min: 0,
        //                             max: 600,
        //                             interval: 120,
        //                             axisLabel: {
        //                                 formatter: '{value} '
        //                             },
        //                             axisLine:{
        //                                 lineStyle:{
        //                                     color:'#fff'
        //                                 }
        //                             },
        //                             boundaryGap: false,
        //                             splitLine:{
        //                                 show:false
        //                             }
        //                         },
        //                     ],
        //                     series: [
        //                         {
        //                             name:'受益户数',
        //                             type:'bar',
        //                             barWidth : 15,//柱图宽度
        //                             label: {
        //                                 normal: {
        //                                     show: true,
        //                                     position: 'top'
        //                                 }
        //                             },
        //                             data:datas2,
        //                             itemStyle: {
        //                                 //a柱形图圆角，鼠标移上去效果
        //                                 emphasis: {
        //                                     barBorderRadius: [3, 3, 0, 0]
        //                                 },

        //                                 normal: {
        //                                     //柱形图圆角，初始化效果
        //                                     barBorderRadius:[3, 3, 0, 0]
        //                                 }
        //                             }
        //                         },

        //                     ]
        //                 };
        //                 if (option && typeof option === "object") {
        //                     myChart12.setOption(option, true);
        //                 }
        //             }
        //         })
        //         // alert("单击了"+params.value+"x轴标签");
        //     }else{
        //         // alert("单击了"+params.name+"柱状图");
        //     }
        // })
        // /*点击镇（街）*/
        // myChart12.on("click",function(params){
        //     // console.log(params)
        //     if(params.componentType == "xAxis"){
        //         $("#street").text(params.value);
        //         $("#project3").text($("#project2").text());
        //         $(".pop-up8").css({"opacity":0,"top":"-100%"});
        //         $(".pop-up9").css({"opacity":"1","top":"50%"});
        //         let dom13= document.getElementById("module-13");
        //         let myChart13 = echarts.init(dom13);
        //         /*点击柱状图找对应的产业编号传给后台*/
        //         /*let paramsNum;
        //         // console.log(datass2.length)
        //         for(let j=0;j<datass2.length;j++){
        //             // console.log(params.value+'-----'+datass[j].name);
        //             if(params.value==datass2[j].name){
        //                 // console.log(datass[j].number)
        //                 paramsNum=datass2[j].number;
        //             }
        //         }*/
        //         console.log(datass);
        //         /*点击柱状图找对应的镇（街）编号传给后台*/
        //         let paramsName;
        //         // console.log(datass2.length)
        //         for(let j=0;j<datass.length;j++){
        //             // console.log(params.value+'-----'+datass[j].name);
        //             if(params.value==datass[j].name){
        //                 // console.log(datass[j].number)
        //                 paramsName=datass[j].number;
        //             }
        //         }
        //         console.log(paramsName);
        //         $.ajax({
        //             url:url+"/projway/product/type",
        //             method:"post",
        //             dataType:"json",
        //             data:{"year":201712,"type":paramsNum,"disctId":paramsName},
        //             success:function (result) {
        //                 // console.log(result)
        //                 let data=result.data;
        //                 // console.log(data)
        //                 let datas=[];
        //                 let datas2=[];
        //                 let datas3=[];
        //                 let datas4=[];
        //                 let datas7=[];
        //                 /*遍历存区县下所有的镇名称和镇编号*/
        //                 for (let i in data)
        //                 {
        //                     let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
        //                     i++;
        //                     datas7.push(temp3);
        //                 }
        //                 datass=datas7;
        //                 for(let i=0;i<data.length;i++){
        //                     datas2.push(data[i]['NUM']);
        //                     datas3.push(data[i]['AAR009']);
        //                 }
        //                 option = {
        //                     color: ['#4ddead'],
        //                     // title: {
        //                     //     text: '各个子项目实施完成情况统计',
        //                     //     left: 10,
        //                     //     top:5,
        //                     //     textStyle: {
        //                     //         color: '#fff',
        //                     //         fontSize: 16,
        //                     //     },
        //                     // },
        //                     tooltip: {
        //                         trigger: 'axis'
        //                     },
        //                     xAxis: [
        //                         {
        //                             triggerEvent:true,
        //                             type: 'category',
        //                             data: datas3,
        //                             axisLabel:{
        //                                 interval:0,
        //                                 rotate:-30,
        //                                 textStyle:{
        //                                     fontSize:graph_x
        //                                 }
        //                             },
        //                             axisLine:{
        //                                 lineStyle:{
        //                                     color:'#fff'
        //                                 }
        //                             }
        //                         }
        //                     ],
        //                     grid: {
        //                         top: "10%",
        //                         left: '2%',
        //                         right: '5%',
        //                         bottom: '10%',
        //                         containLabel: true
        //                     },
        //                     yAxis: [
        //                         {
        //                             type: 'value',
        //                             name: '单位：户',
        //                             min: 0,
        //                             max: 600,
        //                             interval: 120,
        //                             axisLabel: {
        //                                 formatter: '{value} '
        //                             },
        //                             axisLine:{
        //                                 lineStyle:{
        //                                     color:'#fff'
        //                                 }
        //                             },
        //                             boundaryGap: false,
        //                             splitLine:{
        //                                 show:false
        //                             }
        //                         },
        //                     ],
        //                     series: [
        //                         {
        //                             name:'受益户数',
        //                             type:'bar',
        //                             barWidth : 15,//柱图宽度
        //                             label: {
        //                                 normal: {
        //                                     show: true,
        //                                     position: 'top'
        //                                 }
        //                             },
        //                             data:datas2,
        //                             itemStyle: {
        //                                 //a柱形图圆角，鼠标移上去效果
        //                                 emphasis: {
        //                                     barBorderRadius: [3, 3, 0, 0]
        //                                 },

        //                                 normal: {
        //                                     //柱形图圆角，初始化效果
        //                                     barBorderRadius:[3, 3, 0, 0]
        //                                 }
        //                             }
        //                         },

        //                     ]
        //                 };
        //                 if (option && typeof option === "object") {
        //                     myChart13.setOption(option, true);
        //                 }
        //             }
        //         })
        //         // alert("单击了"+params.value+"x轴标签");
        //     }else{
        //         // alert("单击了"+params.name+"柱状图");
        //     }
        // })
        // /*点击村*/
        // myChart13.on("click",function(params){
        //     // console.log(params)
        //     if(params.componentType == "xAxis"){
        //         // console.log(params.value);
        //         $("#villageName2").text(params.value);
        //         $("#project4").text($("#project3").text());
        //         $(".pop-up9").css({"opacity":0,"top":"-100%"});
        //         $(".pop-up10").css({"opacity":"1","top":"50%"});
        //         // console.log(datass3)
        //         /*点击柱状图找对应的村编号传给后台*/
        //         let paramsName;
        //         // console.log(datass2.length)
        //         for(let j=0;j<datass.length;j++){
        //             // console.log(params.value+'-----'+datass[j].name);
        //             if(params.value==datass[j].name){
        //                 // console.log(datass[j].number)
        //                 paramsName=datass[j].number;
        //             }
        //         }
        //         console.log(paramsName);
        //         // console.log(paramsNum3);
        //         let nameList2=$("#nameList2")
        //         $.ajax({
        //             url:url+"/projway/product/people",
        //             method:"post",
        //             dataType:"json",
        //             data:{"year":201712,"type":paramsNum,"disctId":paramsName},
        //             success:function (result) {
        //                 let data = result.data;
        //                 $("#peopleNums3").text(data.length)
        //                 showList2(nameList2,data);
        //             }
        //         })
        //         function showList2(obj,data){
        //             obj.empty();
        //             for(let i=0;i<data.length;i++){
        //                 let str=`
        //                 <li style="display: flex;justify-content: space-between;">
		// 					<div style="width:100%;">${data[i]['HOLDER_NAME']}</div>
        //                 </li>
        //              `;
        //                 obj.html(function (i,value) {
        //                     return value+str;
        //                 })
        //             }
        //         }
        //     }else{
        //         // alert("单击了"+params.name+"柱状图");
        //     }
        // })

    }
    /*全市就业方式培训情况（圆饼图）*/
    let dom4 = document.getElementById("module-4");
    let myChart4 = echarts.init(dom4);
    let dom18 = document.getElementById("module-18");
    let myChart18 = echarts.init(dom18);
    let dom19 = document.getElementById("module-19");
    let myChart19 = echarts.init(dom19);
    industryPoverty4();
    function industryPoverty4(){
        var pieRadius=['40%', '55%'];
        let yHeight='28%';
        let methodsName = countyName + "就业方式培训情况";
        $.ajax({
            url:url+"/employment/circle/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['未培训','已培训'];
                let temp={"value":data['NO_NUM'],"name":arr[0]};
                let temp2={"value":data['OK_NUM'],"name":arr[1]};
                let count=data['NO_NUM']+data['OK_NUM'];
                datas.push(temp);
                datas.push(temp2);
                console.log(datas);
                /*for (var key in data)
                {
                    let temp = {"value":data[key],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }*/
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
                            fontSize:12
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
                        center: ['50%', '65%'],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: '{b}:{c}户',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: 14
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
                    myChart4.setOption(option, true);
                }
            }
        })
        myChart4.on("click",function(params) {
            if (1) {
                $("#countyName7").text(countyName)
                $("#method").text(params.value);
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $(".pop-up17").css({"opacity": "1", "top": "50%"});
                $.ajax({
                    url: url + "/employment/circle/countlist",
                    method: "post",
                    dataType: "json",
                    data: {"year": year, "disctId": countyNum},
                    success: function (result) {
                        // console.log(result)
                        let data = result.data;
                        // console.log(data)
                        let datas = [];
                        let datas2 = [];
                        let datas3 = [];
                        let datas4 = [];
                        let datas7 = [];
                        for (let i = 0; i < data.length; i++) {
                            datas.push(data[i]['AAR009']);
                        }
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data) {
                            let temp3 = {"name": data[i]['AAR009'], "number": data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass = datas7;
                        console.log(datass)
                        for (let i = 0; i < data.length; i++) {
                            datas2.push(data[i]['NUM']);
                            datas3.push(data[i]['NO_NUM']);
                            datas4.push(data[i]['OK_NUM']);
                        }
                        console.log(datas,datas3,datas4)
                        option = {
                            color: ['#DD4F43', '#1FA463'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            xAxis: [
                                {
                                    triggerEvent: true,
                                    type: 'category',
                                    data: datas,
                                    axisLabel: {
                                        interval: 0,
                                        rotate: -40,
                                        textStyle: {
                                            fontSize: graph_x
                                        }
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
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff'
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
                                            barBorderRadius: [0, 0, 0, 0]
                                        },

                                        normal: {
                                            //柱形图圆角，初始化效果
                                            barBorderRadius: [0, 0, 0, 0]
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
                            myChart18.setOption(option, true);
                        }
                    }
                })
            }
        })
        myChart18.on("click", function (params) {
            // console.log(params)
            if (params.componentType == "xAxis") {
                $("#countyName8").text(params.value);
                $(".pop-up17").css({"opacity": 0, "top": "-100%"});
                $(".pop-up18").css({"opacity": "1", "top": "50%"});

                /*点击柱状图找对应的镇（街）编号传给后台*/
                let paramsName;
                for (let j = 0; j < datass.length; j++) {
                    if (params.value == datass[j].name) {
                        // console.log(datass[j].number)
                        paramsName = datass[j].number;
                    }
                }
                $.ajax({
                    url: url + "/employment/circle/countlist",
                    method: "post",
                    dataType: "json",
                    data: {"year": year,"disctId": paramsName},
                    success: function (result) {
                        let data = result.data;
                        let datas = [];
                        let datas2 = [];
                        let datas3 = [];
                        let datas4 = [];
                        let datas7 = [];
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data) {
                            let temp3 = {"name": data[i]['AAR009'], "number": data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass = datas7;
                        for (let i = 0; i < data.length; i++) {
                            datas2.push(data[i]['NO_NUM']);
                            datas3.push(data[i]['AAR009']);
                            datas4.push(data[i]['OK_NUM']);
                        }
                        option = {
                            color: ['#DD4F43', '#1FA463'],
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
                                    triggerEvent: true,
                                    type: 'category',
                                    data: datas3,
                                    axisLabel: {
                                        interval: 0,
                                        rotate: -60,
                                        textStyle: {
                                            fontSize: graph_x
                                        }
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
                                    axisLine: {
                                        lineStyle: {
                                            color: '#fff'
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
                                {
                                    name: '已培训',
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
                            myChart19.setOption(option, true);
                        }
                    }
                })
            }
        })
        myChart19.on("click", function (params) {
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
                let nameList4=$("#nameList3")
                $.ajax({
                    url:url+"/employment/circle/people",
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
            					<div style="width:50%;">${data[i]['POVERTY_NAME']}</div>
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
    /*全市就业方式培训情况（柱状图）*/
   let dom5 = document.getElementById("module-5");
   let myChart5 = echarts.init(dom5);
   let dom14 = document.getElementById("module-14");
   let myChart14 = echarts.init(dom14);
   industryPoverty5();
    function industryPoverty5(){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        $.ajax({
            url:url+"/employment/skill/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                // console.log(data)
                let datas=["创业培训","就业培训"];
                let datas2=[];
                let datas3=[];
                let datas4=[];
                let datas5=[];
                datas2.push(data["TRAIN_NUM"]);
                datas2.push(data["VOCA_NUM"]);
                console.log(datas2)
                /*遍历主导产业所有的名称和编号*/
                let temp2 = {"number":1,"name":"就业培训"};
                let temp3 = {"number":2,"name":"创业培训"};
                datas5.push(temp2);
                datas5.push(temp3);
                datass2=datas5;
                option = {
                    color: ['#4ddead'],
                    /*title: {
                        text: '全市就业方式分类统计',
                        left: 10,
                        top:5,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16,
                        },
                    },*/
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
                                rotate:0,
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
                        top: "30%",
                        left: '5%',
                        right: '5%',
                        bottom: '10%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：户',
                            minInterval : 1,
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
                    myChart5.setOption(option, true);
                }
            }
        })
        myChart5.on("click",function(params){
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#streets").text(countyName);
                $("#countyName3").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up11").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的产业编号传给后台*/
                console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                console.log(paramsNum);
                $.ajax({
                    url:url+"/employment/skill/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":countyNum},
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
                            // datas3.push(data[i]['NUM']);
                            // datas4.push(data[i]['IMPLEMENTED']);
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
                                trigger: 'axis'
                            },

                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas,
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
                                    name: '单位：户',
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
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
    }
})