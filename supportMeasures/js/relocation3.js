$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    let villagCode=villageCode;
    let villagName=villageName;
    $(".fpVill").html(villageName);
    /*村易地搬迁实施情况统计*/
    var disctId = villagCode;
    var villName = villagName;
    console.log(villagName)
    var village = "";
    $("#villN").html(villName)
    $("#villagName").text(villagName);
    $("#villagName2").text(villagName);
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        //let name1=villagName+"易地搬迁实施情况统计";
        $.ajax({
            url:url+"/place/vill/query",
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
                        center: ['50%', '50%'],
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

    // var dom2 = document.getElementById("module-2");
    // var myChart2= echarts.init(dom2);
    industryPoverty2();
    function industryPoverty2(){
        var str ='';
          $.ajax({
            url:url+"/place/vill/query",
            method:"get",
            dataType:"json",
            data:{"cityName":disctId},
            success:function (result) {
               let data= result.data[4][0];
               for(let i = 0; i < data.noDetail.length; i++){
                   str +=`
                   	<li>
                            <div>${data['noDetail'][i].POVERTY_NAME}</div>
                            <div>${data['noDetail'][i].CHECKIN_TIME}</div>
                        </li>
                   `
               }
                for(let i = 0; i < data.ongoDetail.length; i++){
                    str +=`
                   	<li>
                            <div>${data['ongoDetail'][i].POVERTY_NAME}</div>
                            <div>${data['ongoDetail'][i].CHECKIN_TIME}</div>
                        </li>
                   `
                }
                for(let i = 0; i < data.reachDetail.length; i++){
                    str +=`
                   	<li>
                            <div>${data['reachDetail'][i].POVERTY_NAME}</div>
                            <div>${data['reachDetail'][i].CHECKIN_TIME}</div>
                        </li>
                   `
                }
              $("#poveries").html(str);
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
        var yHeight='38%';
        let datass;
        let datass2;
        var paramsNum;
        $.ajax({
            url:url+"/place/vill/query",
            method:"post",
            dataType:"json",
            data:{"cityName":disctId},
            success:function (result) {
                // console.log(result)
                let data=result.data[1];
                var pieRadius=['45%', '62%'];
                var yHeight='40%';
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
                        bottom: '25%',
                        containLabel: true
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
                        center:["50%","50%"],
                        color: ['#DD4F43','#FFCE43','#1FA463'],
                        label: {
                            normal: {
                                position: 'center',
                                formatter: "{b}:{c}户",
                                textStyle: {
                                    color:"#fff",
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

    myChart3.on("click", eConsole3);
    function eConsole3(param) {
        // if(param.dataIndex==0){
        //     var m1 = [];
        //     var m2 = [];
        //     var m11 = [];
        //     var m21 = [];
        //     var m111 = [];
        //     var m211 = [];
        // //集中安置 县区
        //     $.ajax({
        //         url:url+'place/no/query',
        //         method:"post",
        //         dataType:"json",
        //         data:{'cityNo':disctId,'placement':'0'},
        //         success:function (result) {
        //             if(result.code==2000){
        //                 for(let i = 0; i < result.data.length; i++ ){
        //                     m1[i] = result.data[i].AAA011;
        //                     m2[i] = result.data[i].AAR009;
        //                 }
        //                 show21(myChart16,result);
        //             }
        //         }
        //     })
        //     $(".pop-up3").css({"opacity":"1","top":"50%"});
        //     /*点击县到镇*/
        //     myChart16.on("click",function(params){
        //         var kk;
        //         //alert(params.value)
        //         for(let i = 0; i < m2.length;i++ ){
        //             if(params.value == m2[i]){
        //                 kk=i;
        //             }
        //         }
        //      //   console.log(params)
        //        $.ajax({
        //         url:url+'place/no/query',
        //         method:"post",
        //         dataType:"json",
        //         data:{'cityNo':m2[kk],'placement':'0'},
        //         success:function (result) {
        //             if(result.code==2000){
        //                 for(let i = 0; i < result.data.length; i++ ){
        //                     m11[i] = result.data[i].AAA011;
        //                     m21[i] = result.data[i].AAR009;
        //                 }
        //                 show21(myChart17,result);
        //             }
        //         }
        //     })
        //         if(params.componentType == "xAxis"){
        //             $("#countyName5").text(params.value);
        //             $(".container>.box").css({"opacity":"1","top":"0"});
        //             $(".pop-up3").css({"opacity":0,"top":"-100%"});
        //             $(".pop-up14").css({"opacity":"1","top":"50%"});
        //         }else{
        //         }
        //     })
        //     /*点击村到户*/
        //     myChart17.on("click",function(params){
        //     var kk;
        //     //alert(params.value)
        //     for(let i = 0; i < m21.length;i++ ){
        //         if(params.value == m21[i]){
        //             kk=i;
        //         }
        //     }
        //        var hongbin = $("#hongbin");
        //      $.ajax({
        //         url:url+'place/no/query',
        //         method:"post",
        //         dataType:"json",
        //         data:{'cityNo':m21[kk],'placement':'0'},
        //         success:function (result) {
        //             if(result.code==2000){
        //                 show21table(hongbin,result);
        //             }
        //         }
        //     })
        //         if(params.componentType == "xAxis"){
        //             $("#houseName3").text(params.value);
        //             $(".pop-up15").css({"opacity":0,"top":"-100%"});
        //             $(".pop-up16").css({"opacity":"1","top":"50%"});
        //             // alert("单击了"+params.value+"x轴标签");
        //         }else{
        //             // alert("单击了"+params.name+"柱状图");
        //         }
        //     })
        // }else if(param.dataIndex==1){
        // var n1 = [];
        // var n2 = [];
        // $(".pop-up20").css({"opacity":"1","top":"50%"});
        // $.ajax({
        //     url:url+'place/ongo/query',
        //     method:"post",
        //     dataType:"json",
        //     data:{'cityNo':disctId,'placement':'1'},
        //     success:function (result) {
        //         if(result.code==2000){
        //             for(let i = 0; i < result.data.length; i++ ){
        //                 n1[i] = result.data[i].AAA011;
        //                 n2[i] = result.data[i].AAR009;
        //             }
        //             show20(myChart21,result,village);
        //         }
        //     }
        // })
        // myChart21.on("click",function(params){
        //    var kk;
        //     //alert(params.value)
        //     for(let i = 0; i < n2.length;i++ ){
        //         if(params.value == n2[i]){
        //             kk=i;
        //         }
        //     }
        //     //console.log(params)
        //  $.ajax({
        //     url:url+'place/ongo/query',
        //     method:"post",
        //     dataType:"json",
        //     data:{'cityNo':n1[kk],'placement':'1'},
        //     success:function (result) {
        //         if(result.code==2000){
        //              for(let i = 0; i < result.data.length; i++ ){
        //                 n11[i] = result.data[i].AAA011;
        //                 n21[i] = result.data[i].AAR009;
        //             }
        //             show20(myChart22,result);
        //             //alert("2123")
        //         }
        //     }
        // })
        //     if(params.componentType == "xAxis"){
        //         $("#countyName9").text(params.value);
        //         $(".pop-up20").css({"opacity":0,"top":"-100%"});
        //         $(".pop-up21").css({"opacity":"1","top":"50%"});
        //     }else{
        //         // alert("单击了"+params.name+"柱状图");
        //     }
        // })
        /*点击村到户*/
        var xiaomin = $("#xiaomin");
        $.ajax({
            url: url + '/place/concent/query',
            method: "post",
            dataType: "json",
            data: {'cityNo': villagCode, 'placement': '1'},
            success: function (result) {
                if (result.code == 2000) {
                    // show22table(xiaomin,result);
                    showList(xiaomin, result);
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
        if (1) {
            $("#villageName6").text(villagName);
            $(".container>.box").css({"opacity": "1", "top": "0"});
            $(".pop-up22").css({"opacity": 0, "top": "-100%"});
            $(".pop-up23").css({"opacity": "1", "top": "50%"});
            // alert("单击了"+params.value+"x轴标签");
        } else {
            // alert("单击了"+params.name+"柱状图");
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

        function showList(obj, data) {
            console.log(data.data)
            obj.empty();
            let str = "";
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
    }

        /*************************************************分散安置***********************************************/
        let dom4 = document.getElementById("module-4");
        let myChart4 = echarts.init(dom4);
        industryPoverty4();

        function industryPoverty4() {
            $.ajax({
                url: url + "/place/vill/query",
                method: "get",
                dataType: "json",
                data: {"cityName": disctId},
                success: function (result) {
                    // console.log(result)
                    let data = result.data[2];
                    var pieRadius = ['45%', '62%'];
                    var yHeight = '38%';
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
                    let count= data[0].fsno+data[0].fsongoing+data[0].fsreach;
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
                            data: ['未启动', '未入住', '已入住'],
                            x: 'right',
                            y: "4%",
                            selectedMode:false,
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
                            center: ["50%", "50%"],
                            color: ['#DD4F43', '#FFCE43', '#1FA463'],
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
                        myChart4.setOption(option, true);
                    }
                }
            })

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
           /* var dom35 = document.getElementById("module-35"); //正
            var myChart35 = echarts.init(dom35);*/
            var hongda = $("#hongda");//未启动 户
            var zhengqiang = $("#zhengqiang");//完成
            myChart4.on("click", eConsole4);

            function eConsole4(param) {
                /********************分散安置未启动*****************************/
                var n1 = [];
                var n2 = [];
                var n11 = [];
                var n21 = [];
                var n111 = [];
                var n211 = [];
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $(".pop-up35").css({"opacity": "1", "top": "50%"});
                //集中安置 县区
                /*$.ajax({
                    url:url+'/place/concent/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':villagCode,'placement':'0'},
                    success:function (result) {
                        if(result.code==2000){
                            for(let i = 0; i < result.data.length; i++ ){
                                n1[i] = result.data[i].AAA011;
                                n2[i] = result.data[i].AAR009;
                            }
                            show30(myChart29,result);
                        }
                    }
                })
                /!*点击县到镇*!/
                myChart29.on("click",function(params){
                   var gg;
                    //alert(params.value)
                    for(let i = 0; i < n2.length;i++ ){
                        if(params.value == n2[i]){
                            gg=i;
                        }
                    }
                    //console.log(params)
                 $.ajax({
                    url:url+'/place/ongo/query',
                    method:"post",
                    dataType:"json",
                    data:{'cityNo':n1[gg],'placement':'0'},
                    success:function (result) {
                        if(result.code==2000){
                             for(let i = 0; i < result.data.length; i++ ){
                                n11[i] = result.data[i].AAA011;
                                n21[i] = result.data[i].AAR009;
                            }
                            show30(myChart30,result);
                            //alert("2123")
                        }
                    }
                })
                    if(params.componentType == "xAxis"){
                        $("#countyName15").text(params.value);
                        $(".pop-up32").css({"opacity":0,"top":"-100%"});
                        $(".pop-up33").css({"opacity":"1","top":"50%"});
                    }else{
                        // alert("单击了"+params.name+"柱状图");
                    }
                })
                /!*点击镇到村*!/
                myChart30.on("click",function(params){
                    var gg;
                       for(let i = 0; i < n21.length;i++ ){
                        if(params.value == n21[i]){
                            gg=i;
                        }
                    }
                    $.ajax({
                        url:url+'/place/ongo/query',
                        method:"post",
                        dataType:"json",
                        data:{'cityNo':n11[gg],'placement':'0'},
                        success:function (result) {
                            if(result.code==2000){
                                for(let i = 0; i < result.data.length; i++ ){
                                    n111[i] = result.data[i].AAA011;
                                    n211[i] = result.data[i].AAR009;
                                }
                                show30(myChart31,result);
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
                    }*/
                // })
                /*点击村到户*/
                // myChart35.on("click", function (params) {
                    var gg;
                    var lele = $("#lele")
                    for (let i = 0; i < n211.length; i++) {
                        if (params.value == n211[i]) {
                            gg = i;
                        }
                    }
                    $.ajax({
                        url: url + '/place/concent/query',
                        method: "post",
                        dataType: "json",
                        data: {'cityNo': n111[gg], 'placement': '0'},
                        success: function (result) {
                            if (data.code = 2000) {
                                // show30table(xiaomin1,result);
                                showList(lele, result);
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
                    if (1) {
                        $("#villageName7").text(villagName);
                        $(".pop-up34").css({"opacity": 0, "top": "-100%"});
                        $(".pop-up35").css({"opacity": "1", "top": "50%"});
                        // alert("单击了"+params.value+"x轴标签");
                    } else {
                        // alert("单击了"+params.name+"柱状图");
                    }
                // })
            }

            /****************************分散安置正在实施的县（29）、镇（30）、村（31）的渲染*********************************/
            function show30(obj, data) {
                //  alert("dasd");
                var n2 = [];
                var n3 = [];
                for (let i = 0; i < data.data.length; i++) {
                    n2[i] = data.data[i].AAR009;
                    n3[i] = data.data[i].reach;
                }
                //alert(n3);
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
                                    fontSize: graph_x
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
                                    barBorderRadius: [3, 3, 0, 0]
                                },

                                normal: {
                                    //柱形图圆角，初始化效果
                                    barBorderRadius: [3, 3, 0, 0]
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
                let str = "";
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

        /*************************受益户数和受益人数占比及比重*****************************************/
        var dom5 = document.getElementById("module-5");
        var myChart5 = echarts.init(dom5);
        industryPoverty5();

        function industryPoverty5() {
            var pieRadius = ['45%', '62%'];
            var yHeight = '38%';
            $.ajax({
                url: url + "/place/vill/query",
                method: "get",
                dataType: "json",
                data: {"cityName": disctId},
                success: function (result) {
                    let data = result.data[3];
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
                                data: ['集中安置', '分散安置'],
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
                                    rotate: 0,
                                    fontSize: graph_x
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
                                minInterval:1.,
                                axisLabel: {
                                    formatter: '{value} '
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
                                data: [data[0].jzhouse, data[0].fshouse]
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
                                data: [data[0].jznumber, data[0].fsnumber]
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
        /*var dog34 = document.getElementById("module-34"); // 村
        var myChart34 = echarts.init(dog34);*/
        var type;
        myChart5.on("click", function (params) {
            console.log(params)
            if (params.value == "集中安置") {
                type = 1;
            } else {
                type = 0;
            }
            var k1 = [];
            var k2 = [];
            var k11 = [];
            var k21 = [];
            let lele2=$("#lele2")
            $.ajax({
                url: url + '/place/concent/query',
                method: "get",
                dataType: "json",
                data: {'cityNo': villagCode, 'placement': type},
                success: function (result) {
                    if (result.code == 2000) {
                        for (let i = 0; i < result.data.length; i++) {
                            k1[i] = result.data[i].AAA011;
                            k2[i] = result.data[i].AAR009;
                        }
                        // showConcent(myChart33, result);
                        showList(lele2, result);
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
                }
            })
            if (params.componentType == "xAxis") {
                $(".container>.box").css({"opacity": "1", "top": "0"});
                $("#countyName").text(params.value);
                $(".pop-up38").css({"opacity": "1", "top": "50%"});
                // alert("单击了"+params.value+"x轴标签");
            } else {
                // alert("单击了"+params.name+"柱状图");
            }

            // myChart33.on("click", function (params) {
            //     var gg;
            //     //alert(params.value)
            //     for (let i = 0; i < k2.length; i++) {
            //         if (params.value == k2[i]) {
            //             gg = i;
            //         }
            //     }
            //     $.ajax({
            //         url: url + '/place/concent/query',
            //         method: "get",
            //         dataType: "json",
            //         data: {'cityNo': k1[gg], 'placement': type},
            //         success: function (result) {
            //             if (result.code == 2000) {
            //                 showConcent(myChart34, result);
            //                 //alert("wqw");
            //             }
            //         }
            //     })
            //
            //     if (params.componentType == "xAxis") {
            //         $("#countyName19").text(params.value);
            //         $("#placeName3").text($("#placeName").text());
            //         $(".pop-up37").css({"opacity": 0, "top": "-100%"});
            //         $(".pop-up38").css({"opacity": "1", "top": "50%"});
            //         // alert("单击了"+params.value+"x轴标签");
            //     } else {
            //         // alert("单击了"+params.name+"柱状图");
            //     }
            // })
        })
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
        function showConcent(obj, data) {
            obj.innerHTML = "";
            console.log(data)
            var n2 = [];
            var n3 = [];
            var n4 = [];
            for (let i = 0; i < data.data.length; i++) {
                n2[i] = data.data[i].AAR009;
                n3[i] = data.data[i].jzHouse;
                n4[i] = data.data[i].jzNumber;
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
                    trigger: 'axis'
                },
                legend: {
                    x: '60%',
                    top: 10,
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
                    left: '2%',
                    right: '5%',
                    bottom: '13%',
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'value',
                        name: '受益户数',
                        axisLabel: {
                            formatter: '{value} 万',
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

                        axisLabel: {
                            formatter: '{value} 万'
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
})