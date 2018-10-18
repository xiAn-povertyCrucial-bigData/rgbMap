$(document).ready(function(){
    var url=config.url;
    var year=config.year;
    var disctId = villageCode;
    var villageNames = villageName;
    console.log(villageName)
    $("#helpCity").text(villageNames);
    //alert(villageName)
   // alert(villageName);
    var dom1 = document.getElementById("module-1");
    var myChart = echarts.init(dom1);
    industryPoverty();
    function industryPoverty(){
         $.ajax({
            url:url+"/projway/count",
            method:"get",
            dataType:"json",
            data:{'year':year,'disctId':disctId},
            success:function (result) {
            let count1=result.data.TOGETHER_RED+result.data.PROJ_EMPLOY+result.data.PROJ_GREEN+result.data.EMP_GREEN;
                var data =[
                {
                    value: result.data.TOGETHER_RED,
                    name: '产业就业均未完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                },
                {
                    value: result.data.PROJ_EMPLOY,
                    name: '产业就业均已完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                },
             {
                 value: result.data.PROJ_GREEN,
                 name: '产业完成',
                 itemStyle: {
                     normal: {
                         borderWidth: 3,
                         borderColor:"#fff",
                     }
                 }
             },
                {
                    value: result.data.EMP_GREEN,
                    name: '就业完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }];
                option = {
                    title: {
                        text: '产业扶贫\n'+count1+'户',
                        x: 'center',
                        y: 'middle',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        },
                        subtextStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"right",
                        formatter: "{b}: {c}户 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['82%', '90%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:20,
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 25,
                                        borderColor: '#fff',
                                        borderType: 'bold',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(0,0,0,0.85)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['55%', '82%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:'100',
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 30,
                                        borderColor: '#fff',
                                        borderType: 'dashed',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(21,41,185,.75)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        color: ['#DD4F43','#1FA463','#1FA463','#1FA463'],
                        label: {
                            normal: {
                                show:false,
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#00cefc',
                                    fontWeight: 'bold',
                                    fontSize:title_bar
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
                    myChart.setOption(option, true);
                }
      }
   })
}

    var dom2 = document.getElementById("module-2");
    var myChart2 = echarts.init(dom2);
    industryPoverty2();
    function industryPoverty2(){
         $.ajax({
            url:url+"/employment/count",
            method:"get",
            dataType:"json",
            data:{'year':year,'disctId':disctId},
            success:function (result) {
            let count2=result.data.TOGETHER_RED+result.data.PROJ_EMPLOY+result.data.PROJ_GREEN+result.data.EMP_GREEN;
                var data =[
                {
                    value: result.data.TOGETHER_RED,
                    name: '产业就业均未完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                },
                {
                    value: result.data.PROJ_EMPLOY,
                    name: '产业就业均已完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                },
             {
                 value: result.data.PROJ_GREEN,
                 name: '产业完成',
                 itemStyle: {
                     normal: {
                         borderWidth: 3,
                         borderColor:"#fff",
                     }
                 }
             },
                {
                    value: result.data.EMP_GREEN,
                    name: '就业完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }];
                option = {
                    title: {
                        text: '就业扶贫\n'+count2+'户',
                        x: 'center',
                        y: 'middle',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        },
                        subtextStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"right",
                        formatter: "{b}: {c}户 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['82%', '90%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:20,
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 25,
                                        borderColor: '#fff',
                                        borderType: 'bold',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(0,0,0,0.85)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['55%', '82%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:'100',
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 30,
                                        borderColor: '#fff',
                                        borderType: 'dashed',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(21,41,185,.75)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        color: ['#DD4F43','#1FA463','#1FA463','#1FA463'],
                        label: {
                            normal: {
                                show:false,
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#00cefc',
                                    fontWeight: 'bold',
                                    fontSize:title_bar
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
                    myChart2.setOption(option, true);
                }
      }
   })
 }


    var dom3 = document.getElementById("module-3");
    var myChart3 = echarts.init(dom3);
    industryPoverty3();
    function industryPoverty3(){
         $.ajax({
            url:url+"/place/vill/query",
            method:"get",
            dataType:"json",
            data:{'cityName':disctId},
            success:function (result) {
			let count3=result.data[0][0].reach+result.data[0][0].ongoing+result.data[0][0].no;
            var data = [{
                    value: result.data[0][0].reach,
                    name: '已完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }, {
                    value: result.data[0][0].ongoing,
                    name: '正在实施',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }, {
                    value: result.data[0][0].no,
                    name: '未实施',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }];
                option = {
                    title: {
                        text: '易地搬迁\n'+count3+'户',
                        x: 'center',
                        y: 'middle',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        },
                        subtextStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"left",
                        formatter: "{b}: {c}户 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['82%', '90%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:20,
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 25,
                                        borderColor: '#fff',
                                        borderType: 'bold',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(0,0,0,0.85)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['55%', '82%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:'100',
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 30,
                                        borderColor: '#fff',
                                        borderType: 'dashed',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(21,41,185,.75)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        color: ['#1FA463', '#FFCE43', '#DD4F43'],
                        label: {
                            normal: {
                                show:false,
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#00cefc',
                                    fontWeight: 'bold',
                                    fontSize:title_bar
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
   })
}


    var dom4 = document.getElementById("module-4");
    var myChart4 = echarts.init(dom4);
    industryPoverty4();
    function industryPoverty4(){
         $.ajax({
            url:url+"/help/health/count",
            method:"get",
            dataType:"json",
            data:{'year':year,'disctId':disctId},
            success:function (result) {
            	if(result.code == 2000){
            		let count4=result.data.HOLDER_OK+result.data.HOLDER_NO;
		            var data = [{
		                    value: result.data.HOLDER_OK,
		                    name: '已完成',
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor:"#fff",
                                }
                            }
		                },{
		                    value: result.data.HOLDER_NO,
		                    name: '未完成',
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor:"#fff",
                                }
                            }
		                }];
		                option = {
		                    title: {
		                        text: '健康扶贫\n'+count4+'户',
		                        x: 'center',
		                        y: 'middle',
		                        textStyle: {
		                            fontWeight: 'normal',
		                            fontSize:title_bar,
		                            color:"#fff"
		                        },
		                        subtextStyle: {
		                            fontWeight: 'normal',
		                            fontSize:title_bar,
		                            color:"#fff"
		                        }
		                    },
		                    tooltip: {
		                        show: true,
		                        trigger: 'item',
		                        position:"right",
		                        formatter: "{b}: {c}户 ({d}%)"
		                    },
		                    series: [
                                {
                                    type: 'pie',
                                    name: '',
                                    center: ['50%', '50%'],
                                    radius: ['82%', '90%'],
                                    silent: true,
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [{
                                        value:20,
                                        itemStyle: {
                                            normal: {
                                                color: '#0A62C1',
                                                shadowBlur: 25,
                                                borderColor: '#fff',
                                                borderType: 'bold',
                                                borderWidth: 2,
                                                shadowColor: 'rgba(0,0,0,0.85)',
                                                labelLine:{
                                                    show:false
                                                }
                                            }
                                        }
                                    }]
                                },
                                {
                                    type: 'pie',
                                    name: '',
                                    center: ['50%', '50%'],
                                    radius: ['55%', '82%'],
                                    silent: true,
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [{
                                        value:'100',
                                        itemStyle: {
                                            normal: {
                                                color: '#0A62C1',
                                                shadowBlur: 30,
                                                borderColor: '#fff',
                                                borderType: 'dashed',
                                                borderWidth: 2,
                                                shadowColor: 'rgba(21,41,185,.75)',
                                                labelLine:{
                                                    show:false
                                                }
                                            }
                                        }
                                    }]
                                },
		                        {
		                        type: 'pie',
		                        selectedMode: 'single',
		                        radius: pieRadius,
		                        color: ['#1FA463',  '#DD4F43'],
		                        label: {
		                            normal: {
		                                show:false,
		                                position: 'inner',
		                                formatter: '{d}%',
		                                textStyle: {
		                                    color: '#00cefc',
		                                    fontWeight: 'bold',
		                                    fontSize:title_bar
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
}



 	var dom5 = document.getElementById("module-5");
    var myChart5 = echarts.init(dom5);
    industryPoverty5();
    function industryPoverty5(){
           $.ajax({
            url:url+"/ecology/aLayer",
            method:"get",
            dataType:"json",
            data:{"villNo":disctId},
            success:function (result) {
			let count5=result.data.isReach+result.data.noReach;
            var data = [{
                    value: result.data.isReach,
                    name: '已达标',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                },
                {
                    value: result.data.noEcology,
                    name: '不享受',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                },
                 {
                    value: result.data.noReach-result.data.noEcology,
                    name: '未达标',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }];
                option = {
                    title: {
                        text: '生态扶贫\n'+count5+'户',
                        x: 'center',
                        y: 'middle',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        },
                        subtextStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"right",
                        formatter: "{b}: {c}户 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['82%', '90%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:20,
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 25,
                                        borderColor: '#fff',
                                        borderType: 'bold',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(0,0,0,0.85)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['55%', '82%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:'100',
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 30,
                                        borderColor: '#fff',
                                        borderType: 'dashed',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(21,41,185,.75)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        color: ['#1FA463','#41b97e', '#DD4F43'],
                        label: {
                            normal: {
                                show:false,
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#00cefc',
                                    fontWeight: 'bold',
                                    fontSize:title_bar
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
   })
}

 	var dom6 = document.getElementById("module-6");
    var myChart6 = echarts.init(dom6);
    industryPoverty6();
    function industryPoverty6(){
           $.ajax({
            url:url+"/danger/vill/query",
            method:"get",
            dataType:"json",
            data:{"cityName":disctId},
            success:function (result) {
			let count6=result.data[0][0].reach+result.data[0][0].ongoing+result.data[0][0].no;
            var data = [{
                    value: result.data[0][0].reach,
                    name: '已完成',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }, {
                    value: result.data[0][0].ongoing,
                    name: '正在实施',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }, {
                    value: result.data[0][0].no,
                    name: '未实施',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }];
                option = {
                    title: {
                        text: '危房改造\n'+count6+'户',
                        x: 'center',
                        y: 'middle',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        },
                        subtextStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"left",
                        formatter: "{b}: {c}户 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['82%', '90%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:20,
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 25,
                                        borderColor: '#fff',
                                        borderType: 'bold',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(0,0,0,0.85)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['55%', '82%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:'100',
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 30,
                                        borderColor: '#fff',
                                        borderType: 'dashed',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(21,41,185,.75)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        color: ['#1FA463', '#FFCE43', '#DD4F43'],
                        label: {
                            normal: {
                                show:false,
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#00cefc',
                                    fontWeight: 'bold',
                                    fontSize:title_bar
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
                    myChart6.setOption(option, true);
                }
      }
   })
}



	var dom7 = document.getElementById("module-7");
    var myChart7 = echarts.init(dom7);
    industryPoverty7();
    function industryPoverty7(){
           $.ajax({
            url:url+"/help/doudi/count",
            method:"get",
            dataType:"json",
            data:{'year':year,'disctId':disctId},
            success:function (result) {
			let count7=result.data.NUM_OK+result.data.NUM_NO;
            var data = [{
                    value: result.data.NUM_OK,
                    name: '已达标',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }, {
                    value: result.data.NUM_NO,
                    name: '未达标',
                    itemStyle: {
                        normal: {
                            borderWidth: 3,
                            borderColor:"#fff",
                        }
                    }
                }];
                option = {
                    title: {
                        text: '兜底保障\n'+count7+'户',
                        x: 'center',
                        y: 'middle',
                        textStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        },
                        subtextStyle: {
                            fontWeight: 'normal',
                            fontSize:title_bar,
                            color:"#fff"
                        }
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        position:"right",
                        formatter: "{b}: {c}户 ({d}%)"
                    },
                    series: [
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['82%', '90%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:20,
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 25,
                                        borderColor: '#fff',
                                        borderType: 'bold',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(0,0,0,0.85)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                            type: 'pie',
                            name: '',
                            center: ['50%', '50%'],
                            radius: ['55%', '82%'],
                            silent: true,
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                value:'100',
                                itemStyle: {
                                    normal: {
                                        color: '#0A62C1',
                                        shadowBlur: 30,
                                        borderColor: '#fff',
                                        borderType: 'dashed',
                                        borderWidth: 2,
                                        shadowColor: 'rgba(21,41,185,.75)',
                                        labelLine:{
                                            show:false
                                        }
                                    }
                                }
                            }]
                        },
                        {
                        type: 'pie',
                        selectedMode: 'single',
                        radius: pieRadius,
                        color: ['#1FA463','#DD4F43'],
                        label: {
                            normal: {
                                show:false,
                                position: 'inner',
                                formatter: '{d}%',
                                textStyle: {
                                    color: '#00cefc',
                                    fontWeight: 'bold',
                                    fontSize:title_bar
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
                    myChart7.setOption(option, true);
                }
      }
   })
}


	var dom8 = document.getElementById("module-8");
    var myChart8 = echarts.init(dom8);
    industryPoverty8();
    function industryPoverty8(){
           $.ajax({
            url:url+"/edu/vill/query",
            method:"get",
            dataType:"json",
            data:{"villageNo":disctId},
            success:function (result) {
                if(result.code==2000){
                	let count8=result.data[0].reachNumber+result.data[0].noNumber;
                    var data = [{
                            value: result.data[0].reachNumber,
                            name: '落实人数',
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor:"#fff",
                                }
                            }
                        }, {
                            value: result.data[0].noNumber,
                            name: '未落实人数',
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor:"#fff",
                                }
                            }
                        }];
                        option = {
                            title: {
                                text: '教育扶贫\n'+count8+'人',
                                x: 'center',
                                y: 'middle',
                                textStyle: {
                                    fontWeight: 'normal',
                                    fontSize:title_bar,
                                    color:"#fff"
                                },
                                subtextStyle: {
                                    fontWeight: 'normal',
                                    fontSize:title_bar,
                                    color:"#fff"
                                }
                            },
                            tooltip: {
                                show: true,
                                trigger: 'item',
                                position:"right",
                                formatter: "{b}: {c}人 ({d}%)"
                            },
                            series: [
                                {
                                    type: 'pie',
                                    name: '',
                                    center: ['50%', '50%'],
                                    radius: ['82%', '90%'],
                                    silent: true,
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [{
                                        value:20,
                                        itemStyle: {
                                            normal: {
                                                color: '#0A62C1',
                                                shadowBlur: 25,
                                                borderColor: '#fff',
                                                borderType: 'bold',
                                                borderWidth: 2,
                                                shadowColor: 'rgba(0,0,0,0.85)',
                                                labelLine:{
                                                    show:false
                                                }
                                            }
                                        }
                                    }]
                                },
                                {
                                    type: 'pie',
                                    name: '',
                                    center: ['50%', '50%'],
                                    radius: ['55%', '82%'],
                                    silent: true,
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [{
                                        value:'100',
                                        itemStyle: {
                                            normal: {
                                                color: '#0A62C1',
                                                shadowBlur: 30,
                                                borderColor: '#fff',
                                                borderType: 'dashed',
                                                borderWidth: 2,
                                                shadowColor: 'rgba(21,41,185,.75)',
                                                labelLine:{
                                                    show:false
                                                }
                                            }
                                        }
                                    }]
                                },
                                {
                                type: 'pie',
                                selectedMode: 'single',
                                radius: pieRadius,
                                color: ['#1FA463', '#DD4F43'],
                                label: {
                                    normal: {
                                        show:false,
                                        position: 'inner',
                                        formatter: '{d}%',
                                        textStyle: {
                                            color: '#00cefc',
                                            fontWeight: 'bold',
                                            fontSize:title_bar
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
                            myChart8.setOption(option, true);
                        }
                }
      }
   })
}

	var dom9 = document.getElementById("module-9");
    var myChart9 = echarts.init(dom9);
    industryPoverty9();
    function industryPoverty9(){
           $.ajax({
            url:url+"/finance/leftTop/query",
            method:"get",
            dataType:"json",
            data:{"aar008_c":disctId},
            success:function (result) {
                if(result.code==2000){
                	let count9=result.data.reach;
                    var data = [{
                            value: result.data.reach,
                            name: '落实人数',
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor:"#fff",
                                }
                            }
                        }, {
                            value: 0,
                            name: '未落实人数',
                            itemStyle: {
                                normal: {
                                    borderWidth: 3,
                                    borderColor:"#fff",
                                }
                            }
                        }];
                        option = {
                            title: {
                                text: '金融扶贫\n'+count9+'人',
                                x: 'center',
                                y: 'middle',
                                textStyle: {
                                    fontWeight: 'normal',
                                    fontSize:title_bar,
                                    color:"#fff"
                                },
                                subtextStyle: {
                                    fontWeight: 'normal',
                                    fontSize:title_bar,
                                    color:"#fff"
                                }
                            },
                            tooltip: {
                                show: true,
                                trigger: 'item',
                                position:"left",
                                formatter: "{b}: {c}人 ({d}%)"
                            },
                            series: [
                                {
                                    type: 'pie',
                                    name: '',
                                    center: ['50%', '50%'],
                                    radius: ['82%', '90%'],
                                    silent: true,
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [{
                                        value:20,
                                        itemStyle: {
                                            normal: {
                                                color: '#0A62C1',
                                                shadowBlur: 25,
                                                borderColor: '#fff',
                                                borderType: 'bold',
                                                borderWidth: 2,
                                                shadowColor: 'rgba(0,0,0,0.85)',
                                                labelLine:{
                                                    show:false
                                                }
                                            }
                                        }
                                    }]
                                },
                                {
                                    type: 'pie',
                                    name: '',
                                    center: ['50%', '50%'],
                                    radius: ['55%', '82%'],
                                    silent: true,
                                    labelLine: {
                                        normal: {
                                            show: false
                                        }
                                    },
                                    data: [{
                                        value:'100',
                                        itemStyle: {
                                            normal: {
                                                color: '#0A62C1',
                                                shadowBlur: 30,
                                                borderColor: '#fff',
                                                borderType: 'dashed',
                                                borderWidth: 2,
                                                shadowColor: 'rgba(21,41,185,.75)',
                                                labelLine:{
                                                    show:false
                                                }
                                            }
                                        }
                                    }]
                                },
                                {
                                type: 'pie',
                                selectedMode: 'single',
                                radius: pieRadius,
                                color: ['#1FA463', '#DD4F43'],
                                label: {
                                    normal: {
                                        show:false,
                                        position: 'inner',
                                        formatter: '{d}%',
                                        textStyle: {
                                            color: '#00cefc',
                                            fontWeight: 'bold',
                                            fontSize:title_bar
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
                            myChart9.setOption(option, true);
                        }
                }
      }
   })
}

    industryPovertyzhu();
    var  dom10= document.getElementById("module-10");
    var  myChart10 = echarts.init(dom10);
    function industryPovertyzhu(){
                $.ajax({
                        url:url+"/helpforhouse/benefit",
                        method:"get",
                        dataType:"json",
                        data:{"disctId":disctId,'year':year},
                        success:function (result) {
                        // console.log(result)
                        let data=result.data;
                        let datas=[];
                        let datas2=[];
                        let datas4=[];
                       // console.log(result)
                        for(let i=0;i<data.length;i++){
                            datas2.push(data[i]['HOUSE_NUM']);
                            datas4.push(data[i]['PEOPLE_NUM']);
                            switch(data[i].type){
                                case 1:
                                    datas[i] = "产业扶贫 ";
                                    break;
                                case 2:
                                    datas[i] = "就业创业";
                                    break;
                                case 3:
                                    datas[i] = " 生态扶贫 ";
                                    break;
                                case 4:
                                    datas[i] = "易地搬迁";
                                    break;
                                case 5:
                                    datas[i] = "医疗保险";
                                    break;
                                case 6:
                                    datas[i] = "危房改造 ";
                                    break;
                                case 7:
                                    datas[i] = "兜底保障";
                                    break;
                                case 8:
                                    datas[i] = "教育助学";
                                    break;
                                case 9:
                                    datas[i] = "金融扶贫";
                                    break;
                               default:
                                   break;
                            }
                        }
                     option = {
                            color: ['#4ddead', '#3c7eb5'],
                             title: {
                                 text: '帮扶措施受益户数/人数情况',
                                 left:10,
                                 top:40,
                                 textStyle: {
                                     color: '#89dcf1',
                                     fontSize: 18,
                                     fontWeight: "bold"
                                 },
                             },
                            tooltip: {
                                trigger: 'axis'
                            },
                             legend: {
                                 top:'11%',
                                 right:'1.8%',
                                 data:['受益户数','受益人数'],
                                 textStyle:{    //图例文字的样式
                                     color:'#fff'
                                 }
                             },
                            xAxis: [
                                {
                                    type: 'category',
                                    data: datas,
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
                                        textStyle:{
                                            fontSize:10
                                        }
                                    }
                                }
                            ],
                             grid: {
                                 top: "40%",
                                 left: '5%',
                                 right: '5%',
                                 bottom: '0%',
                                 containLabel: true
                             },
                            yAxis: [
                                {
                                    type: 'value',
                                    name: '受益户数',
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
                                            // show: true,
                                            position: 'top'
                                        }
                                    },
                                    data:datas2
                                },
                                {
                                    name:'受益人数',
                                    type:'bar',
                                    barWidth : 15,//柱图宽度
                                    yAxisIndex: 1,
                                    label: {
                                        normal: {
                                            // show: true,
                                            position: 'top'
                                        }
                                    },
                                    data:datas4
                                }
                            ]
                        };
                     if (option && typeof option === "object") {
                            myChart10.setOption(option, true);
                        }
                    }
                })
            }


})