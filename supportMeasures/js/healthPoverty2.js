$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*市生态扶贫达标情况统计*/
    var countyName = countryName;
    var codes = '';
    $(".fpVill").html(countyName);
    $("#countyNa").html(countyName)
    $.ajax({
        url: url+"/init/disct/name",
        method:"get",
        async: false,
        dataType:"json",
        data:{"name":countyName},
        success:function(data){
            codes = data.data;
           // alert(codes);
        }
    })
    var pieRadius=['45%', '62%'];
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/help/health/count",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year},
            success:function (data) {
             var dataC=[
                    {value:data.data.HOLDER_NO, name: '未完成'},
                    {value:data.data.HOLDER_OK, name: '已完成'}
                ]
                let count=data.data.HOLDER_NO+data.data.HOLDER_OK;
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
                        //orient: 'vertical',
                        x: 'right',
                        y:"4%",
                        selectedMode:false,
                        data: ['未完成','已完成'],
                        textStyle:{
                            fontSize:14,
                            color:"#fff"
                        }
                    },
                    series: [{
                        name: '实施状态',
                        type: 'pie',
                        radius: [0, '50%'],
                        center:["50%","50%"],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: '{b}:{c}户',
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
    /*全市各区县生态扶贫达标情况*/
    var dom10 = document.getElementById("module-10");
    var myChart10 = echarts.init(dom10);
    var dom11 = document.getElementById("module-11");
    var myChart11 = echarts.init(dom11);
    industryPoverty2(codes);
    function industryPoverty2(countyNum){
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url:url+"/help/health/countlist",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year},
            success:function (result) {
             if(result.code == 2000){
                data = result.data;
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let arr=['未达标','已达标'];
                /*遍历保存市的区县名称和区县编号*/
                for (let i in data)
                {
                    let temp = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas6.push(temp);
                }
                datass=datas6;
                for(let i=0;i<data.length;i++){
                    datas2.push(data[i]['HOLDER_NO']);
                    datas4.push(data[i]['HOLDER_OK']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                    color:  ['#DD4F43','#1FA463'],
                    // title: {
                    //     text: '全市各区县健康扶贫实施情况',
                    //     left: 15,
                    //     top:10,
                    //     textStyle: {
                    //         fontWeight: '800',
                    //         color: '#ffffff',
                    //         fontSize: 16
                    //     }
                    // },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['未达标','已达标'],
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
                        data:datas,
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
                            } ,
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
                            name: '未达标',
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
                        {
                            name: '已达标',
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
            }
        })
        /*点击镇（街）*/
        myChart10.on("click", function (params) {
            if (params.componentType == "xAxis") {
                $("#villageName").text(params.value);
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $(".pop-up5").css({"opacity": 0, "top": "-100%"});
                $(".pop-up6").css({"opacity": "1", "top": "50%"});
                /*点击柱状图找对应的镇编号传给后台*/
                var paramsNum2;
                for (let j = 0; j < datass.length; j++) {
                    if (params.value == datass[j].name) {
                        paramsNum2 = datass[j].number;
                    }
                }
                $.ajax({
                    url: url + "/help/health/countlist",
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
                        let arr = ['未达标', '已达标']
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
                            datas2.push(data[i]['HOLDER_NO']);
                            datas3.push(data[i]['HOLDER_OK']);
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
                                data: ['未达标', "已达标"],
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
                                    rotate: -40,
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
                                    name: '未达标',
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
                                {
                                    name: '已达标',
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
        myChart11.on("click", function (params) {
            if (params.componentType == "xAxis") {
                $("#houseName").text(params.value);
                $(".pop-up6").css({"opacity": 0, "top": "-100%"});
                $(".pop-up7").css({"opacity": "1", "top": "50%"});
                /*点击柱状图找对应的村编号传给后台*/
                var paramsNum3;
                for (let j = 0; j < datass3.length; j++) {
                    if (params.value == datass3[j].name) {
                        paramsNum3 = datass3[j].number;
                    }
                }
                let nameList = $("#nameList");
                $.ajax({
                    url: url + "/help/health/people",
                    method: "post",
                    dataType: "json",
                    data: {"year": year, "disctId": paramsNum3},
                    success: function (result) {
                        let data = result.data;
                        showList(nameList, data);
                        console.log(data.length);
                        console.log($(".status").length);
                        for (let i = 0; i < $(".status").length; i++) {
                            if ($(".status").eq(i).text() == 0) {
                                $(".status").eq(i).text("未达标").css("color", "#DD4F43");
                            }  else if ($(".status").eq(i).text() == 1) {
                                $(".status").eq(i).text("已达标").css("color", "#1FA463");
                            }
                        }
                    }
                })
                function showList(obj, data) {
                    obj.empty();
                    for (let i = 0; i < data.length; i++) {
                        let str = `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data[i]['AAC029']}</div>
							<div class="status" style="width:50%;">${data[i]['STATUS']}</div>
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
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    var dom9 = document.getElementById("module-9");
    var myChart9= echarts.init(dom9);
    var dom18 = document.getElementById("module-18");
    var myChart18= echarts.init(dom18);
    industryPoverty3(codes);
    function industryPoverty3(countyNum){
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year,"type":1},
            success:function (result) {
             if(result.code == 2000){
                 var data = [
                            {
                                value: result.data.HOLDER_NO,
                                name: '未达标'
                            },
                            {
                                value:result.data.HOLDER_OK,
                                name: '已达标'
                            }
                        ];
                   option = {
                            title: {
                                text: '参加新农合和大病保险',
                                left: 'center',
                                bottom:0,
                                textStyle: {
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    fontSize: 16
                                }
                            },
                            // legend: {
                            //     data: ['未完成','正实施' ,'已完成'],
                            //     x: '65%',
                            //     y:"10%",
                            //     textStyle:{    //图例文字的样式
                            //         color:'#fff'
                            //     }
                            // },
                            grid: {
                                top: "20%",
                                left: '5%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
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
                                center:["50%","50%"],
                                color: ['#DD4F43','#1FA463'],
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '{b}:{c}户',
                                        textStyle: {
                                            color: '#ffffff',
                                            fontSize: graph_x
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: data
                            }]
                        };
            if (option && typeof option === "object") {
                myChart3.setOption(option, true);
            }
           }
         }
        })
        myChart3.on("click",function(params){
            // console.log(params)
            if(1){
                // console.log(params.value);
                $("#countyName5").text(countyName);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up14").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
                /*let paramsName;
                // console.log(datass2.length)
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);*/
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":1,"disctId":countyNum},
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
                            datas2.push(data[i]['AAR009']);
                            datas3.push(data[i]['HOLDER_NO']);
                            datas4.push(data[i]['HOLDER_OK']);
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
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                data: ['未完成','正实施' ,'已完成'],
                                x: 'right',
                                y:"4%",
                                selectedMode:false,
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },
                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas2,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-50,
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart9.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击镇（街）*/
        myChart9.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                $("#countyName6").text(params.value);
                $(".pop-up14").css({"opacity":0,"top":"-100%"});
                $(".pop-up15").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的镇（街）编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":1,"disctId":paramsName},
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
                            datas3.push(data[i]['HOLDER_NO']);
                            datas4.push(data[i]['HOLDER_OK']);
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
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            legend: {
                                data: ['未完成','正实施' ,'已完成'],
                                x: 'right',
                                y:"4%",
                                selectedMode:false,
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
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
                                    name: '未完成',
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
                                    name: '已完成',
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
        /*点击村*/
        myChart18.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#houseName3").text(params.value);
                $(".pop-up15").css({"opacity":0,"top":"-100%"});
                $(".pop-up16").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);
                let nameList4=$("#nameList2")
                $.ajax({
                    url:url+"/help/health/child/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":1,"disctId":paramsName},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums2").text(data.length);
                        showList4(nameList4,data);
                        for(let i=0;i<$(".status2").length;i++){
                            if($(".status2").eq(i).text()==0){
                                $(".status2").eq(i).text("未完成").css("color","#DD4F43");
                            }else if($(".status2").eq(i).text()==1){
                                $(".status2").eq(i).text("已完成").css("color","#1FA463");
                            }
                        }
                    }
                })
                function showList4(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                            <li style="display: flex;justify-content: space-between;">
            					<div style="width:50%;">${data[i]['AAC029']}</div>
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
    let dom4 = document.getElementById("module-4");
    let myChart4 = echarts.init(dom4);
    let dom24 = document.getElementById("module-24");
    let myChart24 = echarts.init(dom24);
    let dom25 = document.getElementById("module-25");
    let myChart25 = echarts.init(dom25);
    industryPoverty4(codes);
    function industryPoverty4(countyNum){
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year,"type":2},
            success:function (result) {
             if(result.code == 2000){
                 var data = [
                            {
                                value: result.data.HOLDER_NO,
                                name: '未达标'
                            },
                            {
                                value:result.data.HOLDER_OK,
                                name: '已达标'
                            }
                        ];
                   option = {
                            title: {
                                text: '慢病签约服务',
                                left: 'center',
                                bottom:0,
                                textStyle: {
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    fontSize: 16
                                }
                            },
                            // legend: {
                            //     data: ['未完成','正实施' ,'已完成'],
                            //     x: '65%',
                            //     y:"10%",
                            //     textStyle:{    //图例文字的样式
                            //         color:'#fff'
                            //     }
                            // },
                            grid: {
                                top: "20%",
                                left: '5%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
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
                                center:["50%","50%"],
                                color: ['#DD4F43','#1FA463'],
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '{b}:{c}户',
                                        textStyle: {
                                            color: '#ffffff',
                                            fontSize: graph_x
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: data
                            }]
                        };
            if (option && typeof option === "object") {
                myChart4.setOption(option, true);
            }
           }
         }
        })
        myChart4.on("click",function(params){
            // console.log(params)
            if(1){
                // console.log(params.value);
                $("#countyName10").text(countyName);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up21").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
                /*let paramsName;
                // console.log(datass2.length)
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);*/
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":countyNum},
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
                            datas2.push(data[i]['AAR009']);
                            datas3.push(data[i]['PEOPLE_NO']);
                            datas4.push(data[i]['PEOPLE_OK']);
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
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas2,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-50,
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart24.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击镇（街）*/
        myChart24.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                $("#countyName11").text(params.value);
                $(".pop-up21").css({"opacity":0,"top":"-100%"});
                $(".pop-up22").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的镇（街）编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":paramsName},
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
                            datas3.push(data[i]['PEOPLE_NO']);
                            datas4.push(data[i]['PEOPLE_OK']);
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
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart25.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击村*/
        myChart25.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#houseName3").text(params.value);
                $(".pop-up22").css({"opacity":0,"top":"-100%"});
                $(".pop-up23").css({"opacity":"1","top":"50%"});
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
                    url:url+"/help/health/child/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":paramsName},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums2").text(data.length);
                        showList4(nameList4,data);
                       /* for(let i=0;i<$(".status2").length;i++){
                            if($(".status2").eq(i).text()==0){
                                $(".status2").eq(i).text("未完成").css("color","#DD4F43");
                            }else if($(".status2").eq(i).text()==1){
                                $(".status2").eq(i).text("已完成").css("color","#1FA463");
                            }
                        }*/
                    }
                })
                function showList4(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                            <li style="display: flex;justify-content: space-between;">
            					<div style="width:25%;">${data[i]['PERSON_NAME']}</div>
            					<div style="width:25%;" class="status2">${data[i]['ILL_NAME']}</div>
            					<div style="width:50%;" class="status2">${data[i]['ILL_TWO_CLASSIFY']}</div>
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
    var dom5 = document.getElementById("module-5");
    var myChart5 = echarts.init(dom5);
    var dom27 = document.getElementById("module-27");
    var myChart27 = echarts.init(dom27);
    var dom28 = document.getElementById("module-28");
    var myChart28 = echarts.init(dom28);
    industryPoverty5(codes);
    function industryPoverty5(countyNum){
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year,"type":3},
            success:function (result) {
             if(result.code == 2000){
                 var data = [
                            {
                                value: result.data.HOLDER_NO,
                                name: '未达标'
                            },
                            {
                                value:result.data.HOLDER_OK,
                                name: '已达标'
                            }
                        ];
                   option = {
                            title: {
                                text: '大病集中救治',
                                left: 'center',
                                bottom:0,
                                textStyle: {
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    fontSize: 16
                                }
                            },
                            // legend: {
                            //     data: ['未完成','正实施' ,'已完成'],
                            //     x: '65%',
                            //     y:"10%",
                            //     textStyle:{    //图例文字的样式
                            //         color:'#fff'
                            //     }
                            // },
                            grid: {
                                top: "20%",
                                left: '5%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
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
                                center:["50%","50%"],
                                color: ['#DD4F43','#1FA463'],
                                label: {
                                    normal: {
                                        position: 'center',
                                        formatter: '{b}:{c}户',
                                        textStyle: {
                                            color: '#ffffff',
                                            fontSize: graph_x
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        show: false
                                    }
                                },
                                data: data
                            }]
                        };
            if (option && typeof option === "object") {
                myChart5.setOption(option, true);
            }
           }
         }
        })
        myChart5.on("click",function(params){
            // console.log(params)
            if(1){
                // console.log(params.value);
                $("#countyName12").text(countyName);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up25").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
                /*let paramsName;
                // console.log(datass2.length)
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);*/
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":3,"disctId":countyNum},
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
                            datas2.push(data[i]['AAR009']);
                            datas3.push(data[i]['PEOPLE_NO']);
                            datas4.push(data[i]['PEOPLE_OK']);
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
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
                            },
                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas2,
                                    axisLabel:{
                                        interval:0,
                                        rotate:-50,
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart27.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击镇（街）*/
        myChart27.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                $("#countyName13").text(params.value);
                $(".pop-up25").css({"opacity":0,"top":"-100%"});
                $(".pop-up26").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的镇（街）编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":3,"disctId":paramsName},
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
                            datas3.push(data[i]['PEOPLE_NO']);
                            datas4.push(data[i]['PEOPLE_OK']);
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
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                },
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
                                bottom: '14%',
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart28.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击村*/
        myChart28.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#houseName5").text(params.value);
                $(".pop-up26").css({"opacity":0,"top":"-100%"});
                $(".pop-up27").css({"opacity":"1","top":"50%"});
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
                    url:url+"/help/health/child/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":paramsName},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums2").text(data.length);
                        showList4(nameList4,data);
                       /* for(let i=0;i<$(".status2").length;i++){
                            if($(".status2").eq(i).text()==0){
                                $(".status2").eq(i).text("未完成").css("color","#DD4F43");
                            }else if($(".status2").eq(i).text()==1){
                                $(".status2").eq(i).text("已完成").css("color","#1FA463");
                            }
                        }*/
                    }
                })
                function showList4(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                            <li style="display: flex;justify-content: space-between;">
            					<div style="width:25%;">${data[i]['PERSON_NAME']}</div>
            					<div style="width:25%;">${data[i]['ILL_NAME']}</div>
            					<div style="width:50%;" class="status2">${data[i]['ILL_TWO_CLASSIFY']}</div>
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
        /*点击区县*/
    //     myChart2.on("click",function(params){
    //         if(params.componentType == "xAxis"){
    //             $("#countyName").text(params.value);
    //             $(".container>.box").css({"opacity":"1","top":"0"});
    //             $(".pop-up5").css({"opacity":"1","top":"50%"});
    //             let dom10= document.getElementById("module-10");
    //             let myChart10 = echarts.init(dom10);
    //             /*点击柱状图找对应的区县编号传给后台*/
    //             var paramsNum;
    //             for(let j=0;j<datass.length;j++){
    //                 if(params.value==datass[j].name){
    //                     paramsNum=datass[j].number;
    //                 }
    //             }
    //             $.ajax({
    //                 url:url+"edu/town/query",
    //                 method:"get",
    //                 dataType:"json",
    //                 data:{"cityNo":paramsNum},
    //                 success:function (result) {
    //                     // console.log(result)
    //                     let data=result.data;
    //                     let datas=[];
    //                     let datas2=[];
    //                     let datas4=[];
    //                     let datas5=[];
    //                     let datas6=[];
    //                     let datas7=[];
    //                     for(let i=0;i<data.length;i++){
    //                         datas.push(data[i]['AAR009']);
    //                     }
    //                     /*遍历存区县下所有的镇名称和镇编号*/
    //                     for (let i in data)
    //                     {
    //                         let temp2 = {"name":data[i]['AAR009'],"number":data[i]['AAA011']};
    //                         i++;
    //                         datas7.push(temp2);
    //                     }
    //                     datass2=datas7;
    //                     for(let i=0;i<data.length;i++){
    //                         datas2.push(data[i]['no']);
    //                         datas4.push(data[i]['reach']);
    //                         datas5.push(data[i]['AAA011']);//乡镇编号
    //                         datas6.push(data[i]['AAR009']);//乡镇名称
    //                     }
    //                     option = {
    //                         color:  ['#DD4F43','#1FA463'],
    //                         tooltip : {
    //                             trigger: 'axis',
    //                             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    //                                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //                             }
    //                         },
    //                         legend: {
    //                             data: ['已完成', '未完成'],
    //                             x: '50%',
    //                             y:"3%",
    //                             textStyle:{    //图例文字的样式
    //                                 color:'#fff'
    //                             }
    //                         },
    //                         grid: {
    //                             top: "10%",
    //                             left: '2%',
    //                             right: '5%',
    //                             bottom: '10%',
    //                             containLabel: true
    //                         },
    //                         yAxis:  {
    //                             type: 'value',
    //                             axisLine:{
    //                                 lineStyle:{
    //                                     color:'#fff'
    //                                 }
    //                             }
    //                         },
    //                         xAxis: {
    //                             triggerEvent:true,
    //                             type: 'category',
    //                             data: datas6,
    //                             axisLabel:{
    //                                 interval:0,
    //                                 rotate:-30,
    //                                 textStyle:{
    //                                     fontSize:10
    //                                 }
    //                             },
    //                             axisLine:{
    //                                 lineStyle:{
    //                                     color:'#fff'
    //                                 }
    //                             }
    //                         },
    //                         series: [
    //                             {
    //                                 name: '已完成',
    //                                 type: 'bar',
    //                                 stack: '总量',
    //                                 barWidth: 10,

    //                                 data: datas4,
    //                                 itemStyle: {
    //                                     //柱形图圆角，鼠标移上去效果
    //                                     emphasis: {
    //                                         barBorderRadius: [5, 5, 0, 0]
    //                                     },

    //                                     normal: {
    //                                         //柱形图圆角，初始化效果
    //                                         barBorderRadius:[5, 5, 0, 0]
    //                                     }
    //                                 }
    //                             },
    //                             {
    //                                 name: '未完成',
    //                                 type: 'bar',
    //                                 stack: '总量',
    //                                 barWidth: 10,

    //                                 data: datas2,
    //                                 itemStyle: {
    //                                     //柱形图圆角，鼠标移上去效果
    //                                     emphasis: {
    //                                         barBorderRadius: [5, 5, 5, 5]
    //                                     },

    //                                     normal: {
    //                                         //柱形图圆角，初始化效果
    //                                         barBorderRadius:[5, 5, 5, 5]
    //                                     }
    //                                 }
    //                             },
    //                         ]
    //                     };
    //                     if (option && typeof option === "object") {
    //                         myChart10.setOption(option, true);
    //                     }
    //                 }
    //             })
    //         }
    //     })
    //     /*点击镇（街）*/
    //     myChart10.on("click",function(params){
    //         if(params.componentType == "xAxis"){
    //             $("#villageName").text(params.value);
    //             $(".pop-up5").css({"opacity":0,"top":"-100%"});
    //             $(".pop-up6").css({"opacity":"1","top":"50%"});
    //             let dom11= document.getElementById("module-11");
    //             let myChart11 = echarts.init(dom11);
    //             /*点击柱状图找对应的镇编号传给后台*/
    //             var paramsNum2;
    //             for(let j=0;j<datass2.length;j++){
    //                 if(params.value==datass2[j].name){
    //                     paramsNum2=datass2[j].number;
    //                 }
    //             }
    //             $.ajax({
    //                 url:url+"edu/village/query",
    //                 method:"get",
    //                 dataType:"json",
    //                 data:{"townNo":paramsNum2},
    //                 success:function (result) {
    //                     let data=result.data;
    //                     let datas=[];
    //                     let datas2=[];
    //                     let datas3=[];
    //                     let datas4=[];
    //                     let datas8=[];
    //                     let datas5=[];
    //                     let datas6=[];
    //                     let arr=['未完成','已完成']
    //                     for(let i=0;i<data.length;i++){
    //                         datas.push(data[i]['AAR009']);
    //                     }
    //                     /*遍历存镇下所有的村名称和村编号*/
    //                     for (let i in data)
    //                     {
    //                         let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAA011']};
    //                         i++;
    //                         datas8.push(temp3);
    //                     }
    //                     datass3=datas8;
    //                     for(let i=0;i<data.length;i++){
    //                         datas2.push(data[i]['no']);
    //                         datas4.push(data[i]['reach']);
    //                         datas5.push(data[i]['AAA011']);//乡镇编号
    //                         datas6.push(data[i]['AAR009']);//乡镇名称
    //                     }
    //                   option = {
    //                         color:  ['#DD4F43','#1FA463'],
    //                         tooltip : {
    //                             trigger: 'axis',
    //                             axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    //                                 type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //                             }
    //                         },
    //                         legend: {
    //                             data: ['未完成', '已完成'],
    //                             x: '50%',
    //                             y:"3%",
    //                             textStyle:{    //图例文字的样式
    //                                 color:'#fff'
    //                             }
    //                         },
    //                         grid: {
    //                             top: "10%",
    //                             left: '2%',
    //                             right: '5%',
    //                             bottom: '10%',
    //                             containLabel: true
    //                         },
    //                         yAxis:  {
    //                             type: 'value',
    //                             axisLine:{
    //                                 lineStyle:{
    //                                     color:'#fff'
    //                                 }
    //                             }
    //                         },
    //                         xAxis: {
    //                             triggerEvent:true,
    //                             type: 'category',
    //                             data: datas6,
    //                             axisLabel:{
    //                                 interval:0,
    //                                 rotate:-30,
    //                                 textStyle:{
    //                                     fontSize:10
    //                                 }
    //                             },
    //                             axisLine:{
    //                                 lineStyle:{
    //                                     color:'#fff'
    //                                 }
    //                             }
    //                         },
    //                         series: [
    //                             {
    //                                 name: '未完成',
    //                                 type: 'bar',
    //                                 stack: '总量',
    //                                 barWidth: 10,

    //                                 data: datas2,
    //                                 itemStyle: {
    //                                     //柱形图圆角，鼠标移上去效果
    //                                     emphasis: {
    //                                         barBorderRadius: [5, 5, 0, 0]
    //                                     },

    //                                     normal: {
    //                                         //柱形图圆角，初始化效果
    //                                         barBorderRadius:[5, 5, 0, 0]
    //                                     }
    //                                 }
    //                             },
    //                             {
    //                                 name: '已完成',
    //                                 type: 'bar',
    //                                 stack: '总量',
    //                                 barWidth: 10,

    //                                 data: datas4,
    //                                 itemStyle: {
    //                                     //柱形图圆角，鼠标移上去效果
    //                                     emphasis: {
    //                                         barBorderRadius: [5, 5, 5, 5]
    //                                     },

    //                                     normal: {
    //                                         //柱形图圆角，初始化效果
    //                                         barBorderRadius:[5, 5, 5, 5]
    //                                     }
    //                                 }
    //                             },

    //                         ]
    //                     };
    //                     if (option && typeof option === "object") {
    //                         myChart11.setOption(option, true);
    //                     }
    //                 }
    //             })
    //         }
    //     })
    //     /*点击村*/
    //     myChart11.on("click",function(params){
    //         if(params.componentType == "xAxis"){
    //             $("#houseName").text(params.value);
    //             $(".pop-up6").css({"opacity":0,"top":"-100%"});
    //             $(".pop-up7").css({"opacity":"1","top":"50%"});
    //             /*点击柱状图找对应的村编号传给后台*/
    //             var paramsNum3;
    //             for(let j=0;j<datass3.length;j++){
    //                 if(params.value==datass3[j].name){
    //                     paramsNum3=datass3[j].number;
    //                 }
    //             }
    //             let nameList=$("#nameList");
    //             $.ajax({
    //                 url:url+"edu/student/query",
    //                 method:"get",
    //                 dataType:"json",
    //                 data:{"villNo":paramsNum3},
    //                 success:function (result) {
    //                     let data = result.data;
    //                     showList(nameList,data);
    //                 }
    //             })
    //             function showList(obj,data){
    //                 obj.empty();
    //                 let str='';
    //                 for(let i=0;i<data.no.length;i++){
    //                    str=`
    //                     <li style="display: flex;justify-content: space-between;">
	// 						<div>${data.no[i]}</div>
	// 						<div class="status" style="color:#DD4F43">未完成</div>
    //                     </li>
    //                  `;}
    //               for(let i=0;i<data.reach.length;i++){
    //                       str +=`
    //                     <li style="display: flex;justify-content: space-between;">
	// 						<div>${data.reach[i]}</div>
	// 						<div class="status" style="color:#1FA463">已完成</div>
    //                     </li>
    //                  `;}
    //                     obj.html(function (i,value) {
    //                         return value+str;
    //                     })
    //                 }
    //         }
    //     })

    // }

    // /*************************************右上 在校生分阶段情况*******************************************/
    // var dom3 = document.getElementById("module-3");
    // var myChart3= echarts.init(dom3);
    // industryPoverty3();
    // function industryPoverty3(){
    //     let datass;
    //     let datass2;
    //     // let school = [];
    //     // var paramsNum;
    //     $.ajax({
    //         url:url+"ecology/sSubItes",
    //         method:"get",
    //         dataType:"json",
    //         data:{},
    //         success:function (result) {
    //             // console.log(result)
    //             // let data=result.data[3];
    //             // var pieRadius=['45%', '62%'];
    //             // var yHeight='38%';
    //             // school = [data.XQ,data.XX,data.CZ,data.GZ,data.ZZ,data.GZZ,data.QT];
    //         // alert(school)
    //          data = result.data;
    //             let datas=[];    //x轴坐标值
    //             let datas2=[];  //数据1
    //             let datas3=[];  //数据2
    //             let datas4=[];  //数据3
    //             let datas5=[];  //数据4
    //             let datas6=[];  //数据5
    //             let arr=['未完成','已完成'];
    //             let dom4 = document.getElementById("module-4");
    //             let myChart4 = echarts.init(dom4);
    //             /*遍历保存市的区县名称和区县编号*/
    //             for (let i in data)
    //             {
    //                 let temp = {"name":data.AAR009,"number":data.AAR008};
    //                 i++;
    //                 datas6.push(temp);
    //             }
    //             datass=datas6;
    //            option = {
    //                 color: ['#4ddead'],
    //                 title: {
    //                     text: '全市生态扶贫项目收益情况',
    //                     left: 10,
    //                     top:5,
    //                     textStyle: {
    //                         color: '#fff',
    //                         fontSize: 16,
    //                     },
    //                 },
    //                 tooltip: {
    //                     trigger: 'axis'
    //                 },
    //                 xAxis: [
    //                     {
    //                         triggerEvent:true,
    //                         type: 'category',
    //                         data: ['退耕还林','生态林'] ,
    //                         axisLabel:{
    //                         interval:0,
    //                         rotate:-30,
    //                         textStyle:{
    //                             fontSize:10
    //                         }
    //                     },
    //                         axisLine:{
    //                             lineStyle:{
    //                                 color:'#fff'
    //                             }
    //                         }
    //                     }
    //                 ],
    //                 grid: {
    //                     top: "30%",
    //                     left: '2%',
    //                     right: '5%',
    //                     bottom: '5%',
    //                     containLabel: true
    //                 },
    //                 yAxis: [
    //                     {
    //                         type: 'value',
    //                         name: '单位：户',
    //                         axisLabel: {
    //                             formatter: '{value} '
    //                         },
    //                         axisLine:{
    //                             lineStyle:{
    //                                 color:'#fff'
    //                             }
    //                         },
    //                         boundaryGap: false,
    //                         splitLine:{
    //                         show:false
    //                         },
    //                     },


    //                 ],
    //                 series: [
    //                     {
    //                         name:'受益户数',
    //                         type:'bar',
    //                         barWidth : 15,//柱图宽度
    //                         label: {
    //                             normal: {
    //                                 show: true,
    //                                 position: 'top'
    //                             }
    //                         },
    //                         data: [data.reforest,data.ecoforest],
    //                         itemStyle: {
    //                                     //a柱形图圆角，鼠标移上去效果
    //                                     emphasis: {
    //                                         barBorderRadius: [3, 3, 0, 0]
    //                                     },

    //                                     normal: {
    //                                         //柱形图圆角，初始化效果
    //                                         barBorderRadius:[3, 3, 0, 0]
    //                                     }
    //                                 }
    //                     },

    //                 ]
    //             };
    //         if (option && typeof option === "object") {
    //             myChart3.setOption(option, true);
    //         }
    //             }
    //         })
    // }

//      var dom6 = document.getElementById("module-6");
//      var myChart6 = echarts.init(dom6);
//      var dom12 = document.getElementById("module-12");
//      var myChart12 = echarts.init(dom12);
//      var dom13 = document.getElementById("module-13");
//      var myChart13 = echarts.init(dom13);
//      myChart3.on("click", eConsole3);
//      function eConsole3(param) {
//          alert(param.value);
//             var  cityName="西安市";
//             var  countyName;
//             var  townName;
//             var villageName;
//             var n1 = [];
//             var n2 = [];
//             var n11 = [];
//             var n21 = [];
//             var n111 = [];
//             var n211 = [];
//             $(".pop-up20").css({"opacity":"1","top":"50%"});
//         //集中安置 县区
//             $.ajax({
//                 url:url+'edu/grade/query',
//                 method:"get",
//                 dataType:"json",
//                 data:{'number':codes,'falg':param.value},
//                 success:function (result) {
//                     if(result.code==2000){
//                         for(let i = 0; i < result.data.length; i++ ){
//                             n1[i] = result.data[i].AAA011;
//                             n2[i] = result.data[i].AAR009;
//                         }
//                         show20(myChart6,result,cityName);
//                     }
//                 }
//             })
//         if(params.componentType == "xAxis"){
//             $("#project").text(params.value);
//             $(".container>.box").css({"opacity":"1","top":"0"});
//             $(".pop-up").css({"opacity":"1","top":"50%"});
//             // alert("单击了"+params.value+"x轴标签");
//         }else{
//             // alert("单击了"+params.name+"柱状图");
//         }
//             /*点击县到镇*/
//             myChart6.on("click",function(params){
//                var kk;
//                 //alert(params.value)
//                 for(let i = 0; i < n2.length;i++ ){
//                     if(params.value == n2[i]){
//                         kk=i;
//                         countyName = params.value;
//                     }
//                 }
//                 //console.log(params)
//              $.ajax({
//                 url:url+'edu/grade/query',
//                 method:"get",
//                 dataType:"json",
//                 data:{'number':n1[kk],'falg':params.value},
//                 success:function (result) {
//                     if(result.code==2000){
//                          for(let i = 0; i < result.data.length; i++ ){
//                             n11[i] = result.data[i].AAA011;
//                             n21[i] = result.data[i].AAR009;
//                         }
//                         show20(myChart12,result,countyName);
//                         //alert("2123")
//                     }
//                 }
//             })
//                 if(params.componentType == "xAxis"){
//                     $("#countyName9").text(params.value);
//                     $(".pop-up20").css({"opacity":0,"top":"-100%"});
//                     $(".pop-up21").css({"opacity":"1","top":"50%"});
//                 }else{
//                     // alert("单击了"+params.name+"柱状图");
//                 }
//             })
//             /*点击镇到村*/
//             myChart12.on("click",function(params){
//                 var kk;
//                    for(let i = 0; i < n21.length;i++ ){
//                     if(params.value == n21[i]){
//                         townName = params.value;
//                         kk=i;
//                     }
//                 }
//                 $.ajax({
//                     url:url+'edu/grade/query',
//                     method:"get",
//                     dataType:"json",
//                     data:{'number':n11[kk],'falg':params.value},
//                     success:function (result) {
//                         if(result.code==2000){
//                             for(let i = 0; i < result.data.length; i++ ){
//                                 n111[i] = result.data[i].AAA011;
//                                 n211[i] = result.data[i].AAR009;
//                             }
//                             show20(myChart13,result,townName);
//                             //alert("2123")
//                         }
//                 }
//             })
//                 //console.log(params)
//                 if(params.componentType == "xAxis"){
//                     $("#countyName10").text(params.value);
//                     $(".pop-up21").css({"opacity":0,"top":"-100%"});
//                     $(".pop-up22").css({"opacity":"1","top":"50%"});
//                     // alert("单击了"+params.value+"x轴标签");
//                 }else{
//                     // alert("单击了"+params.name+"柱状图");
//                 }
//             })
//             /*点击村到户*/
//             myChart13.on("click",function(params){
//                   var kk;
//                   var zhangfei = $("#zhangfei")
//                    for(let i = 0; i < n211.length;i++ ){
//                     if(params.value == n211[i]){
//                         kk=i;
//                         villageName = params.value;
//                     }
//                 }
//                 $.ajax({
//                     url:url+'edu/ongo/query',
//                     method:"post",
//                     dataType:"json",
//                     data:{'cityNo':n111[kk],'placement':'1'},
//                     success:function (result) {
//                         if(result.code==2000){
//                             show22table(xiaomin,result,villageName);
//                             //alert("2123")
//                         }
//                 }
//             })
//                 console.log(params)
//                 if(params.componentType == "xAxis"){
//                     $("#villageName6").text(params.value);
//                     $(".pop-up22").css({"opacity":0,"top":"-100%"});
//                     $(".pop-up23").css({"opacity":"1","top":"50%"});
//                     // alert("单击了"+params.value+"x轴标签");
//                 }else{
//                     // alert("单击了"+params.name+"柱状图");
//                 }
//             })
//     }





// /****************************集中安置正在达标的县（20）、镇（21）、村（22）*********************************/
// function show20(obj,data,name){
// obj.innerHTML="";
// var n2 = [];
// var n3 = [];
// var n4 = [];
// var n5 = [];

// for(let i = 0; i < data.data.length; i++){
//    n2[i] = data.data[i].AAR009;
//    n3[i] = data.data[i].reach;
//    n4[i] = data.data[i].no;
//    n5[i] = data.data[i].ongoing;
// }
//     option = {
//             color:  ['#DD4F43','#1FA463'],
//             title: {
//                 text: name+'健康搬迁达标情况',
//                 left: 15,
//                 top:10,
//                 textStyle: {
//                     fontWeight: '800',
//                     color: '#ffffff',
//                     fontSize: 16
//                 }
//             },
//             tooltip : {
//                 trigger: 'axis',
//                 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//                 }
//             },
//             legend: {
//                 data: arr,
//                 x: 'right',
//                 y:"4%",
//                 textStyle:{    //图例文字的样式
//                     color:'#fff'
//                 }
//             },
//             grid: {
//                 top: "23%",
//                 left: '2%',
//                 right: '5%',
//                 bottom: '5%',
//                 containLabel: true
//             },
//             yAxis:  {
//                 type: 'value',
//                 name: '单位：户',
//                 axisLine:{
//                     lineStyle:{
//                         color:'#fff'
//                     }
//                 },
//                 splitLine:{
//                     show:false
//                 }
//             },
//             xAxis: {
//                 type: 'category',
//                 data: n2,
//                 axisLabel:{
//                     triggerEvent:true,
//                     interval:0,
//                     rotate:-30,
//                     textStyle:{
//                         fontSize:10
//                     },
//                 },
//                 triggerEvent:true,
//                 axisLine:{
//                     lineStyle:{
//                         color:'#fff'
//                     }
//                 }
//             },
//             series: [
//                 {
//                     name: '未完成',
//                     type: 'bar',
//                     stack: '总量',
//                     barWidth: 10,
//                     data: n4,
//                     itemStyle: {
//                         //柱形图圆角，鼠标移上去效果
//                         emphasis: {
//                             barBorderRadius: [5, 5, 0, 0]
//                         },

//                         normal: {
//                             //柱形图圆角，初始化效果
//                             barBorderRadius:[5, 5, 0, 0]
//                         }
//                     }
//                 },
//                 {
//                     name: '正达标',
//                     type: 'bar',
//                     stack: '总量',
//                     barWidth: 10,
//                     data: n5,
//                     itemStyle: {
//                         //柱形图圆角，鼠标移上去效果
//                         emphasis: {
//                             barBorderRadius: [5, 5, 5, 5]
//                         },
//                         normal: {
//                             //柱形图圆角，初始化效果
//                             barBorderRadius:[5, 5, 5, 5]
//                         }
//                     }
//                 },
//                 {
//                     name: '已完成',
//                     type: 'bar',
//                     stack: '总量',
//                     barWidth: 10,

//                     data: n2,
//                     itemStyle: {
//                         //柱形图圆角，鼠标移上去效果
//                         emphasis: {
//                             barBorderRadius: [5, 5, 5, 5]
//                         },

//                         normal: {
//                             //柱形图圆角，初始化效果
//                             barBorderRadius:[5, 5, 5, 5]
//                         }
//                     }
//                 },

//             ]
//         };
// if (option && typeof option === "object") {
//     obj.setOption(option, true);
// }
// }

// function show22table(){
//         for(let i=0;i<data.reach.length;i++){
//          str +=`
//             <li style="display: flex;justify-content: space-between;">
//                 <div>${data.reach[i]}</div>
//                 <div class="status" style="color:#1FA463">已完成</div>
//             </li>
//             `;}
// }



  /***************************************************生态扶贫分阶段达标情况***********************************************/
//   var dom4 = document.getElementById("module-4");
//   var myChart4 = echarts.init(dom4);
    // industryPoverty4();
    // function industryPoverty4(){
    //     $.ajax({
    //         url:url+"ecology/aRanger",
    //         method:"get",
    //         dataType:"json",
    //         data:{"cityNo":codes,"placement":0},
    //         success:function (result) {
    //             // console.log(result)
    //             let data=result.data[1];
    //             var pieRadius=['45%', '62%'];
    //             var yHeight='38%';

    //           option = {
    //                 color: ['#d420c8'],
    //                 title: {
    //                     text: '全市生态补偿发放情况',
    //                     left: 10,
    //                     top:5,
    //                     textStyle: {
    //                         color: '#fff',
    //                         fontSize: 16,
    //                     },
    //                 },
    //                 tooltip: {
    //                     trigger: 'axis'
    //                 },

    //                 xAxis: [
    //                     {
    //                         triggerEvent:true,
    //                         type: 'category',
    //                         data: ['护林员安置','生态补偿发放人数'],
    //                         axisLabel:{
    //                             interval:0,
    //                             rotate:0,
    //                             textStyle:{
    //                                 fontSize:10
    //                             }
    //                         },
    //                         axisLine:{
    //                             lineStyle:{
    //                                 color:'#fff'
    //                             }
    //                         }
    //                     }
    //                 ],
    //                 grid: {
    //                     top: "30%",
    //                     left: '2%',
    //                     right: '5%',
    //                     bottom: '5%',
    //                     containLabel: true
    //                 },
    //                 yAxis: [
    //                     {
    //                         type: 'value',
    //                         name: '单位：人',
    //                         min: 0,
    //                         max: 200,
    //                         interval: 40,
    //                         axisLabel: {
    //                             formatter: '{value} '
    //                         },
    //                         axisLine:{
    //                             lineStyle:{
    //                                 color:'#fff'
    //                             }
    //                         },
    //                         boundaryGap: true,
    //                         splitLine:{
    //                         show:false
    //                         },
    //                     },
    //                 ],
    //                 series: [
    //                     {
    //                         name:'人数',
    //                         type:'bar',
    //                         barWidth : 15,//柱图宽度
    //                         label: {
    //                             normal: {
    //                                 show: true,
    //                                 position: 'top'
    //                             }
    //                         },
    //                         data:[150,180],
    //                         itemStyle: {
    //                                     //a柱形图圆角，鼠标移上去效果
    //                                     emphasis: {
    //                                         barBorderRadius: [3, 3, 0, 0]
    //                                     },

    //                                     normal: {
    //                                         //柱形图圆角，初始化效果
    //                                         barBorderRadius:[3, 3, 0, 0]
    //                                     }
    //                         }
    //                     }
    //                 ]
    //             };
    //            if (option && typeof option === "object") {
    //                 myChart4.setOption(option, true);
    //             }
    //         }
    //     })
    // }
//     /*******************************************分散安置 **************************************************/
//      var dog23 = document.getElementById("module-23"); //未完成 县
//      var myChart23 = echarts.init(dog23);
//      var dog24 = document.getElementById("module-24");//未完成 镇
//      var myChart24 = echarts.init(dog24);
//      var dog25 = document.getElementById("module-25"); // 未完成 村
//      var myChart25 = echarts.init(dog25);
//      var dog26 = document.getElementById("module-26");  //已完成县
//      var myChart26 = echarts.init(dog26);
//      var dog27 = document.getElementById("module-27");  //已完成 镇
//      var myChart27 = echarts.init(dog27);
//      var dog28 = document.getElementById("module-28");  //已完成 村
//      var myChart28 = echarts.init(dog28);
//      var dog29 = document.getElementById("module-29"); //正达标
//      var myChart29 = echarts.init(dog29);
//      var dom30 = document.getElementById("module-30"); //正
//      var myChart30 = echarts.init(dom30);
//      var dom31 = document.getElementById("module-31"); //正
//      var myChart31 = echarts.init(dom31);
//      var  hongda = $("#hongda");//未完成 户
//      var zhengqiang = $("#zhengqiang");//完成
//     myChart4.on("click", eConsole4);
//     function eConsole4(param) {

// // /**************8*****分散安置正在达标********************/
// //         }else if(param.dataIndex==1){
//             var n1 = [];
//             var n2 = [];
//             var n11 = [];
//             var n21 = [];
//             var n111 = [];
//             var n211 = [];
//             var city = "西安市";
//             var county;
//             var town;
//             var village;
//             $(".pop-up32").css({"opacity":"1","top":"50%"});
//         //集中安置 县区
//             $.ajax({
//                 url:url+'edu/ongo/query',
//                 method:"post",
//                 dataType:"json",
//                 data:{'cityNo':codes,'placement':'0'},
//                 success:function (result) {
//                     if(result.code==2000){
//                         for(let i = 0; i < result.data.length; i++ ){
//                             n1[i] = result.data[i].AAA011;
//                             n2[i] = result.data[i].AAR009;
//                         }
//                         show30(myChart29,result,city);
//                     }
//                 }
//             })
//             /*点击县到镇*/
//             myChart29.on("click",function(params){
//                var gg;
//                 //alert(params.value)
//                 for(let i = 0; i < n2.length;i++ ){
//                     if(params.value == n2[i]){
//                         gg=i;
//                         county = params.value;
//                     }
//                 }
//                 //console.log(params)
//              $.ajax({
//                 url:url+'edu/ongo/query',
//                 method:"post",
//                 dataType:"json",
//                 data:{'cityNo':n1[gg],'placement':'0'},
//                 success:function (result) {
//                     if(result.code==2000){
//                          for(let i = 0; i < result.data.length; i++ ){
//                             n11[i] = result.data[i].AAA011;
//                             n21[i] = result.data[i].AAR009;
//                         }
//                         show30(myChart30,result,county);
//                         //alert("2123")
//                     }
//                 }
//             })
//                 if(params.componentType == "xAxis"){
//                     $("#countyName15").text(params.value);
//                     $(".pop-up32").css({"opacity":0,"top":"-100%"});
//                     $(".pop-up33").css({"opacity":"1","top":"50%"});
//                 }else{
//                     // alert("单击了"+params.name+"柱状图");
//                 }
//             })
//             /*点击镇到村*/
//             myChart30.on("click",function(params){
//                 var gg;
//                    for(let i = 0; i < n21.length;i++ ){
//                     if(params.value == n21[i]){
//                         gg=i;
//                         town = params.value;
//                     }
//                 }
//                 $.ajax({
//                     url:url+'edu/ongo/query',
//                     method:"post",
//                     dataType:"json",
//                     data:{'cityNo':n11[gg],'placement':'0'},
//                     success:function (result) {
//                         if(result.code==2000){
//                             for(let i = 0; i < result.data.length; i++ ){
//                                 n111[i] = result.data[i].AAA011;
//                                 n211[i] = result.data[i].AAR009;
//                             }
//                             show30(myChart31,result,town);
//                             //alert("2123")
//                         }
//                 }
//             })
//                 //console.log(params)
//                 if(params.componentType == "xAxis"){
//                     $("#countyName16").text(params.value);
//                     $(".pop-up33").css({"opacity":0,"top":"-100%"});
//                     $(".pop-up34").css({"opacity":"1","top":"50%"});
//                     // alert("单击了"+params.value+"x轴标签");
//                 }else{
//                     // alert("单击了"+params.name+"柱状图");
//                 }
//             })
//             /*点击村到户*/
//             myChart31.on("click",function(params){
//                   var gg;
//                   var lele = $("#lele")
//                    for(let i = 0; i < n211.length;i++ ){
//                     if(params.value == n211[i]){
//                         gg=i;
//                         village = params.value;
//                     }
//                 }
//                 $.ajax({
//                     url:url+'edu/ongo/query',
//                     method:"post",
//                     dataType:"json",
//                     data:{'cityNo':n111[gg],'placement':'0'},
//                     success:function (result) {
//                         if(data.code=2000){
//                             show30table(lele,result,village);
//                             //alert("2123")
//                         }
//                 }
//             })
//                 console.log(params)
//                 if(params.componentType == "xAxis"){
//                     $("#villageName7").text(params.value);
//                     $(".pop-up34").css({"opacity":0,"top":"-100%"});
//                     $(".pop-up35").css({"opacity":"1","top":"50%"});
//                     // alert("单击了"+params.value+"x轴标签");
//                 }else{
//                     // alert("单击了"+params.name+"柱状图");
//                 }
//             })
//     }


// /****************************分散安置正在达标的县（29）、镇（30）、村（31）的渲染*********************************/
// function show30(obj,data,name){
//   //  alert("dasd");
// obj.innerHTML="";
// var n2 = [];
// var n3 = [];
// var n4 = [];
// var n5 = [];

// for(let i = 0; i < data.data.length; i++){
//    n2[i] = data.data[i].AAR009;
//    n3[i] = data.data[i].reach;
//    n4[i] = data.data[i].no;
//    n5[i] = data.data[i].ongoing;
// }
//     option = {
//             color:  ['#DD4F43','#1FA463'],
//             title: {
//                 text: name+'健康搬迁达标情况',
//                 left: 15,
//                 top:10,
//                 textStyle: {
//                     fontWeight: '800',
//                     color: '#ffffff',
//                     fontSize: 16
//                 }
//             },
//             tooltip : {
//                 trigger: 'axis',
//                 axisPointer : {            // 坐标轴指示器，坐标轴触发有效
//                     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
//                 }
//             },
//             legend: {
//                 data: arr,
//                 x: 'right',
//                 y:"4%",
//                 textStyle:{    //图例文字的样式
//                     color:'#fff'
//                 }
//             },
//             grid: {
//                 top: "23%",
//                 left: '2%',
//                 right: '5%',
//                 bottom: '5%',
//                 containLabel: true
//             },
//             yAxis:  {
//                 type: 'value',
//                 name: '单位：户',
//                 axisLine:{
//                     lineStyle:{
//                         color:'#fff'
//                     }
//                 },
//                 splitLine:{
//                     show:false
//                 }
//             },
//             xAxis: {
//                 type: 'category',
//                 data: n2,
//                 axisLabel:{
//                     triggerEvent:true,
//                     interval:0,
//                     rotate:-30,
//                     textStyle:{
//                         fontSize:10
//                     },
//                 },
//                 triggerEvent:true,
//                 axisLine:{
//                     lineStyle:{
//                         color:'#fff'
//                     }
//                 }
//             },
//             series: [
//                 {
//                     name: '未完成',
//                     type: 'bar',
//                     stack: '总量',
//                     barWidth: 10,
//                     data: n4,
//                     itemStyle: {
//                         //柱形图圆角，鼠标移上去效果
//                         emphasis: {
//                             barBorderRadius: [5, 5, 0, 0]
//                         },

//                         normal: {
//                             //柱形图圆角，初始化效果
//                             barBorderRadius:[5, 5, 0, 0]
//                         }
//                     }
//                 },
//                 {
//                     name: '正达标',
//                     type: 'bar',
//                     stack: '总量',
//                     barWidth: 10,
//                     data: n5,
//                     itemStyle: {
//                         //柱形图圆角，鼠标移上去效果
//                         emphasis: {
//                             barBorderRadius: [5, 5, 5, 5]
//                         },
//                         normal: {
//                             //柱形图圆角，初始化效果
//                             barBorderRadius:[5, 5, 5, 5]
//                         }
//                     }
//                 },
//                 {
//                     name: '已完成',
//                     type: 'bar',
//                     stack: '总量',
//                     barWidth: 10,

//                     data: n2,
//                     itemStyle: {
//                         //柱形图圆角，鼠标移上去效果
//                         emphasis: {
//                             barBorderRadius: [5, 5, 5, 5]
//                         },

//                         normal: {
//                             //柱形图圆角，初始化效果
//                             barBorderRadius:[5, 5, 5, 5]
//                         }
//                     }
//                 },

//             ]
//         };
// if (option && typeof option === "object") {
//     obj.setOption(option, true);
// }
// }
// function show30table(obj,data){
//     alert("dasd")
//     obj.empty();
//     var str = "";
//     for(let i = 0; i < data.data.length; i+3){
//         str +=`
//       <li>
//             <div>${data.data[i]}</div>
//             <div>${data.data[i+1]}</div>
//             <div>${data.data[i+2]}</div>
//         </li>
//         `;
//     }
//     obj.html(str);
// }



//     /*************************受益户数和受益人数占比及比重*****************************************/
//     industryPoverty5();
//     function industryPoverty5(){
//         var pieRadius=['45%', '62%'];
//         var yHeight='38%';
//         var dom5 = document.getElementById("module-5");
//         var myChart5 = echarts.init(dom5);
//         $.ajax({
//             url:url+"edu/reloc/query",
//             method:"get",
//             dataType:"json",
//             data:{},
//             success:function (result) {
//                 let data=result.data[3];
//                 option = {
//                         color: ['#4ddead', '#3c7eb5'],
//                         title: {
//                             text: '受益户数和受益人数占比及比重',
//                             left:10,
//                             top:-5,
//                             textStyle: {
//                                 color: '#fff',
//                                 fontSize: 16,
//                             },
//                         },
//                         tooltip: {
//                             trigger: 'axis'
//                         },
//                         legend: {
//                             x:'60%',
//                             top:-5,
//                             data:['受益户数','受益人数'],
//                             textStyle:{    //图例文字的样式
//                                 color:'#fff'
//                             }
//                         },
//                         xAxis: [
//                             {
//                                 triggerEvent:'true',
//                                 type: 'category',
//                                 data: ['集中安置','分散安置'],
//                                 axisPointer: {
//                                     type: 'shadow'
//                                 },
//                                 axisLine:{
//                                     lineStyle:{
//                                         color:'#fff'
//                                     }
//                                 },
//                                 axisLabel: {
//                                     interval:0,
//                                     rotate:0,
//                                     fontSize:12
//                                 }
//                                 }
//                             ],
//                             grid: {
//                                 top: "20%",
//                                 left: '2%',
//                                 right: '5%',
//                                 bottom: '5%',
//                                 containLabel: true
//                             },
//                             yAxis: [
//                                 {
//                                     type: 'value',
//                                     name: '受益户数',
//                                     axisLabel: {
//                                         formatter: '{value} ',
//                                     },
//                                     axisLine:{
//                                         lineStyle:{
//                                             color:'#fff'
//                                         }
//                                     },
//                                     boundaryGap: false,
//                                     splitLine:{
//                                         show:false
//                                     },
//                                 },
//                                 {
//                                     type: 'value',
//                                     name: '受益人数',
//                                     axisLabel: {
//                                         formatter: '{value} '
//                                     },
//                                     axisLine:{
//                                         lineStyle:{
//                                             color:'#fff'
//                                         }
//                                     },
//                                     boundaryGap: false,
//                                     splitLine:{
//                                         show:false
//                                     },
//                                 },

//                             ],
//                             series: [
//                             {
//                                 name:'受益户数',
//                                 type:'bar',
//                                 barWidth : 15,//柱图宽度
//                                 label: {
//                                     normal: {
//                                         show: true,
//                                         position: 'top'
//                                     }
//                                 },
//                                 data:[data[0].jzhouse,data[0].fshouse]
//                             },
//                             {
//                                 name:'受益人数',
//                                 type:'bar',
//                                 barWidth : 15,//柱图宽度
//                                 yAxisIndex: 1,
//                                 label: {
//                                     normal: {
//                                         show: true,
//                                         position: 'top'
//                                     }
//                                 },
//                                 data:[data[0].jznumber,data[0].fsnumber]
//                             }
//                         ]
//             };
//             if (option && typeof option === "object") {
//                 myChart5.setOption(option, true);
//             }
//             }
//         })
//     }
// /*****************显示县区 镇 村 受益户数 人数********************/
//      var dog32 = document.getElementById("module-32"); // 县
//      var myChart32 = echarts.init(dog32);
//      var dog33 = document.getElementById("module-33");//镇
//      var myChart33 = echarts.init(dog33);
//      var dog34 = document.getElementById("module-34"); // 村
//      var myChart34 = echarts.init(dog34);
//     	var k1 = [];
// 		var k2 = [];
// 		var k11 = [];
// 		var k21 = [];
//         var type = 1;
//     myChart5.on("click",function(params){
//         //console.log(params)
//        if(params.value=="集中安置"){
//          type = 1;
//       }else{
//           type = 0;
//       }
//     //  alert(type)
// 		 $.ajax({
//                 url:url+'edu/concent/query',
//                 method:"get",
//                 dataType:"json",
//                 data:{'cityNo':codes,'placement':type},
//                 success:function (result) {
//                     if(result.code==2000){
//                         for(let i = 0; i < result.data.length; i++ ){
//                             k1[i] = result.data[i].AAA011;
//                             k2[i] = result.data[i].AAR009;
//                         }
//                         showConcent(myChart32,result);
//                     }
//                 }
//             })
//         if(params.componentType == "xAxis"){
//             $(".container>.box").css({"opacity":"1","top":"0"});
//             $("#placeName").text(params.value);
//             $(".pop-up36").css({"opacity":"1","top":"50%"});
//             // alert("单击了"+params.value+"x轴标签");
//         }else{
//             // alert("单击了"+params.name+"柱状图");
//         }
//     })
//     myChart32.on("click",function(params){
// 		var g;
// 			//alert(params.value)
// 			for(let i = 0; i < k2.length;i++ ){
// 				if(params.value == k2[i]){
// 					g=i;
// 				}
// 			}
// 			 $.ajax({
//                 url:url+'edu/concent/query',
//                 method:"get",
//                 dataType:"json",
//                 data:{'cityNo':k1[g],'placement':type},
//                 success:function (result) {
//                     if(result.code==2000){
//                         for(let i = 0; i < result.data.length; i++ ){
//                             k11[i] = result.data[i].AAA011;
//                             k21[i] = result.data[i].AAR009;
//                         }
//                         showConcent(myChart33,result);
//                     }
//                 }
//             })

//         if(params.componentType == "xAxis"){
//             $("#countyName18").text(params.value);
//             $("#placeName2").text($("#placeName").text());
//             $(".pop-up36").css({"opacity":0,"top":"-100%"});
//             $(".pop-up37").css({"opacity":"1","top":"50%"});
//             // alert("单击了"+params.value+"x轴标签");
//         }else{
//             // alert("单击了"+params.name+"柱状图");
//         }
//     })
//     myChart33.on("click",function(params){
//         	var gg;
// 			//alert(params.value)
// 			for(let i = 0; i < k21.length;i++ ){
// 				if(params.value == k21[i]){
// 					gg=i;
// 				}
// 			}
// 			 $.ajax({
//                 url:url+'edu/concent/query',
//                 method:"get",
//                 dataType:"json",
//                 data:{'cityNo':k11[gg],'placement':type},
//                 success:function (result) {
//                     if(result.code==2000){
//                         showConcent(myChart34,result);
//                     }
//                 }
//             })

//         if(params.componentType == "xAxis"){
//             $("#countyName19").text(params.value);
//             $("#placeName3").text($("#placeName").text());
//             $(".pop-up37").css({"opacity":0,"top":"-100%"});
//             $(".pop-up38").css({"opacity":"1","top":"50%"});
//             // alert("单击了"+params.value+"x轴标签");
//         }else{
//             // alert("单击了"+params.name+"柱状图");
//         }
//     })

// function showConcent(obj,data){
//     obj.innerHTML="";
//     var n2 = [];
//     var n3 = [];
//     var n4 = [];
//     for(let i = 0; i < data.data.length; i++){
//         n2[i] = data.data[i].AAR009;
//         n3[i] = data.data[i].jzHouse;
//         n4[i] = data.data[i].jzNumber;
//         }
//    option = {
//     color: ['#4ddead', '#3c7eb5'],

//     tooltip: {
//         trigger: 'axis'
//     },
//     legend: {
//         x:'60%',
//         top:10,
//         data:['受益户数','受益人数'],
//         textStyle:{    //图例文字的样式
//             color:'#fff'
//         }
//     },
//     xAxis: [
//         {
//             triggerEvent:'true',
//             type: 'category',
//             data: n2,
//             axisPointer: {
//                 type: 'shadow'
//             },
//             axisLine:{
//                 lineStyle:{
//                     color:'#fff'
//                 }
//             },
//             axisLabel: {
//                 interval:0,
//                 rotate:-40,
//                 fontSize:12
//             }
//         }
//     ],
//     grid: {
//         top: "15%",
//         left: '2%',
//         right: '5%',
//         bottom: '13%',
//         containLabel: true
//     },
//     yAxis: [
//         {
//             type: 'value',
//             name: '受益户数',
//             min: 0,
//             max: 2,
//             interval: 0.5,
//             axisLabel: {
//                 formatter: '{value} 万',
//             },
//             axisLine:{
//                 lineStyle:{
//                     color:'#fff'
//                 }
//             },
//             boundaryGap: false,
//             splitLine:{
//                 show:false
//             },
//         },
//         {
//             type: 'value',
//             name: '受益人数',
//             min: 0,
//             max: 5,
//             interval: 1,
//             axisLabel: {
//                 formatter: '{value} 万'
//             },
//             axisLine:{
//                 lineStyle:{
//                     color:'#fff'
//                 }
//             },
//             boundaryGap: false,
//             splitLine:{
//                 show:false
//             },
//         },

//     ],
//     series: [
//         {
//             name:'受益户数',
//             type:'bar',
//             barWidth : 15,//柱图宽度
//             label: {
//                 normal: {
//                     show: true,
//                     position: 'top'
//                 }
//             },
//             data:n3
//         },
//         {
//             name:'受益人数',
//             type:'bar',
//             barWidth : 15,//柱图宽度
//             yAxisIndex: 1,
//             label: {
//                 normal: {
//                     show: true,
//                     position: 'top'
//                 }
//             },
//             data:n4
//         }
//     ]
//     };
//     if (option && typeof option === "object") {
//         myChart33.setOption(option, true);
//     }
// }
//  industryPoverty5();
//     function industryPoverty5(){
//         var pieRadius=['45%', '62%'];
//         var yHeight='38%';
//         var dom5 = document.getElementById("module-5");
//         var myChart5 = echarts.init(dom5);
//         $.ajax({
//             url:url+"ecology/aEcoProfit",
//             method:"get",
//             dataType:"json",
//             data:{},
//             success:function (result) {
//                  data = result.data;
//             option = {
//                 color: ['#d420c8'],
//                 // title: {
//                 //     text: '全市生态补偿发放情况',
//                 //     left: 10,
//                 //     top:5,
//                 //     textStyle: {
//                 //         color: '#fff',
//                 //         fontSize: 16,
//                 //     },
//                 // },
//                 tooltip: {
//                     trigger: 'axis'
//                 },

//                 xAxis: [
//                     {
//                         triggerEvent:true,
//                         type: 'category',
//                         data: ['生态补偿发放金额'],
//                         axisLabel:{
//                             interval:0,
//                             rotate:0,
//                             textStyle:{
//                                 fontSize:10
//                             }
//                         },
//                         axisLine:{
//                             lineStyle:{
//                                 color:'#fff'
//                             }
//                         }
//                     }
//                 ],
//                 grid: {
//                     top: "30%",
//                     left: '2%',
//                     right: '5%',
//                     bottom: '5%',
//                     containLabel: true
//                 },
//                 yAxis: [
//                     {
//                         type: 'value',
//                         name: '单位：元',
//                         min: 0,
//                         max: 2,
//                         interval: 0.5,
//                         axisLabel: {
//                             formatter: '{value} '
//                         },
//                         axisLine:{
//                             lineStyle:{
//                                 color:'#fff'
//                             }
//                         },
//                         boundaryGap: true,
//                         splitLine:{
//                             show:false
//                         },
//                     },
//                 ],
//                 series: [
//                     {
//                         name:'人数',
//                         type:'bar',
//                         barWidth : 15,//柱图宽度
//                         label: {
//                             normal: {
//                                 show: true,
//                                 position: 'top'
//                             }
//                         },
//                         data:[data.PROFIT],
//                         itemStyle: {
//                             //a柱形图圆角，鼠标移上去效果
//                             emphasis: {
//                                 barBorderRadius: [3, 3, 0, 0]
//                             },

//                             normal: {
//                                 //柱形图圆角，初始化效果
//                                 barBorderRadius:[3, 3, 0, 0]
//                             }
//                         }
//                     }
//                 ]
//             };
//             if (option && typeof option === "object") {
//                 myChart5.setOption(option, true);
//             }
//             }
//         })
//     }
})