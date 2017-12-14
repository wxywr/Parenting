$(function(){
	var autoLb = false;          //autoLb=true为开启自动轮播
	var autoLbtime = 1;         //autoLbtime为轮播间隔时间（单位秒）
	var touch = true;           //touch=true为开启触摸滑动
	var slideBt = true;         //slideBt=true为开启滚动按钮
	var slideNub;               //轮播图片数量

	//窗口大小改变时改变轮播图宽高
	$(window).resize(function(){
		$(".slide").height($(".slide").width()*0.56);
	});


	$(function(){
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth() + 1;
		var getDateday = nowDate.getDate(); //获取当前日期
		// console.log(getDateday)
		var str = '';
		for(var i = 1; i <= getNowDate(year, month); i++){
			str += '<div class="img"><p>'+ month +'月</p><h5>'+ getDay(year,month,i) +'</h5><h3>'+ i +'</h3></div>'
			
		}
		$('#slide').html(str)

		$(".slide").height($(".slide").width()*0.56);
		slideNub = $(".slide .img").size();             //获取轮播图片数量
		for(i=0;i<slideNub;i++){
			$(".slide .img:eq("+i+")").attr("data-slide-imgId",i);
		}

		//根据轮播图片数量设定图片位置对应的class
		for(i=0;i<slideNub;i++){
			if(i == getDateday){
				$(".slide .img:eq("+i+")").addClass("img3");
			}
			else if(i == getDateday - 1){
				$(".slide .img:eq("+i+")").addClass("img2");
			}else if(i == getDateday - 2){
				$(".slide .img:eq("+i+")").addClass("img1");
			}
			else if(i == getDateday + 1){
				$(".slide .img:eq("+i+")").addClass("img4");
			}
			else{
				$(".slide .img:eq("+i+")").addClass("img5");
			}
			
		}
		
		//自动轮播
		if(autoLb){
			setInterval(function(){
				right();
			}, autoLbtime*1000);
		}


		if(touch){
			k_touch();
		}
		slideLi();
		imgClickFy();
	})

	//右滑动
	function right(){
		var fy = new Array();
		for(i=0;i<slideNub;i++){
			fy[i]=$(".slide .img[data-slide-imgId="+i+"]").attr("class");
		}
		for(i=0;i<slideNub;i++){
			if(i==0){
				$(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[slideNub-1]);
			}else{
		   		$(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[i-1]); 
			}
		}
		imgClickFy();
		slideLi();
	}

	//左滑动
	function left(){
		var fy = new Array();
		for(i=0;i<slideNub;i++){
			fy[i]=$(".slide .img[data-slide-imgId="+i+"]").attr("class");
		}
		for(i=0;i<slideNub;i++){
			if(i==(slideNub-1)){
				$(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[0]);
			}else{
			   $(".slide .img[data-slide-imgId="+i+"]").attr("class",fy[i+1]); 
			}
		}
		imgClickFy();
		slideLi();
	}

	//轮播图片左右图片点击翻页
	function imgClickFy(){
		$(".slide .img").removeAttr("onclick");
		$(".slide .img2").attr("onclick","left()");
		$(".slide .img4").attr("onclick","right()");
	}

	//修改当前最中间图片对应按钮选中状态
	function slideLi(){
		var slideList = parseInt($(".slide .img3").attr("data-slide-imgId")) + 1;
		$(".slide-bt span").removeClass("on");
		$(".slide-bt span[data-slide-bt="+slideList+"]").addClass("on");
	}

	//轮播按钮点击翻页
	function tz(id){
		var tzcs = id - (parseInt($(".slide .img3").attr("data-slide-imgId")) + 1);
		if(tzcs>0){
			for(i=0;i<tzcs;i++){
				setTimeout(function(){
				  right();  
				},1);
			}
		}
		if(tzcs<0){
			tzcs=(-tzcs);
			for(i=0;i<tzcs;i++){
				setTimeout(function(){
				  left();  
				},1);
			}
		}
		slideLi();
	}


	//触摸滑动模块
	function k_touch() {
		var _start = 0, _end = 0, _content = document.getElementById("slide");
		_content.addEventListener("touchstart", touchStart, false);
		_content.addEventListener("touchmove", touchMove, false);
		_content.addEventListener("touchend", touchEnd, false);
		function touchStart(event) {
			var touch = event.targetTouches[0];
			_start = touch.pageX;
		}
		function touchMove(event) {
			var touch = event.targetTouches[0];
			_end = (_start - touch.pageX);
		}

		function touchEnd(event) {
			if (_end < -50) {
				left();
				_end=0;
			}else if(_end > 50){
				right();
				_end=0;
			}
		}
	}

	/*日历*/
	function getNowDate(year, month){
		//获取第N个月有多少天
		var d = new Date(year, month, 0);
		var daysCountt = d.getDate();
		return daysCountt;
	}
	function getDay(year, month, days){
		//获取星期几
		var weekDays = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
		var d = new Date(year, month - 1, days);
		var daysCountt = d.getDay();
		return weekDays[daysCountt];
	}

})