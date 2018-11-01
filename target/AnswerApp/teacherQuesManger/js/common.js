$(function(){
    //侧边栏显示隐藏
    $('.fa-bars').click(function () {
        if ($('.sidebar').is(":visible") === true) {
            $('.holder, .footer').css({
                'margin-left': '0px'
            });
            $('.sidebar').css({
                'margin-left': '-200px'
            });
            $('.sidebar').hide();
        } else {
            $('.holder, .footer').css({
                'margin-left': '200px'
            });
            $('.sidebar').show();
            $('.sidebar').css({
                'margin-left': '0'
            });
        }
    });

    //展开，收起下级菜单
    $('.J_firstMenu').click(function(e){
        addColor(e);
    	var ul = $(this).next('ul'),
    		i = $(this).children(".fa-angle-right");

    	if(ul.is(':visible') === true){
    		ul.css('display','none');
    		i.css('transform','rotate(0deg)');
    	}else{
    		ul.css('display',''); 
    		i.css('transform','rotate(90deg)');
    	}
    });

    function addColor(e){
        var icon = $(e.currentTarget).children("i:last-child"),
            iconCss = icon.attr('style'),
            currentA = icon.parent('.J_firstMenu');
        if(iconCss == 'transform: rotate(90deg);'){
            currentA.css("background-color", "#4E5465");
        }else{
            currentA.css("background-color", "#30a5ff");
        }
    };
});


