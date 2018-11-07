$(function(){  
    cha();

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
            type: 'get',
            url:'http://47.93.197.5/ques/teacher/getQuesByQuesIdAndType',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,  
            dataType: "json",
            success: function (rs) {
                if(rs.status == 1){
                    status = "开启";
                }else{
                    status = "关闭";
                }
                // $('.panel-body').empty();
                if( rs.type == 0){
                         $(".J_onlyCheck").prop('checked',true);
                         $(".optionType").siblings(".J_optionPanel").css("display","block");
                         $(".optionType").siblings(".J_optionAnswer").css("display","block");
                         var realA = $(".optionType").siblings(".J_optionAnswer");
                         if(rs.relAnswer=="a"){
                             realA.find('.J_answerOption:eq(0)').prop('checked',true);
                         }else if(rs.relAnswer=="b"){
                             realA.find('.J_answerOption:eq(1)').prop('checked',true);
                         }else if(rs.relAnswer=="c"){
                             realA.find('.J_answerOption:eq(2)').prop('checked',true);
                         }else{
                             realA.find('.J_answerOption:eq(3)').prop('checked',true);
                         }
                         $(".optionType").siblings(".J_textAnswer").css("display","none");
                                        $(".title").html(rs.quesDescription);
                                       //$(".title").html("Hello <b>world!</b>");
                                       $(".J_a").html(rs.optionA);
                                       $(".J_b").html(rs.optionB);
                                       $(".J_c").html(rs.optionC);
                                       $(".J_d").html(rs.optionD);
                                       $(".J_status").val(status);
                                       $(".J_time").val(rs.setQuesDate);
                                       // $(".J_img").attr('src',rs.photoList);

                }else{    
                    $(".J_textArea").prop('checked',true);
                    $(".optionType").siblings(".J_optionPanel").css("display","none").find('.J_option').val('');
                    $(".optionType").siblings(".J_optionAnswer").css("display","none").find('.J_option').val('');
                    $(".optionType").siblings(".J_textAnswer").css("display","block");            
                         // var realA = $(".optionType").siblings(".J_optionAnswer");
                         if(rs.judgRealAnswer=="对"){

                             $('.J_answerOption2:eq(0)').prop('checked',true);
                         }else{
                             $('.J_answerOption2:eq(1)').prop('checked',true);
                         }
                                       $(".title").val(rs.judgQuesDescription);
                                       $(".J_status").val(status);
                                       $(".J_time").val(rs.setQuesDate);
                                       // $(".J_img").attr('src',rs.photoList);
                }

            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
    };
})
   
   
   