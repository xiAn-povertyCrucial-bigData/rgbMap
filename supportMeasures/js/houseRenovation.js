$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*市产业扶贫实施情况统计*/
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '41%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/danger/reloc/query",
            method:"get",
            dataType:"json",
            data:{},
            success:function (result) {
                let data=result.data[0][0];
                let datas=[];
                let i=0;
                let arr=['未启动','未入住','已入住'];
                let datatable =[data.no,data.ongoing,data.reach];
                for (var key in data)
                {
                    let temp = {"value":datatable[i],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }
                let count=data.no+data.ongoing+data.reach;
                option = {
                    color:  ['#DD4F43','#FFCE43','#1FA463'],
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
                        selectedMode:false,
                        y:"4%",
                        textStyle:{    //图例文字的样式
                            color:'#fff',
                            fontSize:14
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"right",
                        formatter: "{b}:{c}户({d}%)",
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        center: ['50%', '55%'],
                        color:  ['#DD4F43','#FFCE43','#1FA463'],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: "{b}:{c}户",
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
                    myChart.setOption(option, true);
                }
            }
        })
    }
    /*全市各区县产业扶贫实施情况*/
    industryPoverty2();
    function industryPoverty2(){
        let dom2 = document.getElementById("module-2");
        let myChart2 = echarts.init(dom2);
        let dom10 = document.getElementById("module-10");
        let myChart10 = echarts.init(dom10);
        let dom11 = document.getElementById("module-11");
        let myChart11 = echarts.init(dom11);
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url:url+"/danger/reloc/query",
            method:"post",
            dataType:"json",
            data:{},
            success:function (result) {
                // console.log(result)
                //console.log(result.data[4][1])
                let data=result.data[4];
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let arr=['未启动','未入住','已入住'];
                /*遍历保存市的区县名称和区县编号*/
                for (let i in data[0]) {
                    let temp = {"name": data[0][i]['AAR009'], "number": data[0][i]['AAA011']};
                    i++;
                    datas6.push(temp);
                }
                datass=datas6;
                console.log(datass)
                let dataObj=data[0]
                for(let i=0;i<dataObj.length;i++){
                    datas2.push(dataObj[i]['no']);
                    datas3.push(dataObj[i]['ongoing']);
                    datas4.push(dataObj[i]['reach']);
                    datas5.push(dataObj[i]['AAR008']);
                    datas.push(dataObj[i]['AAR009']);
                }
                console.log(dataObj)
                option = {
                    color:  ['#DD4F43','#FFCE43','#1FA463'],
//                  title: {
//                      text: '全市各区县危房改造实施情况',
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
                            name: '未启动',
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
                            name: '未入住',
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
                                    barBorderRadius:[0, 0, 0, 0]
                                }
                            }
                        },
                        {
                            name: '已入住',
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
        })
        /*点击区县*/
        myChart2.on("click", function (params) {
            if (params.componentType == "xAxis") {
                $("#countyName").text(params.value);
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $(".pop-up5").css({"opacity": "1", "top": "50%"});
                let dom10 = document.getElementById("module-10");
                let myChart10 = echarts.init(dom10);
                /*点击柱状图找对应的区县编号传给后台*/
                var paramsNum;
                for (let j = 0; j < datass.length; j++) {
                    if (params.value == datass[j].name) {
                        paramsNum = datass[j].number;
                    }
                }
                console.log(paramsNum)
                $.ajax({
                    url: url + "/danger/town/query",
                    method: "get",
                    dataType: "json",
                    data: {"cityNo": paramsNum},
                    success: function (result) {
                        // console.log(result)
                        let data = result.data;
                        let datas = [];
                        let datas2 = [];
                        let datas3 = [];
                        let datas4 = [];
                        let datas7 = [];
                        let arr = ['未启动', '未入住', '已入住']
                        for (let i = 0; i < data.length; i++) {
                            datas.push(data[i]['AAR009']);
                        }
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data) {
                            let temp2 = {"name": data[i]['AAR009'], "number": data[i]['AAA011']};
                            i++;
                            datas7.push(temp2);
                        }
                        datass2 = datas7;
                        for (let i = 0; i < data.length; i++) {
                            datas2.push(data[i]['no']);
                            datas3.push(data[i]['ongoing']);
                            datas4.push(data[i]['reach']);
                        }
                        option = {
                            color: ['#DD4F43', '#FFCE43', '#1FA463'],
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
                                    rotate: -30,
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
                                    name: '未启动',
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
                                            barBorderRadius: [0, 0, 0, 0]
                                        }
                                    }
                                },
                                {
                                    name: '未入住',
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
                                    name: '已入住',
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
                let dom11 = document.getElementById("module-11");
                let myChart11 = echarts.init(dom11);
                /*点击柱状图找对应的镇编号传给后台*/
                var paramsNum2;
                for (let j = 0; j < datass2.length; j++) {
                    if (params.value == datass2[j].name) {
                        paramsNum2 = datass2[j].number;
                    }
                }
                $.ajax({
                    url: url + "/danger/village/query",
                    method: "get",
                    dataType: "json",
                    data: {"cityNo": paramsNum2},
                    success: function (result) {
                        let data = result.data;
                        let datas = [];
                        let datas2 = [];
                        let datas3 = [];
                        let datas4 = [];
                        let datas8 = [];
                        let arr = ['未启动', '未入住', '已入住']
                        for (let i = 0; i < data.length; i++) {
                            datas.push(data[i]['AAR009']);
                        }
                        /*遍历存镇下所有的村名称和村编号*/
                        for (let i in data) {
                            let temp3 = {"name": data[i]['AAR009'], "number": data[i]['AAA011']};
                            i++;
                            datas8.push(temp3);
                        }
                        datass3 = datas8;
                        for (let i = 0; i < data.length; i++) {
                            datas2.push(data[i]['no']);
                            datas3.push(data[i]['ongoing']);
                            datas4.push(data[i]['reach']);
                        }
                        option = {
                            color: ['#DD4F43', '#FFCE43', '#1FA463'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['未启动', '未入住', '已入住'],
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
                                    name: '未启动',
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
                                    name: '未入住',
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
                                    name: '已入住',
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
                    url: url + "/danger/poor/query",
                    method: "get",
                    dataType: "json",
                    data: {"cityNo": paramsNum3},
                    success: function (result) {
                        let data = result.data;
                        showList(nameList, data);
                        for (let i = 0; i < $(".status").length; i++) {
                            if ($(".status").eq(i).text() == "未启动") {
                                $(".status").eq(i).text("未启动").css("color", "#DD4F43");
                            } else if ($(".status").eq(i).text() == "未入住") {
                                $(".status").eq(i).text("未入住").css("color", "#FFCE43");
                            } else if ($(".status").eq(i).text() == "已入住") {
                                $(".status").eq(i).text("已入住").css("color", "#1FA463");
                            }
                        }
                    }
                })

                function showList(obj, data) {
                    obj.empty();
                    let str = '';
                    for (let i = 0; i < data.no.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
							<div>${data.no[i]}</div>
							<div class="status" style="color:#DD4F43">未启动</div>
                        </li>
                     `;
                    }
                    for (let i = 0; i < data.ongoing.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
							<div>${data.ongoing[i]}</div>
							<div class="status" style="color:#FFCE43">未入住</div>
                        </li>
                     `;
                    }
                    for (let i = 0; i < data.reach.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
							<div>${data.reach[i]}</div>
							<div class="status" style="color:#1FA463">已入住</div>
                        </li>
                     `;
                    }
                    obj.html(function (i, value) {
                        return value + str;
                    })
                }
            }
        })
    }

    /*************************************C级危房修缮*******************************************/
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    var dom8 = document.getElementById("module-8");
    var myChart8= echarts.init(dom8);
    var dom16 = document.getElementById("module-16");
    var myChart16= echarts.init(dom16);
    var dom17 = document.getElementById("module-17");
    var myChart17= echarts.init(dom17);
    industryPoverty3();
    function industryPoverty3(){
       //alert("dsada");
        var pieRadius=['45%', '22%'];
        var yHeight='38%';
        let datass;
        let datass2;
        var paramsNum;
        $.ajax({
            url:url+"/danger/reloc/query",
            method:"post",
            dataType:"json",
            data:{"cityNo":610100000000,'placement':1},
            success:function (result) {
                // console.log(result)
                let data=result.data[1];
                var pieRadius=['45%', '62%'];
                var yHeight='38%';
                var datas = [
                    {
                        value: data[0].jzno,
                        name: '未启动'
                    },
                    {
                        value: data[0].jzongoing,
                        name: '未入住'
                    },
                    {
                        value: data[0].jzreach,
                        name: '已入住'
                    }
                ];
                let count=data[0].jzno + data[0].jzongoing + data[0].jzreach;
                option = {
                    title: {
                        text: '总数: '+count+'户',
                        x: 'center',
                        bottom: '4%',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#fff',
                            fontSize: graph_x
                        }
                    },
                    grid: {
                        top: "15%",
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
                        containLabel: true
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position: "right",
                        formatter: "{b}:{c}户({d}%)"
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        center:["50%","50%"],
                        color: ['#DD4F43','#FFCE43','#1FA463'],
                        label: {
                            normal: {
                                position: 'center',
                                formatter: "{b}:{c}户",
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 15,
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: datas
                    }]
                };
               if (option && typeof option === "object") {
                    myChart3.setOption(option, true);
                }
            }
        })
    }
    myChart3.on("click", eConsole3);
    function eConsole3(param) {
        if (1) {
            var m1 = [];
            var m2 = [];
            var m11 = [];
            var m21 = [];
            var m111 = [];
            var m211 = [];
            //集中安置 县区
            $.ajax({
                url: url + '/danger/concent/query',
                method: "post",
                dataType: "json",
                data: {'cityNo': 610100000000, 'placement': '1'},
                success: function (result) {
                    if (result.code == 2000) {
                        for (let i = 0; i < result.data.length; i++) {
                            m1[i] = result.data[i].AAA011;
                            m2[i] = result.data[i].AAR009;
                        }
                        show21(myChart8, result);
                    }
                }
            })
            $(".container>.box").css({"opacity": "1", "top": "0"});
            $(".pop-up3").css({"opacity": "1", "top": "50%"});
            /*点击县到镇*/
            myChart8.on("click", function (params) {
                var kk;
                //alert(params.value)
                for (let i = 0; i < m1.length; i++) {
                    if (params.value == m2[i]) {
                        kk = i;
                    }
                }
                //   console.log(params)
                $.ajax({
                    url: url + '/danger/concent/query',
                    method: "post",
                    dataType: "json",
                    data: {'cityNo': m1[kk], 'placement': '1'},
                    success: function (result) {
                        if (result.code == 2000) {
                            for (let i = 0; i < result.data.length; i++) {
                                m11[i] = result.data[i].AAA011;
                                m21[i] = result.data[i].AAR009;
                            }
                            show21(myChart16, result);
                        }
                    }
                })
                if (params.componentType == "xAxis") {
                    $("#countyName5").text(params.value);
                    $(".container>.box").css({"opacity": "1", "top": "0"});
                    $(".pop-up3").css({"opacity": 0, "top": "-100%"});
                    $(".pop-up14").css({"opacity": "1", "top": "50%"});
                } else {
                }
            })
            /*点击镇到村*/
            myChart16.on("click", function (params) {
                // console.log(params)
                var kk;
                //alert(params.value)
                for (let i = 0; i < m11.length; i++) {
                    if (params.value == m21[i]) {
                        kk = i;
                    }
                }
                console.log(kk)
                $.ajax({
                    url: url + '/danger/concent/query',
                    method: "post",
                    dataType: "json",
                    data: {'cityNo': m11[kk], 'placement': '1'},
                    success: function (result) {
                        if (result.code == 2000) {
                            for (let i = 0; i < result.data.length; i++) {
                                m111[i] = result.data[i].AAA011;
                                m211[i] = result.data[i].AAR009;
                            }
                            show21(myChart17, result);
                        }
                    }
                })
                if (params.componentType == "xAxis") {
                    $("#countyName6").text(params.value);
                    $(".pop-up14").css({"opacity": 0, "top": "-100%"});
                    $(".pop-up15").css({"opacity": "1", "top": "50%"});
                    // alert("单击了"+params.value+"x轴标签");
                } else {
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击村到户*/
            myChart17.on("click", function (params) {
                // console.log(params)
                var kk;
                //alert(params.value)
                for (let i = 0; i < m111.length; i++) {
                    if (params.value == m211[i]) {
                        kk = i;
                    }
                }
                var hongbin = $("#hongbin");
                $.ajax({
                    url: url + '/danger/concent/query',
                    method: "post",
                    dataType: "json",
                    data: {'cityNo': m111[kk], 'placement': '1'},
                    success: function (result) {
                        if (result.code == 2000) {
                            showList(hongbin, result);
                        }
                        for (let i = 0; i < $(".status").length; i++) {
                            if ($(".status").eq(i).text() == "未启动") {
                                $(".status").eq(i).text("未启动").css("color", "#DD4F43");
                            } else if ($(".status").eq(i).text() == "未入住") {
                                $(".status").eq(i).text("未入住").css("color", "#FFCE43");
                            } else if ($(".status").eq(i).text() == "已入住") {
                                $(".status").eq(i).text("已入住").css("color", "#1FA463");
                            }
                        }
                    }
                })
                if (params.componentType == "xAxis") {
                    $("#houseName3").text(params.value);
                    $(".pop-up15").css({"opacity": 0, "top": "-100%"});
                    $(".pop-up16").css({"opacity": "1", "top": "50%"});
                    // alert("单击了"+params.value+"x轴标签");
                } else {
                    // alert("单击了"+params.name+"柱状图");
                }
            })
        }

        /****************************集中安置正在实施的县（20）、镇（21）、村（22）*********************************/
        function show20(obj, data, name) {
            obj.innerHTML = "";
            var n2 = [];
            var n3 = [];
            var n4 = [];
            var n5 = [];

            for (let i = 0; i < data.data.length; i++) {
                n2[i] = data.data[i].AAR009;
                n3[i] = data.data[i].reach;
                n4[i] = data.data[i].no;
                n5[i] = data.data[i].ongoing;
            }
            option = {
                color: ['#DD4F43', '#FFCE43', '#1FA463'],
//          title: {
//              text: name+'易地搬迁实施情况',
//              left: 15,
//              top:10,
//              textStyle: {
//                  fontWeight: '800',
//                  color: '#ffffff',
//                  fontSize: 16
//              }
//          },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['未启动', '未入住', '已入住'],
                    x: 'right',
                    y: "4%",
                    textStyle: {    //图例文字的样式
                        color: '#fff'
                    }
                },
                grid: {
                    top: "23%",
                    left: '2%',
                    right: '5%',
                    bottom: '5%',
                    containLabel: true
                },
                yAxis: {
                    type: 'value',
                    name: '单位：户',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                xAxis: {
                    type: 'category',
                    data: n2,
                    axisLabel: {
                        triggerEvent: true,
                        interval: 0,
                        rotate: -30,
                        textStyle: {
                            fontSize: graph_x
                        },
                    },
                    triggerEvent: true,
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                    {
                        name: '未启动',
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
                        name: '未入住',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 10,
                        data: n5,
                        itemStyle: {
                            //柱形图圆角，鼠标移上去效果
                            emphasis: {
                                barBorderRadius: [5, 5, 5, 5]
                            },
                            normal: {
                                //柱形图圆角，初始化效果
                                barBorderRadius: [5, 5, 5, 5]
                            }
                        }
                    },
                    {
                        name: '已入住',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 10,

                        data: n3,
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

        function show21(obj, data) {
            console.log(obj)
            obj.innerHTML = "";
            var n2 = [];
            var n3 = [];
            var n4 = [];
            var n5 = [];
            let arr = ['未启动', '未入住', '已入住'];
            for (let i = 0; i < data.data.length; i++) {
                n2[i] = data.data[i].AAR009;
                n3[i] = data.data[i].reach;
                n4[i] = data.data[i].ongoing;
                n5[i] = data.data[i].no;
            }
            option = {
                color: ['#DD4F43', '#FFCE43', '#1FA463'],
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
                xAxis: [
                    {
                        triggerEvent: true,
                        type: 'category',
                        data: n2,
                        axisLabel: {
                            interval: 0,
                            rotate: -40,
                            textStyle: {
                                fontSize: 14
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
                series: [
                    {
                        name: '未启动',
                        type: 'bar',
                        barWidth: 15,//柱图宽度
                        stack: '总量',
                        data: n5,
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
                    {
                        name: '未入住',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 15,//柱图宽度
                        data: n4,
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
                    {
                        name: '已入住',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 15,//柱图宽度
                        data: n3,
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
                obj.setOption(option, true);
            }
        }


        function show22(obj, data) {
            obj.innerHTML = "";
            var n2 = [];
            var n3 = [];
            for (let i = 0; i < data.data.length; i++) {
                n2[i] = data.data[i].AAR009;
                n3[i] = data.data[i].reach;
            }
            option = {
                color: ['#FFCE43'],
                tooltip: {
                    trigger: 'axis'
                },

                xAxis: [
                    {
                        triggerEvent: true,
                        type: 'category',
                        data: n2,
                        axisLabel: {
                            interval: 0,
                            rotate: -30,
                            textStyle: {
                                fontSize: 10
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ],
                grid: {
                    top: "10%",
                    left: '8%',
                    right: '2%',
                    bottom: '15%',
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '单位：个',
                        axisLabel: {
                            formatter: '{value}'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        boundaryGap: false,
                        splitLine: {
                            show: false
                        },
                    },
                ],
                series: [
                    {
                        name: '受益户数',
                        type: 'bar',
                        barWidth: 15,//柱图宽度
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: n3,
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
                obj.setOption(option, true);
            }
        }
        function showList(obj, data) {
            console.log(data.data)
            obj.empty();
            let str="";
            for (let i = 0; i < data.data.no.length; i++) {
                str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data['no'][i]}</div>
							<div style="width:50%;" class="status">未启动</div>
                     </li>
                  `;
            }
            for (let i = 0; i < data.data.ongoing.length; i++) {
                str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data['ongoing'][i]}</div>
							<div style="width:50%;" class="status">未入住</div>
                     </li>
                  `;
            }
            for (let i = 0; i < data.data.reach.length; i++) {
                str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data['reach'][i]}</div>
							<div style="width:50%;" class="status">已入住</div>
                     </li>
                  `;
            }
            obj.html(function (i, value) {
                return value + str;
            })
        }
        function show22table(obj, data) {
            //obj.empty();
            var str = "";
            for (let i = 0; i < data.data.length; i + 3) {
                str += `
      <li>
            <div>${data.data[i]}</div>
            <div>${data.data[i + 1]}</div>
            <div>${data.data[i + 2]}</div>
        </li>
        `;
            }
            obj.html(str);
        }
    }
/****************************C级危房修缮正在实施的县（20）、镇（21）、村（22）*********************************/
function show20(obj,data,name){
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
            color:  ['#DD4F43','#FFCE43','#1FA463'],
            title: {
                text: name+'危房改造实施情况',
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
                name: '单位：户',
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
                }
            },
            series: [
                {
                    name: '未启动',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n4,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 0, 0]
                        }
                    }
                },
                {
                    name: '未入住',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n5,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 5, 5]
                        },
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 5, 5]
                        }
                    }
                },
                {
                    name: '已入住',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,

                    data: n2,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 5, 5]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 5, 5]
                        }
                    }
                },

            ]
        };
