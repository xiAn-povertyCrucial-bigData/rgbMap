$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    let countyName=countryName;
    let villagName=villageName;
    let villagCode=villageCode;
    console.log(villagCode)
    $("#villageName5").text(villagName);
    let dom = document.getElementById("module-1");
    let dom3 = document.getElementById("module-3");
    let myChart3 = echarts.init(dom3);
    let myChart = echarts.init(dom);
    let dom4 = document.getElementById("module-4");
    let myChart4 = echarts.init(dom4);
    let dom5 = document.getElementById("module-5");
    let myChart5 = echarts.init(dom5);
      let dom6 = document.getElementById("module-6");
    let myChart6 = echarts.init(dom6);
    $.ajax({
        url:url+"/init/disct/name",
        method:"post",
        dataType:"json",
        data:{"name":countyName},
        success:function (result) {
            let data=result.data;
            console.log(data);
            industryPoverty(villagCode);
            industryPoverty2(villagCode);
            industryPoverty3(villagCode);
            industryPoverty4(villagCode);
            industryPoverty5(villagCode);
        }
    })
    /*全市就业扶贫实施情况统计*/
    function industryPoverty(countyNum){
        let pieRadius=['0', '41%'];
        let yHeight='28%';
       // let statisticalName=villagName+"就业扶贫实施情况统计";
        $.ajax({
            url:url+"/employment/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['就业未实施','就业正实施','就业已实施',"产业就业均已实施"];
                let temp={"value":data['NOT_IMPLEMENTED'],"name":arr[0]};
                let temp1={"value":data['IS_IMPLEMENTED'],"name":arr[1]};
                let temp2={"value":data['IS_IMPLEMENTED']+data['IMPLEMENTED']-data['PROJ_EMPLOY'],"name":arr[2]};
                let temp3={"value":data['PROJ_EMPLOY'],"name":arr[3]};
                let count=data['NOT_IMPLEMENTED']+data['IMPLEMENTED']+data['IS_IMPLEMENTED']
                datas.push(temp);
                //datas.push(temp1);
                datas.push(temp2);
                datas.push(temp3);
                console.log(datas);
                option = {
                    color:  ['#DD4F43','#1FA463','#1FA463'],
                    title: {
                        text: '总数: '+count+'户',
                        x: 'center',
                        bottom: '15%',
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
                        formatter: "{b}:{c}户({d}%)"
                    },
                    series: [{
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        center: ['50%', '50%'],
                        color:  ['#DD4F43','#1FA463','#1FA463'],
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
    /*就业扶贫实施情况*/
    function industryPoverty2(countyNum){
    	var table = $("#table1");
            $.ajax({
            url:url+"/employment/countName",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                	var  str = "";
					for(let i=0;i<result.data.length;i++){
                        if(result.data[i].STATUS==0){
                          str+=`
                            <li>
                                <div style="width:50%;">${result.data[i].AAC029}</div>
                                <div style="color:red;width:50%;">未完成</div>
                            </li>
							`;
                        }
                        else if(result.data[i].STATUS==2||result.data[i].STATUS==1){
                            str+=`
                            <li>
                                <div style="width:50%;">${result.data[i].AAC029}</div>
                                <div style="color:green;width:50%;">已完成</div>
                            </li>
							`;
                        }
					}
					table.html(str);

            }
        })
    }
    /*全市就业方式分类统计*/
    function industryPoverty3(countyNum){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        let projectName = villagName + "就业方式分类统计";
        $.ajax({
            url:url+"/employment/type/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                // console.log(data)
                let datas=["劳动力转移","公益性岗位","自主创业"];
                let datas2=[];
                let datas3=[];
                let datas4=[];
                let datas5=[];
                datas2.push(data["EMP_NUM"]);
                datas2.push(data["RES_NUM"]);
                datas2.push(data["START_NUM"]);
                console.log(datas2)
                /*遍历主导产业所有的名称和编号*/
                let temp3 = {"name":"劳动力转移","number":1};
                let temp4 = {"name":"公益性岗位","number":2};
                let temp5 = {"name":"自主创业","number":3};
                datas5.push(temp3);
                datas5.push(temp4);
                datas5.push(temp5);
                datass2=datas5;
                // console.log(datass2)
                option = {
                    color: ['#4ddead'],
//                  title: {
//                      text: projectName,
//                      left: 10,
//                      top:5,
//                      textStyle: {
//                          color: '#fff',
//                          fontSize: 16,
//                      },
//                  },
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
                        bottom: '25%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：户',
                            minInterval:1,
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
                $("#villageName2").text(villagName);
                $("#project4").text(params.value);
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $(".pop-up10").css({"opacity":"1","top":"50%"});
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
                console.log(paramsNum);
                // console.log(paramsNum3);
                let nameList2=$("#nameList3")
                $.ajax({
                    url:url+"/employment/type/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":villagCode},
                    success:function (result) {
                        let data = result.data;
                        // $("#peopleNums3").text(data.length)
                        showList2(nameList2,data);
                    }
                })
                function showList2(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
        					<div style="width:100%;">${data[i]['EMPLOY_NAME']}</div>
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
    /*全市就业方式培训情况（圆饼图）*/
    function industryPoverty4(countyNum){
        var pieRadius=['45%', '62%'];
        let yHeight='28%';
        let methodsName = villagName + "就业方式培训情况";
        $.ajax( {
            url:url+"/employment/circle/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                let data=result.data;
                let datas=[];
                let i=0;
                let arr=['未培训','已培训'];
                let temp={"value":data['NO_NUM'],"name":arr[0]};
                let temp2={"value":data['OK_NUM'],"name":arr[1]};
                let count=data['OK_NUM']+data['NO_NUM'];
                datas.push(temp);
                datas.push(temp2);
                console.log(datas);
                /*for (var key in data)
                {
                    let temp = {"value":data[key],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }*/
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
                            fontSize:graph_x
                        }
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
                        center: ['50%', '65%'],
                        color:  ['#DD4F43','#1FA463'],
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
                    myChart4.setOption(option, true);
                }
            }
        })
        myChart4.on("click",function(params) {
            if (1) {
                $("#method").text(params.value);
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $(".pop-up16").css({"opacity": "1", "top": "50%"});
                let nameList = $("#nameList");
                $.ajax({
                    url: url + "/employment/circle/people",
                    method: "post",
                    dataType: "json",
                    data: {"year": year, "disctId": villagCode},
                    success: function (result) {
                        let data = result.data;
                        console.log(data)
                        let object = data.filter((item) => {
                            return item.STATUS !== 1
                        });
                        console.log(object)
                        showList(nameList, data);
                        console.log(data.length);
                        console.log($(".status").length);
                        for (let i = 0; i < $(".status").length; i++) {
                            if ($(".status").eq(i).text() == 0) {
                                $(".status").eq(i).text("未实施").css("color", "#DD4F43");
                            } else if ($(".status").eq(i).text() == 1) {
                                $(".status").eq(i).text("已实施").css("color", "#1FA463");
                            }
                        }
                    }
                })

                function showList(obj, data) {
                    obj.empty();
                    for (let i = 0; i < data.length; i++) {
                        let str = `
                        <li style="display: flex;justify-content: space-between;">
							<div>${data[i]['POVERTY_NAME']}</div>
							<div class="status">${data[i]['STATUS']}</div>
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
    /*全市就业方式培训情况（柱状图）*/
    function industryPoverty5(countyNum){
        let datass;  //保存县区名称和县区编号
        let datass2;  //保存主导产业名称和数字
        var paramsNum;
        $.ajax({
            url:url+"/employment/skill/count",
            method:"post",
            dataType:"json",
            data:{"year":year,"disctId":countyNum},
            success:function (result) {
                // console.log(result)
                let data=result.data;
                // console.log(data)
                let datas=["创业培训","就业培训"];
                let datas2=[];
                let datas3=[];
                let datas4=[];
                let datas5=[];
                datas2.push(data["TRAIN_NUM"]);
                datas2.push(data["VOCA_NUM"]);
                console.log(datas2)
                /*遍历主导产业所有的名称和编号*/
                let temp2 = {"number":1,"name":"就业培训"};
                let temp3 = {"number":2,"name":"创业培训"};
                datas5.push(temp2);
                datas5.push(temp3);
                datass2=datas5;
                // console.log(datass2)
                option = {
                    color: ['#4ddead'],
                    /*title: {
                        text: '全市就业方式分类统计',
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
                        top: "30%",
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    yAxis: [
                        {
                            type: 'value',
                            name: '单位：户',
                            minInterval:1,
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

                    ]
                };
                if (option && typeof option === "object") {
                    myChart5.setOption(option, true);
                }
            }
        })
        myChart5.on("click",function(params){
            if(params.componentType == "xAxis"){
                // console.log(params.value);
                $("#houseName3").text(villagName);
                $("#project6").text(params.value);
                $(".container>.box").css({"opacity": "1", "top": "0"});
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
                console.log(paramsNum);
                // console.log(paramsNum3);
                let nameList2=$("#nameList")
                $.ajax({
                    url:url+"/employment/skill/count/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":paramsNum,"disctId":villagCode},
                    success:function (result) {
                        let data = result.data;
                        // $("#peopleNums3").text(data.length)
                        showList2(nameList2,data);
                    }
                })
                function showList2(obj,data){
                    obj.empty();
                    for(let i=0;i<data.length;i++){
                        let str=`
                        <li style="display: flex;justify-content: space-between;">
        					<div style="width:100%;">${data[i]['POVERTY_NAME']}</div>
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