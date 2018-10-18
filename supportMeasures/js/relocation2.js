$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*县区产业扶贫实施情况统计*/
    var countyName =countryName;
    var disctId = '';
    $(".fpVill").html(countyName);
    $("#mapTitle").html(countyName)
    $.ajax({
        url:url+"/init/disct/name",
        method:"get",
        dataType:"json",
        async:false,
        data:{"name":countyName},
        success:function(data){
            disctId = data.data;
        }
    })
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    $("#countyN").html(countyName);
    $("#mapTitle").text(countyName)
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        var name1=countyName+"易地搬迁实施情况统计";
        $.ajax({
            url:url+"/place/city/query",
            method:"get",
            dataType:"json",
            data:{"cityName":disctId},
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
    /*各区县易地搬迁实施情况*/
    var dom10 = document.getElementById("module-10");
    var myChart10 = echarts.init(dom10);
    let dom11= document.getElementById("module-11");
    let myChart11 = echarts.init(dom11);
    industryPoverty2();
    function industryPoverty2(){
        let datass2;  //保存镇名称和镇编号
        let datass3;  //保存村名称和村编号
        let name2=countyName+"各镇(街)易地搬迁实施情况";
        $.ajax({
            url:url+"/place/city/query",
            method:"post",
            dataType:"json",
            async: false,
            data:{"cityName":disctId},
            success:function (result) {
                if(result.code==2000){
                // console.log(result)
                // console.log(result.data[4][0])
                let data=result.data[4][0];
                let datas=[];  //x轴坐标值
                let datas2=[];  //数据1
                let datas3=[];  //数据2
                let datas4=[];  //数据3
                let datas5=[];  //数据4
                var datas6=[];  //数据5
                let arr=['未启动','未入住','已入住'];
                /*遍历保存区县中镇名称和镇编号*/
                for (let i in data)
                {
                    let temp = {"name":data[i]['AAR009'],"number":data[i]['AAA011']};
                    i++;
                    datas6.push(temp);
                }
                datass2=datas6;
                for(let i=0;i<data.length;i++){
                    datas2.push(data[i]['no']);
                    datas3.push(data[i]['ongoing']);
                    datas4.push(data[i]['reach']);
                    datas5.push(data[i]['AAA11']);
                    datas.push(data[i]['AAR009']);
                }
                option = {
                    color:  ['#DD4F43','#FFCE43','#1FA463'],
//                  title: {
//                      text: name2,
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
                    myChart10.setOption(option, true);
                }
            }
            }
        })
        //镇
        myChart10.on("click",function(params){
            if(params.componentType == "xAxis"){
                $("#villageName").text(params.value);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up6").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的区县编号传给后台*/
                var paramsNum;
                for(let j=0;j<datass2.length;j++){
                    if(params.value==datass2[j].name){
                        paramsNum=datass2[j].number;
                    }
                }
                $.ajax({
                    url:url+"/place/village/query",
                    method:"get",
                    dataType:"json",
                    data:{"cityNo":paramsNum},
                    success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas3=[];
                        let datas4=[];
                        let datas5=[];
                        let datas7=[];
                        let arr=['未启动','未入住','已入住']
                        for(let i=0;i<data.length;i++){
                            datas.push(data[i]['AAR009']);
                        }
                        /*遍历存区县下所有的镇名称和镇编号*/
                        for (let i in data)
                        {
                            let temp2 = {"name":data[i]['AAR009'],"number":data[i]['AAA011']};
                            i++;
                            datas7.push(temp2);
                        }
                        datass3=datas7;
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['no']);
                            datas3.push(data[i]['ongoing']);
                            datas4.push(data[i]['reach']);
                            // datas5.push(data[i]["AAR009"]);
                            datas5.push(data[i]["AAA011"]);
                        }
                        //datass3=datas5;
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
                    url:url+"/place/poor/query",
                    method:"get",
                    dataType:"json",
                    data:{"cityNo":paramsNum3},
                    success:function (result) {
                        let data = result.data;
                        showList(nameList,data);
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
							<div style="width:50%;">${data.no[i]}</div>
							<div style="width:50%;" class="status" style="color:#DD4F43">未启动</div>
                        </li>
                     `;
                    }
                    for (let i = 0; i < data.ongoing.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.ongoing[i]}</div>
							<div style="width:50%;" class="status" style="color:#FFCE43">未入住</div>
                        </li>
                     `;
                    }
                    for (let i = 0; i < data.reach.length; i++) {
                        str += `
                        <li style="display: flex;justify-content: space-between;">
							<div style="width:50%;">${data.reach[i]}</div>
							<div style="width:50%;" class="status" style="color:#1FA463">已入住</div>
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

    /*************************************集中安置*******************************************/
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    industryPoverty3();
    function industryPoverty3(){
       //alert("dsada");
        var pieRadius=['45%', '62%'];
        var yHeight='40%';
        let datass;
        let datass2;
        var paramsNum;
        $.ajax({
            url:url+"/place/city/query",
            method:"post",
            dataType:"json",
            data:{"cityName":disctId},
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
                let count=data[0].jzno+data[0].jzongoing+data[0].jzreach;
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
                        position:"right",
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
                                    fontSize: graph_x
                                }
                            }
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


     var dom9 = document.getElementById("module-9");
     var myChart9 = echarts.init(dom9);
     var dom16 = document.getElementById("module-16");
    //  var myChart16 = echarts.init(dom16);
    //  var dom17 = document.getElementById("module-17");
    //  var myChart17 = echarts.init(dom17);
     var dom18 = document.getElementById("module-18");
     var myChart18 = echarts.init(dom18);
     var dom19 = document.getElementById("module-19");
     var myChart19 = echarts.init(dom19);
     var dom20 = document.getElementById("module-20");
     var myChart20 = echarts.init(dom20);
     var dom21 = document.getElementById("module-21");
     var myChart21 = echarts.init(dom21);
     var dom22 = document.getElementById("module-22");
     var myChart22 = echarts.init(dom22);
     myChart3.on("click", eConsole3);
     function eConsole3(param) {
        var n1 = [];
        var n2 = [];
        var n11 = [];
        var n21 = [];
        var n111 = [];
        var n211 = [];
        var  townName;
        var villageName;
         $(".container>.box").css({"opacity": "1", "top": "0"});
        $(".pop-up21").css({"opacity":"1","top":"50%"});
        //集中安置 点击县到镇
            $.ajax({
                url:url+'/place/concent/query',
                method:"post",
                dataType:"json",
                data:{'cityNo':disctId,'placement':'1'},
                success:function (result) {
                    if(result.code==2000){
                        for(let i = 0; i < result.data.length; i++ ){
                            n1[i] = result.data[i].AAA011;
                            n2[i] = result.data[i].AAR009;
                        }
                        show20(myChart21,result,countyName);
                    }
                }
            })
            /*点击镇到村*/
            myChart21.on("click",function(params){
               var kk;
                //alert(params.value)
                for(let i = 0; i < n2.length;i++ ){
                    if(params.value == n2[i]){
                        kk=i;
                        townName = params.value;
                    }
                }
                //console.log(params)
             $.ajax({
                url:url+'/place/concent/query',
                method:"post",
                dataType:"json",
                data:{'cityNo':n1[kk],'placement':'1'},
                success:function (result) {
                    if(result.code==2000){
                         for(let i = 0; i < result.data.length; i++ ){
                            n11[i] = result.data[i].AAA011;
                            n21[i] = result.data[i].AAR009;
                        }
                        show20(myChart22,result,townName);
                        //alert("2123")
                    }
                }
            })
                if(params.componentType == "xAxis"){
                    $("#countyName10").text(params.value);
                    $(".pop-up21").css({"opacity":0,"top":"-100%"});
                    $(".pop-up22").css({"opacity":"1","top":"50%"});
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击村到户*/
            myChart22.on("click",function(params){
                  var kk;
                  var xiaomin = $("#xiaomin")
                   for(let i = 0; i < n21.length;i++ ){
                    if(params.value == n21[i]){
                        kk=i;
                        villageName = params.value;
                    }
                }
                $.ajax({
                    url:url+'/place/concent/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':n11[kk],'placement':'1'},
                    success:function (result) {
                        if(result.code==2000){
                            showList(xiaomin, result);
                            /*show22table(xiaomin,result,villageName);
                            //alert("2123")*/
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
                if(params.componentType == "xAxis"){
                    $("#villageName6").text(params.value);
                    $(".pop-up22").css({"opacity":0,"top":"-100%"});
                    $(".pop-up23").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
    }



/****************************集中安置正在实施的县（20）、镇（21）、村（22）*********************************/
function show20(obj,data){
obj.innerHTML="";
var n2 = [];
var n3 = [];
var n4 = [];
var n5 = [];
let arr = ['未启动', '未入住', '已入住'];
for(let i = 0; i < data.data.length; i++){
   n2[i] = data.data[i].AAR009;
   n3[i] = data.data[i].reach;
   n4[i] = data.data[i].no;
   n5[i] = data.data[i].ongoing;
}
console.log(n4,n5,n3)
    option = {
            color:  ['#DD4F43','#FFCE43','#1FA463'],
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
    obj.setOption(option, true);
}
}

function show22(obj,data){
 obj.innerHTML="";
var n2 = [];
var n3 = [];
for(let i = 0; i < data.data.length; i++){
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
            triggerEvent:true,
            type: 'category',
            data: n2,
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
            name: '单位：个',
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
            data:n3,
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






  /***************************************************分散安置***********************************************/
    var dom4 = document.getElementById("module-4");
    var myChart4 = echarts.init(dom4);
    industryPoverty4();
    function industryPoverty4(){
      //  alert("dasd")
        $.ajax({
            url:url+"/place/city/query",
            method:"get",
            dataType:"json",
            data:{"cityName":disctId},
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
                let count=data[0].fsno+data[0].fsongoing+data[0].fsreach;
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
                        position:"center",
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
                                    fontSize: 14
                                }
                            }
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
    /*******************************************分散安置 **************************************************/
     var dog23 = document.getElementById("module-23"); //未启动 县
     var myChart23 = echarts.init(dog23);
     var dog24 = document.getElementById("module-24");//未启动 镇
     var myChart24 = echarts.init(dog24);
     var dog25 = document.getElementById("module-25"); // 未启动 村
     var myChart25 = echarts.init(dog25);
     var dog26 = document.getElementById("module-26");  //已入住县
     var myChart26 = echarts.init(dog26);
     var dog27 = document.getElementById("module-27");  //已入住 镇
     var myChart27 = echarts.init(dog27);
     var dog28 = document.getElementById("module-28");  //已入住 村
     var myChart28 = echarts.init(dog28);
     var dog29 = document.getElementById("module-29"); //未入住
     var myChart29 = echarts.init(dog29);
     var dom30 = document.getElementById("module-30"); //正
     var myChart30 = echarts.init(dom30);
     var dom31 = document.getElementById("module-31"); //正
     var myChart31 = echarts.init(dom31);
     var  hongda = $("#hongda");//未启动 户
     var zhengqiang = $("#zhengqiang");//完成
     myChart4.on("click", eConsole4);
     function eConsole4(param) {
            var n1 = [];
            var n2 = [];
            var n11 = [];
            var n21 = [];
            var n111 = [];
            var n211 = [];
            var city = "西安市";
            var county;
            var town;
            var village;
              $(".container>.box").css({"opacity": "1", "top": "0"});
            $(".pop-up33").css({"opacity":"1","top":"50%"});
        //集中安置 县区
            $.ajax({
                url:url+'/place/concent/query',
                method:"post",
                dataType:"json",
                data:{'cityNo':disctId,'placement':'0'},
                success:function (result) {
                    if(result.code==2000){
                        for(let i = 0; i < result.data.length; i++ ){
                            n1[i] = result.data[i].AAA011;
                            n2[i] = result.data[i].AAR009;
                        }
                        show30(myChart30,result,city);
                    }
                }
            })
            /*点击县到镇*/
            myChart30.on("click",function(params){
               var gg;
                //alert(params.value)
                for(let i = 0; i < n2.length;i++ ){
                    if(params.value == n2[i]){
                        county = params.value;
                        gg=i;
                    }
                }
                //console.log(params)
             $.ajax({
                url:url+'/place/concent/query',
                method:"post",
                dataType:"json",
                data:{'cityNo':n1[gg],'placement':'0'},
                success:function (result) {
                    if(result.code==2000){
                         for(let i = 0; i < result.data.length; i++ ){
                            n11[i] = result.data[i].AAA011;
                            n21[i] = result.data[i].AAR009;
                        }
                        show30(myChart31,result,county);
                    }
                }
            })
                if(params.componentType == "xAxis"){
                    $("#countyName15").text(params.value);
                    $(".pop-up33").css({"opacity":0,"top":"-100%"});
                    $(".pop-up34").css({"opacity":"1","top":"50%"});
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
            /*点击镇到村*/
           /* myChart31.on("click",function(params){
                var gg;
                   for(let i = 0; i < n21.length;i++ ){
                    if(params.value == n21[i]){
                        gg=i;
                        town = params.value;
                    }
                }
                $.ajax({
                    url:url+'/place/concent/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':n11[gg],'placement':'0'},
                    success:function (result) {
                        if(result.code==2000){
                            for(let i = 0; i < result.data.length; i++ ){
                                n111[i] = result.data[i].AAA011;
                                n211[i] = result.data[i].AAR009;
                            }
                            show30(myChart32,result,town);
                            //alert("2123")
                        }
                }
            })
                //console.log(params)
                if(params.componentType == "xAxis"){
                    $("#countyName16").text(params.value);
                    $(".pop-up33").css({"opacity":0,"top":"-100%"});
                    $(".pop-up34").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })*/
            /*点击村到户*/
            myChart31.on("click",function(params){
                  var gg;
                  var lele = $("#lele")
                   for(let i = 0; i < n21.length;i++ ){
                    if(params.value == n21[i]){
                        gg=i;
                        village = params.value;
                    }
                }
                let xiaomin1=$("#xiaomin1")
                $.ajax({
                    url:url+'/place/concent/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':n11[gg],'placement':'0'},
                    success:function (result) {
                        if(result.code===2000){
                            showList(xiaomin1, result);
                            // show30table(xiaomin1,result,village);
                            //alert("2123")
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
                if(params.componentType == "xAxis"){
                    $("#villageName7").text(params.value);
                    $(".pop-up34").css({"opacity":0,"top":"-100%"});
                    $(".pop-up35").css({"opacity":"1","top":"50%"});
                    // alert("单击了"+params.value+"x轴标签");
                }else{
                    // alert("单击了"+params.name+"柱状图");
                }
            })
    }

/****************************分散安置正在实施的县（29）、镇（30）、村（31）的渲染*********************************/
function show30(obj,data,name){
  //  alert("dasd");
var n2 = [];
var n3 = [];
var n4 = [];
var n5 = [];
let arr=["未启动","未入住","已入住"]
for(let i = 0; i < data.data.length; i++){
   n2[i] = data.data[i].AAR009;
   n3[i] = data.data[i].reach;
   n4[i] = data.data[i].no;
   n5[i] = data.data[i].ongoing;
}
//alert(n3);
  option = {
            color:  ['#DD4F43','#FFCE43','#1FA463'],
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


    /*************************受益户数和受益人数占比及比重*****************************************/
    var dom5 = document.getElementById("module-5");
    var myChart5 = echarts.init(dom5);
    industryPoverty5();
    function industryPoverty5(){
        var pieRadius=['45%', '62%'];
        var yHeight='38%';
        $.ajax({
            url:url+"/place/city/query",
            method:"get",
            dataType:"json",
            data:{"cityName":disctId},
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
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
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
                                triggerEvent:'true',
                                type: 'category',
                                data: ['集中安置','分散安置'],
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
                                top: "18%",
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
    }
/*****************显示县区 镇 村 受益户数 人数********************/
    //  var dog32 = document.getElementById("module-32"); // 县
    //  var myChart32 = echarts.init(dog32);
     var dog33 = document.getElementById("module-33");//镇
     var myChart33 = echarts.init(dog33);
     var dog34 = document.getElementById("module-34"); // 村
     var myChart34 = echarts.init(dog34);
     var type;
    myChart5.on("click",function(params){
        console.log(params)
		var k1 = [];
		var k2 = [];
		var k11 = [];
		var k21 = [];
     if(params.value=="集中安置"){
         type = 1;
      }else{
          type = 0;
      }
		 $.ajax({
                url:url+'/place/benefit/query',
                method:"get",
                dataType:"json",
                data:{'cityNo':disctId,'placement':type},
                success:function (result) {
                    if(result.code==2000){
                        for(let i = 0; i < result.data.length; i++ ){
                            k1[i] = result.data[i].AAA011;
                            k2[i] = result.data[i].AAR009;
                        }
                        showConcent(myChart33,result);
                    }
                }
            })
        if(params.componentType == "xAxis"){
            $(".container>.box").css({"opacity":"1","top":"0"});
            $("#placeName").text(params.value);
            $(".pop-up37").css({"opacity":"1","top":"50%"});
            // alert("单击了"+params.value+"x轴标签");
        }else{
            // alert("单击了"+params.name+"柱状图");
        }

    myChart33.on("click",function(params){
        	var gg;
			//alert(params.value)
			for(let i = 0; i < k2.length;i++ ){
				if(params.value == k2[i]){
					gg=i;
				}
			}
			 $.ajax({
                url:url+'/place/benefit/query',
                method:"get",
                dataType:"json",
                data:{'cityNo':k1[gg],'placement':type},
                success:function (result) {
                    if(result.code==2000){
                        showConcent(myChart34,result);
                        //alert("wqw");
                    }
                }
            })

        if(params.componentType == "xAxis"){
            $("#countyName19").text(params.value);
            $("#placeName3").text($("#placeName").text());
            $(".pop-up37").css({"opacity":0,"top":"-100%"});
            $(".pop-up38").css({"opacity":"1","top":"50%"});
            // alert("单击了"+params.value+"x轴标签");
        }else{
            // alert("单击了"+params.name+"柱状图");
        }
    })
   })
function showConcent(obj,data){
    obj.innerHTML="";
    console.log(data)
    var n2 = [];
    var n3 = [];
    var n4 = [];
    for(let i = 0; i < data.data.length; i++){
        n2[i] = data.data[i].AAR009;
        n3[i] = data.data[i].house;
        n4[i] = data.data[i].number;
    }
    //alert(n3)
   option = {
    color: ['#4ddead', '#3c7eb5'],
    // title: {
    //     text: '受益户数和受益人数占比及比重',
    //     left:10,
    //     top:-5,
    //     textStyle: {
    //         color: '#fff',
    //         fontSize: 16,
    //     },
    // },
    tooltip: {
       trigger: 'axis',
       axisPointer: {            // 坐标轴指示器，坐标轴触发有效
           type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
       }
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
            triggerEvent:'true',
            type: 'category',
            data: n2,
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
                rotate:-40,
                fontSize:graph_x
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
            data:n3
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
            data:n4
        }
    ]
    };
    if (option && typeof option === "object") {
        obj.setOption(option, true);
    }
  }

})