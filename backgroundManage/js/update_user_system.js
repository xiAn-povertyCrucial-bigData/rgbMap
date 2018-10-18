var setting = {
    check : {
        enable : true,
        autoCheckTrigger: true,
        /*chkboxType:{
            "Y":"ps",
            "N":"ps"
        }*/
    },
    data : {
        simpleData:{
            enable:true,
            idKey:"id",
            pIdKey:"pid"
        }
    },
};
var zNodes = [
    {id:1,pid:0,name:"扶贫对象管理","perId":"","nocheck":false},
    {id:11,pid:1,name:"贫困县","perId":"","nocheck":false},
    {id:111,pid:11,name:"查询","perId":158,"nocheck":false},
    {id:112,pid:11,name:"添加","perId":159,"nocheck":false},
    {id:113,pid:11,name:"修改","perId":160,"nocheck":false},
    {id:114,pid:11,name:"导出","perId":161,"nocheck":false},
    {id:12,pid:1,name:"贫困村","perId":"","nocheck":false},
    {id:121,pid:12,name:"查询","perId":105,"nocheck":false},
    {id:122,pid:12,name:"详情","perId":106,"nocheck":false},
    {id:123,pid:12,name:"添加","perId":108,"nocheck":false},
    {id:124,pid:12,name:"修改","perId":107,"nocheck":false},
    {id:125,pid:12,name:"导入","perId":109,"nocheck":false},
    {id:126,pid:12,name:"导出","perId":110,"nocheck":false},
    {id:127,pid:12,name:"数据追踪","perId":111,"nocheck":false},
    {id:128,pid:12,name:"数据追踪导出","perId":112,"nocheck":false},
    {id:13,pid:1,name:"贫困户","perId":"","nocheck":false},
    {id:130,pid:13,name:"查询","perId":113,"nocheck":false},
    {id:131,pid:13,name:"详情","perId":114,"nocheck":false},
    {id:132,pid:13,name:"添加","perId":116,"nocheck":false},
    {id:133,pid:13,name:"修改","perId":115,"nocheck":false},
    {id:134,pid:13,name:"导入","perId":117,"nocheck":false},
    {id:135,pid:13,name:"导出","perId":118,"nocheck":false},
    {id:136,pid:13,name:"数据追踪","perId":119,"nocheck":false},
    {id:137,pid:13,name:"数据追踪导出","perId":120,"nocheck":false},
    {id:138,pid:13,name:"添加四书四照","perId":121,"nocheck":false},
    {id:139,pid:13,name:"修改四书四照","perId":122,"nocheck":false},
    {id:14,pid:1,name:"自然村","perId":"","nocheck":false},
    {id:141,pid:14,name:"查询","perId":123,"nocheck":false},
    {id:142,pid:14,name:"详情","perId":124,"nocheck":false},
    {id:143,pid:14,name:"修改","perId":125,"nocheck":false},
    {id:144,pid:14,name:"添加","perId":126,"nocheck":false},
    {id:145,pid:14,name:"导入","perId":127,"nocheck":false},
    {id:146,pid:14,name:"导出","perId":128,"nocheck":false},
    {id:2,pid:0,name:"扶贫措施","perId":"","nocheck":false},
    {id:21,pid:2,name:"产业扶贫","perId":"","nocheck":false},
    {id:211,pid:21,name:"查询","perId":3,"nocheck":false},
    {id:212,pid:21,name:"详情","perId":4,"nocheck":false},
    {id:213,pid:21,name:"添加","perId":1,"nocheck":false},
    {id:214,pid:21,name:"修改","perId":2,"nocheck":false},
    {id:215,pid:21,name:"导入","perId":13,"nocheck":false},
    {id:216,pid:21,name:"导出","perId":14,"nocheck":false},
    {id:22,pid:2,name:"就业扶贫","perId":"","nocheck":false},
    {id:221,pid:22,name:"查询","perId":7,"nocheck":false},
    {id:222,pid:22,name:"详情","perId":8,"nocheck":false},
    {id:223,pid:22,name:"添加","perId":5,"nocheck":false},
    {id:224,pid:22,name:"修改","perId":6,"nocheck":false},
    {id:225,pid:22,name:"导入","perId":15,"nocheck":false},
    {id:226,pid:22,name:"导出","perId":16,"nocheck":false},
    {id:23,pid:2,name:"生态扶贫","perId":"","nocheck":false},
    {id:231,pid:23,name:"查询","perId":19,"nocheck":false},
    {id:232,pid:23,name:"详情","perId":20,"nocheck":false},
    {id:233,pid:23,name:"添加","perId":21,"nocheck":false},
    {id:234,pid:23,name:"修改","perId":22,"nocheck":false},
    {id:235,pid:23,name:"导入","perId":23,"nocheck":false},
    {id:236,pid:23,name:"导出","perId":24,"nocheck":false},
    {id:24,pid:2,name:"易地搬迁","perId":"","nocheck":false},
    {id:241,pid:24,name:"查询","perId":25,"nocheck":false},
    {id:242,pid:24,name:"详情","perId":26,"nocheck":false},
    {id:243,pid:24,name:"添加","perId":27,"nocheck":false},
    {id:244,pid:24,name:"修改","perId":28,"nocheck":false},
    {id:245,pid:24,name:"导入","perId":29,"nocheck":false},
    {id:246,pid:24,name:"导出","perId":30,"nocheck":false},
    {id:25,pid:2,name:"危房改造","perId":"","nocheck":false},
    {id:251,pid:25,name:"查询","perId":31,"nocheck":false},
    {id:252,pid:25,name:"详情","perId":32,"nocheck":false},
    {id:253,pid:25,name:"添加","perId":33,"nocheck":false},
    {id:254,pid:25,name:"修改","perId":34,"nocheck":false},
    {id:255,pid:25,name:"导入","perId":35,"nocheck":false},
    {id:256,pid:25,name:"导出","perId":36,"nocheck":false},
    {id:26,pid:2,name:"健康扶贫","perId":"","nocheck":false},
    {id:261,pid:26,name:"查询","perId":37,"nocheck":false},
    {id:262,pid:26,name:"详情","perId":38,"nocheck":false},
    {id:263,pid:26,name:"添加","perId":39,"nocheck":false},
    {id:264,pid:26,name:"修改","perId":40,"nocheck":false},
    {id:265,pid:26,name:"导入","perId":41,"nocheck":false},
    {id:266,pid:26,name:"导出","perId":43,"nocheck":false},
    {id:27,pid:2,name:"教育扶贫","perId":"","nocheck":false},
    {id:271,pid:27,name:"查询","perId":44,"nocheck":false},
    {id:272,pid:27,name:"详情","perId":45,"nocheck":false},
    {id:273,pid:27,name:"添加","perId":46,"nocheck":false},
    {id:274,pid:27,name:"修改","perId":47,"nocheck":false},
    {id:275,pid:27,name:"导入","perId":48,"nocheck":false},
    {id:276,pid:27,name:"导出","perId":49,"nocheck":false},
    {id:28,pid:2,name:"兜底保障","perId":"","nocheck":false},
    {id:281,pid:28,name:"查询","perId":50,"nocheck":false},
    {id:282,pid:28,name:"详情","perId":51,"nocheck":false},
    {id:283,pid:28,name:"添加","perId":52,"nocheck":false},
    {id:284,pid:28,name:"修改","perId":54,"nocheck":false},
    {id:285,pid:28,name:"导入","perId":56,"nocheck":false},
    {id:286,pid:28,name:"导出","perId":58,"nocheck":false},
    {id:29,pid:2,name:"金融扶贫","perId":"","nocheck":false},
    {id:291,pid:29,name:"查询","perId":"","nocheck":false},
    {id:292,pid:29,name:"详情","perId":"","nocheck":false},
    {id:293,pid:29,name:"添加","perId":"","nocheck":false},
    {id:294,pid:29,name:"修改","perId":"","nocheck":false},
    {id:295,pid:29,name:"导入","perId":"","nocheck":false},
    {id:296,pid:29,name:"导出","perId":"","nocheck":false},
    {id:20,pid:2,name:"基础设施","perId":"","nocheck":false},
    {id:201,pid:20,name:"查询","perId":9,"nocheck":false},
    {id:202,pid:20,name:"详情","perId":10,"nocheck":false},
    {id:203,pid:20,name:"添加","perId":11,"nocheck":false},
    {id:204,pid:20,name:"修改","perId":12,"nocheck":false},
    {id:205,pid:20,name:"导入","perId":17,"nocheck":false},
    {id:206,pid:20,name:"导出","perId":18,"nocheck":false},
    {id:3,pid:0,name:"扶贫主体","perId":"","nocheck":false},
    {id:31,pid:3,name:"帮扶单位","perId":"","nocheck":false},
    {id:311,pid:31,name:"查询","perId":131,"nocheck":false},
    {id:312,pid:31,name:"详情","perId":132,"nocheck":false},
    {id:313,pid:31,name:"添加","perId":129,"nocheck":false},
    {id:314,pid:31,name:"修改","perId":130,"nocheck":false},
    {id:315,pid:31,name:"导出","perId":133,"nocheck":false},
    {id:32,pid:3,name:"帮扶责任人","perId":"","nocheck":false},
    {id:321,pid:32,name:"查询","perId":136,"nocheck":false},
    {id:322,pid:32,name:"详情","perId":137,"nocheck":false},
    {id:323,pid:32,name:"添加","perId":134,"nocheck":false},
    {id:324,pid:32,name:"修改","perId":135,"nocheck":false},
    {id:325,pid:32,name:"导出","perId":138,"nocheck":false},
    {id:326,pid:32,name:"删除","perId":172,"nocheck":false},
    {id:33,pid:3,name:"驻村工作队","perId":"","nocheck":false},
    {id:331,pid:33,name:"查询","perId":139,"nocheck":false},
    {id:332,pid:33,name:"详情","perId":140,"nocheck":false},
    {id:333,pid:33,name:"导出","perId":141,"nocheck":false},
    {id:334,pid:33,name:"添加","perId":169,"nocheck":false},
    {id:335,pid:33,name:"修改","perId":170,"nocheck":false},
    {id:336,pid:33,name:"删除","perId":171,"nocheck":false},
    {id:34,pid:3,name:"结对帮扶管理","perId":"","nocheck":false},
    {id:341,pid:34,name:"查询","perId":142,"nocheck":false},
    {id:342,pid:34,name:"导出","perId":143,"nocheck":false},
    {id:35,pid:3,name:"日志管理","perId":"","nocheck":false},
    {id:351,pid:35,name:"查询","perId":144,"nocheck":false},
    {id:352,pid:35,name:"导出","perId":145,"nocheck":false},
    {id:36,pid:3,name:"签到管理","perId":"","nocheck":false},
    {id:361,pid:36,name:"查询","perId":146,"nocheck":false},
    {id:362,pid:36,name:"导出","perId":147,"nocheck":false},
    {id:4,pid:0,name:"脱贫监管","perId":"","nocheck":false},
    {id:41,pid:4,name:"户脱贫监管","perId":"","nocheck":false},
    {id:411,pid:41,name:"查询","perId":103,"nocheck":false},
    {id:412,pid:41,name:"导出","perId":104,"nocheck":false},
    {id:42,pid:4,name:"村退出监管","perId":"","nocheck":false},
    {id:421,pid:42,name:"查询","perId":101,"nocheck":false},
    {id:422,pid:42,name:"导出","perId":102,"nocheck":false},
    {id:43,pid:4,name:"县摘帽监管","perId":"","nocheck":false},
    {id:431,pid:43,name:"查询","perId":99,"nocheck":false},
    {id:432,pid:43,name:"导出","perId":100,"nocheck":false},
    {id:5,pid:0,name:"统计分析功能","perId":"","nocheck":false},
    {id:51,pid:5,name:"贫困村统计","perId":"","nocheck":false},
    {id:511,pid:51,name:"查询","perId":148,"nocheck":false},
    {id:512,pid:51,name:"导出","perId":149,"nocheck":false},
    {id:52,pid:5,name:"贫困户统计","perId":"","nocheck":false},
    {id:521,pid:52,name:"查询","perId":96,"nocheck":false},
    {id:522,pid:52,name:"导出(户)","perId":97,"nocheck":false},
    {id:523,pid:52,name:"导出(人)","perId":98,"nocheck":false},
    {id:53,pid:5,name:"八个一批统计","perId":"","nocheck":false},
    {id:531,pid:53,name:"查询","perId":150,"nocheck":false},
    {id:532,pid:53,name:"导出","perId":151,"nocheck":false},
    {id:54,pid:5,name:"计划脱贫统计","perId":"","nocheck":false},
    {id:541,pid:54,name:"查看","perId":"","nocheck":false},
    {id:542,pid:54,name:"添加","perId":"","nocheck":false},
    {id:543,pid:54,name:"修改","perId":"","nocheck":false},
    {id:544,pid:54,name:"删除","perId":"","nocheck":false},
    {id:55,pid:5,name:"日志统计","perId":"","nocheck":false},
    {id:551,pid:55,name:"查询","perId":152,"nocheck":false},
    {id:552,pid:55,name:"导出","perId":154,"nocheck":false},
    {id:56,pid:5,name:"签到统计","perId":"","nocheck":false},
    {id:561,pid:56,name:"查询","perId":155,"nocheck":false},
    {id:562,pid:56,name:"导出","perId":157,"nocheck":false},
    {id:57,pid:5,name:"信息审核统计","perId":"","nocheck":false},
    {id:571,pid:57,name:"贫困村查询","perId":179,"nocheck":false},
    {id:572,pid:57,name:"贫困户查询","perId":180,"nocheck":false},
    {id:6,pid:0,name:"系统权限管理","perId":"","nocheck":false},
    {id:61,pid:6,name:"系统用户管理","perId":"","nocheck":false},
    {id:611,pid:61,name:"查询","perId":162,"nocheck":false},
    {id:612,pid:61,name:"详情","perId":163,"nocheck":false},
    {id:613,pid:61,name:"修改","perId":164,"nocheck":false},
    {id:614,pid:61,name:"密码修改","perId":165,"nocheck":false},
    {id:62,pid:6,name:"角色权限管理","perId":"","nocheck":false},
    {id:621,pid:62,name:"查询","perId":166,"nocheck":false},
    {id:622,pid:62,name:"修改","perId":167,"nocheck":false},
    {id:623,pid:62,name:"添加","perId":168,"nocheck":false},
    {id:7,pid:0,name:"信息审核管理","perId":"","nocheck":false},
    {id:71,pid:7,name:"贫困户","perId":"","nocheck":false},
    {id:711,pid:71,name:"审核信息","perId":59,"nocheck":false},
    {id:712,pid:71,name:"详情","perId":60,"nocheck":false},
    {id:713,pid:71,name:"镇街审核","perId":61,"nocheck":false},
    {id:714,pid:71,name:"区县审核","perId":62,"nocheck":false},
    {id:72,pid:7,name:"贫困村","perId":"","nocheck":false},
    {id:721,pid:72,name:"审核信息","perId":63,"nocheck":false},
    {id:722,pid:72,name:"详情","perId":64,"nocheck":false},
    {id:723,pid:72,name:"镇街审核","perId":65,"nocheck":false},
    {id:724,pid:72,name:"区县审核","perId":66,"nocheck":false},
    {id:73,pid:7,name:"八个一批","perId":"","nocheck":false},
    {id:731,pid:73,name:"审核信息","perId":67,"nocheck":false},
    {id:732,pid:73,name:"详情","perId":68,"nocheck":false},
    {id:733,pid:73,name:"镇街审核","perId":69,"nocheck":false},
    {id:734,pid:73,name:"区县审核","perId":70,"nocheck":false},
    {id:76,pid:7,name:"八个一批添加","perId":"","nocheck":false},
    {id:761,pid:76,name:"审核信息","perId":184,"nocheck":false},
    {id:762,pid:76,name:"详情","perId":185,"nocheck":false},
    {id:763,pid:76,name:"镇街审核","perId":186,"nocheck":false},
    {id:764,pid:76,name:"区县审核","perId":187,"nocheck":false},
    {id:75,pid:7,name:"佐证信息","perId":"","nocheck":false},
    {id:751,pid:75,name:"审核信息","perId":181,"nocheck":false},
    {id:752,pid:75,name:"详情","perId":182,"nocheck":false},
    {id:753,pid:75,name:"区县审核","perId":183,"nocheck":false},
    {id:74,pid:7,name:"数据管理","perId":"","nocheck":false},
    {id:741,pid:74,name:"贫困户查询","perId":173,"nocheck":false},
    {id:742,pid:74,name:"贫困户高级查询","perId":174,"nocheck":false},
    {id:743,pid:74,name:"贫困户详情","perId":175,"nocheck":false},
    {id:744,pid:74,name:"贫困村查询","perId":176,"nocheck":false},
    {id:745,pid:74,name:"贫困村指标筛选","perId":177,"nocheck":false},
    {id:746,pid:74,name:"贫困村详情","perId":178,"nocheck":false},
    {id:8,pid:0,name:"数据核实","perId":"","nocheck":false},
    {id:81,pid:8,name:"对象监管","perId":"","nocheck":false},
    {id:811,pid:81,name:"查询","perId":71,"nocheck":false},
    {id:82,pid:8,name:"数据清洗管理","perId":"","nocheck":false},
    {id:821,pid:82,name:"对象清洗","perId":93,"nocheck":false},
    {id:822,pid:82,name:"分类查询","perId":94,"nocheck":false},
    {id:83,pid:8,name:"数据质量排名","perId":"","nocheck":false},
    {id:831,pid:83,name:"查询","perId":95,"nocheck":false}
];

