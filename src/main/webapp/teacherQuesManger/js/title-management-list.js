$(function(){
    cha();
    zhangAjax();
    jieAjax();
$(".zhang").change(function(){
    jieAjax();
})


     $('.J_search').click(function(){                  
            chaBufen();  
    });


    /*
        点击收起，收起当前问题框
    */
    $(document).on('click','.J_retract',function(e){
            $(e.target).html("展开").addClass("J_edit").removeClass("J_retract");
            $(e.target).parents(".top").next().css("display","none");
    })
    
    /*
        点击展开，展开当前问题框
    */
    $(document).on('click','.J_edit',function(e){
        $(e.target).html("收起").addClass("J_retract").removeClass("J_edit");
        $(e.target).parents(".top").next().css("display","block");
    })


    function cha(){
            var str1 = "";
            var str2 = "";
        $.ajax({
                type:'get',
                url:'http://47.93.197.5/ques/teacher/getQuesByUserId',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: { },  
                dataType: "json",
                success: function (rs) {
                    $('#J_choose').empty();
                    $('#J_judge').empty();
                          $.each(rs, function(index, item){
                          if(item.type==0){
                             str1 = '<tr class="jiange"><tr>\
                                    <td class="w_15" style="height: 80px;line-height:80px;">题目</td>\
                                    <td colspan="2">'+ item.quesDescription +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>A</td>\
                                    <td>'+ item.optionA +'</td>\
                                    <td rowspan="7" style="height: 80px;"><img  id="editImg" src="imageUpload/'+ item.photoList +'"></td>\
                                  </tr>\
                                  <tr>\
                                    <td>B</td>\
                                    <td>'+ item.optionB +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>C</td>\
                                    <td>'+ item.optionC +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>D</td>\
                                    <td>'+ item.optionD +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>正确答案</td>\
                                    <td>'+ item.realAnswer +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>出题时间</td>\
                                    <td>'+ item.setQuesDate +'</td>\
                                  </tr>\
                                  <tr>\
                                  <td>操作</td>\
                                  <td data-choiceQuesId="'+ item.choiceQuesId +'" data-type="'+ item.type +'">\
                                    <a href="title-management-detailed-list.html#?id='+item.id+'" class="label-info J_edit"><i class="fa fa-pencil"></i>&nbsp;编辑/详情</a>\
                                    <a href="javascript:;" class="label-info J_del"><i class="fa fa-trash-o"></i>&nbsp;删除</a>\
                                    <a href="javascript:;" class="label-info J_close"><i class="fa fa-close"></i>&nbsp;关闭此题</a>\
                                </td>\
                                  </tr>\
                              </tr>'
                          }else{
                            str2 = '<tr class="jiange">\
                                  <tr>\
                                    <td class="w_15" style="height: 80px;line-height:80px">题目</td>\
                                    <td colspan="2" style="height: 80px;">'+ item.judgQuesDescription +'</td>\
                                    <td rowspan="5" style="height: 80px;"><img  id="editImg" src="'+ item.photoList +'"></td>\
                                  </tr>\
                                  <tr>\
                                    <td>正确答案</td>\
                                    <td>'+ item.judgRealAnswer +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>出题时间</td>\
                                    <td>'+ item.setQuesDate +'</td>\
                                  </tr>\
                                  <tr>\
                                  <td>操作</td>\
                                  <td data-judgmentQuesId="'+ item.judgmentQuesId +'" data-type="'+ item.type +'">\
                                    <a href="title-management-detailed-list.html#?id='+item.id+'" class="label-info J_edit"><i class="fa fa-pencil"></i>&nbsp;编辑/详情</a>\
                                    <a href="javascript:;" class="label-info J_del"><i class="fa fa-trash-o"></i>&nbsp;删除</a>\
                                    <a href="javascript:;" class="label-info J_close"><i class="fa fa-close"></i>&nbsp;关闭此题</a>\
                                </td>\
                                  </tr>\
                              </tr>'
                          }                       
                           

                                            
                            $('#J_choose').append(str1);
                            $('#J_judge').append(str2);
                        });
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
}





    function chaBufen(){
            var zhang = $('.zhang').val();
            var jie = $('.jie').val();
            var str1 = "";
            var str2 = "";
        $.ajax({
                type:'get',
                url:'http://47.93.197.5/ques/teacher/getQuesByUserIdAndSubordinate',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    chapterId:zhang,
                    sessionId:jie
                },  
                dataType: "json",
                success: function (rs) {
                    $('#J_choose').empty();
                    $('#J_judge').empty();
                          $.each(rs, function(index, item){
                          if(item.type==0){
                             str1 += '<tr class="jiange">\
                                  <tr>\
                                    <td class="w_15" style="height: 80px;line-height:80px">题目</td>\
                                    <td colspan="2">'+ item.quesDescription +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>A</td>\
                                    <td>'+ item.optionA +'</td>\
                                    <td rowspan="7" style="height: 80px;"><img  id="editImg" src="'+ item.photoList +'"></td>\
                                  </tr>\
                                  <tr>\
                                    <td>B</td>\
                                    <td>'+ item.optionB +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>C</td>\
                                    <td>'+ item.optionC +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>D</td>\
                                    <td>'+ item.optionD +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>正确答案</td>\
                                    <td>'+ item.realAnswer +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>出题时间</td>\
                                    <td>'+ item.setQuesDate +'</td>\
                                  </tr>\
                                  <tr>\
                                  <td>操作</td>\
                                  <td  data-choiceQuesId="'+ item.choiceQuesId +'" data-type="'+ item.type +'">\
                                    <a href="title-management-detailed-list.html#?id='+item.id+'" class="label-info J_edit"><i class="fa fa-pencil"></i>&nbsp;编辑/详情</a>\
                                    <a href="javascript:;" class="label-info J_del"><i class="fa fa-trash-o"></i>&nbsp;删除</a>\
                                    <a href="javascript:;" class="label-info J_close"><i class="fa fa-close"></i>&nbsp;关闭此题</a>\
                                </td>\
                                  </tr>\
                              </tr>'
                          }else{
                            str2 += '<tr class="jiange">\
                                  <tr>\
                                    <td class="w_15" style="height: 80px;line-height:80px">题目</td>\
                                    <td colspan="2" style="height: 80px;">'+ item.judgQuesDescription +'</td>\
                                    <td rowspan="5" style="height: 80px;"><img  id="editImg" src="'+ item.photoList +'"></td>\
                                  </tr>\
                                  <tr>\
                                    <td>正确答案</td>\
                                    <td>'+ item.judgRealAnswer +'</td>\
                                  </tr>\
                                  <tr>\
                                    <td>出题时间</td>\
                                    <td>'+ item.setQuesDate +'</td>\
                                  </tr>\
                                  <tr>\
                                  <td>操作</td>\
                                  <td data-judgmentQuesId="'+ item.judgmentQuesId +'" data-type="'+ item.type +'">\
                                    <a href="title-management-detailed-list.html#?id='+item.id+'" class="label-info J_edit"><i class="fa fa-pencil"></i>&nbsp;编辑/详情</a>\
                                    <a href="javascript:;" class="label-info J_del"><i class="fa fa-trash-o"></i>&nbsp;删除</a>\
                                    <a href="javascript:;" class="label-info J_close"><i class="fa fa-close"></i>&nbsp;关闭此题</a>\
                                </td>\
                                  </tr>\
                              </tr>'
                          }                       
                           

                                            
                            $('#J_choose').append(str1);
                            $('#J_judge').append(str2);
                        });
                },
                error: function (message) {
                    alert("请求发送失败。")
                }
    });
}

     /**
     * 加载章列表
     */
    function zhangAjax(){
        $.ajax({
            type: 'get',
            async: false,
            url: 'http://47.93.197.5/ques/getChapter',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: '',
            dataType: "json",
            success: function (rs) {
                $('.zhang').empty();
                    if(rs.length == 0){
                        $('.zhang').append('<option value="">暂无数据！</option>')
                    }else{
                        $.each(rs, function(index, item){
                            $('.zhang').append('<option value="'+item.chapterId+'">'+item.chapterName+'</option>')
                        })
                    }
            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
    }
     /**
     * 加载节列表
     */
    function jieAjax(){
        var chapterId = $(".zhang").val();
        $.ajax({
            type: 'get',
            url: 'http://47.93.197.5/ques/getSession',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {chapterId:chapterId},
            dataType: "json",
            success: function (rs) {
                $('.jie').empty();
                    if(rs.length == 0){
                        $('.jie').append('<option value="">暂无数据！</option>')
                    }else{
                        $.each(rs, function(index, item){
                            $('.jie').append('<option value="'+item.sessionId+'">'+item.sessionName+'</option>')
                        })
                    }
            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
    }
    /**
      * -----------------------------------------------删除事件--------------------------------------------------
     */
    /*
        删除
    */
    $(document).on('click','.J_del',function(e){
        $('#J_DEl').modal('show');
        var
            trDel = $(e.target),
            id = trDel.parent().attr('data-choiceQuesId')||trDel.parent().attr('data-judgmentQuesId'),
            type = trDel.parent().attr('data-type');
            // console.log(id);
        $('.hidId').val(type);
        $('.hidId1').val(id);
    });
    /*确认删除*/
    $(document).on('click','.J_delSure',function(){
        del();
        $('#J_DEl').modal('hide');
    });
    /**
      * 删除事件
     */
    function del(){  
        var type = $('.hidId').val(),
            id = $('.hidId1').val(),
            data = {
                quesId: id,
                type: type
            };
        $.ajax({
            type: 'get',
            url: 'http://47.93.197.5/ques/teacher/deleteQues',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,
            dataType: "json",
            success: function (rs) {
                $('#J_DEl').modal('hide');
                window.location.reload();
            },
            error: function (message) {
                alert("请求发送失败。")
            }
        });
    }


    /*
        点击关闭此题，改变题目状态
    */
    $(document).on('click','.J_close,.J_open',function(e){
            $(e.target).html("<i class='fa fa-check'></i>开启此题").addClass("J_open").removeClass("J_close");

        var trDel = $(e.target),
            id = trDel.parent().attr('data-choiceQuesId')||trDel.parent().attr('data-judgmentQuesId'),
            type = trDel.parent().attr('data-type');
            var data = {
                type: type,
                quesId: id
            }
            $.ajax({
                type: 'get',
                url: 'http://47.93.197.5/ques/teacher/changeStatus',
                data: data,
                dataType: "json",
                success: function (rs) {
                       alert("题目状态修改成功")
                },
                error: function (message) {
                        alert("请求发送失败。")
                }
            });
    })
    
    /*
        点击开启此题此题，改变题目状态
    */
    $(document).on('click','.J_open',function(e){
        $(e.target).html("<i class='fa fa-close'></i>关闭此题").addClass("J_close").removeClass("J_open");
        // $(e.target).parents(".top").next().css("display","block");
    })



    }) 