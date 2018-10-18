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
            if(cmb.options[i].value == str)    
            {    
                cmb.selectedIndex = i;    
                return;    
            }    
        }    
    }    
    function cmbAddOption(cmb, str, obj, num)    
    {    
        var option = document.createElement('OPTION');    
        cmb.options.add(option);    
        option.innerText = str;    
        option.value = num;    
        option.obj = obj;   
        console.log(num) 
    }    
        
   
    function changeProvince()    
    {    
        cmbCity.options.length = 0;    
        cmbCity.onchange = null;    
        if(cmbProvince.selectedIndex == -1)return;    
        var item = cmbProvince.options[cmbProvince.selectedIndex].obj;
        //console.log(item)    
        for(var i=0; i<item.cityList.length; i++)    
        {    
            cmbAddOption(cmbCity, item.cityList[i].name, item.cityList[i],item.cityList[i].sleep);   
        }    
        cmbSelect(cmbCity, defaultCity);    
    }    
        
    for(var i=0; i<provinceList.length; i++)    
    {    
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i],provinceList[i].sleep);    
    }    
    cmbSelect(cmbProvince, defaultProvince);    
    changeProvince();    
    cmbProvince.onchange = changeProvince;    
}    
    
var provinceList = [  
{   name:'全部',sleep:'0',
    cityList:[{name:'全部',sleep:'0'}]
},       
{name:'脱贫户未解决两不愁三保障',sleep:'1', cityList:[               
{name:'全部',sleep:'0'},          
{name:'2014年初脱贫户人均纯收入低于国家贫困标准2952元',sleep:'1'},  
{name:'2015年初脱贫户人均纯收入低于国家贫困标准2952元',sleep:'2'},           
{name:'2016年初脱贫户人均纯收入低于国家贫困标准2952元',sleep:'3'},           
{name:'2017年初脱贫户人均纯收入低于国家贫困标准2952元',sleep:'4'},  
{name:'2014年初脱贫户有义务教育辍学情况（健康适龄儿童辍学）',sleep:'5'},   
{name:'2015年初脱贫户有义务教育辍学情况（健康适龄儿童辍学）',sleep:'6'},
{name:'2016年初脱贫户有义务教育辍学情况（健康适龄儿童辍学）',sleep:'7'},   
{name:'2017年初脱贫户有义务教育辍学情况（健康适龄儿童辍学）',sleep:'8'},  
{name:'2014年初脱贫户住危房',sleep:'9'}, 
{name:'2015年初脱贫户住危房',sleep:'10'},   
{name:'2016年初脱贫户住危房',sleep:'11'}, 
{name:'2017年初脱贫户住危房',sleep:'12'}, 
{name:'2014年初脱贫户未解决饮水问题',sleep:'13'},
{name:'2015年初脱贫户未解决饮水问题',sleep:'14'},
{name:'2016年初脱贫户未解决饮水问题',sleep:'15'},
{name:'2017年初脱贫户未解决饮水问题',sleep:'16'}, 
{name:'2014年初因病致贫脱贫户有患病成员但未参加大病保险',sleep:'17'},
{name:'2015年初因病致贫脱贫户有患病成员但未参加大病保险',sleep:'18'},
{name:'2016年初因病致贫脱贫户有患病成员但未参加大病保险',sleep:'19'},
{name:'2017年初因病致贫脱贫户有患病成员但未参加大病保险',sleep:'10'},
{name:'2014年初脱贫户住房面积为0（含空）',sleep:'21'},
{name:'2015年初脱贫户住房面积为0（含空）',sleep:'22'},
{name:'2016年初脱贫户住房面积为0（含空）',sleep:'23'},
{name:'2017年初脱贫户住房面积为0（含空）',sleep:'24'}
]},       
{name:'证件号码异常',sleep:'2', cityList:[              
{name:'全部',sleep:'0'},           
{name:'证件号码位数异常（证件号码非15、18、20、22位）',sleep:'1'},  
{name:'15位证件号码需要升级为18位',sleep:'2'},           
{name:'身份证号码不符合校验规则',sleep:'3'},           
{name:'残疾人证不符合校验规则',sleep:'4'}           
]},  
{name:'重要指标为空',sleep:'3',cityList:[             
{name:'全部',sleep:'0'},            
{name:'民族为空',sleep:'1'},  
{name:'文化程度为空（非在校生）',sleep:'2'},           
{name:'在校生情况为空（6-23岁）',sleep:'3'},           
{name:'健康状况为空',sleep:'4'},  
{name:'劳动能力为空（16-65岁）',sleep:'5'},   
{name:'贫困户无户主',sleep:'6'},
{name:'残疾人无残疾证',sleep:'7'},
{name:'主要致贫原因为空',sleep:'8'},
{name:'是否通生产用电为空',sleep:'9'},
{name:'是否加入农民专业合作社为空',sleep:'10'},
{name:'与村主干路距离为空',sleep:'11'},
{name:'入户路类型为空',sleep:'12'},
{name:'住房面积为空',sleep:'13'},
{name:'是否通生活用电为空',sleep:'14'},
{name:'饮水是否困难为空',sleep:'15'},
{name:'饮水是否安全为空',sleep:'16'},
{name:'主要燃料类型为空',sleep:'17'}, 
{name:'有无卫生厕所为空',sleep:'18'}
]},  
{name:'致贫原因问题',sleep:'4', cityList:[             
{name:'全部',sleep:'0'},
{name:'主要致贫原因为“因病”，而贫困家庭成员均健康',sleep:'1'},  
{name:'主要致贫原因为“因学”，而贫困家庭无在校生',sleep:'2'},           
{name:'主要致贫原因为“因残”，而贫困家庭无残疾人口',sleep:'3'},           
{name:'其他致贫原因与主要致贫原因重复',sleep:'4'}   
]},  
{name:'贫困户低保、五保问题',sleep:'5', cityList:[            
{name:'全部',sleep:'0'}, 
{name:'低保（贫困）户中家庭中无享受低保成员',sleep:'1'},  
{name:'一般农（贫困）户中家庭有享受低保成员',sleep:'2'},           
{name:'五保（贫困）户存在16-65周岁的劳动力',sleep:'3'},           
{name:'同时领取低保金和五保金',sleep:'4'},  
{name:'一般农（贫困）户领取低保五保金',sleep:'5'},   
{name:'低保（贫困）户领取低保金为0（含空）',sleep:'6'},
{name:'五保（贫困）户领取五保金为0（含空）',sleep:'7'}  
]},    
{name:'劳动能力问题',sleep:'6', cityList:[             
{name:'全部',sleep:'0'},
{name:'劳动年龄健康人口丧失劳动力',sleep:'1'},  
{name:'劳动年龄非在校生健康人口（非在校生）无劳动力',sleep:'2'}            
]}, 
{name:'收入问题', sleep:'7',cityList:[             
{name:'全部',sleep:'0'},
{name:'有生产经营性收入无生产经营性支出',sleep:'1'},  
{name:'人均纯收入小于等于0（含空）或超过10万',sleep:'2'}             
]}, 
{name:'务工状况问题',sleep:'8', cityList:[             
{name:'全部',sleep:"0"},            
{name:'务工时间不符合逻辑或录入规则（0-12个月）',sleep:"1"},               
{name:'有务工情况（有务工地）但务工时间为0（含空）',sleep:"2"},           
{name:'无务工情况（无务工地）但有务工时间（1-12个月）',sleep:"3"},           
{name:'贫困人口无劳动能力或丧劳-有外出务工情况（有务工地、有务工时间）',sleep:"4"},  
{name:'贫困户有工资性收入，无务工人员',sleep:"5"},   
{name:'贫困户家庭有务工人员，无工资性收入',sleep:"6"}              
]},
{name:'帮扶责任人问题',sleep:'9', cityList:[               
{name:'全部',sleep:"0"},          
{name:'贫困户无帮扶责任',sleep:"1"},               
{name:'既是帮扶责任人又是贫困人口',sleep:"2"}               
]},    
{name:'指标值异常或指标间逻辑错误',sleep:'10', cityList:[            
{name:'全部',sleep:"0"},
{name:'贫困户空挂',sleep:"1"},               
{name:'“与户主关系”与“性别”对应关系异常',sleep:"2"},           
{name:'户主与配偶同性别',sleep:"3"},           
{name:'人均耕地面积数值过大（大于50亩）',sleep:"4"},  
{name:'人均林地面积数值过大（大于70亩）',sleep:"5"},   
{name:'与村主干路距离超过50公里',sleep:"6"},
{name:'14岁及以下在校生状况为高中及以上',sleep:"7"},
{name:'20岁及以上在校生状况为小学及以下',sleep:"8"},
{name:'三年指标相同的在校生',sleep:"9"}                    
]},    
{name:'人员重复问题',sleep:'11', cityList:[               
{name:'全部',sleep:"0"},          
{name:'省内人员重复',sleep:"1"},               
{name:'省内市外人员重复',sleep:"2"},           
{name:'市内县外人员重复',sleep:"3"},           
{name:'县内人员重复',sleep:"4"}         
]}, 
];   