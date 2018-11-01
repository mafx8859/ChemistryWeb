$(function(){
    cha();
    function cha(){
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
                                    <td class="col-sm-6">'+ item.quesId +'</td>\
                                    <td rowspan="5" class="www" style="width:250px;height:250px;"></td>\
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
                                  <tr>\
                                  <td>操作</td>\
                                  <td>\
                                    <a href="title-management-correct-detailed.html?quesId='+item.quesId+'&type='+item.type+'" class="label-info J_edit"><i class="fa fa-pencil"></i>&nbsp;答题情况详情</a>\
                                    <a href="title-management-correct-more.html?quesId='+item.quesId+'&type='+item.type+'" class="label-info J_edit"><i class="fa fa-list-alt"></i>&nbsp;题目详情</a>\
                                  </td>\
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
                                    title:{text:"正确率"},
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



    }) 