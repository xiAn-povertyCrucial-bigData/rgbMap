$(function(){

var coding=null;
$.ajax({
        url:url+ 'init/disct/name', 
        data:{'name':countryName},
        method: "get",
        dataType: "json",
        success: function(data){
            if (data.code == 2000){
               // console.log("ok");
                mapturn(data);                   
            }            
        }       
  	 })   		   
	function mapturn(data){	 	     
    
            coding=data.data;            
     }  
 	console.log(coding)
})