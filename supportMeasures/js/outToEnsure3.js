$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    let countyName=countryName;
    $("#countyName").text(countyName);  //地图上面的标题
    let villagName=villageName;
    let villagCode=villageCode;
    $(".fpVill").html(villagName);
    $("#villageName6").text(villagName);
    /*各区县兜底保障实施情况统计*/
    industryPoverty(villagCode);
    function industryPoverty(number){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        let statisticalName=villagName+"兜底保障情况实施统计";
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
                        center: ['50%', '55%'],
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
   /* let dom10 = document.getElementById("module-10");
    let myChart10 = echarts.init(dom10);
    industryPoverty2(villagCode);
    function industryPoverty2(data){
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        let implementationName = villagName + "兜底保障实施情况";
        $.ajax({
            url:url+"/help/doudi/countlist",
            method:"post",
            dataType:"json",
            data:{"year":201712,"disctId":data},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let arr=['五保户','低保户','残疾人'];
                /!*遍历保存市的区县名称和区县编号*!/
                for (let i in data)
                {
                    let temp = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas6.push(temp);
                }
                datass=datas6;
                for(let i=0;i<data.length;i++){
                    datas2.push(data[i]['wuBao']);
                    datas3.push(data[i]['diBao']);
                    datas4.push(data[i]['disabled']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                    color:  ['#40D4B5','#BA56D3','#3668A6'],
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
                        }
                    },
                    series: [
                        {
                            name: '五保户',
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
                            name: '低保户',
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
                            name: '残疾人',
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
        /!*点击区县*!/
        /!*myChart2.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#countyName").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up5").css({"opacity":"1","top":"50%"});
                let dom10= document.getElementById("module-10");
                let myChart10 = echarts.init(dom10);
                /!*点击柱状图找对应的区县编号传给后台*!/
                var paramsNum;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsNum=datass[j].number;
                    }
                }
                $.ajax({
                    url:"http://192.168.1.195:9999/poverty-web-1.0-SNAPSHOT/projway/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":201712,"disctId":paramsNum},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        let arr=['未实施','正实施','已实施']
                        for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }
                        /!*遍历存区县下所有的镇名称和镇编号*!/
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
                            datas4.push(data[i]['IMPLEMENTED']);
                        }
                        option = {
                            color:  ['#DD4F43','#FFCE43','#1FA463'],
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
                                left: '2%',
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
                                        fontSize:10
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
                                    name: '未实施',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas2,
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
                                    name: '正实施',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas3,
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
                                    name: '已实施',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,

                                    data: datas4,
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
                            myChart10.setOption(option, true);
                        }
                    }
                })
            }
        })
        /!*点击镇（街）*!/
        myChart10.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#villageName").text(params.value);
                $(".pop-up5").css({"opacity":0,"top":"-100%"});
                $(".pop-up6").css({"opacity":"1","top":"50%"});
                let dom11= document.getElementById("module-11");
                let myChart11 = echarts.init(dom11);
                /!*点击柱状图找对应的镇编号传给后台*!/
                var paramsNum2;
                for(let j=0;j<datass2.length;j++){
                    if(params.value==datass2[j].name){
                        paramsNum2=datass2[j].number;
                    }
                }
                $.ajax({
                    url:"http://192.168.1.195:9999/poverty-web-1.0-SNAPSHOT/projway/countlist",
                    method:"post",
                    dataType:"json",
                    data:{"year":201712,"disctId":paramsNum2},
                    success:function (result) {
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas8=[];
                        let arr=['未实施','正实施','已实施']
                        for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }
                        /!*遍历存镇下所有的村名称和村编号*!/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas8.push(temp3);
                        }
                        datass3=datas8;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NOT_IMPLEMENTED']);
                            datas3.push(data[i]['IS_IMPLEMENTED']);
                            datas4.push(data[i]['IMPLEMENTED']);
                        }
                        option = {
                            color:  ['#DD4F43','#FFCE43','#1FA463'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data: ['未实施','正实施','已实施'],
                                x: 'right',
                                y:"4%",
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },
                            grid: {
                                top: "15%",
                                left: '2%',
                                right: '5%',
                                bottom: '10%',
                                containLabel: true
                            },
                            yAxis:  {
                                type: 'value',
                                name: '单位：户',
                                axisLine:{
                                    lineStyle:{
                                        color:'#fff'
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
                                        fontSize:10
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
                                    name: '未实施',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas2,
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
                                    name: '正实施',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas3,
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
                                    name: '已实施',
                                    type: 'bar',
                                    stack: '总量',
                                    barWidth: 10,
                                    data: datas4,
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
                            myChart11.setOption(option, true);
                        }
                    }
                })
            }
        })
        /!*点击村*!/
        myChart11.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#houseName").text(params.value);
                $(".pop-up6").css({"opacity":0,"top":"-100%"});
                $(".pop-up7").css({"opacity":"1","top":"50%"});
                /!*点击柱状图找对应的村编号传给后台*!/
                var paramsNum3;
                for(let j=0;j<datass3.length;j++){
                    if(params.value==datass3[j].name){
                        paramsNum3=datass3[j].number;
                    }
                }
                let nameList=$("#nameList");
                $.ajax({
                    url:"http://192.168.1.195:9999/poverty-web-1.0-SNAPSHOT/projway/namelist",
                    method:"post",
                    dataType:"json",
                    data:{"year":201712,"disctId":paramsNum3},
                    success:function (result) {
                        let data = result.data;
                        showList(nameList,data);
                        console.log(data.length);
                        console.log($(".status").length);
                        for(let i=0;i<$(".status").length;i++){
                            if($(".status").eq(i).text()==0){
                                $(".status").eq(i).text("未实施").css("color","#DD4F43");
                            }else if($(".status").eq(i).text()==1){
                                $(".status").eq(i).text("正实施").css("color","#FFCE43");
                            }else if($(".status").eq(i).text()==2){
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
        })*!/
    }*/
    /*各区县五保户分类统计*/
    industryPoverty3(villagCode);
    function industryPoverty3(data){
        let dom3 = document.getElementById("module-3");
        let myChart3 = echarts.init(dom3);
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        let projectName = villagName + "五保户分类统计";
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
                        top: "20%",
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
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
                    myChart3.setOption(option, true);
                }
            }
        })
        myChart3.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#villageName2").text(params.value);
                $("#project4").text($("#project3").text());
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up10").css({"opacity":"1","top":"50%"});
                // console.log(datass3)
                /*点击柱状图找对应的村编号传给后台*/
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
                // console.log(paramsNum3);
                let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                let nameList2=$("#nameList2")
                $.ajax({
                    url:url+"/help/doudi/wb/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":villagCode},
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
							<div style="width:100%;">${data[i]['AAC029']}</div>
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
    /*各区县低保户分类统计*/
    industryPoverty4(villagCode);
    function industryPoverty4(data){
        let dom4 = document.getElementById("module-4");
        let myChart4 = echarts.init(dom4);
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        let projectName2 = villagName + "低保户分类统计";
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
                let temp3 = {"number":2,"name":"低保B类"};
                let temp4 = {"number":3,"name":"低保C类"};
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
                        top: "22%",
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
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
                    myChart4.setOption(option, true);
                }
            }
        })
        myChart4.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#villageName3").text(params.value);
                $("#project4").text($("#project3").text());
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up13").css({"opacity":"1","top":"50%"});
                let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                let nameList2=$("#nameLists")
                $.ajax({
                    url:url+"/help/doudi/db/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":villagCode},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums4").text(data.length)
                        showList2(nameList2,data);
                    }
                })
                function showList2(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:100%;">${data[i]['AAC029']}</div>
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
    /*各区县残疾人分类统计*/
    let dom5 = document.getElementById("module-5");
    let myChart5 = echarts.init(dom5);
    industryPoverty5(villagCode);
    function industryPoverty5(data){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        let projectName3 = villagName + "残疾人分类统计";
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
                                fontSize:graph_x
                            }
                        }
                    ],
                    grid: {
                        top: "22%",
                        left: '5%',
                        right: '5%',
                        bottom: '15%',
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
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#houseName3").text(params.value);
                $("#method7").text($("#project3").text());
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up16").css({"opacity":"1","top":"50%"});
                // console.log(datass3)
                /*点击柱状图找对应的村编号传给后台*/
                let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                let nameList2=$("#nameLists2")
                $.ajax({
                    url:url+"/help/doudi/dis/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":villagCode},
                    success:function (result) {
                        let data = result.data;
                        $("#peopleNums5").text(data.length)
                        showList2(nameList2,data);
                    }
                })
                function showList2(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:100%;">${data[i]['AAC029']}</div>
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


})