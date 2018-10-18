var addressInit = function(_cmbProvince, _cmbCity, _cmbArea, _cmbStreet, defaultProvince, defaultCity, defaultArea,defaultStreet)
{
    var cmbProvince = document.getElementById(_cmbProvince);
    var cmbCity = document.getElementById(_cmbCity);
    var cmbArea = document.getElementById(_cmbArea);
    var cmbStreet = document.getElementById(_cmbStreet);

    function cmbSelect(cmb, str)
    {
        for(var i=0; i<cmb.options.length; i++)
        {
            $("#input").val($("#cmbArea option:first").text());
            if(cmb.options[i].value == str)
            {
                cmb.selectedIndex = i;
                return;
            }
        }
    }
    function cmbAddOption(cmb, str, obj)
    {
        var option = document.createElement('OPTION');
        cmb.options.add(option);
        option.innerText = str;
        option.value = str;
        option.obj = obj;
    }

    function changeCity()
    {
        cmbArea.options.length = 0;
        if(cmbCity.selectedIndex == -1)return;
        var item = cmbCity.options[cmbCity.selectedIndex].obj;
        for(var i=0; i<item.areaList.length; i++)
        {
            cmbAddOption2(cmbArea, item.areaList[i].name, null,item.areaList[i].sleep);
        }
        cmbSelect(cmbArea, defaultArea);
    }
    function changeProvince()
    {
        cmbCity.options.length = 0;
        cmbCity.onchange = null;
        if(cmbProvince.selectedIndex == -1)return;
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        for(var i=0; i<item.cityList.length; i++)
        {
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i]);
        }
        cmbSelect(cmbCity, defaultCity);
        changeCity();
        cmbCity.onchange = changeCity;
    }
   function cmbAddOption2(cmb, str, obj, val)
    {
        var option = document.createElement('OPTION');
        cmb.options.add(option);
        option.innerText = str;
        option.value = val;
        option.obj = obj;
    }
    for(var i=0; i<provinceList.length; i++)
    {
        cmbAddOption2(cmbProvince, provinceList[i].name, provinceList[i],provinceList[i].sleep);
    }
    cmbSelect(cmbProvince, defaultProvince);
    changeProvince();
    cmbProvince.onchange = changeProvince;
}

