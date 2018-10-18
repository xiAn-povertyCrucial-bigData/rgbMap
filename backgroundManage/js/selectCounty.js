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
            cmbAddOption(cmbArea, item.areaList[i], null);    
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
        
    for(var i=0; i<provinceList.length; i++)    
    {    
        cmbAddOption(cmbProvince, provinceList[i].name, provinceList[i]);    
    }    
    cmbSelect(cmbProvince, defaultProvince);    
    changeProvince();    
    cmbProvince.onchange = changeProvince;    
}    
    
var provinceList = [  
{name:'全部', cityList:[             
{name:'等于', areaList:['全选']}
               
]},       
{name:'乡（镇）数（个）', cityList:[             
{name:'全部', areaList:[]},  
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}        
]},       
{name:'行政村数（个）', cityList:[             
{name:'全部', areaList:[]},  
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}             
]},  
{name:'贫困村数（个）', cityList:[             
{name:'全部', areaList:[]},  
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}  
]},  
{name:'自然村数（个）', cityList:[ 
{name:'全部', areaList:[]},  
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}  
]},  
{name:'总户数（户）', cityList:[ 
{name:'全部', areaList:[]},  
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}  
]},    
{name:'乡村户数（户）', cityList:[ 
{name:'全部', areaList:[]},  
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}  
]}, 
{name:'低保户数（户）', cityList:[ 
{name:'全部', areaList:[]},  
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}  
]}, 
{name:'五保户数（户）', cityList:[             
{name:'全部', areaList:[]},               
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}              
]},
{name:'贫困户数（户）', cityList:[             
{name:'全部', areaList:[]},               
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}   
]},    
{name:'总人口（人）', cityList:[
{name:'全部', areaList:[]},               
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}                     
]},    
{name:'乡村人口（人）', cityList:[             
{name:'全部', areaList:[]},               
{name:'大于', areaList:[]},           
{name:'大于等于', areaList:[]},           
{name:'等于', areaList:[]},  
{name:'小于', areaList:[]},   
{name:'小于等于', areaList:[]}           
]},    
{name:'少数民族人口（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]}, 
{name:'大于等于', areaList:[]},                
{name:'等于', areaList:[]},             
{name:'小于', areaList:[]},              
{name:'小于等于', areaList:[]}            
]}, 
{name:'低保人口（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},            
{name:'大于等于', areaList:[]},             
{name:'等于', areaList:[]},
{name:'小于',areaList:[]},
{name:'小于等于',areaList:[]} 
]},   
{name:'五保人口（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},            
{name:'大于等于', areaList:[]},             
{name:'等于', areaList:[]},
{name:'小于',areaList:[]},
{name:'小于等于',areaList:[]},
{name:'为空',areaList:[]},
{name:'不为空',areaList:[]}
 ]},
   
{name:'妇女人口（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},            
{name:'大于等于', areaList:[]},             
{name:'等于', areaList:[]},
{name:'小于',areaList:[]},
{name:'小于等于',areaList:[]}
]},    
{name:'贫困人口', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']},
]},
{name:'参加新型农村社会养老保险人数', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'参加大病保险人数（人）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'行政区域土地面积（平方公里）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'国有林场数（个）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'国有贫困林场数（个）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'耕地面积（公顷）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'基本农田面积（公顷）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'有效灌溉面积（公顷）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'林地面积（公顷）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'退耕还林面积', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'林果面积', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]}, 
{name:'牧草地面积', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'水域面积', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'荒漠化面积（公顷）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'石漠化面积', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'森林覆盖率（%）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'退耕还草面积（公顷）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'地区生产总值GDP（万元）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'第一产业（万元）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'第二产业（万元）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'第三产业', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'地区生产总值增长率（%）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
]},
{name:'地区公共财政预算收入（万元）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]},
{name:'地区公共财政预算支出（万元）', cityList:[     
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}            
]}, 

