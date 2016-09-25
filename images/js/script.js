//函数声明
//作用 得到地址栏参数
function GetUrlPara(name){  
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r!=null) return unescape(r[2]); return null; //返回参数值
} 
//分页函数
var Paginate = {
	//对象内的全局变量
	postTotal:0,  //某Tag总文章数()
	displayTag:"All",
	paginateNum:5,//每页的文章数量
	maxPage:1,    //最大页码
	currentPage:1,//当前页码
	
	//根据Tag 为Article设置Index 并输出该Tag下的postTotal maxPage
	SetIndex:function(tag){
		if(tag==null){tag="All";}
		//1——设置当前Tag
		this.displayTag=tag;
		//2——设置Index
		tag="tag-"+tag;
		var num=0;
		$("article").each(function(index,element){
			$(element).attr("originIndex",index.toString());
			if(tag=="tag-All"){	
				$(element).attr("currentIndex",index.toString());
				num++;
			}
			else{//判断Article中是否有Tag Class				
				if($(element).hasClass("indexhtml") && $(element).hasClass(tag)){
					$(element).attr("currentIndex",num.toString());
					num++;					
				}else{
					$(element).attr("currentIndex","-1");
				}
			}
		});
		//3——输出参数
		this.postTotal=num;//文章总数
		var varmaxPage=num/this.paginateNum;
		this.maxPage=Math.ceil(varmaxPage);//最大页码		
		this.result=this.maxPage;
	},
	//设置页脚导航栏格式 pageNum当前页数
	SetNavBar:function(pageNum){
		//容错
		if(pageNum==null) pageNum=1;
		pageNum=Math.ceil(pageNum);
		if(pageNum>this.maxPage) pageNum=this.maxPage;
		if(pageNum<1) pageNum=1;
		//设置当前页码
		this.currentPage=pageNum;
		//1——修改页脚导航栏
		if(pageNum>1){
			$("#fristpage").show();
			$("#prepage").show();
			var prepage=pageNum-1;
			$("#fristpage").attr('href','/index.html?currentPage=1&displayTag='+this.displayTag);
			$("#prepage").attr('href','/index.html?currentPage='+prepage.toString()+'&displayTag='+this.displayTag);
		} else {
			$("#fristpage").hide();
			$("#prepage").hide();
		}
		if(pageNum<this.maxPage){
			$("#lastpage").show();
			$("#nextpage").show();
			var nextpage=pageNum+1;
			$("#lastpage").attr('href','/index.html?currentPage='+this.maxPage.toString()+'&displayTag='+this.displayTag);
			$("#nextpage").attr('href','/index.html?currentPage='+nextpage.toString()+'&displayTag='+this.displayTag);
		} else {
			$("#lastpage").hide();
			$("#nextpage").hide();
		}
		$("#pagenumber").html("第 "+pageNum.toString()+" 页/共 "+this.maxPage.toString()+" 页");
	},
	//分页 根据当前页码显示或隐藏Article
	Paging:function(){
		//1——计算得到Article的显示范围 最小为0
		var minIndex=(this.currentPage-1)*this.paginateNum;
		var maxIndex=this.currentPage*this.paginateNum-1;
		//2——根据currentIndex隐藏或显示Article
		$("article").each(function(index, element) {
			var currentIndex=$(element).attr("currentIndex");
			if(currentIndex>=minIndex && currentIndex<=maxIndex){ 
				$(element).show(1000);
			}else{
				$(element).hide(1000);
			}
		});
	}
};

$(document).ready(function(){

	//分页效果 category.html
	if(window.location.pathname.length==1 || window.location.pathname.substr(1,5)=="index"){
		var currentPage=GetUrlPara("currentPage");
		var displayTag=GetUrlPara("displayTag");
		Paginate.SetIndex(displayTag);
		Paginate.SetNavBar(currentPage);	
		Paginate.Paging();
	}
	
	//页面内平滑跳转
	$("[href='#']").click(function(){
			$('html,body').animate({scrollTop:0},1000);//回到顶端
			return false;
  }); 

	$("[href!='#']").click(function(){
			var var_href=$(this).attr("href");
			var len_href=var_href.toString().length;
			var has_mao=var_href.search("#"); 
			if(has_mao==-1) return;
			var index_mao=var_href.lastIndexOf("#");
			var index_para=var_href.indexOf("?");
			if(index_para==-1) index_para=len_href;
			var sub_href=var_href.substr(index_mao,index_para-index_mao);
			$('html,body').animate({scrollTop:$(sub_href).offset().top-20},1000);//回到顶端
			return false;
  }); 		
	
 	
});//end ready function