/*往数据库插入数据*/
/*let token=$.cookie("token");
let tt={treeList:zNodes};
let datas=JSON.stringify(tt);
$.ajax({
    url:"http://192.168.1.153:8080/role/manager/import/tree",
    data:datas,
    method:"post",
    type:"json",
    contentType:"application/json",
    beforeSend:function(request){
        request.setRequestHeader("Authorization",token);
        request.setRequestHeader("X-Requested-With","XMLHttpRequest");
    },
    success:function(data){
        alert("导入成功")
    }
})*/
let url=config.url;
let token=$.cookie("token");
let id=localStorage.getItem("updateId");
$(document).ready(function(){
    /*加载树状图输数据*/
    $.ajax({
        url:url+"/role/manager/tree/query",
        data:{},
        method:"get",
        dataType:"json",
        beforeSend:function(request){
            request.setRequestHeader("Authorization",token);
            request.setRequestHeader("X-Requested-With","XMLHttpRequest");
        },
        success:function(data){
            if(data.code===2000){
                showTree(data.data)
            }else if(data.code===4000){
                alert(data.message);
            }
        }
    })
    /*树状图渲染函数*/
    function showTree(data){
        for(let i=0;i<data.length;i++){
            // console.log(data[i].TREE_ID);
            let len=data[i].TREE_ID;
            let length=len.toString().length;
            console.log(length);
            if(data[i].IS_PERMISSION==0 && length==3){
                console.log(zNodes[i]);
                zNodes[i].nocheck=true;
            }
        }
        $.fn.zTree.init($("#tree"),setting,zNodes);
    }
    /*页面数据预加载*/
    $.fn.zTree.init($("#tree"), setting, zNodes)
    $.ajax({
        url: url+"/role/manager/role/detail",
        data:{"id":id},
        type:"post",
        dataType:"json",
        success: function(data) {
            let datas=data.data;
            $("#name").val(datas.role.ROLE_NAME);
            $("#note").val(datas.role.NOTE);
            /*ztree的checkbox选中*/
            for (var i = 0;i < datas.tree.length;i++){
                console.log(datas.tree[i])
                let treeObj=$.fn.zTree.getZTreeObj("tree");
                var nodes = treeObj.transformToArray(zNodes);
                for (var k = 0;k < nodes.length; k++) {
                    if (datas.tree[i] == nodes[k].id) {
                        nodes[k].checked = true;
                        treeObj.updateNode(nodes[k],true);
                    }
                }
            }
        }
    })

    /*修改内容*/
    $("#save").click(function(){
        let name=$("#name").val();
        let note=$("#note").val();
        /*获取选中字节点的集合*/
        function getChildNodes(treeNode) {
            var treeObj=$.fn.zTree.getZTreeObj("tree");
            var nodes = new Array();
            var childNodes=treeObj.getCheckedNodes(true);
            for(let i = 0; i < childNodes.length; i++) {
                nodes[i] = childNodes[i].perId;
            }
            return nodes.join(",");
        }
        let list=getChildNodes(zNodes);
        let treeList=list.split(",");
        let treeLists=skipEmptyElementForArray(treeList);
        /*去掉数组里面的空字符串*/
        function skipEmptyElementForArray(arr){
            var a = [];
            $.each(arr,function(i,v){
                var data = $.trim(v);
                if('' != data){
                    a.push(data);
                }
            });
            return a;
        }
        let tt={roleName:name,note:note,id:id,roleList:treeLists};
        let datas=JSON.stringify(tt);
        $.ajax({
            url:url+"/role/manager/update",
            data:datas,
            type:"post",
            dataType:"json",
            contentType:"application/json",
            beforeSend:function(request){
                request.setRequestHeader("Authorization",token);
                request.setRequestHeader("X-Requested-With","XMLHttpRequest");
            },
            success:function(data){
                if(data.code===2000){
                    show_msg("修改成功","show_role_system.html")
                }else if(data.code===1005){
                    show_msg("修改失败",'');
                    return;
                } else if(data.code===4000){
                    show_msg("无权限",'');
                    return;
                }else if(data.code===3000){
                    show_msg("未登录",'');
                    return;
                }
            }
        })
    })





    // $.fn.zTree.init($("#tree"),setting,zNodes);
})


