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

        var editorA = new E('#optionA');
        editorA.create();
        var editorB = new E('#optionB');
        editorB.create();
        var editorC = new E('#optionC');
        editorC.create();
        var editorD = new E('#optionD');
        editorD.create();

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
            quesDescription =editor1.txt.html(),
            optionA =editorA.txt.html(),
            optionB =editorB.txt.html(),
            optionC =editorC.txt.html(),
            optionD =editorD.txt.html(),
            realAnswer =  $('.J_optionAnswer input[name="optionsAnswer"]:checked ').val();
            console.log(quesDescription);
            console.log(realAnswer);
        var data={
                chapterId:zhang,
                sessionId:jie,
                quesDescription:quesDescription,
                optionA:optionA,
                optionB:optionB,
                optionC:optionC,
                optionD:optionD,
                relAnswer:realAnswer
            };
        $.ajax({
            type:"post",
            url: "http://47.93.197.5/ques/teacher/addChoiceQues",
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
    // if(filterFileImg('fileToUpload')){
           imageAjax(); 
     // }       
})


});

