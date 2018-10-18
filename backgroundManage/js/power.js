$('.tab .menus li').each(function(){
    $('.tab .menus li').click(function(){
        $('.tab .menus li').removeClass('bg');
        $(this).addClass('bg');
        var index = $(this).index();
        var height=$(".scroll .tab_right").height()
		//alert(height)   
        $('.tab .scroll').css('margin-top',-index*1200+'px');      
    })     
});
 $(function(){
 	var City_authority_click=$("#City_authority>div>p");
	var City_authority_show=$("#City_authority>div>p").next();
 	var County_authority_click=$("#County_authority>div>p");
 	var County_authority_show=$("#County_authority>div>p").next();
	var Town_authority_click=$("#Town_authority>div>p");
	var Town_authority_show=$("#Town_authority>div>p").next();
	var Village_authority_click=$("#Village_authority>div>p");
	var Village_authority_show=$("#Village_authority>div>p").next();	
	
		for (var i=0;i<City_authority_click.length;i++) {
			City_authority_click[i].index=i;
			City_authority_click[i].onclick=function(){
				for (var i=0;i<City_authority_show.length;i++) {
				City_authority_show[i].style.display='none';								
				}
				City_authority_show[this.index].style.display='block';				
			};
		};
		
		for (var i=0;i<County_authority_click.length;i++) {
			County_authority_click[i].index=i;
			County_authority_click[i].onclick=function(){
				for (var i=0;i<County_authority_show.length;i++) {
				County_authority_show[i].style.display='none';								
				}
				County_authority_show[this.index].style.display='block';					
			};
		};
		
		for (var i=0;i<Town_authority_click.length;i++) {
			Town_authority_click[i].index=i;
			Town_authority_click[i].onclick=function(){
				for (var i=0;i<Town_authority_show.length;i++) {
				Town_authority_show[i].style.display='none';								
				}
				Town_authority_show[this.index].style.display='block';				
			};
		};
		
		for (var i=0;i<Village_authority_click.length;i++) {
			Village_authority_click[i].index=i;
			Village_authority_click[i].onclick=function(){
				for (var i=0;i<Village_authority_show.length;i++) {
				Village_authority_show[i].style.display='none';								
				}
				Village_authority_show[this.index].style.display='block';				
			};
		};	
			
	});