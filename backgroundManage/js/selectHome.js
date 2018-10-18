var addressInit1 = function(_cmbProvince1, _cmbCity1, _cmbArea1, _cmbStreet1, defaultProvince, defaultCity, defaultArea,defaultStreet)
{
    var cmbProvince1 = document.getElementById(_cmbProvince1);
    var cmbCity1 = document.getElementById(_cmbCity1);
    var cmbArea1 = document.getElementById(_cmbArea1);
    var cmbStreet1 = document.getElementById(_cmbStreet1);

    function cmbSelect1(cmb, str)
    {
        if($("#cmbArea1 option:first").text()=="undefined"){
            $("#input1").val("请选择")
        }else{
            $("#input1").val($("#cmbArea1 option:first").text());
        }

        for(var i=0; i<cmb.options.length; i++)
        {
            if(cmb.options[i].value == str)
            {
                cmb.selectedIndex = i;
                return;
            }
        }
    }
    function cmbAddOption1(cmb, str, obj)
    {
        var option = document.createElement('OPTION');
        cmb.options.add(option);
        option.innerText = str;
        option.value = str;
        option.obj = obj;
    }

    function changeCity()
    {
        cmbArea1.options.length = 0;
        if(cmbCity1.selectedIndex == -1)return;
        var item = cmbCity1.options[cmbCity1.selectedIndex].obj;
        for(var i=0; i<item.areaList.length; i++)
        {
            cmbAddOption4(cmbArea1, item.areaList[i].name, null,item.areaList[i].sleep);
        }
        cmbSelect1(cmbArea1, defaultArea);
    }
    function changeProvince1()
    {
        cmbCity1.options.length = 0;
        cmbCity1.onchange = null;
        if(cmbProvince1.selectedIndex == -1)return;
        var item = cmbProvince1.options[cmbProvince1.selectedIndex].obj;
        for(var i=0; i<item.cityList.length; i++)
        {
            cmbAddOption1(cmbCity1, item.cityList[i].name, item.cityList[i]);
        }
        cmbSelect1(cmbCity1, defaultCity);
        changeCity();
        cmbCity1.onchange = changeCity;
    }
        function cmbAddOption4(cmb, str, obj,val)
    {
        var option = document.createElement('OPTION');
        cmb.options.add(option);
        option.innerText = str;
        option.value = val;
        option.obj = obj;
    }

    for(var i=0; i<provinceList1.length; i++)
    {
        cmbAddOption4(cmbProvince1, provinceList1[i].name, provinceList1[i],provinceList1[i].sleep);
    }
    cmbSelect1(cmbProvince1, defaultProvince);
    changeProvince1();
    cmbProvince1.onchange = changeProvince1;
}

