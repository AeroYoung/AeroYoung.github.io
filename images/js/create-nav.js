//作用：在id="post-category"的div内生成博文内部目录
function CreateArticleCategory(){   
	var fatherulID="#rootul";
	var fatherLevel=0;
	var rootID="#rootul"
	var oneID="#";
	var twoID="#";
	
	/*$("#root").append("<ul id='rootul' class='list-unstyled'></ul>");		*/
	$(".art-title").each(function(index, element) {
		var tagName=$(this).get(0).tagName;	
		if(tagName.substr(0,1)!="H"){ return true;}
		if(tagName.substr(1,1)>3){return true;}//只收录前三级标题
		
		var hID="h-"+index.toString();
		$(this).attr("id",hID);	
		
		var contentH=$(this).html();
		var level=parseInt(tagName.substr(1,1));
		var liid="li"+index.toString();
		var ulid="ul"+index.toString();
		var object_a="<a href='#"+hID+"'>"+contentH+"</a>";
		var object_li="<li  class='li"+tagName.substr(1,1)+"' id='"+liid+"'></li>"
		var object_ul="<ul  class='nav ul-none' id='"+ulid+"'></ul>";
		//获得父级ul的ID是啥 并更新oneID
		if(level==1){
			fatherulID=rootID;
			oneID="#"+ulid;
		}else if(level==2){
			fatherulID=oneID;
			twoID="#"+ulid;
		}else if(level==3){
			fatherulID=twoID;
		}		
		//在父级ul下加入li 在li下加入a 和 ul
		$(fatherulID).append(object_li);
		$("#"+liid).append(object_a);
		$("#"+liid).append(object_ul);
	});
}

$(document).ready(function(){
	//生成博文内部目录
	CreateArticleCategory();
});//end ready function
