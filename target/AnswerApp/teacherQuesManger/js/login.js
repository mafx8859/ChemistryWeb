var userName = $('#userName');
var password = $('#password');
userName.blur(function () {
	if (userName.val() == "" || userName.val() == null) {
		$('#userName-error').show();
		userName.addClass("field_message");
	}
	else {
		$('#userName-error').hide();
		userName.removeClass("field_message");
	}
});
password.blur(function () {
	if (password.val() == "" || password.val() == null) {
		$('#password-error').show();
		password.addClass("field_message");
	}
	else {
		$('#password-errorr').hide();
		password.removeClass("field_message");
	}
});
$(function(){
	$("#thesubmit").click(function(){
		var username=$("#userName").val();
		var password=$("#password").val();
				$.ajax({
					type:"post",
					url:"http://188.131.204.169/loginReginster/teacher/login",
					dataType:"json",
					data:{
						username:username,
						password:password
					},
				  	success:function(rs){console.log(rs);
				  		if(rs.status == '0')
				  		{
				  			alert("用户名或密码错误");
				  			$("#password").val("")
				  		}
				  		else{
				  			window.location.href = "html/title-management-list.html";
				  		}		
				  	},
				  	error:function(msg){
				  		alert("请求发送失败");
				  	}
				});
		
	});
})