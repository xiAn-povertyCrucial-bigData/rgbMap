$(document).ready(function() {
    var url = config.url;
    var year=config.year;
    /*市生态扶贫达标情况统计*/
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();

    function industryPoverty() {
        let pieRadius = ['0', '50%'];
        let yHeight = '28%';
        $.ajax({
            url: url + "/ecology/aLayer",
            method: "get",
            dataType: "json",
            data: {},
            success: function (result) {
                let data = result.data;
                let datas = [];
                let i = 0;
                let arr = ['未达标','不享受' ,'已达标'];
                let datatable = [data.noReach-data.noEcology,data.noEcology, data.isReach];
                for (var key in data) {
                    let temp = {"value": datatable[i], "name": arr[i]};
                    i++;
                    datas.push(temp);
                }
                var dataC = datas;
                let count=data.noReach+data.isReach;
                option = {
                    color: ['#DD4F43','#41b97e', '#1FA463'],
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
                        y: "4%",
                        data: ['未达标', '不享受' ,'已达标'],
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    series: [{
                        name: '达标状态',
                        type: 'pie',
                        radius: pieRadius,
                        center: ["50%", "50%"],
                        label: {
                            normal: {
                                formatter: '{b}:{c}户',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: graph_x
                                },
                            }
                        },
                        data: dataC
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
    let dom10 = document.getElementById("module-10");
    let myChart10 = echarts.init(dom10);
    let dom11 = document.getElementById("module-11");
    let myChart11 = echarts.init(dom11);
    industryPoverty2();
    function industryPoverty2() {
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url: url + "/ecology/sLayer",
            method: "get",
            dataType: "json",
            data: {},
            success: function (result) {
                // console.log(result)
                //console.log(result.data[4][1])
                data = result.data;
                let datas = [];  //x轴坐标值
                let datas2 = [];  //数据1
                let datas3 = [];  //数据2
                let datas4 = [];  //数据3
                let datas5 = [];  //数据4
                var datas6 = [];  //数据5
                let arr = ['未达标','不享受', '已达标'];
                let dom4 = document.getElementById("module-4");
                let myChart4 = echarts.init(dom4);
                /*遍历保存市的区县名称和区县编号*/
                for (let i in data) {
                    let temp = {"name": data[i]['AAR009'], "number": data[i]['AAR008']};
                    i++;
                    datas6.push(temp);
                }
                datass = datas6;
                for (let i = 0; i < data.length; i++) {
                    datas2.push(data[i]['noReach']-data[i]['noEcology']);
                    datas3.push(data[i]['noEcology']);
                    datas4.push(data[i]['isReach']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                    color: ['#DD4F43', '#41b97e', '#1FA463'],
                    // title: {
                    //     text: '全市各区县生态扶贫达标情况',
                    //     left: 15,
                    //     top:10,
                    //     textStyle: {
                    //         fontWeight: '800',
                    //         color: '#ffffff',
                    //         fontSize: 16
                    //     }
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		                }
                    },
                    legend: {
                        data: ['未达标','不享受', '已达标'],
                        x: 'right',
                        y: "4%",
                        textStyle: {    //图例文字的样式
                            color: '#fff'
                        }
                    },
                    grid: {
                        top: "15%",
                        left: '5%',
                        right: '12%',
                        bottom: '15%',
                        containLabel: true
                    },
                    yAxis: {
                        name: '单位：户',
                        minInterval:1,
                        nameTextStyle:{
                            fontSize:14
                        },
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#fff'
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
                            name: '未达标',
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
                            name: '不享受',
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
                            name: '已达标',
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
                    url: url + "/ecology/sLayer",
                    method: "get",
                    dataType: "json",
                    data: {"cntyNo": paramsNum},
                    success: function (result) {
                        // console.log(result)
                        let data = result.data;
                        let datas = [];
                        let datas2 = [];
                        let datas3 = [];
                        let datas4 = [];
                        let datas5 = [];
                        let datas6 = [];
                        let datas7 = [];
                        for (let i = 0; i < data.length; i++) {
                            datas.push(data[i]['name']);
                        }
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data) {
                            let temp2 = {"name": data[i]['AAR009'], "number": data[i]['AAR008']};
                            i++;
                            datas7.push(temp2);
                        }
                        datass2 = datas7;
                        for (let i = 0; i < data.length; i++) {
                            datas2.push(data[i]['noReach']-data[i]['noEcology']);
                            datas3.push(data[i]['noEcology']);
                            datas4.push(data[i]['isReach']);
                            datas5.push(data[i]['AAR008']);//乡镇编号
                            datas6.push(data[i]['AAR009']);//乡镇名称
                        }
                        option = {
                            color: ['#DD4F43', '#41b97e', '#1FA463'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['未达标','不享受', '已达标'],
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
                                minInterval:1,
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff'
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
                                triggerEvent: true,
                                type: 'category',
                                data: datas6,
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
                                    name: '未达标',
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
                                    name: '不享受',
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
                                    name: '已达标',
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
                    url: url + "/ecology/sLayer",
                    method: "get",
                    dataType: "json",
                    data: {"townNo": paramsNum2},
                    success: function (result) {
                        let data = result.data;
                        let datas = [];
                        let datas2 = [];
                        let datas3 = [];
                        let datas4 = [];
                        let datas8 = [];
                        let datas5 = [];
                        let datas6 = [];
                        let arr = ['未达标','不享受', '已达标']
                        for (let i = 0; i < data.length; i++) {
                            datas.push(data[i]['name']);
                        }
                        /*遍历存镇下所有的村名称和村编号*/
                        for (let i in data) {
                            let temp3 = {"name": data[i]['AAR009'], "number": data[i]['AAR008']};
                            i++;
                            datas8.push(temp3);
                        }
                        datass3 = datas8;
                        for (let i = 0; i < data.length; i++) {
                            datas2.push(data[i]['noReach']-data[i]['noEcology']);
                            datas3.push(data[i]['noEcology']);
                            datas4.push(data[i]['isReach']);
                            datas5.push(data[i]['AAR008']);//乡镇编号
                            datas6.push(data[i]['AAR009']);//乡镇名称
                        }
                        option = {
                            color: ['#DD4F43', '#41b97e', '#1FA463'],
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['未达标','不享受', '已达标'],
                                x: 'right',
                                y: "5%",
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
                                minInterval:1,
                                axisLine: {
                                    lineStyle: {
                                        color: '#fff'
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
                                triggerEvent: true,
                                type: 'category',
                                data: datas6,
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
                                    name: '未达标',
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
                                    name: '不享受',
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
                                    name: '已达标',
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
                    url: url + "/ecology/reachName",
                    method: "get",
                    dataType: "json",
                    data: {"villNo": paramsNum3},
                    success: function (result) {
                        let data = result.data;
                        showList(nameList, data);
                    }
                })

                function showList(obj, data) {
                    obj.empty();
                    let str = '';
                    for (let i = 0; i < data.isName.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
							<div>${data.isName[i]}</div>
							<div class="status" style="color:#1FA463">已达标</div>
                        </li>
                     `;
                    }
                    for (let i = 0; i < data.noEcology.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
                            <div>${data.noEcology[i]}</div>
                            <div class="status" style="color:#41b97e">不享受</div>
                        </li>
                     `;
                    }
                    for (let i = 0; i < data.noName.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
							<div>${data.noName[i]}</div>
							<div class="status" style="color:#DD4F43">未达标</div>
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

    /*************************************右上 在校生分阶段情况*******************************************/
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    var dom4 = document.getElementById("module-4");
    var myChart4 = echarts.init(dom4);
    industryPoverty3();
    function industryPoverty3(){
        let datass;
        let datass2;
        // let school = [];
        // var paramsNum;
        $.ajax({
            url:url+"/ecology/aSubItes",
            method:"get",
            dataType:"json",
            data:{},
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
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        x:'right',
                        top:'4%',
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
                        top: "20%",
                        left: '5%',
                        right: '5%',
                        bottom: '10%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            minInterval:1,
                            name: '户数',
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
                            minInterval:1,
                            name: '人数',
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
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#project").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up").css({"opacity":"1","top":"50%"});
                let dom6= document.getElementById("module-6");
                let myChart6 = echarts.init(dom6);
                $.ajax({
                    url:url+"/ecology/sSubItes",
                    method:"post",
                    dataType:"json",
                    data:{},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        console.log(data)
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas5=[];
                        let datas7=[];
                        if(params.value=="退耕还林"){
                            for(let i=0;i<data.length;i++){
                                datas.push(data[i]['AAR009']);
                                datas2.push(data[i]['REFOREST']);
                                datas4.push(data[i]['REFORESTNUM']);
                            }
                        }else if(params.value=="生态林补偿"){
                            for(let i=0;i<data.length;i++){
                                datas.push(data[i]['AAR009']);
                                datas2.push(data[i]['ECOFOREST']);
                                datas4.push(data[i]['ECOFORESTNUM']);
                            }
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
                            datas3.push(data[i]['IS_IMPLEMENTED']);
                            datas4.push(data[i]['IMPLEMENTED']);
                        }
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
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				                }
                            },
                            legend: {
                                x:'right',
                                top:'4%',
                                data:['户数','人数'],
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },
                            xAxis: [
                                {
                                    triggerEvent:true,
                                    type: 'category',
                                    data: datas,
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
                                    },
                                splitLine:{
					                show:true ,
					                lineStyle:{
					                    color:color,
					                    width:num,
					                    type:'dashed'
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
                                    minInterval:1,
                                    name: '户数',
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
                                    minInterval:1,
                                    name: '人数',
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
                                    data:datas2
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
                                    data:datas4
                                }
                            ]
                        };
                        if (option && typeof option === "object") {
                            myChart6.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
    }


  /***************************************************生态扶贫分阶段达标情况***********************************************/
  var dom4 = document.getElementById("module-4");
  var myChart4 = echarts.init(dom4);
    industryPoverty4();
    function industryPoverty4(){
        $.ajax({
            url:url+"/ecology/aRangerForsetNum",
            method:"get",
            dataType:"json",
            data:{},
            success:function (result) {
                // console.log(result)
                var pieRadius=['45%', '62%'];
                var yHeight='38%';

              option = {
                    color: ['#4ddead'],
                    tooltip: {
                        trigger: 'axis',

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
                        left: '8%',
                        right: '5%',
                        bottom: '25%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：人',
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
                                            barBorderRadius: [0, 0, 0, 0]
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
                if(params.value=="护林员安置"){
                    $(".container>.box").css({"opacity":"1","top":"0"});
                    $(".pop-up3").css({"opacity":"1","top":"50%"});
                    let dom8= document.getElementById("module-8");
                    let myChart8 = echarts.init(dom8);
                    $.ajax({
                        url:url+"/ecology/sRanger",
                        method:"post",
                        dataType:"json",
                        data:{},
                        success:function (result) {
                            let data=result.data;
                            console.log(data)
                            let datas=[];
                            let datas2=[];
                            let datas3=[];
                            let datas4=[];
                            let datas5=[];
                            let datas7=[];
                            for(let i=0;i<data.length;i++){
                                datas.push(data[i]['AAR009']);
                                datas2.push(data[i]['COUNTS']);
                            }
                            /*/!*遍历存区县下所有的镇名称和镇编号*!/
                            for (let i in data)
                            {
                                let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                                i++;
                                datas7.push(temp3);
                            }
                            datass=datas7;
                            for(let i=0;i<data.length;i++){
                                datas2.push(data[i]['NUM']);
                                datas3.push(data[i]['IS_IMPLEMENTED']);
                                datas4.push(data[i]['IMPLEMENTED']);
                            }*/
                            option = {
                                color: ['#4ddead'],
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
                                        name: '单位：人',
                                        minInterval:1,
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
                                    }
                                ]
                            };
                            if (option && typeof option === "object") {
                                myChart8.setOption(option, true);
                            }
                        }
                    })
                }else if(params.value=="生态补偿发放人数"){
                    $(".container>.box").css({"opacity":"1","top":"0"});
                    $(".pop-up3").css({"opacity":"1","top":"50%"});
                    let dom8= document.getElementById("module-8");
                    let myChart8 = echarts.init(dom8);
                    $.ajax({
                        url:url+"/ecology/sEcoNum",
                        method:"post",
                        dataType:"json",
                        data:{},
                        success:function (result) {
                            let data=result.data;
                            console.log(data)
                            let datas=[];
                            let datas2=[];
                            let datas3=[];
                            let datas4=[];
                            let datas5=[];
                            let datas7=[];
                            for(let i=0;i<data.length;i++){
                                datas.push(data[i]['AAR009']);
                                datas2.push(data[i]['COUNTS']);
                            }
                            /*/!*遍历存区县下所有的镇名称和镇编号*!/
                            for (let i in data)
                            {
                                let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                                i++;
                                datas7.push(temp3);
                            }
                            datass=datas7;
                            for(let i=0;i<data.length;i++){
                                datas2.push(data[i]['NUM']);
                                datas3.push(data[i]['IS_IMPLEMENTED']);
                                datas4.push(data[i]['IMPLEMENTED']);
                            }*/
                            option = {
                                color: ['#4ddead'],
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
                                        name: '单位：人',
                                        minInterval:1,
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
                                    }
                                ]
                            };
                            if (option && typeof option === "object") {
                                myChart8.setOption(option, true);
                            }
                        }
                    })
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
            data:{},
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
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
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
                    left: '15%',
                    right: '5%',
                    bottom: '25%',
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '单位：元',
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
                        boundaryGap: true,
                        splitLine:{
                            show:false
                        },
                    },
                ],
                series: [
                    {
                        name:'金额',
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
            if(params.componentType == "xAxis"){
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up3").css({"opacity":"1","top":"50%"});
                let dom8= document.getElementById("module-8");
                let myChart8 = echarts.init(dom8);
                $.ajax({
                    url:url+"/ecology/sEcoProfit",
                    method:"post",
                    dataType:"json",
                    data:{},
                    success:function (result) {
                        let data=result.data;
                        console.log(data)
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas5=[];
                        let datas7=[];
                        for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                            datas2.push(data[i]['PROFIT']);
                        }
                        /*/!*遍历存区县下所有的镇名称和镇编号*!/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NUM']);
                            datas3.push(data[i]['IS_IMPLEMENTED']);
                            datas4.push(data[i]['IMPLEMENTED']);
                        }*/
                        option = {
                            color: ['#4ddead'],
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
                                    name: '单位：元',
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
                                }
                            ]
                        };
                        if (option && typeof option === "object") {
                            myChart8.setOption(option, true);
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