var provinceList = [
{name:'全部',sleep:'', cityList:[{name:'等于', areaList:[{name:'请选择',sleep:"请选择"}]}]},
{name:'性别', sleep:'AB10_AAB003',cityList:[{name:'等于', areaList:[{name:'女性',sleep:"1"},{name:'男性',sleep:"2"},{name:'未说明性别',sleep:"9"}]},{name:'为空'}]},
{name:'年龄',sleep:"AB10_AAB005", cityList:[{name:'等于', areaList:[]}, {name:'大于', areaList:[]}, {name:'大于等于', areaList:[]}, {name:'小于', areaList:[]},{name:'小于等于', areaList:[]}]},
{name:'与户主关系',sleep:"AB01_AAB006", cityList:[
{name:'等于', areaList:[{name:'本人或户主',sleep:"01"},{name:'配偶',sleep:'02'},{name:'之子',sleep:'03'},{name:'之女',sleep:'04'},{name:'之儿媳',sleep:'05'},{name:'之女婿',sleep:'06'},{name:'之孙子',sleep:'07'},{name:'之孙女',sleep:'08'},{name:'之外孙子',sleep:'09'},{name:'之外孙女',sleep:'10'},{name:'之父',sleep:'11'},{name:'之母',sleep:'12'},{name:'之岳父',sleep:'13'},{name:'之岳母',sleep:'14'},{name:'之公公',sleep:'15'},{name:'之婆婆',sleep:'16'},{name:'之祖父',sleep:'17'},{name:'之祖母',sleep:'18'},{name:'之外祖父',sleep:'19'},{name:'之外祖母',sleep:'20'},{name:'其他',sleep:'99'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'是否现役军人',sleep:"AB01_AAB019",cityList:[
{name:'等于', areaList:[{name:'是',sleep:'1'},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'是否享受低保',sleep:"AB01_AAB030", cityList:[
{name:'等于', areaList:[{name:'是',sleep:'1'},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'是否享受五保',sleep:"AB01_AAB003", cityList:[
{name:'等于', areaList:[{name:'是',sleep:'1'},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'是否参加大病保险',sleep:"AB01_AAB022", cityList:[
{name:'等于', areaList:[{name:'是',sleep:'1'},{name:'否',sleep:'0'}]},
{name:'为空'},
{name:'不为空'}
]},
//{name:'是否参加新型合作医疗',sleep:"AB01_AAB013", cityList:[{name:'等于', areaList:[{name:'未参加',sleep:'0'},{name:'参加',sleep:'1'}]}, {name:'不等于', areaList:[{name:'未参加',sleep:'0'},{name:'参加',sleep:'1'}]}]},
{name:'务工企业名称',sleep:'AB01_AAB029', cityList:[
{name:'等于', areaList:[]},
{name:'为空'},
{name:'不为空'}
]},
{name:'务工时间',sleep:'AB01_AAB012', cityList:[
{name:'等于', areaList:[]},
{name:'大于', areaList:[]},
{name:'大于等于', areaList:[]},
{name:'小于', areaList:[]},
{name:'小于等于', areaList:[]},
{name:'为空'},
{name:'不为空'}
]},
{name:'证件类型',sleep:"AB10_AAB018", cityList:[
{name:'等于', areaList:[{name:'居民身份证',sleep:'01'},{name:'中国人民解放军军官证',sleep:'02'},{name:'残疾人证',sleep:'09'}]},
{name:'为空'},
{name:'不为空'}
]},
//{name:'证件号码', cityList:[
//{name:'等于', areaList:[]},
//{name:'包含', areaList:[]},
//{name:'不包含', areaList:[]},
//{name:'为空', areaList:[]},
//{name:'不为空', areaList:[]}
//]},
{name:'证件号码长度',sleep:'AB10_AAB004LENGTH', cityList:[
{name:'等于', areaList:[]},
{name:'大于', areaList:[]},
{name:'大于等于', areaList:[]},
{name:'小于', areaList:[]},
{name:'小于等于', areaList:[]},
{name:'为空'},
{name:'不为空'}
]},
{name:'联系电话',sleep:'AB01_AAB031', cityList:[
{name:'等于', areaList:[]},
{name:'为空'},
{name:'不为空'}
]},
{name:'患病名称',sleep:'AB01_ABB001', cityList:[
{name:'等于', areaList:[]},
{name:'为空'},
{name:'不为空'}
]},
{name:'疾病等级',sleep:'AB01_ABB002', cityList:[
{name:'等于', areaList:[]},
{name:'为空'},
{name:'不为空'}
]},
{name:'民族',sleep:"AB10_AAB007",cityList:[
{name:'等于', areaList:[{name:'汉族',sleep:'01'},{name:'满族',sleep:'02'},{name:'回族',sleep:'03'},{name:'蒙古族',sleep:'04'},{name:'藏族',sleep:'05'},{name:'维吾尔族',sleep:'06'},{name:'苗族',sleep:'07'},{name:'彝族',sleep:'08'},{name:'壮族',sleep:'09'},{name:'布依族',sleep:'10'},{name:'朝鲜族',sleep:'11'},{name:'侗族',sleep:'12'},{name:'瑶族',sleep:'13'},{name:'白族',sleep:'14'},{name:'土家族',sleep:'15'},{name:'哈尼族',sleep:'16'},{name:'哈萨克族',sleep:'17'},{name:'傣族',sleep:'18'},{name:'黎族',sleep:'19'},{name:'傈僳族',sleep:'20'},{name:'佤族',sleep:'21'},{name:'畲族',sleep:'22'},{name:'高山族',sleep:'23'},{name:'拉祜族',sleep:'24'},{name:'水族',sleep:'25'},{name:'东乡族',sleep:'26'},{name:'纳西族',sleep:'27'},{name:'景颇族',sleep:'28'},{name:'柯尔克孜族',sleep:'29'},{name:'土族',sleep:'30'},{name:'达斡尔族',sleep:'31'},{name:'仫佬族',sleep:'32'},{name:'羌族',sleep:'33'},{name:'布朗族',sleep:'34'},{name:'撒拉族',sleep:'35'},{name:'毛南族',sleep:'36'},{name:'仡佬族',sleep:'37'},{name:'锡伯族',sleep:'38'},{name:'阿昌族',sleep:'39'},{name:'普米族',sleep:'40'},{name:'塔吉克族',sleep:'41'},{name:'怒族',sleep:'42'},{name:'乌孜别克族',sleep:'43'},{name:'俄罗斯族',sleep:'44'},{name:'鄂温克族',sleep:'45'},{name:'德昂族',sleep:'46'},{name:'保安族',sleep:'47'},{name:'裕固族',sleep:'48'},{name:'京族',sleep:'49'},{name:'塔塔尔族',sleep:'50'},{name:'独龙族',sleep:'51'},{name:'鄂伦春族',sleep:'52'},{name:'赫哲族',sleep:'53'},{name:'门巴族',sleep:'54'},{name:'珞巴族',sleep:'55'},{name:'基诺族',sleep:'56'},{name:'其他',sleep:'99'}]},
{name:'为空'},
{name:'不为空'}
]},
{name:'政治面貌',sleep:"AB01_AAK033", cityList:[
{name:'等于', areaList:[{name:'中共党员',sleep:'01'},{name:'中共预备党员',sleep:'02'},{name:'共青团员',sleep:'03'},{name:'民革会员',sleep:'04'},{name:'民盟盟员',sleep:'05'},{name:'民建会员',sleep:'06'},{name:'民进会员',sleep:'07'},{name:'农工党党员',sleep:'08'},{name:'致公党党员',sleep:'09'},{name:'九三学社社员',sleep:'10'},{name:'台盟盟员',sleep:'11'},{name:'无党派民主人士',sleep:'12'},{name:'群众',sleep:'13'}]},
{name:'为空'},
{name:'不为空'}
 ]},
{name:'文化程度', sleep:"AB01_AAB008",cityList:[
{name:'等于', areaList:[{name:'文盲或者半文盲',sleep:'01'},{name:'小学',sleep:'02'},{name:'初中',sleep:'03'},{name:'高中',sleep:'04'},{name:'大专及以上',sleep:'05'},{name:'学龄前儿童',sleep:'06'}]},
{name:'为空'},
{name:'不为空'}
 ]},
{name:'健康状况',sleep:"AB01_AAB017", cityList:[
{name:'等于', areaList:[{name:'健康',sleep:'01'},{name:'长期慢性病',sleep:'02'},{name:'患有大病',sleep:'03'},{name:'残疾',sleep:'04'}]},
{name:'包含', areaList:[{name:'健康',sleep:'01'},{name:'长期慢性病',sleep:'02'},{name:'患有大病',sleep:'03'},{name:'残疾',sleep:'04'}]},
{name:'不包含', areaList:[{name:'健康',sleep:'01'},{name:'长期慢性病',sleep:'02'},{name:'患有大病',sleep:'03'},{name:'残疾',sleep:'04'}]},
{name:'为空'},
{name:'不为空'}
 ]},
{name:'劳动技能',sleep:"AB01_AAB010", cityList:[
{name:'等于', areaList:[{name:'普通劳动力',sleep:'01'},{name:'技能劳动力',sleep:'02'},{name:'丧失劳动力',sleep:'03'},{name:'无劳动力',sleep:'04'}]},
{name:'为空'},
{name:'不为空'}
 ]},
{name:'在校生状况',sleep:"AB01_AAB009", cityList:[
{name:'等于', areaList:[{name:'非在校生',sleep:'01'},{name:'学前教育',sleep:'02'},{name:'小学',sleep:'03'},{name:'七年级',sleep:'04'},{name:'八年级',sleep:'05'},{name:'九年级',sleep:'06'},{name:'高中一年级',sleep:'07'},{name:'高中二年级',sleep:'08'},{name:'高中三年级',sleep:'09'},{name:'中职一年级',sleep:'10'},{name:'中职二年级',sleep:'11'},{name:'中职三年级',sleep:'12'},{name:'高职一年级',sleep:'13'},{name:'高职二年级',sleep:'14'},{name:'高职三年级',sleep:'15'},{name:'大专及以上',sleep:'16'}]},
{name:'不等于', areaList:[{name:'非在校生',sleep:'01'},{name:'学前教育',sleep:'02'},{name:'小学',sleep:'03'},{name:'七年级',sleep:'04'},{name:'八年级',sleep:'05'},{name:'九年级',sleep:'06'},{name:'高中一年级',sleep:'07'},{name:'高中二年级',sleep:'08'},{name:'高中三年级',sleep:'09'},{name:'中职一年级',sleep:'10'},{name:'中职二年级',sleep:'11'},{name:'中职三年级',sleep:'12'},{name:'高职一年级',sleep:'13'},{name:'高职二年级',sleep:'14'},{name:'高职三年级',sleep:'15'},{name:'大专及以上',sleep:'16'}]},
{name:'为空'},
{name:'不为空'}
]},
];