$(function(){

    zhangAjax();
    jieAjax();
$(".zhang").change(function(){
    jieAjax();
})

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

 //图片上传
        var image='';
        function selectImage(file, id){
            if(!file.files|| !file.files[0]){
                return;
            }
            var reader =new FileReader();
            reader.onload=function(evt){
                // document.getElementsById(id).src = evt.target.result;
                $("#"+id).attr("src",evt.target.result);
                image=evt.target.result;
            }
            reader.readAsDataURL(file.files[0]);
        }
// 对上传的图片预览

$("#fileToUpload").change(function(){
    selectImage($("#fileToUpload")[0],'image')
})


// --------------------- 限制图片上传格式
       function filterFileImg(id){
        var
            filepath = $("#"+id+"").val(),
            extStart = filepath.lastIndexOf("."),
            ext = filepath.substring(extStart, filepath.length).toUpperCase();            
        if (ext != ".JPEG" && ext != ".JPG" && ext != ".PNG") {
            alert("文件格式不正确");
            $("#"+id+"").val("");
            return false;
        }
        return true;
    }



// 发送表单内容给后台
        function imageAjax(){
        // console.log($("#fileToUpload")[0].files[0]);
        var 
            formData = new FormData(),
            zhang = $('.zhang').val(),
            jie= $(".jie").val(),
            quesDescription = $(".quesDescription").val(),
            optionA = $(".optionA").val(),
            optionB = $(".optionB").val(),
            optionC = $(".optionC").val(),
            optionD = $(".optionD").val(),
            realAnswer =  $('.J_optionAnswer input[name="optionsAnswer"]:checked ').val();
            // fileToUpload
        formData.append("questionImage",$("#fileToUpload")[0].files[0]);
        formData.append("chapterId",zhang);
        formData.append("sessionId",jie);
        formData.append("quesDescription",quesDescription);
        formData.append("optionA",optionA);
        formData.append("optionB",optionB);
        formData.append("optionC",optionC);
        formData.append("optionD",optionD);
        formData.append("relAnswer",realAnswer);
        $.ajax({
            type:"post",
            url: "http://47.93.197.5/ques/teacher/addChoiceQues",
            contentType: false,
            data: formData,     //JSON.stringify
            processData: false,
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
    if(filterFileImg('fileToUpload')){
           imageAjax(); 
     }       
})


});

