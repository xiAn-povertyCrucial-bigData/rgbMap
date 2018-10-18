/*
* @Author: 22
* @Date:   2018-06-24 14:29:17
* @Last Modified by:   万怡佩
* @Last Modified time: 2018-08-30 09:41:31
*/
// cntySeven/target
var url=config.url;
/********************************************************区县数据请求************************************************************/
function Array_max(arr){
     return Math.max.apply(Math,arr);
}

function GKJS(ourl){//概况介绍
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            //console.log(data);
            $('.wordExp span').append(data);
        }
    })
}
function VGKJS(ourl){//概况介绍
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            var adata=data.pkgd[0];
            //console.log(adata)
            $('.v-name').append(villageName);
            $('.C-name').append(data.pkx);
            $('.v-area').append(adata.AAD019);
            $('.v-family').append(adata.AAD005);
            $('.All-person').append(adata.AAD010);
            $('.poor-family').append(data.zxpkh);
            $('.poor-person').append(data.pkrks);
            $('.db-family').append(data.dbh);
            $('.wb-family').append(data.wbh);
        }
    })
}


function XXTJ(name){//全市贫困信息统计
    var j=1;
    $.ajax({
        url:url+'/city/totalInfo',
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            var adata=data.贫困户;
            //贫困户{PEOPLE: 48668, HOUSE: 19899}
            $('#totalInfo .num1').append(data.贫困县);
            $('#totalInfo .num2').append(data.贫困村);
            $('#totalInfo .num4').append(adata.HOUSE);
            $('#totalInfo .num401').append(adata.PEOPLE);
        }
    })

    $.ajax({
        url:url+'/visual/housePeopleNumber',
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            //贫困户{PEOPLE: 48668, HOUSE: 19899}
            $('#totalInfo .num3').append(data.HOUSENUMBER);
            $('#totalInfo .num301').append(data.PEOPLENUMBER);
        }
    })
}
function CountryXXTJ(ourl){//各区县贫困信息统计
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            var adata=data.贫困户和贫困人口数;
            //console.log(result)
            $('#totalInfo .Totalnum').append(data.贫困村总数);
            $('#totalInfo .num4').append(adata.户数);
            $('#totalInfo .num401').append(adata.人口数);
        }
    })
    getCode(url,countryName);
    $.ajax({
        url:url+'/visual/housePeopleNumber',
        type:"get",
        dataType:"json",
        data:{"aar009_x":codes},
        success:function (result) {
            var data=result.data;
            //贫困户{PEOPLE: 48668, HOUSE: 19899}
            $('#totalInfo .num3').append(data.HOUSENUMBER);
            $('#totalInfo .num301').append(data.PEOPLENUMBER);
        }
    })
}
function VillageXXTJ(ourl){//村贫困信息统计
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            var adata=data.贫困户和贫困人口
            // //console.log(result)
            $('#totalInfo .num4').append(adata.户数);
            $('#totalInfo .num401').append(adata.人口数);
        }
    })
    getCode(url,countryName);
    $.ajax({
        url:url+'/visual/housePeopleNumber',
        type:"get",
        dataType:"json",
        data:{"aar009_x":codes,"aar009_c":villageCode},
        success:function (result) {
            var data=result.data;
            //贫困户{PEOPLE: 48668, HOUSE: 19899}
            $('#totalInfo .num3').append(data.HOUSENUMBER);
            $('#totalInfo .num301').append(data.PEOPLENUMBER);
        }
    })
}


