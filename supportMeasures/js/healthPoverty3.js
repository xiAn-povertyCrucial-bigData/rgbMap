$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    /*市生态扶贫达标情况统计*/
    let villagName=villageName;
    let codes=villageCode;
    $(".fpVill").html(villageName);
    $("#houseName").html(villagName);
    $("#villageName").html(villageName)
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        $.ajax({
            url:url+"/help/health/count",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year},
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
                        x: 'right',
                        y:"4%",
                        selectedMode:false,
                        data: ['未完成','已完成'],
                        textStyle:{
                            fontSize:14,
                            color:"#fff"
                        }
                    },
                    series: [{
                        name: '实施状态',
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
                        data:dataC
                    }]
                };
                if (option && typeof option === "object") {
                    myChart.setOption(option, true);
                }
            }
        })
    }

    industryPoverty2();
    function industryPoverty2(){
         $.ajax({
            url:url+"/help/health/people",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year},
            success:function (result) {
             if(result.code == 2000){
                 var str='';
                 for(let i = 0; i < result.data.length; i++){
                     if(result.data[i].STATUS==0){
                        str+=` 	<li>
                                <div>${result.data[i].AAC029}</div>
                                <div style="color:red">未达标</div>
                            </li>`
                     }else{
                         str+=` 	<li>
                                <div>${result.data[i].AAC029}</div>
                                <div style="color:green">已达标</div>
                            </li>`
                     }
                  }
                 $("#peopleType").html(str);
             }
            }
         })
    }
    var dom3 = document.getElementById("module-3");
    var myChart3= echarts.init(dom3);
    industryPoverty3();
    function industryPoverty3(){
        $.ajax({
            url:url+"/help/health/child/count",
            method:"post",
            dataType:"json",
            data:{'disctId':codes,'year':year,"type":1},
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
                                text: '参加新农合和大病保险',
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
        /*点击村*/
        myChart3.on("click",function(params){
            // console.log(params)
            if(1){
                // console.log(params.value);
                $("#houseName3").text(villagName);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up16").css({"opacity":"1","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                /*let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);*/
                let nameList4=$("#nameList2")
                $.ajax({
                    url:url+"/help/health/child/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":1,"disctId":codes},
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

    var dom4 = document.getElementById("module-4");
    var myChart4 = echarts.init(dom4);
    industryPoverty4();
    function industryPoverty4(){
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year,"type":2},
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
                myChart4.setOption(option, true);
            }
           }
         }
        })
        /*点击村*/
        myChart4.on("click",function(params){
            // console.log(params)
            if(1){
                // console.log(params.value);
                $("#houseName4").text(villagName);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up23").css({"opacity":"2","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                /*let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);*/
                let nameList4=$("#nameList3")
                $.ajax({
                    url:url+"/help/health/child/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":2,"disctId":codes},
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

    var dom5 = document.getElementById("module-5");
    var myChart5 = echarts.init(dom5);
    industryPoverty5();
    function industryPoverty5(){
        $.ajax({
            url:url+"/help/health/child/count",
            method:"get",
            dataType:"json",
            data:{'disctId':codes,'year':year,"type":3},
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
                myChart5.setOption(option, true);
            }
           }
         }
        })
        /*点击村*/
        myChart5.on("click",function(params){
            // console.log(params)
            if(1){
                // console.log(params.value);
                $("#houseName5").text(villagName);
                $(".container>.box").css({"opacity":"1","top":"0"});
                $(".pop-up27").css({"opacity":"2","top":"50%"});
                /*点击柱状图找对应的村编号传给后台*/
                /*let paramsName;
                for(let j=0;j<datass.length;j++){
                    if(params.value==datass[j].name){
                        paramsName=datass[j].number;
                    }
                }
                console.log(paramsName);*/
                let nameList4=$("#nameList4")
                $.ajax({
                    url:url+"/help/health/child/people",
                    method:"post",
                    dataType:"json",
                    data:{"year":year,"type":3,"disctId":codes},
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