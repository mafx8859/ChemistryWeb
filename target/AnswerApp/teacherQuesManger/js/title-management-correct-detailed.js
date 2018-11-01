$(function(){
    cha();
    /**
     * [getQueryString description]
     * @Description 从地址栏截取字段的值
     * @Author      zhouziyi
     * @DateTime    2018-10-24
     * @version     1.0.0
     * @param       {[type]}   name [description]
     * @return      {[type]}        [description]
     */
    function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 


    function cha(){
            var str = "";
           var quesId = getQueryString('quesId'),
            type = getQueryString('type');//从=号后面的内容
            var data = {
            	quesId: quesId,
            	type: type
            }
        $.ajax({
                type:'get',
                url:'http://47.93.197.5/answer/teacher/getAnswerRecord',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data:data,  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                          $.each(rs, function(index, item){                         
                            if(item.type==0){
                                type = "选择题"
                            }else{
                                type = "判断题"
                            }
                            if(item.judgeResult==0){
                                judgeResult = "错误"
                            }else{
                                judgeResult = "正确"
                            }
                            str = '<tr>\
                                        <td>'+ item.stuNum +'</td>\
                                        <td>'+ item.realName +'</td>\
                                        <td>'+ type +'</td>\
                                        <td>'+ judgeResult +'</td>\
                                        <td>'+ item.stuAnswer +'</td>\
                                        <td>'+ item.subDate +'</td>\
                                    </tr>'             
                            $('#J_template').append(str);
                            
                                            });
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
}



    }) 