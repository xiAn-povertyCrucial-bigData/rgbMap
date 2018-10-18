$(document).ready(function(){
    /*村危房改造实施情况统计*/
     var url=config.url;
     var year=config.year;
    let countyName=countryName;
    let villagName=villageName;
    let villagCode=villageCode;
    $("#villagName").text(villagName)
    $("#houseName").text(villagName)
    $("#villageName9").text(villagName)
    var disctId = villagCode;
    var villN = villagName;
    var village = "";
    $("#villN").html(villN);
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
        let pieRadius=['0', '50%'];
        let yHeight='28%';
        //let name1=villagName+"危房改造实施情况统计";
        $.ajax({
            url:url+"/danger/vill/query",
            method:"get",
            dataType:"json",
            data:{"cityName":disctId},
            success:function (result) {
                let data=result.data[0];
                let datas=[];
                let i=0;
                let arr=['未启动','未入住','已入住'];
                let datatable =[data[0].no,data[0].ongoing,data[0].reach];
                for (var key in data[0])
                {
                    let temp = {"value":datatable[i],"name":arr[i]};
                    i++;
                    datas.push(temp);
                }
                let count=data[0].no+data[0].ongoing+data[0].reach;
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
                            fontSize:14
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
        })
    }


    var table1 = $("#table");
    industryPoverty2();
    function industryPoverty2(){
        table1.empty();
    	var str = "";
    	  $.ajax({
            url:url+"/danger/vill/query",
            method:"post",
            dataType:"json",
            data:{"cityName":disctId},
            success:function (result) {
            	var data = result.data[4];
            	for(let i = 0; i < data[0].no.length; i++){
		       	 str+=`<li>
							<div>${data[0].no[i].AAC029}</div>
							<div style="color:#DD4F43">未启动</div>
							<div>${data[0].no[i].AAC322}</div>
						</li>`;
						}
            	for(let i = 0; i < data[0].ongoing.length; i++){
		       	 str+=`<li>
							<div>${data[0].ongoing[i].AAC029}</div>
							<div style="color:#FFCE43">未入住</div>
							<div>${data[0].ongoing[i].AAC322}</div>
						</li>`;

						}
            	for(let i = 0; i < data[0].reach.length; i++){
		       	 str+=`<li>
	                        <div>${data[0].reach[i].AAC029}</div>
	                        <div style="color:#1FA463">已入住</div>
							<div>${data[0].reach[i].AAC322}</div>
						</li>`;
                    }
                    	table1.html(str);
				}
    })
    	}
    /*************************************C级危房修缮*******************************************/
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
            url:url+"/danger/vill/query",
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
                        position: "right",
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
                                    fontSize: 15,
                                },
                            },
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

    // myChart3.on("click", eConsole3);
    // function eConsole3(param) {

    //     var xiaomin = $("#xiaomin")
    //     $.ajax({
    //             url:url+'danger/ongo/query',
    //             method:"post",
    //             dataType:"json",
    //             data:{'cityNo':n11[kk],'placement':'1'},
    //             success:function (result) {
    //                 if(result.code==2000){
    //                     show22table(xiaomin,result);
    //                     //alert("2123")
    //                 }
    //         }
    //         })
    //             console.log(params)
    //             if(params.componentType == "xAxis"){
    //                 $("#villageName6").text(params.value);
    //                 $(".pop-up22").css({"opacity":0,"top":"-100%"});
    //                 $(".pop-up23").css({"opacity":"1","top":"50%"});
    //                 // alert("单击了"+params.value+"x轴标签");
    //             }else{
    //                 // alert("单击了"+params.name+"柱状图");
    //             }

    // }
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






  /*************************************************D级危房修缮***********************************************/
    industryPoverty4();
    function industryPoverty4(){
        let dom4 = document.getElementById("module-4");
        let myChart4 = echarts.init(dom4);
      //  alert("dasd")
        $.ajax({
            url:url+"/danger/vill/query",
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
                        position: "left",
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
                                    fontSize: 15,
                                },
                            },
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
    /*******************************************D级危房修缮 **************************************************/
    //  var dog23 = document.getElementById("module-23"); //未启动 县
    //  var myChart23 = echarts.init(dog23);
    //  var dog24 = document.getElementById("module-24");//未启动 镇
    //  var myChart24 = echarts.init(dog24);
    //  var dog25 = document.getElementById("module-25"); // 未启动 村
    //  var myChart25 = echarts.init(dog25);
    //  var dog26 = document.getElementById("module-26");  //已入住县
    //  var myChart26 = echarts.init(dog26);
    //  var dog27 = document.getElementById("module-27");  //已入住 镇
    //  var myChart27 = echarts.init(dog27);
    //  var dog28 = document.getElementById("module-28");  //已入住 村
    //  var myChart28 = echarts.init(dog28);
    //  var dog29 = document.getElementById("module-29"); //未入住
    //  var myChart29 = echarts.init(dog29);
    //  var dom30 = document.getElementById("module-30"); //正
    //  var myChart30 = echarts.init(dom30);
    //  var dom31 = document.getElementById("module-31"); //正
    //  var myChart31 = echarts.init(dom31);
    //  var  hongda = $("#hongda");//未启动 户
    //  var zhengqiang = $("#zhengqiang");//完成
    // myChart4.on("click", eConsole4);
    // function eConsole4(param) {
    //         var n1 = [];
    //         var n2 = [];
    //         var n11 = [];
    //         var n21 = [];
    //         var n111 = [];
    //         var n211 = [];
    //         $(".pop-up32").css({"opacity":"1","top":"50%"});
    //     //C级危房修缮 县区
    //         $.ajax({
    //             url:url+'danger/ongo/query',
    //             method:"post",
    //             dataType:"json",
    //             data:{'cityNo':disctId,'placement':'0'},
    //             success:function (result) {
    //                 if(result.code==2000){
    //                     for(let i = 0; i < result.data.length; i++ ){
    //                         n1[i] = result.data[i].AAA011;
    //                         n2[i] = result.data[i].AAR009;
    //                     }
    //                     show30(myChart29,result);
    //                 }
    //             }
    //         })
    //         /*点击县到镇*/
    //         myChart29.on("click",function(params){
    //            var gg;
    //             //alert(params.value)
    //             for(let i = 0; i < n2.length;i++ ){
    //                 if(params.value == n2[i]){
    //                     gg=i;
    //                 }
    //             }
    //             //console.log(params)
    //          $.ajax({
    //             url:url+'danger/ongo/query',
    //             method:"post",
    //             dataType:"json",
    //             data:{'cityNo':n1[gg],'placement':'0'},
    //             success:function (result) {
    //                 if(result.code==2000){
    //                      for(let i = 0; i < result.data.length; i++ ){
    //                         n11[i] = result.data[i].AAA011;
    //                         n21[i] = result.data[i].AAR009;
    //                     }
    //                     show30(myChart30,result);
    //                     //alert("2123")
    //                 }
    //             }
    //         })
    //             if(params.componentType == "xAxis"){
    //                 $("#countyName15").text(params.value);
    //                 $(".pop-up32").css({"opacity":0,"top":"-100%"});
    //                 $(".pop-up33").css({"opacity":"1","top":"50%"});
    //             }else{
    //                 // alert("单击了"+params.name+"柱状图");
    //             }
    //         })
    //         /*点击镇到村*/
    //         myChart30.on("click",function(params){
    //             var gg;
    //                for(let i = 0; i < n21.length;i++ ){
    //                 if(params.value == n21[i]){
    //                     gg=i;
    //                 }
    //             }
    //             $.ajax({
    //                 url:url+'danger/ongo/query',
    //                 method:"post",
    //                 dataType:"json",
    //                 data:{'cityNo':n11[gg],'placement':'0'},
    //                 success:function (result) {
    //                     if(result.code==2000){
    //                         for(let i = 0; i < result.data.length; i++ ){
    //                             n111[i] = result.data[i].AAA011;
    //                             n211[i] = result.data[i].AAR009;
    //                         }
    //                         show30(myChart31,result);
    //                         //alert("2123")
    //                     }
    //             }
    //         })
    //             //console.log(params)
    //             if(params.componentType == "xAxis"){
    //                 $("#countyName16").text(params.value);
    //                 $(".pop-up33").css({"opacity":0,"top":"-100%"});
    //                 $(".pop-up34").css({"opacity":"1","top":"50%"});
    //             }else{
    //             }
    //         })
    //         /*点击村到户*/
    //         myChart31.on("click",function(params){
    //               var gg;
    //               var lele = $("#lele")
    //                for(let i = 0; i < n211.length;i++ ){
    //                 if(params.value == n211[i]){
    //                     gg=i;
    //                 }
    //             }
    //             $.ajax({
    //                 url:url+'danger/ongo/query',
    //                 method:"post",
    //                 dataType:"json",
    //                 data:{'cityNo':n111[gg],'placement':'0'},
    //                 success:function (result) {
    //                     if(data.code=2000){
    //                         show30table(xiaomin1,result);
    //                         //alert("2123")
    //                     }
    //             }
    //         })
    //             console.log(params)
    //             if(params.componentType == "xAxis"){
    //                 $("#villageName7").text(params.value);
    //                 $(".pop-up34").css({"opacity":0,"top":"-100%"});
    //                 $(".pop-up35").css({"opacity":"1","top":"50%"});
    //                 // alert("单击了"+params.value+"x轴标签");
    //             }else{
    //                 // alert("单击了"+params.name+"柱状图");
    //             }
    //         })
    // }

/****************************D级危房修缮正在实施的县（29）、镇（30）、村（31）的渲染*********************************/
function show30(obj,data){
  //  alert("dasd");
var n2 = [];
var n3 = [];
for(let i = 0; i < data.data.length; i++){
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
                    barBorderRadius: [3, 3, 0, 0]
                },

                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[3, 3, 0, 0]
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



    /*************************受益户数和受益人数占比及比重*****************************************/
    var dom5 = document.getElementById("module-5");
    var myChart5 = echarts.init(dom5);
    industryPoverty5();
    function industryPoverty5(){
        var pieRadius=['45%', '62%'];
        var yHeight='38%';
        $.ajax({
            url:url+"/danger/vill/query",
            method:"get",
            dataType:"json",
            data:{"cityName":disctId},
            success:function (result) {
                let data=result.data[3];
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
                                data: ['C级危房修缮','D级危房修缮'],
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
                                bottom: '20%',
                                containLabel: true
                            },
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '受益户数',
                                    minInterval:1,
                                    nameTextStyle:{
                                        fontSize:14
                                    },
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
                              //  data:[1,1,2,2]
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
//      var dog33 = document.getElementById("module-33");//镇
//      var myChart33 = echarts.init(dog33);
//      var dog34 = document.getElementById("module-34"); // 村
//      var myChart34 = echarts.init(dog34);
//      var type;
//     myChart5.on("click",function(params){
//         console.log(params)
//      if(params.value=="C级危房修缮"){
//          type = 1;
//       }else{
//           type = 0;
//       }
// 		var k1 = [];
// 		var k2 = [];
// 		var k11 = [];
// 		var k21 = [];
// 		 $.ajax({
//                 url:url+'danger/concent/query',
//                 method:"get",
//                 dataType:"json",
//                 data:{'cityNo':disctId,'placement':type},
//                 success:function (result) {
//                     if(result.code==2000){
//                         for(let i = 0; i < result.data.length; i++ ){
//                             k1[i] = result.data[i].AAA011;
//                             k2[i] = result.data[i].AAR009;
//                         }
//                         showConcent(myChart33,result);
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

//     myChart33.on("click",function(params){
//         	var gg;
// 			//alert(params.value)
// 			for(let i = 0; i < k2.length;i++ ){
// 				if(params.value == k2[i]){
// 					gg=i;
// 				}
// 			}
// 			 $.ajax({
//                 url:url+'danger/concent/query',
//                 method:"get",
//                 dataType:"json",
//                 data:{'cityNo':k1[gg],'placement':type},
//                 success:function (result) {
//                     if(result.code==2000){
//                         showConcent(myChart34,result);
//                         //alert("wqw");
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
//    })
// function showConcent(obj,data){
//     obj.innerHTML="";
//     console.log(data)
//     var n2 = [];
//     var n3 = [];
//     var n4 = [];
//     for(let i = 0; i < data.data.length; i++){
//         n2[i] = data.data[i].AAR009;
//         n3[i] = data.data[i].jzHouse;
//         n4[i] = data.data[i].jzNumber;
//     }
//     //alert(n3)
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
//                 fontSize:graph_x
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
//         obj.setOption(option, true);
//     }
// }

})