!function(e){var o={};function l(c){if(o[c])return o[c].exports;var t=o[c]={i:c,l:!1,exports:{}};return e[c].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=e,l.c=o,l.d=function(e,o,c){l.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:c})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,o){if(1&o&&(e=l(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(l.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var t in e)l.d(c,t,function(o){return e[o]}.bind(null,t));return c},l.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(o,"a",o),o},l.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},l.p="",l(l.s=6)}([function(e,o){let l=1;e.exports={setCounty:function(e,o){if(window.localStorage)try{!function(e){e.forEach(e=>{let o=[];"西咸新区"===e.attributes.NAME?e.geometry.components.forEach(e=>{o.push({points:e.components[0].components.map(e=>({x:e.x,y:e.y}))})}):o=e.geometry.components[0].components[0].components.map(e=>({x:e.x,y:e.y})),e.geometry=o})}(o),window.localStorage.setItem(e,JSON.stringify(o))}catch(e){console.log("缓存出错"+e)}else console.log("浏览器不支持 localStoreage 不做数据缓存")},getCounty:function(e){try{return function(){let e=[];return localCounty.forEach(o=>{if("西咸新区"===o.attributes.NAME){let l=[];o.geometry.forEach(function(e){let o=[];e.points.forEach(e=>{o.push(new SuperMap.Geometry.Point(e.x,e.y))});let c=new SuperMap.Geometry.LinearRing(o),t=new SuperMap.Geometry.Polygon([c]);l.push(t)});let c=new SuperMap.Geometry.MultiPolygon(l);e.push({geometry:c,style:o.style,attributes:o.attributes})}else{let l=[];o.geometry.forEach(function(e){l.push(new SuperMap.Geometry.Point(e.x,e.y))});let c=new SuperMap.Geometry.LinearRing(l),t=new SuperMap.Geometry.Polygon([c]),a=new SuperMap.Geometry.MultiPolygon([t]);e.push({geometry:a,style:o.style,attributes:o.attributes})}}),e}()}catch(e){return console.log(e),null}},setVillage:function(e,o){if(window.localStorage)try{!function(e){e.forEach(e=>{arr=e.geometry.components[0].components[0].components.map(e=>({x:e.x,y:e.y})),e.geometry=arr})}(o),window.localStorage.setItem(e,JSON.stringify(o))}catch(e){console.log("缓存出错"+e)}else console.log("浏览器不支持 localStoreage 不做数据缓存")},getVillage:function(e){try{return function(e){let o=[];return localPoorVillge.forEach(e=>{let l=[];e.geometry.forEach(function(e){l.push(new SuperMap.Geometry.Point(e.x,e.y))});let c=new SuperMap.Geometry.LinearRing(l),t=new SuperMap.Geometry.Polygon([c]),a=new SuperMap.Geometry.MultiPolygon([t]);e.geometry=a,o.push(Object.assign({},e))}),o}()}catch(e){return console.log(e),null}},setAllVillage:function(e,o){if(window.localStorage)try{!function(e,o){var l=new File([o],e+".json",{type:"text/plain;charset=utf-8"});saveAs(l)}(e,JSON.stringify(o))}catch(e){console.log("缓存出错"+e)}else console.log("浏览器不支持 localStoreage 不做数据缓存")},getAllVillage:function e(){if(localVillage)return localVillage;setTimeout(function(){e(),console.log("第"+l+"获取数据")},100)}}},function(e,o){e.exports=[{county:"西咸新区",checkname:"新庄村",village:"新庄村",villagecode:"619905002006"},{county:"周至县",countycode:"610124000000",village:"黄兴村委会",villagecode:"610124006010",checkname:"黄兴村"},{county:"周至县",countycode:"610124000000",village:"五联村委会",villagecode:"610124020010",checkname:"五联村"},{county:"蓝田县",countycode:"610122000000",village:"湖滩村",villagecode:"610122019033",checkname:"下湖滩村"},{county:"蓝田县",countycode:"610122000000",village:"唐付村",villagecode:"610122020029",checkname:"唐凹村"},{county:"临潼区",countycode:"610115000000",village:"炮岭村委会",villagecode:"610115016005",checkname:"炮岭村"},{county:"蓝田县",countycode:"610122000000",village:"龙门村委会",villagecode:"610122014019",checkname:"龙门村"},{county:"蓝田县",countycode:"610122000000",village:"北小寨村",villagecode:"610122015045",checkname:"北小寨村"},{county:"蓝田县",countycode:"610122000000",village:"樊家村委会",villagecode:"610122015008",checkname:"樊家村"},{county:"临潼区",countycode:"610115000000",village:"芋坡村委会",villagecode:"610115011012",checkname:"芋坡村"},{county:"蓝田县",countycode:"610122000000",village:"九间房村",villagecode:"610122008027",checkname:"九间房村"},{county:"周至县",countycode:"610124000000",village:"向阳村委会",villagecode:"610124012013",checkname:"向阳村"},{county:"周至县",countycode:"610124000000",village:"复兴村委会",villagecode:"610124012002",checkname:"复兴村"},{county:"临潼区",countycode:"610115000000",village:"王湾村委会",villagecode:"610115009008",checkname:"王湾村"},{county:"鄠邑区",countycode:"610125000000",village:"甘峪口村委会",villagecode:"610125006012",checkname:"甘峪口村"},{county:"蓝田县",countycode:"610122000000",village:"上陈村委会",villagecode:"610122022009",checkname:"上陈村"},{county:"周至县",countycode:"610124000000",village:"群三兴村委会",villagecode:"610124013013",checkname:"群三兴村"},{county:"周至县",countycode:"610124000000",village:"东大墙村委会",villagecode:"610124022005",checkname:"东大墙村"},{county:"周至县",countycode:"610124000000",village:"丹阳村委会",villagecode:"610124022004",checkname:"丹阳村"},{county:"蓝田县",countycode:"610122000000",village:"瓦屋庄村",villagecode:"610122003035",checkname:"瓦屋庄村"},{county:"周至县",countycode:"610124000000",village:"双兴村委会",villagecode:"610124006029",checkname:"东寨村"},{county:"周至县",countycode:"610124000000",village:"魏家庄村委会",villagecode:"610124010021",checkname:"魏家庄村"},{county:"周至县",countycode:"610124000000",village:"老县城村委会",villagecode:"610124007007",checkname:"老县城村"},{county:"蓝田县",countycode:"610122000000",village:"新房村委会",villagecode:"610122014011",checkname:"新房村"},{county:"临潼区",countycode:"610115000000",village:"庄王村委会",villagecode:"610115011014",checkname:"庄王村"},{county:"鄠邑区",countycode:"610125000000",village:"蔡家坡村村委会",villagecode:"610125010041",checkname:"蔡家坡村"},{county:"蓝田县",countycode:"610122000000",village:"姚村",villagecode:"610122011042",checkname:"姚村"},{county:"蓝田县",countycode:"610122000000",village:"邵家寨村委会",villagecode:"610122012028",checkname:"邵家寨村"},{county:"蓝田县",countycode:"610122000000",village:"贺凹村",villagecode:"610122012010",checkname:"贺凹村"},{county:"临潼区",countycode:"610115000000",village:"业池村委会",villagecode:"610115009013",checkname:"业池村"},{county:"蓝田县",countycode:"610122000000",village:"刘寨村",villagecode:"610122022006",checkname:"刘寨村"},{county:"周至县",countycode:"610124000000",village:"六合社区居委会",villagecode:"610124009023",checkname:"六合社区居"},{county:"周至县",countycode:"610124000000",village:"涌泉寺村委会",villagecode:"610124013032",checkname:"武家庄村"},{county:"周至县",countycode:"610124000000",village:"张龙村委会",villagecode:"610124022022",checkname:"张龙村"},{county:"周至县",countycode:"610124000000",village:"鸭沟村委会",villagecode:"610124022021",checkname:"鸭沟村"},{county:"周至县",countycode:"610124000000",village:"兰梅塬村委会",villagecode:"610124022010",checkname:"兰梅塬村"},{county:"周至县",countycode:"610124000000",village:"中军岭村委会",villagecode:"610124022023",checkname:"中军岭村"},{county:"蓝田县",countycode:"610122000000",village:"石船沟村",villagecode:"610122003037",checkname:"石船沟村"},{county:"蓝田县",countycode:"610122000000",village:"后李坪村委会",villagecode:"610122020007",checkname:"后李坪村"},{county:"鄠邑区",countycode:"610125000000",village:"紫阁峪村村委会",villagecode:"610125002048",checkname:"紫峪村"},{county:"蓝田县",countycode:"610122000000",village:"红门寺村",villagecode:"610122018021",checkname:"红门寺村"},{county:"蓝田县",countycode:"610122000000",village:"北苍湾村",villagecode:"610122014016",checkname:"北苍湾村"},{county:"蓝田县",countycode:"610122000000",village:"南湾岭村",villagecode:"610122014014",checkname:"南湾岭"},{county:"蓝田县",countycode:"610122000000",village:"过风岭村委会",villagecode:"610122014004",checkname:"过风岭村"},{county:"蓝田县",countycode:"610122000000",village:"磨李村",villagecode:"610122015046",checkname:"磨李村"},{county:"鄠邑区",countycode:"610125000000",village:"八里坪村委会",villagecode:"610125010002",checkname:"八里坪村"},{county:"周至县",countycode:"610124000000",village:"渭友村委会",villagecode:"610124005013",checkname:"渭友村"},{county:"周至县",countycode:"610124000000",village:"就峪村委会",villagecode:"610124011035",checkname:"后就峪村"},{county:"临潼区",countycode:"610115000000",village:"门岩村委会",villagecode:"610115009003",checkname:"门岩村"},{county:"周至县",countycode:"610124000000",village:"高潮村委会",villagecode:"610124001003",checkname:"高潮村"},{county:"周至县",countycode:"610124000000",village:"长坪村委会",villagecode:"610124001001",checkname:"长坪村"},{county:"周至县",countycode:"610124000000",village:"孙六村委会",villagecode:"610124002010",checkname:"孙六村"},{county:"周至县",countycode:"610124000000",village:"马滩村委会",villagecode:"610124009013",checkname:"马滩村"},{county:"周至县",countycode:"610124000000",village:"西沟村委会",villagecode:"610124022025",checkname:"西沟村"},{county:"周至县",countycode:"610124000000",village:"景联社区居委会",villagecode:"610124020019",checkname:"景联村"},{county:"蓝田县",countycode:"610122000000",village:"岱峪村",villagecode:"610122019031",checkname:"上岱峪村"},{county:"蓝田县",countycode:"610122000000",village:"核桃沟村",villagecode:"610122018017",checkname:"核桃沟村"},{county:"临潼区",countycode:"610115000000",village:"玉川村委会",villagecode:"610115011011",checkname:"玉川村"},{county:"临潼区",countycode:"610115000000",village:"仁宗村委会",villagecode:"610115011008",checkname:"仁宗村"},{county:"蓝田县",countycode:"610122000000",village:"穆家坡村",villagecode:"610122012046",checkname:"穆家坡村"},{county:"周至县",countycode:"610124000000",village:"双庙子村委会",villagecode:"610124018006",checkname:"双庙子村"},{county:"周至县",countycode:"610124000000",village:"十亩地村委会",villagecode:"610124018005",checkname:"十亩地村"},{county:"临潼区",countycode:"610115000000",village:"三庙村委会",villagecode:"610115009006",checkname:"三庙村"},{county:"蓝田县",countycode:"610122000000",village:"峒峪村",villagecode:"610122022016",checkname:"峒峪村"},{county:"周至县",countycode:"610124000000",village:"东石门村委会",villagecode:"610124001002",checkname:"东石门村"},{county:"周至县",countycode:"610124000000",village:"清水河村委会",villagecode:"610124001008",checkname:"清水河村"},{county:"周至县",countycode:"610124000000",village:"金井村委会",villagecode:"610124002005",checkname:"金井村"},{county:"周至县",countycode:"610124000000",village:"黑虎村委会",villagecode:"610124002004",checkname:"黑虎村"},{county:"周至县",countycode:"610124000000",village:"共兴村委会",villagecode:"610124002003",checkname:"共兴村"},{county:"周至县",countycode:"610124000000",village:"上马村委会",villagecode:"610124013017",checkname:"上马村"},{county:"蓝田县",countycode:"610122000000",village:"东沟村",villagecode:"610122003034",checkname:"东沟村"},{county:"蓝田县",countycode:"610122000000",village:"白家村",villagecode:"610122003041",checkname:"白家村"},{county:"蓝田县",countycode:"610122000000",village:"阳坡村",villagecode:"610122003038",checkname:"阳坡村"},{county:"周至县",countycode:"610124000000",village:"陈公坊村委会",villagecode:"610124006028",checkname:"南陈村"},{county:"周至县",countycode:"610124000000",village:"何家寨村委会",villagecode:"610124010008",checkname:"何家寨村"},{county:"周至县",countycode:"610124000000",village:"八一村委会",villagecode:"610124007001",checkname:"八一村"},{county:"周至县",countycode:"610124000000",village:"东红村委会",villagecode:"610124003006",checkname:"东红村"},{county:"蓝田县",countycode:"610122000000",village:"南寨村",villagecode:"610122019026",checkname:"南寨村"},{county:"蓝田县",countycode:"610122000000",village:"七安子村",villagecode:"610122018023",checkname:"七安子村"},{county:"蓝田县",countycode:"610122000000",village:"西河村",villagecode:"610122018018",checkname:"西河村"},{county:"蓝田县",countycode:"610122000000",village:"甘家坪村",villagecode:"610122018022",checkname:"甘家坪村"},{county:"临潼区",countycode:"610115000000",village:"茨林村委会",villagecode:"610115011002",checkname:"茨林村"},{county:"蓝田县",countycode:"610122000000",village:"张家坪村",villagecode:"610122008033",checkname:"张家坪村"},{county:"鄠邑区",countycode:"610125000000",village:"沙窝村委会",villagecode:"610125010016",checkname:"沙窝村"},{county:"蓝田县",countycode:"610122000000",village:"石官寨村",villagecode:"610122011039",checkname:"石官寨村"},{county:"周至县",countycode:"610124000000",village:"神灵村委会",villagecode:"610124012011",checkname:"神灵村"},{county:"周至县",countycode:"610124000000",village:"老庄子村委会",villagecode:"610124018004",checkname:"老庄子村"},{county:"临潼区",countycode:"610115000000",village:"西岳村委会",villagecode:"610115009010",checkname:"西岳村"},{county:"临潼区",countycode:"610115000000",village:"东岳村委会",villagecode:"610115009016",checkname:"尖山村"},{county:"鄠邑区",countycode:"610125000000",village:"郝家寨村村委会",villagecode:"610125006045",checkname:"郝家庄村"},{county:"蓝田县",countycode:"610122000000",village:"杨寨村委会",villagecode:"610122022012",checkname:"杨寨村"},{county:"周至县",countycode:"610124000000",village:"窑岭村委会",villagecode:"610124002014",checkname:"新兴村"},{county:"周至县",countycode:"610124000000",village:"岭梅村委会",villagecode:"610124022011",checkname:"岭梅村"},{county:"蓝田县",countycode:"610122000000",village:"金坪村",villagecode:"610122003036",checkname:"金坪村"},{county:"周至县",countycode:"610124000000",village:"厚畛子村委会",villagecode:"610124007004",checkname:"厚畛子村"},{county:"周至县",countycode:"610124000000",village:"花耳坪村委会",villagecode:"610124007005",checkname:"花耳坪村"},{county:"周至县",countycode:"610124000000",village:"陈家村委会",villagecode:"610124003020",checkname:"陈北村"},{county:"临潼区",countycode:"610115000000",village:"小金村委会",villagecode:"610115016009",checkname:"小金村"},{county:"蓝田县",countycode:"610122000000",village:"董家岩村",villagecode:"610122018015",checkname:"董家岩村"},{county:"蓝田县",countycode:"610122000000",village:"锡水洞村",villagecode:"610122018020",checkname:"西杆庙村"},{county:"鄠邑区",countycode:"610125000000",village:"联西村村委会",villagecode:"610125015039",checkname:"青联村"},{county:"蓝田县",countycode:"610122000000",village:"何家川村委会",villagecode:"610122008005",checkname:"何家川村"},{county:"鄠邑区",countycode:"610125000000",village:"西河村委会",villagecode:"610125010025",checkname:"西河村"},{county:"周至县",countycode:"610124000000",village:"骆峪村委会",villagecode:"610124012007",checkname:"骆峪村"},{county:"周至县",countycode:"610124000000",village:"黄家湾社区居委会",villagecode:"610124012015",checkname:"黄家湾村"},{county:"蓝田县",countycode:"610122000000",village:"民李村委会",villagecode:"610122012021",checkname:"民李村"},{county:"周至县",countycode:"610124000000",village:"玉皇庙村委会",villagecode:"610124018008",checkname:"玉皇庙村"},{county:"周至县",countycode:"610124000000",village:"东涧沟村委会",villagecode:"610124018002",checkname:"东涧沟村"},{county:"临潼区",countycode:"610115000000",village:"穆柯寨村委会",villagecode:"610115009017",checkname:"穆寨村"},{county:"周至县",countycode:"610124000000",village:"长杨村委会",villagecode:"610124021033",checkname:"吴家屯村"},{county:"周至县",countycode:"610124000000",village:"四群村委会",villagecode:"610124013019",checkname:"四群村"},{county:"周至县",countycode:"610124000000",village:"塔庙村委会",villagecode:"610124022017",checkname:"塔庙村"},{county:"周至县",countycode:"610124000000",village:"民主村委会",villagecode:"610124022012",checkname:"民主村"},{county:"周至县",countycode:"610124000000",village:"五星村委会",villagecode:"610124022026",checkname:"五星村"},{county:"周至县",countycode:"610124000000",village:"下宝玉村委会",villagecode:"610124003018",checkname:"下宝玉村"},{county:"周至县",countycode:"610124000000",village:"清河村委会",villagecode:"610124003021",checkname:"清河村"},{county:"蓝田县",countycode:"610122000000",village:"蔡岩村",villagecode:"610122019025",checkname:"蔡岩村"},{county:"蓝田县",countycode:"610122000000",village:"骞湾村",villagecode:"610122020030",checkname:"骞家湾村"},{county:"临潼区",countycode:"610115000000",village:"毛湾村委会",villagecode:"610115016004",checkname:"毛湾村"},{county:"临潼区",countycode:"610115000000",village:"壕栗村委会",villagecode:"610115011005",checkname:"壕栗村"},{county:"蓝田县",countycode:"610122000000",village:"桐花沟村",villagecode:"610122008028",checkname:"桐花沟村"},{county:"蓝田县",countycode:"610122000000",village:"峪口村",villagecode:"610122008030",checkname:"峪口村"},{county:"蓝田县",countycode:"610122000000",village:"公王村委会",villagecode:"610122008003",checkname:"公王乡村"},{county:"周至县",countycode:"610124000000",village:"尚兴村委会",villagecode:"610124012010",checkname:"尚兴村"},{county:"蓝田县",countycode:"610122000000",village:"东山村委会",villagecode:"610122017040",checkname:"东山村"},{county:"鄠邑区",countycode:"610125000000",village:"柳泉口村村委会",villagecode:"610125006047",checkname:"柳泉村"},{county:"鄠邑区",countycode:"610125000000",village:"白龙沟村村委会",villagecode:"610125006043",checkname:"白龙村"},{county:"周至县",countycode:"610124000000",village:"新红村委会",villagecode:"610124001010",checkname:"新红村"},{county:"周至县",countycode:"610124000000",village:"辛口村委会",villagecode:"610124013025",checkname:"辛口村"},{county:"周至县",countycode:"610124000000",village:"郭寨村委会",villagecode:"610124013005",checkname:"郭寨村"},{county:"周至县",countycode:"610124000000",village:"东寨村委会",villagecode:"610124022006",checkname:"东寨村"},{county:"周至县",countycode:"610124000000",village:"余家村委会",villagecode:"610124010025",checkname:"余家村"},{county:"周至县",countycode:"610124000000",village:"耿西村委会",villagecode:"610124010012",checkname:"耿西村"},{county:"蓝田县",countycode:"610122000000",village:"野竹坪村委会",villagecode:"610122010013",checkname:"野竹坪村"},{county:"蓝田县",countycode:"610122000000",village:"马王村委会",villagecode:"610122020011",checkname:"马王村"},{county:"临潼区",countycode:"610115000000",village:"安庙村委会",villagecode:"610115016001",checkname:"安庙村"},{county:"临潼区",countycode:"610115000000",village:"欠湾村委会",villagecode:"610115016006",checkname:"欠湾村"},{county:"临潼区",countycode:"610115000000",village:"房岩村委会",villagecode:"610115011003",checkname:"房岩村"},{county:"周至县",countycode:"610124000000",village:"红旗村委会",villagecode:"610124012004",checkname:"红旗村"},{county:"周至县",countycode:"610124000000",village:"白杨林村委会",villagecode:"610124018001",checkname:"白杨林村"},{county:"鄠邑区",countycode:"610125000000",village:"侯王村村委会",villagecode:"610125004032",checkname:"西候村"},{county:"蓝田县",countycode:"610122000000",village:"葛牌村",villagecode:"610122003039",checkname:"葛牌街村"}]},function(e,o){e.exports={"西安市":{poorVillageNum:142},"周至县":{poorVillageNum:63,scale:.8},"蓝田县":{poorVillageNum:48,scale:1},"鄠邑区":{poorVillageNum:11,scale:2},"长安区":{poorVillageNum:0,scale:1.5},"临潼区":{poorVillageNum:19,scale:3},"西咸新区":{poorVillageNum:1,scale:1.4},"灞桥区":{poorVillageNum:0,scale:1.5},"高陵区":{poorVillageNum:0,scale:1.5},"国际港务区":{poorVillageNum:0,scale:1},"阎良区":{poorVillageNum:0,scale:1.5},"雁塔区":{poorVillageNum:-50,scale:1.5},"碑林区":{poorVillageNum:-50,scale:1.5},"未央区":{poorVillageNum:-50,scale:2},"莲湖区":{poorVillageNum:-50,scale:1},"新城区":{poorVillageNum:-50,scale:1}}},function(e,o){e.exports=[{county:"西咸新区",village:"新庄村",point:{lon:108.92126929849,lat:34.45814170071},scale:[{lon:108.91969691277,lat:34.458072872161},{lon:108.92030845643,lat:34.457439870833},{lon:108.92078052521,lat:34.458003134726},{lon:108.92163346768,lat:34.458384008406},{lon:108.92085562707,lat:34.458931179045},{lon:108.92021726132,lat:34.458679051398}]}]},function(e,o){e.exports=[{lon:109.14535652161,lat:34.436293334961},{lon:109.14896141052,lat:34.441614837647},{lon:109.15239463806,lat:34.444704742432},{lon:109.1558278656,lat:34.444704742432},{lon:109.15754447937,lat:34.443331451416},{lon:109.15874610901,lat:34.442129821778},{lon:109.15994773865,lat:34.440069885254},{lon:109.16200767517,lat:34.43921157837},{lon:109.16114936829,lat:34.4374949646},{lon:109.15891777039,lat:34.434920043946},{lon:109.15702949524,lat:34.432345123291},{lon:109.15496955872,lat:34.428568572998},{lon:109.15205131531,lat:34.423933715821},{lon:109.14896141052,lat:34.41775390625},{lon:109.14655815125,lat:34.413634033204},{lon:109.1446698761,lat:34.41157409668},{lon:109.14329658508,lat:34.407797546387},{lon:109.14192329407,lat:34.404020996094},{lon:109.14055000305,lat:34.399386138916},{lon:109.13831840515,lat:34.396124572754},{lon:109.13625846863,lat:34.392691345215},{lon:109.13368354798,lat:34.386683197022},{lon:109.13196693421,lat:34.384794921875},{lon:109.13007865906,lat:34.380160064698},{lon:109.12819038391,lat:34.376040191651},{lon:109.12630210877,lat:34.372606964112},{lon:109.12321220398,lat:34.363508911133},{lon:109.12166725159,lat:34.359389038086},{lon:109.12166725159,lat:34.355612487793},{lon:109.1208089447,lat:34.351964683533},{lon:109.11823402405,lat:34.349389762878},{lon:109.11480079651,lat:34.346814842224},{lon:109.11205421448,lat:34.344068260193},{lon:109.10862098694,lat:34.342008323669},{lon:109.10381446838,lat:34.338746757507},{lon:109.10020957947,lat:34.336000175476},{lon:109.09677635193,lat:34.333253593445},{lon:109.09299980164,lat:34.332051963806},{lon:109.08819328308,lat:34.33016368866},{lon:109.08527503967,lat:34.328962059021},{lon:109.08252845764,lat:34.328103752136},{lon:109.07840858459,lat:34.332910270691},{lon:109.0746320343,lat:34.338231773376},{lon:109.06913887024,lat:34.344926567078},{lon:109.06416069031,lat:34.349218101501},{lon:109.059010849,lat:34.351964683533},{lon:109.05248771667,lat:34.353509635925},{lon:109.04699455261,lat:34.354882926941},{lon:109.04253135681,lat:34.355226249695},{lon:109.03532157898,lat:34.356427879333},{lon:109.02742515564,lat:34.357286186218},{lon:109.02210365295,lat:34.358144493103},{lon:109.01643882751,lat:34.359517784119},{lon:109.00974403381,lat:34.360891075134},{lon:109.00819908142,lat:34.368787498474},{lon:109.00768409729,lat:34.377370567322},{lon:109.00768409729,lat:34.386983604431},{lon:109.00785575867,lat:34.39659664154},{lon:109.0068257904,lat:34.405351371765},{lon:109.00751243591,lat:34.413591117859},{lon:109.00888572693,lat:34.421487541199},{lon:109.01266227722,lat:34.427667350769},{lon:109.01815544128,lat:34.434018821716},{lon:109.02416358948,lat:34.435048789978},{lon:109.02862678528,lat:34.436765403748},{lon:109.03669486999,lat:34.436593742371},{lon:109.04476295471,lat:34.437108726501},{lon:109.05351768494,lat:34.438482017517},{lon:109.05506263733,lat:34.448953361511},{lon:109.05815254211,lat:34.456849784851},{lon:109.05986915588,lat:34.465089530945},{lon:109.06416069031,lat:34.460969657898},{lon:109.06725059509,lat:34.455304832458},{lon:109.06913887024,lat:34.451356620789},{lon:109.07257209778,lat:34.446378440857},{lon:109.07600532532,lat:34.440885276794},{lon:109.07806526184,lat:34.435563774109},{lon:109.08784996033,lat:34.432988853455},{lon:109.0940297699,lat:34.433503837585},{lon:109.10209785461,lat:34.431787223816},{lon:109.10570274353,lat:34.429555625915},{lon:109.11153923035,lat:34.432817192078},{lon:109.11548744202,lat:34.431787223816},{lon:109.11789070129,lat:34.429555625915},{lon:109.12098060608,lat:34.427667350769},{lon:109.12372718811,lat:34.424920768738},{lon:109.12870536804,lat:34.421315879822},{lon:109.13454185486,lat:34.425607414246},{lon:109.13831840515,lat:34.429727287292},{lon:109.14192329407,lat:34.434018821716}]},function(e,o){e.exports={vector_url:"http://10.16.157.208:8081/geoesb/proxy/5f8d39f52f324a9faa11c49af1661e36/d960c0ffe7ec444ab47839212e3ee4bd",area_url:"http://10.16.157.208:8081/geoesb/proxy/services/maps/rest/08f5965689314de49288120ad36ccf12/d960c0ffe7ec444ab47839212e3ee4bd",village_url:"http://10.16.157.208:8081/geoesb/proxy/services/maps/rest/9504a0656dd74526b82c96d2f7faf072/d960c0ffe7ec444ab47839212e3ee4bd",poorColorStyle:{strokeColor:"#024b9c",fillColor:"#76a157",strokeWidth:4,fontColor:"#000",fontWeight:"500",fontSize:"0.8em",label:"",fillOpacity:1},unionArea:["秦汉新城","空港新城","泾河新城","沣东新城","沣西新城"],unionName:"西咸新区",styleConfig:{selectBorderWidht:"2px"},mapCenter:{x:108.74,y:34.22},mapOption:{url:"",layer:"XiAnDEM201606",style:"default",matrixSet:"CustomCRS4326ScaleXiAnDEM201606",format:"image/png",resolutions:[1.40625,.703125,.3515625,.17578125,.087890625,.0439453125,.02197265625,.010986328125,.0054931640625,.00274658203125,.001373291015625,.0006866455078125,.00034332275390625,.000171661376953125,858306884765625e-19,4291534423828125e-20,21457672119140625e-21,10728836059570312e-21,5364418029785156e-21,2682209014892578e-21,1341104507446289e-21],matrixIds:null,opacity:1,requestEncoding:"KVP"}}},function(e,o,l){const c=l(5),t=l(4),a=l(3),n=l(2),u=l(1),r=l(0);!function(e,o){Object.assign(c,setableConfig);var l=null,g=null,y=null,d=null,v=null,s=null,m=null,p=0;function h(e){l=new SuperMap.Map("map",{controls:[new SuperMap.Control.Navigation({dragPanOptions:{enableKinetic:!0}})],eventListeners:{zoomend:function(){let e=l.getScale();I(),W(),0===p?p=e:p>=e&&(y.removeAllFeatures(),A(),tempmarkerLayer.clearMarkers(),m.setVisibility(!0),_=null,gisapp.callback("city_show",""))}}});for(var i=[],h=0;h<21;h++)i[h]={identifier:h};var b=c.mapOption;b.url=c.vector_url,b.matrixIds=i,g=new SuperMap.Layer.WMTS(b),l.restrictedExtent=new SuperMap.Bounds(107.65,33.7,109.82,34.74),l.addLayers([g]),l.setCenter(new SuperMap.LonLat(108.94170656425,34.260557202483),9),l.minScale=0,bandvectorLayer=new SuperMap.Layer.Vector("bandvectorLayer"),y=new SuperMap.Layer.Vector("colorvectorLayer"),m=new SuperMap.Layer.Markers("poormarkerLayer"),tempmarkerLayer=new SuperMap.Layer.Markers("tempmarkerLayer"),l.addLayers([bandvectorLayer,y,m,tempmarkerLayer]),d=new SuperMap.Control.SelectFeature(y,{callbacks:O,hover:!0}),l.addControl(d),d.activate(),F(c.area_url,{name:"ZW0601AR@XA_XZQH",filter:"SmID < 1000"},function(e){C(e)}),function(e){o(".cover").text(e)}("初始化贫困数据数据中...");let V=r.getCounty("colorFeatures");null===V?F(c.area_url,{name:"r_xzqh_xian@XA_XZQH#3#1",filter:"SmID < 1000"},function(e){v=e,function(){var e=[];t.forEach(function(o){e.push(new SuperMap.Geometry.Point(o.lon,o.lat))});var o=new SuperMap.Geometry.LinearRing(e),l=new SuperMap.Geometry.Polygon([o]),c=new SuperMap.Geometry.MultiPolygon([l]),a=new SuperMap.Feature.Vector(c,{SmID:-100,NAME:"国际港务区"},{});v[0].features.push(a)}(),function(){if(v){for(h=0;h<v.length;h++)if(v[h].features)for(j=0;j<v[h].features.length;j++)if(feature=v[h].features[j],w(feature.attributes.NAME))x(feature);else{var e=n[feature.attributes.NAME]||{poorVillageNum:0},o=Object.assign({},c.poorColorStyle);o.fillColor=M(e.poorVillageNum),o.label=feature.attributes.NAME,E.push({geometry:feature.geometry,attributes:feature.attributes,style:o})}A()}}()}):(E=V,A());let N=r.getVillage("PoorMarker");if(null===N){var L="1=1";e&&null!==e&&(L="QH_NAME = '"+e+"'"),F(c.village_url,{name:"MNG_SQ_M@cun_xzqh",filter:L},function(e){s=e,a.forEach(function(e){var o=[];e.scale.forEach(function(e){o.push(new SuperMap.Geometry.Point(e.lon,e.lat))});var l=new SuperMap.Geometry.LinearRing(o),c=new SuperMap.Geometry.Polygon([l]),t=new SuperMap.Geometry.MultiPolygon([c]);let a=new SuperMap.Feature.Vector(t,{NAME:e.village,QH_NAME:e.county},{});s[0].features.push(a)}),function(){if(s)for(h=0;h<s.length;h++)if(s[h].features)for(j=0;j<s[h].features.length;j++){feature=s[h].features[j];var e="./theme/marker.png",o=new SuperMap.Size(20,10),l=new SuperMap.Pixel(-o.w/2,-o.h),c=new SuperMap.Icon(e,o,l),t=feature.geometry.getCentroid();let a=f(feature.attributes.NAME,feature.attributes.QH_NAME);a>=0&&(e="./theme/poorvillage.png",o=new SuperMap.Size(44,33),l=new SuperMap.Pixel(-o.w/2,-o.h),c=new SuperMap.Icon(e,o,l),feature.attributes.poorVillage=u[a],k.push({point:{x:t.x,y:t.y},attributes:feature.attributes,icon:c,geometry:feature.geometry}))}S()}(),gisapp.callback("mapinit","1"),o(".cover").hide()})}else k=N,S(),o(".cover").hide()}function f(e,o){return u.findIndex(function(l){return l.checkname===e&&l.county===o})}var k=[];function b(e){return new SuperMap.Icon(e.url,new SuperMap.Size(c.iconSize.w,c.iconSize.h),new SuperMap.Pixel(-c.iconSize.w/2,-c.iconSize.h/2))}function S(){k.forEach((e,o)=>{var l=new SuperMap.Marker(new SuperMap.LonLat(e.point.x,e.point.y),b(e.icon));l.attributes=e.attributes,l.events.on({mouseover:G,mouseout:I,click:T,scope:l}),m.addMarker(l)})}function M(e=0){let o=c.poorConfig.find(function(o){return e>=o.low&&e<=o.top});return o?o.color:"#76a157"}function w(e){return c.unionArea.findIndex(function(o){return o===e})>=0}var V=[],N=[],E=[];function x(e){if(V.push(e),N=N.concat(e.geometry.components),V.length===c.unionArea.length){var o=n[c.unionName]||{poorVillageNum:0},l=Object.assign({},c.poorColorStyle);l.fillColor=M(o.poorVillageNum),l.label=c.unionName,l.strokeWidth=0;var t={SmID:e.attributes.SmID,NAME:c.unionName},a=new SuperMap.Geometry.MultiPolygon(N),i=new SuperMap.Feature.Vector(a,t,l);y.addFeatures(i),E.push({geometry:a,attributes:t,style:l})}}function A(){E.forEach(e=>{e.style.fillOpacity=c.coverOpacity,e.style.strokeColor=c.strokeColor,e.style.strokeWidth=c.strokeWidth,"西咸新区"===e.attributes.NAME&&(e.style.strokeWidth=0),function(e){return c.fontless.findIndex(o=>o===e)>=0}(e.attributes.NAME)&&(e.style.fontSize=c.fontlessSize);var o=n[e.attributes.NAME]||{poorVillageNum:0};e.style.fillColor=M(o.poorVillageNum);var l=new SuperMap.Feature.Vector(e.geometry,e.attributes,e.style);y.addFeatures(l)})}function C(e){if(e)for(console.log(e),i=0;i<e.length;i++)if(e[i].features)for(j=0;j<e[i].features.length;j++){feature=e[i].features[j];var o=Object.assign({},c.poorColorStyle);o.fillOpacity=0,o.strokeWidth=c.bandstrokeWidth,o.strokeColor=c.bandstrokeColor;let l=new SuperMap.Feature.Vector(feature.geometry,feature.attributes,o);bandvectorLayer.addFeatures(l)}}function L(e,o){o&&o(),function(e,o){tempmarkerLayer.clearMarkers(),k.forEach(function(o){if(o.attributes.poorVillage.county===e.attributes.NAME){var l=new SuperMap.Marker(new SuperMap.LonLat(o.point.x,o.point.y),b(o.icon));l.attributes=o.attributes,l.events.on({mouseover:G,mouseout:I,click:T,scope:l}),tempmarkerLayer.addMarker(l)}})}(e),m.setVisibility(!1);let t=e.attributes.NAME;if(n[t]){let o=n[t];console.log(o),l.zoomToExtent(e.geometry.getBounds().scale(o.scale),!1)}else l.zoomToExtent(e.geometry.getBounds(),!1);y.removeAllFeatures(),g.setOpacity(1),E.forEach(function(o){if(o.attributes.SmID===e.attributes.SmID||-100===e.attributes.SmID&&function(e){return["灞桥区","国际港务区"].findIndex(function(o){return o===e.attributes.NAME})>=0}(o)){(t=Object.assign({},o.style)).fillOpacity=0,t.strokeColor=c.strokeColor,t.strokeWidth=c.strokeWidth,-100===o.attributes.SmID&&(t.strokeWidth=3),t.label="";var l=new SuperMap.Feature.Vector(o.geometry,o.attributes,t);y.addFeatures(l)}else{var t;(t=Object.assign({},o.style)).fillOpacity=1,t.fillColor=c.coverColor,t.strokeWidth=1,t.label="";l=new SuperMap.Feature.Vector(o.geometry,o.attributes,t);y.addFeatures(l)}})}var P,_=null,O={click:function(e){_&&_.attributes.SmID===e.attributes.SmID||(_=e,L(e,function(){gisapp.callback("county_select",e.attributes.NAME)}))},over:function(e){gisapp.callback("county_hover",e.attributes.NAME)},out:function(e){gisapp.callback("county_outhover",e.attributes.NAME)}};function F(e,o,l){var c,t;c=new SuperMap.REST.FilterParameter({name:o.name,attributeFilter:o.filter}),t=new SuperMap.REST.QueryBySQLParameters({queryParams:[c]}),new SuperMap.REST.QueryBySQLService(e,{eventListeners:{processCompleted:function(e){var o=e.result;o&&o.recordsets&&l(o.recordsets)},processFailed:R}}).processAsync(t)}function G(){I();var e=this,t="<div style='padding:0; margin: 0;font-size:.8em; overflow: hidden; white-space: nowrap;text-overflow: ellipsis; background-color: rgba(255, 255, 255, 0.8); overflow-y:hidden; text-align: center;  letter-spacing:2px; ';  >",a="<div>"+e.attributes.NAME+"</div>";a+="<div>"+e.attributes.QH_NAME+"</div></div>";var n=e.attributes.poorVillage.village;n=n.replace("委会","");let i="#"+e.icon.imageDiv.id;o(i).addClass("villagehover"),a="<div>"+n+"</div>",a+="<div>"+e.attributes.QH_NAME+"</div></div>",setTimeout(()=>{gisapp.callback("village_hover",e.attributes.poorVillage)},100);k.find(function(o){return e.attributes.poorVillage.villagecode===o.attributes.poorVillage.villagecode});t+=a,P=new SuperMap.Popup("popwin",e.getLonLat(),new SuperMap.Size(c.hoverDialog.width,c.hoverDialog.height),t,!1,!0),l.addPopup(P)}function I(){if(P)try{P.hide(),P.destroy()}catch(e){}let e=this;if(e&&e.attributes&&e.attributes.poorVillage){let l="#"+e.icon.imageDiv.id;o(l).removeClass("villagehover"),gisapp.callback("village_outhover",e.attributes.poorVillage)}}var z=null;function D(e,o=!0){l.zoomToExtent(e.geometry.getBounds().scale(2),!1);var c={strokeColor:"#024b9c",fillColor:"#024b9c",strokeWidth:1,fontColor:"#000",fontWeight:"500",fontSize:"1.2em",label:"",fillOpacity:.3};c.label=e.attributes.poorVillage.village,z=new SuperMap.Feature.Vector(e.geometry,e.attributes,c),y.addFeatures(z),e.attributes.poorVillage&&o&&gisapp.callback("village_select",e.attributes.poorVillage)}function W(){z&&(y.removeFeatures([z]),z=null)}function Q(e,o=!0){if(z&&y.removeFeatures([z]),e.attributes.poorVillage){var l=E.find(function(o){return o.attributes.NAME===e.attributes.QH_NAME});l&&L(l),D(e,o)}}function T(){let e=this;Q(k.find(function(o){return e.attributes.poorVillage.villagecode===o.attributes.poorVillage.villagecode}))}function R(e){alert(e.error.errorMsg)}e.gisapp={callback:{},init:function(e,o){this.callback=e,h(o)},zoom:function(e=null,o=null){if(e&&o){var c=k.find(function(l){return l.attributes.poorVillage.village===o&&l.attributes.poorVillage.county===e});c?Q(c,!1):this.callback("error","没有找到对应的村"+e+"-"+o)}else if(e){var t=E.find(function(o){return o.attributes.NAME===e});t?L(t,function(){}):this.callback("error","没有找到对应的区"+e)}else l.zoomTo(p)}},parent.gisready()}(window,jQuery)}]);