function TPGJ(ourl){//脱贫轨迹
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            /*console.log(data);*/
            var Xdata=[],Ydata=[];
            //console.log(data);
            var dom1 = document.getElementById("echarts-1");
            var myChart1 = echarts.init(dom1);
            for (var key in data)
            {
                Xdata.push(key);
                Ydata.push(data[key]);
            }
            option = {
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [
                    {
                        type: 'category',
                        data: Xdata,
                        axisLabel:{
                            interval:0,
                            rotate:-30,
                            textStyle:{
                                fontSize:fontSize
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
                    left: left2,
                    top: top2,
                    right: right2,
                    bottom: bottom2,
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'value',
                        // name: '(人)',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}',
                            textStyle:{
                                fontSize:fontSize,
                                color:'#fff'
                            }
                        },
                        axisLine:{
                            lineStyle:{
                                color:'#fff',
                            }
                        },
                        boundaryGap: false,
                        splitLine:{
                          show:false
                        },
                    }
                ],
                calculable: true,
                series: [
                    {
                        name:'贫困人数',
                        type:'line',
                        label: {
                            normal: {
                                show: false,
                                position: 'top',
                                fontSize: fontSize
                            }
                        },
                        data:Ydata,
                        itemStyle: {
                            normal: {
                                //柱形图圆角，初始化效果
                                lineStyle:{
                                    width:3,//折线宽度
                                    color:"#FF0000",//折线颜色
                                }
                            }
                        }

                    },

                ]
            };
            if (option && typeof option === "object") {
                myChart1.setOption(option, true);
            }
        }
    })
}
function PKHSX(ourl){//贫困户属性分析
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            data=data[data];
            var pieRadius=['0', '55%'];
            // var yHeight='0%';
            var dom3 = document.getElementById("echarts-3");
            var myChart3 = echarts.init(dom3);
            $.ajax({
                url:ourl, //'http://192.168.0.195:9999/poverty-web-1.0-SNAPSHOT/city/pkhProperty'
                type:"get",
                dataType:"json",
                data:{},
                success:function (result) {
                    var data3=result.data;
                    var Xdata3=[],Ydata3=[];
                    for (var key in data3)
                    {
                        Xdata3.push(key);
                        var temp = {"value":data3[key],"name":key};
                        Ydata3.push(temp);
                    }
                    option = {
                        /*legend: {
                            data: Xdata3,
                            x: 'center',
                            y:"86%",
                            textStyle:{    //图例文字的样式
                                color:'#fff'
                            }
                        },*/
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            position:"center",
                            formatter: "{b}: {c} 户({d}%)"
                        },
                        series: [{
                            type: 'pie',
                            selectedMode: 'single',
                            radius: pieRadius,
                            center: ['52%', '50%'],
                            color: ['#0340fc','#1fb1e7','#edac56'],
                            label: {
                                normal: {
                                    position: 'outer',
                                    formatter: '{b}\n{d}%',
                                    textStyle: {
                                        color: '#ffffff',
                                        fontSize: fontSize
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                }
                            },
                            data: Ydata3
                        }]
                    };
                    if (option && typeof option === "object") {
                        myChart3.setOption(option, true);
                    }
                }
            })
        }
    })
}
function ZPYY(ourl){//贫困户主要致贫原因
    var dom4 = document.getElementById("echarts-4");
    var myChart4= echarts.init(dom4);
    let pieRadius=['0', '50%'];
    let yHeight='35%';
    let arr=[];
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data4=result.data;
            var Xdata4=[],Ydata4=[];
            for (var key in data4){
                Ydata4.push(data4[key]);
            }
            var Xdatas=[{"name":"因病","value":Ydata4[11]},{"name":"因残","value":Ydata4[1]},{"name":"因学","value":Ydata4[10]},{"name":"因灾","value":Ydata4[3]},{"name":"缺土地","value":Ydata4[2]},{"name":"缺水","value":Ydata4[5]},{"name":"缺技术","value":Ydata4[0]},{"name":"缺劳力","value":Ydata4[6]},{"name":"缺资金","value":Ydata4[9]},{"name":"交通条件落后","value":Ydata4[7]},{"name":"自身发展动力不足","value":Ydata4[4]},{"name":"其他","value":Ydata4[8]},];
            option = {
                color:  ['#e54500','#075682','#4598ff','#958e67','#ffb176','#fff080','#2a857c','#9c2e42','#4b4ce6','#7cd2f9','#9c4d2e','#ff9950'],
                tooltip: {
                    show: true,
                    trigger: 'item',
                    position:"center",
                    formatter: "{b}: {c} 户({d}%)"
                },
                series: [{
                    type: 'pie',
                    selectedMode: 'single',
                    radius: pieRadius,
                    center: ['45%', '55%'],
                    color:  ['#e54500','#075682','#4598ff','#958e67','#ffb176','#fff080','#2a857c','#9c2e42','#4b4ce6','#7cd2f9','#9c4d2e','#ff9950'],
                    label: {
                        normal: {
                            position: 'outer',
                            formatter: '{b}\n{d}%',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: fontSize
                            },
                            length:0
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                        }
                    },
                    data: Xdatas
                }]
            };
            if (option && typeof option === "object") {
                myChart4.setOption(option, true);
            }
        }
    })
}
function SEVEN(ourl){//贫困信息统计
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            for(var i in data){
                $('#totalInfo').append("<div class='item-1 item'><p class='words-1'>"+i+"</p><p class='words-2'><span class='num'>"+data[i]+"个"+"</span></p></div>")
            }
        }
    })
}
function ZZTCZB(ourl,code){//周至县七项退出指标
    //console.log(obj[0])
    var arr=['贫困发生率','通沥青（水泥）路','电力入户率','新农合及大病保险','人均可支配收入','自来水普及率','安全住房'];
    $.ajax({
        url:ourl,
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            // 周至县七项退出指标
            $('.ZZscore').append(data.score);
            $(".aae044 span").append(data.aae044);
            $(".aae323 span").append(data.aae323);
            $(".aae378 span").append(data.aae378);
            $(".aae331 span").append(data.aae331);
            $(".aar014 span").append(data.aar014);
            $(".aae304 span").append(data.aae304);
            $(".aae314 span").append(data.aae314);
            if(data.aae044==0){
                $(".aae044").addClass('RitemReason');Cexitreason($(".aae044"),data.aae044Reason,arr[4]);
            }else{$(".aae044").addClass('GitemReason');Cexitreason($(".aae044"),data.aae044Reason,arr[4])}
            if(data.aae323==0){
                $(".aae323").addClass('RitemReason');Cexitreason($(".aae323"),data.aae323Reason,arr[2]);
            }else{$(".aae323").addClass('GitemReason');Cexitreason($(".aae323"),data.aae323Reason,arr[2])}
            if(data.aae378==0){
                $(".aae378").addClass('RitemReason');Cexitreason($(".aae378"),data.aae378Reason,arr[3]);
            }else{$(".aae378").addClass('GitemReason');Cexitreason($(".aae378"),data.aae378Reason,arr[3])}
            if(data.aae331==0){
                $(".aae331").addClass('RitemReason');Cexitreason($(".aae331"),data.aae331Reason,arr[6]);
            }else{$(".aae331").addClass('GitemReason');Cexitreason($(".aae331"),data.aae331Reason,arr[6])}
            if(data.aar014==0){
                $(".aar014").addClass('RitemReason');Cexitreason($(".aar014"),data.aar014Reason,arr[0]);
            }else{$(".aar014").addClass('GitemReason');Cexitreason($(".aar014"),data.aar014Reason,arr[0])}
            if(data.aae304==0){
                $(".aae304").addClass('RitemReason');Cexitreason($(".aae304"),data.aae304Reason,arr[1]);
            }else{$(".aae304").addClass('GitemReason');Cexitreason($(".aae304"),data.aae304Reason,arr[1])}
            if(data.aae314==0){
                $(".aae314").addClass('RitemReason');Cexitreason($(".aae314"),data.aae314Reason,arr[5]);
            }else{$(".aae314").addClass('GitemReason');Cexitreason($(".aae314"),data.aae314Reason,arr[5])}
        }
    })
}
function FPZJ(ourl){//扶贫资金
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            var EverData=data.SpecialPovertyAid;
            var TotalData=data.SpecialTotal;
            var Xdata=[],Ydata1=[],Ydata2=[],Ydata3=[],YTdata=[];
            for(var i=0;i<EverData.length;i++){
                Xdata.push(EverData[i].zeroYear);
                Ydata1.push(EverData[i].centralPovertyFund);
                Ydata2.push(EverData[i].cityPovertyFund);
                Ydata3.push(EverData[i].provincialPovertyFund);
                YTdata.push(TotalData[i].totalNumber);
            }
            var dom2 = document.getElementById("echarts-2");
            var myChart2 = echarts.init(dom2);
            option = {
                tooltip: {
                    trigger: 'axis',
                    position: ['40%','10%'],
                },
                color:['#0340fc','#1fb1e7','#edac56','#ffe450'],
                legend: {
                    textStyle: {
                        color: '#fff',
                    },
                    // data: ['总轴','中央', '省级', '市级']
                },
                grid: {
                    left: left2,
                      top: top2,
                      right: right2,
                      bottom: bottom2,
                    containLabel: true
                },
                xAxis: [
                   {
                        type: 'category',
                        data: Xdata,
                        axisLabel:{
                        interval:0,
                        rotate:-30,
                         textStyle:{
                            fontSize:fontSize
                        }
                    },
                        axisLine:{
                            lineStyle:{
                                color:'#fff'
                            }
                        }
                    }
               ],
               yAxis: [
                 {
                        type: 'value',
                        // name: '万元',
                        min: 0,
                        axisLabel: {
                            formatter: '{value}',
                            textStyle:{
                                fontSize:fontSize
                            }
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
               calculable: true,
               series: [
                    {
                       name: "总轴",
                       type: "line",
                       data: YTdata,
                        itemStyle: {
                            normal: {
                                lineStyle:{
                                    width:3,//折线宽度
                                }
                            }
                        }

                   },
                   {
                       name: "中央",
                       type: "line",
                       data: Ydata1,
                        itemStyle: {
                            normal: {
                                //柱形图圆角，初始化效果
                                lineStyle:{
                                    width:3,//折线宽度
                                }
                            }
                        }

                   },
                   {
                       name: "省级",
                       type: "line",
                       data: Ydata3,
                        itemStyle: {
                            normal: {
                                //柱形图圆角，初始化效果
                                lineStyle:{
                                    width:3,//折线宽度
                                }
                            }
                        }

                   },
                   {
                       name: "市级",
                       type: "line",
                       data: Ydata2,
                        itemStyle: {
                            normal: {
                                //柱形图圆角，初始化效果
                                lineStyle:{
                                    width:3,//折线宽度
                                }
                            }
                        }

                   }
               ]
            };
            if (option && typeof option === "object") {
                myChart2.setOption(option, true);
            }
        }
    })
}

