 function publish() {/************************循环所有已存在的图片对象，准备上传************************************/ var myArray=new Array(); var aPhoto=$(".z_addImg img"); for (var i = 0; i < aPhoto.length; i++) {if(aPhoto[i].valueOf().style.display=="none"){continue; } var image = new Image(); image.src = aPhoto[i].src; imgBase = getBase64Image(image); myArray[i]=imgBase.split(",")[1]; } /************************判断是否输入************************************/ if (!$(".editor-content textarea").val()) {alert("还未输入内容"); return; }else{$.ajax({type: "POST",/*//方法类型*/ dataType: "json",/*//预期服务器返回的数据类型*/ url: "http://192.168.10.8:9090/poverty-web-1.0-SNAPSHOT/upload/img" ,/*//url*/ data: {"titles":myArray}, traditional: true, success: function (result) {console.log(result);/*//打印服务端返回的数据(调试用)*/ if (result.resultCode == 200) {alert("SUCCESS"); } /*window.location.href="你所要跳转的页面";*/ }, error: function (XMLHttpRequest, textStatus, errorThrown) {alert('访问网络失败！' + errorThrown); } }); alert("发表成功！"); let textareaVal=$(".editor-content textarea").val(); localStorage.setItem('textareaVal',textareaVal); location.href="show_log.html"; return; } } function imgChange(obj1, obj2) {/*获取点击的文本框*/ var file = document.getElementById("file"); /*存放图片的父级元素*/ var imgContainer = document.getElementsByClassName(obj1)[0]; /*获取的图片文件*/ var fileList = file.files; /*文本框的父级元素*/ var input = document.getElementsByClassName(obj2)[0]; var imgArr = []; /* 遍历获取到得图片文件 for (var i = 0; i < fileList.length; i++) {var imgUrl = window.URL.createObjectURL(file.files[i]); imgArr.push(imgUrl); var img = document.createElement("img"); img.setAttribute("src", imgArr[i]); var imgAdd = document.createElement("div"); imgAdd.setAttribute("class", "z_addImg"); imgAdd.appendChild(img); imgContainer.appendChild(imgAdd); };*/ imgRemove(); }; function imgRemove() {var imgList = document.getElementsByClassName("z_addImg"); var mask = document.getElementsByClassName("z_mask")[0]; var cancel = document.getElementsByClassName("z_cancel")[0]; var sure = document.getElementsByClassName("z_sure")[0]; for (var j = 0; j < imgList.length; j++) {imgList[j].index = j; imgList[j].onclick = function() {var t = this; mask.style.display = "block"; cancel.onclick = function() {mask.style.display = "none"; }; sure.onclick = function() {mask.style.display = "none"; t.style.display = "none"; }; } }; };