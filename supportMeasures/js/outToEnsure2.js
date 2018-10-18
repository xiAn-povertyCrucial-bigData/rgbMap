$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    let countyName=countryName;
    $(".fpVill").html(countyName);
    $("#countyName").text(countyName);  //地图上面的标题
    $.ajax({
        url:url+"/init/disct/name",
        method:"post",
        dataType:"json",
        async: false,
        data:{"name":countyName},
        success:function (result) {
            let data=result.data;
            //console.log(data);
            industryPoverty(data);
            industryPoverty2(data);
            industryPoverty3(data);
            industryPoverty4(data);
            industryPoverty5(data);
        }
    })
    /*各区县兜底保障实施情况统计*/
     let dom = document.getElementById("module-1");
    let myChart = echarts.init(dom);
    function industryPoverty(number){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        let statisticalName=countyName+"兜底保障情况实施统计";
        $.ajax({
            url:url+"/help/doudi/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":number},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let count="";
                let arr=['未达标','已达标'];
                for (var key in data)
                {
                    let temp = {"value":data[key],"name":arr[i]};
                    i++;
                    datas.push(temp);
                    count=count*1+data[key]*1;
                }
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
                            fontSize:14
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
                        color:  ['#DD4F43','#1FA463'],
                        label: {
                            normal: {
                                position: 'right',
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
                    myChart.setOption(option, true);
                }
            }
        })
    }
    /*各区县兜底保障实施情况*/
    function industryPoverty2(data){
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        let dom10 = document.getElementById("module-10");
        let myChart10 = echarts.init(dom10);
        let implementationName = countyName + "兜底保障实施情况";
        $.ajax({
            url:url+"/help/doudi/countlist",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":data},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let datas7=[];
                let arr=['未达标','已达标'];
                /*遍历保存市的区县名称和区县编号*/
                for (let i in data)
                {
                    let temp = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas6.push(temp);
                }
                datass=datas6;
                /*遍历存区县下所有的镇名称和镇编号*/
                for (let i in data)
                {
                    let temp2 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas7.push(temp2);
                }
                datass2=datas7;
                for(let i=0;i<data.length;i++){
                    datas2.push(data[i]['NUM_NO']);
                    datas3.push(data[i]['NUM_OK']);
                    datas4.push(data[i]['disabled']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                    color: ['#DD4F43','#1FA463'],
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
        myChart10.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#villageName").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up5").css({"opacity":0,"top":"-100%"});
                $(".pop-up6").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的镇编号传给后台*/
                console.log(datass2)
                var paramsNum2;
                for(let j=0;j<datass2.length;j++){
                    if(params.value==datass2[j].name){
                        paramsNum2=datass2[j].number;
                    }
                }
                $.ajax({
                    url:url+"/help/doudi/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"disctId":paramsNum2},
                    success:function (result) {
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas8=[];
                        let arr=['未达标','已达标'];
                        for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }
                        /*遍历存镇下所有的村名称和村编号*/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas8.push(temp3);
                        }
                        datass3=datas8;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NUM_NO']);
                            datas3.push(data[i]['NUM_OK']);
                            datas4.push(data[i]['disabled']);
                        }
                        option = {
                            color: ['#DD4F43','#1FA463'],
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
                                data: datas,
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
                    url:url+"/help/doudi/people",
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
                                $(".status").eq(i).text("残疾人").css("color","#40D4B5");
                            }else if($(".status").eq(i).text()==1){
                                $(".status").eq(i).text("五保户").css("color","#BA56D3");
                            }else if($(".status").eq(i).text()==2){
                                $(".status").eq(i).text("低保户").css("color","#3668A6");
                            }
                            if($(".reach").eq(i).text()==0){
                                $(".reach").eq(i).text("未达标").css("color","#DD4F43");
                            }else if($(".reach").eq(i).text()==1){
                                $(".reach").eq(i).text("已达标").css("color","#1FA463");
                            }
                        }
                    }
                })
                function showList(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:33.333333%">${data[i]['AAC029']}</div>
							<div style="width:33.333333%" class="status">${data[i]['STATUS']}</div>
							<div style="width:33.333333%" class="reach">${data[i]['REACH']}</div>
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
    /*各区县五保户分类统计*/
    function industryPoverty3(data){
        let dom3 = document.getElementById("module-3");
        let myChart3 = echarts.init(dom3);
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        let projectName = countyName + "五保户分类统计";
        var paramsNum;
        $.ajax({
            url:url+"/help/doudi/wb",
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
                    datas3.push(data[i]['HOUSE_NUM']);
                    datas4.push(data[i]['MAN_NUM']);
                }
                /*遍历主导产业所有的名称和编号*/

                let temp2 = {"number":1,"name":"集中"};
                let temp3 = {"number":2,"name":"分散"};
                datas5.push(temp2);
                datas5.push(temp3);
                datass2=datas5;
                console.log(datass2)
                option = {
                    color: ['#4ddead', '#3c7eb5'],
                    //                  title: {
                    //                      text: projectName,
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
                        top:10,
                        data:['受益户数','受益人数'],
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: ["集中","分散"],
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
                        top: "28%",
                        left: '5%',
                        right: '5%',
                        bottom: '20%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '受益户数',
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
                            name: '受益人数',
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
                            data:datas3
                        },
                        {
                            name:'受益人数',
                            nameTextStyle:{
                                fontSize:14
                            },
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
                    myChart3.setOption(option, true);
                }
            }
        })
        myChart3.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#project2").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up").css({"opacity":0,"top":"-100%"});
                $(".pop-up8").css({"opacity":"1","top":"50%"});
                let dom12= document.getElementById("module-12");
                let myChart12 = echarts.init(dom12);
                /*点击柱状图找对应的产业编号传给后台*/
                let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                console.log(paramsNum);
               /* /!*点击柱状图找对应的区县编号传给后台*!/
                let paramsName;
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
                    url:url+"/help/doudi/wblist",
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
                            datas3.push(data[i]['HOUSE_NUM']);
                            datas4.push(data[i]['MAN_NUM']);
                        }
                        option = {
                            color: ['#4ddead', '#3c7eb5'],
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
                                    name: '受益人数',
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
                                    barWidth : 5,//柱图宽度
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    },
                                    data:datas3
                                },
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 5,//柱图宽度
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
                            myChart12.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
    }
    /*各区县低保户分类统计*/
    function industryPoverty4(data){
        let dom4 = document.getElementById("module-4");
        let myChart4 = echarts.init(dom4);
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        let projectName2 = countyName + "低保户分类统计";
        var paramsNum;
        $.ajax({
            url:url+"/help/doudi/db",
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
                    datas3.push(data[i]['HOUSE_NUM']);
                    datas4.push(data[i]['MAN_NUM']);
                }
                /*遍历主导产业所有的名称和编号*/

                let temp2 = {"number":1,"name":"低保A类"};
                let temp3 = {"number":1,"name":"低保B类"};
                let temp4 = {"number":1,"name":"低保C类"};
                datas5.push(temp2);
                datas5.push(temp3);
                datas5.push(temp4);
                datass2=datas5;
                console.log(datass2)
                option = {
                    color: ['#4ddead', '#3c7eb5'],
//                  title: {
//                      text: projectName2,
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
                        top:10,
                        data:['受益户数','受益人数'],
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: ["低保A类","低保B类","低保C类"],
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
                        top: "28%",
                        left: '5%',
                        right: '5%',
                        bottom: '20%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '受益户数',
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
                            name: '受益人数',
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
                            data:datas3
                        },
                        {
                            name:'受益人数',
                            nameTextStyle:{
                                fontSize:14
                            },
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
                    myChart4.setOption(option, true);
                }
            }
        })
        myChart4.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#method2").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up2").css({"opacity":0,"top":"-100%"});
                $(".pop-up11").css({"opacity":"1","top":"50%"});
                let dom14= document.getElementById("module-14");
                let myChart14 = echarts.init(dom14);
                /*点击柱状图找对应的产业编号传给后台*/
                let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                $.ajax({
                    url:url+"/help/doudi/dblist",
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
                        let datas5=[];
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
                            datas4.push(data[i]['HOUSE_NUM']);
                            datas5.push(data[i]['MAN_NUM']);
                        }
                        option = {
                            color: ['#4ddead', '#3c7eb5'],
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
                                    barWidth : 5,//柱图宽度
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    },
                                    data:datas4,
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
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 5,//柱图宽度
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    },
                                    data:datas5,
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
    /*各区县残疾人分类统计*/
    function industryPoverty5(data){
        let dom5 = document.getElementById("module-5");
        let myChart5 = echarts.init(dom5);
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        let projectName3 = countyName + "残疾人分类统计";
        var paramsNum;
        $.ajax({
            url:url+"/help/doudi/dis",
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
                    datas3.push(data[i]['HOME_NUM']);
                    datas4.push(data[i]['MAN_NUM']);
                }
                /*遍历主导产业所有的名称和编号*/
                let temp2 = {"number":2,"name":"残疾人护理"};
                let temp3 = {"number":1,"name":"残疾人补偿"};
                datas5.push(temp2);
                datas5.push(temp3);
                datass2=datas5;
                console.log(datass2)
                option = {
                    color: ['#4ddead', '#3c7eb5'],
//                  title: {
//                      text: projectName3,
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
                        top:10,
                        data:['受益户数','受益人数'],
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    xAxis: [
                        {
                            triggerEvent:true,
                            type: 'category',
                            data: ["残疾人护理","残疾人补偿"],
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
                                fontSize:14
                            }
                        }
                    ],
                    grid: {
                        top: "28%",
                        left: '5%',
                        right: '5%',
                        bottom: '20%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '受益户数',
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
                            name: '受益人数',
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
                            data:datas3
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
                            data:datas4
                        }
                    ]
                };
                if (option && typeof option === "object") {
                    myChart5.setOption(option, true);
                }
            }
        })
        myChart5.on("click",function(params){
            // console.log(params)
            let dom16 = document.getElementById("module-16");
            let myChart16 = echarts.init(dom16);
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#countyName5").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up3").css({"opacity":0,"top":"-100%"});
                $(".pop-up14").css({"opacity":"1","top":"50%"});
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                $.ajax({
                    url:url+"/help/doudi/dislist",
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
                        console.log(datass)
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['HOME_NUM']);
                            datas3.push(data[i]['MAN_NUM']);
                            // datas4.push(data[i]['IMPLEMENTED']);
                        }
                        console.log(datas2,datas3)
                        option = {
                            color: ['#4ddead','#3c7eb5'],
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
                                    name: '受益户数',
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
                                    name: '受益人数',
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
                                    barWidth : 5,//柱图宽度
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
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 5,//柱图宽度
                                    label: {
                                        normal: {
                                            show: true,
                                            position: 'top'
                                        }
                                    },
                                    data:datas3,
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
                            myChart16.setOption(option, true);
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