/******************************土地资源******************************/
function  getLand(countyName){
    var echarts30=echarts.init(document.getElementById("echarts-30"));

    if(countyName=='西安市'){
        data= {"page_index":1,"page_size": 50,"aar040":201808}
    }else {
        getCode(url,countyName);
        data= {"page_index":1,"page_size": 50,"aar040":201808,"aar001":codes}
    }

    $.ajax({
        url: url + "/povStat/holdarea",
        data: data,
        method: "get",
        dataType: "json",
        success: function(data){
                if(data.code == 2000){
                    var n = data.data.list.length;
                    option = {
                        color:  ['#e54500','#075682','#4598ff','#958e67','#ffb176','#fff080','#2a857c','#9c2e42','#4b4ce6','#7cd2f9','#9c4d2e','#ff9950'],
                        tooltip: {
                            show: true,
                            trigger: 'item',
                            position:"center",
                            formatter: "{b}: {c} 户({d}%)"
                        },
                        series: [{
                            name: '贫困户土地资源情况',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            selectedMode: 'single',
                            color:  ['#e54500','#075682','#4598ff','#958e67','#ffb176','#fff080','#2a857c','#9c2e42','#4b4ce6','#7cd2f9','#9c4d2e','#ff9950'],
                            label: {
                                normal: {
                                    position: 'outer',
                                    formatter: '{b}\n{d}%',
                                    textStyle: {
                                        color: '#ffffff',
                                        fontSize: fontSize
                                    },
                                    length:0
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true,
                                }
                            },
                            data: [
                                {value:data.data.list[n-1].A, name:'耕地面积'},
                                {value:data.data.list[n-1].B, name:'有效灌溉面积'},
                                {value:data.data.list[n-1].C, name:'林地面积'},
                                {value:data.data.list[n-1].D, name:'退耕还林面积'},
                                {value:data.data.list[n-1].E, name:'林果面积'},
                                {value:data.data.list[n-1].G,name:'水域面积'}
                            ],
                        }]
                    };
                    echarts30.setOption(option);
                }
        }
    })
}
function  getLand2(countyName){
    var echarts30=echarts.init(document.getElementById("echarts-30"));
    // getCode(url,countyName);
    data= { "page_index":1,"page_size": 50,"aar040":201808,"aar003":countyName}
    $.ajax({
        url: url + "/povStat/holdarea",
        data: data,
        method: "get",
        dataType: "json",
        success: function(data){
            if(data.code == 2000){
                var n = data.data.list.length;
                option={
                    color:  ['#e54500','#075682','#4598ff','#958e67','#ffb176','#fff080','#2a857c','#9c2e42','#4b4ce6','#7cd2f9','#9c4d2e','#ff9950'],
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"center",
                        formatter: "{b}: {c} 户({d}%)"
                    },
                    series: [{
                        name: '贫困户土地资源情况',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        selectedMode: 'single',
                        color:  ['#e54500','#075682','#4598ff','#958e67','#ffb176','#fff080','#2a857c','#9c2e42','#4b4ce6','#7cd2f9','#9c4d2e','#ff9950'],
                        label: {
                            normal: {
                                position: 'outer',
                                formatter: '{b}\n{d}%',
                                textStyle: {
                                    color: '#ffffff',
                                    fontSize: fontSize
                                },
                                length:0
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                            }
                        },
                        data: [
                            {value:data.data.list[n-1].A, name:'耕地面积'},
                            {value:data.data.list[n-1].B, name:'有效灌溉面积'},
                            {value:data.data.list[n-1].C, name:'林地面积'},
                            {value:data.data.list[n-1].D, name:'退耕还林面积'},
                            {value:data.data.list[n-1].E, name:'林果面积'},
                            {value:data.data.list[n-1].G,name:'水域面积'}
                        ],
                    }]
                }
                echarts30.setOption(option);
            }
        }
    })
}

/******************************人口规模/生产生活/健康状况/劳动力类型******************************/
function  getPopulation(countyName,obj,ourl,Xdata,oname){
    var echarts40=echarts.init(document.getElementById(obj));
    if(countyName=='西安市'){
        odata={ "page_index":1,"page_size": 50,"aar040":201808}
        //console.log(data)
    }else {
        getCode(url,countyName);
        odata={ "page_index":1,"page_size": 50,"aar040":201808,"aar001":codes}
        // console.log(data)
    }
    $.ajax({
        url: url + ourl,
        data: odata,
        method: "get",
        dataType: "json",
        success: function(data){
                if(data.code == 2000){
                    var n = data.data.list.length-1;
                    option1={
                        tooltip: {
                            formatter: "{a} <br/>{b}: {c}户" // 这里是鼠标移上去的显示数据
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                axisLabel: {
                                    interval:0,
                                    rotate:-30,
                                    textStyle:{
                                        fontSize:fontSize,
                                        color: '#fff'
                                    }
                                },
                                data: Xdata,
                            }
                        ],
                        grid:[
                            {
                                left: '15%',
                                top: 50,
                                right: '10%',
                                bottom: 40,
                            }
                        ],
                        yAxis : {
                            type: 'value',
                            // name:'(户)',
                            axisLabel:{
                                textStyle:{
                                    fontSize:fontSize,
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#fff']
                                }
                            },
                            splitLine:{
                                show:false
                            }
                        },
                        series : [
                            {
                                name:oname,
                                type:'bar',
                                barWidth : 20,
                                stack: '广告',
                                data:[data.data.list[n].A, data.data.list[n].B, data.data.list[n].C, data.data.list[n].D, data.data.list[n].E, data.data.list[n].F]
                            }
                        ],
                        color: ['#39A2B2','#20B8B4','#6ED1B2','#68E39D','#A6F093','#F9CF86','#FD9FB6','#ee7694']
                    }
                    echarts40.setOption(option1);
                }
        }
    })
}
function  getPopulation2(countyName,obj,ourl,Xdata,oname){
    var echarts40=echarts.init(document.getElementById(obj));
    // getCode(url,countyName);
    data= { "page_index":1,"page_size": 50,"aar040":201808,"aar003":countyName}
    $.ajax({
        url: url + ourl,
        data: data,
        method: "get",
        dataType: "json",
        success: function(data){
            if(data.code == 2000){
                //alert('2312')
                var n = data.data.list.length-1;
                if(n>=1){
                    option1={
                        tooltip: {
                            formatter: "{a} <br/>{b}: {c}户" // 这里是鼠标移上去的显示数据
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                axisLabel: {
                                    interval:0,
                                    rotate:0,
                                    textStyle:{
                                        fontSize:fontSize,
                                        color: '#fff'
                                    }
                                },
                                data: ['一人户','二人户','三人户','四人户','五人户','六人户以上'],
                            }
                        ],
                        grid:[
                            {
                                left: '15%',
                                top: 50,
                                right: '10%',
                                bottom: 40,
                            }
                        ],
                        yAxis : {
                            type: 'value',
                            // name:'(户)',
                            axisLabel:{
                                textStyle:{
                                    fontSize:fontSize,
                                    color: '#fff'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: ['#fff']
                                }
                            },
                            splitLine:{
                                show:false
                            }
                        },
                        series : [
                            {
                                name:'贫困户人口规模统计',
                                type:'bar',
                                barWidth : 20,
                                stack: '广告',
                                data:[data.data.list[n].A, data.data.list[n].B, data.data.list[n].C, data.data.list[n].D, data.data.list[n].E, data.data.list[n].F]
                            }
                        ],
                        color: ['#39A2B2','#20B8B4','#6ED1B2','#68E39D','#A6F093','#F9CF86','#FD9FB6','#ee7694']
                    }
                    echarts40.setOption(option1);
                }
            }
        }
    })
}