{name:'地区公共财政扶贫预算支出（万元）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}              
]}, 
{name:'农村居民人均纯收入（元）', cityList:[             
{name:'全部', areaList:['']},            
{name:'大于', areaList:['']},      
{name:'大于等于', areaList:['']},                  
{name:'等于', areaList:['']},                   
{name:'小于', areaList:['']},                   
{name:'小于等于', areaList:['']},
{name:'为空', areaList:['']},                   
{name:'不为空', areaList:['']}
]}, 
{name:'农村居民人均纯收入增长率（%）', cityList:[             
{name:'等于', areaList:[]},   
{name:'大于', areaList:[]},  
{name:'大于等于', areaList:[]},
{name:'小于', areaList:[]}, 
{name:'小于等于', areaList:[]},                                            
{name:'为空', areaList:[]},              
{name:'不为空', areaList:[]}             
]}, 
{name:'县城是否通二级及以上高等级公路', cityList:[             
{name:'全部', areaList:['是','否']},
{name:'等于',areaList:['是','否']},                                              
{name:'为空', areaList:['是','否']},              
{name:'不为空', areaList:['是','否']}             
]}, 
{name:'二级及以上高等级公路里程数（公里）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]}, 
{name:'高速公路里程数（公里）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]}, 
{name:'通（沥青/水泥）公路行政村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'通客运班车行政村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'交通部门资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'交通中央资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'交通省级资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'交通市县资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'已实现安全饮水人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'已解决安全饮水农村学校（个）数', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'已解决安全饮水农村学校率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'引用自来水户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'（石砌/水泥砌）水渠长度（公里）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'水利部门资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},
{name:'水利中央资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},       
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}
]},

{name:'水利省级资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'水利市县资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'通电行政村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'通生产用电行政村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'通电户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'无电人口数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'电力能源部门资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'电力中央资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'电力省级资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'电力市县资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'危房户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'住建部门资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'危房中央资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'危房省级资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'危房市县资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'农民专业合作组织数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'有农民专业合作组织的行政村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'有互助资金组织的行政村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'参加贫困村互助资金组织户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'互助资金借款户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'贫困户借款户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'互助资金累计借款人次（人次）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'互助资金累计发放借款（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'贫困户借款（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},  
{name:'互助资金累计还款（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'贫困户还款（元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'农业、林业部门资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'农林部门中央资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'农林部门省级资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'农林部门市县资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'农村青年创业小额贷款（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'妇女小额担保贷款（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'残疾人康复扶贫贷款（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'开展乡村旅游的贫困村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'乡村旅游游客接待量（万人次）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'乡村旅游从业人员数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'乡村旅游总收入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'学前三年教育毛入园率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'高中阶段教育毛入学率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'九年义务教育阶段巩固率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'教育部门资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'教育部门中央资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'教育部门省级资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'教育部门市县资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'有卫生院的乡镇数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'有卫生室行政村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'人口自然增长率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'妇女总和生育率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'参加新型农村合作医疗人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'参加城镇职工基本医疗保险人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'参加城镇居民基本医疗保险人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'出生人口政策符合率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'县域外转诊率（%）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'每千人口医疗卫生机构床位数(张)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'每千人口卫生计生技术人员数(人)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'每千人口执业（助理）医师数(人)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
 {name:'每千人口注册护士数(人)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'卫计部门资金投入(万元)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'卫计部门中央资金投入(万元)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'卫计部门省级资金投入(万元) ', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'卫计部门市县资金投入(万元)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'县级公共图书馆数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'县级文化馆数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'有综合文化站乡镇数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'有文化/图书室行政村数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'通广播电视行政村数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'通广播电视自然村数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'文化部门资金投入(万元)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'文化部门中央资金投入(万元)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'文化部门省级资金投入(万元)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'文化部门市县资金投入(万元)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'通宽带网络行政村数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'通宽带网络自然村（20户以上）数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'未通宽带的义务教育学校、普通高中、职业院校数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'手机能上网行政村数(个)', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'雨露计划培训人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'新成长劳动力职业教育培训人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'中高等职业教育（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'劳动预备制培训（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'劳动力转移就业培训人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'农村适用技能培训人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'贫困村致富带头人培训人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'雨露计划资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'中央财政专项资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'省级及以下专项资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'扶贫小额信贷覆盖贫困村数（个）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'扶贫小额信贷贷款户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'扶贫小额信贷发放总额（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'发展种植业、林果业（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'发展养殖业（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'发展加工业（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'发展服务业、运输业（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'其他（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'发展加工业（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'发展服务业、运输业（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'其他（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'支付扶贫小额信贷贴息资金（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'地方贴息资金（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'扶贫小额信贷当年到期贷款额（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'扶贫小额信贷当年到期贷款回收额（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'扶贫小额信贷贷款余额（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'纳入易地扶贫搬迁规划户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'纳入易地扶贫搬迁规划人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'完成易地扶贫搬迁户数（户）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'完成易地扶贫搬迁人数（人）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'易地扶贫搬迁资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'中央预算内补助投资（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'中央财政专项资金投入', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'省级专项资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]},
{name:'市县专项资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}, 
{name:'其他资金投入（万元）', cityList:[             
{name:'全部', areaList:[]},            
{name:'大于', areaList:[]},      
{name:'大于等于', areaList:[]},                  
{name:'等于', areaList:[]},                   
{name:'小于', areaList:[]},                   
{name:'小于等于', areaList:[]}         
]}
];   