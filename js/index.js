 $(window).resize(function(){
    $('html').css({'font-size':$(window).width()/3.9+"px"});
});

$(function(){
	$('html').css({'font-size':$(window).width()/3.9+"px"});

	$('.submit').click(function(){
		var phone = $('.phone').val();
		var name = $('.name').val();

		if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))){
			alert('请输入正确的手机号码');
			return false;
		}
		if(name==""){
			alert("请输入学生姓名");
			return false;
		}
		window.location.href="";
	})


	
});