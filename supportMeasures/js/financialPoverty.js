$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*市教育扶贫实施情况统计*/
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    $(".fpVill").html("全市").css("fontWeight","bold");
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '35%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/finance/leftTop/query",
            method:"get",
            dataType:"json",
            data:{},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['已落实','未落实'];
                let datatable =[data.reach,0];
                $("#people").html(data.dropNumber+"人");
                for (var key in data)
                {
                    let temp = {"value":datatable[i],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }
                var dataC=datas;
                let count=data.reach;
              option = {
                    color:  ['#1FA463','#DD4F43'],
                       title: {
                           text: '总数: '+count+'人',
                           left: 15,
                           top:10,
                           textStyle: {
                               fontWeight: '800',
                               color: '#ffffff',
                               fontSize: 16
                           }
                       },
                      tooltip: {
                          show: true,
                          trigger: 'item',
                          position:"right",
                          formatter: "{b}:{c}人({d}%)"
                      },
                    legend: {
                        //orient: 'vertical',
                        selectedMode:false,
                        x: 'right',
                        y:"5%",
                        data: ['已落实','未落实'],
                        textStyle:{
                            fontSize:14,
                            color:"#fff"
                        }
                    },
                    series: [{
                        name: '实施状态',
                        type: 'pie',
                        radius: [0, '41%'],
                        center:["50%","50%"],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: '{b}:{c}人',
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
    /*全市各区县教育扶贫实施情况*/
    industryPoverty2();
    function industryPoverty2(){
        let dom2 = document.getElementById("module-2");
        let myChart2 = echarts.init(dom2);
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url:url+"/finance/leftBelow/query",
            method:"post",
            dataType:"json",
            data:{},
            success:function (result) {
                // console.log(result)
                //console.log(result.data[4][1])
                let data=result.data;
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let arr=['未落实','已落实'];
                /*遍历保存市的区县名称和区县编号*/
                for (let i in data)
                {
                    let temp = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas6.push(temp);
                }
                datass=datas6;
                for(let i=0;i<data.length;i++){
                    datas2.push('0');
                    datas4.push(data[i]['NUM']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                        color:  ['#DD4F43','#1FA463'],
                        // title: {
                        //     text: '全市各区县教育扶贫实施情况',
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
                        /*legend: {
                            data: ['未落实','已落实'],
                            x: 'right',
                            y:"4%",
                            textStyle:{    //图例文字的样式
                                color:'#fff',
                                fontSize:14
                            }
                        },*/
                        grid: {
                            top: "15%",
                            left: '5%',
                            right: '10%',
                            bottom: '15%',
                            containLabel: true
                        },
                        yAxis:  {
                            name: '单位：人',
                            type: 'value',
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
                                } ,
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
                                name: '未落实',
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
                                name: '已落实',
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
        })
        /*点击区县*/
        var  dom10= document.getElementById("module-10");
        var  myChart10 = echarts.init(dom10);
        var dom11= document.getElementById("module-11");
        var myChart11 = echarts.init(dom11);
        myChart2.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#countyName").text(params.value);
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
                    url:url+"/finance/leftBelow/query",
                    method:"get",
                    dataType:"json",
                    data:{"aar008_x":paramsNum},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas4=[];
                        let datas5=[];
                        let datas6=[];
                        let datas7=[];
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
                            datas2.push('0');
                            datas4.push(data[i]['NUM']);
                            datas5.push(data[i]['AAR008']);//乡镇编号
                            datas6.push(data[i]['AAR009']);//乡镇名称
                        }
                        option = {
                            color:  ['#DD4F43','#1FA463'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                           /* legend: {
                                data: ['未落实', '已落实'],
                                x: 'right',
                                y:"4%",
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },*/
                            grid: {
                                top: "15%",
                                left: '5%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
                            },
                            yAxis:  {
                                type: 'value',
                                name: '单位：人',
                                minInterval:1,
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
                                triggerEvent:true,
                                type: 'category',
                                data: datas6,
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
                                    name: '未落实',
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
                                    name: '已落实',
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
                    url:url+"/finance/leftBelow/query",
                    method:"get",
                    dataType:"json",
                    data:{"aar008_z":paramsNum2},
                    success:function (result) {
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas8=[];
                        let datas5=[];
                        let datas6=[];
                        let arr=['未落实','已落实']
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
                            datas2.push('0');
                            datas4.push(data[i]['NUM']);
                            datas5.push(data[i]['AAR008']);//乡镇编号
                            datas6.push(data[i]['AAR009']);//乡镇名称
                        }
                      option = {
                            color:  ['#DD4F43','#1FA463'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            /*legend: {
                                data: ['未落实', '已落实'],
                                x: 'right',
                                y:"5%",
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },*/
                            grid: {
                                top: "15%",
                                left: '5%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
                            },
                            yAxis:  {
                                type: 'value',
                                name: '单位：人',
                                minInterval:1,
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
                                triggerEvent:true,
                                type: 'category',
                                data: datas6,
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
                                    name: '未落实',
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
                                    name: '已落实',
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
                    url:url+"/finance/leftBelow/query",
                    method:"get",
                    dataType:"json",
                    data:{"aar008_c":paramsNum3},
                    success:function (result) {
                        let data = result.data;
                        showList(nameList,data);
                        let length=data.length;

                        if(length<=8){
                            $(".pop-up7 .maquee").removeClass("maquee");
                        }
                    }
                })
                function showList(obj,data){
                    obj.empty();
                    let str='';
                    for(let i=0;i<data.length;i++){
                       str+=`
                        <li style="display: flex;justify-content: space-between;">
        					<div style="width:33.33%;">${data[i].PERSON_NAME}</div>
        					<div style="width:33.33%;" class="status2">${data[i].LOAN_MONEY}</div>
        					<div style="width:33.33%;" class="status2">${data[i].LOAN_PURPOSE}</div>
                        </li>
                     `;
                    }
                        obj.html(str)
                }
            }
        })

     }

    /*************************************右上 在校生分阶段情况*******************************************/
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    var dom6 = document.getElementById("module-6");
    var myChart6 = echarts.init(dom6);
    var dom12 = document.getElementById("module-12");
    var myChart12 = echarts.init(dom12);
    var dom13 = document.getElementById("module-13");
    var myChart13 = echarts.init(dom13);
    industryPoverty3();
    var paramsNum;
    function industryPoverty3(){
        let datass;
        let datass2=[];
        let school = [];

        $.ajax({
            url:url+"/finance/rightTop/query",
            method:"post",
            dataType:"json",
            data:{},
            success:function (result) {
                // console.log(result)
                let data=result.data[0];
                var pieRadius=['45%', '62%'];
                var yHeight='38%';
                school = [data.FIRST,data.SECOND,data.THIRD];
            // alert(school)
                let temp = {"number": 1, "name": "第一产业"};
                let tem2 = {"number": 2, "name": "第二产业"};
                let tem3 = {"number": 3, "name": "第三产业"};
                datass2.push(temp,tem2,tem3);
                option = {
                    color: ['#4ddead'],
                    // title: {
                    //     text: '在校生分阶段情况',
                    //     left: 10,
                    //     top:5,
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 16,
                    //     },
                    // },
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
                            data: ['第一产业','第二产业','第三产业'],
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
                            name: '单位：人',
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
                            name:'受益人数',
                            type:'bar',
                            barWidth : 15,//柱图宽度
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: school,
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
                myChart3.setOption(option, true);
            }
            }
        })
        myChart3.on("click", eConsole3);
        function eConsole3(param) {
            var  cityName="西安市";
            var  countyName;
            var  townName;
            var villageName;
            var n1 = [];
            var n2 = [];
            var n11 = [];
            var n21 = [];
            var n111 = [];
            var n211 = [];
            $(".pop-up").css({"opacity":"1","top":"50%"});
            //集中安置 县区
            for(let j=0;j<datass2.length;j++){
                // console.log(params.value+'-----'+datass[j].name);
                if(param.value==datass2[j].name){
                    // console.log(datass[j].number)
                    paramsNum=datass2[j].number;
                }
            }
            $.ajax({
                url:url+'/finance/purpose/query',
                method:"get",
                dataType:"json",
                data:{'flag':paramsNum},
                success:function (result) {
                    if(result.code==2000){
                        for(let i = 0; i < result.data.length; i++ ){
                            n1[i] = result.data[i].AAR008;
                            n2[i] = result.data[i].AAR009;
                        }
                        show20(myChart6,result,cityName);
                    }
                }
            })
            if(param.componentType == "xAxis"){
                $("#project").text(param.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up").css({"opacity":"1","top":"50%"});
                $(".pop-up8").css({"opacity":"1","top":"-100%"});
                // alert("单击了"+params.value+"x轴标签");
            }else{
                // alert("单击了"+params.name+"柱状图");
            }
            /*点击县到镇*/
            myChart6.on("click",function(params){
                var kk;
                //alert(params.value)
                for(let i = 0; i < n2.length;i++ ){
                    if(params.value == n2[i]){
                        kk=i;
                        countyName = params.value;
                    }
                }
                //console.log(params)
                $.ajax({
                    url:url+'/finance/purpose/query',
                    method:"get",
                    dataType:"json",
                    data:{'aar008_x':n1[kk],'flag':paramsNum},
                    success:function (result) {
                        if(result.code==2000){
                            for(let i = 0; i < result.data.length; i++ ){
                                n11[i] = result.data[i].AAR008;
                                n21[i] = result.data[i].AAR009;
                            }
                            show20(myChart12,result,countyName);
                            //alert("2123")
                        }
                    }
                })
                if(params.componentType == "xAxis"){
                    $("#countyName9").text(params.value);
                    $(".pop-up").css({"opacity":0,"top":"-100%"});
                    $(".pop-up8").css({"opacity":"1","top":"50%"});
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击镇到村*/
            myChart12.on("click",function(params){
                var kk;
                for(let i = 0; i < n21.length;i++ ){
                    if(params.value == n21[i]){
                        townName = params.value;
                        kk=i;
                    }
                }
                $.ajax({
                    url:url+'/finance/purpose/query',
                    method:"get",
                    dataType:"json",
                    data:{'aar008_z':n11[kk],'flag':paramsNum},
                    success:function (result) {
                        if(result.code==2000){
                            for(let i = 0; i < result.data.length; i++ ){
                                n111[i] = result.data[i].AAR008;
                                n211[i] = result.data[i].AAR009;
                            }
                            show20(myChart13,result,townName);
                            //alert("2123")
                        }
                    }
                })
                //console.log(params)
                if(params.componentType == "xAxis"){
                    $("#countyName10").text(params.value);
                    $(".pop-up8").css({"opacity":0,"top":"-100%"});
                    $(".pop-up9").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击村到户*/
            myChart13.on("click",function(params){
                var kk;
                var nameList2 = $("#nameList2")
                for(let i = 0; i < n211.length;i++ ){
                    if(params.value == n211[i]){
                        kk=i;
                        villageName = params.value;
                    }
                }
                $.ajax({
                    url:url+'/finance/purpose/query',
                    method:"post",
                    dataType:"json",
                    data:{'aar008_c':n111[kk],'flag':paramsNum},
                    success:function (result) {
                        if(result.code==2000){
                            show22table(nameList2,result);
                            //alert("2123")
                        }
                    }
                })
                console.log(params)
                if(params.componentType == "xAxis"){
                    $("#villageName6").text(params.value);
                    $(".pop-up9").css({"opacity":0,"top":"-100%"});
                    $(".pop-up10").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
        }
    }




/****************************集中安置正在实施的县（20）、镇（21）、村（22）*********************************/
function show20(obj,data,name){
obj.innerHTML="";
var n2 = [];
var n3 = [];
var n4 = [];
var n5 = [];
//let arr=["未完成","正实施","已完成"]
for(let i = 0; i < data.data.length; i++){
   n2[i] = data.data[i].AAR009;
   n3[i] = data.data[i].PURPOSENUMBER;
   //n4[i] = data.data[i].no;
   //n5[i] = data.data[i].reach;
}
    option = {
            color:  ['#4ddead'],
            /*title: {
                text: name+'易地搬迁实施情况',
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
            /*legend: {
                data: arr,
                x: 'right',
                y:"4%",
                textStyle:{    //图例文字的样式
                    color:'#fff'
                }
            },*/
            grid: {
                top: "15%",
                left: '5%',
                right: '5%',
                bottom: '15%',
                containLabel: true
            },
            yAxis:  {
                type: 'value',
                name: '单位：人',
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
                }
            },
            series: [
                {
                    name: '',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,
                    data: n3,
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
                /*{
                    name: '正实施',
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
                            barBorderRadius:[0, 0, 0, 0]
                        }
                    }
                },
                {
                    name: '已落实',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 10,

                    data: n2,
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
                },*/

            ]
        };
if (option && typeof option === "object") {
    obj.setOption(option, true);
}
}

function show22table(obj,result){
    let str='';
        for(let i=0;i<result.data.length;i++){

          str +=`
            <li style="display: flex;justify-content: space-between;">
                <div style='margin:0 auto;width:100%;'>${result.data[i].PERSON_NAME}</div>
            </li>
            `;}
        $('#nameList1').html(str)
}



  /***************************************************教育扶贫分阶段实施情况***********************************************/
    industryPoverty4();
    var  dom4 = document.getElementById("module-4");
    var myChart4 = echarts.init(dom4);
    //let datass2=[];
    //let datass=[];
    function industryPoverty4(){
        let dom4 = document.getElementById("module-4");
        let myChart4 = echarts.init(dom4);
        let datass;   //保存区名称和区编号
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        $.ajax({
            url:url+"/finance/rightBelow/query",
            method:"post",
            dataType:"json",
            data:{},
            success:function (result) {
                let data=result.data;
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let arr=['未落实','已落实'];
                /*遍历保存市的区县名称和区县编号*/
                for (let i in data)
                {
                    let temp = {"name":data[i]['AAR009'],"number":data[i]['AAR008']};
                    i++;
                    datas6.push(temp);
                }
                datass=datas6;
                for(let i=0;i<data.length;i++){
                    datas2.push('0');
                    datas4.push(data[i]['MONEY']);
                    datas5.push(data[i]['AAR008']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                        color:  ['#DD4F43','#1FA463'],
                        // title: {
                        //     text: '全市各区县教育扶贫实施情况',
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
                        /*legend: {
                            //data: ['未落实','已落实'],
                            x: 'right',
                            y:"4%",
                            textStyle:{    //图例文字的样式
                                color:'#fff',
                                fontSize:14
                            }
                        },*/
                        grid: {
                            top: "15%",
                            left: '5%',
                            right: '10%',
                            bottom: '15%',
                            containLabel: true
                        },
                        yAxis:  {
                            name: '单位：元',
                            type: 'value',
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
                                } ,
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
                                name: '未落实',
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
                                name: '已落实',
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
                    myChart4.setOption(option, true);
                }
            }
        })
        /*点击区县*/
        myChart4.on("click",function(params){
        	var  dom14 = document.getElementById("module-14");
		    var myChart14 = echarts.init(dom14);
		    var  dom15 = document.getElementById("module-15");
		    var myChart15 = echarts.init(dom15);
            if(params.componentType == "xAxis"){
                $("#countyName").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up11").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
                var paramsNum;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsNum=datass[j].number;
                        console.log(paramsNum)
                    }
                }
                $.ajax({
                    url:url+"/finance/rightBelow/query",
                    method:"get",
                    dataType:"json",
                    data:{"aar008_x":paramsNum},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas4=[];
                        let datas5=[];
                        let datas6=[];
                        let datas7=[];
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
                            datas2.push('0');
                            datas4.push(data[i]['MONEY']);
                            datas5.push(data[i]['AAR008']);//乡镇编号
                            datas6.push(data[i]['AAR009']);//乡镇名称
                        }
                        option = {
                            color:  ['#DD4F43','#1FA463'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            /*legend: {
                                data: ['未落实', '已落实'],
                                x: 'right',
                                y:"4%",
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },*/
                            grid: {
                                top: "15%",
                                left: '5%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
                            },
                            yAxis:  {
                                type: 'value',
                                name: '单位：元',
                                minInterval:1,
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
                                triggerEvent:true,
                                type: 'category',
                                data: datas6,
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
                                    name: '未落实',
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
                                    name: '已落实',
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
                            myChart14.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击镇（街）*/
        myChart14.on("click",function(params){
		    var  dom15 = document.getElementById("module-15");
		    var myChart15 = echarts.init(dom15);
            if(params.componentType == "xAxis"){
                $("#villageName").text(params.value);
                $(".pop-up11").css({"opacity":0,"top":"-100%"});
                $(".pop-up12").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的镇编号传给后台*/
                var paramsNum2;
                for(let j=0;j<datass2.length;j++){
                    if(params.value==datass2[j].name){
                        paramsNum2=datass2[j].number;
                    }
                }
                $.ajax({
                    url:url+"/finance/rightBelow/query",
                    method:"get",
                    dataType:"json",
                    data:{"aar008_z":paramsNum2},
                    success:function (result) {
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas8=[];
                        let datas5=[];
                        let datas6=[];
                        let arr=['未落实','已落实']
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
                            datas2.push('0');
                            datas4.push(data[i]['MONEY']);
                            datas5.push(data[i]['AAR008']);//乡镇编号
                            datas6.push(data[i]['AAR009']);//乡镇名称
                        }
                      option = {
                            color:  ['#DD4F43','#1FA463'],
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                           /* legend: {
                                data: ['未落实', '已落实'],
                                x: 'right',
                                y:"5%",
                                textStyle:{    //图例文字的样式
                                    color:'#fff'
                                }
                            },*/
                            grid: {
                                top: "15%",
                                left: '5%',
                                right: '5%',
                                bottom: '15%',
                                containLabel: true
                            },
                            yAxis:  {
                                type: 'value',
                                name: '单位：元',
                                minInterval:1,
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
                                triggerEvent:true,
                                type: 'category',
                                data: datas6,
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
                                    name: '未落实',
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
                                    name: '已落实',
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
                            myChart15.setOption(option, true);
                        }
                    }
                })
            }
        })
        /*点击村*/
//      myChart15.on("click",function(params){
//          if(params.componentType == "xAxis"){
//              $("#houseName").text(params.value);
//              $(".pop-up12").css({"opacity":0,"top":"-100%"});
//              $(".pop-up13").css({"opacity":"1","top":"50%"});
//              /*点击柱状图找对应的村编号传给后台*/
//              var paramsNum3;
//              for(let j=0;j<datass3.length;j++){
//                  if(params.value==datass3[j].name){
//                      paramsNum3=datass3[j].number;
//                  }
//              }
//              let nameList2=$("#nameList2");
//              $.ajax({
//                  url:url+"/finance/rightBelow/query",
//                  method:"get",
//                  dataType:"json",
//                  data:{"aar008_c":paramsNum3},
//                  success:function (result) {
//                      let data = result.data;
//                      showList(nameList,data);
//                      let length=data.length;
//
//                      if(length<=8){
//                          $(".pop-up13 .maquee").removeClass("maquee");
//                      }
//                  }
//              })
//              function showList(obj,data){
//                  obj.empty();
//                  let str='';
//                  for(let i=0;i<data.length;i++){
//                     str=`
//                      <li style="display: flex;justify-content: space-between;">
//      					<div style="width:33.33%;">${data[i].PERSON_NAME}</div>
//      					<div style="width:33.33%;" class="status2">${data[i].LOAN_MONEY}</div>
//      					<div style="width:33.33%;" class="status2">${data[i].LOAN_PURPOSE}</div>
//                      </li>
//                   `;
//                  }
//                      obj.html(function (i,value) {
//                          return value+str;
//                      })
//                  }
//          }
//      })

     }


//     /*******************************************分散安置 **************************************************/
//      var dog23 = document.getElementById("module-23"); //未落实 县
//      var myChart23 = echarts.init(dog23);
//      var dog24 = document.getElementById("module-24");//未落实 镇
//      var myChart24 = echarts.init(dog24);
//      var dog25 = document.getElementById("module-25"); // 未落实 村
//      var myChart25 = echarts.init(dog25);
//      var dog26 = document.getElementById("module-26");  //已落实县
//      var myChart26 = echarts.init(dog26);
//      var dog27 = document.getElementById("module-27");  //已落实 镇
//      var myChart27 = echarts.init(dog27);
//      var dog28 = document.getElementById("module-28");  //已落实 村
//      var myChart28 = echarts.init(dog28);
//      var dog29 = document.getElementById("module-29"); //正实施
//      var myChart29 = echarts.init(dog29);
//      var dom30 = document.getElementById("module-30"); //正
//      var myChart30 = echarts.init(dom30);
//      var dom31 = document.getElementById("module-31"); //正
//      var myChart31 = echarts.init(dom31);
//      var  hongda = $("#hongda");//未落实 户
//      var zhengqiang = $("#zhengqiang");//完成
//     myChart4.on("click", eConsole4);
//     function eConsole4(param) {

// // /**************8*****分散安置正在实施********************/
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
//                 url:url+'/edu/ongo/query',
//                 method:"post",
//                 dataType:"json",
//                 data:{'cityNo':610100000000,'placement':'0'},
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
//                 url:url+'/edu/ongo/query',
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
//                     url:url+'/edu/ongo/query',
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
//                     url:url+'/edu/ongo/query',
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


/****************************分散安置正在实施的县（29）、镇（30）、村（31）的渲染*********************************/
function show30(obj,data,name){
  //  alert("dasd");
obj.innerHTML="";
var n2 = [];
var n3 = [];
var n4 = [];
var n5 = [];
//let arr=["未完成","已完成"]
for(let i = 0; i < data.data.length; i++){
   n2[i] = data.data[i].AAR009;
   n3[i] = data.data[i].MONEY;
   //n4[i] = data.data[i].no;
   // n5[i] = data.data[i].ongoing;
}
    option = {
            color:  ['#DD4F43','#1FA463'],
            /*title: {
                text: name+'教育扶贫分阶段实施情况',
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
                name: '单位：元',
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
                    name: '未完成',
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
                    name: '已完成',
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
//                 data:{'cityNo':610100000000,'placement':type},
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
})