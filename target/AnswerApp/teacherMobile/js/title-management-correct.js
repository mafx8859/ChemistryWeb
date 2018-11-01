        /** 每次页面显示时，重新加载列表  **/
        $(document).on("pageshow", "#page1", function () {
            cha1();
        });

        $(document).on("pageshow", "#page2", function () {
            cha2();
        });

        $(document).on("pageshow", "#page3", function () {
            cha3();
        });

function cha1(){
            var str = "";
        $.ajax({
                type:'get',
                url:'http://47.93.197.5/answer/teacher/getRecordSummary',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: { },  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                          $.each(rs, function(index, item){                         
                            if(item.type==0){
                                type = "选择题"
                            }else{
                                type = "判断题"
                            }
                            str = '<tr>\
                                    <td>题目Id</td>\
                                    <td>'+ item.quesId +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>题目类型</td>\
                                    <td>'+ type +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>答题人数</td>\
                                    <td>'+ item.subCount +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>正确率</td>\
                                    <td>'+ item.correctRate +'</td>\
                                  </tr>\
                                  <tr data-quesId="'+ item.quesId +'" data-type="'+ item.type +'">\
                                  <td>操作</td>\
                                  <td>\
                                    <a href="#page2" class="label-info J_edit" data-icon="edit">&nbsp;答题情况详情</a>\
                                    <a href="#page3" class="label-info J_edit2" data-icon="edit">&nbsp;题目详情</a>\
                                  </td>\
                                  </tr>\
                                  <tr>\
                                  <td colspan="2" class="www" style="width:150px;height:170px;"></td>\
                                  </tr>\
                                  <tr class="jiange">\
                              </tr>'                    
                            $('#J_template').append(str);
                            $(".www").attr("class","class"+index);
                            $(".class"+index).attr("id","id"+index);
                            var echar=echarts.init(document.getElementById("id"+index));
                            var zhengque=parseFloat(item.correctRate)*0.01*parseFloat(item.subCount);
                            var cuowu=parseFloat(item.subCount)-parseFloat(item.correctRate)*0.01*parseFloat(item.subCount);
                               var option={
                                    title:{
                                      text:"正确率",
                                      x:"right"},
                                    tooltip:{
                                        trigger:"item",
                                        formatter:"{b}<br>{c}"
                                    },
                                    series:{
                                            type:"pie",
                                            data: [{value:zhengque, name:'正确数量'},
                                            {value:cuowu, name:'错误数量'}]
                                    }
                                };
                                echar.setOption(option);
                                            });
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
}

// 刷新
$(document).on('tap','.reload',function(e){
    window.location.reload();
}); 

// 详情页
    $(document).on('tap','.J_edit',function(e){
        var
            trDel = $(e.target),
            id = trDel.parents("tr").attr('data-quesId'),
            type = trDel.parents("tr").attr('data-type');
        $('.hidId').val(id);
        $('.hidType').val(type);
    });

    function cha2(){
            var str = "";
            var quesId = $('.hidId').val();
            var type = $('.hidType').val();
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
                    $('#J_template2').empty();
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
                                    <td>学生学号</td>\
                                    <td>'+ item.stuNum +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>学生姓名</td>\
                                    <td>'+ item.realName +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>题型</td>\
                                    <td>'+ type +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>判题结果</td>\
                                    <td>'+ judgeResult +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>学生答案</td>\
                                    <td>'+ item.stuAnswer +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>做题日期</td>\
                                    <td>'+ item.subDate +'</td>\
                                  </tr>\
                                  <tr class="jiange">\
                              </tr>'                 
                            $('#J_template2').append(str);
                            
                                            });
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
}


// 题目详情页
    $(document).on('tap','.J_edit2',function(e){
        var
            trDel = $(e.target),
            id = trDel.parents("tr").attr('data-quesId'),
            type = trDel.parents("tr").attr('data-type');
        $('.hidId').val(id);
        $('.hidType').val(type);
    });

    function cha3(){
            var str = "";
            var quesId = $('.hidId').val();
            var type = $('.hidType').val();
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
                if( rs.type == 0){
                     $(".J_optionPanel").css("display","block");
                     $(".J_optionAnswer").css("display","block");
                     $(".J_textAnswer").css("display","none");
                     $(".title").val(rs.quesDescription);
                     $(".J_a").val(rs.optionA);
                     $(".J_b").val(rs.optionB);
                     $(".J_c").val(rs.optionC);
                     $(".J_d").val(rs.optionD);
                     $(".J_answerOption").val(rs.relAnswer);
                     $(".J_status").val(status);
                     $(".J_time").val(rs.setQuesDate);
                     $(".J_img").attr('src',rs.photoList);
                }else{    
                     $(".J_optionPanel").css("display","none");
                     $(".J_optionAnswer").css("display","none");
                     $(".J_textAnswer").css("display","block");            
                     $(".title").val(rs.judgQuesDescription);
                     $(".J_answerOption2").val(rs.judgRealAnswer);
                     $(".J_status").val(status);
                     $(".J_time").val(rs.setQuesDate);
                     $(".J_img").attr('src',rs.photoList);
                }
            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
}
 






