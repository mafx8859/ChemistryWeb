$(function(){

    zhangAjax();
    jieAjax();
$(".zhang").change(function(){
    jieAjax();
})

// 富文本编辑器wangeditor
        var E = window.wangEditor;
        var editor1 = new E('#div1');
        editor1.create();


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


// 发送表单内容给后台
        function imageAjax(){
        var 
            zhang = $('.zhang').val(),
            jie= $(".jie").val(),
            // quesDescription = $(".quesDescription").val(),
            quesDescription = editor1.txt.html(),
            realAnswer =  $('.J_judgeAnswer input[name="textAnswer"]:checked ').val();
        var 
            data = {
                chapterId:zhang,
                sessionId:jie,
                judgQuesDescription:quesDescription,
                judgRealAnswer:realAnswer
            };
        $.ajax({
            type:"post",
            url: "http://47.93.197.5/ques/teacher/addJudgQues",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: data,  
            dataType: "json",
            success: function (rs) {
                alert('添加成功');
                window.location.href = "../html/title-management-list.html"; 
            },
            error: function (message) {
                alert('操作失败!');
            }
        });
    }



    //向后台提交验证
$(".J_save").click(function() { 
           imageAjax(); 
})


});