/**********************编号获取******************************/
function  getCode(url,countyName){
    $.ajax({
        url: url+"/init/disct/name",
        method:"get",
        async: false,
        dataType:"json",
        data:{"name":countyName},
        success:function(data){
            codes = data.data;
           return codes;
        }
    })
}

function FOURTEAM(ourl){//四支队伍
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            var ocaptain=data.队长;
            var oSecretary=data.第一书记;
            var oViceCaptain=data.副队长;
            var oTeamMember=data.队员;
            if(ocaptain[0]){
                for(var i=0;i<ocaptain.length;i++){//队长
                    $('.captain').append('<p>'+ocaptain[i].AAB002+'</p>');
                }
            }else{$('.captain').append('');}
            if (oSecretary[0]) {
                for(var i=0;i<oSecretary.length;i++){//书记
                    $('.Secretary').append('<p>'+oSecretary[i].AAB002+'</p>');
                }
            }else{$('.Secretary').append('');}
            if (oViceCaptain[0]) {
             for(var i=0;i<oViceCaptain.length;i++){//副队长
                 $('.ViceCaptain').append('<p>'+oViceCaptain[i].AAB002+'</p>');
                }
            }
            else{$('.ViceCaptain').append('');}
            $('.ViceCaptain').append('');
            if (oTeamMember[0]) {
                for(var i=0;i<oTeamMember.length;i++){//队员
                    $('.TeamMember').append('<span>'+oTeamMember[i].AAB002+'</span><span style="display: inline-block;width:10px;"></span>');
                }
            }else{$('.TeamMember').append('');}
        }
    })
}
function FOURTEAMDetail(ourl){//四支队伍详情
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            // "data":[{"AAP001":"沙窝村","AAR012":"13468726518","CASE2":"未定职","AAB002":"王建忠","CASE1":"驻村队员"},
            // {"AAP001":"西安高科新达混凝土","AAR012":"17791888367","CASE2":"未定职","AAB002":"李志强","CASE1":"驻村队员"},
            // {"AAP001":"景区管理局","AAR012":"13519118807","CASE2":"空","AAB002":"仝延涛","CASE1":"驻村队员"},
            // {"AAP001":"沙窝村","AAR012":"15991619874","CASE2":"空","AAB002":"吴传举","CASE1":"驻村队员"},
            // {"AAP001":"西安高科新达混凝土","AAR012":"13772443387","CASE2":"未定职","AAB002":"李新锋","CASE1":"队长"}]
            var data=result.data;
            for(var i=0;i<data.length;i++){//队长
                if(data[i].AAR012){
                    $('.logdetail').append('<li><div class="touxiang"><img src='+data[i]['AAK999']+' alt=""></div><div class="contents"><div class="line1"><div class="left"><label for="">姓名:</label><span class="fourName">'+data[i].AAB002+'</span></div><div class="right"><label for="">派出单位：</label><span class="PopCompany">'+data[i].AAP001+'</span></div></div><div class="line1"><div class="left"><label for="">驻村工作队职务:</label><span class="fourPost">'+data[i].CASE1+'</span></div><div class="right"><label for="">派出单位职务：</label><span class="PopPost">'+data[i].CASE2+'</span></div></div><div class="line1"><div class="left"><label for="">联系方式 : </label><span class="FourNum">'+data[i].AAR012+'</span></div></div><div class="line1"><div class="right" style="width:20%;"><a href="dingtalk://dingtalkclient/action/open_profile?staff_id='+data[i]['AAK555']+'&corp_id=ding98d66c2bc4e38c9335c2f4657eb6378f" style="color: #fff;"><img src="images/dingding.png" alt="" style="margin-right:4px;"><label style="cursor: pointer;">钉钉视频</label></a></div></div></div></li>');
                }else{
                    $('.logdetail').append('<li><div class="touxiang"><img src='+data[i]['AAK999']+' alt=""></div><div class="contents"><div class="line1"><div class="left"><label for="">姓名:</label><span class="fourName">'+data[i].AAB002+'</span></div><div class="right"><label for="">派出单位：</label><span class="PopCompany">'+data[i].AAP001+'</span></div></div><div class="line1"><div class="left"><label for="">驻村工作队职务:</label><span class="fourPost">'+data[i].CASE1+'</span></div><div class="right"><label for="">派出单位职务：</label><span class="PopPost">'+data[i].CASE2+'</span></div></div><div class="line1"><div class="left"><label for="">联系方式 : </label><span class="FourNum">暂无信息</span></div></div><div class="line1"><div class="right" style="width:20%;"><a href="dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=yp0215'+data[i].AAK555+'&corp_id=ding98d66c2bc4e38c9335c2f4657eb6378f" style="color: #fff;"><img src="images/dingding.png" alt="" style="margin-right:4px;"><label style="cursor: pointer;">钉钉视频</label></a></div></div></div></li>');
                }
            }
        }
    })
}
function PersonSelect(ourl){//户列表
    $.ajax({
        url:ourl,
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            let homeCode=getQueryString("homeCode");
            PersonbaseInfo(url+'/family/baseInfo?aac001='+homeCode);
            PersonSatiation(url+'/family/satiation?aac001='+homeCode);
            PersonHelpJob(url+'/family/helpJob?number='+homeCode);
            PersonTCZB(url+'/map/five/house/five?aac001='+homeCode+'&year=201808',homeCode);
            HelpMeasures(url+'/helpforhouse/status?aac001='+homeCode+'&year=201808',homeCode);
            // HelpMeasures(data[0].AAC001);
            helpLog(url+'/family/queryhelplog?aac001='+homeCode);
            helpjishi(url+'/visual/fourBooksPhotos?aac001='+homeCode);
            for(var i=0;i<data.length;i++){
                $('#PersonSelect').append('<option value="'+homeCode+'">'+data[i].AAC029+'</option>');
            }
        }
    })
}
function PersonChange(ourl,code){//户改变列表
    $.ajax({
        url:ourl,
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            //console.log(data)
            PersonbaseInfo(url+'/family/baseInfo?aac001='+code);
            PersonSatiation(url+'/family/satiation?aac001='+code);
            PersonHelpJob(url+'/family/helpJob?number='+code);
            PersonTCZB(url+'/map/five/house/five?aac001='+code+'&year=201808',code);
            HelpMeasures(url+'/helpforhouse/status?aac001='+code+'&year=201808',code);
            helpLog(url+'/family/queryhelplog?aac001='+code);
            helpjishi(url+'/visual/fourBooksPhotos?aac001='+code);
        }
    })
}
function SeaechPersonChange(ourl,name,code){//搜索户改变列表
    var arrlength=arguments.length;
    $.ajax({
        url:ourl,
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            PersonbaseInfo(url+'/family/baseInfo?aac001='+code);
            PersonSatiation(url+'/family/satiation?aac001='+code);
            PersonHelpJob(url+'/family/helpJob?number='+code);
            PersonTCZB(url+'/map/five/house/five?aac001='+code+'&year=201808',code);
            HelpMeasures(url+'/helpforhouse/status?aac001='+code+'&year=201808');
            helpLog(url+'/family/queryhelplog?aac001='+code);
            helpjishi(url+'/visual/fourBooksPhotos?aac001='+code);
            $('#PersonSelect').append('<option value="'+code+'">'+name+'</option>');
            for(var i=0;i<data.length;i++){
                if (data[i].AAC001!=code) {
                    $('#PersonSelect').append('<option value="'+data[i].AAC001+'">'+data[i].AAC029+'</option>');
                }
            }
            // $('<option value="'+code+'">'+name+'</option>').insertBefore($('#PersonSelect option:first'));
            // $('#PersonSelect option:first').html(name)
        }
    })
}

