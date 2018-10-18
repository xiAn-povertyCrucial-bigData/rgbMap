//指标未达标原因
 $(function(){
 	 	
   var tankspan=$(".tank-1 .t-list .itme-des");
   for (var i=0;i<tankspan.length;i++) {			
			tankspan[i].onclick=function(){											
				$(".tank-1 .t-list .reason").html($(this).children('span').text());
			};	
   };  
    var content2span=$(".content-2-1  .t-list .itme-des");
   for (var i=0;i<content2span.length;i++) {
			content2span[i].onclick=function(){											
				$(".content-2-1 #content-2-1-left .t-list .reason").html($(this).children('span').text());
			};	
   };   
    var content3span=$(".content-3-1 .t-list .itme-des");
    for (var i=0;i<content3span.length;i++) {
			//itme_des[i].index=i;
			content3span[i].onclick=function(){											
				$(".content-3-1 #content-3-1-left .t-list .reason").html($(this).children('span').text());
			};	
    }; 
    var content4span=$(".content-4-1 .t-list .itme-des");
   for (var i=0;i<content4span.length;i++) {
			//itme_des[i].index=i;
			content4span[i].onclick=function(){											
				$(".content-4-1 #content-4-1-left .t-list .reason").html($(this).children('span').text());
			};	
   }; 
    var content5span=$(".content-5-1 .t-list .itme-des");
   for (var i=0;i<content5span.length;i++) {
			//itme_des[i].index=i;
			content5span[i].onclick=function(){											
				$(".content-5-1 #content-5-1-left .t-list .reason").html($(this).children('span').text());
			};	
   }; 
    

 //搜索
    var searchcun=$("#search-cun  .t-list .itme-des");
   	for (var i=0;i<searchcun.length;i++) {
			//itme_des[i].index=i;
			searchcun[i].onclick=function(){											
				$("#search-cun .t-list .reason").html($(this).children('span').text());
			};	
  	 }; 
    $('.search-cun-close').click(function(){
       $('#search-cun').hide();
	});
    var searchhu=$("#search-hu  .t-list .itme-des");
    for (var i=0;i<searchhu.length;i++) {
			//itme_des[i].index=i;
			searchhu[i].onclick=function(){											
				$("#search-hu .t-list .reason").html($(this).children('span').text());
			};	
    };  
    $('.search-hu-close').click(function(){
       $('#search-hu').hide();
	});
/* 周至县*/
$('.close').click(function(){
       $(this).parent('.tab').hide();
       $(this).parent('.tank-1').hide();
});
$(".c-red").click(function(){
	$(".tank-1").show()
})
/*全市贫困村达标情况分布*/
$(".content-2-1-close").click(function(){
	$('#zhezhao').hide();
	$(".content-2-1").css({'position':'absolute','opacity':'0','top':'-100%'});
	$(".content-2-1 #content-2-1-left").css('display','none');
	$(".content-2-1 #right-top").css('display','block');
	$(".content-2-1 #right-bottom").css('display','none');
})
for(var i=0; i<=$("#right-bottom>div table tr").length; i++){ 
	   $("#right-bottom>div table tr").eq(i).find("td:nth-child(3)").click(function(){
	   $("#content-2-1-left").css("display","block");
	   });	   
	 }
/*全市贫困户达标情况分布*/
$(".content-3-1-close").click(function(){
	$('#zhezhao').hide();
	$(".content-3-1").css({'opacity':'1','top':'-100%'});
	$("#content-3-1-left").css({'opacity':'0','display':'block'});
	$(".content-3-1 #mid-top").css('display','block');
	$(".content-3-1 #mid-bottom").css({'position':'relative','opacity':'0','top':'-100%'});
	$("#content-3-1-right").css('display','none');	
})
for(var i=0; i<=$("#content-3-1-right>div table tr").length; i++){ 
	   $("#content-3-1-right>div table tr").eq(i).find("td:nth-child(5)").click(function(){
	   $("#content-3-1-left").css({'display':'block','opacity':'1' });
	   });	   
	 }


$(".content-4-2-close").click(function(){
	$('#zhezhao').hide();
	$(".content-4-2").css({'position':'absolute','opacity':'0','top':'-200%'});
	$("#content-4-2-left").css('display','none');
	$("#content-4-2-right").css('display','none');
	$("#content-4-2-mid #mid-top").css('display','block');
	$("#content-4-2-mid #mid-bottom").css({'position':'relative','opacity':'0','top':'-200%'});
})
for(var i=0; i<=$("#content-4-2-right>div table tr").length; i++){ 
	   $("#content-4-2-right>div table tr").eq(i).find("td:nth-child(3)").click(function(){
	   $("#content-4-2-left").css("display","block");
	   });	   
}

$(".content-5-2close").click(function(){
	$('#zhezhao').hide();
	$(".content-5-2").css({'position':'absolute','opacity':'0','top':'-100%'});	
	$("#content-5-2-left").css('display','none');	
	$("#content-5-2-mid #mid-top").css('display','block');
	$("#content-5-2-mid #mid-bottom").css({'position':'relative','opacity':'0','top':'-100%'});
	$("#content-5-2-right0").css({'position':'relative','opacity':'0','top':'-100%'});
	$("#content-5-2-right").css('display','none');
})	






 })