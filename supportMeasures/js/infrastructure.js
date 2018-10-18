$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*市产业扶贫完成情况统计*/
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '36%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/tblbase/base/count",
            method:"get",
            dataType:"json",
            data:{"year":year},
            success:function (result) {
                if(result.code==2000){
                        let datas=[];
                        let i=0;
                        let arr=['未完成','已完成'];
                        let datatable =[result.data.mapAll.NO_NUM,result.data.mapAll.OK_NUM];
                        for (var key in result)
                        {
                            let temp = {"value":datatable[i],"name":arr[i]};
                            i++;
                            datas.push(temp);
                        }
                        let count=result.data.mapAll.NO_NUM+result.data.mapAll.OK_NUM;
                        option = {
                            color:  ['#DD4F43','#1FA463'],
                            title: {
                                text: '总数: '+count+'村',
                                x: 'left',
                                y: '4%',
                                textStyle: {
                                    fontWeight: 'normal',
                                    color: '#fff',
                                    fontSize: graph_x
                                }
                            },
                            legend: {
                                x: 'right',
                                y:"4%",
                                selectedMode:false,
                                data: ['未完成','已完成'],
                                textStyle:{    //图例文字的样式
                                    color:'#fff',
                                    fontSize:14
                                }
                            },
                            tooltip: {
                                show: true,
                                trigger: 'item',
                                position:"right",
                                formatter: "{b}:{c}村({d}%)"
                            },
                            series: [{
                                name: '完成状态',
                                type: 'pie',
                                selectedMode: 'single',
                                radius: pieRadius,
                                center: ['50%', '50%'],
                                color:  ['#DD4F43','#1FA463'],
                                label: {
                                    normal: {
                                        position: 'outer',
                                        formatter: "{b}:{c}村",
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
            }
        })
    }
    /*全市各区县产业扶贫完成情况*/
    industryPoverty2();
    function industryPoverty2(){
        let dom2 = document.getElementById("module-2");
        let myChart2 = echarts.init(dom2);
        let dom10= document.getElementById("module-10");
        let myChart10 = echarts.init(dom10);
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url:url+"/tblbase/base/count",
            method:"get",
            dataType:"json",
            data:{"year":year},
            success:function (result) {
                // console.log(result)
                //console.log(result.data[4][1])
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let arr=['未完成','已完成'];
                for(let i=0;i<result.data.mapDist.length;i++){
                    datas2.push(result.data.mapDist[i]['disNO_NUM']);
                    datas3.push(result.data.mapDist[i]['disOK_NUM']);
                    datas4.push(result.data.mapDist[i]['district']);
                }
                option = {
                    color:  ['#DD4F43','#1FA463'],
                   /* title: {
                        text: '全市各区县基础设施完成情况',
                        left: 15,
                        top:10,
                        textStyle: {
                            fontWeight: '800',
                            color: '#ffffff',
                            fontSize: 16
                        }
                    },*/
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
                        name: '单位：村',
                        nameTextStyle:{
                            fontSize:14
                        },
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
                        data: datas4,
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
                            name: '未完成',
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
                            name: '已完成',
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
                /*点击柱状图找对应的区县编号传给后台*/
                /*var paramsNum;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsNum=datass[j].number;
                    }
                }*/
                $.ajax({
                    url:url+"/tblbase/base/count",
                    method:"get",
                    dataType:"json",
                    data:{"year":year,"districtName":params.value},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        let arr=['未完成','已完成']
                        for(let i=0;i<data.mapDist.length;i++){
                            datas.push(data.mapDist[i]['district']);
                        }
                        /*遍历存区县下所有的镇名称和镇编号*/
                       /* for (let i in data)
                        {
                            let temp2 = {"name":data[i]['AAR009'],"number":data[i]['AAA011']};
                            i++;
                            datas7.push(temp2);
                        }
                        datass2=datas7;*/
                        for(let i=0;i<data.mapDist.length;i++){
                            datas2.push(data.mapDist[i]['disNO_NUM']);
                            datas3.push(data.mapDist[i]['disOK_NUM']);
                            datas4.push(data.mapDist[i]['district']);
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
                                left: '2%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
                            },
                            yAxis:  {
                                type: 'value',
                                name: '单位：村',
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
                                        fontSize:14
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart10.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击镇（街）*/
        myChart10.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#houseName").text(params.value);
                $(".pop-up5").css({"opacity":0,"top":"-100%"});
                $(".pop-up7").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                /*var paramsNum3;
                for(let j=0;j<datass3.length;j++){
                    if(params.value==datass3[j].name){
                        paramsNum3=datass3[j].number;
                    }
                }*/
                let nameList=$("#nameList");
                $.ajax({
                    url:url+"/tblbase/base/countlist",
                    method:"get",
                    dataType:"json",
                    data:{"year":year,"townName":params.value},
                    success:function (result) {
                        let data = result.data;
                        showList(nameList,data);
                        for(let i=0;i<data.length;i++){
                            if($(".status").eq(i).text()==0){
                                $(".status").eq(i).text("未完成").css("color","#DD4F43");
                            }
                            if($(".status").eq(i).text()==1){
                                $(".status").eq(i).text("已完成").css("color","#1FA463");
                            }
                        }
                    }
                })
                function showList(obj,data){
                    console.log(data)
                    obj.empty();
                    let str='';
                    for(let i=0;i<data.length;i++){
                        str+=`
                        <li style="display: flex;justify-content: space-between;">
							<div>${data[i]['villageName']}</div>
							<div class="status" style="color:#DD4F43">${data[i]['isOK']}</div>
                        </li>
                     `;}
                    obj.html(function (i,value) {
                        return value+str;
                    })
                }
            }
        })
    }

    /*************************************水*******************************************/
    var dom3 = document.getElementById("module-3");
    var myChart3 = echarts.init(dom3);
    let dom7= document.getElementById("module-7");
    let myChart7 = echarts.init(dom7);
    let dom12= document.getElementById("module-12");
    let myChart12 = echarts.init(dom12);
    industryPoverty3();
    function industryPoverty3(){
       //alert("dsada");
        let datas = [];
        let datas1 = []; 
        let datas2 = [];  
        var paramsNum;
        $.ajax({
            url:url+"/tblbase/base/count",
            type:"post",
            dataType:"json",
            data:{"year":year},
            success:function (result) {
                let data=result.data.WaterDistict;
                console.log(data);
                for(let i = 0; i < data.length; i++ ){
                  datas[i] = data[i].district;
                  datas1[i] = data[i].waterNO_NUM;
                  datas2[i] = data[i].waterOK_NUM;
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
                        data: ['未完成','已完成'],
                        x: 'right',
                        y:"4%",
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    grid: {
                        top: "24%",
                        left: '20%',
                        right: '10%',
                        bottom: '42%'
                    },
                    yAxis:  {
                        type: 'value',
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
                            rotate:-50,
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
                            name: '未完成',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data: datas1,
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
                            name: '已完成',
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

                    ]
                };
                if (option && typeof option === "object") {
                    myChart3.setOption(option, true);
                }
            }
        })
        /*全市*/
        myChart3.on("click",function(params){
            if(1){
                $("#countyName2").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up8").css({"opacity":"1","top":"50%"});
                $.ajax({
                    url:url+"/tblbase/base/count",
                    method:"get",
                    dataType:"json",
                    data:{"year":year,"districtName":params.value},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        console.log(data)
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        /*for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }*/
                        /*/*遍历存区县下所有的镇名称和镇编号*!/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        console.log(datass)*/
                        for(let i=0;i<data.WaterDistict.length;i++){
                            datas2.push(data.WaterDistict[i]['waterNO_NUM']);
                            datas3.push(data.WaterDistict[i]['waterOK_NUM']);
                            datas4.push(data.WaterDistict[i]['district']);
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
                                    data: datas4,
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
                                top: "10%",
                                left: '8%',
                                right: '2%',
                                bottom: '15%',
                                containLabel: true
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '单位：村',
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart12.setOption(option, true);
                        }
                    }
                })
            }
        })
        myChart12.on("click", function (params) {
            var hongbin = $("#hongbin");
            $.ajax({
                url:url+"/tblbase/base/villagelist",
                method: "post",
                dataType: "json",
                data:{"year":year,"townName":params.value,"type":1},
                success: function (result) {
                    if (result.code == 2000) {
                        showList(hongbin, result);
                    }
                    for (let i = 0; i < $(".status").length; i++) {
                        if ($(".status").eq(i).text() == "0") {
                            $(".status").eq(i).text("未完成").css("color", "#DD4F43");
                        }  else if ($(".status").eq(i).text() == "1") {
                            $(".status").eq(i).text("已完成").css("color", "#1FA463");
                        }
                    }
                }
            })
            if (params.componentType == "xAxis") {
                $("#street").text(params.value);
                $(".pop-up8").css({"opacity": 0, "top": "-100%"});
                $(".pop-up9").css({"opacity": "1", "top": "50%"});
                // alert("单击了"+params.value+"x轴标签");
            } else {
                // alert("单击了"+params.name+"柱状图");
            }
            function showList(obj, data) {
                console.log(data.data)
                obj.empty();
                let str="";
                for (let i = 0; i < data.data.length; i++) {
                    str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data[i].villageName}</div>
							<div style="width:50%;" class="status">${data.data[i].isWater}</div>
                     </li>
                  `;
                }
                obj.html(function (i, value) {
                    return value + str;
                })
            }
        })
    }
    var dom4 = document.getElementById("module-4");
    var myChart4= echarts.init(dom4);
    industryPoverty4();
    function industryPoverty4(){
        let datas = [];
        let datas1 = []; 
        let datas2 = [];  
        var paramsNum;
        $.ajax({
            url:url+"/tblbase/base/count",
            method:"get",
            dataType:"json",
            data:{"year":year},
            success:function (result) {
                // console.log(result)
                let data=result.data.ElticDistict;
                for(let i = 0; i < data.length; i++ ){
                    datas[i] = data[i].district;
                    datas1[i] = data[i].elticNO_NUM;
                    datas2[i] = data[i].elticOK_NUM;
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
                        data: ['未完成','已完成'],
                        x: 'right',
                        y:"4%",
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    grid: {
                        top: "24%",
                        left: '20%',
                        right: '10%',
                        bottom: '42%'
                    },
                    yAxis:  {
                        type: 'value',
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
                            rotate:-50,
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
                            name: '未完成',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data: datas1,
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

                    ]
                };
                if (option && typeof option === "object") {
                    myChart4.setOption(option, true);
                }
            }
        })
        myChart4.on("click",function(params){
            if(1){
                $("#method").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up2").css({"opacity":"1","top":"50%"});
                $.ajax({
                    url:url+"/tblbase/base/count",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"districtName":params.value},
                    success:function (result) {
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        /*for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }*/
                        /*/*遍历存区县下所有的镇名称和镇编号*!/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        console.log(datass)*/
                        for(let i=0;i<data.ElticDistict.length;i++){
                            datas2.push(data.ElticDistict[i]['elticNO_NUM']);
                            datas3.push(data.ElticDistict[i]['elticOK_NUM']);
                            datas4.push(data.ElticDistict[i]['district']);
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
                                    data: datas4,
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
                                    name: '单位：村',
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart7.setOption(option, true);
                        }
                    }
                })
            }
        })
        myChart7.on("click", function (params) {
            var hongbin2 = $("#hongbin2");
            $.ajax({
                url:url+"/tblbase/base/villagelist",
                method: "post",
                dataType: "json",
                data:{"year":year,"townName":params.value,"type":2},
                success: function (result) {
                    if (result.code == 2000) {
                        showList(hongbin2, result);
                    }
                    for (let i = 0; i < $(".status").length; i++) {
                        if ($(".status").eq(i).text() == "0") {
                            $(".status").eq(i).text("未完成").css("color", "#DD4F43");
                        }  else if ($(".status").eq(i).text() == "1") {
                            $(".status").eq(i).text("已完成").css("color", "#1FA463");
                        }
                    }
                }
            })
            if (params.componentType == "xAxis") {
                $("#street").text(params.value);
                $(".pop-up2").css({"opacity": 0, "top": "-100%"});
                $(".pop-up11").css({"opacity": "1", "top": "50%"});
                // alert("单击了"+params.value+"x轴标签");
            } else {
                // alert("单击了"+params.name+"柱状图");
            }
            function showList(obj, data) {
                console.log(data.data)
                obj.empty();
                let str="";
                for (let i = 0; i < data.data.length; i++) {
                    str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data[i].villageName}</div>
							<div style="width:50%;" class="status">${data.data[i].isElitic}</div>
                     </li>
                  `;
                }
                obj.html(function (i, value) {
                    return value + str;
                })
            }
        })
    }

    var dog5 = document.getElementById("module-5"); // 村
    var myChart5 = echarts.init(dog5);
    industryPoverty5();
    function industryPoverty5(){
        let datas = [];
        let datas1 = []; 
        let datas2 = [];  
        var paramsNum;
        $.ajax({
            url:url+"/tblbase/base/count",
            method:"get",
            dataType:"json",
            data:{'year':year},
            success:function (result) {
                // console.log(result)
                let data=result.data.RoadDistict;
                for(let i = 0; i < data.length; i++ ){
                    datas[i] = data[i].district;
                    datas1[i] = data[i].roadNO_NUM;
                    datas2[i] = data[i].roadOK_NUM;
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
                        data: ['未完成','已完成'],
                        x: 'right',
                        y:"4%",
                        textStyle:{    //图例文字的样式
                            color:'#fff'
                        }
                    },
                    grid: {
                        top: "24%",
                        left: '20%',
                        right: '10%',
                        bottom: '42%'
                    },
                    yAxis:  {
                        type: 'value',
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
                            rotate:-50,
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
                            name: '未完成',
                            type: 'bar',
                            stack: '总量',
                            barWidth: 10,
                            data: datas1,
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

                    ]
                };
                if (option && typeof option === "object") {
                    myChart5.setOption(option, true);
                }
            }
        })
        myChart5.on("click",function(params){
            if(1){
                $("#countyName5").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up14").css({"opacity":"1","top":"50%"});
                let dom16= document.getElementById("module-16");
                let myChart16 = echarts.init(dom16);
                $.ajax({
                    url:url+"/tblbase/base/count",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"districtName":params.value},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        console.log(data)
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas7=[];
                        /*for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }*/
                        /*/*遍历存区县下所有的镇名称和镇编号*!/
                        for (let i in data)
                        {
                            let temp3 = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                            i++;
                            datas7.push(temp3);
                        }
                        datass=datas7;
                        console.log(datass)*/
                        for(let i=0;i<data.RoadDistict.length;i++){
                            datas2.push(data.RoadDistict[i]['roadNO_NUM']);
                            datas3.push(data.RoadDistict[i]['roadOK_NUM']);
                            datas4.push(data.RoadDistict[i]['district']);
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
                                    data: datas4,
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
                                top: "10%",
                                left: '8%',
                                right: '2%',
                                bottom: '15%',
                                containLabel: true
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '单位：村',
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
                                    name: '未完成',
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
                                    name: '已完成',
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
                            myChart16.setOption(option, true);
                        }
                    }
                })
            }
        })
        myChart16.on("click", function (params) {
            var hongbin3 = $("#hongbin3");
            $.ajax({
                url:url+"/tblbase/base/villagelist",
                method: "post",
                dataType: "json",
                data:{"year":year,"townName":params.value,"type":3},
                success: function (result) {
                    if (result.code == 2000) {
                        showList(hongbin3, result);
                    }
                    for (let i = 0; i < $(".status").length; i++) {
                        if ($(".status").eq(i).text() == "0") {
                            $(".status").eq(i).text("未完成").css("color", "#DD4F43");
                        }  else if ($(".status").eq(i).text() == "1") {
                            $(".status").eq(i).text("已完成").css("color", "#1FA463");
                        }
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
            function showList(obj, data) {
                console.log(data.data)
                obj.empty();
                let str="";
                for (let i = 0; i < data.data.length; i++) {
                    str += `
                     <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.data[i].villageName}</div>
							<div style="width:50%;" class="status">${data.data[i].isRoad}</div>
                     </li>
                  `;
                }
                obj.html(function (i, value) {
                    return value + str;
                })
            }
        })
    }

    var dom20 = document.getElementById("module-20");
    var myChart20 = echarts.init(dom20);
    var dom21 = document.getElementById("module-21");
    var myChart21 = echarts.init(dom21);
    var dom22 = document.getElementById("module-22");
    var myChart22 = echarts.init(dom22);
    industryPoverty6();
    function industryPoverty6(){
        let datas = [];
        let datas1 = [];
        let datas2 = [];
        var paramsNum;
        $.ajax({
                url:url+"/tblbase/base/count",
                method:"get",
                dataType:"json",
                data:{'year':year},
                success:function (result) {
                    let aa=result.data.WaterDistict;
                    let aano=aaok=0;
                    for(let i=0;i<aa.length;i++){
                        aano+=1*(aa[i].waterNO_NUM);
                        aaok+=1*(aa[i].waterOK_NUM)
                    }
                    var pieRadius=['35%', '50%'];
                    var yHeight='30%';
                    var data = [
                        {
                            value: aano,
                            name: '未完成'
                        },
                        {
                            value: aaok,
                            name: '已完成'
                        },
                    ];
                    option = {
                        /*title: {
                            text: '水利设施实施情况',
                            left: 15,
                            top:10,
                            textStyle: {
                                fontWeight: '800',
                                color: '#ffffff',
                                fontSize: 16
                            }
                        },*/
                        grid: {
                            top: "30%",
                            left: '8%',
                            right: '2%',
                            bottom: '15%'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            position:"right",
                            formatter: "{b}:{c}村({d}%)"
                        },
                        series: [{
                            type: 'pie',
                            selectedMode: 'single',
                            radius: pieRadius,
                            color: ['#DD4F43','#1FA463'],
                            label: {
                                normal: {
                                    position: 'center',
                                    formatter: "{b}:{c}村",
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14
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
                        myChart20.setOption(option, true);
                    }

                }
             })
       }
    industryPoverty7();
    function industryPoverty7(){
          //  alert("dasd")
            let datas = [];
            let datas1 = [];
            let datas2 = [];
            var paramsNum;
            $.ajax({
                url:url+"/tblbase/base/count",
                method:"get",
                dataType:"json",
                data:{'year':year},
                success:function (result) {
                    let aa=result.data.ElticDistict;
                    let aano=aaok=0;
                    for(let i=0;i<aa.length;i++){
                        aano+=1*(aa[i].elticNO_NUM);
                        aaok+=1*(aa[i].elticOK_NUM)
                    }
                    var pieRadius=['35%', '50%'];
                    var yHeight='30%';
                    var data = [
                        {
                            value: aano,
                            name: '未完成'
                        },
                        {
                            value: aaok,
                            name: '已完成'
                        },
                    ];
                    option = {
                       /* title: {
                            text: '电力设施实施情况',
                            left: 15,
                            top:10,
                            textStyle: {
                                fontWeight: '800',
                                color: '#ffffff',
                                fontSize: 16
                            }
                        },*/
                        grid: {
                            top: "30%",
                            left: '8%',
                            right: '2%',
                            bottom: '15%'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            position:"right",
                            formatter: "{b}:{c}村({d}%)"
                        },
                        series: [{
                            type: 'pie',
                            selectedMode: 'single',
                            radius: pieRadius,
                            color: ['#DD4F43','#1FA463'],
                            label: {
                                normal: {
                                    position: 'center',
                                    formatter: "{b}:{c}村",
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14
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
                        myChart21.setOption(option, true);
                    }

                }
             })
       }
    industryPoverty8();
    function industryPoverty8(){
          //  alert("dasd")
              let datas = [];
            let datas1 = [];
            let datas2 = [];
            var paramsNum;
            $.ajax({
                url:url+"/tblbase/base/count",
                method:"get",
                dataType:"json",
                data:{'year':year},
                success:function (result) {
                    let aa=result.data.RoadDistict;
                    let aano=aaok=0;
                    for(let i=0;i<aa.length;i++){
                        aano+=1*(aa[i].roadNO_NUM);
                        aaok+=1*(aa[i].roadOK_NUM)
                    }
                    var pieRadius=['35%', '50%'];
                    var yHeight='30%';
                    var data = [
                        {
                            value: aano,
                            name: '未完成'
                        },
                        {
                            value: aaok,
                            name: '已完成'
                        },
                    ];
                    option = {
                        /*title: {
                            text: '道路设施实施情况',
                            left: 15,
                            top:10,
                            textStyle: {
                                fontWeight: '800',
                                color: '#ffffff',
                                fontSize: 16
                            }
                        },*/
                        grid: {
                            top: "30%",
                            left: '8%',
                            right: '2%',
                            bottom: '15%'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            position:"right",
                            formatter: "{b}:{c}村({d}%)"
                        },
                        series: [{
                            type: 'pie',
                            selectedMode: 'single',
                            radius: pieRadius,
                            color: ['#DD4F43','#1FA463'],
                            label: {
                                normal: {
                                    position: 'center',
                                    formatter: "{b}:{c}村",
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14
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
                        myChart22.setOption(option, true);
                    }

                }
             })
       }
})