function Cexitreason(obj,ReasonTxt,title){//周至县七项退出指标原因
    obj.click(function(){
        /*$(".boxes").show();
        //console.log(ReasonTxt)
        $('.REDreason').html(ReasonTxt);
        $('.CReasonTitle').html(title+'未达标原因');*/
        $('#reason2').text('指标达标情况'+':'+ReasonTxt);
    })
    /*obj.mouseout(function(){
        $(".boxes").hide();
    })*/
}
function Vexitreason(obj,ReasonTxt){//村七项退出指标原因
    obj.click(function(){
        $('#reason2').text('指标达标情况'+':'+ReasonTxt);
    })
}
function helpLog(ourl){//帮扶日志
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            if(result.code==2000){
                var heloLog=$("#heloLog");
                var datas=result.data;
                logList(heloLog,datas);
               /* console.log(datas)
                if (data) {
                    $('.helpLog').append('<li><span class="circle">'+data+'</span><div class="contents">'+data+'</div><div class="date">'+data+'</div></li>');
                }else{
                    $('.helpLog').html('');
                }*/
            }
        }
    })
}
function zhucunLog(ourl){//帮扶日志
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            if(result.code==2000){
                var heloLog=$("#heloLog2");
                var datas=result.data;
                logList2(heloLog,datas);
                /* console.log(datas)
                 if (data) {
                     $('.helpLog').append('<li><span class="circle">'+data+'</span><div class="contents">'+data+'</div><div class="date">'+data+'</div></li>');
                 }else{
                     $('.helpLog').html('');
                 }*/
            }
        }
    })
}
function helpjishi(ourl){//帮扶日志
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            if(result.code==2000){
                var jishi=$(".documentary");
                var datas=result.data;
                jishiList(jishi,datas);
            }
        }
    })
}
function logList(obj,data){
    obj.empty();
    let arr=[];
    for(let i=0;i<data.length;i++){
        arr.push(data[i].ID);
        if(data[i].HELPTIME){
            data[i].HELPTIME=data[i].HELPTIME.substr(0,10);
        }
        let str=`
            <li id="${data[i].ID}">
                <span style="width:30%;">${data[i].AAB002}</span>
                <span style="width:40%;">${data[i].HELPTIME}</span>
                <span style="width:30%;color:#086BC4;cursor:pointer;" class="logDetail">详情</span>
            </li>
        `;
        obj.html(function (i,value) {
            return value+str;
        })
    }
    $("#heloLog").on("click",".logDetail",function(){
        $(".logbox .imglists").empty();
        for(let s=0;s<arr.length;s++){
            if(arr[s]==$(this).parent().attr("id")){
                // console.log(data[s])
                $(".logdetail").show();
                $(".logbox .name span").html(data[s].AAB002);
                $(".logbox .time span").html(data[s].HELPTIME);
                $(".logbox .place span").html(data[s].AAR009_X+data[s].AAR009_Z+data[s].AAR009_C);
                $(".logbox .con span").html(data[s].HELPLOG);
                for(let n=0;n<data[s].IMAGEPATH.length;n++){
                    let imglists=data[s].IMAGEPATH;
                    $(".logbox .imglists").append('<img src='+imglists[n]+' alt="" style="width:46%;height:auto;vertical-align:top;margin-right:6px;margin-bottom:5px;">');
                }
            }
        }
    })
}

