$(function(){
    cha();
    function cha(){
            var str1 = "";
            var str2 = "";
        $.ajax({
                type:'get',
                url:'http://188.131.204.169/answer/teacher/getRecordSummary',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: { },  
                dataType: "json",
                success: function (rs) {
                    $('#J_template').empty();
                          $.each(rs.choiceRecord, function(index, item){                       
                            str1 = '<tr>\
                                    <td>题目Id</td>\
                                    <td class="col-sm-6">'+ item.quesId +'</td>\
                                    <td rowspan="5" class="www1" style="width:250px;height:250px;"></td>\
                                  </tr>\
                                  <tr>\
                                    <td>题目类型</td>\
                                    <td>选择题</td>\
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
                            $('#J_template').append(str1);
                            $(".www1").attr("class","xuanze"+index);
                            $(".xuanze"+index).attr("id","xuanze"+index);
                            var echar=echarts.init(document.getElementById("xuanze"+index));
                            // var zhengque=parseFloat(item.correctRate)*0.01*parseFloat(item.subCount);
                            // var cuowu=parseFloat(item.subCount)-parseFloat(item.correctRate)*0.01*parseFloat(item.subCount);
                            var countA = item.countA;
                            var countB = item.countB;
                            var countC = item.countC;
                            var countD = item.countD;
                               var option={
                                    // title:{text:"正确率"},
                                    tooltip:{
                                        trigger:"item",
                                        formatter:"{b}<br>{c}"
                                    },
                                    series:{
                                            type:"pie",
                                            radius:"60%",
                                            data: [{value:countA, name:'A'},
                                            {value:countB, name:'B'},
                                            {value:countC, name:'C'},
                                            {value:countD, name:'D'}]
                                    }
                                };
                                echar.setOption(option);
                                            });
                          $.each(rs.judgRecord, function(index, item){                       
                            str2 = '<tr>\
                                    <td>题目Id</td>\
                                    <td class="col-sm-6">'+ item.quesId +'</td>\
                                    <td rowspan="5" class="www2" style="width:250px;height:250px;"></td>\
                                  </tr>\
                                  <tr>\
                                    <td>题目类型</td>\
                                    <td>判断题</td>\
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
                            $('#J_template').append(str2);
                            $(".www2").attr("class","panduan"+index);
                            $(".panduan"+index).attr("id","panduan"+index);
                            var echar=echarts.init(document.getElementById("panduan"+index));
                            var zhengque=parseFloat(item.correctRate)*0.01*parseFloat(item.subCount);
                            var cuowu=parseFloat(item.subCount)-parseFloat(item.correctRate)*0.01*parseFloat(item.subCount);
                               var option={
                                    // title:{text:"正确率"},
                                    tooltip:{
                                        trigger:"item",
                                        formatter:"{b}<br>{c}"
                                    },
                                    series:{
                                            type:"pie",
                                            data: [{value:zhengque, name:'正确'},
                                            {value:cuowu, name:'错误'}]
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