var provinceList1 = [
{name:'全部',sleep:'', cityList:[
{name:'等于', areaList:['']}
]},
{name:'家庭人口数',sleep:"AC01_AAC017", cityList:[
	{name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]}
]},
{name:'首次识别时间',sleep:"AC01_AAR041", cityList:[
    {name:'等于', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
    {name:'为空'},
    {name:'不为空'}
]},

/*{name:'脱贫年度',sleep:"AC01_AAC023", cityList:[
        {name:'等于', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'包含', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'不包含', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'为空', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'不为空', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]}
    ]},
{name:'返贫年度',sleep:"AC01_AAC024",cityList:[
        {name:'等于', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'包含', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'不包含', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'为空', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]},
        {name:'不为空', areaList:[{name:'2014年',sleep:'2014'},{name:'2015年',sleep:'2015'},{name:'2016年',sleep:'2016'},{name:'2017年',sleep:'2017'},{name:'2018年',sleep:"2018"}]}
    ]},*/
{name:'主要致贫原因',sleep:"AC01_AAC007", cityList:[
    {name:'等于', areaList:[{name:'因病',sleep:'01'},{name:'因残',sleep:'02'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'}]},
    {name:'包含', areaList:[{name:'因病',sleep:'01'},{name:'因残',sleep:'02'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'}]},
    {name:'不包含', areaList:[{name:'因病',sleep:'01'},{name:'因残',sleep:'02'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'}]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'返贫原因',sleep:"AC01_AAC009", cityList:[
    {name:'等于', areaList:[{name:'因病',sleep:'01'},{name:'因残',sleep:'02'},{name:'因婚',sleep:'13'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'},{name:'产业扶贫失败',sleep:'14'}]},
    {name:'包含', areaList:[{name:'因病',sleep:'01'},{name:'因残',sleep:'02'},{name:'因婚',sleep:'13'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'},{name:'产业扶贫失败',sleep:'14'}]},
    {name:'不包含', areaList:[{name:'因病',sleep:'01'},{name:'因残',sleep:'02'},{name:'因婚',sleep:'13'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'},{name:'产业扶贫失败',sleep:'14'}]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'其他致贫原因',sleep:"AC01_AAC008", cityList:[
    {name:'包含', areaList:[{name:'因病',sleep:'01'},{name:'因婚',sleep:'13'},{name:'因残',sleep:'02'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'}]},
    {name:'不包含', areaList:[{name:'因病',sleep:'01'},{name:'因婚',sleep:'13'},{name:'因残',sleep:'02'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'}]},
    {name:'等于', areaList:[{name:'因病',sleep:'01'},{name:'因婚',sleep:'13'},{name:'因残',sleep:'02'},{name:'因学',sleep:'03'},{name:'因灾',sleep:'04'},{name:'缺土地',sleep:'05'},{name:'缺水',sleep:'06'},{name:'缺技术',sleep:'07'},{name:'缺劳力',sleep:'08'},{name:'缺资金',sleep:'09'},{name:'交通条件落后',sleep:'10'},{name:'自身发展动力不足',sleep:'11'},{name:'其他',sleep:'12'}]},
    {name:'为空'},
    {name:'不为空'}  
]},
{name:'是否军烈属',sleep:"AC01_AAC012", cityList:[             
{name:'等于', areaList:[{name:'是',sleep:'1'},{name:'否',sleep:'0'}]},                           
{name:'为空'},              
{name:'不为空'}
]},
//{name:'重点帮扶标志',sleep:"AB01_AAB022", cityList:[             
//{name:'等于', areaList:[{name:'一类',sleep:'01'},{name:'二类',sleep:'02'}]},                           
//{name:'为空', areaList:[{name:'一类',sleep:'01'},{name:'二类',sleep:'02'}]},              
//{name:'不为空', areaList:[{name:'一类',sleep:'01'},{name:'二类',sleep:'02'}]}
//]},
// {name:'义务教育辍学人数', cityList:[
// {name:'包含', areaList:[]},
// {name:'不包含', areaList:[]},
// {name:'为空', areaList:[]},
// {name:'不为空', areaList:[]}
// ]},
// {name:'是否集中供养五保户', cityList:[
// {name:'全部', areaList:['是','否']},
// {name:'包含', areaList:['是','否']},
// {name:'不包含', areaList:['是','否']},
// {name:'为空', areaList:['是','否']},
// {name:'不为空', areaList:['是','否']},
// {name:'等于', areaList:['是','否']}
//  ]},

// {name:'八个一批帮扶需求', cityList:[
// {name:'全部', areaList:['产业扶贫','产业扶贫','所在县','所在乡','上年务工时间','务工企业名称']},
// {name:'包含', areaList:['所在省','所在市','所在县','所在乡','上年务工时间','务工企业名称']},
// {name:'不包含', areaList:['所在省','所在市','所在县','所在乡','上年务工时间','务工企业名称']},
// {name:'为空', areaList:['所在省','所在市','所在县','所在乡','上年务工时间','务工企业名称']},
// {name:'不为空', areaList:['所在省','所在市','所在县','所在乡','上年务工时间','务工企业名称']},
// {name:'等于', areaList:['所在省','所在市','所在县','所在乡','上年务工时间','务工企业名称']}
// ]},
{name:'年收入(元)', sleep:'AC07_AAC081',cityList:[
	{name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'年纯收入(元)',sleep:'AC07_AAC079', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'年人均纯收入(元)',sleep:"AC07_AAC082", cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'工资性收入（元）',sleep:"AC07_AAC073", cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'生产经营收入(元)',sleep:"AC07_AAC071", cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'财产性收入(元)',sleep:"AC07_AAC072", cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'转移性收入(元)',sleep:'AC07_AAC085', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'生产性支出(元)',sleep:'AC07_AAC074', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'一年期以上低保金(元)',sleep:'AC07_AAC077', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'一年期以下低保金(元)',sleep:'AC07_ACA009', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'计划生育金(元)',sleep:'AC07_AAC076', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'五保金(元)',sleep:'AC07_AAC086', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'养老保险金(元)',sleep:'AC07_AAC087', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'离退休金(元)',sleep:'AC07_ACA001', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'赡养金(元)',sleep:'AC07_ACA002', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'高龄补贴(元)',sleep:'AC07_ACA003', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'生态补偿金(元)',sleep:'AC07_AAC078', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'残疾补贴(元)',sleep:'AC07_ACA005', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'稳定性补贴(元)',sleep:'AC07_ACA007', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'长期抚恤金(元)',sleep:'AC07_ACA004', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'三年以上的资产性收入(元)',sleep:'AC07_ACA008', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
{name:'贫困户家中现役军人工资(元)',sleep:'AC07_ACA006', cityList:[
    {name:'等于', areaList:[]},
    {name:'大于', areaList:[]},
    {name:'大于等于', areaList:[]},    
    {name:'小于', areaList:[]},
    {name:'小于等于', areaList:[]},
    {name:'为空'},
    {name:'不为空'}
]},
    
{name:'是否有搬迁意愿',sleep:'AC40_ACR077', cityList:[
        {name:'等于', areaList:[{name:'有',sleep:'1'},{name:'无',sleep:'0'}]},
        {name:'为空'},
        {name:'不为空'}
    ]},
/*{name:'安置方式',sleep:'AF02_ACR078', cityList:[
        {name:'等于', areaList:[{name:'集中安置',sleep:'1'},{name:'分散安置',sleep:'0'}]},
        {name:'为空', areaList:[{name:'集中安置',sleep:'1'},{name:'分散安置',sleep:'0'}]},
        {name:'不为空', areaList:[{name:'集中安置',sleep:'1'},{name:'分散安置',sleep:'0'}]}
    ]},
{name:'安置地点', sleep:'AF02_ACR079',cityList:[
        {name:'等于', areaList:[]},
        {name:'为空', areaList:[]},
        {name:'不为空', areaList:[]}
    ]},*/
{name:'耕地面积（亩）',sleep:'AC30_AAC301', cityList:[
{name:'等于', areaList:['']},
{name:'大于', areaList:['']},
{name:'大于等于', areaList:['']},
{name:'小于', areaList:['']},
{name:'小于等于', areaList:['']},
{name:'为空'},
{name:'不为空'}
]},
{name:'有效灌溉面积（亩）',sleep:'AC30_AAC302', cityList:[
{name:'等于', areaList:['']},
{name:'大于', areaList:['']},
{name:'大于等于', areaList:['']},
{name:'小于', areaList:['']},
{name:'小于等于', areaList:['']},
{name:'为空'},
{name:'不为空'}
]},
{name:'林地面积（亩）',sleep:'AC30_AAC303', cityList:[
{name:'等于', areaList:['']},
{name:'大于', areaList:['']},
{name:'大于等于', areaList:['']},
{name:'小于', areaList:['']},
{name:'小于等于', areaList:['']},
{name:'为空'},
{name:'不为空'}
]},
{name:'退耕还林面积（亩）',sleep:'AC30_AAC304', cityList:[

{name:'等于', areaList:['']},
{name:'大于', areaList:['']},
{name:'大于等于', areaList:['']},
{name:'小于', areaList:['']},
{name:'小于等于', areaList:['']},
{name:'为空'},
{name:'不为空'}
]},
{name:'林果面积（亩）',sleep:'AC30_AAC305', cityList:[

{name:'等于', areaList:['']},
{name:'大于', areaList:['']},
{name:'大于等于', areaList:['']},
{name:'小于', areaList:['']},
{name:'小于等于', areaList:['']},
{name:'为空'},
{name:'不为空'}
]},
{name:'牧草地面积（亩）',sleep:'AC30_AAC306', cityList:[

{name:'等于', areaList:['']},
{name:'大于', areaList:['']},
{name:'大于等于', areaList:['']},
{name:'小于', areaList:['']},
{name:'小于等于', areaList:['']},
{name:'为空'},
{name:'不为空'}
]},
{name:'水面面积（亩）',sleep:'AC30_AAC307', cityList:[

{name:'等于', areaList:['']},
{name:'大于', areaList:['']},
{name:'大于等于', areaList:['']},
{name:'小于', areaList:['']},
{name:'小于等于', areaList:['']},
{name:'为空'},
{name:'不为空'}
]},
{name:'是否通生活用电',sleep:'AC30_AAC308', cityList:[
{name:'等于', areaList:[{name:'是',sleep:"1"},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},

{name:'是否通广播电视',sleep:"AC30_AAC314", cityList:[
{name:'等于', areaList:[{name:'是',sleep:"1"},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'是否加入农民合作社',sleep:'AC30_AAC084', cityList:[
{name:'等于', areaList:[{name:'已加入',sleep:"1"},{name:'未加入',sleep:"0"}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'与村主干路距离（m）',sleep:'AC30_AAC315', cityList:[
{name:'等于', areaList:[]},
{name:'大于', areaList:[]},
{name:'大于等于', areaList:[]},
{name:'小于', areaList:[]},
{name:'小于等于', areaList:[]},
{name:'为空'},
{name:'不为空'}
]},
{name:'入户路类型',sleep:'AC30_AAC316', cityList:[
{name:'等于', areaList:[{name:'泥土路',sleep:"01"},{name:'砂石路',sleep:"02"},{name:'水泥路',sleep:"03"},{name:'沥青路',sleep:"04"}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'住房面积(㎡)',sleep:'AC30_AAC317', cityList:[
{name:'等于', areaList:[]},
{name:'大于', areaList:[]},
{name:'大于等于', areaList:[]},
{name:'小于', areaList:[]},
{name:'小于等于', areaList:[]}
]},
{name:'饮水是否困难',sleep:'AC30_AAC311', cityList:[
{name:'等于', areaList:[{name:'是',sleep:"1"},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}

]},
{name:'饮水是否安全',sleep:'AC30_AAC312', cityList:[
{name:'等于', areaList:[{name:'是',sleep:"1"},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'是否为危房户',sleep:'AC30_AAC318', cityList:[
{name:'等于', areaList:[{name:'是',sleep:"1"},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:"危房等级",sleep:'AC30_AAC322',cityList:[
{name:'等于', areaList:[{name:'A级别',sleep:"1"},{name:'B级别',sleep:"2"},{name:'C级别',sleep:'3'},{name:'D级别',sleep:'4'},{name:'其他',sleep:'9'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'主要燃料类型',sleep:'AC30_AAC320', cityList:[
{name:'等于', areaList:[{name:'柴草',sleep:'01'},{name:'干畜粪',sleep:'02'},{name:'煤炭',sleep:'03'},{name:'清洁能源',sleep:'04'},{name:'其他',sleep:'99'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'有无卫生厕所',sleep:'AC30_AAC319', cityList:[
{name:'等于', areaList:[{name:'有',sleep:'1'},{name:'没有',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]}
];