function logList2(obj,data){
    obj.empty();
    let arr=[];
    for(let i=0;i<data.length;i++){
        arr.push(data[i].ID);
        if(data[i].HELPTIME){
            data[i].HELPTIME=data[i].HELPTIME.substr(0,10);
        }
        let str=`
            <li id="${data[i].ID}">
                <span style="width:30%;">${data[i].AAB002}</span>
                <span style="width:35%;">${data[i].HELPTIME}</span>
                <span style="width:30%;color:#086BC4;cursor:pointer;" class="logDetail">详情</span>
            </li>
        `;
        obj.html(function (i,value) {
            return value+str;
        })
    }
    $("#heloLog2").on("click",".logDetail",function(){
        $(".logbox .imglists").empty();
        for(let s=0;s<arr.length;s++){
            if(arr[s]==$(this).parent().attr("id")){
                // console.log(data[s])
                $(".logdetails").show();
                $(".logbox .name span").html(data[s].AAB002);
                $(".logbox .time span").html(data[s].HELPTIME);
                $(".logbox .place span").html(data[s].AAR009_X+data[s].AAR009_Z+data[s].AAR009_C);
                $(".logbox .con span").html(data[s].HELPLOG);
                for(let n=0;n<data[s].IMAGEPATH.length;n++){
                    let imglists=data[s].IMAGEPATH;
                    $(".logbox .imglists").append('<img src='+imglists[n]+' alt="" style="width:46%;height:auto;vertical-align:top;margin-right:6px;margin-bottom:5px;">');
                }
            }
        }
    })
}
function jishiList(obj,data){
    obj.empty();
    for(let i=0;i<data.length;i++){
        let str=`
           <li><img src="${data[i]}" alt=""></li>
        `;
        obj.html(function (i,value) {
            return value+str;
        })
    }
    /*$("#heloLog").on("click",".logDetail",function(){
        $(".logbox .imglists").empty();
        for(let s=0;s<arr.length;s++){
            if(arr[s]==$(this).parent().attr("id")){
                // console.log(data[s])
                $(".logdetail").show();
                $(".logbox .name span").html(data[s].AAB002);
                $(".logbox .time span").html(data[s].HELPTIME);
                $(".logbox .place span").html(data[s].AAR009_X+data[s].AAR009_Z+data[s].AAR009_C);
                $(".logbox .con span").html(data[s].HELPLOG);
                for(let n=0;n<data[s].IMAGEPATH.length;n++){
                    let imglists=data[s].IMAGEPATH;
                    $(".logbox .imglists").append('<img src='+imglists[n]+' alt="" style="width:46%;height:auto;vertical-align:top;margin-right:6px;margin-bottom:5px;">');
                }
            }
        }
    })*/
}
/*******************************村信息**************************************/
function VillageTCZB(ourl,code){//村退出指标
    //console.log(obj[0])
    $.ajax({
        url:ourl,
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            console.log(data);
            // 村七项退出指标
            $(".exitTotal").append(data.account);
            $(".aad371 span").append(data.aad371);
            $(".aac331 span").append(data.aac331);
            $(".aae113 span").append(data.aae113);
            $(".aad391 span").append(data.aad391);
            $(".aac313 span").append(data.aac313);
            $(".aac312 span").append(data.aac312);
            $(".aad328 span").append(data.aad328);
            if(data.aad371==0){
                $(".aad371").addClass('RitemReason');Vexitreason($(".aad371"),data.aad371Reason);
            }else{$(".aad371").addClass('GitemReason');Vexitreason($(".aad371"),data.aad371Reason)}
            if(data.aac331==0){
                $(".aac331").addClass('RitemReason');Vexitreason($(".aac331"),data.aac331Reason);
            }else{$(".aac331").addClass('GitemReason');Vexitreason($(".aac331"),data.aac331Reason)}
            if(data.aae113==0){
                $(".aae113").addClass('RitemReason');Vexitreason($(".aae113"),data.aae113Reason);
            }else{$(".aae113").addClass('GitemReason');Vexitreason($(".aae113"),data.aae113Reason)}
            if(data.aad391==0){
                $(".aad391").addClass('RitemReason');Vexitreason($(".aad391"),data.aad391Reason);
            }else{$(".aad391").addClass('GitemReason');Vexitreason($(".aad391"),data.aad391Reason)}
            if(data.aac313==0){
                $(".aac313").addClass('RitemReason');Vexitreason($(".aac313"),data.aac313Reason);
            }else{$(".aac313").addClass('GitemReason');Vexitreason($(".aac313"),data.aac313Reason)}
            if(data.aac312==0){
                $(".aac312").addClass('RitemReason');Vexitreason($(".aac312"),data.aac312Reason);
            }else{$(".aac312").addClass('GitemReason');Vexitreason($(".aac312"),data.aac312Reason)}
            if(data.aad328==0){
                $(".aad328").addClass('RitemReason');Vexitreason($(".aad328"),data.aad328Reason);
            }else{$(".aad328").addClass('GitemReason');Vexitreason($(".aad328"),data.aad328Reason)}
        }
    })
}
/*******************************户所有信息**********************************/
function PersonbaseInfo(ourl){//基本信息
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var Bdata=result.data;
            //console.log(result);//http://192.168.1.195:9999/poverty-web-1.0-SNAPSHOT/family/satiation?aac001=3116413932
            if (Bdata) {
                for(var i=0;i<Bdata.length;i++){
                    //<td>"+Bdata[i].IDNUMBER+"</td>
                    $('#PbaseInfo').append("<tr style='height:30px;'><td>"+Bdata[i].HNAME+"</td><td>"+Bdata[i].SEX+"</td><td>"+Bdata[i].RELASHIP+"</td><td>"+Bdata[i].AAB010+"</td><td>"+Bdata[i].AAB009+"</td><td>"+Bdata[i].AAB017+"</td></tr>");
                }
            }else{
                //alert('基本信息数据为空！')
            }
        }
    })
}
function PersonSatiation(ourl){//基本情况
    var oitem=$('.item span');
    for (var i=0;i<oitem.length;i++) {
        oitem[i].innerHTML="";
    }
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            // console.log(data);
            var BSdata=data.baseInfO;
            var otherData=data.threeTarget[0];
            var aSpan=$(".baseSatiation span");
            //"data":{
            //"baseInfO":{"AAC001":5700000027904973,"CAUSEQI":"交通条件落后","CAUSEMAJOR":"因残","POVSHU":"低保户贫困户","BANQIANYIYUAN":"否","WEIFANG":"否"},
            //"threeTarget":[
            // {"长期慢性病":0,"健康":1,"有劳动能力":0,"残疾":1,"在校生情况":2,"患有大病":0}
            // ]}
            // console.log(BSdata);
            if (BSdata) {
                aSpan[0].innerHTML=BSdata.CAUSEMAJOR;
                aSpan[1].innerHTML=BSdata.CAUSEQI;
                aSpan[2].innerHTML=BSdata.POVSHU;
                aSpan[3].innerHTML=BSdata.BANQIANYIYUAN;
                aSpan[4].innerHTML=BSdata.WEIFANG;

                // if (otherData) {
                //     aSpan[5].innerHTML=otherData.有劳动能力;
                //     aSpan[6].innerHTML=otherData.在校生情况;
                //     aSpan[7].innerHTML='健康:'+otherData.健康+',残疾:'+otherData.残疾+',慢性病:'+otherData.长期慢性病;
                // }
                //aSpan[7].innerHTML='健康:'+healthy+',残疾:'+CanJi+',慢性病:'+ill;
            }else{
                /*aSpan[0].innerHTML='数据为空！';
                aSpan[1].innerHTML='数据为空！';
                aSpan[2].innerHTML='数据为空！';
                aSpan[3].innerHTML='数据为空！';
                aSpan[4].innerHTML='数据为空！';
                aSpan[5].innerHTML='数据为空！';
                aSpan[6].innerHTML='数据为空！';
                aSpan[7].innerHTML='数据为空！';*/
            }
        }
    })
}
function PersonHelpJob(ourl){//帮扶干部
    $.ajax({
        url:ourl,
        type:"get",
        dataType:"json",
        data:{},
        success:function (result) {
            var Hdata=result.data;
            var bangfus=$("#bangfu");
            console.log(Hdata)
            bangfu(bangfus,Hdata)
           /* var aSpan=$(".helpInfo span");
            var startTime=Hdata.STARTTIME;
            var endTime=Hdata.ENDTIME;
            startTime=startTime.toString();
            endTime=endTime.toString();

            aSpan[0].innerHTML=Hdata.USERNAME;
            aSpan[1].innerHTML=Hdata.COMPANY;
            aSpan[2].innerHTML=Hdata.ZHIWU;
            aSpan[3].innerHTML=Hdata.TELEPHONE;
            aSpan[4].innerHTML=startTime.slice(0,4)+'.'+startTime.slice(4,6)+'.'+startTime.slice(6,8)+'-'+endTime.slice(0,4)+'.'+endTime.slice(4,6)+'.'+endTime.slice(6,8);
            var srcs="dingtalk://dingtalkclient/action/open_profile?staff_id="+Hdata.AAK555+"&corp_id="+"ding98d66c2bc4e38c9335c2f4657eb6378f";
            $("#userId").attr("href",srcs);*/
        }
    })
}
function bangfu(obj,data){
    obj.empty();
    for(let i=0;i<data.length;i++){
        let bangfuTime="";
        var srcs="dingtalk://dingtalkclient/action/open_profile?staff_id="+data[i].AAK555+"&corp_id="+"ding98d66c2bc4e38c9335c2f4657eb6378f";
        $("#userId").attr("href",srcs);

        if(data[i].STARTTIME!=""||data[i].ENDTIME!=""){
            bangfuTime=data[i].STARTTIME+"-"+data[i].ENDTIME;
        }
        if(data[i].AAK999==""){
            data[i].AAK999="images/touxiang.png";
        }
        let str=`
            <div class="grid" style="width:100%;height:100%;padding:2% 2%;">
               <div class="left">
                  <img src="${data[i].AAK999}" alt="" style="width:100%;height:90%;margin-top:3%;">
              </div>
              <div class="right helpInfo">
                  <p>姓名：<span>${data[i].USERNAME}</span></p>
                  <p>单位：<span>${data[i].COMPANY}</span></p>
                  <p>职务：<span>${data[i].ZHIWU}</span></p>
                  <p>联系方式：<span>${data[i].TELEPHONE}</span></p>
                  <p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:250px;">帮扶起止时间：<span>${bangfuTime}</span></p>  
              </div>
            </div>
        `;
        obj.html(function (i,value) {
            return value+str;
        })
    }
}
function fiveReason(obj,FamilyCode,num){//户五项退出指标原因
    $.ajax({
        url:url+'/map/five/index/reason?type='+num+'&aac001='+FamilyCode+'&year=201808',
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            //console.log(data);
            obj.click(function(){
                $('#reason2').text('指标达标情况'+': '+data);
            })
        }
    })
}
function fiveReason2(obj,FamilyCode,num){//户五项退出指标原因
    $.ajax({
        url:url+'/map/five/index/reason?type='+num+'&aac001='+FamilyCode+'&year=201808',
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            //console.log(data);
            obj.click(function(){
                $('#reason2').text('指标达标情况'+': '+data);
            })
        }
    })
}
function PersonTCZB(ourl,code){//户五项退出指标
    //console.log(obj[0])
    var exitBZ=$('.exitBZ');
    //console.log($(exitBZ[0]))
    for (var i=0;i<exitBZ.length;i++) {
        $(exitBZ[i]).removeClass('RitemReason GitemReason');
    }
    //  $(".isStudent").removeClass('RitemReason GitemReason');
    //  $(".isStudent").removeClass('GitemReason');
    $.ajax({
        url:ourl,
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            // console.log(data);
            // console.log(code);
            // 户五项退出指标
            if(data){
                if(data.STUDENT==1){//无辍学生
                    $(".isStudent").addClass('RitemReason');
                    fiveReason($(".isStudent"),code,3);
                }else{
                    $(".isStudent").addClass('GitemReason');
                    fiveReason2($(".isStudent"),code,3);
                }

                if(data.INSURANCE==1){//新农合保险
                    $(".isJoin").addClass('RitemReason');
                    fiveReason($(".isJoin"),code,4);
                }else{
                    $(".isJoin").addClass('GitemReason');
                    fiveReason2($(".isJoin"),code,4);
                }

                if(data.INCOME==1){//收入
                    $(".isReach").addClass('RitemReason');
                    fiveReason($(".isReach"),code,1);
                }else{
                    $(".isReach").addClass('GitemReason');
                    fiveReason2($(".isReach"),code,1);
                }

                if(data.WATER==1){//安全饮水
                    $(".isWater").addClass('RitemReason');
                    fiveReason($(".isWater"),code,5);
                }else{
                    $(".isWater").addClass('GitemReason');
                    fiveReason2($(".isWater"),code,5);
                }

                if(data.HOUSE==1){//安全住房
                    $(".isSafeHouse").addClass('RitemReason');
                    fiveReason($(".isSafeHouse"),code,2);
                }else{
                    $(".isSafeHouse").addClass('GitemReason');
                    fiveReason2($(".isSafeHouse"),code,2);
                }
            }else{
                // alert('五项退出指标数据为空！');
            }
        }
    })
}
function HelpMeasures(ourl){//户帮扶措施
    //console.log(ourl)
    /*var Item=$('.Item');
    for (var i=0;i<Item.length;i++) {
        $(Item[i]).removeClass('RitemReason DitemReason');
    }
    var result={"code":2000,"message":"sucess","data":[
        {"type":1,"STATUS":0,"reason":"该户属于非五保贫困户，非低保贫困户且家中无残疾人口，所以不享受该政策。"},
        {"type":2,"STATUS":1,"reason":"该户没有家庭成员可以满足有劳动能力且为非在校生的条件。"},
        {"type":3,"STATUS":0,"reason":"该户生态情况良好。"},
        {"type":4,"STATUS":1,"reason":"该户属于非五保贫困户，非低保贫困户且家中无残疾人口，所以不享受该政策。"},
        {"type":5,"STATUS":0,"reason":"该户无危房情况。"},
        {"type":6,"STATUS":0,"reason":"该户共有*人未购买大病保险,无法享受该政策。"},
        {"type":7,"STATUS":1,"reason":"该户属于非五保贫困户，非低保贫困户且家中无残疾人口，所以不享受该政策。"},
        {"type":8,"STATUS":0,"reason":"该户没有家庭成员可以满足有劳动能力且为非在校生的条件。"}
    ]};
    var data=result.data;
    //console.log($(".Item")[0]);
    if(data){
        for(var i=0;i<data.length;i++){
            helpjudge(data[i],$(".Item")[i]);
        }
    }else{
        // alert('帮扶措施数据为空！');
    }*/
    $.ajax({
        url:ourl,
        type:"post",
        dataType:"json",
        data:{},
        success:function (result) {
            var data=result.data;
            if(data){
                for(var i=0;i<data.length;i++){
                    helpjudge(data[i],$(".Item")[i]);
                }
            }else{
                // alert('帮扶措施数据为空！');
            }
        }
    })
}
function helpjudge(obj1,obj2){//帮扶措施原因
    var obj2=$(obj2)
    if(obj1.STATUS==1){
        obj2.addClass('GitemReason');
        obj2.click(function(){$("#reason").text('达标原因：'+obj1.reason);})
    }else if(obj1.STATUS==0 && obj1.reason){
        obj2.addClass('RitemReason');
        obj2.click(function(){$("#reason").text('未实施原因：'+obj1.reason);})
    }else{
        obj2.addClass('DitemReason');
        $(obj2).unbind("click")
    }
}

