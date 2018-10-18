$(document).ready(function(){
    var url = config.url;
    var year=config.year;
    /*全市兜底保障实施情况统计*/
    let dom = document.getElementById("module-1");
    let myChart = echarts.init(dom);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/help/doudi/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":610100000000},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['未达标','已达标'];
                let count="";
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
    /*全市各区县兜底保障实施情况*/
    let dom2 = document.getElementById("module-2");
    let myChart2 = echarts.init(dom2);
    industryPoverty2();
    function industryPoverty2(){
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url:url+"/help/doudi/countlist",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":610100000000},
            success:function (result) {
                // console.log(result)
                let data=result.data;
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
                    datas2.push(data[i]['NUM_NO']);
                    datas3.push(data[i]['NUM_OK']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                    color: ['#DD4F43','#1FA463'],
//                  title: {
//                      text: '全市各区县兜底保障实施情况',
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
                        right: '10%',
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
        myChart2.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#countyName").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up5").css({"opacity":"1","top":"50%"});
                let dom10= document.getElementById("module-10");
                let myChart10 = echarts.init(dom10);
                /*点击柱状图找对应的区县编号传给后台*/
                var paramsNum;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsNum=datass[j].number;
                    }
                }
                $.ajax({
                    url:url+"/help/doudi/countlist",
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
                        let arr=['未达标','已达标']
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
                            datas2.push(data[i]['NUM_NO']);
                            datas3.push(data[i]['NUM_OK']);
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
                                    rotate:-40,
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
            }
        })
        /*点击镇（街）*/
              let dom11= document.getElementById("module-11");
              let myChart11 = echarts.init(dom11);
              myChart10.on("click",function(params){
              if(params.componentType == "xAxis"){
                $("#villageName").text(params.value);
                $(".pop-up5").css({"opacity":0,"top":"-100%"});
                $(".pop-up6").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的镇编号传给后台*/
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
                        let arr=['未达标','已达标']
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
    /*全市五保户分类统计*/
    let dom3 = document.getElementById("module-3");
    let myChart3 = echarts.init(dom3);
    industryPoverty3();
    function industryPoverty3(){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        $.ajax({
            url:url+"/help/doudi/wb",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":610100000000},
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
                let temp3 = {"number":2,"name":"分散"}
                datas5.push(temp2);
                datas5.push(temp3);
                datass2=datas5;
                // console.log(datass2)
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
                        top: "27%",
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
        /*产业名称*/
        myChart3.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#project").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up").css({"opacity":"1","top":"50%"});
                let dom6= document.getElementById("module-6");
                let myChart6 = echarts.init(dom6);
                /*点击柱状图找对应的产业编号传给后台*/
                console.log(datass2)
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass2[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                // console.log(paramsNum);
                $.ajax({
                    url:url+"/help/doudi/wblist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":610100000000},
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
                            datas3.push(data[i]['HOUSE_NUM']);
                            datas4.push(data[i]['MAN_NUM']);
                        }
                        option = {
                            color: ['#4ddead', '#3c7eb5'],
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
                            myChart6.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
        /*点击区县*/
        myChart6.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#countyName2").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up").css({"opacity":0,"top":"-100%"});
                $(".pop-up8").css({"opacity":"1","top":"50%"});
                let dom12= document.getElementById("module-12");
                let myChart12 = echarts.init(dom12);
                /*点击柱状图找对应的区县编号传给后台*/
                let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);
                $.ajax({
                    url:url+"/help/doudi/wblist",
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
                        console.log(datass)
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['AAR009']);
                            datas3.push(data[i]['HOUSE_NUM']);
                            datas4.push(data[i]['MAN_NUM']);
                        }
                        option = {
                            color: ['#4ddead', '#3c7eb5'],
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
                                    barWidth : 7,//柱图宽度
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
                                    barWidth : 7,//柱图宽度
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
                /*let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }*/
                console.log(datass);
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
                    url:url+"/help/doudi/wblist",
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
                        console.log(datass);
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['AAR009']);
                            datas3.push(data[i]['HOUSE_NUM']);
                            datas4.push(data[i]['MAN_NUM']);
                        }
                        option = {
                            color: ['#4ddead', '#3c7eb5'],
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
                                    data: datas2,
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
                                    barWidth : 10,//柱图宽度
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'top'
                                        }
                                    },
                                    data:datas3
                                },
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 10,//柱图宽度
                                    yAxisIndex: 1,
                                    label: {
                                        normal: {
                                            show: false,
                                            position: 'top'
                                        }
                                    },
                                    data:datas4
                                }
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
       /* myChart13.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#villageName2").text(params.value);
                $("#project4").text($("#project3").text());
                $(".pop-up9").css({"opacity":0,"top":"-100%"});
                $(".pop-up10").css({"opacity":"1","top":"50%"});
                // console.log(datass3)
                /!*点击柱状图找对应的村编号传给后台*!/
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
                    url:url+"/help/doudi/wb/people",
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
        })*/

    }
    /*全市低保户分类统计*/
    let dom4 = document.getElementById("module-4");
    let myChart4 = echarts.init(dom4);
    industryPoverty4();
    function industryPoverty4(){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        $.ajax({
            url:url+"/help/doudi/db",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":610100000000},
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
//                      text: '低保户分类统计',
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
                        top: "27%",
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
        /*产业名称*/
        myChart4.on("click",function(params){
            // console.log(params)
            let dom7 = document.getElementById("module-7");
            let myChart7 = echarts.init(dom7);
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#method").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up2").css({"opacity":"1","top":"50%"});
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
                    url:url+"/help/doudi/dblist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":610100000000},
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
                            datas2.push(data[i]['HOUSE_NUM']);
                            datas3.push(data[i]['MAN_NUM']);
                            // datas4.push(data[i]['IMPLEMENTED']);
                        }
                        option = {
                            color: ['#4ddead', '#3c7eb5'],
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
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 15,//柱图宽度
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
                            myChart7.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
        /*点击区县*/
        myChart7.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#method2").text($("#method").text());
                $("#countyName3").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up2").css({"opacity":0,"top":"-100%"});
                $(".pop-up11").css({"opacity":"1","top":"50%"});
                let dom14= document.getElementById("module-14");
                let myChart14 = echarts.init(dom14);
                /*点击柱状图找对应的产业编号传给后台*/
                /*let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }*/
                console.log(paramsNum);
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
                    url:url+"/help/doudi/dblist",
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
                                    barWidth : 8,//柱图宽度
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
                                    barWidth : 8,//柱图宽度
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
        /*点击镇（街）*/
        myChart14.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                $("#method3").text($("#method").text());
                $("#street2").text(params.value);
                $(".pop-up11").css({"opacity":0,"top":"-100%"});
                $(".pop-up12").css({"opacity":"1","top":"50%"});
                let dom15= document.getElementById("module-15");
                let myChart15 = echarts.init(dom15);
                /*点击柱状图找对应的产业编号传给后台*/
                /*let paramsNum;
                // console.log(datass2.length)
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }*/
                console.log(datass);
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
                    url:url+"/help/doudi/dblist",
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
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['NUM']);
                            datas3.push(data[i]['AAR009']);
                            datas4.push(data[i]['HOUSE_NUM']);
                            datas5.push(data[i]['MAN_NUM']);
                        }
                        option = {
                            color: ['#4ddead', '#3c7eb5'],
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
                                        rotate:-55,
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
                                    barWidth : 8,//柱图宽度
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
                                    barWidth : 8,//柱图宽度
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
                            myChart15.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
        /*点击村*/
        /*myChart15.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#villageName3").text(params.value);
                $("#project5").text($("#method").text());
                $(".pop-up12").css({"opacity":0,"top":"-100%"});
                $(".pop-up13").css({"opacity":"1","top":"50%"});
                // console.log(datass3)
                /!*点击柱状图找对应的村编号传给后台*!/
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
                let nameList2=$("#nameLists")
                $.ajax({
                    url:url+"/help/doudi/db/people",
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
        })*/

    }
    /*全市残疾人分类统计*/
    industryPoverty5();
    function industryPoverty5(){
        let dom5 = document.getElementById("module-5");
        let myChart5 = echarts.init(dom5);
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        let paramsName;
        $.ajax({
            url:url+"/help/doudi/dis",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":610100000000},
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
                    datas.push(data[i]['typename']);
                    datas2.push(data[i]['NUM']);
                    datas3.push(data[i]['HOME_NUM']);
                    datas4.push(data[i]['MAN_NUM']);
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
                let temp2 = {"number":2,"name":"残疾人护理"};
                let temp3 = {"number":1,"name":"残疾人补偿"};
                datas5.push(temp2);
                datas5.push(temp3);
                datass2=datas5;
                option = {
                    color: ['#4ddead', '#3c7eb5'],
//                  title: {
//                      text: '残疾人分类统计',
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
                        top: "27%",
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
        /*产业名称*/
        myChart5.on("click",function(params){
            let dom8 = document.getElementById("module-8");
            let myChart8 = echarts.init(dom8);
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#method4").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up3").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的产业编号传给后台*/
                for(let j=0;j<datass2.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass2[j].name){
                        // console.log(datass[j].number)
                        paramsNum=datass2[j].number;
                    }
                }
                // console.log(paramsNum);
                $.ajax({
                    url:url+"/help/doudi/dislist",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":610100000000},
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
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 15,//柱图宽度
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
                            myChart8.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
        myChart8.on("click",function(params){
            // console.log(params)
            let dom16 = document.getElementById("module-16");
            let myChart16 = echarts.init(dom16);
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#countyName5").text(params.value);
                $("#method5").text($("#method4").text())
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up3").css({"opacity":0,"top":"-100%"});
                $(".pop-up14").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的产业编号传给后台*/
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
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
                    url:url+"/help/doudi/dislist",
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
                                        rotate:-45,
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
                                    barWidth : 10,//柱图宽度
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
                                    barWidth : 10,//柱图宽度
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
        let dom17 = document.getElementById("module-17");
        let myChart17 = echarts.init(dom17);
        myChart16.on("click",function(params){
            // console.log(params)

            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#method6").text($("#method4").text());
                $("#countyName6").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up14").css({"opacity":0,"top":"-100%"});
                $(".pop-up15").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的产业编号传给后台*/
                for(let j=0;j<datass.length;j++){
                    // console.log(params.value+'-----'+datass[j].name);
                    if(params.value==datass[j].name){
                        // console.log(datass[j].number)
                        paramsName=datass[j].number;
                    }
                }
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
                    url:url+"/help/doudi/dislist",
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
                        let datas5=[];
                        let datas7=[];
                        let datass=[];
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
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 15,//柱图宽度
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
                            myChart17.setOption(option, true);
                        }
                    }
                })
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
        })
       /* myChart17.on("click",function(params){
            // console.log(params)
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#houseName3").text(params.value);
                $("#method7").text($("#method4").text());
                $(".pop-up15").css({"opacity":0,"top":"-100%"});
                $(".pop-up16").css({"opacity":"1","top":"50%"});
                // console.log(datass3)
                /!*点击柱状图找对应的村编号传给后台*!/
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
                let nameList2=$("#nameLists2")
                $.ajax({
                    url:url+"/help/doudi/dis/people",
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
        })*/

    }





















})