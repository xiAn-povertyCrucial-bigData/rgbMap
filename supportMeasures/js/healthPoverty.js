$(document).ready(function(){
    var url=config.url;
    /*市生态扶贫达标情况统计*/
    var year=config.year;
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    var pieRadius=['45%', '62%'];
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/help/health/count",
            method:"get",
            dataType:"json",
            data:{'disctId':610100000000,'year':year},
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
                        selectedMode:false,
                        x: 'right',
                        y:"4%",
                        data: ['未完成','已完成'],
                        textStyle:{
                            fontSize:14,
                            color:"#fff"
                        }
                    },
                    series: [{
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
                        labelLine: {
                            normal: {
                                show: true,
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
    var dom2 = document.getElementById("module-2");
    var myChart2 = echarts.init(dom2);
    let dom4 = document.getElementById("module-4");
    let myChart4 = echarts.init(dom4);
    let dom10 = document.getElementById("module-10");
    let myChart10 = echarts.init(dom10);
    let dom11 = document.getElementById("module-11");
    let myChart11 = echarts.init(dom11);
    industryPoverty2();
    function industryPoverty2(){
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url:url+"/help/health/countlist",
            method:"get",
            dataType:"json",
            data:{'disctId':610100000000,'year':year},
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
//                  title: {
//                      text: '全市各区县健康扶贫实施情况',
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
                        data: ['未达标','已达标'],
                        x: 'right',
                        y:"5%",
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
                    myChart2.setOption(option, true);
                }
             }
            }
        })
        /*点击区县*/
        myChart2.on("click", function (params) {
            if (params.componentType == "xAxis") {
                $("#countyName").text(params.value);
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $(".pop-up5").css({"opacity": "1", "top": "50%"});
                /*点击柱状图找对应的区县编号传给后台*/
                var paramsNum;
                for (let j = 0; j < datass.length; j++) {
                    if (params.value == datass[j].name) {
                        paramsNum = datass[j].number;
                    }
                }
                $.ajax({
                    url: url + "/help/health/countlist",
                    method: "post",
                    dataType: "json",
                    data: {"year": year, "disctId": paramsNum},
                    success: function (result) {
                        // console.log(result)
                        let data = result.data;
                        let datas = [];
                        let datas2 = [];
                        let datas3 = [];
                        let datas4 = [];
                        let datas7 = [];
                        let arr = ['未达标', '已达标']
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
                            myChart10.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击镇（街）*/
        myChart10.on("click", function (params) {
            if (params.componentType == "xAxis") {
                $("#villageName").text(params.value);
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
    industryPoverty3();
    function industryPoverty3(){
        let dom8= document.getElementById("module-8");
        let myChart8 = echarts.init(dom8);
        let dom9= document.getElementById("module-9");
        let myChart9 = echarts.init(dom9);
        let dom18= document.getElementById("module-18");
        let myChart18 = echarts.init(dom18);
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':610100000000,'year':year,"type":1},
            success:function (result) {
             if(result.code == 2000){
                 var data = [
                            {
                                value: result.data.HOLDER_NO,
                                name: '未完成'
                            },
                            {
                                value:result.data.HOLDER_OK,
                                name: '已完成'
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
                            legend: {
                                data: ['未完成','已完成'],
                                x: 'center',
                                y:"4%",
                                selectedMode:false,
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },
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
            if(1){
                $("#method").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up3").css({"opacity":"1","top":"50%"});
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":1,"disctId":610100000000},
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
                            datas3.push(data[i]['HOLDER_NO']);
                            datas4.push(data[i]['HOLDER_OK']);
                        }
                        option = {
                            color: ['#DD4F43','#1FA463'],
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
                            myChart8.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击区县*/
        myChart8.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#countyName5").text(params.value);
                $(".pop-up3").css({"opacity":0,"top":"-100%"});
                $(".pop-up14").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
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
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":1,"disctId":paramsName},
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
                                        rotate:-80,
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
                $("#villageName4").text(params.value);
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
    industryPoverty4();
    function industryPoverty4(){
        let dom23= document.getElementById("module-23");
        let myChart23 = echarts.init(dom23);
        let dom24= document.getElementById("module-24");
        let myChart24 = echarts.init(dom24);
        let dom25= document.getElementById("module-25");
        let myChart25 = echarts.init(dom25);
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':610100000000,'year':year,"type":2},
            success:function (result) {
             if(result.code == 2000){
                 var data = [
                            {
                                value: result.data.HOLDER_NO,
                                name: '未完成'
                            },
                            {
                                value:result.data.HOLDER_OK,
                                name: '已完成'
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
                                top: "35%",
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
            if(1){
                $("#method").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up17").css({"opacity":"1","top":"50%"});
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":610100000000},
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
                            datas3.push(data[i]['PEOPLE_NO']);
                            datas4.push(data[i]['PEOPLE_OK']);
                        }
                        option = {
                            color: ['#DD4F43','#1FA463'],
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
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
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
                            myChart23.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击区县*/
        myChart23.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#countyName7").text(params.value);
                $(".pop-up17").css({"opacity":0,"top":"-100%"});
                $(".pop-up18").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
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
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":paramsName},
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
                            legend: {
                                data: ['未完成','正实施' ,'已完成'],
                                x: 'right',
                                y:"4%",
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
                $("#countyName8").text(params.value);
                $(".pop-up18").css({"opacity":0,"top":"-100%"});
                $(".pop-up19").css({"opacity":"1","top":"50%"});
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
                            legend: {
                                data: ['未完成','正实施' ,'已完成'],
                                x: 'right',
                                y:"4%",
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
                                bottom: '20%',
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
                $("#houseName4").text(params.value);
                $(".pop-up19").css({"opacity":0,"top":"-100%"});
                $(".pop-up20").css({"opacity":"1","top":"50%"});
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
                    url:url+"/help/health/child/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":paramsName},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums2").text(data.length);
                        showList4(nameList3,data);
                        /*for(let i=0;i<$(".status2").length;i++){
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
    industryPoverty5();
    function industryPoverty5(){
        let dom26= document.getElementById("module-26");
        let myChart26 = echarts.init(dom26);
        let dom27= document.getElementById("module-27");
        let myChart27 = echarts.init(dom27);
        let dom28= document.getElementById("module-28");
        let myChart28 = echarts.init(dom28);
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':610100000000,'year':year,"type":3},
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
                                left: '8%',
                                right: '2%',
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
            if(1){
                $("#method").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up21").css({"opacity":"1","top":"50%"});
                $.ajax({
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":3,"disctId":610100000000},
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
                            datas3.push(data[i]['PEOPLE_NO']);
                            datas4.push(data[i]['PEOPLE_OK']);
                        }
                        option = {
                            color: ['#DD4F43','#1FA463'],
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
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
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
                            myChart26.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击区县*/
        myChart26.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#countyName9").text(params.value);
                $(".pop-up21").css({"opacity":0,"top":"-100%"});
                $(".pop-up22").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
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
                    url:url+"/help/health/child/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":3,"disctId":paramsName},
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
                                top: "10%",
                                left: '2%',
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
                $("#countyName10").text(params.value);
                $(".pop-up22").css({"opacity":0,"top":"-100%"});
                $(".pop-up23").css({"opacity":"1","top":"50%"});
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
                                top: "10%",
                                left: '2%',
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
                $(".pop-up23").css({"opacity":0,"top":"-100%"});
                $(".pop-up24").css({"opacity":"1","top":"50%"});
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
                    data:{"year":year,"type":3,"disctId":paramsName},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums2").text(data.length);
                        showList4(nameList4,data);
                        /*for(let i=0;i<$(".status2").length;i++){
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
})