function searchEvent(ourl,obj1,obj2,obj3,name){//区县级村搜索,村列表填充
    obj1.click(function(e){
        var text=$('.keywords').val();
        //console.log(ourl);
        obj3.html("");
        obj2.show();
        $(document).one("click", function(){
            obj2.hide();
        });
        e.stopPropagation();

        $.ajax({
            url:ourl+'?item='+text+'&aar009='+name,
            type:"get",
            dataType:"json",
            data:{},
            success:function (result) {
                var data=result.data;// {村名: "东石门村委会", 村编号: "610124001002", 县区名: "周至县", 县编号: "610124000000"}
                for (var i=0;i<data.length;i++) {
                    obj3.append('<tr><td>'+data[i].县区名+'</td><td>'+data[i].村名+'</td><td style="color: #efe43b;cursor: pointer;" onclick=LookDetails("'+name+'","'+data[i].村名+'","'+data[i].村编号+'");>查看</td></tr>');
                }
            }
        })
    })
    obj2.on("click", function(e){
        e.stopPropagation();
    });
}
function LookDetails(countryName,villageName,villageCode){//区县级村搜索跳转
    $('.keywords').val('');
    var url = host + '/village.html?county='+ countryName + '&name=' + villageName+ '&code=' + villageCode;
    window.location.href = url;
}
function CUNsearchEvent(url,obj1,obj2,obj3,countryName,villageName,villageCode){//村级户搜索户列表填充
    obj1.click(function(e){
        var text=$('.keywords').val();
        obj3.html("");
        obj2.show();
        $(document).one("click", function(){
            obj2.hide();
        });
        e.stopPropagation();

        $.ajax({
            url:url+'?item='+text+'&aar008='+villageCode,
            type:"get",
            dataType:"json",
            data:{},
            success:function (result) {
                var data=result.data;// "data":[{"AAC001":3116426500,"AAR009":"沙窝村委会","AAC029":"陈亚琴"}]
                for (var i=0;i<data.length;i++) {
                    obj3.append('<tr><td>'+data[i].AAR009+'</td><td>'+data[i].AAC029+'</td><td style="color: #efe43b;cursor: pointer;" onclick=CUNLookDetails("'+countryName+'","'+villageName+'","'+villageCode+'","'+data[i].AAC001+'","'+data[i].AAC029+'");>查看</td></tr>');
                }
            }
        })
    })

    obj2.on("click", function(e){
        e.stopPropagation();
    });
}
function CUNLookDetails(countryName,villageName,villageCode,personCode,personName){//村级户搜索跳转
    $('.keywords').val('');
    let homeCode=personCode;
    var url = host + '/households.html?county='+ countryName + '&name=' + villageName+ '&villageCode=' + villageCode+'&homeCode=' + homeCode;
    window.location.href = url;

}
/*******************************点击放大事件**********************************/
function ClickEnlarge(obj2,num1,num2){
    $('.B-title').removeAttr("title");
    $('.B-title a').show();
    obj2.css({"transform":"scale(2.5)","font-size":"100%","z-index":"9999","position":"relative","top":num1,"left":num2,"background":"rgb(3, 15, 50)"});
    $(".main>.box").css({"opacity":"1","top":"0"});
    $('.B-title a').one("click",function(){
        obj2.css({"transform":"scale(1)","font-size":"100%","z-index":"0","position":"relative","top":"0","left":"0"});
        $(".main>.box").css({"opacity":0,"top":"-100%"});
        $('.B-title').attr("title","点击放大");
        $('.B-title a').hide();
    })
    //})
    obj2.on("click",function(e){
        e.stopPropagation();
    })
}
function ClickEnlarge1(obj2,num1,num2){
    console.log(obj2)
    //obj1.click(function(e){//$('.enlarge .c-title')
        //$('.enlarge')
    $('.B-title').removeAttr("title");
    $('.B-title a').show();
    obj2.css({"font-size":"100%","z-index":"9999","width":"450px","position":"fixed","top":'69%',"left":'59%',"transform":"scale(1.8) translate(-50%,-50%)","background":"rgb(3, 15, 50)"});
    $(".main>.box").css({"opacity":"1","top":"0"});
    $('.B-title a').one("click",function(){
        obj2.css({"transform":"scale(1)","font-size":"100%","z-index":"0","width":"","position":"relative","top":"0","left":"0"});
        $(".main>.box").css({"opacity":0,"top":"-100%"});
        $('.B-title').attr("title","点击放大");
        $('.B-title a').hide();
    })
    //})
    obj2.on("click",function(e){
        e.stopPropagation();
    })
}