if (option && typeof option === "object") {
    obj.setOption(option, true);
}
}
function show22table(obj,data){
    //obj.empty();
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






  /***************************************************D级危房修缮***********************************************/
    var dom4 = document.getElementById("module-4");
    var myChart4 = echarts.init(dom4);
    var dom23 = document.getElementById("module-23");
    var myChart23 = echarts.init(dom23);
    var dom24 = document.getElementById("module-24");
    var myChart24 = echarts.init(dom24);
    var dom25 = document.getElementById("module-25");
    var myChart25 = echarts.init(dom25);
    industryPoverty4();
    function industryPoverty4(){
      //  alert("dasd")
        $.ajax({
            url:url+"/danger/reloc/query",
            method:"get",
            dataType:"json",
            data:{"cityNo":610100000000,"placement":0},
            success:function (result) {
                // console.log(result)
                let data=result.data[2];
                var pieRadius=['45%', '62%'];
                var yHeight='38%';
                var datas = [
                    {
                        value: data[0].fsno,
                        name: '未启动'
                    },
                    {
                        value: data[0].fsongoing,
                        name: '未入住'
                    },
                    {
                        value: data[0].fsreach,
                        name: '已入住'
                    }
                ];
                let count=data[0].fsno + data[0].fsongoing + data[0].fsreach;
                option = {
                    title: {
                        text: '总数: '+count+'户',
                        x: 'center',
                        bottom: '4%',
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#fff',
                            fontSize: graph_x
                        }
                    },
                    legend: {
                        data: ['未启动','未入住' ,'已入住'],
                        x: 'right',
                        y:"4%",
                        selectedMode:false,
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
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position: "left",
                        formatter: "{b}:{c}户({d}%)"
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        center:["50%","50%"],
                        color: ['#DD4F43','#FFCE43','#1FA463'],
                        label: {
                            normal: {
                                position: 'center',
                                formatter: "{b}:{c}户",
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 15,
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                show: false
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
    }
    myChart4.on("click", eConsole4);
    function eConsole4(param) {
        /********************分散安置未启动*****************************/
        if (1) {
            var g1 = [];
            var g2 = [];
            var g11 = [];
            var g21 = [];
            var g111 = [];
            var g211 = [];
            let arr = ['未启动', '未入住', '已入住'];
            //集中安置 县区
            $.ajax({
                url: url + '/danger/concent/query',
                method: "post",
                dataType: "json",
                data: {'cityNo': 610100000000, 'placement': '0'},
                success: function (result) {
                    if (result.code == 2000) {
                        console.log(result.data )
                        let data=result.data;
                        console.log(data.length)
                        for (let i = 0; i < data.length; i++) {
                            g1[i] = data[i].AAA011;
                            g2[i] = data[i].AAR009;
                        }
                        show30(myChart23, result);
                    }
                }
            })
            $(".container>.box").css({"opacity": "1", "top": "0"});
            $(".pop-up24").css({"opacity": "1", "top": "50%"});
            /*点击县到镇*/
            myChart23.on("click", function (params) {
                var gg;
                //alert(params.value)
                for (let i = 0; i < g1.length; i++) {
                    if (params.value == g2[i]) {
                        gg = i;
                    }
                }
                console.log(g1,g2)
                //   console.log(params)
                $.ajax({
                    url: url + '/danger/concent/query',
                    method: "post",
                    dataType: "json",
                    data: {'cityNo': g1[gg], 'placement': '0'},
                    success: function (result) {
                        if (result.code == 2000) {
                            let data=result.data;
                            console.log(data)
                            for (let i = 0; i < data.length; i++) {
                                g11[i] = data[i].AAA011;
                                g21[i] = data[i].AAR009;
                            }
                            show30(myChart24, result);
                        }
                    }
                })
                if (params.componentType == "xAxis") {
                    $("#countyName11").text(params.value);
                    $(".container>.box").css({"opacity": "1", "top": "0"});
                    $(".pop-up24").css({"opacity": 0, "top": "-100%"});
                    $(".pop-up25").css({"opacity": "1", "top": "50%"});
                } else {
                }
            })
            /*点击镇到村*/
            myChart24.on("click", function (params) {

                var gg;
                //alert(params.value)
                for (let i = 0; i < g21.length; i++) {
                    if (params.value == g21[i]) {
                        gg = i;
                    }
                }
                $.ajax({
                    url: url + '/danger/concent/query',
                    method: "post",
                    dataType: "json",
                    data: {'cityNo': g11[gg], 'placement': '0'},
                    success: function (result) {
                        if (result.code == 2000) {
                            for (let i = 0; i < result.data.length; i++) {
                                g111[i] = result.data[i].AAA011;
                                g211[i] = result.data[i].AAR009;
                            }
                            show30(myChart25, result);
                        }
                    }
                })
                if (params.componentType == "xAxis") {
                    $("#villageName6").text(params.value);
                    $(".pop-up25").css({"opacity": 0, "top": "-100%"});
                    $(".pop-up26").css({"opacity": "1", "top": "50%"});
                    // alert("单击了"+params.value+"x轴标签");
                } else {
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击村到户*/
            myChart25.on("click", function (params) {

                var gg;
                //alert(params.value)
                for (let i = 0; i < g211.length; i++) {
                    if (params.value == g211[i]) {
                        gg = i;
                    }
                }
                var hongda = $("#hongda");
                $.ajax({
                    url: url + '/danger/concent/query',
                    method: "post",
                    dataType: "json",
                    data: {'cityNo': g111[gg], 'placement': '0'},
                    success: function (result) {
                        if (result.code == 2000) {
                            showList(hongda, result);
                        }
                        for (let i = 0; i < $(".status").length; i++) {
                            if ($(".status").eq(i).text() == "未启动") {
                                $(".status").eq(i).text("未启动").css("color", "#DD4F43");
                            } else if ($(".status").eq(i).text() == "未入住") {
                                $(".status").eq(i).text("未入住").css("color", "#FFCE43");
                            } else if ($(".status").eq(i).text() == "已入住") {
                                $(".status").eq(i).text("已入住").css("color", "#1FA463");
                            }
                        }
                    }
                })
                console.log(params)
                if (params.componentType == "xAxis") {
                    $("#countyName14").text(params.value);
                    $(".pop-up26").css({"opacity": 0, "top": "-100%"});
                    $(".pop-up27").css({"opacity": "1", "top": "50%"});
                    // alert("单击了"+params.value+"x轴标签");
                } else {
                    // alert("单击了"+params.name+"柱状图");
                }
            })

            /****************************分散安置正在实施的县（29）、镇（30）、村（31）的渲染*********************************/
            function show30(obj, data, name) {
                //  alert("dasd");
                obj.innerHTML = "";
                var n2 = [];
                var n3 = [];
                var n4 = [];
                var n5 = [];
                let datas=data.data;
                for (let i = 0; i < datas.length; i++) {
                    n2[i] = datas[i]['AAR009'];
                    n3[i] = datas[i]['reach'];
                    n4[i] = datas[i]['ongoing'];
                    n5[i] = datas[i]['no'];
                }
                console.log(n2)
                option = {
                    color: ['#DD4F43', '#FFCE43', '#1FA463'],
//          title: {
//              text: name+'易地搬迁实施情况',
//              left: 15,
//              top:10,
//              textStyle: {
//                  fontWeight: '800',
//                  color: '#ffffff',
//                  fontSize: 16
//              }
//          },
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
                        data: n2,
                        axisLabel: {
                            triggerEvent: true,
                            interval: 0,
                            rotate: -30,
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
                            name: '未启动',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data: n5,
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
                            name: '未入住',
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
                            name: '已入住',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data: n3,
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
            function showList(obj, data) {
                console.log(data.data)
                obj.empty();
                let str="";
                for (let i = 0; i < data.data.no.length; i++) {
                    str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data['no'][i]}</div>
							<div style="width:50%;" class="status">未启动</div>
                     </li>
                  `;
                }
                for (let i = 0; i < data.data.ongoing.length; i++) {
                    str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data['ongoing'][i]}</div>
							<div style="width:50%;" class="status">未入住</div>
                     </li>
                  `;
                }
                for (let i = 0; i < data.data.reach.length; i++) {
                    str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data['reach'][i]}</div>
							<div style="width:50%;" class="status">已入住</div>
                     </li>
                  `;
                }
                obj.html(function (i, value) {
                    return value + str;
                })
            }
            function show30table(obj, data) {
                alert("dasd")
                obj.empty();
                var str = "";
                for (let i = 0; i < data.data.length; i + 3) {
                    str += `
          <li>
                <div>${data.data[i]}</div>
                <div>${data.data[i + 1]}</div>
                <div>${data.data[i + 2]}</div>
            </li>
            `;
                }
                obj.html(str);
            }

        }
    }
/****************************D级危房修缮正在实施的县（29）、镇（30）、村（31）的渲染*********************************/
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
            color:  ['#DD4F43','#FFCE43','#1FA463'],
            title: {
                text: name+'危房改造实施情况',
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
                name: '单位：户',
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
                    name: '未启动',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n4,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 0, 0]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 0, 0]
                        }
                    }
                },
                {
                    name: '未入住',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n5,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 5, 5]
                        },
                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 5, 5]
                        }
                    }
                },
                {
                    name: '已入住',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,

                    data: n2,
                    itemStyle: {
                        //柱形图圆角，鼠标移上去效果
                        emphasis: {
                            barBorderRadius: [5, 5, 5, 5]
                        },

                        normal: {
                            //柱形图圆角，初始化效果
                            barBorderRadius:[5, 5, 5, 5]
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



    /*************************受益户数和受益人数占比及比重*****************************************/
    industryPoverty5();
    function industryPoverty5(){
        var pieRadius=['45%', '62%'];
        var yHeight='38%';
        var dom5 = document.getElementById("module-5");
        var myChart5 = echarts.init(dom5);
        $.ajax({
            url:url+"/danger/reloc/query",
            method:"get",
            dataType:"json",
            data:{},
            success:function (result) {
                let data=result.data[3];
                option = {
                        color: ['#4ddead', '#3c7eb5'],
//                      title: {
//                          text: '受益户数和受益人数占比及比重',
//                          left:10,
//                          top:-5,
//                          textStyle: {
//                              color: '#fff',
//                              fontSize: 16,
//                          },
//                      },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                            x:'right',
                            top:"5%",
                            data:['受益户数','受益人数'],
                            textStyle:{    //图例文字的样式
                                color:'#fff'
                            }
                        },
                        xAxis: [
                            {
                                triggerEvent:'true',
                                type: 'category',
                                data: ['C级危房修缮','D级危房修缮'],
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
                                top: "20%",
                                left: '5%',
                                right: '5%',
                                bottom: '20%',
                                containLabel: true
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '受益户数',
                                    minInterval:1,
                                    nameTextStyle:{
                                        fontSize:14
                                    },
                                    axisLabel: {
                                        formatter: '{value} ',
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
                                    name: '受益人数',
                                    minInterval:1,
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
                                data:[data[0].jzhouse,data[0].fshouse]
                            },
                            {
                                name:'受益人数',
                                type:'bar',
                                barWidth : 15,//柱图宽度
                                yAxisIndex: 1,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                data:[data[0].jznumber,data[0].fsnumber]
                            }
                        ]
            };
            if (option && typeof option === "object") {
                myChart5.setOption(option, true);
            }
            }
        })
        var type;
        var k1 = [];
        var k2 = [];
        myChart5.on("click", function (params) {
            //console.log(params)
            if (params.value == "C级危房修缮") {
                type = 1;
            } else {
                type = 0;
            }
            //  alert(type)
            $.ajax({
                url: url + '/danger/benefit/query',
                method: "get",
                dataType: "json",
                data: {'cityNo': 610100000000, 'placement': type},
                success: function (result) {
                    if (result.code == 2000) {
                        for (let i = 0; i < result.data.length; i++) {
                            k1[i] = result.data[i].AAA011;
                            k2[i] = result.data[i].AAR009;
                        }
                        showConcent(myChart32, result);
                    }
                }
            })
            if (params.componentType == "xAxis") {
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $("#placeName").text(params.value);
                $(".pop-up36").css({"opacity": "1", "top": "50%"});
                // alert("单击了"+params.value+"x轴标签");
            } else {
                // alert("单击了"+params.name+"柱状图");
            }
        })



        function showConcent(obj, data) {
            obj.innerHTML = "";
            var n2 = [];
            var n3 = [];
            var n4 = [];
            for (let i = 0; i < data.data.length; i++) {
                n2[i] = data.data[i].AAR009;
                n3[i] = data.data[i].house;
                n4[i] = data.data[i].number;
            }
            console.log(n3,n4)
            option = {
                color: ['#4ddead', '#3c7eb5'],

                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'right',
                    top: "4%",
                    data: ['受益户数', '受益人数'],
                    textStyle: {    //图例文字的样式
                        color: '#fff'
                    }
                },
                xAxis: [
                    {
                        triggerEvent: 'true',
                        type: 'category',
                        data: n2,
                        axisPointer: {
                            type: 'shadow'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            rotate: -40,
                            fontSize: graph_x
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
                        name: '受益户数',
                        minInterval:1,
                        axisLabel: {
                            formatter: '{value}',
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
                            }
                        },
                        boundaryGap: false,
                        splitLine: {
                            show: false
                        },
                    },
                    {
                        type: 'value',
                        name: '受益人数',
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
                        splitLine: {
                            show: false
                        },
                    },

                ],
                series: [
                    {
                        name: '受益户数',
                        type: 'bar',
                        barWidth: 15,//柱图宽度
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: n3
                    },
                    {
                        name: '受益人数',
                        type: 'bar',
                        barWidth: 15,//柱图宽度
                        yAxisIndex: 1,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: n4
                    }
                ]
            };
            if (option && typeof option === "object") {
                obj.setOption(option, true);
            }
        }
    }
/*****************显示县区 镇 村 受益户数 人数********************/
     var dog32 = document.getElementById("module-32"); // 县
     var myChart32 = echarts.init(dog32);
     var dog33 = document.getElementById("module-33");//镇
     var myChart33 = echarts.init(dog33);
     var dog34 = document.getElementById("module-34"); // 村
     var myChart34 = echarts.init(dog34);
     var dog5 = document.getElementById("module-5"); // 村
     var myChart5 = echarts.init(dog5);

})