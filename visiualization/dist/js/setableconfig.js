var setableConfig = {
    hoverDialog: {   // 弹出框的大小
        width: 60,
        height: 35
    },
    coverColor: '#030f38',  //区县显示的时候遮罩颜色
    coverOpacity: 1,    // 色块透明度
    iconSize: {  // 标记的大小
        w: 16,
        h: 12
    },
    strokeColor: '#030f38',  // 各区域边框的颜色
    strokeWidth: 0.8,  // 各区域边框大小
    bandstrokeColor: '#030f38', // 整个西安县的边框颜色
    bandstrokeWidth: 13,  // 西安县的边框大小
    poorConfig: [  // 贫困村各个区域的色值
        {
            color: '#EDC582', // yellow efe43b
            low: 0, 
            top: 0,
        },
        {
            color: '#EDC582', // yellow  efe43b
            low: 1, 
            top: 49,
        } ,
         {
            color: '#C3766C ', //red   ea2e2f
            low: 50, 
            top: 9999,
        },  
        {
            color: '#A7F8A1',  // green   5fe565
            low:-100,
            top: -1,
        },
    ],
    
    fontless: ['未央区','莲湖区','新城区','碑林区','雁塔区'],
    fontlessSize: '0.5em',
}