function lunboRight(){
        var speed=40
        var slide=document.getElementById("slide");
        var slide1=document.getElementById("slide1");
        // var slide1=document.getElementById("slide1");
        let height=parseInt($("#slide1").css('height'));
        // console.log(height);
        let heights=height-900;
        function Marquee(){
            // console.log(slide.scrollTop,heights);
            if(slide.scrollTop+2>=heights){
                slide.scrollTop= 0
            }
            else{
                //alert(slide.offsetHeight);
                //alert(slide1.offsetTop+"|"+slide.scrollTop);
                slide.scrollTop+=2;
            }
        }
        var MyMar=setInterval(Marquee,speed)
        slide.onmouseover=function(){clearInterval(MyMar)}
        slide.onmouseout=function(){MyMar=setInterval(Marquee,speed)}
    }

/*---------------------------------获取区县编号------------------------------------*/
        function bianhao(){
            $.ajax({
                url:url+"/init/disct/name",
                method:"get",
                async: false,
                dataType:"json",
                data:{"name":countryName},
                success:function(data){
                    disctId = data.data;
                    return disctId;
                }
            })
        }
        function addCun(){
            //alert(countryName);
            $(".main>.box1").css({"opacity":"1","top":"28.5%"});
            bianhao();
            let township=$("#arrowZhen");
            tianzhen(township,disctId);
        }
        /*镇/街道渲染接口*/
        function tianzhen(township,countyCode){
            //alert(countyCode)
            $.ajax({
                url: url+"/visual/poorHuVill",
                data:{"aar009_x":countyCode},
                async:false,
                method:"post",
                type:"json",
                success:function(data){
                        console.log(data.data);
                        showCounty1(township,data.data);
                }
            })
        }
        /*村渲染接口*/
        function tiancun(townName){
            $("#arrowZhen li[sleep$='"+townName+"']").addClass('huActive');
            $("#arrowZhen li[sleep!='"+townName+"']").removeClass('huActive');
            let cunship=$("#arrowCun");
            $('#arrowCun').show();
            $.ajax({
                url: url+"/visual/poorHuVill",
                data:{"aar009_z":townName},//镇下面的所有村
                async:false,
                method:"post",
                type:"json",
                success:function(data){
                    showCounty2(cunship,data.data,townName);
                }
            })
        }
        /*镇街内容渲染*/
        function showCounty1(obj,data){
            obj.html('');
            for(let i=0;i<data.length;i++){
                obj.append('<li sleep='+data[i].AAA011_Z+' onclick=tiancun('+data[i].AAA011_Z+');>'+data[i].AAR009_Z+'</li>');
            }
            console.log(obj.html())
        }
        /*村内容渲染*/
        function showCounty2(obj,data,townCode){
            obj.html('');
            for(let i=0;i<data.length;i++){
                if (data[i].FLAG==1) {
                    obj.append('<li class="redWord" onclick=villageJudge('+data[i].AAA011_C+',"'+data[i].AAR009_C+'",'+data[i].FLAG+','+townCode+');>'+data[i].AAR009_C+'</li>');
                }
                else{
                    obj.append('<li onclick=villageJudge('+data[i].AAA011_C+',"'+data[i].AAR009_C+'",'+data[i].FLAG+','+townCode+');>'+data[i].AAR009_C+'</li>');
                }
            }
        }
        function villageJudge(villageCode,villageName,judge,townCode){
            if (judge==1) {
                var url = host + '/village.html?county='+ countryName + '&name=' + villageName+ '&code=' + villageCode+ '&townCode=' + townCode;
            }else
            if (judge==0) {
                var url = host + '/village2.html?county='+ countryName + '&name=' + villageName+ '&code=' + villageCode+ '&townCode=' + townCode;
            }
            window.location.href = url;
        }

        // function personResort(){
        //       /*户列表渲染*/
        //         bianhao()
        //         let nameList=$("#poorlists");
        //         $.ajax({
        //             url:url+"/visual/housePeopleNumber",
        //             method:"post",
        //             dataType:"json",
        //             data:{"aar009_x":disctId,"aar009_z":townCode,"aar009_c":villageCode},
        //             success:function (result) {
        //                 let data = result.data;
        //                 console.log(data)
        //                 showList(nameList,data);
        //             }
        //         })
        //         function showList(obj,data){
        //             obj.empty();
        //             console.log(data);
        //             for(let i=0;i<data.length;i++){
        //                 let str=`
        //                          <li style="display: flex;justify-content: space-between;text-align: center;line-height: 40px;border-bottom:1px dashed #1B1147;cursor:pointer;" id="${data[i]['AAC001']}">
        //                                                     <div style="width:50%;">${data[i]['AAC029']}</div>
        //                                                     <div style="width:50%;">${data[i]['AAC006']}</div>
        //                         </li>
        //                       `;
        //                 obj.html(function (i,value) {
        //                     return value+str;
        //                 })
        //             }
        //         }
        //         /*点击户列表跳转至户一级*/
        //         $(document).on("click","#poorlists li",function(){
        //             let homeCode=$(this).attr("id");
        //             console.log(homeCode);
        //             /*var url = host + '/households.html?county='+ countryName + '&name=' + villageName+ '&code=' + villageCode+'&Pcode='+personCode+'&personName='+personName;*/
        //             var url = host + '/households.html?county='+ countryName + '&name=' + villageName+ '&villageCode=' + villageCode+'&homeCode=' + homeCode;
        //             window.location.href = url;
        //         })
        // }